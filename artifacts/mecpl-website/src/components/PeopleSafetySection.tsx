import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const safetyStats = [
  { value: "3000+", label: "Skilled Workforce" },
  { value: "Daily", label: "Safety Induction" },
  { value: "On-Site", label: "Medical Professional" },
  { value: "100%", label: "PPE Compliance" },
  { value: "On-Site", label: "Crèche & Daycare" },
  { value: "Segregated", label: "Waste & Recycling" },
];

export default function PeopleSafetySection() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section
      id="people-safety"
      data-testid="section-people-safety"
      style={{
        background: "#f7f7f6",
        borderTop: "1px solid rgba(35,37,41,0.08)",
        borderBottom: "1px solid rgba(35,37,41,0.08)",
        padding: "100px 0 0 0",
        overflow: "hidden"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16 lg:mb-24">
          {/* Left Text */}
          <div>
            <span
              className="font-montserrat"
              style={{
                display: "block",
                marginBottom: "16px",
                color: "#EC3338",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              People &amp; Safety
            </span>
            <h2
              className="font-montserrat"
              style={{
                margin: "0 0 24px",
                color: "#232529",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Our Team Is
              <br />
              Our Substance
            </h2>
            <p
              className="font-inter"
              style={{
                margin: "0 0 26px",
                color: "#62656b",
                fontSize: "15px",
                lineHeight: 1.85,
                maxWidth: "500px"
              }}
            >
              Over 3,000 skilled workers, supported by daily safety induction,
              protective equipment allocation, vertigo tests and routine health
              check-ups — with a medical professional assigned to every site.
            </p>
            <blockquote
              style={{
                margin: "0 0 34px",
                paddingLeft: "20px",
                borderLeft: "3px solid #EC3338",
                color: "#232529",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "15px",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.7,
                maxWidth: "500px"
              }}
            >
              “Our infrastructure is our strength. Our team is our substance.”
            </blockquote>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/contact">
                <span
                  className="font-montserrat transition-colors"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px 26px",
                    background: "#EC3338",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#232529")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#EC3338")}
                >
                  View Our HSE Policy <ArrowRight size={13} />
                </span>
              </Link>
              <Link href="/about">
                <span
                  className="font-montserrat transition-colors"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 26px",
                    border: "1px solid rgba(35,37,41,0.22)",
                    color: "#232529",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#232529";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.borderColor = "#232529";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#232529";
                    e.currentTarget.style.borderColor = "rgba(35,37,41,0.22)";
                  }}
                >
                  Safety Highlights <ArrowRight size={13} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div style={{ position: "relative", height: "100%", minHeight: "350px", display: "flex", alignItems: "center" }}>
            <img
              src={`${assetBase}assets/projects/HIGH-RISE-1-scaled.jpg`}
              alt="MECPL People and Safety"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "cover",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                borderRadius: "2px"
              }}
            />
          </div>
        </div>

        {/* Bottom Stats Strip */}
        <div style={{
          borderTop: "1px solid rgba(35,37,41,0.1)",
          padding: "48px 0",
        }}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 lg:gap-y-0 divide-y-0 lg:divide-x divide-black/10">
            {safetyStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                <div style={{
                  color: "#EC3338",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  lineHeight: 1
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: "#949599",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
