import { useMemo, useState, type CSSProperties } from "react";
import "./WallOfFame.css";

const assetBase = "/__mockup/images/mecpl-wall/";
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

type FilterCategory = "Featured" | AwardCategory | "All";
const filters: Array<{ label: string; value: FilterCategory; testId: string }> = [
  { label: "Featured", value: "Featured", testId: "filter-featured" },
  { label: "Safety", value: "Safety", testId: "filter-safety" },
  { label: "Quality", value: "Quality", testId: "filter-quality" },
  { label: "National & State", value: "National & State", testId: "filter-national-state" },
  { label: "All", value: "All", testId: "filter-all" },
];

function AwardCard({ award, testIdPrefix, index }: { award: AwardEntry; testIdPrefix: string; index: number }) {
  const titleWithoutYear = award.title
    .replace(String(award.year), "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([–—-])/g, " $1")
    .trim();
  const isLead = award.id === "national-2026-international-safety";

  return (
    <article
      className={`wall-card${isLead ? " is-lead" : ""}${award.logo ? "" : " has-no-logo"}`}
      data-testid={`${testIdPrefix}-${award.id}`}
      style={{ "--card-order": index } as CSSProperties}
    >
      <div className="wall-card-topline">
        <span className="wall-card-category">{award.category}</span>
        <span className="wall-card-year">{award.year}</span>
      </div>
      <div className="wall-mark-frame" aria-label={award.logo ? `${award.issuer} issuer mark` : `${award.issuer} recognition`}>
        {award.logo
          ? <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" />
          : <span className="wall-mark-type">{award.issuer}</span>}
        <span className="wall-mark-corner" aria-hidden="true" />
      </div>
      <div className="wall-card-copy">
        <h3>{titleWithoutYear}</h3>
        {award.detail && <p className="wall-card-detail">{award.detail}</p>}
        <p className="wall-card-issuer">{award.issuer}</p>
      </div>
      <span className="wall-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    </article>
  );
}

export function WallOfFame() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Featured");
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
  const displayedAwards = useMemo(() => {
    if (activeFilter === "Featured") return featured;
    if (activeFilter === "All") return awards;
    return awards.filter((award) => award.category === activeFilter);
  }, [activeFilter, featured]);
  const countFor = (category: AwardCategory) => awards.filter((award) => award.category === category).length;

  return (
    <div className="mecpl-wall-of-fame" data-testid="awards-archive">
      <section className="wall-section" aria-labelledby="wall-heading">
        <div className="wall-mast">
          <div className="wall-heading-copy">
            <div className="wall-kicker"><span aria-hidden="true" /> The record, in the work</div>
            <h2 id="wall-heading">
              {activeFilter === "Featured" ? <>A wall of<br /><em>earned marks.</em></> : activeFilter === "All" ? <>Built to last.<br /><em>Recognised over time.</em></> : <>{activeFilter}<br /><em>recognitions.</em></>}
            </h2>
          </div>
          <div className="wall-heading-aside">
            <span className="wall-aside-number">{activeFilter === "Featured" ? "08" : String(displayedAwards.length).padStart(2, "0")}</span>
            <p>{activeFilter === "Featured" ? "A considered selection from the projects and people behind the work." : `${displayedAwards.length} ${displayedAwards.length === 1 ? "recognition" : "recognitions"} across the archive.`}</p>
          </div>
          <span className="wall-mast-rule" aria-hidden="true" />
        </div>

        <div className="wall-filter-wrap">
          <div className="wall-filter-caption">Explore the archive</div>
          <div className="wall-filter-bar" role="group" aria-label="Filter awards by category">
            {filters.map(({ label, value, testId }) => {
              const count = value === "Featured" ? featured.length : value === "All" ? awards.length : countFor(value);
              return (
                <button
                  key={value}
                  className={`wall-filter${activeFilter === value ? " is-active" : ""}`}
                  type="button"
                  aria-pressed={activeFilter === value}
                  onClick={() => setActiveFilter(value)}
                  data-testid={testId}
                >
                  <span>{label}</span><b>{count}</b>
                </button>
              );
            })}
          </div>
        </div>

        <div className="wall-gallery" id="recognition-results" aria-live="polite" data-testid="awards-grid">
          {displayedAwards.map((award, index) => (
            <AwardCard
              key={award.id}
              award={award}
              index={index}
              testIdPrefix={activeFilter === "Featured" ? "featured-award" : "award-card"}
            />
          ))}
        </div>
        <div className="wall-footnote"><span /> Each distinction represents a project, a team, and a standard upheld on site.</div>
      </section>
    </div>
  );
}