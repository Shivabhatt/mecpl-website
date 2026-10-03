import { expect, test } from "@playwright/test";

test("project map matches the editorial silhouette and keeps location selection working", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [1440, 402]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/completed-projects");

    const map = page.getByRole("img", { name: "Pune project region with selectable MECPL locations" });
    const silhouette = page.getByTestId("project-map-silhouette");
    const markers = page.locator('[data-testid^="button-project-map-"]');

    await map.scrollIntoViewIfNeeded();
    await expect(silhouette).toHaveAttribute("fill", "#e9e9e7");
    await expect(silhouette).toHaveAttribute("stroke", "#adb0ae");
    expect(await markers.count()).toBeGreaterThan(0);

    const firstMarker = markers.first();
    await firstMarker.click();
    await expect(firstMarker).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("project-map-detail-card")).toContainText("Kingsbury Pride Purple Group");
  }
});