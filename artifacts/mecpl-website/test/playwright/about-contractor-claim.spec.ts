import { expect, test } from "@playwright/test";

test("About highlights MECPL's Pune contractor claim without mobile overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const claimText = "NO. 1 TRUSTED CONTRACTOR IN PUNE";

  for (const width of [1440, 402, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const claim = page.getByText(claimText, { exact: true });
    await claim.scrollIntoViewIfNeeded();
    await expect(claim).toBeVisible();

    const metrics = await claim.evaluate((element) => {
      const originalText = element.textContent;
      const pageWidth = document.documentElement.scrollWidth;
      element.textContent = "MAHARASHTRA";
      const baselinePageWidth = document.documentElement.scrollWidth;
      element.textContent = originalText;

      return {
        width: element.clientWidth,
        contentWidth: element.scrollWidth,
        pageWidth,
        baselinePageWidth,
      };
    });
    expect(metrics.contentWidth).toBeLessThanOrEqual(metrics.width);
    expect(metrics.pageWidth).toBeLessThanOrEqual(Math.max(width, metrics.baselinePageWidth));
  }
});