import { expect, test } from "@playwright/test";

test("certifications-only page uses the real integrated certificate and common shell", async ({ page }) => {
  for (const width of [1440, 402, 360]) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 874 });
    await page.goto("/awards");
    const bannerHeight = (await page.locator(".emblem-hero").boundingBox())!.height;
    await page.goto("/certifications");
    await expect(page).toHaveTitle("Certifications | MECPL");
    await expect(page.getByTestId("certifications-page")).toBeVisible();
    await expect(page.locator("h1")).toHaveCSS("font-size", "35px");
    await expect(page.locator("h1")).toHaveCSS("font-weight", "500");
    await expect(page.locator("h1")).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(page.getByTestId("cert-stats")).toContainText("Integrated certificate");
    await expect(page.getByTestId("cert-stats")).toContainText("2026");
    await expect(page.getByTestId("cert-stats")).toContainText("Latest recertification");
    await expect(page.getByTestId("cert-stats")).not.toContainText("Valid until");
    await expect(page.locator(".cert-closing")).toHaveCount(0);
    await expect(page.getByTestId("button-cert-enquire")).toHaveCount(0);
    await expect(page.getByTestId("link-cert-projects")).toHaveCount(0);
    await expect(page.locator('[data-testid^="card-standard-"]')).toHaveCount(3);
    await expect(page.locator(".cert-standards")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".cs-slab")).toHaveCSS("border-left-width", "0px");
    expect(await page.getByTestId("card-standard-0").evaluate(el => getComputedStyle(el, "::before").content)).toBe("none");
    await expect(page.locator(".cs-list")).toHaveCSS("row-gap", "24px");
    for (let i = 0; i < 3; i++) {
      const standard = page.getByTestId(`card-standard-${i}`);
      await expect(standard).toHaveCSS("background-color", "rgb(247, 247, 247)");
      await expect(standard.locator(".cs-cta svg")).toHaveClass(/lucide-arrow-right(?:\s|$)/);
      await expect(standard).toHaveCSS("border-left-width", "3px");
      await expect(standard).toHaveCSS("border-left-color", "rgb(236, 51, 56)");
      if (i > 0) {
        const previous = (await page.getByTestId(`card-standard-${i - 1}`).boundingBox())!;
        const current = (await standard.boundingBox())!;
        expect(current.y - (previous.y + previous.height)).toBeGreaterThanOrEqual(23);
      }
    }
    for (const selector of [".cert-label", "h2", ".cert-note"]) {
      await expect(page.locator(`.cert-standards .cert-wrap > ${selector}`)).toHaveCSS("text-align", "center");
    }
    for (const [i, code] of ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"].entries()) {
      await expect(page.getByTestId(`card-standard-${i}`)).toContainText(code);
      const logo = page.getByTestId(`logo-standard-${i}`);
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute("src", /assets\/recognition\/iso-mark\.png$/);
      await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(303);
      const logoBox = (await logo.boundingBox())!;
      expect(logoBox.width).toBeGreaterThanOrEqual(60);
    }
    await expect(page.locator("main")).not.toContainText(/GreenPro|SME 100|Small Giants|Vishwakarma/);
    await expect(page.getByTestId("link-nav-certifications")).toHaveAttribute("href", "/certifications");
    if (width < 820) {
      await page.getByTestId("button-hamburger").click();
      await expect(page.getByTestId("link-mobile-certifications")).toHaveAttribute("href", "/certifications");
      await page.getByTestId("button-hamburger").click();
    }
    await expect(page.locator("footer")).toBeAttached();
    const awardsCTA = page.getByTestId("cert-awards-cta");
    await expect(awardsCTA).toHaveCSS("text-align", "center");
    await expect(awardsCTA).toHaveCSS("background-color", "rgb(35, 37, 41)");
    await expect(awardsCTA.locator("h2")).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(page.getByTestId("link-cert-awards")).toHaveAttribute("href", "/awards");
    await expect(page.getByTestId("link-cert-awards").locator("svg")).toHaveClass(/lucide-arrow-right(?:\s|$)/);
    const footerBox = (await page.locator("footer").boundingBox())!;
    const ctaBox = (await awardsCTA.boundingBox())!;
    expect(ctaBox.y + ctaBox.height).toBeLessThanOrEqual(footerBox.y + 1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    const hero = page.locator(".cert-hero");
    await expect(hero).toHaveCSS("background-size", "cover");
    await expect(hero).toHaveCSS("background-position", width === 1440 ? "100% 50%" : "92% 50%");
    await expect(hero.locator(".cert-hero-inner")).toHaveCSS("text-align", "center");
    expect((await hero.boundingBox())!.height).toBe(bannerHeight);
    const heroImage = await hero.evaluate(async (el) => {
      const url = getComputedStyle(el).backgroundImage.slice(5, -2);
      const img = new Image();
      img.src = url;
      await img.decode();
      return { url, width: img.naturalWidth };
    });
    expect(heroImage.url).toContain("certifications-banner.webp");
    expect(heroImage.width).toBe(1983);
    await expect(page.getByTestId("cert-assurance")).toHaveCSS("background-color", "rgb(35, 37, 41)");
    const assurance = page.getByTestId("cert-assurance");
    await expect(assurance.locator(".cert-wrap")).toHaveCSS("max-width", "none");
    await expect(assurance.locator(".cert-wrap")).toHaveCSS("padding-left", width === 1440 ? "120px" : "24px");
    await expect(assurance.locator(".cert-wrap")).toHaveCSS("padding-right", width === 1440 ? "120px" : "24px");
    await expect(assurance.locator("h2")).toHaveCount(0);
    await expect(page.getByTestId("cert-stats").locator("strong").first()).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(hero).not.toContainText("Quality / Environment / People");
    await expect(hero).not.toContainText("Independent verification");
    await expect(hero.locator("button")).toHaveCount(0);
    await page.screenshot({ path: `/tmp/certifications-page-${width}.jpg`, fullPage: true });
    await page.locator(".cert-standards").screenshot({ path: `/tmp/certifications-standards-${width}.jpg` });
    await awardsCTA.screenshot({ path: `/tmp/certifications-awards-cta-${width}.jpg` });
    await assurance.screenshot({ path: `/tmp/certifications-assurance-${width}.jpg` });
  }
});

test("View Awards CTA navigates to awards and is limited to Certifications", async ({ page }) => {
  await page.goto("/certifications");
  await page.getByTestId("link-cert-awards").click();
  await expect(page).toHaveURL(/\/awards$/);
  await expect(page.locator(".emblem-hero")).toBeVisible();
  await expect(page.getByTestId("cert-awards-cta")).toHaveCount(0);
});

test("certificate popup supports real image, navigation, focus and dismissal on desktop and mobile", async ({ page }) => {
  for (const width of [1440, 402, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/certifications");
    const opener = page.getByTestId("card-standard-0");
    await opener.focus();
    await opener.press("Enter");
    const viewer = page.getByTestId("certificate-viewer");
    await expect(viewer).toBeVisible();
    await expect(page.getByTestId("certificate-counter")).toHaveText("Standard 1 / 3");
    await expect(viewer).toContainText("One integrated certificate covers all three standards");
    const scan = page.getByTestId("img-certificate");
    await expect(scan).toHaveCSS("object-fit", "contain");
    await expect.poll(() => scan.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(2095);
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("certificate-counter")).toHaveText("Standard 2 / 3");
    await expect(viewer).toContainText("ISO 14001:2015");
    await page.getByTestId("button-cert-next").click();
    await expect(viewer).toContainText("ISO 45001:2018");
    await page.getByTestId("button-cert-next").click();
    await expect(page.getByTestId("certificate-counter")).toHaveText("Standard 1 / 3");
    await page.getByTestId("button-cert-prev").click();
    await expect(page.getByTestId("certificate-counter")).toHaveText("Standard 3 / 3");
    await page.getByTestId("button-viewer-close").focus();
    await page.keyboard.press("Tab");
    await expect(page.getByTestId("button-cert-prev")).toBeFocused();
    const box = (await viewer.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    const imageBox = (await scan.boundingBox())!;
    expect(imageBox.y).toBeGreaterThan(box.y);
    expect(imageBox.y + imageBox.height).toBeLessThan(box.y + box.height);
    await page.screenshot({ path: `/tmp/certifications-viewer-${width}.jpg` });
    await page.keyboard.press("Escape");
    await expect(viewer).not.toBeVisible();
    await expect(opener).toBeFocused();
    await page.getByTestId("card-standard-1").click();
    await expect(page.getByTestId("certificate-counter")).toHaveText("Standard 2 / 3");
    await page.getByTestId("button-viewer-close").click();
    await expect(page.getByTestId("card-standard-1")).toBeFocused();
    if (width === 1440) {
      await page.getByTestId("card-standard-2").click();
      await page.mouse.click(5, 5);
      await expect(viewer).not.toBeVisible();
    }
  }
});

test("certificate preview opens the original document and PDF download works", async ({ page }) => {
  await page.goto("/certifications");
  const preview = page.getByTestId("button-open-certificate-preview");
  await expect.poll(() => preview.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(2095);
  await preview.click();
  await expect(page.getByTestId("certificate-viewer")).toBeVisible();
  await expect(page.locator(".cert-overlay")).toHaveCSS("position", "fixed");
  await expect(page.getByTestId("certificate-counter")).toHaveText("Standard 1 / 3");
  const download = page.getByTestId("button-viewer-download");
  const pdfHref = (await download.getAttribute("href"))!;
  await expect(download).toHaveAttribute("href", /bureau-veritas-integrated-iso\.pdf$/);
  const pdfResponse = await page.request.get(pdfHref);
  expect(pdfResponse.status()).toBe(200);
  expect((await pdfResponse.body()).subarray(0, 4).toString()).toBe("%PDF");
  await page.getByTestId("button-viewer-close").click();
  await expect(preview).toBeFocused();
  await expect(page.locator(".cert-details")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("Certificate record");
});