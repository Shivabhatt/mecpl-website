import { ArrowRight } from "lucide-react";
import "./_group.css";

export function Current() {
  return (
    <main className="home-about-preview">
      <section
        id="about"
        data-testid="section-about"
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          padding: "100px 40px 128px 45px",
        }}
      >
        <div className="max-w-none mx-auto">
          <div className="grid items-start gap-16 lg:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="about-copy">
              <div className="about-fade" style={{ marginBottom: "36px", textAlign: "center" }}>
                <span
                  className="home-section-label home-intro-label font-montserrat text-[15px]"
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "#EC3338",
                    textTransform: "none",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Who we are
                </span>
                <h2
                  className="hp-section-title home-heading-26 home-intro-title whitespace-normal font-montserrat"
                  style={{
                    maxWidth: "520px",
                    margin: "0 auto 20px",
                    fontSize: "clamp(1.5rem, 1.9vw, 1.75rem)",
                  }}
                >
                  From a ₹2 lakh beginning to ₹900+ Cr
                </h2>
                <div style={{ width: "40px", height: "3px", background: "#EC3338", margin: "0 auto" }} />
              </div>

              <div
                className="about-quote"
                style={{
                  borderLeft: "3px solid #EC3338",
                  paddingLeft: "24px",
                  marginBottom: "32px",
                  willChange: "clip-path",
                }}
              >
                <p
                  className="font-montserrat"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#232529",
                    lineHeight: 1.6,
                    margin: "0 0 18px",
                    letterSpacing: "normal",
                  }}
                >
                  “Bringing positive changes in the lives of the people around me is the biggest achievement I've had in my life.”
                </p>
                <div
                  className="font-montserrat text-[15px]"
                  style={{
                    color: "#232529",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "15px" }}>
                    <span style={{ color: "#232529", fontWeight: 600 }}>M. B Nambiar</span>
                    <span style={{ color: "#949599", fontWeight: 500 }}> — </span>
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>Founder &amp; Chairman</span>
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#949599",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                    className="font-montserrat text-[14px]"
                  >
                    Honoured with the prestigious{" "}
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>
                      Nirman Ratna Lifetime Achievement Award
                    </span>{" "}
                    by the BAI and the{" "}
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>Lifetime Achievement Award</span> by AESA
                  </span>
                </div>
              </div>

              <div className="about-fade">
                <p style={{ fontSize: "14px", lineHeight: 1.85, color: "#4f545b", marginBottom: "28px" }}>
                  Millennium Engineers &amp; Contractors began in the 1980s as a small partnership, taken on by an
                  engineer who wasn't content working for someone else. Four and a half decades on, that same
                  commitment to quality and timely delivery has grown MECPL into one of Pune's most trusted
                  structural engineering and construction names — ISO-certified, CRISIL-rated, and built on 8,000+
                  skilled hands.
                </p>
                <a href="/about" data-testid="button-about-more">
                  <span
                    className="font-montserrat inline-flex items-center gap-2 cursor-pointer text-[12px]"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "normal",
                      color: "#EC3338",
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    Read our full story <ArrowRight size={12} />
                  </span>
                </a>
              </div>
            </div>

            <div className="about-img h-[420px] lg:h-auto lg:self-stretch">
              <img src="/__mockup/images/mecpl-leader-01.jpg" alt="Mr. M. B. Nambiar, Founder and Chairman of MECPL" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
