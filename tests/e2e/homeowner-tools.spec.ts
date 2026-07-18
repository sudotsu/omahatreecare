import { expect, test } from "@playwright/test";

test("legacy receipt URL cannot display success without accepted contact data", async ({ page }) => {
  await page.goto("/free-tree-assessment-omaha?zip=68104&service=tree-removal");
  await expect(page.getByRole("heading", { name: "Finish Your Estimate Request" })).toBeVisible();
  await expect(page.getByText("Request Received!", { exact: true })).toHaveCount(0);
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
