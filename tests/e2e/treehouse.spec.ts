import { expect, test } from "@playwright/test";

test("Treehouse landing, article, and archive routes render with publication controls", async ({ page, request }) => {
  for (const route of [
    "/treehouse",
    "/treehouse/guides",
    "/treehouse/field-notes",
    "/treehouse/tree-profiles",
    "/treehouse/tree-removal-cost-omaha",
    "/services/tree-removal",
    "/tools/cost",
    "/tools/hazard",
    "/tools/species",
    "/tools/diy",
    "/contact",
  ]) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
  }

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(await sitemapResponse.text()).not.toContain("/treehouse");

  await page.goto("/treehouse");
  await expect(page.getByRole("heading", { name: "Practical Omaha tree care, explained from the ground up." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore homeowner guides/ })).toHaveAttribute("href", "/treehouse/guides");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  await page.goto("/treehouse/tree-removal-cost-omaha");
  await expect(page.getByRole("heading", { name: "How Much Does Tree Removal Cost in Omaha?" })).toBeVisible();
  await expect(page.getByText(/Publication hold:/)).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("link", { name: "Start the cost planner" }).first()).toHaveAttribute("href", "/tools/cost");
  await expect(page.getByRole("link", { name: "Omaha tree-removal services" }).first()).toHaveAttribute("href", "/services/tree-removal");
  await expect(page.getByRole("heading", { name: "Frequently Asked Questions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sources" })).toBeVisible();

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.some((value) => JSON.parse(value)["@type"] === "BlogPosting")).toBe(true);
  expect(schemas.some((value) => JSON.parse(value)["@type"] === "BreadcrumbList")).toBe(true);
});

test("empty category archives remain useful, noindex, and free of invented entries", async ({ page }) => {
  await page.goto("/treehouse/field-notes");
  await expect(page.getByRole("heading", { name: "No placeholder articles here." })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("article")).toHaveCount(0);
});

test("Treehouse remains readable and navigable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/treehouse");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("link", { name: "The Treehouse", exact: true }).last()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  await page.goto("/treehouse/tree-removal-cost-omaha");
  await expect(page.getByText("In this guide", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
