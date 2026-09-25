import "./_group.css";
import "./Current.css";

const purposeRows = [
  {
    label: "Our Vision",
    text: "To be the most preferred civil engineering contractor, delivering beyond expectations through safe, compliant and environmentally responsible execution.",
  },
  {
    label: "Our Mission",
    text: "To deliver quality construction, on time and with care — continually improving our people, processes and technology while putting safety, health and the environment first.",
  },
];

export function Current() {
  return (
    <div className="purpose-preview purpose-current">
      <section className="abt-purpose-section">
        <div className="abt-purpose-grid">
          <div className="abt-purpose-visual">
            <img
              className="abt-purpose-image"
              src="/__mockup/images/mecpl-purpose.jpg"
              alt="MECPL construction team building a multi-storey project."
            />
            <div className="abt-purpose-image-shade" aria-hidden="true" />
            <div className="abt-purpose-heading">
              <span className="abt-purpose-kicker">OUR PURPOSE</span>
              <h2 className="abt-purpose-title">
                Where We&apos;re Going.
                <br />
                How We Get There.
              </h2>
            </div>
          </div>

          <div className="abt-purpose-copy">
            {purposeRows.map((row, index) => (
              <article className="abt-purpose-row" key={row.label}>
                <span className="abt-purpose-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="abt-purpose-row-content">
                  <h3 className="abt-purpose-row-title">{row.label}</h3>
                  <p className="abt-purpose-row-text">{row.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}