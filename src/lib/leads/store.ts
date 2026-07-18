import type { LeadInput } from "./schema";
import { FileSystemLeadStore } from "./store-filesystem";
import { createPostgresLeadStore } from "./store-postgres";
import type { LeadRecord, LeadStore } from "./store-contract";

export type { LeadAcceptance, LeadRecord, LeadStore } from "./store-contract";

interface RuntimeEnvironment {
  NODE_ENV?: string;
  DATABASE_URL?: string;
  LEAD_STORE_DIR?: string;
  LEAD_STORAGE_ADAPTER?: string;
}

export function createLeadStoreForEnvironment(env: RuntimeEnvironment): LeadStore {
  const adapter = env.LEAD_STORAGE_ADAPTER?.trim().toLowerCase();
  const databaseUrl = env.DATABASE_URL?.trim();
  const fileRoot = env.LEAD_STORE_DIR?.trim();

  if (env.NODE_ENV === "production") {
    if (adapter && adapter !== "postgres") throw new Error("Production lead storage must use the postgres adapter");
    if (!databaseUrl) throw new Error("DATABASE_URL is required for production lead storage");
    return createPostgresLeadStore(databaseUrl);
  }

  if (adapter === "postgres" || (!adapter && databaseUrl)) {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for the postgres lead-storage adapter");
    return createPostgresLeadStore(databaseUrl);
  }
  if (adapter && adapter !== "filesystem") throw new Error(`Unsupported lead-storage adapter: ${adapter}`);
  if (!fileRoot) throw new Error("LEAD_STORE_DIR is required for local filesystem lead storage");
  return new FileSystemLeadStore(fileRoot);
}

let runtimeStore: LeadStore | undefined;

export function getLeadStore() {
  runtimeStore ??= createLeadStoreForEnvironment(process.env);
  return runtimeStore;
}

export async function acceptLead(input: LeadInput, store: LeadStore = getLeadStore()) {
  return store.accept(input);
}

export async function deliverLead(
  record: LeadRecord,
  store: LeadStore = getLeadStore(),
  fetchImpl: typeof fetch = fetch,
): Promise<LeadRecord> {
  const url = process.env.LEAD_DELIVERY_WEBHOOK_URL?.trim();
  const token = process.env.LEAD_DELIVERY_TOKEN?.trim();
  if (!url || !token || record.delivery === "acknowledged") return record;

  const response = await fetchImpl(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "Idempotency-Key": record.receiptId },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`delivery provider returned ${response.status}`);
  return store.markDeliveryAcknowledged(record.receiptId);
}
