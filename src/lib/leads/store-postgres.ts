import { Pool, type QueryResult, type QueryResultRow } from "pg";
import type { LeadInput } from "./schema";
import { createLeadRecord, idempotencyDigest, type LeadAcceptance, type LeadRecord, type LeadStore } from "./store-contract";

export interface PostgresClient {
  query<R extends QueryResultRow = QueryResultRow>(text: string, values?: unknown[]): Promise<QueryResult<R>>;
  release(): void;
}

export interface PostgresPool {
  connect(): Promise<PostgresClient>;
}

interface LeadRow extends QueryResultRow {
  receipt_id: string;
  accepted_at: Date | string;
  delete_or_anonymize_after: Date | string;
  qualification_state: "qualified" | "unqualified";
  delivery_state: "pending" | "acknowledged";
  lead_payload: Omit<LeadInput, "website" | "idempotencyKey" | "attribution"> | string;
  attribution: Record<string, string> | string;
}

const RETURNING_COLUMNS = `
  receipt_id, accepted_at, delete_or_anonymize_after, qualification_state,
  delivery_state, lead_payload, attribution
`;

function toRecord(row: LeadRow): LeadRecord {
  const payload = typeof row.lead_payload === "string" ? JSON.parse(row.lead_payload) : row.lead_payload;
  const attribution = typeof row.attribution === "string" ? JSON.parse(row.attribution) : row.attribution;
  return {
    receiptId: row.receipt_id,
    acceptedAt: new Date(row.accepted_at).toISOString(),
    deleteOrAnonymizeAfter: new Date(row.delete_or_anonymize_after).toISOString(),
    qualification: row.qualification_state,
    delivery: row.delivery_state,
    lead: { ...payload, attribution },
  };
}

export class PostgresLeadStore implements LeadStore {
  constructor(private readonly pool: PostgresPool) {}

  async accept(input: LeadInput): Promise<LeadAcceptance> {
    const record = createLeadRecord(input);
    const digest = idempotencyDigest(input.idempotencyKey);
    const { attribution, ...leadPayload } = record.lead;
    const client = await this.pool.connect();

    try {
      await client.query("begin");
      await client.query("set local statement_timeout = '5s'");
      const inserted = await client.query<LeadRow>(`
        insert into public.lead_records (
          receipt_id, idempotency_key_digest, accepted_at, delete_or_anonymize_after,
          qualification_state, delivery_state, lead_payload, attribution
        ) values ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb)
        on conflict (idempotency_key_digest) do nothing
        returning ${RETURNING_COLUMNS}
      `, [
        record.receiptId,
        digest,
        record.acceptedAt,
        record.deleteOrAnonymizeAfter,
        record.qualification,
        record.delivery,
        JSON.stringify(leadPayload),
        JSON.stringify(attribution),
      ]);

      if (inserted.rows[0]) {
        await client.query("commit");
        return { record: toRecord(inserted.rows[0]), duplicate: false };
      }

      const existing = await client.query<LeadRow>(`
        select ${RETURNING_COLUMNS}
        from public.lead_records
        where idempotency_key_digest = $1
      `, [digest]);
      if (!existing.rows[0]) throw new Error("Duplicate lead record could not be read");
      await client.query("commit");
      return { record: toRecord(existing.rows[0]), duplicate: true };
    } catch (error) {
      await client.query("rollback").catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  }

  async markDeliveryAcknowledged(receiptId: string) {
    const client = await this.pool.connect();
    try {
      await client.query("begin");
      await client.query("set local statement_timeout = '5s'");
      const result = await client.query<LeadRow>(`
        update public.lead_records
        set delivery_state = 'acknowledged'
        where receipt_id = $1 and delivery_state = 'pending'
        returning ${RETURNING_COLUMNS}
      `, [receiptId]);
      if (result.rows[0]) {
        await client.query("commit");
        return toRecord(result.rows[0]);
      }

      const existing = await client.query<LeadRow>(`
        select ${RETURNING_COLUMNS}
        from public.lead_records
        where receipt_id = $1
      `, [receiptId]);
      if (!existing.rows[0]) throw new Error("Accepted lead record was not found");
      await client.query("commit");
      return toRecord(existing.rows[0]);
    } catch (error) {
      await client.query("rollback").catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  }
}

let runtimePool: Pool | undefined;
let runtimeDatabaseUrl: string | undefined;

export function createPostgresLeadStore(databaseUrl: string) {
  if (!runtimePool || runtimeDatabaseUrl !== databaseUrl) {
    runtimePool = new Pool({
      connectionString: databaseUrl,
      max: 5,
      connectionTimeoutMillis: 5_000,
      idleTimeoutMillis: 10_000,
    });
    runtimeDatabaseUrl = databaseUrl;
  }
  return new PostgresLeadStore(runtimePool as unknown as PostgresPool);
}
