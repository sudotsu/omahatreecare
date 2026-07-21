import { expect, test } from "@playwright/test";

test("Treehouse landing, article, and archive routes render with publication controls", async ({ page, request }) => {
  for (const route of [
    "/treehouse",
    "/treehouse/guides",
    "/treehouse/field-notes",
    "/treehouse/tree-profiles",
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
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("/treehouse/guides");
  expect(sitemap).toContain("/treehouse/tree-removal-cost-omaha");

  const articleResponse = await request.get("/treehouse/tree-removal-cost-omaha");
  expect(articleResponse.status()).toBe(200);

  await page.goto("/treehouse");
  await expect(page.getByRole("heading", { name: "Practical Omaha tree care, explained from the ground up." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore homeowner guides/ })).toHaveAttribute("href", "/treehouse/guides");
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);

  await expect(page.getByRole("link", { name: "Tree Removal Cost in Omaha: What Changes the Price" }).first()).toBeVisible();

  await page.goto("/treehouse/tree-removal-cost-omaha");
  await expect(page.getByRole("heading", { name: "How Much Does Tree Removal Cost in Omaha?" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);
  await expect(page.getByText("July 21, 2026").first()).toBeVisible();
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

});
