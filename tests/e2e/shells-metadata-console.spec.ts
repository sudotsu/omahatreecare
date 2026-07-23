import { test, expect } from "@playwright/test";

// ARCH-001: each route family must render exactly one shell. Marketing routes
// own the global site navigation + footer; tool routes own the integrated tool
// shell and must NOT also mount the global chrome.
test.describe("ARCH-001 single shell per route family", () => {
  test("marketing route has one global nav and one footer @smoke", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label="Main navigation"]')).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
  });

  test("tool route has the tool shell and no global chrome @smoke", async ({ page }) => {
    await page.goto("/tools/cost");
    // Global marketing chrome must be absent (this was the duplicate-shell bug).
    await expect(page.locator('nav[aria-label="Main navigation"]')).toHaveCount(0);
    await expect(page.getByText("All rights reserved.")).toHaveCount(0);
    // Exactly one tool shell with its single integrated footer.
    await expect(page.locator("[data-tools-shell]")).toHaveCount(1);
    await expect(page.locator("[data-tools-shell-footer]")).toHaveCount(1);
    // Exactly one <main> landmark for the skip link to target.
    await expect(page.locator("main#main-content")).toHaveCount(1);
  });
});

// META-001: the homepage must declare one production canonical and a complete
// title that includes the business identity.
test.describe("META-001 homepage metadata", () => {
  test("homepage has a canonical and a branded title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Midwest Roots Tree Services/);
    const canonicals = page.locator('link[rel="canonical"]');
    await expect(canonicals).toHaveCount(1);
    await expect(canonicals).toHaveAttribute("href", "https://omahatreecare.com");
  });
});

// OBS-001: local (non-Vercel) production must not request Vercel-only endpoints,
// and representative routes must be free of unexpected console/page errors.
test.describe("OBS-001 clean local diagnostics", () => {
  for (const path of ["/", "/tools/cost", "/contact"]) {
    test(`no console errors or /_vercel/ requests on ${path}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const vercelRequests: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });
      page.on("requestfailed", (req) => {
        if (req.url().includes("/_vercel/")) vercelRequests.push(req.url());
      });
      page.on("request", (req) => {
        if (req.url().includes("/_vercel/")) vercelRequests.push(req.url());
      });

      await page.goto(path, { waitUntil: "networkidle" });

      expect(vercelRequests, `Unexpected Vercel requests: ${vercelRequests.join(", ")}`).toEqual([]);
      expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join(" | ")}`).toEqual([]);
      expect(pageErrors, `Unexpected page errors: ${pageErrors.join(" | ")}`).toEqual([]);
    });
  }
});
