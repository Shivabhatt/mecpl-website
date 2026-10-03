import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../mecpl-certifications/_shared";
import "../../mecpl-awards/_premium.css";
import "./_spotlight.css";

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
type AwardFilter = "All" | AwardCategory;

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

const categories: AwardCategory[] = ["Safety", "Quality", "National & State"];
const filters: AwardFilter[] = ["All", ...categories];
const featuredIds = [
  "national-2026-international-safety",
  "national-2026-cidc-17",
  "safety-2025-pcerf-yoo-villa",
  "quality-2025-bai-k57",
];
const featuredAwards = featuredIds
  .map((id) => awards.find((award) => award.id === id))
  .filter((award): award is AwardEntry => Boolean(award));

function AwardLogo({ award, compact = false }: { award: AwardEntry; compact?: boolean }) {
  return (
    <span className={`spotlight-logo${compact ? " is-compact" : ""}`}>
      {award.logo ? (
        <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" />
      ) : (
        <span>{award.issuer}</span>
      )}
    </span>
  );
}

function FeaturedRecord({ award, lead = false }: { award: AwardEntry; lead?: boolean }) {
  return (
    <article className={`spotlight-record${lead ? " is-lead" : ""}`}>
      <div className="spotlight-record-top">
        <span className="spotlight-category">{award.category}</span>
        <span className="spotlight-record-year">{award.year}</span>
      </div>
      <div className="spotlight-record-body">
        <AwardLogo award={award} />
        <div className="spotlight-record-copy">
          <p className="spotlight-issuer">{award.issuer}</p>
          <h3>{award.title}</h3>
          {award.detail && <p className="spotlight-detail">{award.detail}</p>}
        </div>
      </div>
    </article>
  );
}

function ArchiveRecord({ award }: { award: AwardEntry }) {
  return (
    <article className="spotlight-archive-record" data-testid={`spotlight-award-${award.id}`}>
      <AwardLogo award={award} compact />
      <div className="spotlight-archive-copy">
        <span className="spotlight-archive-category">{award.category}</span>
        <h3>{award.title}</h3>
        {award.detail && <p>{award.detail}</p>}
      </div>
      <span className="spotlight-archive-issuer">{award.issuer}</span>
    </article>
  );
}

export function Spotlight() {
  const [screen, setScreen] = useState<"featured" | "archive">("featured");
  const [activeFilter, setActiveFilter] = useState<AwardFilter>("All");
  const mainRef = useRef<HTMLElement>(null);
  const counts = useMemo(
    () => ({
      "National & State": awards.filter((award) => award.category === "National & State").length,
      Safety: awards.filter((award) => award.category === "Safety").length,
      Quality: awards.filter((award) => award.category === "Quality").length,
    }),
    [],
  );
  const filteredAwards = useMemo(
    () => awards.filter((award) => activeFilter === "All" || award.category === activeFilter)
      .map((award, sourceIndex) => ({ award, sourceIndex }))
      .sort((a, b) => b.award.year - a.award.year || a.sourceIndex - b.sourceIndex)
      .map(({ award }) => award),
    [activeFilter],
  );
  const yearGroups = useMemo(() => {
    const groups = new Map<number, AwardEntry[]>();
    filteredAwards.forEach((award) => {
      const existing = groups.get(award.year) ?? [];
      existing.push(award);
      groups.set(award.year, existing);
    });
    return [...groups.entries()];
  }, [filteredAwards]);

  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [screen]);

  const openArchive = () => {
    setActiveFilter("All");
    setScreen("archive");
  };

  return (
    <div className="mecpl-preview mecpl-awards-page mecpl-spotlight">
      <SiteHeader />
      <main className="mecpl-awards-main" ref={mainRef} tabIndex={-1}>
        <section className="mecpl-awards-hero" aria-labelledby="mecpl-awards-title">
          <div className="mecpl-awards-hero-shade" />
          <div className="mecpl-awards-hero-content">
            <div className="mecpl-awards-eyebrow"><span />A record built on site</div>
            <h1 id="mecpl-awards-title">Recognition<br /><em>Earned on the Ground.</em></h1>
            <p>Every distinction reflects the discipline, care and engineering rigour behind structures made to last.</p>
            <button className="mecpl-awards-scroll" type="button" onClick={openArchive}>
              Explore the archive <ArrowDown size={15} strokeWidth={1.8} />
            </button>
          </div>
        </section>

        <section className="mecpl-awards-intro" aria-label="Awards archive summary">
          <div className="mecpl-intro-copy">
            <div className="mecpl-section-label">A measured record</div>
            <h2>Recognition is a result.<br /><span>Execution is the standard.</span></h2>
            <p>From safe worksites to enduring structures, these honours recognise the teams and partnerships that have shaped MECPL’s work across Pune and Maharashtra.</p>
          </div>
          <div className="mecpl-awards-proof" role="group" aria-label="Recognition totals">
            <div className="mecpl-proof-stat"><strong>41</strong><span>Verified recognitions<br />since 2002</span></div>
            <div className="mecpl-proof-stat"><strong>{counts.Safety}</strong><span>Safety</span></div>
            <div className="mecpl-proof-stat"><strong>{counts.Quality}</strong><span>Quality</span></div>
            <div className="mecpl-proof-stat"><strong>{String(counts["National & State"]).padStart(2, "0")}</strong><span>National &amp; State</span></div>
          </div>
        </section>

        {screen === "featured" ? (
          <section className="spotlight-featured" id="recognition-archive" aria-labelledby="spotlight-featured-title">
            <div className="spotlight-container">
              <div className="spotlight-heading">
                <div>
                  <p className="spotlight-kicker"><span />Selected recognitions</p>
                  <h2 id="spotlight-featured-title">The latest<br /><em>distinctions.</em></h2>
                </div>
                <p className="spotlight-heading-note">A closer look at recent recognition across MECPL’s award categories.</p>
              </div>
              <div className="spotlight-feature-grid">
                {featuredAwards.map((award, index) => (
                  <FeaturedRecord key={award.id} award={award} lead={index === 0} />
                ))}
              </div>
              <div className="spotlight-archive-invite">
                <span><strong>{awards.length}</strong> recognitions, from 2002 to 2026</span>
                <button type="button" onClick={openArchive}>
                  Show more awards <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="spotlight-archive" aria-labelledby="spotlight-archive-title">
            <div className="spotlight-container">
              <button className="spotlight-back" type="button" onClick={() => setScreen("featured")}>
                <ArrowLeft size={16} aria-hidden="true" /> Back to featured awards
              </button>
              <div className="spotlight-archive-heading">
                <div>
                  <p className="spotlight-kicker"><span />Recognition archive</p>
                  <h2 id="spotlight-archive-title">Forty-one records.<br /><em>One chronological view.</em></h2>
                </div>
                <p className="spotlight-heading-note">Browse recognitions by year, or narrow the collection by category.</p>
              </div>
              <div className="spotlight-filter-bar">
                <div className="spotlight-filters" role="group" aria-label="Filter awards by category">
                  {filters.map((filter) => {
                    const count = filter === "All" ? awards.length : counts[filter];
                    return (
                      <button
                        key={filter}
                        type="button"
                        className={`spotlight-filter${activeFilter === filter ? " is-active" : ""}`}
                        aria-pressed={activeFilter === filter}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}<span>{count}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="spotlight-result-count" aria-live="polite">
                  Showing <strong>{filteredAwards.length}</strong> of {awards.length} recognitions
                </p>
              </div>
              <div className="spotlight-years">
                {yearGroups.map(([year, yearAwards]) => (
                  <section className="spotlight-year-group" key={year} aria-labelledby={`spotlight-year-${year}`}>
                    <h3 id={`spotlight-year-${year}`} className="spotlight-year-label">{year}</h3>
                    <div className="spotlight-year-records">
                      {yearAwards.map((award) => <ArchiveRecord key={award.id} award={award} />)}
                    </div>
                  </section>
                ))}
              </div>
              <button className="spotlight-back spotlight-back-bottom" type="button" onClick={() => setScreen("featured")}>
                <ArrowLeft size={16} aria-hidden="true" /> Back to featured awards
              </button>
            </div>
          </section>
        )}

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
      <SiteFooter />
    </div>
  );
}

export default Spotlight;