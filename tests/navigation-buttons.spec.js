import { expect, test } from '@playwright/test';

test.describe('Navigation buttons', () => {

  test('desktop dropdown and links stay usable', async ({ page }) => {
    // 1. Setup Desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('https://omahatreecare.com', { waitUntil: 'networkidle' });

    const nav = page.locator('nav');
    // Ensure nav is ready
    await expect(nav).toBeVisible();

    const servicesBtn = nav.getByRole('button', { name: 'Services' });
    await expect(servicesBtn).toBeVisible();

    // 2. The "Gap Hunter" Maneuver
    const box = await servicesBtn.boundingBox();
    if (!box) throw new Error('Services button not found');

    // Move to center of button
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(500); // Wait for open

    // Slide down into the "Danger Zone" (The Gap)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height + 10, { steps: 10 });
    await page.waitForTimeout(300);

    // 3. Find Dropdown (Using the Robust Selector)
    // We look for .shadow-lg because that persists in both old and new designs
    const dropdown = nav.locator('.shadow-lg').filter({ hasText: 'Tree Removal' }).first();
    await expect(dropdown).toBeVisible({ timeout: 2000 });

    // 4. Loop through every link to make sure none are broken
    const links = ['Tree Removal', 'Tree Trimming', 'Health Assessment', 'Winter Tree Prep'];

    for (const text of links) {
      console.log(`Testing link: ${text}`);
      await dropdown.getByRole('link', { name: text }).click();

      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/services\//);

      // Go back and reset for the next link
      await page.goBack({ waitUntil: 'networkidle' });
      await servicesBtn.hover(); // Re-open menu
      await page.waitForTimeout(500);
    }
  });

  test('mobile menu buttons clickable', async ({ page }) => {
    // 1. Setup Mobile (iPhone size)
    await page.setViewportSize({ width: 430, height: 900 });
    await page.goto('https://omahatreecare.com', { waitUntil: 'networkidle' });

    // 2. Open Hamburger Menu
    const menuToggle = page.getByRole('button', { name: /open menu/i });
    await menuToggle.click();

    // 3. Loop through mobile links
    const mobileLinks = ['Tree Removal', 'Tree Trimming', 'Health Assessment', 'Winter Tree Prep', 'Free Tool'];

    for (const text of mobileLinks) {
      console.log(`Testing Mobile link: ${text}`);

      // Click
      await page.locator('nav').getByRole('link', { name: text }).click();
      await page.waitForLoadState('networkidle');

      // Verify we didn't crash (URL check)
      await expect(page).not.toHaveURL('about:blank');

      // Reset
      await page.goBack({ waitUntil: 'networkidle' });
      await menuToggle.click(); // Re-open menu
    }
  });
});