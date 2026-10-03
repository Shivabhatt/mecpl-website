import "./Premium.css";

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
  const title = award.title
    .split(/((?:19|20)\d{2}(?:[–—-](?:19|20)?\d{2})?)/g)
    .filter((part) => part !== String(award.year))
    .join("")
    .replace(/\s+/g, " ")
    .trim() || award.title;

  return (
    <article
      className="mecpl-premium-card"
      data-testid={`award-card-${award.id}`}
    >
      <header className="mecpl-premium-card-meta">
        <span className="mecpl-premium-organization">{award.issuer}</span>
        <span className="mecpl-premium-year">{award.year}</span>
      </header>

      <div className="mecpl-premium-mark">
        {award.logo ? (
          <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" />
        ) : (
          <span className="mecpl-premium-wordmark">
            {award.issuer}
          </span>
        )}
      </div>

      <div className="mecpl-premium-copy">
        <h2>{title}</h2>
        {award.detail && <p className="mecpl-premium-detail">{award.detail}</p>}
      </div>
    </article>
  );
}

export function Premium() {
  return (
    <main className="mecpl-premium-preview">
      <div className="mecpl-premium-grid" data-testid="awards-grid">
        {awards.map((award) => <AwardCard key={award.id} award={award} />)}
      </div>
    </main>
  );
}

export default Premium;