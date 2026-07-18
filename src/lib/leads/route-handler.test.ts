import { describe, expect, it, vi } from "vitest";
import { handleLeadPost, rateLimited, type LeadRouteDependencies } from "./route-handler";

function unusedDependencies(): LeadRouteDependencies {
  return {
    rateLimit: () => false,
    now: () => 0,
    accept: vi.fn(),
    deliver: vi.fn(),
  } as unknown as LeadRouteDependencies;
}

describe("lead route boundaries", () => {
  it("rejects oversized chunked UTF-8 input without buffering beyond 16 KiB", async () => {
    const encoder = new TextEncoder();
    const chunks = [encoder.encode('{"message":"'), encoder.encode("é".repeat(8_200)), encoder.encode('"}')];
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        const chunk = chunks.shift();
        if (chunk) controller.enqueue(chunk);
        else controller.close();
      },
    });
    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      body,
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    const response = await handleLeadPost(request, unusedDependencies());
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "Request is too large." });
  });

  it("rejects invalid Content-Length instead of treating it as zero", async () => {
    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "content-length": "not-a-number" },
      body: "{}",
    });
    expect((await handleLeadPost(request, unusedDependencies())).status).toBe(400);
  });

  it("uses the Vercel-controlled identity and resets the bounded window", () => {
    const now = 10_000;
    const request = (spoofed: string) => new Request("http://localhost/api/leads", {
      headers: { "x-forwarded-for": spoofed, "x-vercel-forwarded-for": "203.0.113.70" },
    });
    for (let index = 0; index < 8; index += 1) {
      expect(rateLimited(request(`198.51.100.${index}`), now, { VERCEL: "1" })).toBe(false);
    }
    expect(rateLimited(request("198.51.100.99"), now, { VERCEL: "1" })).toBe(true);
    expect(rateLimited(request("198.51.100.99"), now + 10 * 60_000, { VERCEL: "1" })).toBe(false);
  });
});
