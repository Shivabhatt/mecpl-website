import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

type ApprovedProject = {
  id: string; name: string; client: string; location: string;
  type: string; status: string;
};

// Independent expected records come from the actual uploaded workbook, not
// from the frontend's array. This also checks workbook/data parity.
const projects = JSON.parse(execFileSync("python", [
  fileURLToPath(new URL("../../../../scripts/verify-approved-project-list.py", import.meta.url)),
  "--json",
], { encoding: "utf8" })) as ApprovedProject[];

for (const width of [1440, 402]) {
  test(`approved projects appear only in the correct tabs and pages at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 874 });
    await page.goto("/projects");
    await expect(page.locator(".mecpl-preloader")).toHaveCount(0, { timeout: 30_000 });
    const grid = page.getByTestId("section-projects-grid");
    const cards = grid.locator("[data-project-id]");
    const navigation = page.getByRole("navigation", { name: "Project pages" });
    const filters = page.getByTestId("section-project-filters");
    const map = page.getByTestId("section-project-explorer");
    const mapMarkerLabels = await map.locator('[data-testid^="button-project-map-"]').evaluateAll(
      elements => elements.map(element => element.getAttribute("aria-label")),
    );
    const mapInitialImage = await map.locator("article img").getAttribute("src");

    for (const filter of ["All", "Residential", "Commercial", "Industrial", "Ongoing Projects"]) {
      const expected = projects.filter(project => filter === "All" ||
        (filter === "Ongoing Projects" ? project.status === "Ongoing" : project.type === filter));
      await filters.getByRole("button", { name: filter, exact: true }).click();
      await expect(filters.getByRole("button", { name: filter, exact: true })).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByTestId("project-gallery-count")).toHaveCount(0);
      const seen: string[] = [];

      for (let offset = 0; offset < expected.length; offset += 4) {
        const slice = expected.slice(offset, offset + 4);
        await expect(cards).toHaveCount(slice.length);
        await expect(navigation.getByRole("button", { name: "Previous", exact: true }))
          .toBeEnabled({ enabled: offset > 0 });

        for (let index = 0; index < slice.length; index++) {
          const project = slice[index];
          const card = cards.nth(index);
          await expect(card).toHaveAttribute("data-project-id", project.id);
          await expect(card.getByRole("heading")).toHaveText(project.name);
          await expect(card.locator('[data-testid^="category-project-"]')).toHaveText(project.type);
          await expect(card.locator("dd").nth(0)).toHaveText(project.client);
          await expect(card.locator("dd").nth(1)).toHaveText(project.status);
          await expect(card).toContainText(project.location);
          const image = card.locator("img").first();
          if (await image.count()) {
            await card.scrollIntoViewIfNeeded();
            await expect.poll(() => image.evaluate((element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
            )).toBe(true);
          } else {
            await expect(card).toContainText("Project photograph not provided");
          }
          const bounds = await card.boundingBox();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
          seen.push(project.id);
        }
        const next = navigation.getByRole("button", { name: "Next", exact: true });
        if (offset + 4 < expected.length) await next.click();
        else await expect(next).toBeDisabled();
      }
      expect(seen).toEqual(expected.map(project => project.id));
      expect(new Set(seen).size).toBe(expected.length);
    }

    // Browsing/filtering the approved gallery must not alter the legacy map.
    expect(await map.locator('[data-testid^="button-project-map-"]').evaluateAll(
      elements => elements.map(element => element.getAttribute("aria-label")),
    )).toEqual(mapMarkerLabels);
    await expect(map.locator("article img")).toHaveAttribute("src", mapInitialImage!);
    await expect(map.locator("select")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
