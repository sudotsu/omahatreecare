import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLead } from "./client";

const lead = {
  user_name: "Homeowner",
  user_email: "owner@example.com",
  service_type: "Tree Removal",
  message: "Damaged branch over the garage",
};

afterEach(() => vi.unstubAllGlobals());

describe("submitLead response handling", () => {
  it("uses the stable rejection error for an HTML 502 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<h1>Bad gateway</h1>", {
      status: 502,
      headers: { "content-type": "text/html" },
    })));
    await expect(submitLead(lead, "client-response-test-01")).rejects.toThrow("Lead request was not accepted");
  });

  it("uses the stable rejection error for an empty 503 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    await expect(submitLead(lead, "client-response-test-02")).rejects.toThrow("Lead request was not accepted");
  });
});
