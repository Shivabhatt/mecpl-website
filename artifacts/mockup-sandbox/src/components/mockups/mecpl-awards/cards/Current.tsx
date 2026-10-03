import "./_group.css";

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

const awards: AwardEntry[] = [
  {
    id: "national-2026-international-safety",
    year: 2026,
    category: "National & State",
    title: "International Safety Award – Distinction",
    issuer: "British Safety Council",
    logo: `${assetRoot}/awards/british-safety-council-award-2026.jpeg`,
  },
  {
    id: "safety-2025-pcerf-yoo-villa",
    year: 2025,
    category: "Safety",
    title: "PCERF 2025 – Silver Trophy for Safety",
    detail: "Yoo Villa, Pune",
    issuer: "PCERF",
    logo: "/__mockup/images/mecpl-awards/pcerf-safety-award.png",
  },
  {
    id: "quality-2025-bai-k57",
    year: 2025,
    category: "Quality",
    title: "BAI – Well Built Structure Award",
    detail: "KRC K57 Tower, Kharadi",
    issuer: "Builders’ Association of India",
    logo: `${assetRoot}/awards/bai-well-built-structure-award.png`,
  },
  {
    id: "quality-2023-ici",
    year: 2023,
    category: "Quality",
    title: "Indian Concrete Institute – UltraTech Award",
    detail: "EON West Wakad – LP II — Jury Recommendation; 43 Privet Drive — Jury Appreciation",
    issuer: "Indian Concrete Institute",
  },
];

function AwardCard({ award }: { award: AwardEntry }) {
  const titleParts = award.title.split(/((?:19|20)\d{2}(?:[–—-](?:19|20)?\d{2})?)/g);
  const titleHasYear = titleParts.some((part) => /^(?:19|20)\d{2}(?:[–—-](?:19|20)?\d{2})?$/.test(part));

  return (
    <article
      className={`mecpl-award-card mecpl-award-${award.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}
      data-testid={`award-card-${award.id}`}
    >
      <span className="mecpl-award-card-accent" aria-hidden="true" />
      <div className="mecpl-award-card-head">
        <span className="mecpl-award-logo">
          {award.logo ? <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" /> : <span>{award.issuer}</span>}
        </span>
      </div>
      <div className="mecpl-award-copy">
        <h3>
          {titleParts.map((part, index) =>
            /^(?:19|20)\d{2}(?:[–—-](?:19|20)?\d{2})?$/.test(part)
              ? <span className="mecpl-award-year-inline" key={index}>{part}</span>
              : part
          )}
          {!titleHasYear && <>{" "}<span className="mecpl-award-year-inline">{award.year}</span></>}
        </h3>
        {award.detail && <p className="mecpl-award-detail">{award.detail}</p>}
      </div>
    </article>
  );
}

export function Current() {
  return (
    <main className="mecpl-awards-page mecpl-award-current-preview">
      <div className="mecpl-awards-grid" data-testid="awards-grid">
        {awards.map((award) => <AwardCard key={award.id} award={award} />)}
      </div>
    </main>
  );
}

export default Current;