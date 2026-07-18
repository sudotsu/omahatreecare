import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { leadSchema, isQualifiedLead } from "./schema";
import { createLeadStoreForEnvironment, deliverLead } from "./store";
import { FileSystemLeadStore } from "./store-filesystem";

const roots: string[] = [];
afterEach(async () => {
  vi.unstubAllGlobals();
  delete process.env.LEAD_DELIVERY_WEBHOOK_URL;
  delete process.env.LEAD_DELIVERY_TOKEN;
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

export function validLead(overrides = {}) {
  return leadSchema.parse({
    idempotencyKey: "characterization-key-0001", user_name: "Homeowner", user_email: "owner@example.com",
    user_phone: "", service_type: "Tree Removal", message: "A damaged limb is hanging over my garage.",
    address: "68104 Omaha NE", source: "hazard_assessment", attribution: { risk: "high" }, website: "", ...overrides,
  });
}

async function localStore() {
  const root = await mkdtemp(path.join(tmpdir(), "midwest-leads-"));
  roots.push(root);
  return { root, store: new FileSystemLeadStore(root) };
}

describe("first-party lead acceptance", () => {
  it("requires a return contact method and rejects oversized fields", () => {
    expect(() => validLead({ user_email: "", user_phone: "" })).toThrow();
    expect(() => validLead({ message: "x".repeat(4001) })).toThrow();
  });

  it("keeps the filesystem adapter deterministic for local development", async () => {
    const { root, store } = await localStore();
    const first = await store.accept(validLead());
    const duplicate = await store.accept(validLead());
    expect(first.duplicate).toBe(false);
    expect(duplicate.duplicate).toBe(true);
    expect(duplicate.record.receiptId).toBe(first.record.receiptId);
    expect(duplicate.record.qualification).toBe("qualified");
    const persisted = JSON.parse(await readFile(path.join(root, "records", `${first.record.receiptId}.json`), "utf8"));
    expect(persisted.lead.user_email).toBe("owner@example.com");
    expect(new Date(persisted.deleteOrAnonymizeAfter).getTime()).toBeGreaterThan(new Date(persisted.acceptedAt).getTime());
  });

  it("fails closed when production database configuration is missing", () => {
    expect(() => createLeadStoreForEnvironment({ NODE_ENV: "production", LEAD_STORE_DIR: "/tmp/ephemeral" }))
      .toThrow("DATABASE_URL is required");
    expect(() => createLeadStoreForEnvironment({ NODE_ENV: "production", DATABASE_URL: "postgres://example", LEAD_STORAGE_ADAPTER: "filesystem" }))
      .toThrow("must use the postgres adapter");
  });

  it("excludes labeled tests from qualified-lead counts", () => {
    expect(isQualifiedLead(validLead({ message: "PROJECT TEARDOWN TEST — DO NOT CONTACT damaged tree" }))).toBe(false);
  });

  it("keeps an accepted record pending when delivery is not configured", async () => {
    const { store } = await localStore();
    const { record } = await store.accept(validLead({ idempotencyKey: "delivery-pending-key-01" }));
    expect((await deliverLead(record, store)).delivery).toBe("pending");
  });

  it("keeps an accepted record pending when downstream delivery fails", async () => {
    const { root, store } = await localStore();
    process.env.LEAD_DELIVERY_WEBHOOK_URL = "https://delivery.invalid/leads";
    process.env.LEAD_DELIVERY_TOKEN = "test-token";
    const { record } = await store.accept(validLead({ idempotencyKey: "delivery-failure-key-01" }));
    const fetchFailure = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }));

    await expect(deliverLead(record, store, fetchFailure)).rejects.toThrow("delivery provider returned 503");
    const persisted = JSON.parse(await readFile(path.join(root, "records", `${record.receiptId}.json`), "utf8"));
    expect(persisted.delivery).toBe("pending");
  });
});
