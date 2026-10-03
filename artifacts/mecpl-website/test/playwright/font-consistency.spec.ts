import { expect, test } from "@playwright/test";

test("all public site pages use Montserrat without a serif family override", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const routes = [
    "/", "/about", "/projects", "/services", "/completed-projects",
    "/ongoing-projects", "/clients", "/equipment", "/awards",
    "/certifications", "/blog", "/investors", "/careers", "/contact",
  ];

  for (const route of routes) {
    await page.goto(route);
    const fontFamilies = await page.locator(".site-typography").evaluate((root) =>
      Array.from(root.querySelectorAll<HTMLElement>("*"))
        .filter((element) => element.textContent?.trim())
        .map((element) => getComputedStyle(element).fontFamily)
        .filter((family) => !family.toLowerCase().includes("montserrat"))
    );
    expect(fontFamilies, `Unexpected font family on ${route}`).toEqual([]);
  }
});