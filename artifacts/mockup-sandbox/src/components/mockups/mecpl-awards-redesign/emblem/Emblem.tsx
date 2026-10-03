import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../mecpl-certifications/_shared";
import "../../mecpl-awards/_premium.css";
import "./Emblem.css";

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

const assetRoot = "/__mockup/images/mecpl-certifications";
const issuerLogos = {
  british: `${assetRoot}/awards/british-safety-council-award-2026.jpeg`,
  cidc: `${assetRoot}/awards/cidc-vishwakarma-award-2026.png`,
  nsci: `${assetRoot}/awards/nsci-safety-award-2025.png`,
  bai: `${assetRoot}/awards/bai-well-built-structure-award.png`,
  pcerf: "/__mockup/images/mecpl-awards/pcerf-safety-award.png",
  sme: `${assetRoot}/recognition/india-sme-100-awards.jpeg`,
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

const categories: AwardCategory[] = ["National & State", "Safety", "Quality"];
type FilterCategory = "All" | AwardCategory;

function IssuerMark({ award, compact = false }: { award: AwardEntry; compact?: boolean }) {
  return (
    <span className={`emblem-mark${compact ? " is-compact" : ""}`} aria-label={`${award.issuer} issuer mark`}>
      {award.logo ? <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" /> : <span>{award.issuer}</span>}
    </span>
  );
}

function awardTitleWithYear(award: AwardEntry) {
  const year = String(award.year);
  const titleWithoutYear = award.title
    .replace(year, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([–—-])/g, " $1")
    .trim();
  return `${titleWithoutYear} — ${year}`;
}

function FeaturedSeal({ award }: { award: AwardEntry }) {
  const isEditorialLead = award.id === "national-2026-international-safety";
  return (
    <article className={`emblem-feature${isEditorialLead ? " is-editorial-lead" : ""}`}>
      <div className="emblem-feature-seal">
        <span className="emblem-feature-ring" aria-hidden="true" />
        <IssuerMark award={award} />
      </div>
      <div className="emblem-feature-copy">
        <span className="emblem-category">{award.category}</span>
        <h3>{awardTitleWithYear(award)}</h3>
        {award.detail && <p className="emblem-detail">{award.detail}</p>}
        <p className="emblem-issuer">{award.issuer}</p>
      </div>
    </article>
  );
}

function ArchiveRecord({ award, index }: { award: AwardEntry; index: number }) {
  return (
    <article className="emblem-record">
      <span className="emblem-record-number">{String(index + 1).padStart(2, "0")}</span>
      <IssuerMark award={award} compact />
      <div className="emblem-record-copy">
        <h3>{award.title}</h3>
        {award.detail && <p className="emblem-detail">{award.detail}</p>}
        <span className="emblem-record-issuer">{award.issuer}</span>
      </div>
      <span className="emblem-record-year">{award.year}</span>
    </article>
  );
}

export function Emblem() {
  const [screen, setScreen] = useState<"featured" | "archive">("featured");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const mainRef = useRef<HTMLElement>(null);
  const featured = useMemo(() => [
    awards.find((award) => award.id === "national-2026-international-safety")!,
    awards.find((award) => award.id === "national-2026-cidc-17")!,
    awards.find((award) => award.id === "national-2025-nsci-yoo-villa")!,
    awards.find((award) => award.id === "safety-2025-pcerf-yoo-villa")!,
    awards.find((award) => award.id === "safety-2024-apex-raheja")!,
    awards.find((award) => award.id === "safety-2024-pcerf-vantage")!,
    awards.find((award) => award.id === "quality-2025-bai-k57")!,
    awards.find((award) => award.id === "quality-2024-bai-vantage")!,
  ], []);
  const filtered = useMemo(
    () => activeFilter === "All" ? awards : awards.filter((award) => award.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    mainRef.current?.focus({ preventScroll: true });
  }, [screen]);

  const showArchive = () => {
    setActiveFilter("All");
    setScreen("archive");
  };

  const showFeatured = () => setScreen("featured");

  return (
    <div className="emblem-root mecpl-awards-page">
      <SiteHeader />
      {screen === "featured" ? (
        <>
          <main className="emblem-main" ref={mainRef} tabIndex={-1}>
            <section className="emblem-hero" aria-labelledby="emblem-title">
              <div className="emblem-hero-shade" />
              <div className="emblem-hero-content">
                <div className="emblem-eyebrow"><span />A record built on site</div>
                <h1 id="emblem-title">Recognition<br /><em>Earned on the Ground.</em></h1>
                <p>Every distinction reflects the discipline, care and engineering rigour behind structures made to last.</p>
              </div>
            </section>

            <section className="emblem-intro" aria-label="Awards archive summary">
              <div className="emblem-intro-copy">
                <div className="emblem-section-label">A measured record</div>
                <h2>Recognition is a result.<br /><span>Execution is the standard.</span></h2>
                <p>From safe worksites to enduring structures, these honours recognise the teams and partnerships that have shaped MECPL’s work across Pune and Maharashtra.</p>
              </div>
              <div className="emblem-proof" role="group" aria-label="Recognition totals">
                <div className="emblem-proof-stat"><strong>41</strong><span>Verified recognitions<br />since 2002</span></div>
                <div className="emblem-proof-stat"><strong>13</strong><span>Safety</span></div>
                <div className="emblem-proof-stat"><strong>19</strong><span>Quality</span></div>
                <div className="emblem-proof-stat"><strong>09</strong><span>National &amp; State</span></div>
              </div>
            </section>

            <section className="emblem-featured-section" aria-labelledby="emblem-featured-heading">
              <div className="emblem-featured-heading">
                <div className="emblem-section-label">Selected recognitions</div>
                <h2 id="emblem-featured-heading">A mark of the work.</h2>
                <p>Eight recognitions, presented by category.</p>
              </div>
              <div className="emblem-feature-grid">
                {featured.map((award) => <FeaturedSeal key={award.id} award={award} />)}
              </div>
              <button className="emblem-more-button" type="button" onClick={showArchive}>
                Show more awards <ArrowRight size={17} aria-hidden="true" />
              </button>
            </section>

            <section className="emblem-closing">
              <div className="emblem-closing-copy">
                <div className="emblem-section-label">The journey continues</div>
                <h2>Same purpose.<br />Greater possibilities.</h2>
                <p>From the foundations laid in 1975 to what we build next, the purpose remains the same: to build better, safer and stronger.</p>
                <div className="emblem-closing-actions">
                  <a href="mailto:contact@mecpl.in" className="emblem-closing-link">
                    Contact MECPL <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>
          </main>
          <SiteFooter />
        </>
      ) : (
        <>
          <main className="emblem-main emblem-archive-screen" ref={mainRef} tabIndex={-1}>
            <section className="emblem-archive" aria-labelledby="emblem-archive-heading">
              <div className="emblem-archive-head">
                <button className="emblem-back-button" type="button" onClick={showFeatured}>
                  <ArrowLeft size={17} aria-hidden="true" /> Back to featured
                </button>
                <div className="emblem-archive-title">
                  <div className="emblem-section-label">The recognition archive</div>
                  <h1 id="emblem-archive-heading">41 marks.<br /><span>One standard of work.</span></h1>
                  <p>Browse the full collection by category.</p>
                </div>
                <div className="emblem-archive-total"><strong>{filtered.length}</strong><span>of 41 entries</span></div>
              </div>

              <div className="emblem-filter-bar" role="group" aria-label="Filter awards by category">
                {(["All", ...categories] as FilterCategory[]).map((category) => {
                  const count = category === "All" ? awards.length : awards.filter((award) => award.category === category).length;
                  return (
                    <button
                      key={category}
                      className={`emblem-filter${activeFilter === category ? " is-active" : ""}`}
                      type="button"
                      aria-pressed={activeFilter === category}
                      onClick={() => setActiveFilter(category)}
                    >
                      <span>{category}</span><b>{count}</b>
                    </button>
                  );
                })}
              </div>

              <div className="emblem-category-collections" aria-live="polite">
                {categories.filter((category) => activeFilter === "All" || activeFilter === category).map((category) => {
                  const entries = filtered.filter((award) => award.category === category);
                  if (!entries.length) return null;
                  return (
                    <section className="emblem-collection" key={category} aria-labelledby={`collection-${category.replace(/[^a-z]+/gi, "-").toLowerCase()}`}>
                      <header className="emblem-collection-heading">
                        <span className="emblem-collection-index">{String(categories.indexOf(category) + 1).padStart(2, "0")}</span>
                        <h2 id={`collection-${category.replace(/[^a-z]+/gi, "-").toLowerCase()}`}>{category}</h2>
                        <span className="emblem-collection-count">{entries.length} recognitions</span>
                      </header>
                      <div className="emblem-record-list">
                        {entries.map((award, index) => <ArchiveRecord key={award.id} award={award} index={index} />)}
                      </div>
                    </section>
                  );
                })}
              </div>
              <button className="emblem-back-bottom" type="button" onClick={showFeatured}>
                <ArrowLeft size={16} aria-hidden="true" /> Back to featured recognitions
              </button>
            </section>
          </main>
          <SiteFooter />
        </>
      )}
    </div>
  );
}

export default Emblem;