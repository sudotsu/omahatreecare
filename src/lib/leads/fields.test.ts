import { describe, expect, it } from "vitest";
import { emailField, hasValidPhone, nameField, normalizePhone, phoneField } from "./fields";
import { leadSchema } from "./schema";

// FUNC-001: the shared client contract and the server schema must agree on
// phone boundaries so the homepage cannot accept a phone the API rejects.
describe("shared lead phone contract", () => {
  it("normalizes formatted input to digits", () => {
    expect(normalizePhone("(402) 812-3294")).toBe("4028123294");
    expect(normalizePhone("402.812.3294 ext")).toBe("4028123294");
  });

  it("rejects seven- and nine-digit phones before submission", () => {
    expect(phoneField.safeParse("8123294").success).toBe(false); // 7 digits
    expect(phoneField.safeParse("402812329").success).toBe(false); // 9 digits
    expect(hasValidPhone("8123294")).toBe(false);
  });

  it("accepts and normalizes a formatted ten-digit phone", () => {
    const parsed = phoneField.safeParse("(402) 812-3294");
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data).toBe("4028123294");
  });

  it("validates name and email fields", () => {
    expect(nameField.safeParse("").success).toBe(false);
    expect(emailField.safeParse("nope").success).toBe(false);
    expect(emailField.safeParse("a@b.co").success).toBe(true);
  });
});

// The server remains a permissive superset: it must never reject a submission
// the public forms would accept (name + email + valid phone), and it applies
// the same normalization.
describe("server leadSchema alignment", () => {
  const base = {
    idempotencyKey: "abcdef0123456789",
    user_name: "Pat Homeowner",
    service_type: "Tree Removal",
    message: "Large oak near the driveway",
  };

  it("accepts a formatted ten-digit phone and normalizes it", () => {
    const parsed = leadSchema.safeParse({ ...base, user_email: "", user_phone: "(402) 812-3294" });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.user_phone).toBe("4028123294");
  });

  it("rejects a seven-digit phone with no email", () => {
    const parsed = leadSchema.safeParse({ ...base, user_email: "", user_phone: "8123294" });
    expect(parsed.success).toBe(false);
  });

  it("still accepts an email-only submission (permissive superset)", () => {
    const parsed = leadSchema.safeParse({ ...base, user_email: "pat@example.com", user_phone: "" });
    expect(parsed.success).toBe(true);
  });
});
