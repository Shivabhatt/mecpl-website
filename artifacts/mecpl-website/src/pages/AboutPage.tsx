import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const assetBase = import.meta.env.BASE_URL;

const stats = [
  { val: "40+", label: "Year Of Legacy" },
  { val: "100+", label: "Completed Projects" },
  { val: "100%", label: "Quality Consistency" },
  { val: "100+", label: "Satisfied Clients" },
];

const leaders = [
  {
    name: "Mr. M B Nambiar",
    role: "Chairman",
    desc: "The founding architect of MECPL's ethos — Mr. Nambiar's 40+ year vision has forged the company's culture of quality-first execution, regulatory discipline, and client trust. Under his stewardship, MECPL has grown from a regional contractor to one of Pune's most decorated engineering firms.",
    image: `${assetBase}assets/leaders/leader-01.jpg`,
  },
  {
    name: "Mr. Jeevan K",
    role: "Managing Director",
    desc: "The operational engine of MECPL. Mr. Jeevan K drives cross-functional strategy, large-scale delivery leadership, and technology adoption — ensuring every project runs with the precision that has earned MECPL its CRISIL SME 1 rating and national recognition.",
    image: `${assetBase}assets/leaders/leader-03.jpg`,
  },
  {
    name: "Mr. Manojkumar M R",
    role: "Director Finance",
    desc: "Commanding fiscal governance and compliance infrastructure across all MECPL operations. Mr. Manojkumar's financial stewardship has secured MECPL's long-term capital stability, investor trust, and sustained credit excellence.",
    image: `${assetBase}assets/leaders/leader-02.jpg`,
  },
  {
    name: "Mr. Jitin Nambiar",
    role: "Executive Director",
    desc: "The next-generation force at MECPL. Mr. Jitin Nambiar oversees active project portfolios, on-site engineering execution, and the integration of modern construction methodologies — driving MECPL's ambitions into Pune's evolving skyline.",
    image: `${assetBase}assets/leaders/jitin.png`,
  },
];

const clientLogos = [
  { name: "Panchshil Realty", src: `${assetBase}assets/clients/client-09-1.webp` },
  { name: "Flame University", src: `${assetBase}assets/clients/client-05.webp` },
  { name: "Godrej Properties", src: `${assetBase}assets/clients/client-12-1.webp` },
  { name: "Hublikar Constructions", src: `${assetBase}assets/clients/omniactive.webp` },
  { name: "K Raheja Corp", src: `${assetBase}assets/clients/client-17.webp` },
  { name: "Kalpataru", src: `${assetBase}assets/clients/client-14.webp` },
  { name: "Lotus", src: `${assetBase}assets/clients/client-13.webp` },
  { name: "VTP Realty", src: `${assetBase}assets/clients/vtp-realty.webp` },
  { name: "TCS", src: `${assetBase}assets/clients/client-06.webp` },
  { name: "Pride Purple Group", src: `${assetBase}assets/clients/client-15-1.webp` },
];
const loopingLogos = [...clientLogos, ...clientLogos];

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

// ─── VISION STACK (rainearchitects stacking cards) ───────────────────────────
const vmCards = [
  {
    label: "Our\nStory",
    heading: "25+ Years Building\nPune's Skyline",
    text: "Millennium Engineers & Contractors Pvt. Ltd. is renowned for its client-focused, quality-driven approach to construction. The company holds ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications, ensuring quality, safety, and eco-friendliness. Since 2007, MECPL has maintained a CRISIL rating of SME 1.",
    badge: "ISO 9001 · ISO 14001 · ISO 45001 · CRISIL SME 1",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
    bg: "#ffffff",
  },
  {
    label: "Our\nVision",
    heading: "India's Most Preferred\nCivil Contractor",
    text: "MECPL aspires to become the most preferred civil engineering contractor. We commit ourselves to delight our clients by surpassing their expectations while consistently meeting compliance obligations in an extremely safe and eco-friendly manner.",
    badge: null,
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000&auto=format&fit=crop",
    bg: "#f4f4f2",
  },
  {
    label: "Our\nMission",
    heading: "Quality. Delivery.\nContinuous Improvement.",
    text: "Our commitment is to provide quality construction, ensure timely completion, and deliver exceptional post-project services, all while prioritising safety, health, and environmental considerations through continuous improvement in our people, processes, and technology.",
    badge: null,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    bg: "#ece8df",
  },
];

function VisionStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>(".vm-stack-card");

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.fromTo(
          card,
          { yPercent: 6, scale: 0.97 },
          {
            yPercent: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top top+=80",
              scrub: 0.8,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {vmCards.map((card, i) => (
        <div
          key={i}
          className="vm-stack-card"
          style={{
            position: "sticky",
            top: 80,
            zIndex: i + 1,
            background: card.bg,
            height: "calc(100vh - 80px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {/* Col 1 — image + label */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRight: "1px solid rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}>
            {/* Square image */}
            <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
              <img
                src={card.img}
                alt={card.label.replace("\n", " ")}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {/* h3 label */}
            <div style={{ padding: "32px 36px", background: card.bg, borderTop: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
              <h3 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3vw, 3rem)",
                lineHeight: 1.0,
                color: "#C41E3A",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                whiteSpace: "pre-line",
                margin: 0,
              }}>
                {card.label}
              </h3>
            </div>
          </div>

          {/* Col 2 — photo */}
          <div style={{ position: "relative", overflow: "hidden", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
            <img
              src={card.img}
              alt={card.heading}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {card.badge && (
              <div style={{ position: "absolute", bottom: 20, left: 20, background: "#C41E3A", color: "#fff", padding: "10px 16px" }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {card.badge}
                </span>
              </div>
            )}
          </div>

          {/* Col 3 — content */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 72px",
          }}>
            <h3 style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.3rem, 2vw, 1.9rem)",
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              margin: "0 0 28px",
              whiteSpace: "pre-line",
            }}>
              {card.heading}
            </h3>
            <p style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.93rem",
              color: "#555",
              lineHeight: 1.9,
              margin: 0,
              maxWidth: 500,
            }}>
              {card.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── WORD SCATTER (giats.me) ─────────────────────────────────────────────────
const SCATTER_TEXT =
  "Architecting Pune's landmarks, built by one team that never compromised on quality, safety, and delivering excellence for 40 years without exception.";

function seededRand(seed: number) {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function WordScatterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const words = SCATTER_TEXT.split(" ");

  const scatter = words.map((_, i) => {
    const r1 = seededRand(i);
    const r2 = seededRand(i + 100);
    const r3 = seededRand(i + 200);
    const r4 = seededRand(i + 300);
    return {
      x: (r1 - 0.5) * 900,
      y: (r2 - 0.5) * 700,
      scale: 0.45 + r3 * 2.8,
      opacity: 0.08 + r4 * 0.32,
    };
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const raw = Math.min(1, Math.max(0, scrolled / scrollable));
      // ease: slow start, fast middle, slow end
      const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;

      const els = wordsRef.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const s = scatter[i];
        const tx = s.x * (1 - p);
        const ty = s.y * (1 - p);
        const sc = s.scale + (1 - s.scale) * p;
        const op = s.opacity + (1 - s.opacity) * p;
        el.style.transform = `translate(${tx}px,${ty}px) scale(${sc})`;
        el.style.opacity = String(Math.min(1, op));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: "420vh", background: "#f0ede8", position: "relative" }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 820, padding: "0 48px", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(1.15rem, 2.2vw, 2rem)",
            fontWeight: 600,
            lineHeight: 1.75,
            color: "#111",
            margin: 0,
          }}>
            {words.map((word, i) => (
              <span
                key={i}
                ref={el => { wordsRef.current[i] = el; }}
                style={{
                  display: "inline-block",
                  marginRight: "0.28em",
                  willChange: "transform, opacity",
                  transformOrigin: "center center",
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function RevealBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(48px)",
        transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div data-animate-page style={{ background: "#ffffff", fontFamily: "'Montserrat', sans-serif" }}>

      {/* ─── FELIX-NIETO EDITORIAL HERO ─────────────────────── */}
      <section style={{
        background: "#ece8df",
        minHeight: "100vh",
        padding: "130px 56px 0",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Full-bleed editorial typography */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <span style={{ width: 28, height: 1.5, background: "#C41E3A", display: "block" }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", color: "#C41E3A", textTransform: "uppercase" }}>
              About MECPL
            </span>
          </div>

          {/* Line 1 — heavy black, full-width bleed */}
          <div style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.8rem, 10.5vw, 11rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#111",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            ENGINEERING
          </div>

          {/* Line 2 — ultra-thin, indented, contrasting weight */}
          <div style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 200,
            fontSize: "clamp(3.8rem, 10.5vw, 11rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#111",
            textTransform: "uppercase",
            paddingLeft: "clamp(2rem, 5vw, 7rem)",
            whiteSpace: "nowrap",
          }}>
            LANDMARKS
          </div>

          {/* Line 3 — mixed: red accent word + thin rest */}
          <div style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.8rem, 10.5vw, 11rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#111",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            &amp;{" "}
            <span style={{ fontWeight: 200, color: "#C41E3A" }}>EXCELLENCE.</span>
          </div>
        </div>

        {/* Right-side image — overlaps typography vertically (felix-nieto collage) */}
        <div style={{
          position: "absolute",
          top: "18%",
          right: 0,
          width: "42%",
          height: "70%",
          zIndex: 1,
          overflow: "hidden",
        }}>
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop"
            alt="MECPL engineering landmark"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          {/* Subtle left-fade so it bleeds into text area */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #ece8df 0%, transparent 22%)",
          }} />
        </div>

        {/* Bottom bar — tagline + scroll (felix-nieto pattern) */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "40px 0 48px",
          marginTop: 24,
        }}>
          <p style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 600,
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "#666",
            textTransform: "uppercase",
            lineHeight: 1.7,
            margin: 0,
          }}>
            QUALITY-DRIVEN CONSTRUCTION FOR<br />
            HIGH-IMPACT DEVELOPMENTS · PUNE, INDIA · SINCE 1999
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            color: "#888",
            textTransform: "uppercase",
          }}>
            SCROLL
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7l6 6 6-6" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── COMPANY STORY + STATS ───────────────────────────── */}
      <section id="abt1" style={{ background: "#ffffff", padding: "120px 40px", borderBottom: "1px solid rgba(0,0,0,0.07)", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <RevealBlock>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
                Our Story
              </span>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#111", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 28px" }}>
                25+ Years of Building<br />Pune's Skyline
              </h2>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.95rem", color: "#555", lineHeight: 1.9, margin: "0 0 20px" }}>
                Millennium Engineers &amp; Contractors Pvt. Ltd. headquartered in Pune, is renowned for its client-focused, quality-driven approach to construction. By embracing the latest technology and innovation, the company has earned a strong reputation in Pune's construction industry.
              </p>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.95rem", color: "#555", lineHeight: 1.9, margin: 0 }}>
                With a team of civil engineering experts, they have successfully completed large-scale projects. The company holds ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications, ensuring quality, safety, and eco-friendliness. Since 2007, MECPL has maintained a CRISIL rating of SME 1.
              </p>
            </RevealBlock>

            <RevealBlock delay={150}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {stats.map((s, i) => (
                  <div key={s.label} style={{
                    padding: "48px 32px",
                    background: i % 2 === 0 ? "#f8f8f8" : "#ffffff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "2.8rem", color: "#C41E3A", lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginTop: 12 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── VISION STACK ────────────────────────────────────── */}
      <VisionStackSection />

      {/* ─── VIDEO SECTION ───────────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "120px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(196,30,58,0.1) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
                Our Story In Motion
              </span>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#ffffff", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
                The MECPL Journey
              </h2>
            </div>
          </RevealBlock>
          <RevealBlock delay={150}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
              <iframe
                src="https://www.youtube.com/embed/2b1u5KUSUkk?rel=0&modestbranding=1"
                title="MECPL Journey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── WORD SCATTER (giats.me) ─────────────────────────── */}
      <WordScatterSection />

      {/* ─── LEADERSHIP (joffreyspitzer style) ──────────────── */}
      <section id="abt3" style={{ background: "#ffffff", padding: "120px 40px", borderBottom: "1px solid rgba(0,0,0,0.07)", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ marginBottom: 72, textAlign: "center" }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
                OUR LEADERS
              </span>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#111", textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
                The Founders
              </h2>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.9rem", color: "#888", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                Four visionaries, one mission. The leadership of MECPL brings together decades of engineering excellence, financial acumen, and operational mastery.
              </p>
            </div>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {leaders.map((leader, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div style={{ position: "relative", overflow: "hidden", background: "#f8f8f8", cursor: "default" }}
                  className="leader-card"
                >
                  {/* Photo */}
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#e8e8e8" }}>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", transition: "transform 0.7s cubic-bezier(.16,1,.3,1)" }}
                      className="leader-photo"
                    />
                  </div>
                  {/* Name bar */}
                  <div style={{ padding: "24px 20px 20px", borderTop: "2px solid #C41E3A" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "0.85rem", color: "#111", textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.3, marginBottom: 6 }}>{leader.name}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase" }}>{leader.role}</div>
                  </div>
                  {/* Hover overlay */}
                  <div className="leader-overlay" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.6) 60%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    padding: 28,
                  }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "0.85rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 4 }}>{leader.name}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", marginBottom: 14 }}>{leader.role}</div>
                    <div style={{ width: 28, height: 2, background: "#C41E3A", marginBottom: 14 }} />
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>{leader.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Hover styles for leader cards */}
      <style>{`
        .leader-card:hover .leader-overlay { opacity: 1 !important; }
        .leader-card:hover .leader-photo { transform: scale(1.06); }
      `}</style>

      {/* ─── CLIENT LOGOS TICKER ─────────────────────────────── */}
      <section style={{ background: "#f8f8f8", padding: "80px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <RevealBlock>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
              Trusted By
            </span>
            <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#111", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              Leading Brands &amp; Developers
            </h2>
          </div>
        </RevealBlock>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 0 auto", width: 120, background: "linear-gradient(to right, transparent, #f8f8f8)", zIndex: 10, left: 0 }} />
          <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 0 auto", width: 120, background: "linear-gradient(to left, transparent, #f8f8f8)", zIndex: 10 }} />
          <div className="animate-ticker" style={{ gap: 16 }}>
            {loopingLogos.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                style={{
                  flexShrink: 0,
                  width: 180,
                  height: 100,
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 20px",
                }}
              >
                <img src={client.src} alt={client.name} style={{ maxHeight: 48, width: "auto", maxWidth: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "120px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(196,30,58,0.12) 0%, transparent 70%)" }} />
        <RevealBlock>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              Work With MECPL
            </span>
            <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.6rem)", color: "#ffffff", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 28px" }}>
              Trusted By 100+<br />Enterprise Clients
            </h2>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, margin: "0 0 44px" }}>
              Join the developers, institutions, and enterprises who rely on MECPL to deliver their most ambitious structures.
            </p>
            <Link href="/contact">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#C41E3A", color: "#fff",
                padding: "18px 40px",
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s",
              }}>
                Get In Touch <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </RevealBlock>
      </section>

    </div>
  );
}
