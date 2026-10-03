import { expect, test } from "@playwright/test";

test("project headings show category labels without numbered prefixes or dash dividers", async ({ page }) => {
  await page.goto("/completed-projects");
  const cards = page.locator('[data-testid^="card-project-"]');
  const categories = page.locator('[data-testid^="category-project-"]');
  await expect(categories).toHaveCount(await cards.count());
  for (const category of await categories.all()) {
    await expect(category).toHaveText(/^(Residential|Commercial|Industrial|Ongoing Projects)$/);
    await expect(category.locator("span")).toHaveCount(0);
  }
});

test("Completed Projects metrics span the available width with 120px desktop side padding", async ({ page }) => {
  for (const width of [1920, 1440, 768, 402]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/completed-projects");
    const metrics = page.getByTestId("section-project-metrics");
    const padding = width >= 768 ? 120 : 24;
    await expect(metrics).toHaveCSS("padding-left", `${padding}px`);
    await expect(metrics).toHaveCSS("padding-right", `${padding}px`);
    const grid = metrics.locator(":scope > div");
    await expect(grid).toHaveCSS("max-width", "none");
    const box = (await grid.boundingBox())!;
    expect(box.x).toBeCloseTo(padding, 0);
    expect(box.width).toBeCloseTo(width - 2 * padding, 0);
    for (const label of ["Projects Delivered", "Sq. Ft. Delivered", "Locations in Pune"]) {
      await expect(metrics).toContainText(label);
    }
    await expect(grid.locator(":scope > div")).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await metrics.screenshot({ path: `/tmp/completed-projects-metrics-${width}.jpg` });
  }
});