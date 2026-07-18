import { expect, test } from "@playwright/test";

test("legacy receipt URL cannot display success without accepted contact data", async ({ page }) => {
  await page.goto("/free-tree-assessment-omaha?zip=68104&service=tree-removal");
  await expect(page.getByRole("heading", { name: "Finish Your Estimate Request" })).toBeVisible();
  await expect(page.getByText("Request Received!", { exact: true })).toHaveCount(0);
});

test("production lead acceptance fails closed without database configuration", async ({ request }) => {
  const response = await request.post("/api/leads", {
    data: {
      idempotencyKey: "playwright-missing-database-0001",
      user_name: "PROJECT TEARDOWN TEST",
      user_email: "test@example.com",
      user_phone: "",
      service_type: "Tree Removal",
      message: "PROJECT TEARDOWN TEST — DO NOT CONTACT",
      address: "Omaha NE",
      source: "playwright",
      attribution: {},
      website: "",
    },
  });
  const body = await response.json();

  expect(response.status()).toBe(503);
  expect(body.receiptId).toBeUndefined();
  expect(body.error).toMatch(/call us instead/i);
});

test("accepted form receipts move focus to one status confirmation", async ({ page }) => {
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ receiptId: "11111111-1111-4111-8111-111111111111", acceptedAt: new Date(0).toISOString(), duplicate: false }),
    });
  });

  await page.goto("/");
  await page.locator("#user_name").fill("Homeowner");
  await page.locator("#user_phone").fill("4025550101");
  await page.locator("#user_email").fill("owner@example.com");
  await page.getByRole("button", { name: "Request an Estimate", exact: true }).click();
  await expect(page.getByRole("status")).toBeFocused();

  await page.goto("/contact");
  await page.getByRole("button", { name: /Removal/ }).click();
  await expect(page.getByRole("button", { name: /Continue/ })).toBeVisible();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.locator("#user_name").fill("Homeowner");
  await page.locator("#user_email").fill("owner@example.com");
  await page.locator("#user_phone").fill("4025550101");
  await page.getByRole("button", { name: /Request My Estimate/ }).click();
  await expect(page.getByRole("status")).toBeFocused();
});

test("all five homeowner tools retain defining interactions", async ({ page }) => {
  await page.goto("/tools/hazard");
  await page.getByRole("button", { name: /Lifting Soil or Major Splits/ }).click();
  await page.getByRole("button", { name: /Major Splits or Hanging Limbs/ }).click();
  await page.getByRole("button", { name: /Dead or Dying/ }).click();
  await page.getByRole("button", { name: /High Value/ }).click();
  await expect(page.getByRole("heading", { name: "Extreme Urgency" })).toBeFocused();
  await expect(page.getByText(/you reported severe warning signs/i)).toBeVisible();

  await page.goto("/tools/cost");
  await page.getByRole("button", { name: /Residential Standard/ }).click();
  await expect(page.getByText("Broad Planning Range")).toBeVisible();
  await expect(page.getByText("Not a quote")).toBeVisible();

  await page.goto("/tools/species");
  await expect(page.getByRole("link", { name: "Open Email Draft" })).toBeVisible();
  await expect(page.locator("input[type=file]")).toHaveCount(0);
  await expect(page.getByText("Fatal Risk: 99% mortality", { exact: false })).toHaveCount(0);
  await expect(page.getByText("More concerns to review", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: /Ash Trees/ }).click();
  await page.getByRole("button", { name: "Start Hazard Assessment" }).click();
  await expect(page.getByRole("dialog", { name: "Review This Tree's Warning Signs" })).toBeVisible();
  await expect(page.getByText("Critical Species Risk", { exact: true })).toHaveCount(0);
  await expect(page.getByText(/does not establish that your tree is hazardous/i)).toBeVisible();

  await page.goto("/tools/diy");
  await expect(page.getByText("Professional Only — Do Not Attempt")).toBeVisible();
  await expect(page.getByText("Pull stump with vehicle", { exact: false })).toHaveCount(0);

  await page.goto("/tools/ailments");
  await page.getByRole("button", { name: /Emerald Ash Borer/ }).click();
  await expect(page.getByText(/does not identify or diagnose/i)).toBeVisible();
  await expect(page.getByText(/Do not treat from this entry alone/i)).toBeVisible();
});

test("location pages avoid unsupported neighborhood and permit promises", async ({ page }) => {
  await page.goto("/locations/omaha/dundee");
  await expect(page.getByText(/does not claim neighborhood-wide tree or soil conditions/i)).toBeVisible();
  await expect(page.getByText(/we know your trees/i)).toHaveCount(0);

  await page.goto("/locations/omaha");
  await expect(page.getByText(/confirm current requirements with the municipality/i)).toBeVisible();
  await expect(page.getByText(/handle all permit coordination/i)).toHaveCount(0);
});

test("mobile navigation and skip link remain available", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("link", { name: "Free Tools" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
