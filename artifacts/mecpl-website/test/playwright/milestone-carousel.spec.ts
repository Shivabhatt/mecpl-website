import { expect, test } from "@playwright/test";

test("milestone arrows and horizontal scrolling work on a phone-sized viewport", async ({
  page,
}) => {
  await page.goto("/about");

  const timeline = page.getByTestId("section-about-journey");
  const scroller = page.getByLabel("Journey milestones", { exact: true });
  const milestones = scroller.locator(".abt-journey-track > article");
  const controls = page.getByRole("navigation", {
    name: "Journey carousel controls",
  });
  const previous = controls.getByRole("button", {
    name: "Previous milestone",
  });
  const next = controls.getByRole("button", { name: "Next milestone" });
  const liveCount = controls.locator('[aria-live="polite"]');
  const expectCurrentMilestone = (position: string, year: string) =>
    expect(liveCount).toHaveText(
      new RegExp(`^${position}\\s*\\/\\s*11\\s*${year}$`),
    );

  await timeline.scrollIntoViewIfNeeded();
  await expect(milestones).toHaveCount(11);
  await expectCurrentMilestone("01", "1975");
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();

  const { clientWidth, scrollWidth } = await scroller.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(scrollWidth).toBeGreaterThan(clientWidth);

  const initialScrollLeft = await scroller.evaluate((element) => element.scrollLeft);
  await next.click();
  await expectCurrentMilestone("02", "2000");
  await expect
    .poll(() => scroller.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(initialScrollLeft);
  const nextScrollLeft = await scroller.evaluate((element) => element.scrollLeft);

  await previous.click();
  await expectCurrentMilestone("01", "1975");
  await expect
    .poll(() => scroller.evaluate((element) => element.scrollLeft))
    .toBeLessThan(nextScrollLeft);
  await expect(previous).toBeDisabled();

  const lastMilestone = milestones.nth(10);
  await scroller.evaluate((element) => {
    element.scrollLeft = element.scrollWidth;
  });

  await expect(lastMilestone).toBeInViewport();
  await expectCurrentMilestone("11", "2026");
  await expect(previous).toBeEnabled();
  await expect(next).toBeDisabled();
});