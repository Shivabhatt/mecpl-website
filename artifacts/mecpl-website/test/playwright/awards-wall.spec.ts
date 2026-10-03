import { expect, test } from "@playwright/test";

const stage = (page: import("@playwright/test").Page) => page.getByTestId("awards-stage");
const rot = (page: import("@playwright/test").Page) => page.locator(".wof-ring").evaluate((el) => Number((el as HTMLElement).style.getPropertyValue("--rot")));
const visit = async (page: import("@playwright/test").Page, query = "") => {
  await page.goto(`/awards${query}#awards-wall`);
  if (await page.getByTestId("button-view-wall").isVisible()) {
    await page.getByTestId("button-view-wall").click();
  }
  await stage(page).scrollIntoViewIfNeeded();
  await expect(page.locator(".wof-wall")).toHaveClass(/is-entered/);
};

test("Awards navigation opens wall view even after previously choosing list view", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/certifications");
  await page.evaluate(() => sessionStorage.setItem("wof-view-v2", "list"));
  await page.getByRole("link", { name: "Awards", exact: true }).first().click();
  await expect(page).toHaveURL(/\/awards$/);
  await expect(stage(page)).toBeVisible();
  await page.getByTestId("button-view-list").click();
  await expect(page.getByTestId("list-filter-featured")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("awards-list").locator("li")).toHaveCount(8);
  await page.goto("/careers");
  await page.getByRole("link", { name: "Awards", exact: true }).first().click();
  await expect(stage(page)).toBeVisible();
  await page.setViewportSize({ width: 402, height: 874 });
  await page.goto("/awards");
  await expect(stage(page)).toBeVisible();
  await page.getByTestId("button-view-list").click();
  await page.reload();
  await expect(stage(page)).toBeVisible();
});

test("all awards, responsive geometry, categories, keyboard, dialogs and view switching", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1080 });
  await visit(page);
  await expect(page.locator(".wof-plaque")).toHaveCount(41);
  await expect(page.locator(".wof-plaque .wof-issuer")).toHaveCount(0);
  await expect(page.locator(".wof-dot")).toHaveCount(8);
  await expect(page.locator(".wof-col")).toHaveCount(18);
  await expect(page.locator(".wof-camera")).toHaveCSS("perspective", "none");
  await expect(page.locator(".wof-ring")).toHaveCSS("transform", "none");
  for (const column of await page.locator(".wof-col:not(.is-culled)").all()) {
    const flat = await column.evaluate(el => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return matrix.is2D && matrix.a === 1 && matrix.b === 0 && matrix.c === 0 && matrix.d === 1;
    });
    expect(flat).toBe(true);
    await expect(column).toHaveCSS("--light", "1");
  }
  const nav = page.getByRole("navigation", { name: "Award categories" });
  const navBox = (await nav.boundingBox())!;
  const stageBox = (await stage(page).boundingBox())!;
  expect(navBox.y + navBox.height).toBeLessThanOrEqual(stageBox.y);
  expect(navBox.width).toBe(1440);
  await expect(nav).toHaveCSS("padding-left", "120px");
  await expect(nav).toHaveCSS("padding-right", "120px");
  const trackBox = (await page.locator(".wof-track").boundingBox())!;
  expect(trackBox.x).toBeCloseTo(0, 0);
  expect(trackBox.width).toBeCloseTo(1440, 0);
  await expect(page.locator(".wof-seg").first()).toHaveCSS("justify-content", "center");
  await page.waitForTimeout(400);
  await page.getByTestId("section-wall-of-fame").screenshot({ path: "/tmp/awards-wall-desktop.png" });
  for (const key of ["national-state", "safety", "quality"]) {
    await page.getByTestId(`button-category-${key}`).click();
    await expect(page.getByTestId(`button-category-${key}`)).toHaveAttribute("aria-pressed", "true");
    const underline = await page.getByTestId(`button-category-${key}`).evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: parseFloat(getComputedStyle(el, "::after").width),
        labelWidth: el.getBoundingClientRect().width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
      };
    });
    expect(underline.width).toBeCloseTo(underline.labelWidth, 1);
    await expect(page).toHaveURL(new RegExp(`category=${key}`));
    await page.waitForTimeout(350);
  }
  const bai = page.getByTestId("plaque-quality-2025-bai-k57");
  await bai.focus();
  await page.waitForTimeout(350);
  await expect(bai.locator("img")).toHaveClass(/is-loaded/);
  await bai.press("Enter");
  await expect(page.locator("dialog")).toBeVisible();
  await expect(page.getByTestId("award-dialog")).toContainText("2025");
  await page.getByTestId("button-dialog-next").click();
  await expect(page.getByTestId("award-dialog")).toContainText("2024");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.getByTestId("plaque-quality-2024-bai-vantage")).toBeFocused();
  const offscreen = page.getByTestId("plaque-safety-2014-pcerf-emrius");
  await offscreen.focus();
  await page.waitForTimeout(350);
  await expect(offscreen.locator("..")).not.toHaveClass(/is-culled/);
  await stage(page).focus();
  const before = await rot(page);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(350);
  expect(await rot(page)).not.toBe(before);
  await page.getByTestId("button-view-list").click();
  await expect(page.getByTestId("awards-list").locator("li")).toHaveCount(8);
  await expect(page.getByTestId("list-filter-featured")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("list-filter-featured")).toBeFocused();
  await expect.poll(async () => (await page.getByRole("navigation", { name: "Filter awards" }).boundingBox())!.y).toBeGreaterThanOrEqual(80);
  await expect.poll(async () => (await page.getByRole("navigation", { name: "Filter awards" }).boundingBox())!.y).toBeLessThan(130);
  await page.reload();
  await expect(stage(page)).toBeVisible();
  for (const width of [1280, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 874 });
    await page.waitForTimeout(250);
    await expect(page.locator(".wof-col")).toHaveCount(width < 768 ? 25 : 18);
    const resizedTrack = (await page.locator(".wof-track").boundingBox())!;
    expect(resizedTrack.x).toBeCloseTo(0, 0);
    expect(resizedTrack.width).toBeCloseTo(width, 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) await page.getByTestId("section-wall-of-fame").screenshot({ path: "/tmp/awards-wall-mobile.png" });
  }
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".wof-print-only .wof-list")).toBeVisible();
  await page.emulateMedia({ media: "screen" });
  expect(errors).toEqual([]);
});

test("deep-linked award opens and closes with focus return", async ({ page }) => {
  await visit(page, "?category=quality&award=quality-2025-bai-k57");
  await expect(page.locator("dialog")).toBeVisible();
  await expect(page.getByTestId("award-dialog")).toContainText("KRC K57");
  await page.getByTestId("button-dialog-next").click();
  await expect(page).toHaveURL(/award=quality-2024-bai-vantage/);
  await page.getByTestId("button-dialog-close").click();
  await expect(page).not.toHaveURL(/award=/);
  await expect(page.getByTestId("plaque-quality-2024-bai-vantage")).toBeFocused();
});

test("drag, looping, horizontal wheel and vertical scroll", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1080 });
  await visit(page);
  await page.waitForTimeout(2000);
  const r = (await stage(page).boundingBox())!;
  await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  let before = await rot(page);
  await page.mouse.down();
  await page.mouse.move(r.x + 200, r.y + r.height / 2, { steps: 15 });
  await page.mouse.up();
  await expect(page.locator("dialog")).not.toBeVisible();
  await page.waitForTimeout(1700);
  expect(await rot(page)).not.toBe(before);
  for (const deltaX of [8500, -17000, 8500]) {
    await stage(page).dispatchEvent("wheel", { deltaX, deltaY: 0 });
    await page.waitForTimeout(700);
    expect(await stage(page).evaluate((el) => el.querySelectorAll(".wof-col:not(.is-culled)").length)).toBeGreaterThan(5);
  }
  before = await rot(page);
  const defaultPrevented = await stage(page).evaluate((el) => {
    let stagePrevented = false;
    el.addEventListener("wheel", (e) => { stagePrevented = e.defaultPrevented; }, { once: true });
    const e = new WheelEvent("wheel", { deltaY: 100, cancelable: true, bubbles: true });
    el.dispatchEvent(e);
    return stagePrevented; // Lenis may consume it later on window to scroll smoothly.
  });
  expect(defaultPrevented).toBe(false);
  expect(await rot(page)).toBe(before);
  await page.getByTestId("button-category-safety").click();
  await page.waitForTimeout(200);
  await page.getByTestId("button-category-quality").click();
  await page.waitForTimeout(1400);
  await expect(page.getByTestId("button-category-quality")).toHaveAttribute("aria-pressed", "true");
});

test("no-JS archive remains readable", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/awards`);
  await expect(page.locator(".awards-nojs")).toBeVisible();
  await expect(page.locator(".awards-nojs li")).toHaveCount(41);
  await expect(page.locator(".awards-nojs h2")).toHaveCount(3);
  await context.close();
});

test("reference-style awards list keeps logos and years in the same row", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/awards");
  await page.getByTestId("button-view-list").click();
  await page.getByTestId("list-filter-all").click();
  const list = page.getByTestId("awards-list");
  await expect(list.locator("li")).toHaveCount(41);
  await expect(list.locator(".wof-medal")).toHaveCount(41);
  await expect(page.getByRole("heading", { name: "Awards and recognition" })).toBeVisible();
  await expect(stage(page)).toHaveCount(0);
  await expect(list).toHaveCSS("padding-left", "120px");
  await expect(list).toHaveCSS("padding-right", "120px");
  const heading = (await list.locator("h2").boundingBox())!;
  const first = list.locator("li").first();
  const row = (await first.boundingBox())!;
  expect(heading.x + heading.width).toBeLessThan(row.x);
  await page.getByTestId("section-wall-of-fame").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 90));
  await expect(first.locator("img")).toHaveClass(/is-loaded/);
  await page.waitForTimeout(350);
  await page.screenshot({ path: "/tmp/awards-reference-list-desktop.png" });
  for (const width of [402, 360]) {
    await page.setViewportSize({ width, height: 874 });
    await expect(list).toHaveCSS("padding-left", "24px");
    const bounds = await first.evaluate((el) => [".wof-medal", ".t", ".y"].map((selector) => {
      const rect = el.querySelector(selector)!.getBoundingClientRect();
      return { centerY: rect.y + rect.height / 2, top: rect.top, bottom: rect.bottom, x: rect.x, right: rect.right };
    }));
    expect(bounds[0].centerY).toBeCloseTo(bounds[1].centerY, 0);
    expect(bounds[2].centerY).toBeGreaterThanOrEqual(bounds[1].top);
    expect(bounds[2].centerY).toBeLessThanOrEqual(bounds[1].bottom);
    expect(bounds[0].right).toBeLessThan(bounds[1].x);
    expect(bounds[1].right).toBeLessThan(bounds[2].x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 402) await page.screenshot({ path: "/tmp/awards-reference-list-mobile.png" });
  }
  await page.reload();
  await expect(stage(page)).toBeVisible();
  await expect(page.getByTestId("button-view-list")).toBeVisible();
});

test("awards trophy banner matches the homepage full-screen height", async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 402, height: 874 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const homeHeight = await page.getByTestId("section-hero").evaluate((el) => el.getBoundingClientRect().height);
    await page.goto("/awards");
    const hero = page.locator(".emblem-hero");
    await expect(hero.locator(".emblem-eyebrow")).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(hero.locator(".emblem-eyebrow")).toHaveCSS("letter-spacing", "normal");
    await expect(hero.locator(".emblem-eyebrow span")).toHaveCount(0);
    await expect(hero.locator("h1")).toHaveCSS("font-size", "35px");
    await expect(hero.locator("h1")).toHaveCSS("font-weight", "500");
    await expect(hero.locator("h1 em")).toHaveCSS("font-size", "35px");
    await expect(hero.locator("h1 em")).toHaveCSS("font-weight", "500");
    await expect(hero.locator("h1 em")).toHaveCSS("color", "rgb(255, 255, 255)");
    const box = (await hero.boundingBox())!;
    expect(box.height).toBe(homeHeight);
    expect(box.y).toBe(0);
    await expect(hero).toHaveCSS("background-size", "cover");
    const image = await hero.evaluate(async (el) => {
      const url = getComputedStyle(el).backgroundImage.slice(5, -2);
      const img = new Image();
      img.src = url;
      await img.decode();
      return { src: img.src, width: img.naturalWidth };
    });
    expect(image.src).toContain("awards-trophy-banner.webp");
    expect(image.width).toBe(1916);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("list filters omit counts, filter real awards, and show hover feedback", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/awards");
  await page.getByTestId("button-view-list").click();
  const list = page.getByTestId("awards-list");
  const filters = page.getByRole("navigation", { name: "Filter awards" });
  await expect(filters.getByRole("button")).toHaveText(["Featured", "Safety", "Quality", "National & State", "All"]);
  for (const [key, count] of [["featured", 8], ["safety", 13], ["quality", 19], ["national-state", 9], ["all", 41]] as const) {
    await page.getByTestId(`list-filter-${key}`).click();
    await expect(page.getByTestId(`list-filter-${key}`)).toHaveAttribute("aria-pressed", "true");
    await expect(list.locator("li")).toHaveCount(count);
    await expect(list.locator(".wof-medal")).toHaveCount(count);
    await expect(filters.locator('[aria-pressed="true"]')).toHaveCount(1);
  }
  const safety = page.getByTestId("list-filter-safety");
  await safety.hover();
  await expect(safety).toHaveCSS("color", "rgb(236, 51, 56)");
  await safety.focus();
  await safety.press("Space");
  await expect(list.locator("li")).toHaveCount(13);
  await page.getByTestId("list-filter-featured").click();
  const row = list.locator("li").first();
  await row.hover();
  await expect(row).toHaveCSS("background-color", "rgb(247, 247, 247)");
  await expect(row.locator(".tt")).toHaveCSS("color", "rgb(236, 51, 56)");
  await page.getByTestId("section-wall-of-fame").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 90));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "/tmp/awards-list-filters-desktop.png" });
  for (const width of [402, 360]) {
    await page.setViewportSize({ width, height: 874 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByTestId("list-filter-quality").click();
    await expect(list.locator("li")).toHaveCount(19);
    if (width === 402) {
      await page.getByTestId("section-wall-of-fame").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 90));
      await page.screenshot({ path: "/tmp/awards-list-filters-mobile.png" });
    }
  }
});

test("light-grey plaques have charcoal logo rings and leadership-style red hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await visit(page, "?category=quality");
  await page.waitForTimeout(450);
  const plaque = page.getByTestId("plaque-quality-2025-bai-k57");
  await expect(page.getByTestId("section-wall-of-fame")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(plaque).toHaveCSS("background-color", "rgb(236, 238, 239)");
  await expect(plaque.locator(".wof-medal")).toHaveCSS("box-shadow", "rgb(37, 41, 43) 0px 0px 0px 3px");
  await plaque.focus();
  await page.waitForTimeout(350);
  await plaque.hover();
  await expect(plaque).toHaveCSS("background-color", "rgb(236, 51, 56)");
  for (const selector of [".wof-year", ".wof-ptitle", ".wof-proj"]) {
    await expect(plaque.locator(selector)).toHaveCSS("color", "rgb(255, 255, 255)");
  }
  await page.getByTestId("section-wall-of-fame").screenshot({ path: "/tmp/awards-red-hover.png" });
  await stage(page).focus();
  await page.mouse.move(0, 0);
  await expect(plaque).toHaveCSS("background-color", "rgb(236, 238, 239)");
});

test("touch swipe rotates while vertical touch scrolls the page", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 874 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await visit(page);
  await page.waitForTimeout(400);
  const client = await context.newCDPSession(page);
  const swipe = async (x: number, y: number, dx: number, dy: number) => {
    await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let i = 1; i <= 12; i++) {
      await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x + dx * i / 12, y: y + dy * i / 12 }] });
      await page.waitForTimeout(16);
    }
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(500);
  };
  let box = (await stage(page).boundingBox())!;
  const before = await rot(page);
  await swipe(280, box.y + 160, -180, 0);
  expect(await rot(page)).not.toBe(before);
  await expect(page.locator("dialog")).not.toBeVisible();
  box = (await stage(page).boundingBox())!;
  const oldY = await page.evaluate(() => scrollY);
  const oldRot = await rot(page);
  await swipe(190, box.y + 240, 0, -160);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(oldY + 40);
  expect(await rot(page)).toBe(oldRot);
  await context.close();
});