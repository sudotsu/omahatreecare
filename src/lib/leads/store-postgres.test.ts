import type { QueryResult, QueryResultRow } from "pg";
import { describe, expect, it } from "vitest";
import { leadSchema } from "./schema";
import { PostgresLeadStore, type PostgresClient, type PostgresPool } from "./store-postgres";

function validLead() {
  return leadSchema.parse({
    idempotencyKey: "characterization-key-0001", user_name: "Homeowner", user_email: "owner@example.com",
    user_phone: "", service_type: "Tree Removal", message: "A damaged limb is hanging over my garage.",
    address: "68104 Omaha NE", source: "hazard_assessment", attribution: { risk: "high" }, website: "",
  });
}

interface StoredRow extends QueryResultRow {
  receipt_id: string;
  idempotency_key_digest: string;
  accepted_at: string;
  delete_or_anonymize_after: string;
  qualification_state: "qualified" | "unqualified";
  delivery_state: "pending" | "acknowledged";
  lead_payload: string;
  attribution: string;
}

function result<R extends QueryResultRow>(rows: R[]): QueryResult<R> {
  return { command: "", rowCount: rows.length, oid: 0, fields: [], rows };
}

class FakePostgresPool implements PostgresPool {
  readonly byDigest = new Map<string, StoredRow>();
  failWrites = false;

  async connect(): Promise<PostgresClient> {
    const rows = this.byDigest;
    const shouldFailWrites = () => this.failWrites;
    return {
      async query<R extends QueryResultRow = QueryResultRow>(text: string, values: unknown[] = []) {
        const sql = text.replace(/\s+/g, " ").trim().toLowerCase();
        if (sql === "begin" || sql === "commit" || sql === "rollback" || sql.startsWith("set local")) return result([]) as QueryResult<R>;
        if (sql.startsWith("insert into public.lead_records")) {
          if (shouldFailWrites()) throw new Error("database unavailable");
          await new Promise((resolve) => setTimeout(resolve, 1));
          const digest = String(values[1]);
          if (rows.has(digest)) return result([]) as QueryResult<R>;
          const row: StoredRow = {
            receipt_id: String(values[0]),
            idempotency_key_digest: digest,
            accepted_at: String(values[2]),
            delete_or_anonymize_after: String(values[3]),
            qualification_state: values[4] as StoredRow["qualification_state"],
            delivery_state: values[5] as StoredRow["delivery_state"],
            lead_payload: String(values[6]),
            attribution: String(values[7]),
          };
          rows.set(digest, row);
          return result([row]) as unknown as QueryResult<R>;
        }
        if (sql.startsWith("select") && sql.includes("idempotency_key_digest = $1")) {
          const row = rows.get(String(values[0]));
          return result(row ? [row] : []) as unknown as QueryResult<R>;
        }
        if (sql.startsWith("update public.lead_records")) {
          const row = [...rows.values()].find((candidate) => candidate.receipt_id === values[0]);
          if (!row || row.delivery_state !== "pending") return result([]) as QueryResult<R>;
          row.delivery_state = "acknowledged";
          return result([row]) as unknown as QueryResult<R>;
        }
        if (sql.startsWith("select") && sql.includes("receipt_id = $1")) {
          const row = [...rows.values()].find((candidate) => candidate.receipt_id === values[0]);
          return result(row ? [row] : []) as unknown as QueryResult<R>;
        }
        throw new Error(`Unexpected SQL in fake Postgres pool: ${sql}`);
      },
      release() {},
    };
  }
}

describe("PostgresLeadStore", () => {
  it("durably accepts a lead with payload and attribution", async () => {
    const pool = new FakePostgresPool();
    const accepted = await new PostgresLeadStore(pool).accept(validLead());

    expect(accepted.duplicate).toBe(false);
    expect(accepted.record.lead.attribution).toEqual({ risk: "high" });
    expect(pool.byDigest.size).toBe(1);
    expect([...pool.byDigest.values()][0].lead_payload).not.toContain("idempotencyKey");
  });

  it("returns the original receipt for an atomic duplicate", async () => {
    const pool = new FakePostgresPool();
    const store = new PostgresLeadStore(pool);
    const first = await store.accept(validLead());
    const duplicate = await store.accept(validLead());

    expect(duplicate.duplicate).toBe(true);
    expect(duplicate.record.receiptId).toBe(first.record.receiptId);
    expect(pool.byDigest.size).toBe(1);
  });

  it("serializes concurrent submissions through the unique idempotency digest", async () => {
    const pool = new FakePostgresPool();
    const store = new PostgresLeadStore(pool);
    const submissions = await Promise.all(Array.from({ length: 8 }, () => store.accept(validLead())));

    expect(submissions.filter((submission) => !submission.duplicate)).toHaveLength(1);
    expect(new Set(submissions.map((submission) => submission.record.receiptId)).size).toBe(1);
    expect(pool.byDigest.size).toBe(1);
  });

  it("propagates persistence failure without returning a receipt", async () => {
    const pool = new FakePostgresPool();
    pool.failWrites = true;
    await expect(new PostgresLeadStore(pool).accept(validLead())).rejects.toThrow("database unavailable");
    expect(pool.byDigest.size).toBe(0);
  });

  it("rolls back and releases the client when delivery acknowledgement times out", async () => {
    const queries: string[] = [];
    let released = false;
    const pool: PostgresPool = {
      async connect() {
        return {
          async query<R extends QueryResultRow = QueryResultRow>(text: string) {
            const sql = text.replace(/\s+/g, " ").trim().toLowerCase();
            queries.push(sql);
            if (sql.startsWith("update public.lead_records")) throw new Error("canceling statement due to statement timeout");
            return result([]) as QueryResult<R>;
          },
          release() { released = true; },
        };
      },
    };

    await expect(new PostgresLeadStore(pool).markDeliveryAcknowledged("11111111-1111-4111-8111-111111111111"))
      .rejects.toThrow("statement timeout");
    expect(queries).toEqual([
      "begin",
      "set local statement_timeout = '5s'",
      expect.stringMatching(/^update public\.lead_records/),
      "rollback",
    ]);
    expect(released).toBe(true);
  });
});
