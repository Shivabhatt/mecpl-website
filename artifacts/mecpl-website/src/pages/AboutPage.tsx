import { useEffect, useRef, useState } from "react";
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

// ─── ALTERNATING IMAGE / TEXT ROWS ───────────────────────────────────────────
const altRows = [
  {
    label: "Our Vision",
    heading: "India's Most Preferred\nCivil Contractor",
    text: "MECPL aspires to become the most preferred civil engineering contractor. We commit ourselves to delight our clients by surpassing their expectations while consistently meeting compliance obligations in an extremely safe and eco-friendly manner.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    imageLeft: true,
    bg: "#ffffff",
  },
  {
    label: "Our Mission",
    heading: "Quality. Delivery.\nContinuous Improvement.",
    text: "Our commitment is to provide quality construction, ensure timely completion, and deliver exceptional post-project services, all while prioritising safety, health, and environmental considerations through continuous improvement in our people, processes, and technology.",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200&auto=format&fit=crop",
    imageLeft: false,
    bg: "#ffffff",
  },
  {
    label: "Our Values",
    heading: "Safety. Integrity.\nExcellence.",
    text: "Every project we undertake is guided by an uncompromising commitment to safety, ethical practices, and the highest standards of workmanship. We believe that lasting relationships are built on trust, transparency, and the consistent delivery of promises made.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    imageLeft: true,
    bg: "#ffffff",
  },
];

function AlternatingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>(".alt-card");

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

  const textBlock = (row: typeof altRows[0]) => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "72px 72px",
      height: "100%",
      boxSizing: "border-box",
    }}>
      <span style={{
        fontFamily: "'Montserrat',sans-serif",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.28em",
        color: "#C41E3A",
        textTransform: "uppercase",
        display: "block",
        marginBottom: 20,
      }}>
        {row.label}
      </span>
      <h2 style={{
        fontFamily: "'Montserrat',sans-serif",
        fontWeight: 900,
        fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)",
        color: "#111",
        textTransform: "uppercase",
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        margin: "0 0 24px",
        whiteSpace: "pre-line",
      }}>
        {row.heading}
      </h2>
      <div style={{ width: 40, height: 3, background: "#C41E3A", marginBottom: 24 }} />
      <p style={{
        fontFamily: "'Montserrat',sans-serif",
        fontSize: "0.95rem",
        color: "#555",
        lineHeight: 1.9,
        margin: 0,
        maxWidth: 480,
      }}>
        {row.text}
      </p>
    </div>
  );

  const imgBlock = (row: typeof altRows[0]) => (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <img
        src={row.img}
        alt={row.label}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {altRows.map((row, i) => (
        <div
          key={i}
          className="alt-card"
          style={{
            position: "sticky",
            top: 80,
            zIndex: i + 1,
            background: row.bg,
            height: "70vh",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {row.imageLeft ? (
            <>{imgBlock(row)}{textBlock(row)}</>
          ) : (
            <>{textBlock(row)}{imgBlock(row)}</>
          )}
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
      style={{ height: "420vh", background: "#ffffff", position: "relative" }}
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

function LeadershipDoorSlider() {
  const [active, setActive] = useState<number | null>(null);
  const MF = "'Montserrat',sans-serif";

  return (
    <section id="abt3" style={{ background: "#ffffff", scrollMarginTop: 80, padding: "80px 56px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>

      {/* Section header */}
      <div style={{ maxWidth: 1360, margin: "0 auto 52px", textAlign: "center" }}>
        <span style={{ fontFamily: MF, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
          Our Team
        </span>
        <h2 style={{ fontFamily: MF, fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#111", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
          Meet The Founders of MECPL
        </h2>
      </div>

      {/* 4-card grid — image always visible, bio slides up on hover */}
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {leaders.map((leader, i) => {
          const isHovered = active === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                cursor: "default",
                background: "#111",
                borderRadius: 2,
              }}
            >
              {/* ── Portrait photo — always visible ── */}
              <img
                src={leader.image}
                alt={leader.name}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "top center",
                  display: "block",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.65s cubic-bezier(.16,1,.3,1)",
                }}
              />

              {/* ── Always-on bottom gradient + name bar ── */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "64px 22px 22px",
                background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                zIndex: 2,
                opacity: isHovered ? 0 : 1,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}>
                <div style={{ fontFamily: MF, fontWeight: 900, fontSize: "0.82rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.3, marginBottom: 4 }}>
                  {leader.name}
                </div>
                <div style={{ fontFamily: MF, fontWeight: 600, fontSize: "0.54rem", color: "#C41E3A", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  {leader.role}
                </div>
              </div>

              {/* ── Bio overlay — semi-transparent so image shows through ── */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.38) 100%)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "28px 24px",
                zIndex: 3,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.45s ease",
              }}>
                <span style={{ fontFamily: MF, fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: 14 }}>
                  {String(i + 1).padStart(2, "0")} / {String(leaders.length).padStart(2, "0")}
                </span>
                <div style={{ width: 24, height: 2, background: "#C41E3A", marginBottom: 12 }} />
                <div style={{ fontFamily: MF, fontWeight: 900, fontSize: "0.95rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.3, marginBottom: 5 }}>
                  {leader.name}
                </div>
                <div style={{ fontFamily: MF, fontWeight: 600, fontSize: "0.52rem", color: "#C41E3A", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>
                  {leader.role}
                </div>
                <p style={{ fontFamily: MF, fontSize: "0.71rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>
                  {leader.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div data-animate-page style={{ background: "#ffffff", fontFamily: "'Montserrat', sans-serif" }}>

      {/* ─── OUR STORY — Image Hero ──────────────────────────── */}
      <section style={{ position: "relative", height: "68vh", overflow: "hidden", background: "#111" }}>
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop"
          alt="MECPL — Our Story"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center",
        }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.35em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
            About MECPL
          </span>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)", color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 0.95, margin: 0, textTransform: "uppercase" }}>
            Our Story
          </h1>
        </div>
        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><rect x="1" y="1" width="10" height="18" rx="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/><rect x="5" y="4" width="2" height="5" rx="1" fill="rgba(255,255,255,0.45)"/></svg>
        </div>
      </section>

      {/* ─── STORY INTRO + PHOTO COLLAGE ─────────────────────── */}
      <section id="abt1" style={{ background: "#ffffff", padding: "90px 56px 0", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>

          {/* ① Our Story text — heading left, body text right */}
          <RevealBlock>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 72, alignItems: "start", paddingBottom: 72 }}>
              {/* Left: heading only */}
              <div>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
                  Our Story
                </span>
                <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "#111", letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0, textTransform: "uppercase" }}>
                  Driven By<br />Quality And<br />Excellence<br />Since 1999
                </h2>
              </div>
              {/* Right: both paragraphs */}
              <div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "1.05rem", color: "#1a1a1a", lineHeight: 1.85, margin: "0 0 22px", fontWeight: 500 }}>
                  Millennium Engineers &amp; Contractors Pvt. Ltd. headquartered in Pune, is renowned for its client-focused, quality-driven approach to construction. By embracing the latest technology and innovation, the company has earned a strong reputation in Pune's construction industry.
                </p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.93rem", color: "#666", lineHeight: 1.9, margin: 0 }}>
                  With a team of civil engineering experts, they have successfully completed large-scale projects. The company holds ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications, ensuring quality, safety, and eco-friendliness. Since 2007, Millennium Engineers &amp; Contractors Pvt. Ltd. has maintained a CRISIL rating of SME 1. Our core values of Quality, Consistency, Compliance, Safety, and Environmental Protection remain unchanged.
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* ② Image mosaic — below text */}
          <RevealBlock delay={100}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridTemplateRows: "220px 220px",
              gap: 8,
              marginBottom: 0,
            }}>
              {/* Col 1 — tall portrait, rows 1-2 */}
              <div style={{ gridColumn: "1", gridRow: "1 / 3", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=700&auto=format&fit=crop" alt="MECPL engineers" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* Col 2 top — short landscape */}
              <div style={{ gridColumn: "2", gridRow: "1", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=700&auto=format&fit=crop" alt="Construction" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* Col 3 — tall portrait, rows 1-2 */}
              <div style={{ gridColumn: "3", gridRow: "1 / 3", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=700&auto=format&fit=crop" alt="Engineering" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* Col 4 — tall portrait, rows 1-2 */}
              <div style={{ gridColumn: "4", gridRow: "1 / 3", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=700&auto=format&fit=crop" alt="Architecture" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* Col 2 bottom — short landscape */}
              <div style={{ gridColumn: "2", gridRow: "2", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=700&auto=format&fit=crop" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </RevealBlock>

          {/* ③ Stats row — full width at bottom */}
          <RevealBlock delay={180}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: "44px 32px",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  textAlign: "center",
                }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 3.5vw, 3rem)", color: "#C41E3A", lineHeight: 1, marginBottom: 10 }}>{s.val}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.2em", color: "#888", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>


      {/* ─── LEADERSHIP — Door Slider ──────────────────────────── */}
      <LeadershipDoorSlider />

      {/* ─── ALTERNATING IMAGE / TEXT ────────────────────────── */}
      <AlternatingSection />

      {/* ─── OUR VISION / MISSION / VALUES ──────────────────────── */}
      <section style={{ background: "#ffffff", padding: "100px 56px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
                What Drives Us
              </span>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#111", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
                Our Vision, Mission &amp; Values
              </h2>
            </div>
          </RevealBlock>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {/* Vision */}
            <RevealBlock delay={0}>
              <div style={{ padding: "52px 44px", background: "#f8f8f8", height: "100%" }}>
                <div style={{ width: 36, height: 2, background: "#C41E3A", marginBottom: 28 }} />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 18 }}>
                  Our Vision
                </span>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#111", letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 20px" }}>
                  Building a Better Tomorrow
                </h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "#555", lineHeight: 1.9, margin: 0 }}>
                  To be the most trusted and innovative construction company in India — delivering landmark projects that stand as a testament to engineering excellence, sustainable practices, and long-term client partnerships.
                </p>
              </div>
            </RevealBlock>
            {/* Mission */}
            <RevealBlock delay={100}>
              <div style={{ padding: "52px 44px", background: "#C41E3A", height: "100%" }}>
                <div style={{ width: 36, height: 2, background: "rgba(255,255,255,0.5)", marginBottom: 28 }} />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.28em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", display: "block", marginBottom: 18 }}>
                  Our Mission
                </span>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 20px" }}>
                  Delivering Quality Without Compromise
                </h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, margin: 0 }}>
                  To execute every project with the highest standards of quality, safety, and efficiency — leveraging cutting-edge technology and a skilled workforce to meet client expectations on time, every time.
                </p>
              </div>
            </RevealBlock>
            {/* Values */}
            <RevealBlock delay={200}>
              <div style={{ padding: "52px 44px", background: "#111", height: "100%" }}>
                <div style={{ width: 36, height: 2, background: "#C41E3A", marginBottom: 28 }} />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: 18 }}>
                  Our Values
                </span>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 20px" }}>
                  Principles That Never Waver
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Quality", "Consistency", "Compliance", "Safety", "Environmental Protection"].map((v) => (
                    <div key={v} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C41E3A", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: "0.04em" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── CLIENT LOGOS TICKER ─────────────────────────────── */}
      <section style={{ background: "#ffffff", padding: "80px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
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
          <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 0 auto", width: 120, background: "linear-gradient(to right, transparent, #ffffff)", zIndex: 10, left: 0 }} />
          <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 0 auto", width: 120, background: "linear-gradient(to left, transparent, #ffffff)", zIndex: 10 }} />
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

      {/* ─── CTA — "LET'S BUILD TOGETHER" red banner ─────────── */}
      <section style={{
        background: "linear-gradient(135deg, #8B1020 0%, #C41E3A 60%, #a01828 100%)",
        padding: "72px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle texture overlay */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 120% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 36px",
          }}>
            Trusted By 100+<br />Enterprise Clients
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                border: "1.5px solid rgba(255,255,255,0.7)", color: "#fff",
                padding: "15px 36px",
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
                background: "transparent",
              }}>
                Contact MECPL <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/projects">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                border: "1.5px solid rgba(255,255,255,0.7)", color: "#fff",
                padding: "15px 36px",
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
                background: "transparent",
              }}>
                View Projects <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
