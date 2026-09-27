import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import "./AwardsPage.css";

const assetBase = import.meta.env.BASE_URL;
type AwardCategory = "National & State" | "Safety" | "Quality";
type AwardEntry = {
  id: string;
  year: number;
  category: AwardCategory;
  title: string;
  detail?: string;
  issuer: string;
  logo?: string;
};

const issuerLogos = {
  british: `${assetBase}assets/awards/british-safety-council-award-2026.jpeg`,
  cidc: `${assetBase}assets/awards/cidc-vishwakarma-award-2026.png`,
  nsci: `${assetBase}assets/awards/nsci-safety-award-2025.png`,
  bai: `${assetBase}assets/awards/bai-well-built-structure-award.png`,
  pcerf: `${assetBase}assets/awards/pcerf-safety-award.png`,
  sme: `${assetBase}assets/recognition/india-sme-100-awards.jpeg`,
};

const awards: AwardEntry[] = [
  { id: "national-2026-international-safety", year: 2026, category: "National & State", title: "International Safety Award – Distinction", issuer: "British Safety Council", logo: issuerLogos.british },
  { id: "national-2026-cidc-17", year: 2026, category: "National & State", title: "17th CIDC Vishwakarma Awards", issuer: "CIDC", logo: issuerLogos.cidc },
  { id: "national-2025-nsci-yoo-villa", year: 2025, category: "National & State", title: "NSCI Safety Award – YOO Villa – Fourth Level Prashansa Patra", issuer: "NSCI", logo: issuerLogos.nsci },
  { id: "national-2025-nsci-k57", year: 2025, category: "National & State", title: "NSCI Safety Award – K57 – Certificate of Merit", issuer: "NSCI", logo: issuerLogos.nsci },
  { id: "national-2025-nsci-vantage", year: 2025, category: "National & State", title: "NSCI Safety Award – Vantage – Certificate of Merit", issuer: "NSCI", logo: issuerLogos.nsci },
  { id: "national-2025-cidc-16", year: 2025, category: "National & State", title: "16th CIDC Vishwakarma Awards", issuer: "CIDC", logo: issuerLogos.cidc },
  { id: "national-2024-cidc-15", year: 2024, category: "National & State", title: "15th CIDC Vishwakarma Awards", issuer: "CIDC", logo: issuerLogos.cidc },
  { id: "national-2018-iconic-brand", year: 2018, category: "National & State", title: "Iconic Brand of the Year Award", issuer: "MSME" },
  { id: "national-2017-sme-100", year: 2017, category: "National & State", title: "SME 100 Awards 2015–2016", issuer: "India SME Forum", logo: issuerLogos.sme },
  { id: "safety-2025-pcerf-yoo-villa", year: 2025, category: "Safety", title: "PCERF 2025 – Silver Trophy for Safety", detail: "Yoo Villa, Pune", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2024-apex-raheja", year: 2024, category: "Safety", title: "9th Apex India Occupational Health & Safety Award", detail: "Raheja Baner B 94–97", issuer: "Apex India" },
  { id: "safety-2024-pcerf-vantage", year: 2024, category: "Safety", title: "PCERF 2024 – Silver Trophy for Safety", detail: "Vantage Tower, Pune", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2023-pcerf-privet", year: 2023, category: "Safety", title: "PCERF 2023 – Silver Trophy for Safety", detail: "43 Privet Drive, Pune", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2022-pcerf-eon", year: 2022, category: "Safety", title: "PCERF 2022 – Silver Trophy for Safety", detail: "EON West, Wakad, Pune", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2021-pcerf-godrej-nurture", year: 2021, category: "Safety", title: "PCERF 2021 – Gold Trophy for Safety", detail: "Godrej Nurture, Mamurdi, Pune", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2020-pcerf-godrej-24", year: 2020, category: "Safety", title: "PCERF 2020 – Gold Trophy for Safety", detail: "Godrej-24, Hinjewadi", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2019-pcerf-godrej-24", year: 2019, category: "Safety", title: "PCERF 2019 – Silver Trophy for Safety", detail: "Godrej-24, Hinjewadi", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2018-nsci-krc", year: 2018, category: "Safety", title: "Certificate of Appreciation – NSCI Safety Awards", detail: "KRC IT Park, Kharadi", issuer: "NSCI", logo: issuerLogos.nsci },
  { id: "safety-2018-pcerf-raheja", year: 2018, category: "Safety", title: "PCERF 2018 – Gold Trophy for Safety", detail: "K Raheja IT Campus, Kharadi", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2017-pcerf-multiple", year: 2017, category: "Safety", title: "PCERF 2017 – Gold Trophy for Safety", detail: "Highrise Tower / Panchshil Tower / Kalpataru Jade Residency / EON SEZ Phase 2", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2016-pcerf-kalpataru", year: 2016, category: "Safety", title: "PCERF 2016 – Gold Trophy for Safety", detail: "Kalpataru Residential Tower", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "safety-2014-pcerf-emrius", year: 2014, category: "Safety", title: "PCERF Constro 2014 – Gold Trophy for Safety", detail: "Emrius Residential Tower, Baner", issuer: "PCERF", logo: issuerLogos.pcerf },
  { id: "quality-2025-bai-k57", year: 2025, category: "Quality", title: "BAI – Well Built Structure Award", detail: "KRC K57 Tower, Kharadi", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2024-bai-vantage", year: 2024, category: "Quality", title: "BAI – Well Built Structure Award", detail: "Vantage Tower, Kharadi", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2023-ici", year: 2023, category: "Quality", title: "Indian Concrete Institute – UltraTech Award", detail: "EON West Wakad – LP II — Jury Recommendation; 43 Privet Drive — Jury Appreciation", issuer: "Indian Concrete Institute" },
  { id: "quality-2023-bai", year: 2023, category: "Quality", title: "BAI – Well Built Structure Award", detail: "EON West Wakad – LP II; 43 Privet Drive", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2022-bai-nurture", year: 2022, category: "Quality", title: "BAI – Well Built Structure Award", detail: "Godrej Nurture, Mamurdi", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2022-ici-gera", year: 2022, category: "Quality", title: "Indian Concrete Institute – UltraTech Award", detail: "KRC Gera, Commerzone, Kharadi", issuer: "Indian Concrete Institute" },
  { id: "quality-2021-ici-connect", year: 2021, category: "Quality", title: "Indian Concrete Institute – UltraTech Award", detail: "The Connect, Bavdhan", issuer: "Indian Concrete Institute" },
  { id: "quality-2021-bai-connect", year: 2021, category: "Quality", title: "BAI – Well Built Structure", detail: "The Connect, Bavdhan", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2020-aesa-reservoir", year: 2020, category: "Quality", title: "AESA Award 2020", detail: "Elevated Storage Reservoir for Panchshil", issuer: "AESA" },
  { id: "quality-2019-ici-reservoir", year: 2019, category: "Quality", title: "Indian Concrete Institute – UltraTech Award", detail: "Elevated Storage Reservoir for Panchshil", issuer: "Indian Concrete Institute" },
  { id: "quality-2018-bai-panchshil", year: 2018, category: "Quality", title: "BAI – Well Built Structure", detail: "Panchshil Highrise Tower, Wagholi", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2015-ici-trump", year: 2015, category: "Quality", title: "Indian Concrete Institute – Birla Super Award 2013–2014", detail: "Trump Tower, Kalyaninagar", issuer: "Indian Concrete Institute" },
  { id: "quality-2013-ici-syntel", year: 2013, category: "Quality", title: "Indian Concrete Institute – Birla Super Award 2011–2012", detail: "SDB for Syntel International Pvt. Ltd.", issuer: "Indian Concrete Institute" },
  { id: "quality-2011-bai-syntel", year: 2011, category: "Quality", title: "BAI – Well Built Structure – First Prize", detail: "Global Development Centre for Syntel International", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2009-bai-lavasa", year: 2009, category: "Quality", title: "BAI – Well Built Structure – First Prize", detail: "Lavasa Villa", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2008-bai-syntel", year: 2008, category: "Quality", title: "BAI – Well Built Structure – Jury's Recommendation Award", detail: "Global Development Centre for Syntel International", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2005-bai-xansa", year: 2005, category: "Quality", title: "BAI – Well Built Structure – First Prize", detail: "Office Block for Xansa (India) Ltd.", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2002-bai-temple-first", year: 2002, category: "Quality", title: "BAI – Well Built Structure – First Prize", detail: "Universal Temple of Ramakrishna, Pune", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
  { id: "quality-2002-bai-temple-best", year: 2002, category: "Quality", title: "BAI – Birla Super Outstanding Structure – Best of the Best", detail: "Universal Temple of Ramakrishna, Pune", issuer: "Builders’ Association of India", logo: issuerLogos.bai },
];

const filters: Array<{ label: string; value: "All" | AwardCategory; testId: string }> = [
  { label: "All", value: "All", testId: "filter-all" },
  { label: "Safety", value: "Safety", testId: "filter-safety" },
  { label: "Quality", value: "Quality", testId: "filter-quality" },
  { label: "National & State", value: "National & State", testId: "filter-national-state" },
];

function AwardCard({ award }: { award: AwardEntry }) {
  const titleParts = award.title.split(/((?:19|20)\d{2}(?:[–—-](?:19|20)?\d{2})?)/g);
  const visibleTitleParts = titleParts.filter((part) => part !== String(award.year));

  return (
    <article className={`mecpl-award-card mecpl-award-${award.category.toLowerCase().replace(/[^a-z]+/g, "-")}`} data-testid={`award-card-${award.id}`}>
      <header className="mecpl-award-meta">
        <span className="mecpl-award-organization">{award.issuer}</span>
        <span className="mecpl-award-year">{award.year}</span>
      </header>
      <span className="mecpl-award-logo">
        {award.logo ? <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" /> : <span>{award.issuer}</span>}
      </span>
      <div className="mecpl-award-copy">
        <h3>
          {(visibleTitleParts.length ? visibleTitleParts : [award.title]).map((part, index) =>
            /^(?:19|20)\d{2}(?:[–—-](?:19|20)?\d{2})?$/.test(part)
              ? <span className="mecpl-award-year-inline" key={index}>{part}</span>
              : part
          )}
        </h3>
        {award.detail && <p className="mecpl-award-detail">{award.detail}</p>}
      </div>
    </article>
  );
}

export default function AwardsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("All");
  const filteredAwards = useMemo(
    () => activeFilter === "All" ? awards : awards.filter((award) => award.category === activeFilter),
    [activeFilter],
  );
  const countFor = (category: AwardCategory) => awards.filter((award) => award.category === category).length;

  useEffect(() => {
    const previousTitle = document.title;
    const description = "Explore 41 MECPL awards and recognitions for construction safety, quality, and structural excellence from 2002 to 2026.";
    const updates = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', "Awards & Recognition | MECPL"],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', "Awards & Recognition | MECPL"],
      ['meta[name="twitter:description"]', description],
    ] as const;
    const previous = updates.map(([selector, content]) => {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      const oldContent = tag?.content;
      if (tag) tag.content = content;
      return [tag, oldContent] as const;
    });
    document.title = "Awards & Recognition | MECPL";
    return () => {
      document.title = previousTitle;
      previous.forEach(([tag, content]) => {
        if (tag && content !== undefined) tag.content = content;
      });
    };
  }, []);

  return (
    <div className="mecpl-awards-page" style={{ background: "#25292b", color: "#f2efe8" }}>
      <main className="mecpl-awards-main">
        <section className="mecpl-awards-hero" aria-labelledby="mecpl-awards-title" style={{ backgroundImage: `url("${assetBase}assets/awards/awards-banner.jpg")` }}>
          <div className="mecpl-awards-hero-shade" />
          <div className="mecpl-awards-hero-content">
            <h1 id="mecpl-awards-title">Recognition<br /><em>Earned on the Ground.</em></h1>
            <p>Every distinction reflects the discipline, care and engineering rigour behind structures made to last.</p>
          </div>
        </section>

        <section className="mecpl-awards-intro" aria-label="Awards archive summary">
          <div className="mecpl-intro-copy">
            <div className="mecpl-section-label">A measured record</div>
            <h2>Recognition is a result. <span>Execution is the standard.</span></h2>
            <p>From safe worksites to enduring structures, these honours recognise the teams and partnerships that have shaped MECPL’s work across Pune and Maharashtra.</p>
          </div>
          <div className="mecpl-awards-proof" role="group" aria-label="Recognition totals">
            <div className="mecpl-proof-stat"><strong>{awards.length}<i aria-hidden="true">+</i></strong><span>Verified recognitions<br />since 2002</span></div>
            <div className="mecpl-proof-stat"><strong>{countFor("Safety")}<i aria-hidden="true">+</i></strong><span>Safety</span></div>
            <div className="mecpl-proof-stat"><strong>{countFor("Quality")}<i aria-hidden="true">+</i></strong><span>Quality</span></div>
            <div className="mecpl-proof-stat"><strong>{String(countFor("National & State")).padStart(2, "0")}<i aria-hidden="true">+</i></strong><span>National &amp; State</span></div>
          </div>
        </section>

        <section className="mecpl-archive" id="recognition-archive" aria-labelledby="mecpl-archive-title">
          <div className="mecpl-archive-heading">
            <div>
              <div className="mecpl-section-label">The recognition archive</div>
              <h2 id="mecpl-archive-title">{awards.length} milestones.<br /><span>One standard of work.</span></h2>
            </div>
          </div>
          <div className="mecpl-archive-toolbar">
            <div className="mecpl-filter-list" role="group" aria-label="Filter awards by category">
              {filters.map(({ label, value, testId }) => (
                <button key={value} type="button"
                  className={`mecpl-filter-button${activeFilter === value ? " is-active" : ""}`}
                  aria-pressed={activeFilter === value}
                  onClick={() => setActiveFilter(value)}
                  data-testid={testId}>
                  {label}<span>{value === "All" ? awards.length : countFor(value)}</span>
                </button>
              ))}
            </div>
          </div>
          {filteredAwards.length ? (
            <div className="mecpl-awards-grid" data-testid="awards-grid">
              {filteredAwards.map((award) => <AwardCard key={award.id} award={award} />)}
            </div>
          ) : (
            <div className="mecpl-awards-empty">
              <Award size={22} strokeWidth={1.5} />
              <h3>No recognitions in this view</h3>
              <button type="button" onClick={() => setActiveFilter("All")} data-testid="button-reset-filters">View all recognitions</button>
            </div>
          )}
        </section>

        <section className="mecpl-awards-closing">
          <div className="mecpl-closing-copy">
            <div className="mecpl-section-label">The journey continues</div>
            <h2>Same purpose.<br />Greater possibilities.</h2>
            <p>From the foundations laid in 1975 to what we build next, the purpose remains the same: to build better, safer and stronger.</p>
            <div className="mecpl-closing-actions">
              <a href="mailto:contact@mecpl.in" className="mecpl-closing-link is-primary">
                Contact MECPL <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
