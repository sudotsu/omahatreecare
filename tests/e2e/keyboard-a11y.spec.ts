import { test, expect } from "@playwright/test";

// A11Y-002: keyboard operability for the primary navigation and the species tool.
test.describe("A11Y-002 keyboard behavior", () => {
  test("Escape closes the mobile menu and returns focus to its trigger", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /open menu/i });
    await toggle.click();

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(mobileMenu).toBeHidden();
    // Focus must return to the (now "Open menu") trigger, not <body>.
    await expect(page.getByRole("button", { name: /open menu/i })).toBeFocused();
  });

  test("species search exposes a stable accessible name", async ({ page }) => {
    await page.goto("/tools/species");
    await expect(
      page.getByRole("textbox", { name: /search tree species/i }),
    ).toBeVisible();
  });
});
