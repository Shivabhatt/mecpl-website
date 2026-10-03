// Pure TS: no import.meta.env, safe to import from vite.config.ts.
// Logo paths are relative to the site base; resolve with BASE_URL at render time.

export type AwardCategory = "national-state" | "safety" | "quality";

export interface Award {
  id: string;
  category: AwardCategory;
  title: string;
  year: number;
  issuer: string;
  project?: string;
  note?: string;
  /** True issuer mark only (relative path). Never a generic certificate photo. */
  logo?: string;
  /** Real per-award photo (relative path). None supplied yet. */
  image?: string;
  featured?: boolean;
}

export interface CategoryMeta {
  key: AwardCategory;
  label: string;
  blurb: string;
}

export const categories: CategoryMeta[] = [
  { key: "national-state", label: "National & State", blurb: "Industry honours from national and state bodies." },
  { key: "safety", label: "Safety", blurb: "Recognised for safe worksites, year after year." },
  { key: "quality", label: "Quality", blurb: "Structures judged on how well they are built." },
];

const logos = {
  british: "assets/awards/british-safety-council-award-2026-mark.webp",
  cidc: "assets/awards/cidc-vishwakarma-award-2026-mark.webp",
  nsci: "assets/awards/nsci-safety-award-2025-mark.webp",
  bai: "assets/awards/bai-well-built-structure-award-mark.webp",
  pcerf: "assets/awards/pcerf-safety-award-mark.webp",
  sme: "assets/awards/india-sme-100-mark.webp",
  apex: "assets/awards/apex-india-logo-mark.webp",
};

function stripYear(title: string, year: number) {
  return title
    .replace(new RegExp("\\s*" + year + "(?!\\d)(?!\\s*[–-]\\s*\\d)"), "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const raw: Award[] = [
  { id: "national-2026-international-safety", category: "national-state", title: "International Safety Award – Distinction", year: 2026, issuer: "British Safety Council", logo: logos.british, featured: true },
  { id: "national-2026-cidc-17", category: "national-state", title: "17th CIDC Vishwakarma Awards", year: 2026, issuer: "CIDC", logo: logos.cidc, featured: true },
  { id: "national-2025-nsci-yoo-villa", category: "national-state", title: "NSCI Safety Award – YOO Villa – Fourth Level Prashansa Patra", year: 2025, issuer: "NSCI", logo: logos.nsci, featured: true },
  { id: "national-2025-nsci-k57", category: "national-state", title: "NSCI Safety Award – K57 – Certificate of Merit", year: 2025, issuer: "NSCI", logo: logos.nsci },
  { id: "national-2025-nsci-vantage", category: "national-state", title: "NSCI Safety Award – Vantage – Certificate of Merit", year: 2025, issuer: "NSCI", logo: logos.nsci },
  { id: "national-2025-cidc-16", category: "national-state", title: "16th CIDC Vishwakarma Awards", year: 2025, issuer: "CIDC", logo: logos.cidc },
  { id: "national-2024-cidc-15", category: "national-state", title: "15th CIDC Vishwakarma Awards", year: 2024, issuer: "CIDC", logo: logos.cidc },
  { id: "national-2018-iconic-brand", category: "national-state", title: "Iconic Brand of the Year Award", year: 2018, issuer: "MSME" },
  { id: "national-2017-sme-100", category: "national-state", title: "SME 100 Awards 2015–2016", year: 2017, issuer: "India SME Forum", logo: logos.sme },
  { id: "safety-2025-pcerf-yoo-villa", category: "safety", title: "PCERF 2025 – Silver Trophy for Safety", year: 2025, issuer: "PCERF", project: "Yoo Villa, Pune", logo: logos.pcerf, featured: true },
  { id: "safety-2024-apex-raheja", category: "safety", title: "9th Apex India Occupational Health & Safety Award", year: 2024, issuer: "Apex India", project: "Raheja Baner B 94–97", logo: logos.apex, featured: true },
  { id: "safety-2024-pcerf-vantage", category: "safety", title: "PCERF 2024 – Silver Trophy for Safety", year: 2024, issuer: "PCERF", project: "Vantage Tower, Pune", logo: logos.pcerf, featured: true },
  { id: "safety-2023-pcerf-privet", category: "safety", title: "PCERF 2023 – Silver Trophy for Safety", year: 2023, issuer: "PCERF", project: "43 Privet Drive, Pune", logo: logos.pcerf },
  { id: "safety-2022-pcerf-eon", category: "safety", title: "PCERF 2022 – Silver Trophy for Safety", year: 2022, issuer: "PCERF", project: "EON West, Wakad, Pune", logo: logos.pcerf },
  { id: "safety-2021-pcerf-godrej-nurture", category: "safety", title: "PCERF 2021 – Gold Trophy for Safety", year: 2021, issuer: "PCERF", project: "Godrej Nurture, Mamurdi, Pune", logo: logos.pcerf },
  { id: "safety-2020-pcerf-godrej-24", category: "safety", title: "PCERF 2020 – Gold Trophy for Safety", year: 2020, issuer: "PCERF", project: "Godrej-24, Hinjewadi", logo: logos.pcerf },
  { id: "safety-2019-pcerf-godrej-24", category: "safety", title: "PCERF 2019 – Silver Trophy for Safety", year: 2019, issuer: "PCERF", project: "Godrej-24, Hinjewadi", logo: logos.pcerf },
  { id: "safety-2018-nsci-krc", category: "safety", title: "Certificate of Appreciation – NSCI Safety Awards", year: 2018, issuer: "NSCI", project: "KRC IT Park, Kharadi", logo: logos.nsci },
  { id: "safety-2018-pcerf-raheja", category: "safety", title: "PCERF 2018 – Gold Trophy for Safety", year: 2018, issuer: "PCERF", project: "K Raheja IT Campus, Kharadi", logo: logos.pcerf },
  { id: "safety-2017-pcerf-multiple", category: "safety", title: "PCERF 2017 – Gold Trophy for Safety", year: 2017, issuer: "PCERF", project: "Highrise Tower / Panchshil Tower / Kalpataru Jade Residency / EON SEZ Phase 2", logo: logos.pcerf },
  { id: "safety-2016-pcerf-kalpataru", category: "safety", title: "PCERF 2016 – Gold Trophy for Safety", year: 2016, issuer: "PCERF", project: "Kalpataru Residential Tower", logo: logos.pcerf },
  { id: "safety-2014-pcerf-emrius", category: "safety", title: "PCERF Constro 2014 – Gold Trophy for Safety", year: 2014, issuer: "PCERF", project: "Emrius Residential Tower, Baner", logo: logos.pcerf },
  { id: "quality-2025-bai-k57", category: "quality", title: "BAI – Well Built Structure Award", year: 2025, issuer: "Builders’ Association of India", project: "KRC K57 Tower, Kharadi", logo: logos.bai, featured: true },
  { id: "quality-2024-bai-vantage", category: "quality", title: "BAI – Well Built Structure Award", year: 2024, issuer: "Builders’ Association of India", project: "Vantage Tower, Kharadi", logo: logos.bai, featured: true },
  { id: "quality-2023-ici", category: "quality", title: "Indian Concrete Institute – UltraTech Award", year: 2023, issuer: "Indian Concrete Institute", project: "EON West Wakad – LP II — Jury Recommendation; 43 Privet Drive — Jury Appreciation" },
  { id: "quality-2023-bai", category: "quality", title: "BAI – Well Built Structure Award", year: 2023, issuer: "Builders’ Association of India", project: "EON West Wakad – LP II; 43 Privet Drive", logo: logos.bai },
  { id: "quality-2022-bai-nurture", category: "quality", title: "BAI – Well Built Structure Award", year: 2022, issuer: "Builders’ Association of India", project: "Godrej Nurture, Mamurdi", logo: logos.bai },
  { id: "quality-2022-ici-gera", category: "quality", title: "Indian Concrete Institute – UltraTech Award", year: 2022, issuer: "Indian Concrete Institute", project: "KRC Gera, Commerzone, Kharadi" },
  { id: "quality-2021-ici-connect", category: "quality", title: "Indian Concrete Institute – UltraTech Award", year: 2021, issuer: "Indian Concrete Institute", project: "The Connect, Bavdhan" },
  { id: "quality-2021-bai-connect", category: "quality", title: "BAI – Well Built Structure", year: 2021, issuer: "Builders’ Association of India", project: "The Connect, Bavdhan", logo: logos.bai },
  { id: "quality-2020-aesa-reservoir", category: "quality", title: "AESA Award 2020", year: 2020, issuer: "AESA", project: "Elevated Storage Reservoir for Panchshil" },
  { id: "quality-2019-ici-reservoir", category: "quality", title: "Indian Concrete Institute – UltraTech Award", year: 2019, issuer: "Indian Concrete Institute", project: "Elevated Storage Reservoir for Panchshil" },
  { id: "quality-2018-bai-panchshil", category: "quality", title: "BAI – Well Built Structure", year: 2018, issuer: "Builders’ Association of India", project: "Panchshil Highrise Tower, Wagholi", logo: logos.bai },
  { id: "quality-2015-ici-trump", category: "quality", title: "Indian Concrete Institute – Birla Super Award 2013–2014", year: 2015, issuer: "Indian Concrete Institute", project: "Trump Tower, Kalyaninagar" },
  { id: "quality-2013-ici-syntel", category: "quality", title: "Indian Concrete Institute – Birla Super Award 2011–2012", year: 2013, issuer: "Indian Concrete Institute", project: "SDB for Syntel International Pvt. Ltd." },
  { id: "quality-2011-bai-syntel", category: "quality", title: "BAI – Well Built Structure – First Prize", year: 2011, issuer: "Builders’ Association of India", project: "Global Development Centre for Syntel International", logo: logos.bai },
  { id: "quality-2009-bai-lavasa", category: "quality", title: "BAI – Well Built Structure – First Prize", year: 2009, issuer: "Builders’ Association of India", project: "Lavasa Villa", logo: logos.bai },
  { id: "quality-2008-bai-syntel", category: "quality", title: "BAI – Well Built Structure – Jury's Recommendation Award", year: 2008, issuer: "Builders’ Association of India", project: "Global Development Centre for Syntel International", logo: logos.bai },
  { id: "quality-2005-bai-xansa", category: "quality", title: "BAI – Well Built Structure – First Prize", year: 2005, issuer: "Builders’ Association of India", project: "Office Block for Xansa (India) Ltd.", logo: logos.bai },
  { id: "quality-2002-bai-temple-first", category: "quality", title: "BAI – Well Built Structure – First Prize", year: 2002, issuer: "Builders’ Association of India", project: "Universal Temple of Ramakrishna, Pune", logo: logos.bai },
  { id: "quality-2002-bai-temple-best", category: "quality", title: "BAI – Birla Super Outstanding Structure – Best of the Best", year: 2002, issuer: "Builders’ Association of India", project: "Universal Temple of Ramakrishna, Pune", logo: logos.bai },
];

/** Year descending; original order kept within a year. */
export const awards: Award[] = raw
  .map((a, i) => ({ a, i }))
  .sort((x, y) => y.a.year - x.a.year || x.i - y.i)
  .map(({ a }) => ({ ...a, title: stripYear(a.title, a.year) }));

export const categoryCounts: Record<AwardCategory, number> = {
  "national-state": awards.filter((a) => a.category === "national-state").length,
  safety: awards.filter((a) => a.category === "safety").length,
  quality: awards.filter((a) => a.category === "quality").length,
};

export function initials(issuer: string) {
  const w = issuer
    .replace(/[’']/g, "")
    .split(/\s+/)
    .filter((x) => /^[A-Za-z]/.test(x) && !/^(of|the|and)$/i.test(x));
  return w.length === 1 ? w[0].slice(0, 4).toUpperCase() : w.map((x) => x[0]).join("").slice(0, 4).toUpperCase();
}
