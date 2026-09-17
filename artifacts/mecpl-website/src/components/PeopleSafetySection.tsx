import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const safetyStats = [
  { value: "8000+", label: "Skilled Workers" },
  { value: "Distinction 2026", label: "International Safety Award · British Safety Council" },
  { value: "On-Site", label: "Medical Professional" },
  { value: "100%", label: "PPE Compliance" },
  { value: "Labour Camp", label: "School Facility" },
  { value: "Industry Experts", label: "Highly Qualified Professionals" },
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
              className="people-safety-heading font-montserrat lg:whitespace-nowrap font-medium"
              style={{
                margin: "0 0 24px",
                color: "#232529",
                fontSize: "36px",
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              Our Team Is
              <br className="lg:hidden" />
              <span className="hidden lg:inline"> </span>
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
              Over 8,000 skilled workers, supported by daily safety induction,
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
              <Link href="/careers">
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
                  Join Our Team <ArrowRight size={13} />
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
                  View Our HSE Policy <ArrowRight size={13} />
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 lg:gap-y-0 divide-y-0 lg:divide-x divide-black/10">
            {safetyStats.map((stat, i) => (
              <div key={i} className="flex min-h-[112px] flex-col items-center justify-start px-4 text-center">
                <div style={{
                  color: "#EC3338",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  minHeight: "50px",
                  display: "flex",
                   alignItems: "flex-start",
                  justifyContent: "center",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: "#949599",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  lineHeight: 1.55,
                  minHeight: "42px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  textTransform: "uppercase",
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
