import "./_group.css";

const award = {
  year: 2026,
  category: "National & State",
  title: "International Safety Award – Distinction",
  issuer: "British Safety Council",
  logo: "/__mockup/images/british-safety-council-award-2026.jpeg",
};

function IssuerMark() {
  return (
    <span className="emblem-mark" aria-label={`${award.issuer} issuer mark`}>
      <img src={award.logo} alt={`${award.issuer} logo`} />
    </span>
  );
}

function awardTitleWithYear() {
  return `${award.title} — ${award.year}`;
}

export function Current() {
  return (
    <div className="mecpl-awards-page emblem-root award-card-frame award-card-frame--current">
      <article className="emblem-feature is-editorial-lead" data-testid="featured-award-national-2026-international-safety">
        <div className="emblem-feature-seal">
          <span className="emblem-feature-ring" aria-hidden="true" />
          <IssuerMark />
        </div>
        <div className="emblem-feature-copy">
          <span className="emblem-category">{award.category}</span>
          <h3>{awardTitleWithYear()}</h3>
          <p className="emblem-issuer">{award.issuer}</p>
        </div>
      </article>
    </div>
  );
}