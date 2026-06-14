import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

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

// ─── BEFORE/AFTER WIPE COMPARISON (Vision / Mission / Values) ────────────────
const altRows = [
  {
    label: "Our Vision",
    heading: "India's Most Preferred\nCivil Contractor",
    text: "MECPL aspires to become the most preferred civil engineering contractor. We commit ourselves to delight our clients by surpassing their expectations while consistently meeting compliance obligations in an extremely safe and eco-friendly manner.",
    beforeImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop",
    afterImg:  "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop",
  },
  {
    label: "Our Mission",
    heading: "Quality. Delivery.\nContinuous Improvement.",
    text: "Our commitment is to provide quality construction, ensure timely completion, and deliver exceptional post-project services, all while prioritising safety, health, and environmental considerations through continuous improvement in our people, processes, and technology.",
    beforeImg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1800&auto=format&fit=crop",
    afterImg:  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1800&auto=format&fit=crop",
  },
  {
    label: "Our Values",
    heading: "Safety. Integrity.\nExcellence.",
    text: "Every project we undertake is guided by an uncompromising commitment to safety, ethical practices, and the highest standards of workmanship. We believe that lasting relationships are built on trust, transparency, and the consistent delivery of promises made.",
    beforeImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop",
    afterImg:  "https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=1800&auto=format&fit=crop",
  },
];

function AlternatingSection() {
  return (
    <div>
      {altRows.map((row, i) => (
        <div
          key={i}
          style={{
            position: "sticky",
            top: 80,
            zIndex: i + 1,
            height: "85vh",
            overflow: "hidden",
          }}
        >
          {/* Full-bleed background image */}
          <img
            src={row.beforeImg}
            alt={row.label}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Dark gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.10) 100%)",
            zIndex: 1,
          }} />

          {/* Text — bottom-left */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            padding: "52px 72px",
            zIndex: 2,
            maxWidth: 680,
          }}>
            <span style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.3em", color: "#C41E3A",
              textTransform: "uppercase", display: "block", marginBottom: 16,
            }}>
              {row.label}
            </span>
            <h2 style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 20px",
              whiteSpace: "pre-line",
            }}>
              {row.heading}
            </h2>
            <div style={{ width: 40, height: 3, background: "#C41E3A", marginBottom: 20 }} />
            <p style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.85,
              margin: 0,
              maxWidth: 520,
            }}>
              {row.text}
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

// ─── SPLIT-TEXT LINE-MASK REVEAL (GggpRoB pattern) ───────────────────────────
function SplitReveal({
  children,
  as: Tag = "p",
  style = {},
  className = "",
  stagger = 0.07,
  start = "top 88%",
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let split: any = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = (SplitText as any).create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(instance: any) {
          return gsap.from(instance.lines, {
            yPercent: 110,
            duration: 1,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
            },
          });
        },
      });
    });

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, []);

  const El = Tag as any;
  return (
    <El ref={ref} style={style} className={className}>
      {children}
    </El>
  );
}

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
  const MF = "'Montserrat',sans-serif";

  return (
    <section
      id="abt3"
      style={{ position: "relative", scrollMarginTop: 80, padding: "96px 56px", overflow: "hidden" }}
    >
      {/* ── Dark-to-red radial gradient background ── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 110%, #C41E3A 0%, #6b0010 35%, #1a0004 65%, #070000 100%)" }} />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "260px 1fr", gap: 72, alignItems: "center" }}>

        {/* Left: text block */}
        <div>
          {/* Large quote mark */}
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "#C41E3A",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 32,
          }}>
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              <path d="M0 18V11.25C0 7.5 1.25 4.5 3.75 2.25C6.25 0 9.25 -0.25 12.75 1L11.25 4.25C9.5 3.5 7.875 3.625 6.375 4.625C4.875 5.625 4.125 7.125 4.125 9.125H8.25V18H0ZM13.75 18V11.25C13.75 7.5 15 4.5 17.5 2.25C20 0 23 -0.25 26.5 1L25 4.25C23.25 3.5 21.625 3.625 20.125 4.625C18.625 5.625 17.875 7.125 17.875 9.125H22V18H13.75Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: MF, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
            Our Team
          </span>
          <h2 style={{ fontFamily: MF, fontWeight: 800, fontSize: "1.875rem", color: "#ffffff", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.15, margin: "0 0 20px" }}>
            Meet The Founders of MECPL
          </h2>
          <p style={{ fontFamily: MF, fontSize: "0.8rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, margin: "0 0 28px" }}>
            The visionaries who built Pune's skyline — four decades of engineering excellence, guided by an uncompromising commitment to quality.
          </p>
          <div style={{ width: 36, height: 2, background: "rgba(255,255,255,0.5)" }} />
        </div>

        {/* Right: 4 white floating cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {leaders.map((leader, i) => (
            <div
              key={i}
              style={{
                background: "#f5f5f5",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Portrait photo */}
              <div style={{ position: "relative", aspectRatio: "4/3", background: "#111" }}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
                {/* Red accent badge — outside overflow:hidden so it's visible */}
                <div style={{
                  position: "absolute", bottom: -14, left: 16, zIndex: 4,
                  width: 28, height: 28, borderRadius: "50%",
                  background: "#C41E3A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(196,30,58,0.5)",
                }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M0 8V5C0 3.33 0.56 2 1.67 1C2.78 0 4.11 -0.11 5.67 0.44L5 1.89C4.22 1.56 3.5 1.61 2.83 2.06C2.17 2.5 1.83 3.17 1.83 4.06H3.67V8H0ZM6.11 8V5C6.11 3.33 6.67 2 7.78 1C8.89 0 10.22 -0.11 11.78 0.44L11.11 1.89C10.33 1.56 9.61 1.61 8.94 2.06C8.28 2.5 7.94 3.17 7.94 4.06H9.78V8H6.11Z" fill="white"/>
                  </svg>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "24px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: MF, fontSize: "0.7rem", color: "#555", lineHeight: 1.8, margin: "0 0 16px", flex: 1 }}>
                  {leader.desc.length > 110 ? leader.desc.substring(0, 110) + "…" : leader.desc}
                </p>
                <div>
                  <div style={{ fontFamily: MF, fontWeight: 900, fontSize: "0.78rem", color: "rgb(17,24,39)", textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.3, marginBottom: 3 }}>
                    {leader.name}
                  </div>
                  <div style={{ fontFamily: MF, fontWeight: 600, fontSize: "0.5rem", color: "#C41E3A", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {leader.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 3.2rem)", color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 0.95, margin: 0, textTransform: "uppercase" }}>
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

          {/* ① Centered heading + body with SplitText line-mask reveal */}
          <div style={{ textAlign: "center", paddingBottom: 64 }}>
            <SplitReveal
              as="h2"
              stagger={0.06}
              start="top 85%"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "1.875rem",
                color: "rgb(17,24,39)",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                margin: "0 0 40px",
                lineHeight: 1.3,
              }}
            >
              Driven By Quality And Excellence Since 1999
            </SplitReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, textAlign: "left", maxWidth: 960, margin: "0 auto" }}>
              <SplitReveal
                as="p"
                stagger={0.045}
                start="top 88%"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.95rem", color: "#1a1a1a", lineHeight: 1.85, margin: 0, fontWeight: 500 }}
              >
                Millennium Engineers &amp; Contractors Pvt. Ltd. headquartered in Pune, is renowned for its client-focused, quality-driven approach to construction. By embracing the latest technology and innovation, the company has earned a strong reputation in Pune's construction industry.
              </SplitReveal>
              <SplitReveal
                as="p"
                stagger={0.045}
                start="top 88%"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#666", lineHeight: 1.9, margin: 0 }}
              >
                With a team of civil engineering experts, they have successfully completed large-scale projects. The company holds ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications, ensuring quality, safety, and eco-friendliness. Since 2007, Millennium Engineers &amp; Contractors Pvt. Ltd. has maintained a CRISIL rating of SME 1.
              </SplitReveal>
            </div>
          </div>

          {/* ② Video collage — full width, above stats */}
          <RevealBlock delay={80}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "200px 210px",
              gap: 8,
              marginBottom: 0,
            }}>
              <div style={{ overflow: "hidden" }}>
                <video src={`${assetBase}assets/story-video-1.mov`} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ overflow: "hidden" }}>
                <video src={`${assetBase}assets/story-video-4.mp4`} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ gridRow: "1 / 3", overflow: "hidden" }}>
                <video src={`${assetBase}assets/story-video-2.mov`} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ overflow: "hidden" }}>
                <video src={`${assetBase}assets/story-video-5.mp4`} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ overflow: "hidden" }}>
                <video src={`${assetBase}assets/story-video-3.mov`} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

      {/* ─── WORD SCATTER (giats.me) ─────────────────────────── */}
      <WordScatterSection />

      {/* ─── ALTERNATING IMAGE / TEXT ────────────────────────── */}
      <AlternatingSection />

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
