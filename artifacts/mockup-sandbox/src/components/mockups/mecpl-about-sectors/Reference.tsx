import "./_group.css";

const sectors = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "INSTITUTIONAL",
  "INDUSTRIAL",
  "INFRASTRUCTURE",
  "INTERIORS",
];

const stats = [
  { val: "50+", label: "YEARS OF LEGACY" },
  { val: "30+", label: "COMPLETED PROJECTS" },
  { val: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function Reference() {
  return (
    <div className="about-page sectors-preview sectors-reference">
      <section className="abt-sectors-section" aria-label="MECPL sectors and achievements">
        <header className="abt-sectors-header">
          <span className="abt-sectors-eyebrow">TODAY, WE BUILD ACROSS</span>
          <h2 className="abt-sectors-title">DIVERSE SPACES. A STRONGER INDIA.</h2>
        </header>

        <div className="abt-sectors-list" aria-label="Sectors MECPL serves">
          {sectors.map((sector) => (
            <div className="abt-sector-tab" key={sector}>
              {sector}
            </div>
          ))}
        </div>

        <div className="abt-stats-grid" aria-label="MECPL at a glance">
          {stats.map((stat, index) => (
            <div
              className={`abt-stat-item${index === 1 ? " is-featured" : ""}`}
              key={stat.label}
            >
              <span className="abt-stat-value">{stat.val}</span>
              <span className="abt-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}