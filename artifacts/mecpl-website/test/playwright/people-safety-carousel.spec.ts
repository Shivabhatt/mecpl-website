import { expect, test, type Locator, type Page } from "@playwright/test";

test.use({ reducedMotion: "no-preference", viewport: { width: 1440, height: 1000 } });
test.setTimeout(90000);

const carousel = (page: Page, name = "Safety photos") =>
  page.getByRole("region", { name, exact: true });
const current = (region: Locator) => region.locator('button[aria-current="true"]');
const photo = (region: Locator, number: number) =>
  region.getByRole("button", { name: new RegExp(`^Show image ${number} of`) });

async function leaveControls(page: Page) {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  // The full-bleed team image can occupy (0, 0) after scrolling.
  await page.mouse.move(-10, -10);
}

async function openSection(page: Page) {
  // Install before mounting: native timers created before clock.install cannot
  // be cancelled by the fake clearTimeout when a carousel is later paused.
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator(".mecpl-preloader")).toBeHidden({ timeout: 20000 });
  await page.getByTestId("section-people-safety").scrollIntoViewIfNeeded();
  const now = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(new Date(now + 1000));
}

async function selectFirst(page: Page, region: Locator) {
  await photo(region, 1).click();
  await leaveControls(page);
}

test("four-second advance, wrapping, independent hover pause and manual interval reset", async ({ page }) => {
  await openSection(page);
  const safety = carousel(page);
  const team = carousel(page, "Team photos");
  await expect(safety.locator("img")).toHaveCount(10);
  await expect(team.locator("img")).toHaveCount(7);

  await selectFirst(page, safety);
  await page.clock.runFor(3999);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await page.clock.runFor(1);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");

  // Select just before the old interval would have advanced.
  await page.clock.runFor(3900);
  await photo(safety, 5).click();
  await leaveControls(page);
  await page.clock.runFor(3999);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 5 of 10");
  await page.clock.runFor(1);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 6 of 10");

  await photo(safety, 10).click();
  await leaveControls(page);
  await page.clock.runFor(4000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");

  await safety.hover();
  await page.clock.runFor(9000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await page.mouse.move(0, 0);
  await page.clock.runFor(3999);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await page.clock.runFor(1);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");

  // Re-selecting the current photo must reset the timer even without a focus
  // or hover change (for example, assistive-technology activation).
  await page.clock.runFor(3900);
  await photo(safety, 2).dispatchEvent("click");
  await page.clock.runFor(3999);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");
  await page.clock.runFor(1);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 3 of 10");

  await selectFirst(page, safety);
  await selectFirst(page, team);
  await expect(safety.locator(".ps-carousel-playback")).toHaveCount(0);
  await expect(team.locator(".ps-carousel-playback")).toHaveCount(0);
  await safety.hover();
  await page.clock.runFor(4000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await expect(current(team)).toHaveAttribute("aria-label", "Show image 2 of 7");
  await leaveControls(page);
  await page.clock.runFor(3999);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await page.clock.runFor(1);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");
  await expect(current(team)).toHaveAttribute("aria-label", "Show image 3 of 7");

  // Re-selecting the current photo must reset the timer even without a focus
  // or hover change (for example, assistive-technology activation).
  await page.clock.runFor(3900);
  await photo(safety, 2).dispatchEvent("click");
  await page.clock.runFor(3999);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");
  await page.clock.runFor(1);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 3 of 10");
});

test("keyboard focus pauses autoplay while dot navigation remains available", async ({ page }) => {
  await openSection(page);
  const safety = carousel(page);
  await selectFirst(page, safety);
  await expect(safety.locator(".ps-carousel-playback")).toHaveCount(0);
  await photo(safety, 1).focus();
  await page.clock.runFor(8000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await page.keyboard.press("Tab");
  await expect(photo(safety, 2)).toBeFocused();
  await page.keyboard.press("Enter");
  await page.clock.runFor(8000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");
  await expect(safety.locator('[aria-live="polite"]')).toContainText("Photo 2 of 10");
  await page.keyboard.press("Tab");
  await expect(photo(safety, 3)).toBeFocused();
  await page.keyboard.press("Space");
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 3 of 10");
  await leaveControls(page);
  await page.clock.runFor(4000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 4 of 10");
});

test("reduced motion starts paused, removes fades, and responds to preference changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSection(page);
  const safety = carousel(page);
  await expect(safety.locator(".ps-carousel-playback")).toHaveCount(0);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await page.clock.runFor(12000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 1 of 10");
  await expect(safety.locator("img").first()).toHaveCSS("transition-duration", "0s");
  await photo(safety, 4).click();
  await leaveControls(page);
  await page.clock.runFor(8000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 4 of 10");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.runFor(4100);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 5 of 10");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.runFor(100);
  await page.clock.runFor(8000);
  await expect(current(safety)).toHaveAttribute("aria-label", "Show image 5 of 10");
});

test("timers are cancelled on hover and route unmount, without accumulating on remount", async ({ page }) => {
  await openSection(page);
  // Track only this component's viewing timers; leave unrelated page timers alone.
  await page.evaluate(() => {
    const pending = new Set<number>();
    const schedule = window.setTimeout.bind(window);
    const cancel = window.clearTimeout.bind(window);
    (window as unknown as { viewingTimers: Set<number> }).viewingTimers = pending;
    window.setTimeout = ((callback: TimerHandler, delay?: number, ...args: unknown[]) => {
      const tracked = delay === 4000 && new Error().stack?.includes("PeopleSafetySection.tsx");
      const id = schedule(() => {
        pending.delete(id);
        if (typeof callback === "function") callback(...args);
      }, delay);
      if (tracked) pending.add(id);
      return id;
    }) as typeof window.setTimeout;
    window.clearTimeout = (id) => {
      if (id !== undefined) pending.delete(id);
      cancel(id);
    };
  });
  const pendingCount = () => page.evaluate(() =>
    (window as unknown as { viewingTimers: Set<number> }).viewingTimers.size);
  await selectFirst(page, carousel(page));
  await selectFirst(page, carousel(page, "Team photos"));
  await expect.poll(pendingCount).toBe(2);
  await carousel(page).hover();
  await expect.poll(pendingCount).toBe(1);
  await leaveControls(page);
  await expect.poll(pendingCount).toBe(2);
  await page.getByRole("link", { name: "Our safety practices" }).click();
  await expect(carousel(page)).toHaveCount(0);
  await expect.poll(pendingCount).toBe(0);
  await page.clock.runFor(12000);
  await page.goBack();
  await expect(carousel(page)).toBeVisible();
  await expect.poll(pendingCount).toBe(2);
});

test.describe("touch controls", () => {
  test.use({ viewport: { width: 402, height: 874 }, hasTouch: true, isMobile: true });

  test("touch selection and full interval without sticky hover", async ({ page }) => {
    await openSection(page);
    const safety = carousel(page);
    await photo(safety, 8).tap();
    await page.getByRole("heading", { name: "Building safer lives. Not just structures." }).tap();
    // Touch actions may advance an animation frame while scrolling the target
    // into view, so use a margin rather than a one-millisecond boundary here.
    await page.clock.runFor(3500);
    await expect(current(safety)).toHaveAttribute("aria-label", "Show image 8 of 10");
    await page.clock.runFor(600);
    await expect(current(safety)).toHaveAttribute("aria-label", "Show image 9 of 10");
    await expect(safety.locator(".ps-carousel-playback")).toHaveCount(0);
    await photo(safety, 1).tap();
    await page.getByRole("heading", { name: "Building safer lives. Not just structures." }).tap();
    await page.clock.runFor(4000);
    await expect(current(safety)).toHaveAttribute("aria-label", "Show image 2 of 10");
    const bounds = await safety.locator(".ps-carousel-controls").boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(402);
  });
});
