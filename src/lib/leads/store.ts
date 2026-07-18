import { createHash, randomUUID } from "node:crypto";
import { mkdir, open, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "./schema";
import { isQualifiedLead } from "./schema";

export interface LeadRecord {
  receiptId: string;
  acceptedAt: string;
  deleteOrAnonymizeAfter: string;
  qualification: "qualified" | "unqualified";
  delivery: "pending" | "acknowledged";
  lead: Omit<LeadInput, "website" | "idempotencyKey">;
}

function storeRoot() {
  const configured = process.env.LEAD_STORE_DIR?.trim();
  if (!configured) throw new Error("LEAD_STORE_DIR is not configured");
  return path.resolve(configured);
}

function keyDigest(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export async function acceptLead(input: LeadInput): Promise<{ record: LeadRecord; duplicate: boolean }> {
  const root = storeRoot();
  const records = path.join(root, "records");
  const keys = path.join(root, "idempotency");
  await mkdir(records, { recursive: true, mode: 0o700 });
  await mkdir(keys, { recursive: true, mode: 0o700 });

  const keyPath = path.join(keys, `${keyDigest(input.idempotencyKey)}.txt`);
  let keyHandle;
  try {
    keyHandle = await open(keyPath, "wx", 0o600);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const receiptId = (await readFile(keyPath, "utf8")).trim();
    if (!receiptId) throw new Error("Lead acceptance is already in progress");
    const record = JSON.parse(await readFile(path.join(records, `${receiptId}.json`), "utf8")) as LeadRecord;
    return { record, duplicate: true };
  }

  const acceptedAt = new Date();
  const deleteAfter = new Date(acceptedAt);
  deleteAfter.setUTCMonth(deleteAfter.getUTCMonth() + 12);
  const receiptId = randomUUID();
  const { website: _website, idempotencyKey: _key, ...lead } = input;
  const record: LeadRecord = {
    receiptId,
    acceptedAt: acceptedAt.toISOString(),
    deleteOrAnonymizeAfter: deleteAfter.toISOString(),
    qualification: isQualifiedLead(input) ? "qualified" : "unqualified",
    delivery: "pending",
    lead,
  };

  try {
    await writeFile(path.join(records, `${receiptId}.json`), JSON.stringify(record, null, 2), { encoding: "utf8", mode: 0o600, flag: "wx" });
    await keyHandle.writeFile(receiptId, "utf8");
    await keyHandle.close();
    return { record, duplicate: false };
  } catch (error) {
    await keyHandle.close().catch(() => undefined);
    await unlink(keyPath).catch(() => undefined);
    throw error;
  }
}

export async function deliverLead(record: LeadRecord): Promise<LeadRecord> {
  const url = process.env.LEAD_DELIVERY_WEBHOOK_URL?.trim();
  const token = process.env.LEAD_DELIVERY_TOKEN?.trim();
  if (!url || !token || record.delivery === "acknowledged") return record;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "Idempotency-Key": record.receiptId },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`delivery provider returned ${response.status}`);
  const updated = { ...record, delivery: "acknowledged" as const };
  await writeFile(path.join(storeRoot(), "records", `${record.receiptId}.json`), JSON.stringify(updated, null, 2), { encoding: "utf8", mode: 0o600 });
  return updated;
}
