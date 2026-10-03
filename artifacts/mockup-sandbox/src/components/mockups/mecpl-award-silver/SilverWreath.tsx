import "./_group.css";
import "./SilverWreath.css";

const award = {
  year: 2026,
  category: "National & State",
  title: "International Safety Award – Distinction",
  issuer: "British Safety Council",
  logo: "/__mockup/images/british-safety-council-award-2026.jpeg",
};

function awardTitleWithYear() {
  return `${award.title} — ${award.year}`;
}

export function SilverWreath() {
  return (
    <div className="mecpl-awards-page emblem-root award-card-frame">
      <article
        className="emblem-feature is-editorial-lead silver-wreath-feature"
        data-testid="featured-award-national-2026-international-safety"
      >
        <div
          className="emblem-feature-seal"
          style={{ backgroundImage: 'url("/__mockup/images/mecpl-silver-award-wreath.jpg")' }}
        >
          <span className="emblem-wreath-center">
            <span className="emblem-mark" aria-label={`${award.issuer} issuer mark`}>
              <img src={award.logo} alt={`${award.issuer} logo`} loading="lazy" />
            </span>
          </span>
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