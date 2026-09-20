import { useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Building,
  Building2,
  Construction,
  DoorOpen,
  Factory,
  Landmark,
  Quote,
} from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const assetBase = import.meta.env.BASE_URL;

const stats = [
  { val: "50+", label: "YEARS OF LEGACY" },
  { val: "30+", label: "COMPLETED PROJECTS" },
  { val: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

const leaders = [
  {
    name: "M. B. Nambiar",
    role: "Founder & Chairman",
    image: `${assetBase}assets/leaders/leader-01.jpg`,
  },
  {
    name: "Jeevan K",
    role: "Managing Director",
    image: `${assetBase}assets/leaders/leader-03.jpg`,
  },
  {
    name: "Manojkumar M R",
    role: "Director - Finance",
    image: `${assetBase}assets/leaders/leader-02.jpg`,
  },
  {
    name: "Jitin Nambiar",
    role: "Executive Director",
    image: `${assetBase}assets/leaders/jitin.png`,
  },
];

const values = [
  { label: "QUALITY", desc: "Doing it right. Every time." },
  { label: "CONSISTENCY", desc: "Reliable execution, project after project." },
  { label: "COMPLIANCE", desc: "Built around standards." },
  { label: "SAFETY", desc: "Protecting people at every stage." },
  { label: "RESPONSIBILITY", desc: "Building with respect for people and the environment." },
];

const sectors = [
  { label: "RESIDENTIAL", Icon: Building2 },
  { label: "COMMERCIAL", Icon: Building },
  { label: "INSTITUTIONAL", Icon: Landmark },
  { label: "INDUSTRIAL", Icon: Factory },
  { label: "INFRASTRUCTURE", Icon: Construction },
  { label: "INTERIORS", Icon: DoorOpen },
];

const awards = [
  { title: "India SME 100 Awards", desc: "Recognised SME Excellence", img: `${assetBase}assets/recognition/india-sme-100-awards.jpeg` },
  { title: "India's Small Giants", desc: "Emerging Enterprises of India", img: `${assetBase}assets/recognition/indias-small-giants.png` },
  { title: "Iconic Brand of The Year 2016", desc: "Brand Recognition", img: `${assetBase}assets/recognition/iconic-brand-2026.png` },
  { title: "ISO Certified Company", desc: "Quality, Environmental & Safety", img: `${assetBase}assets/recognition/iso-mark.png` },
  { title: "CRISIL BBB / Positive", desc: "Financial Rating", img: `${assetBase}assets/recognition/crisil-rating.jpg` },
  { title: "NSCI Safety Awards", desc: "7 Award-Winning Projects", img: `${assetBase}assets/awards/nsci-safety-award-2025.png` },
  { title: "CIDC Vishwakarma Awards", desc: "Construction Health, Safety & Environment", img: `${assetBase}assets/awards/cidc-vishwakarma-award-2026.png` },
  { title: "BAI Well Built Structure Awards", desc: "13 Award-Winning Projects", img: `${assetBase}assets/awards/bai-well-built-structure-award.png` },
  { title: "International Safety Award 2026", desc: "Distinction", img: `${assetBase}assets/awards/british-safety-council-award-2026.jpeg` },
];

const journey = [
  { year: "1975", title: "WHERE IT ALL BEGAN", text: "Shreyas began operations, serving leading industrial clients in Pune and Mumbai. (Cadbury, Venkateshwara Hatcheries and more)" },
  { year: "2000", title: "MECPL TAKES SHAPE", text: "Expanded into residential, commercial, institutional and infrastructure projects. (Aamby Valley, Sahara Lake City)" },
  { year: "2002", title: "BUILDING RELATIONSHIPS THAT LAST", text: "A new wave of projects and repeat clients. (Lavasa, Amtek Auto, Bekaert, Shri Chanakya Education Society)" },
  { year: "2011", title: "TECHNOLOGY THAT MOVED US FORWARD", text: "High-capacity pump, placer booms and tower cranes." },
  { year: "2012", title: "TRUMP TOWERS. PANCHSHIL. A NEW ERA.", text: "Partnerships with leading developers mark a stronger regional presence. (Panchshil, K Raheja Corp., Pride, Malpani, Godrej, Lodha)" },
  { year: "2013", title: "QUALITY GETS RECOGNISED", text: "Birla Super Award for Outstanding Concrete Structures from the Indian Concrete Institute." },
  { year: "2014", title: "PIONEERING ALUFORM. BUILDING FASTER.", text: "First to adopt Aluform technology in residential construction. 32 STOREYS | 11 MONTHS (Panchshil high-rise in Wagholi)." },
  { year: "2017", title: "FROM CONSTRUCTION TO INTERIORS", text: "Launched, expanding into doors and modular furniture solutions." },
  { year: "2018", title: "DOORS: FROM CONSTRUCTION TO INTERIORS", text: "Launched, expanding into doors and modular furniture solutions. (Hofundur — DOORS | MODULAR SOLUTIONS)" },
  { year: "2018", title: "RECOGNITION THAT CONTINUES", text: "Iconic Brand of the Year and continued safety and quality awards." },
  { year: "2026", title: "GLOBAL SAFETY RECOGNITION", text: "British Safety Council International Safety Award – Distinction (2026)." }
];

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }
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

function RevealBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`.trim()}
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

const purposeRows = [
  {
    label: "Our Vision",
    text: "To be the most preferred civil engineering contractor, delivering beyond expectations through safe, compliant and environmentally responsible execution.",
  },
  {
    label: "Our Mission",
    text: "To deliver quality construction, on time and with care — continuously improving our people, processes and technology while putting safety, health and the environment first.",
  },
];

function PurposeSection() {
  return (
    <section
      id="about-purpose"
      data-testid="section-about-purpose"
      className="abt-purpose-section"
      style={{ background: "transparent", color: "#232529", padding: "112px 56px" }}
    >
      <div className="abt-purpose-grid border-t-[#e4e4e6] border-r-[#e4e4e6] border-b-[#e4e4e6] border-l-[#e4e4e6] bg-[color:var(--color-border)]" style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "64px",
        background: "var(--color-border)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 32,
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: "clamp(64px, 9vw, 144px)",
        alignItems: "center",
      }}>
        <img
          className="abt-purpose-image"
          src={`${assetBase}assets/projects/43PD-1-scaled.jpg`}
          alt=""
          aria-hidden="true"
        />

        <div data-scroll-reveal="text" className="abt-purpose-heading">
          <span className="about-label-font font-montserrat text-[15px]" style={{ fontSize: "15px", color: "#EC3338", display: "block", marginBottom: 18 }}>
            OUR PURPOSE
          </span>
          <h2 className="font-montserrat text-[36px]" style={{
            fontSize: "36px",
            fontWeight: 600,
            color: "#232529",
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            margin: 0,
          }}>
            Where We're Going.<br />How We Get There.
          </h2>
        </div>

        <div data-scroll-reveal="text" className="abt-purpose-copy bg-[color:var(--mecpl-card)]" style={{ background: "var(--mecpl-card)", borderTop: "1px solid rgba(17,24,39,0.14)" }}>
          {purposeRows.map((row) => (
            <div
              key={row.label}
              style={{ padding: "24px 0 26px", borderBottom: "1px solid rgba(17,24,39,0.14)" }}
            >
              <h2 className="font-montserrat" style={{
                color: "#232529",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}>
                {row.label}
              </h2>
              <p className="font-inter" style={{
                color: "#949599",
                fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 620,
              }}>
                {row.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 04 — OUR JOURNEY (Horizontal Scroll Timeline) ────────
function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const getScrollWidth = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 1,
          start: "top 80px",
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true,
        },
      });
    }, sec);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section id="our-journey" ref={sectionRef} data-testid="section-about-journey" style={{ background: "#232529", color: "#ffffff", overflow: "hidden", position: "relative", scrollMarginTop: 80 }}>
      <div style={{ padding: "80px 56px 40px", maxWidth: 1360, margin: "0 auto", textAlign: "center" }}>
        <span className="about-label-font font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
          OUR JOURNEY
        </span>
        <h2 className="page-title-font font-montserrat text-[36px]" style={{ fontWeight: 600, fontSize: "36px", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2 }}>
          50+ Years.<br />One Continuing Journey.
        </h2>
        <p className="font-inter" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.85rem", letterSpacing: "0.08em", margin: "18px 0 0", textTransform: "uppercase" }}>
          Milestones that build a stronger tomorrow
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", minHeight: "50vh", padding: "0 56px", overflowX: "auto" }} className="no-scrollbar abt-journey-scroll">
        <div ref={trackRef} className="abt-journey-track" style={{ display: "flex", gap: 64, paddingRight: "50vw", paddingBottom: 80 }}>
          {journey.map((item, i) => (
            <div key={i} style={{ width: 340, flexShrink: 0, position: "relative", paddingTop: 32 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: "rgba(255,255,255,0.15)" }}>
                <div style={{ position: "absolute", top: -5, left: 0, width: 12, height: 12, borderRadius: "50%", background: "#EC3338" }} />
              </div>
              <div className="font-montserrat" style={{ fontSize: "2.5rem", fontWeight: 600, color: "#ffffff", lineHeight: 1, marginBottom: 16 }}>
                {item.year}
              </div>
              <h2 className="font-montserrat" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#EC3338", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 16px", lineHeight: 1.4 }}>
                {item.title}
              </h2>
              <p className="font-inter" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 07 — OUR LEADERSHIP (Door Slider) ──────────────────────
function LeadershipDoorSlider() {
  const MF = "'Montserrat',sans-serif";

  return (
    <section
      id="abt3"
      data-testid="section-about-leadership"
      className="abt-leadership-section"
      style={{ position: "relative", scrollMarginTop: 80, padding: "96px 56px", overflow: "hidden", background: "#f8f9fa" }}
    >
      <div className="abt-leadership-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: 72, alignItems: "center" }}>
        <div data-scroll-reveal="text">
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EC3338", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
            <FaQuoteLeft size={23} color="#ffffff" aria-hidden="true" />
          </div>
          <span className="about-label-font font-montserrat text-[15px]" style={{ fontFamily: MF, fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
            OUR LEADERSHIP
          </span>
          <h2 className="page-title-font font-montserrat" style={{ fontFamily: MF, fontWeight: 600, fontSize: "36px", color: "rgb(17,24,39)", letterSpacing: "-0.01em", lineHeight: 1.15, margin: "0 0 20px" }}>
            The People Building What's Next.
          </h2>
          <p className="font-inter" style={{ fontSize: "0.8rem", color: "#949599", lineHeight: 1.85, margin: "0 0 28px" }}>
            Guided by experience. Driven by purpose.
          </p>
          <p className="font-montserrat" style={{ fontSize: "0.62rem", color: "#949599", lineHeight: 1.9, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 28px" }}>
            Experience · Leadership · Continuity · A Stronger Tomorrow
          </p>
          <div style={{ width: 36, height: 2, background: "rgba(0,0,0,0.15)" }} />
        </div>

        <div className="abt-leadership-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {leaders.map((leader, i) => (
            <div
              key={i}
              data-scroll-reveal="image"
              data-scroll-reveal-delay={String(i * 90)}
              style={{
                background: "#EC3338",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(196,30,58,0.25)",
                display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "4/3", background: "#232529" }}>
                <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                <div style={{ position: "absolute", bottom: -14, left: 16, zIndex: 4, width: 28, height: 28, borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M0 8V5C0 3.33 0.56 2 1.67 1C2.78 0 4.11 -0.11 5.67 0.44L5 1.89C4.22 1.56 3.5 1.61 2.83 2.06C2.17 2.5 1.83 3.17 1.83 4.06H3.67V8H0ZM6.11 8V5C6.11 3.33 6.67 2 7.78 1C8.89 0 10.22 -0.11 11.78 0.44L11.11 1.89C10.33 1.56 9.61 1.61 8.94 2.06C8.28 2.5 7.94 3.17 7.94 4.06H9.78V8H6.11Z" fill="#EC3338"/>
                  </svg>
                </div>
              </div>

              <div style={{ padding: "24px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div className="font-montserrat" style={{ fontWeight: 600, fontSize: "0.78rem", color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.3, marginBottom: 6 }}>
                  {leader.name}
                </div>
                <div className="font-montserrat" style={{ fontWeight: 600, fontSize: "0.5rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {leader.role}
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
    <div data-animate-page className="about-page font-inter" style={{ background: "#ffffff", color: "#232529" }}>
      {/* ─── 01 — OUR STORY (Hero) ───────────────────────────── */}
      <section
        data-testid="section-about-story"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#232529",
          backgroundImage: `url(${assetBase}assets/services-crane-background.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.64)_0%,rgba(6,10,16,0.44)_48%,rgba(6,10,16,0.24)_100%)]" />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center",
        }}>
          <span className="about-label-font font-montserrat" style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 16 }}>
            Our Story
          </span>
          <h1 className="hp-banner-title page-title-font font-montserrat" style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
            <div className="hp-banner-line" style={{
              fontSize: "36px",
              fontWeight: 500,
              lineHeight: 1.15, color: "#ffffff",
            }}>
              50+ YEARS OF<br/>BUILDING WHAT LASTS.
            </div>
          </h1>
          <h2 className="font-montserrat" style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            margin: "0 0 12px",
          }}>
            People. Partnerships. Progress.
          </h2>
          <p className="page-subtitle-font font-montserrat" style={{
            fontSize: "12px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 600,
            padding: "0 24px",
          }}>
            From industrial foundations in Pune to landmark developments across Maharashtra, MECPL has grown through capability, technology and an unwavering commitment to quality.
          </p>
          <a
            href="#our-journey"
            className="mt-7 inline-flex items-center gap-3 border border-mecpl-red bg-mecpl-red px-6 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-transparent"
          >
            Watch Our Story <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
      {/* ─── 02 — OUR VALUES ─────────────────────────────────── */}
      <section data-testid="section-about-values" className="abt-values-section bg-[transparent]" style={{ padding: "90px 56px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ marginBottom: 64, textAlign: "center" }}>
              <span className="font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                OUR VALUES
              </span>
              <h2 className="font-montserrat font-medium" style={{ fontWeight: 600, fontSize: "36px", color: "#232529", letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1.1 }}>
                What We Build On.
              </h2>
              <p className="font-inter" style={{ fontSize: "0.95rem", color: "#949599", maxWidth: 500, margin: "0 auto" }}>
                Guiding every project. Shaping a stronger tomorrow.
              </p>
            </div>
          </RevealBlock>

          <div className="abt-values-grid">
            {values.map((v, i) => (
              <RevealBlock key={i} delay={i * 100} className="abt-value-item">
                <div className="abt-value-card">
                  <div className="font-montserrat" style={{ fontSize: "0.55rem", fontWeight: 500, color: "#949599", letterSpacing: "0.08em", marginBottom: 40 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-montserrat" style={{ fontSize: "1.25rem", fontWeight: 600, color: "#EC3338", marginBottom: 16, letterSpacing: "0.02em" }}>
                    {v.label}
                  </div>
                  <p className="font-inter" style={{ fontSize: "0.85rem", color: "#949599", lineHeight: 1.7, margin: 0 }}>
                    {v.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>
      {/* ─── 03 — OUR PURPOSE ────────────────────────────────── */}
      <PurposeSection />
      {/* ─── 04 — OUR JOURNEY ────────────────────────────────── */}
      <JourneyTimeline />
      {/* ─── 05 — AWARDS & CERTIFICATIONS ────────────────────── */}
      <section id="certifications" data-testid="section-about-awards" className="abt-awards-section scroll-mt-20" style={{ background: "#ffffff", padding: "96px 56px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ marginBottom: 64, textAlign: "center" }}>
              <span className="font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                AWARDS & CERTIFICATIONS
              </span>
              <h2 className="font-montserrat" style={{ fontWeight: 600, fontSize: "36px", color: "#232529", letterSpacing: "-0.02em", margin: "0 auto", lineHeight: 1.1, maxWidth: 600 }}>
                Recognised for a Higher Standard.
              </h2>
            </div>
          </RevealBlock>

          <div className="abt-awards-grid">
            {awards.map((award, i) => (
              <RevealBlock key={i} delay={i * 50} className="abt-awards-item">
                <div
                  style={{ background: "#ffffff", padding: "32px 24px", height: "100%", display: "flex", flexDirection: "column", border: "1px solid rgba(35,37,41,0.08)", textAlign: "center", alignItems: "center" }}
                  className="bg-[color:var(--color-border)]">
                  {award.img && (
                    <div style={{ marginBottom: 18, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={award.img} alt={award.title} style={{ maxHeight: "100%", maxWidth: 140, objectFit: "contain" }} />
                    </div>
                  )}
                  <h2 className="font-montserrat" style={{ fontSize: "10px", fontWeight: 500, color: "#45484d", lineHeight: 1.4, margin: 0 }}>
                    {award.title}
                  </h2>
                  <p className="font-montserrat" style={{ fontSize: "8px", fontWeight: 400, color: "#8a8d91", lineHeight: 1.45, margin: "4px 0 0" }}>
                    {award.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>
      {/* ─── 06 — OUR FOUNDER ────────────────────────────────── */}
      <section data-testid="section-about-founder" className="abt-founder-section" style={{ background: "#232529", color: "#ffffff", padding: "96px 56px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="abt-story-cols">
          <RevealBlock delay={0}>
            <div style={{ position: "relative", aspectRatio: "3/4" }}>
              <img src={`${assetBase}assets/leaders/leader-01.jpg`} alt="M. B. Nambiar" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) contrast(1.1)" }} />
              <div style={{ position: "absolute", bottom: -20, right: -20, background: "#EC3338", padding: "32px", color: "#fff" }}>
                <Quote size={32} />
              </div>
            </div>
          </RevealBlock>
          <RevealBlock delay={100}>
            <div style={{ textAlign: "center" }}>
              <span className="font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                OUR FOUNDER
              </span>
              <h2 className="font-montserrat" style={{ fontWeight: 600, fontSize: "36px", letterSpacing: "-0.02em", margin: "0 0 32px", lineHeight: 1.1 }}>
                A Vision That Built Generations.
              </h2>
              <div className="font-montserrat" style={{ fontSize: "1.2rem", fontWeight: 600, color: "#EC3338", marginBottom: 8 }}>
                M. B. Nambiar
              </div>
              <div className="font-montserrat" style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                Founder & Chairman
              </div>
              <p className="font-inter" style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 40 }}>
                What began with a belief in disciplined execution grew into a construction enterprise built on relationships, technology and trust. His vision continues to inspire everything we build.
              </p>
              <div style={{ borderTop: "2px solid #EC3338", paddingTop: 24, maxWidth: 420, margin: "0 auto" }}>
                <p className="font-montserrat" style={{ fontSize: "1.1rem", fontWeight: 500, fontStyle: "italic", lineHeight: 1.6, color: "#ffffff", margin: 0 }}>
                  "Build with integrity.<br/>Create lasting value.<br/>Leave a better tomorrow."
                </p>
                <span className="font-montserrat" style={{ display: "block", marginTop: 16, color: "rgba(255,255,255,0.55)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  M. B. Nambiar
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ─── 07 — OUR LEADERSHIP ─────────────────────────────── */}
      <LeadershipDoorSlider />
      {/* ─── 08 — TODAY, WE BUILD ACROSS ─────────────────────── */}
      <section data-testid="section-about-sectors" className="abt-sectors-section" style={{ background: "#ffffff", padding: "96px 56px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                TODAY, WE BUILD ACROSS
              </span>
              <h2 className="font-montserrat" style={{ fontWeight: 600, fontSize: "36px", color: "#232529", letterSpacing: "-0.02em", margin: "0", lineHeight: 1.1 }}>
                Diverse Spaces.<br/>A Stronger India.
              </h2>
            </div>
          </RevealBlock>

          <RevealBlock delay={100}>
            <div className="abt-sectors-list" style={{ marginBottom: 80 }}>
              {sectors.map(({ label, Icon }) => (
                <div key={label} className="font-montserrat" style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#EC3338",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                }}>
                  <Icon size={30} strokeWidth={1.5} color="#949599" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={150}>
            <div className="abt-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              {stats.map((s, i) => (
                <div key={s.label} className="abt-stat-item font-montserrat" style={{
                  padding: "44px 32px",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  textAlign: "center",
                }}>
                  <div style={{ fontWeight: 600, fontSize: "clamp(2.2rem, 3.5vw, 3rem)", color: "#232529", lineHeight: 1, marginBottom: 10 }}>{s.val}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#949599" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ─── 09 — THE JOURNEY CONTINUES (CTA) ────────────────── */}
      <section data-testid="section-about-continuation" className="abt-cta-section" style={{
        background: "#EC3338",
        padding: "96px 40px 120px",
        position: "relative",
        overflow: "hidden",
      }}>
         <div data-scroll-reveal="text" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="font-montserrat text-[color:var(--mecpl-red)]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 24 }}>
            THE JOURNEY CONTINUES
          </span>
          <h2 className="font-montserrat" style={{
            fontWeight: 600,
            fontSize: "36px",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 24px",
          }}>
            Same Purpose.<br/>Greater Possibilities.
          </h2>
          <p className="font-inter" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.9)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
            From the foundations we laid in 1975 to what we build next — the purpose remains the same: to build better, safer and stronger.
          </p>
          <p className="font-montserrat" style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", margin: "-24px auto 40px" }}>
            People · Places · Progress
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" data-testid="link-about-contact">
              <span className="font-montserrat" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                border: "1.5px solid #EC3338", color: "#ffffff",
                padding: "15px 36px",
                fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
                background: "#EC3338",
              }}>
                Contact MECPL <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/projects" data-testid="link-about-projects">
              <span className="font-montserrat" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                border: "1.5px solid rgba(255,255,255,0.85)", color: "#ffffff",
                padding: "15px 36px",
                fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase",
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
