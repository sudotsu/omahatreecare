import { test, expect } from "@playwright/test";

// FUNC-001: the homepage form must reject a phone the API would reject, with
// actionable field-level feedback, rather than accepting it and surfacing a
// generic server failure.
test("homepage rejects a seven-digit phone before submission", async ({ page }) => {
  await page.goto("/");

  const form = page.locator("form", { has: page.locator("#user_phone") });
  await form.locator("#user_name").fill("Boundary Test");
  await form.locator("#user_email").fill("boundary@example.com");
  await form.locator("#user_phone").fill("8123294"); // 7 digits

  await form.getByRole("button", { name: /request an estimate/i }).click();

  await expect(page.getByText(/valid 10-digit phone number/i)).toBeVisible();
  // The invalid submission must not reach a success receipt.
  await expect(page.getByText(/Message Received/i)).toHaveCount(0);
});
