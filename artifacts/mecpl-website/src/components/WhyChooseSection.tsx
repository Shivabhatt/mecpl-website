import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

interface WhyCard {
  stat: string;
  title: string;
  desc: string;
  image: string;
}

const whyChoose: WhyCard[] = [
  { stat: "95%+",      title: "Timely Delivery",        desc: "Over 95% of projects handed over on or ahead of schedule — backed by rigorous scheduling and proactive site governance.", image: "assets/projects/Trump-Tower.jpg" },
  { stat: "ISO 45001", title: "Safety First",           desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site, protecting our teams on India's most complex builds.", image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { stat: "25+ Years", title: "Engineering Excellence", desc: "25+ years of structural engineering expertise on India's most ambitious and technically demanding projects.", image: "assets/projects/Godrej-Forest-grove.jpg" },
  { stat: "ISO 9001",  title: "Quality Assurance",      desc: "ISO 9001:2015 certified quality management applied across every project phase — from structural planning to final handover.", image: "assets/projects/Emirus-scaled.jpg" },
];

export default function WhyChooseSection() {
  const [activeWhy, setActiveWhy] = useState<number>(0);
  const whyRef = useRef<HTMLElement>(null);
  const assetBase = import.meta.env.BASE_URL;

  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const leftCol = sec.querySelector<HTMLElement>(".why-left-col");
        if (!leftCol) return;
        gsap.from(leftCol, {
          x: -40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none none" },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desc = sec.querySelector<HTMLElement>(`.why-desc[data-idx="${activeWhy}"]`);
    if (!desc) return;
    let split: SplitText | null = null;
    const raf = requestAnimationFrame(() => {
      split = SplitText.create(desc, { type: "lines", mask: "lines" });
      gsap.from(split.lines, { yPercent: 110, duration: 0.55, ease: "power3.out", stagger: 0.07 });
    });
    return () => { cancelAnimationFrame(raf); split?.revert(); };
  }, [activeWhy]);

  return (
    <section
      ref={whyRef}
      data-testid="section-why-mecpl"
      style={{ background: "#ffffff", position: "relative", marginTop: "64px" }}
    >
      <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "55% 45%", minHeight: "90vh" }}>
        <div className="why-left-col" style={{
          padding: "100px 60px 100px 80px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ marginBottom: "36px" }}>
            <span className="home-section-label font-montserrat" style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
              display: "block", marginBottom: "10px",
            }}>
              Our Advantage
            </span>
            <h3 className="hp-section-title font-montserrat" style={{
              margin: "0 0 16px",
            }}>
              Why Choose MECPL
            </h3>
            <p className="page-subtitle-font" style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px",
              lineHeight: 1.75, color: "#949599", margin: 0, maxWidth: "400px",
            }}>
              Two decades of structural excellence — on time, on spec, and built to outlast generations.
            </p>
          </div>

          <div>
            {whyChoose.map((item, i) => (
              <div
                key={i}
                style={{ borderTop: "1px solid rgba(17,24,39,0.1)" }}
                onMouseEnter={() => setActiveWhy(i)}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "22px 0", cursor: "default",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600,
                      color: activeWhy === i ? "#C41E3A" : "rgba(17,24,39,0.3)",
                      letterSpacing: "0.22em", transition: "color 0.3s",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="home-accordion-title font-montserrat" style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "13px", fontWeight: 700,
                      color: activeWhy === i ? "#111827" : "rgba(17,24,39,0.45)",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      transition: "color 0.3s",
                    }}>
                      {item.title}
                    </span>
                  </div>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                    border: `1.5px solid ${activeWhy === i ? "#C41E3A" : "rgba(17,24,39,0.15)"}`,
                    background: activeWhy === i ? "#C41E3A" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.3s, background 0.3s",
                  }}>
                    <span style={{
                      color: activeWhy === i ? "#fff" : "#9ca3af",
                      fontSize: "15px", lineHeight: 1, marginTop: "-1px",
                      fontFamily: "'Montserrat',sans-serif",
                    }}>
                      {activeWhy === i ? "−" : "+"}
                    </span>
                  </div>
                </div>

                <div className={`why-drawer${activeWhy === i ? " why-drawer-open" : ""}`}>
                  <div style={{ paddingBottom: "28px" }}>
                    <div style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "2rem", fontWeight: 800, color: "#EC3338",
                      marginBottom: "10px", lineHeight: 1.0,
                    }}>
                      {item.stat}
                    </div>
                    <p
                      className="why-desc"
                      data-idx={i}
                      style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
                        lineHeight: 1.8, color: "#949599", margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(17,24,39,0.1)" }} />
          </div>
        </div>

        <div data-scroll-reveal="image" style={{ position: "relative", overflow: "hidden" }}>
          {whyChoose.map((item, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              opacity: activeWhy === i ? 1 : 0,
              transition: "opacity 0.7s ease",
              pointerEvents: "none",
            }}>
              <img
                src={`${assetBase}${item.image}`} alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}