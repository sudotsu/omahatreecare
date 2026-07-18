export type LeadSubmission = {
  user_name: string; user_email?: string; user_phone?: string; service_type: string;
  message: string; address?: string; source?: string; attribution?: Record<string, string>;
};

export async function submitLead(lead: LeadSubmission, idempotencyKey: string) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, idempotencyKey, website: "" }),
  });
  const result = await response.json() as { receiptId?: string; error?: string };
  if (!response.ok || !result.receiptId) throw new Error(result.error || "Lead request was not accepted");
  return result;
}
