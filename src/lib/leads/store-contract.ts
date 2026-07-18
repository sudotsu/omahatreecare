import { createHash, randomUUID } from "node:crypto";
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

export interface LeadAcceptance {
  record: LeadRecord;
  duplicate: boolean;
}

export interface LeadStore {
  accept(input: LeadInput): Promise<LeadAcceptance>;
  markDeliveryAcknowledged(receiptId: string): Promise<LeadRecord>;
}

export function idempotencyDigest(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export function createLeadRecord(input: LeadInput): LeadRecord {
  const acceptedAt = new Date();
  const deleteAfter = new Date(acceptedAt);
  deleteAfter.setUTCMonth(deleteAfter.getUTCMonth() + 12);
  const { website: _website, idempotencyKey: _key, ...lead } = input;
  void _website;
  void _key;
  return {
    receiptId: randomUUID(),
    acceptedAt: acceptedAt.toISOString(),
    deleteOrAnonymizeAfter: deleteAfter.toISOString(),
    qualification: isQualifiedLead(input) ? "qualified" : "unqualified",
    delivery: "pending",
    lead,
  };
}
