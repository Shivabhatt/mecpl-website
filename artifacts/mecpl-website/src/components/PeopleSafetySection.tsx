import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const safetyHighlights = [
  { value: "3000+", label: "Skilled Workforce" },
  { value: "Daily", label: "Safety Induction" },
  { value: "On-Site", label: "Medical Professional" },
  { value: "100%", label: "PPE Compliance" },
];

const additionalHighlights = [
  "On-Site Crèche & Daycare",
  "Segregated Waste & Recycling",
];

export default function PeopleSafetySection() {
  return (
    <section
      data-testid="section-people-safety"
      style={{
        background: "#f7f7f6",
        borderTop: "1px solid rgba(35,37,41,0.08)",
        borderBottom: "1px solid rgba(35,37,41,0.08)",
        padding: "110px 56px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <span
            className="home-section-label font-montserrat"
            style={{
              display: "block",
              marginBottom: "16px",
              color: "#EC3338",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            People &amp; Safety
          </span>
          <h2
            className="hp-section-title font-montserrat font-medium"
            style={{
              maxWidth: "560px",
              margin: "0 0 24px",
              color: "#232529",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 0.98,
              textTransform: "uppercase",
            }}
          >
            Our Team Is
            <br />
            Our Substance
          </h2>
          <p
            className="page-subtitle-font"
            style={{
              maxWidth: "590px",
              margin: "0 0 26px",
              color: "#62656b",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "14px",
              lineHeight: 1.85,
            }}
          >
            Over 3,000 skilled workers, supported by daily safety induction,
            protective equipment allocation, vertigo tests and routine health
            check-ups — with a medical professional assigned to every site.
          </p>
          <blockquote
            style={{
              maxWidth: "560px",
              margin: "0 0 34px",
              paddingLeft: "20px",
              borderLeft: "3px solid #EC3338",
              color: "#232529",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "15px",
              fontStyle: "italic",
              fontWeight: 600,
              lineHeight: 1.7,
            }}
          >
            “Our infrastructure is our strength. Our team is our substance.”
          </blockquote>
          <div style={{ display: "flex", flexWrap: "nowrap", gap: "12px" }}>
            <Link href="/contact">
              <span
                className="font-montserrat"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  padding: "15px 22px",
                  background: "#EC3338",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                }}
              >
                View Our HSE Policy <ArrowRight size={13} />
              </span>
            </Link>
            <Link href="/about">
              <span
                className="font-montserrat"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  padding: "14px 22px",
                  border: "1px solid rgba(35,37,41,0.22)",
                  color: "#232529",
                  cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                }}
              >
                Safety Highlights <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "1px",
              background: "rgba(35,37,41,0.12)",
              border: "1px solid rgba(35,37,41,0.12)",
            }}
          >
            {safetyHighlights.map((highlight) => (
              <div
                key={highlight.label}
                style={{
                  minHeight: "170px",
                  padding: "28px",
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                    color: "#EC3338",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {highlight.value}
                </div>
                <div
                  style={{
                    color: "#62656b",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    lineHeight: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {highlight.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
            {additionalHighlights.map((highlight) => (
              <div
                key={highlight}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "18px 20px",
                  background: "#232529",
                  color: "#ffffff",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <ShieldCheck size={17} color="#EC3338" />
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const safetyHighlightsDuplicate = [
  { value: "3000+", label: "Skilled Workforce" },
  { value: "Daily", label: "Safety Induction" },
  { value: "On-Site", label: "Medical Professional" },
  { value: "100%", label: "PPE Compliance" },
];

const additionalHighlightsDuplicate = [
  "On-Site Crèche & Daycare",
  "Segregated Waste & Recycling",
];

function PeopleSafetySectionDuplicate() {
  return (
    <section
      data-testid="section-people-safety"
      style={{
        background: "#f7f7f6",
        borderTop: "1px solid rgba(35,37,41,0.08)",
        borderBottom: "1px solid rgba(35,37,41,0.08)",
        padding: "110px 56px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <span
            className="home-section-label font-montserrat"
            style={{
              display: "block",
              marginBottom: "16px",
              color: "#EC3338",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            People &amp; Safety
          </span>
          <h2
            className="hp-section-title font-montserrat font-medium"
            style={{
              maxWidth: "560px",
              margin: "0 0 24px",
              color: "#232529",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 0.98,
              textTransform: "uppercase",
            }}
          >
            Our Team Is
            <br />
            Our Substance
          </h2>
          <p
            className="page-subtitle-font"
            style={{
              maxWidth: "590px",
              margin: "0 0 26px",
              color: "#62656b",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "14px",
              lineHeight: 1.85,
            }}
          >
            Over 3,000 skilled workers, supported by daily safety induction,
            protective equipment allocation, vertigo tests and routine health
            check-ups — with a medical professional assigned to every site.
          </p>
          <blockquote
            style={{
              maxWidth: "560px",
              margin: "0 0 34px",
              paddingLeft: "20px",
              borderLeft: "3px solid #EC3338",
              color: "#232529",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "15px",
              fontStyle: "italic",
              fontWeight: 600,
              lineHeight: 1.7,
            }}
          >
            “Our infrastructure is our strength. Our team is our substance.”
          </blockquote>
          <div style={{ display: "flex", flexWrap: "nowrap", gap: "12px" }}>
            <Link href="/contact">
              <span
                className="font-montserrat"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  padding: "15px 22px",
                  background: "#EC3338",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                }}
              >
                View Our HSE Policy <ArrowRight size={13} />
              </span>
            </Link>
            <Link href="/about">
              <span
                className="font-montserrat"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  padding: "14px 22px",
                  border: "1px solid rgba(35,37,41,0.22)",
                  color: "#232529",
                  cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                }}
              >
                Safety Highlights <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "1px",
              background: "rgba(35,37,41,0.12)",
              border: "1px solid rgba(35,37,41,0.12)",
            }}
          >
            {safetyHighlights.map((highlight) => (
              <div
                key={highlight.label}
                style={{
                  minHeight: "170px",
                  padding: "28px",
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                    color: "#EC3338",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {highlight.value}
                </div>
                <div
                  style={{
                    color: "#62656b",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    lineHeight: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {highlight.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
            {additionalHighlights.map((highlight) => (
              <div
                key={highlight}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "18px 20px",
                  background: "#232529",
                  color: "#ffffff",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <ShieldCheck size={17} color="#EC3338" />
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}