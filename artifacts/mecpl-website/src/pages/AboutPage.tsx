import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  X,
} from "lucide-react";

const assetBase = import.meta.env.BASE_URL;

const stats = [
  { val: "45+", label: "YEARS OF LEGACY" },
  { val: "30+", label: "COMPLETED PROJECTS" },
  { val: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

type LeadershipMember = {
  name: string;
  role: string;
  image: string;
  summary: string;
  details: string[];
  quote: string;
};

const leaders: LeadershipMember[] = [
  {
    name: "Jeevan K",
    role: "Managing Director",
    image: `${assetBase}assets/leaders/leader-03.jpg`,
    summary: "Building scale. Strengthening standards. Driving performance.",
    details: [
      "A civil engineer who joined the Shreyas group in 1987, Jeevan K. has been part of MECPL's leadership since its formation in 1999 and has served as Managing Director for more than two decades.",
      "Under his leadership, MECPL has grown into a reputed construction company with annual turnover exceeding ₹400 crore and a workforce of approximately 1,000 permanent employees and over 8,000 workers across various categories.",
      "His leadership continues to strengthen the company's focus on quality, safety and environmental sustainability, reflected in its ISO Certifications.",
    ],
    quote: "Building scale. Strengthening standards. Driving performance.",
  },
  {
    name: "Manojkumar M. R.",
    role: "Director – Finance",
    image: `${assetBase}assets/leaders/leader-02.jpg`,
    summary: "Financial discipline. Commercial insight. Long-term stability.",
    details: [
      "Manojkumar M. R. has been part of the MECPL journey since 1993, when he joined Shreyas Constructions as a Purchase Officer. With the establishment of MECPL in 1999, he joined the Board and has since played an integral role in finance, commercial management and business operations.",
      "As Director – Finance, he has been instrumental in strengthening the company's financial planning, commercial discipline and management systems, supporting its growth while maintaining a strong financial foundation.",
      "His contribution has also played an important role in MECPL's financial credibility, including its CRISIL BBB–Stable rating, as the company continues to undertake large-scale projects for reputed corporate clients.",
    ],
    quote: "Financial discipline. Commercial insight. Long-term stability.",
  },
  {
    name: "Jitin Nambiar",
    role: "Director – Human Resources | Founder – Hofundur",
    image: `${assetBase}assets/leaders/jitin.png`,
    summary: "Building businesses. Enabling people. Driving transformation.",
    details: [
      "Jitin Nambiar brings together business strategy, brand building and people leadership across MECPL.",
      "As the Founder of Hofundur, he heads the interiors division, extending MECPL's construction expertise into BIS-certified B2B doors and modular furniture solutions. His role also spans business growth, brand development and customer-focused initiatives.",
      "As Director – Human Resources, Jitin is driving a more people- and performance-focused organisation through stronger recognition systems, digitalisation and technology-led employee initiatives, including ERP and Zoho adoption.",
    ],
    quote: "Building businesses. Enabling people. Driving transformation.",
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
  "RESIDENTIAL",
  "COMMERCIAL",
  "INSTITUTIONAL",
  "INDUSTRIAL",
  "INFRASTRUCTURE",
  "INTERIORS",
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
    label: "OUR VISION",
    text: "To be the most preferred civil engineering contractor, delivering beyond expectations through safe, compliant and environmentally responsible execution.",
  },
  {
    label: "OUR MISSION",
    text: "To deliver quality construction, on time and with care — continually improving our people, processes and technology while putting safety, health and the environment first.",
    highlights: "QUALITY · PEOPLE · PROCESS",
  },
];

function PurposeSection() {
  return (
    <section
      id="about-purpose"
      data-testid="section-about-purpose"
      className="abt-purpose-section purpose-reference purpose-ref-section"
      style={{ scrollMarginTop: 80 }}
      aria-labelledby="purpose-title"
    >
      <span className="purpose-ref-watermark" aria-hidden="true" />
      <div className="purpose-ref-content">
        <header className="purpose-ref-header">
          <span className="purpose-ref-kicker about-label-font font-montserrat">OUR PURPOSE</span>
          <h2 className="purpose-ref-title" id="purpose-title">
            Where We&apos;re Going. How We Get There.
          </h2>
        </header>

        <div className="purpose-ref-cards">
          {purposeRows.map((row, index) => (
            <article
              className={`purpose-ref-card${index === 1 ? " purpose-ref-card-dark" : ""}`}
              key={row.label}
            >
              <div className="purpose-ref-copy">
                <h3>{row.label}</h3>
                <p className="text-[16px]">{row.text}</p>
                {row.highlights && (
                  <span className="purpose-ref-highlights">{row.highlights}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 04 — OUR JOURNEY (Timeline Carousel) ─────────────────
function JourneyTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    let scrollFrame: number | null = null;

    const updateActiveSlide = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = null;
        const inset = Number.parseFloat(window.getComputedStyle(scroller).paddingLeft) || 0;
        const target = scroller.getBoundingClientRect().left + scroller.clientLeft + inset;
        const slides = Array.from(track.children) as HTMLElement[];
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const distance = Math.abs(slide.getBoundingClientRect().left - target);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
      });
    };

    scroller.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", updateActiveSlide);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  const navigateTo = (index: number) => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    const slide = track?.children.item(index) as HTMLElement | null;
    if (!scroller || !slide) return;

    const inset = Number.parseFloat(window.getComputedStyle(scroller).paddingLeft) || 0;
    const left = scroller.scrollLeft
      + slide.getBoundingClientRect().left
      - scroller.getBoundingClientRect().left
      - inset;
    scroller.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="our-journey"
      data-testid="section-about-journey"
      className="abt-journey-section"
      style={{ scrollMarginTop: 80 }}
    >
      <div
        className="abt-journey-backdrop"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.89), rgba(255, 255, 255, 0.89)), url(${assetBase}assets/people-safety/23_1790178654345.jpg)`,
        }}
      />
      <header className="abt-journey-header">
        <span className="about-label-font font-montserrat abt-journey-eyebrow">
          OUR JOURNEY
        </span>
        <h2 className="page-title-font font-montserrat abt-journey-title">
          45+ YEARS. ONE CONTINUING JOURNEY.
        </h2>
        <p className="font-montserrat abt-journey-subtitle text-[16px]">
          Milestones that build a stronger tomorrow
        </p>
      </header>
      <div className="abt-journey-stage">
        <nav className="abt-journey-controls" aria-label="Journey carousel controls">
          <button
            type="button"
            className="abt-journey-arrow"
            aria-label="Previous milestone"
            onClick={() => navigateTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
          >
            <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="abt-journey-arrow"
            aria-label="Next milestone"
            onClick={() => navigateTo(Math.min(journey.length - 1, activeIndex + 1))}
            disabled={activeIndex === journey.length - 1}
          >
            <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </nav>
        <div
          ref={scrollRef}
          className="no-scrollbar abt-journey-scroll"
          role="region"
          aria-label="Journey milestones"
        >
          <div ref={trackRef} className="abt-journey-track">
            {journey.map((item, index) => (
              <article
                key={`${item.year}-${index}`}
                className={`abt-journey-card${activeIndex === index ? " is-active" : ""}`}
                aria-label={`${item.year}: ${item.title}`}
              >
                <div className="abt-journey-rail" aria-hidden="true">
                  <span />
                </div>
                <div className="abt-journey-year">
                  {item.year}
                </div>
                <h3 className="abt-journey-card-title">
                  {item.title}
                </h3>
                <p className="abt-journey-copy text-[16px]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 07 — OUR LEADERSHIP ─────────────────────────────────────
function LeadershipDoorSlider() {
  const [selectedLeader, setSelectedLeader] = useState<LeadershipMember | null>(null);

  useEffect(() => {
    if (!selectedLeader) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedLeader(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLeader]);

  return (
    <section
      id="abt3"
      data-testid="section-about-leadership"
      className="abt-leadership-section"
      style={{
        position: "relative",
        scrollMarginTop: 80,
        padding: "96px 120px",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div className="abt-leadership-grid" style={{ position: "relative", zIndex: 1, width: "100%", margin: 0, display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: 72, alignItems: "center" }}>
        <div data-scroll-reveal="text">
          <span className="about-label-font font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
            OUR LEADERSHIP
          </span>
          <h2 className="page-title-font font-montserrat" style={{ fontWeight: 600, fontSize: "36px", color: "rgb(17,24,39)", letterSpacing: "-0.01em", lineHeight: 1.15, margin: "0 0 20px" }}>
            Built on Experience. Driven by the Future.
          </h2>
          <p className="font-montserrat text-[16px]" style={{ fontSize: "0.8rem", color: "#949599", lineHeight: 1.85, margin: "0 0 28px" }}>
            For over five decades, MECPL has been shaped by leaders who combine deep industry experience with a forward-looking approach to construction, people and business.
          </p>
          <div style={{ width: 36, height: 2, background: "rgba(0,0,0,0.15)" }} />
        </div>

        <div className="abt-leadership-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18 }}>
          {leaders.map((leader, i) => (
            <button
              key={leader.name}
              type="button"
              className="abt-leadership-card"
              data-scroll-reveal="image"
              data-scroll-reveal-delay={String(i * 90)}
              aria-label={`View profile of ${leader.name}`}
              aria-haspopup="dialog"
              onClick={() => setSelectedLeader(leader)}
            >
              <div className="abt-leadership-card-image">
                <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                <span className="abt-leadership-image-shade" aria-hidden="true" />
                <span className="abt-leadership-open-icon" aria-hidden="true">
                  <span aria-hidden="true" style={{ fontSize: 24, fontWeight: 300, lineHeight: 1, marginTop: -2 }}>+</span>
                </span>
              </div>

              <div className="abt-leadership-card-copy">
                <div className="abt-leadership-card-name font-montserrat">
                  {leader.name}
                </div>
                <div className="abt-leadership-card-role font-montserrat text-[16px]">
                  {leader.role}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selectedLeader && (
        <div
          role="presentation"
          onClick={() => setSelectedLeader(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(12,16,22,0.78)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            className="abt-leadership-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leadership-modal-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(820px, 100%)",
              maxHeight: "calc(100vh - 48px)",
              display: "grid",
              gridTemplateColumns: "minmax(230px, 0.78fr) minmax(0, 1.22fr)",
              background: "#17191c",
              boxShadow: "0 28px 80px rgba(0,0,0,0.35)",
              overflow: "auto",
            }}
          >
            <div style={{ minHeight: 420, background: "#dfe2e5" }}>
              <img src={selectedLeader.image} alt={selectedLeader.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
            </div>
            <div style={{ padding: "42px 42px 36px" }}>
              <button
                type="button"
                aria-label="Close profile"
                onClick={() => setSelectedLeader(null)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: 0,
                  background: "transparent",
                  color: "#c4c7cc",
                  cursor: "pointer",
                }}
              >
                <X size={17} aria-hidden="true" />
              </button>
              <span className="about-label-font font-montserrat" style={{ fontSize: "0.58rem", color: "#EC3338", letterSpacing: "0.22em", marginBottom: 14, display: "block" }}>
                OUR LEADERSHIP
              </span>
              <h3 id="leadership-modal-title" className="font-montserrat" style={{ margin: "0 0 8px", color: "#ffffff", fontSize: "1.65rem", fontWeight: 600, lineHeight: 1.2 }}>
                {selectedLeader.name}
              </h3>
              <div className="font-montserrat" style={{ marginBottom: 24, color: "#c4c7cc", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.14em", lineHeight: 1.5, textTransform: "uppercase" }}>
                {selectedLeader.role}
              </div>
              <div style={{ display: "grid", gap: 14 }}>
                {selectedLeader.details.map((detail) => (
                  <p key={detail} className="font-montserrat" style={{ margin: 0, color: "#e1e3e6", fontSize: "0.82rem", lineHeight: 1.75 }}>
                    {detail}
                  </p>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingLeft: 16, borderLeft: "3px solid #EC3338" }}>
                <p className="font-montserrat" style={{ margin: 0, color: "#EC3338", fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.6 }}>
                  {selectedLeader.quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function AboutPage() {
  return (
    <div data-animate-page className="about-page font-montserrat" style={{ background: "#ffffff", color: "#232529" }}>
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.74)_0%,rgba(6,10,16,0.58)_48%,rgba(6,10,16,0.42)_100%)]" />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center",
        }}>
          <span className="about-hero-label font-montserrat" style={{ fontSize: "clamp(11px, 2.75vw, 15px)", fontWeight: 600, letterSpacing: "clamp(0.05em, 0.18vw, 0.18em)", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 16, textTransform: "uppercase" }}>
            Our Story
          </span>
          <h1 className="about-hero-title hp-banner-title page-title-font font-montserrat" style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
            <div className="hp-banner-line" style={{
              fontSize: "26px",
              fontWeight: 500,
              lineHeight: 1.15, color: "#ffffff",
            }}>
              45+ YEARS OF<br/>BUILDING WHAT LASTS.
            </div>
          </h1>
          <h2 className="about-hero-tagline font-montserrat" style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "normal",
            lineHeight: 1.7,
            margin: "0 0 12px",
          }}>
            People. Partnerships. Progress.
          </h2>
          <p className="about-hero-description page-subtitle-font font-montserrat text-[16px]" style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 600,
            padding: "0 24px",
          }}>
            From industrial foundations in Pune to landmark developments across Maharashtra, MECPL has grown through capability, technology and an unwavering commitment to quality.
          </p>
          <a
            href="#our-journey"
            className="mt-7 inline-flex items-center gap-3 border border-mecpl-red bg-mecpl-red px-6 py-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-transparent"
          >
            Watch Our Story <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
      {/* ─── 02 — OUR VALUES ─────────────────────────────────── */}
      <section data-testid="section-about-values" className="abt-values-section">
        <div className="abt-values-band">
          <div className="abt-values-content">
            <RevealBlock className="abt-values-heading-wrap">
              <div className="abt-values-heading">
                <span className="abt-values-kicker font-montserrat">
                  OUR VALUES
                </span>
                <h2 className="abt-values-title font-montserrat">
                  What We Build On.
                </h2>
                <p className="abt-values-subtitle font-montserrat text-[16px]">
                  Guiding every project. Shaping a stronger tomorrow.
                </p>
              </div>
            </RevealBlock>
            <div className="abt-values-grid" role="region" aria-label="Our values" tabIndex={0}>
              {values.map((v, i) => (
                <RevealBlock key={v.label} delay={i * 100} className="abt-value-item">
                  <div className="abt-value-card">
                    <div className="abt-value-label font-montserrat">
                      {v.label}
                    </div>
                    <p className="abt-value-desc font-montserrat text-[16px]">
                      {v.desc}
                    </p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ─── 03 — OUR PURPOSE ────────────────────────────────── */}
      <PurposeSection />
      {/* ─── 04 — OUR JOURNEY ────────────────────────────────── */}
      <JourneyTimeline />
      {/* ─── 05 — OUR FOUNDER ────────────────────────────────── */}
      <section data-testid="section-about-founder" className="abt-founder-section">
        <div className="abt-founder-grid">
          <RevealBlock delay={0}>
            <div className="abt-founder-photo">
              <img
                className="abt-founder-image"
                src={`${assetBase}assets/leaders/leader-01.jpg`}
                alt="M. B. Nambiar"
              />
              <div className="abt-founder-quote-badge" aria-hidden="true">
                <Quote size={24} />
              </div>
            </div>
          </RevealBlock>
          <RevealBlock delay={100}>
            <div className="abt-founder-copy">
              <span className="font-montserrat abt-founder-kicker">
                OUR FOUNDER
              </span>
              <h2 className="font-montserrat abt-founder-title">
                A Vision That Built Generations.
              </h2>
              <div className="abt-founder-identity">
                <span className="font-montserrat abt-founder-name">
                  M. B. Nambiar
                </span>
                <span className="font-montserrat abt-founder-role">
                  Founder & Promoter
                </span>
              </div>
              <div className="font-montserrat abt-founder-bio text-[16px]">
                <p>
                  A civil engineer with over six decades of experience, M. B. Nambiar began his professional journey in 1964 and went on to establish Shreyas Constructions, laying the foundation for what would become the Millennium Engineers group.
                </p>
                <p>
                  Since the establishment of MECPL in 1999, his vision and entrepreneurial leadership have shaped the company&apos;s growth, reputation and enduring commitment to quality, safety and professional excellence.
                </p>
                <p>
                  His contribution to the construction industry has been recognised with the Nirman Ratna Lifetime Achievement Award by the Builders Association of India and the AES Lifetime Achievement Award in 2022, presented by the Architects, Engineers and Surveyors Association (AESA), Pune.
                </p>
              </div>
              <div className="abt-founder-quote">
                <div className="abt-founder-quote-copy">
                  <p className="font-montserrat">
                    A legacy built on experience. A culture built to endure.
                  </p>
                  <span className="font-montserrat">M. B. Nambiar</span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ─── 06 — OUR LEADERSHIP ─────────────────────────────── */}
      <LeadershipDoorSlider />
      {/* ─── 07 — AWARDS & CERTIFICATIONS ────────────────────── */}
      <section id="certifications" data-testid="section-about-awards" className="abt-awards-section scroll-mt-20" style={{ background: "#ffffff", padding: "24px 56px 96px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ marginBottom: 64, textAlign: "center" }}>
              <span className="about-label-font font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
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
                    <div className="recognition-mark-frame" style={{ marginBottom: 18 }}>
                      <img src={award.img} alt={award.title} className="recognition-mark-image" />
                    </div>
                  )}
                  <h2 className="abt-award-title recognition-card-title font-montserrat" style={{ fontSize: "15px", fontWeight: 500, color: "#45484d", lineHeight: 1.4, margin: 0 }}>
                    {award.title}
                  </h2>
                  <p className="recognition-card-detail font-montserrat" style={{ fontWeight: 400, color: "#8a8d91", lineHeight: 1.45, margin: "4px 0 0" }}>
                    {award.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>
      {/* ─── 08 — TODAY, WE BUILD ACROSS ─────────────────────── */}
      <section data-testid="section-about-sectors" className="abt-sectors-section">
        <div className="abt-sectors-inner">
          <RevealBlock>
            <header className="abt-sectors-header">
              <span className="abt-sectors-eyebrow about-label-font font-montserrat">
                TODAY, WE BUILD ACROSS
              </span>
              <h2 className="abt-sectors-title font-montserrat">
                Diverse Spaces. A Stronger India.
              </h2>
            </header>
          </RevealBlock>

          <RevealBlock delay={100}>
            <div className="abt-sectors-list" aria-label="Sectors MECPL serves">
              {sectors.map((label) => (
                <div key={label} className="abt-sector-tab font-montserrat">
                  {label}
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={150}>
            <div className="abt-stats-grid">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="abt-stat-item font-montserrat"
                >
                  <div className="abt-stat-value">{stat.val}</div>
                  <div className="abt-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ─── 09 — THE JOURNEY CONTINUES (CTA) ────────────────── */}
      <section data-testid="section-about-continuation" className="abt-cta-section" style={{
        background: "#232529",
        padding: "120px 40px 120px",
        marginTop: "120px",
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
      }}>
         <div
           aria-hidden="true"
           style={{
             position: "absolute",
             inset: 0,
              backgroundColor: "#232529",
             zIndex: 0,
             pointerEvents: "none",
           }}
         />
         <div data-scroll-reveal="text" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="about-label-font font-montserrat text-[color:var(--mecpl-red)]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 24 }}>
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
            SAME PURPOSE.<br/>GREATER POSSIBILITIES.
          </h2>
          <p className="font-montserrat" style={{ fontSize: "1.05rem", color: "#d1d3d5", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
            From the foundations we laid in 1975 to what we build next, the purpose remains the same: to build better, safer and stronger.
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
                border: "1.5px solid #ffffff", color: "#ffffff",
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
