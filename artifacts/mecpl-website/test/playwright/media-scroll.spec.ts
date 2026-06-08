import { test, expect } from '@playwright/test';

test('scroll-triggered video loads and plays (muted) then unloads', async ({ page }) => {
  await page.goto('http://localhost:4173/about');
  await page.waitForLoadState('networkidle');

  const panel = page.locator('[data-testid="scroll-video-panel"]');
  await expect(panel).toBeVisible();

  // Scroll the panel into view to trigger the IntersectionObserver
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // When in view the iframe should be created and include autoplay+mute params
  const iframe = page.locator('iframe', { hasText: '' });
  await expect(iframe).toHaveCount(1);
  const src = await iframe.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src).toContain('autoplay=1');
  expect(src).toContain('mute=1');

  // Scroll away and the iframe should be removed (unloaded)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await expect(page.locator('iframe')).toHaveCount(0);
});
