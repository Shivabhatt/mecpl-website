import { expect, test } from "@playwright/test";

test("About keeps sector dividers, uses Services-style red icons, and matches all statistic and label typography", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [1440, 768, 402, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const section = page.getByTestId("section-about-sectors");
    const claim = section.getByText("No. 1", { exact: true });
    await claim.scrollIntoViewIfNeeded();
    await expect(claim).toBeVisible();
    await expect(section.getByText("REGIONAL PRESENCE", { exact: true })).toHaveCount(0);

    await expect(section.locator(".abt-sector-icon")).toHaveCount(6);
    await expect(section.locator(".abt-stat-item").nth(1)).toContainText("150+");
    await expect(section.locator(".abt-stat-item").nth(1)).toContainText("COMPLETED PROJECTS");
    const metrics = await section.evaluate((element) => {
      const rank = element.querySelector(".abt-stat-rank")!;
      const description = element.querySelector(".abt-stat-description")!;
      const type = (item: Element) => {
        const style = getComputedStyle(item);
        return { size: style.fontSize, family: style.fontFamily, weight: style.fontWeight, leading: style.lineHeight };
      };
      const values = [...element.querySelectorAll(".abt-stat-item")].map((item) =>
        type(item.querySelector(".abt-stat-rank") ?? item.querySelector(".abt-stat-value")!));
      return {
        width: element.clientWidth, contentWidth: element.scrollWidth,
        values,
        labels: [...element.querySelectorAll(".abt-stat-label")].map(type),
        rankBottom: rank.getBoundingClientRect().bottom,
        descriptionTop: description.getBoundingClientRect().top,
        icons: [...element.querySelectorAll(".abt-sector-icon")].map((icon) => getComputedStyle(icon).color),
        borderTop: getComputedStyle(element.querySelector(".abt-sectors-list")!).borderTopWidth,
        hoverLine: getComputedStyle(element.querySelector(".abt-sector-tab")!, "::after").display,
        serviceIconBoxes: [...element.querySelectorAll(".abt-sector-icon")].map((icon) => icon.getAttribute("viewBox")),
        divider: getComputedStyle(element.querySelector(".abt-sectors-inner")!, "::after").display,
      };
    });
    expect(metrics.contentWidth).toBeLessThanOrEqual(metrics.width);
    expect(metrics.values[1]).toEqual(metrics.values[0]);
    expect(metrics.values[2]).toEqual(metrics.values[0]);
    expect(metrics.labels.every((label) => JSON.stringify(label) === JSON.stringify(metrics.labels[0]))).toBe(true);
    expect(metrics.descriptionTop).toBeGreaterThanOrEqual(metrics.rankBottom);
    expect(metrics.icons.every((color) => color === "rgb(236, 51, 56)")).toBe(true);
    expect(metrics.borderTop).toBe("1px");
    expect(metrics.divider).not.toBe("none");
    expect(metrics.hoverLine).toBe("none");
    expect(metrics.serviceIconBoxes.every((box) => box === "0 0 48 48")).toBe(true);
  }
});