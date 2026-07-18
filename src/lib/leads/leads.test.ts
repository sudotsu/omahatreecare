import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { leadSchema, isQualifiedLead } from "./schema";
import { acceptLead, deliverLead } from "./store";

const roots: string[] = [];
afterEach(async () => { await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))); });

function validLead(overrides = {}) {
  return leadSchema.parse({
    idempotencyKey: "characterization-key-0001", user_name: "Homeowner", user_email: "owner@example.com",
    user_phone: "", service_type: "Tree Removal", message: "A damaged limb is hanging over my garage.",
    address: "68104 Omaha NE", source: "hazard_assessment", attribution: { risk: "high" }, website: "", ...overrides,
  });
}

describe("first-party lead acceptance", () => {
  it("requires a return contact method and rejects oversized fields", () => {
    expect(() => validLead({ user_email: "", user_phone: "" })).toThrow();
    expect(() => validLead({ message: "x".repeat(4001) })).toThrow();
  });

  it("persists one receipt for duplicate idempotency keys with a 12-month lifecycle", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "midwest-leads-")); roots.push(root); process.env.LEAD_STORE_DIR = root;
    const first = await acceptLead(validLead());
    const duplicate = await acceptLead(validLead());
    expect(first.duplicate).toBe(false);
    expect(duplicate.duplicate).toBe(true);
    expect(duplicate.record.receiptId).toBe(first.record.receiptId);
    expect(duplicate.record.qualification).toBe("qualified");
    const persisted = JSON.parse(await readFile(path.join(root, "records", `${first.record.receiptId}.json`), "utf8"));
    expect(persisted.lead.user_email).toBe("owner@example.com");
    expect(new Date(persisted.deleteOrAnonymizeAfter).getTime()).toBeGreaterThan(new Date(persisted.acceptedAt).getTime());
  });

  it("excludes labeled tests from qualified-lead counts", () => {
    expect(isQualifiedLead(validLead({ message: "PROJECT TEARDOWN TEST — DO NOT CONTACT damaged tree" }))).toBe(false);
  });

  it("keeps an accepted record pending when delivery is not configured", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "midwest-leads-")); roots.push(root); process.env.LEAD_STORE_DIR = root;
    delete process.env.LEAD_DELIVERY_WEBHOOK_URL; delete process.env.LEAD_DELIVERY_TOKEN;
    const { record } = await acceptLead(validLead({ idempotencyKey: "delivery-pending-key-01" }));
    expect((await deliverLead(record)).delivery).toBe("pending");
  });
});
