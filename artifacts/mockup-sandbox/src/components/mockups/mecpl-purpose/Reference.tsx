import "./_group.css";
import "./Reference.css";

const purposeRows = [
  {
    label: "Our Vision",
    text: "To be the most preferred civil engineering contractor, delivering beyond expectations through safe, compliant and environmentally responsible execution.",
    highlights: "SAFE · COMPLIANT · RESPONSIBLE",
  },
  {
    label: "Our Mission",
    text: "To deliver quality construction, on time and with care — continually improving our people, processes and technology while putting safety, health and the environment first.",
    highlights: "QUALITY · PEOPLE · PROCESS",
  },
];

export function Reference() {
  return (
    <div className="purpose-preview purpose-reference">
      <section className="purpose-ref-section" aria-labelledby="purpose-ref-title">
        <span className="purpose-ref-watermark" aria-hidden="true" />
        <div className="purpose-ref-content">
          <header className="purpose-ref-header">
            <span className="purpose-ref-kicker">OUR PURPOSE</span>
            <h2 className="purpose-ref-title" id="purpose-ref-title">
              <span>Where We&apos;re Going.</span>
              <span>How We Get There.</span>
            </h2>
          </header>

          <div className="purpose-ref-cards">
            {purposeRows.map((row, index) => (
              <article
                className={`purpose-ref-card${index === 1 ? " purpose-ref-card-dark" : ""}`}
                key={row.label}
              >
                <div className="purpose-ref-copy">
                  <h3>{row.label}</h3>
                  <p>{row.text}</p>
                  <span className="purpose-ref-highlights">{row.highlights}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}