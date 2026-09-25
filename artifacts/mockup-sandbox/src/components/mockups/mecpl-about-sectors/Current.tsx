import { Building, Building2, Construction, DoorOpen, Factory, Landmark } from "lucide-react";
import "./_group.css";

const sectors = [
  { label: "RESIDENTIAL", Icon: Building2 },
  { label: "COMMERCIAL", Icon: Building },
  { label: "INSTITUTIONAL", Icon: Landmark },
  { label: "INDUSTRIAL", Icon: Factory },
  { label: "INFRASTRUCTURE", Icon: Construction },
  { label: "INTERIORS", Icon: DoorOpen },
];

const stats = [
  { val: "50+", label: "YEARS OF LEGACY" },
  { val: "30+", label: "COMPLETED PROJECTS" },
  { val: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function Current() {
  return (
    <div className="about-page sectors-preview sectors-current">
      <section className="abt-sectors-section">
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span
              className="font-montserrat"
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.3em",
                color: "#EC3338",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              TODAY, WE BUILD ACROSS
            </span>
            <h2
              className="font-montserrat"
              style={{
                fontWeight: 600,
                fontSize: 36,
                color: "#232529",
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Diverse Spaces.
              <br />
              A Stronger India.
            </h2>
          </div>

          <div className="abt-sectors-list" style={{ marginBottom: 80 }}>
            {sectors.map(({ label, Icon }) => (
              <div
                key={label}
                className="font-montserrat"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#EC3338",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                }}
              >
                <Icon size={30} strokeWidth={1.5} color="#949599" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div
            className="abt-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="abt-stat-item font-montserrat"
                style={{
                  padding: "44px 32px",
                  borderRight:
                    index < stats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                    color: "#232529",
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#949599",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}