export type AwardCertificateImage = { src: string; caption: string; rotation?: number; flipX?: boolean };

// Original embedded scans from Company Profile 2026, pages 8–32.
// Image numbers follow their top-to-bottom order on each source page.
// These are issuer collections, not a claim of one scan per award-table row.
const scan = (page: number, image: number, caption: string, rotation?: number, flipX?: boolean): AwardCertificateImage => ({
  src: `assets/awards/profile-certificates/profile-p${String(page).padStart(2, "0")}-${image}.webp`,
  caption,
  ...(rotation ? { rotation } : {}),
  ...(flipX ? { flipX } : {}),
});

export const awardCertificateImages: Record<string, AwardCertificateImage[]> = {
  british: [8, 9].map(page => scan(page, 1, "International Safety Award — Distinction")),
  cidc: [[11, 2], [12, 1], [12, 2]].map(([page, image]) =>
    scan(page, image, "CIDC Vishwakarma Award")),
  "nsci-national": [scan(10, 1, "NSCI Safety Awards 2025 — Yoo Villas")],
  sme: [scan(26, 1, "India SME 100 Award")],
  iconic: [scan(25, 1, "Iconic Brand of the Year")],
  pcerf: [[11, 1], [17, 1], [23, 1], [23, 2], [24, 1], [24, 2],
    [28, 1], [28, 2], [29, 1], [29, 2], [30, 1], [31, 1], [31, 2], [32, 1]]
    .map(([page, image]) =>
      scan(page, image, "PCERF Construction Safety Award",
        [28, 30, 31].includes(page) ? 180 : undefined,
        [28, 30, 31, 32].includes(page))),
  nsci: [scan(30, 2, "NSCI Safety Awards — Earlier certificate, 2014", 180, true)],
  bai: [13, 14, 15, 16, 21].map(page => scan(page, 1, "BAI Well Built Structure Award")),
  ici: [[17, 2], [18, 1], [18, 2], [19, 1]].map(([page, image]) =>
    scan(page, image, "Indian Concrete Institute — Quality Award")),
  aesa: [scan(20, 1, "AESA Award 2020")],
};
