import { Quote } from "lucide-react";
import "./_group.css";

const founderImage = "/__mockup/images/mecpl-founder.jpg";

export function Current() {
  return (
    <div className="founder-preview">
      <section
        style={{
          minHeight: "100vh",
          overflow: "hidden",
          padding: "96px 56px",
          background: "#232529",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ position: "relative", aspectRatio: "3/4" }}>
              <img
                src={founderImage}
                alt="M. B. Nambiar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(20%) contrast(1.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  background: "#EC3338",
                  padding: 32,
                  color: "#fff",
                }}
              >
                <Quote size={32} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <span
              className="font-montserrat"
              style={{
                display: "block",
                marginBottom: 12,
                color: "#EC3338",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              OUR FOUNDER
            </span>
            <h2
              className="font-montserrat"
              style={{
                margin: "0 0 32px",
                fontSize: 36,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              A Vision That Built Generations.
            </h2>
            <div
              className="font-montserrat"
              style={{
                marginBottom: 8,
                color: "#EC3338",
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              M. B. Nambiar
            </div>
            <div
              className="font-montserrat"
              style={{
                marginBottom: 32,
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Founder &amp; Promoter
            </div>
            <p
              className="font-inter"
              style={{
                margin: "0 0 40px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
              }}
            >
              A civil engineer with over six decades of experience, M. B. Nambiar began his professional journey in 1964 and went on to establish Shreyas Constructions, laying the foundation for what would become the Millennium Engineers group.
              <br /><br />
              Since the establishment of MECPL in 1999, his vision and entrepreneurial leadership have shaped the company&apos;s growth, reputation and enduring commitment to quality, safety and professional excellence.
              <br /><br />
              His contribution to the construction industry has been recognised with the Nirman Ratna Lifetime Achievement Award by the Builders Association of India and the AESA Lifetime Achievement Award in 2022, presented by the Architects, Engineers and Surveyors Association (AESA), Pune.
            </p>
            <div
              style={{
                maxWidth: 420,
                margin: "0 auto",
                borderTop: "2px solid #EC3338",
                paddingTop: 24,
              }}
            >
              <p
                className="font-montserrat"
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                A legacy built on experience.
                <br />
                A culture built to endure.
              </p>
              <span
                className="font-montserrat"
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                M. B. Nambiar
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}