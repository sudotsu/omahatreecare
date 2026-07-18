import { mkdir, open, readFile, unlink, writeFile, type FileHandle } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "./schema";
import { createLeadRecord, idempotencyDigest, type LeadAcceptance, type LeadRecord, type LeadStore } from "./store-contract";

export class FileSystemLeadStore implements LeadStore {
  constructor(
    private readonly root: string,
    private readonly finalizeKey: (handle: FileHandle, receiptId: string) => Promise<void> = (handle, receiptId) => handle.writeFile(receiptId, "utf8"),
  ) {
    if (!root.trim()) throw new Error("Filesystem lead-store root is required");
  }

  private recordPath(receiptId: string) {
    return path.join(path.resolve(this.root), "records", `${receiptId}.json`);
  }

  async accept(input: LeadInput): Promise<LeadAcceptance> {
    const records = path.join(path.resolve(this.root), "records");
    const keys = path.join(path.resolve(this.root), "idempotency");
    await mkdir(records, { recursive: true, mode: 0o700 });
    await mkdir(keys, { recursive: true, mode: 0o700 });

    const keyPath = path.join(keys, `${idempotencyDigest(input.idempotencyKey)}.txt`);
    let keyHandle;
    try {
      keyHandle = await open(keyPath, "wx", 0o600);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const receiptId = (await readFile(keyPath, "utf8")).trim();
      if (!receiptId) throw new Error("Lead acceptance is already in progress");
      const record = JSON.parse(await readFile(this.recordPath(receiptId), "utf8")) as LeadRecord;
      return { record, duplicate: true };
    }

    const record = createLeadRecord(input);
    const recordPath = this.recordPath(record.receiptId);
    let recordCreated = false;
    try {
      await writeFile(recordPath, JSON.stringify(record, null, 2), { encoding: "utf8", mode: 0o600, flag: "wx" });
      recordCreated = true;
      await this.finalizeKey(keyHandle, record.receiptId);
      await keyHandle.close();
      return { record, duplicate: false };
    } catch (error) {
      await keyHandle.close().catch(() => undefined);
      if (recordCreated) await unlink(recordPath).catch(() => undefined);
      await unlink(keyPath).catch(() => undefined);
      throw error;
    }
  }

  async markDeliveryAcknowledged(receiptId: string) {
    const recordPath = this.recordPath(receiptId);
    const record = JSON.parse(await readFile(recordPath, "utf8")) as LeadRecord;
    const updated = { ...record, delivery: "acknowledged" as const };
    await writeFile(recordPath, JSON.stringify(updated, null, 2), { encoding: "utf8", mode: 0o600 });
    return updated;
  }
}
