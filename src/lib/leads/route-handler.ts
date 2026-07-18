import { leadSchema } from "./schema";
import { acceptLead, deliverLead } from "./store";

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_KEYS = 1_000;
const attempts = new Map<string, { count: number; expiresAt: number }>();

class RequestTooLargeError extends Error {}

interface RuntimeEnvironment {
  readonly [key: string]: string | undefined;
  VERCEL?: string;
}

export function rateLimited(request: Request, now = Date.now(), env: RuntimeEnvironment = process.env) {
  for (const [key, entry] of attempts) {
    if (entry.expiresAt <= now) attempts.delete(key);
  }
  const key = env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown-vercel-client"
    : "local-development";
  if (!attempts.has(key) && attempts.size >= RATE_LIMIT_MAX_KEYS) {
    const oldest = [...attempts.entries()].sort((left, right) => left[1].expiresAt - right[1].expiresAt)[0];
    if (oldest) attempts.delete(oldest[0]);
  }
  const current = attempts.get(key);
  const next = current && current.expiresAt > now
    ? { ...current, count: current.count + 1 }
    : { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS };
  attempts.set(key, next);
  return next.count > 8;
}

export async function readBoundedJson(request: Request): Promise<unknown> {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader !== null) {
    const normalized = contentLengthHeader.trim();
    if (!/^(0|[1-9]\d*)$/.test(normalized)) throw new SyntaxError("Invalid Content-Length");
    const contentLength = Number(normalized);
    if (!Number.isSafeInteger(contentLength)) throw new SyntaxError("Invalid Content-Length");
    if (contentLength > MAX_BODY_BYTES) throw new RequestTooLargeError();
  }

  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing request body");
  const chunks: Uint8Array[] = [];
  let received = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new RequestTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export interface LeadRouteDependencies {
  rateLimit: (request: Request, now: number) => boolean;
  now: () => number;
  accept: typeof acceptLead;
  deliver: typeof deliverLead;
}

const runtimeDependencies: LeadRouteDependencies = {
  rateLimit: rateLimited,
  now: Date.now,
  accept: acceptLead,
  deliver: deliverLead,
};

export async function handleLeadPost(request: Request, dependencies: LeadRouteDependencies = runtimeDependencies) {
  if (dependencies.rateLimit(request, dependencies.now())) {
    console.warn("lead_rejected", { reason: "rate_limit" });
    return Response.json({ error: "Too many requests. Please call us if you need immediate help." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await readBoundedJson(request);
  } catch (error) {
    if (error instanceof RequestTooLargeError) return Response.json({ error: "Request is too large." }, { status: 413 });
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success || parsed.data.website) {
    console.warn("lead_rejected", { reason: parsed.success ? "honeypot" : "validation" });
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  try {
    const { record: acceptedRecord, duplicate } = await dependencies.accept(parsed.data);
    let record = acceptedRecord;
    try { record = await dependencies.deliver(record); }
    catch (error) { console.error("lead_delivery_pending", { receiptId: record.receiptId, error: error instanceof Error ? error.message : "unknown" }); }
    console.info("lead_accepted", { receiptId: record.receiptId, duplicate, source: record.lead.source, qualification: record.qualification, delivery: record.delivery });
    return Response.json({ receiptId: record.receiptId, acceptedAt: record.acceptedAt, duplicate }, { status: duplicate ? 200 : 201 });
  } catch (error) {
    console.error("lead_acceptance_failed", { error: error instanceof Error ? error.message : "unknown" });
    return Response.json({ error: "We could not safely save your request. Please call us instead." }, { status: 503 });
  }
}
