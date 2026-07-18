import { leadSchema } from "@/lib/leads/schema";
import { acceptLead, deliverLead } from "@/lib/leads/store";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();

function rateLimited(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < 10 * 60_000);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > 8;
}

export async function POST(request: Request) {
  if (rateLimited(request)) {
    console.warn("lead_rejected", { reason: "rate_limit" });
    return Response.json({ error: "Too many requests. Please call us if you need immediate help." }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 16_384) return Response.json({ error: "Request is too large." }, { status: 413 });

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 16_384) return Response.json({ error: "Request is too large." }, { status: 413 });
    raw = JSON.parse(body);
  } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success || parsed.data.website) {
    console.warn("lead_rejected", { reason: parsed.success ? "honeypot" : "validation" });
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  try {
    const { record: acceptedRecord, duplicate } = await acceptLead(parsed.data);
    let record = acceptedRecord;
    try { record = await deliverLead(record); }
    catch (error) { console.error("lead_delivery_pending", { receiptId: record.receiptId, error: error instanceof Error ? error.message : "unknown" }); }
    console.info("lead_accepted", { receiptId: record.receiptId, duplicate, source: record.lead.source, qualification: record.qualification, delivery: record.delivery });
    return Response.json({ receiptId: record.receiptId, acceptedAt: record.acceptedAt, duplicate }, { status: duplicate ? 200 : 201 });
  } catch (error) {
    console.error("lead_acceptance_failed", { error: error instanceof Error ? error.message : "unknown" });
    return Response.json({ error: "We could not safely save your request. Please call us instead." }, { status: 503 });
  }
}
