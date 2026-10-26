import { expect, test } from "@playwright/test";

for (const width of [1440, 402]) {
  test(`project map preserves the gh-pages silhouette, photos and selection at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 874 });
    await page.goto("/projects");
    await expect(page.locator(".mecpl-preloader")).toHaveCount(0, { timeout: 30_000 });

    const map = page.getByRole("img", { name: "Pune project region with selectable MECPL locations" });
    const silhouette = page.getByTestId("project-map-silhouette");
    const markers = page.locator('[data-testid^="button-project-map-"]');
    const card = page.getByTestId("project-map-detail-card");
    await map.scrollIntoViewIfNeeded();
    await expect(silhouette).toHaveAttribute("fill", "#e9e9e7");
    await expect(silhouette).toHaveAttribute("stroke", "#adb0ae");
    expect(await markers.count()).toBeGreaterThan(0);
    await expect(page.locator("#map-project-select")).toHaveCount(0);
    await expect(page.getByTestId("project-map-count")).toHaveCount(0);
    await expect(card).not.toContainText("Project photograph not provided");

    await markers.first().click();
    await expect(markers.first()).toHaveAttribute("aria-pressed", "true");
    await expect(card.getByRole("heading")).toHaveText("Kingsbury Pride Purple Group");
    await expect(card.locator("img")).toHaveAttribute("src", "/assets/projects/Kingsbury.jpg");
    await expect.poll(() => card.locator("img").evaluate((image: HTMLImageElement) =>
      image.complete && image.naturalWidth > 0,
    )).toBe(true);

    await markers.last().focus();
    await expect(markers.last()).toHaveAttribute("aria-pressed", "true");
    await expect.poll(() => card.locator("img").evaluate((image: HTMLImageElement) =>
      image.complete && image.naturalWidth > 0,
    )).toBe(true);
    await expect(card).toContainText("MECPL Projects");
    await card.scrollIntoViewIfNeeded();
    const bounds = await card.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
