import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Building,
  Building2,
  Construction,
  DoorOpen,
  Factory,
  Landmark,
  Pause,
  Play,
  Quote,
  X,
} from "lucide-react";

const assetBase = import.meta.env.BASE_URL;

const stats = [
  { val: "50+", label: "YEARS OF LEGACY" },
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

// ─── 04 — OUR JOURNEY (Timeline Carousel) ─────────────────
function JourneyTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const programmaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    const slide = track?.children.item(activeIndex) as HTMLElement | null;
    if (!scroller || !slide) return;

    programmaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current !== null) {
      window.clearTimeout(programmaticScrollTimerRef.current);
    }
    scroller.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    programmaticScrollTimerRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
      programmaticScrollTimerRef.current = null;
    }, 700);

    return () => {
      if (programmaticScrollTimerRef.current !== null) {
        window.clearTimeout(programmaticScrollTimerRef.current);
        programmaticScrollTimerRef.current = null;
      }
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % journey.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const updateActiveSlide = () => {
      if (programmaticScrollRef.current) return;
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        const target = scroller.scrollLeft + scroller.clientWidth * 0.35;
        const slides = Array.from(track.children) as HTMLElement[];
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - target);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex((current) => current === closestIndex ? current : closestIndex);
      });
    };

    scroller.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", updateActiveSlide);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  return (
    <section id="our-journey" data-testid="section-about-journey" style={{ background: "#232529", color: "#ffffff", overflow: "hidden", position: "relative", scrollMarginTop: 80, paddingBottom: 108 }}>
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
      <div
        ref={scrollRef}
        style={{ display: "flex", alignItems: "center", minHeight: "50vh", padding: "0 56px", overflowX: "auto", scrollSnapType: "x mandatory", overscrollBehaviorX: "contain" }}
        className="no-scrollbar abt-journey-scroll"
      >
        <div ref={trackRef} className="abt-journey-track" style={{ display: "flex", gap: 64, paddingRight: "50vw", paddingBottom: 80 }}>
          {journey.map((item, i) => (
            <div key={i} style={{ width: 340, flexShrink: 0, position: "relative", paddingTop: 32, scrollSnapAlign: "start" }}>
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
      <div
        aria-label="Journey carousel controls"
        style={{ position: "absolute", left: 0, right: 0, bottom: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 24px" }}
      >
        <div
          style={{
            minHeight: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 13,
            padding: "0 24px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {journey.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={`${item.year}-${item.title}`}
                type="button"
                aria-label={`Show ${item.year}: ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                style={{
                  width: isActive ? 48 : 8,
                  height: 8,
                  padding: 0,
                  border: 0,
                  borderRadius: 999,
                  background: isActive ? "#a9a9ad" : "#77777d",
                  cursor: "pointer",
                  transition: "width 220ms ease, background 220ms ease",
                }}
              />
            );
          })}
        </div>
        <button
          type="button"
          aria-label={isPlaying ? "Pause journey carousel" : "Play journey carousel"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((playing) => !playing)}
          style={{
            width: 58,
            height: 58,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: 0,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            color: "#ffffff",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {isPlaying ? <Pause size={21} strokeWidth={3} /> : <Play size={21} fill="currentColor" />}
        </button>
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
        padding: "96px 56px",
        overflow: "hidden",
        background: "#f4f5f6",
        backgroundImage: "radial-gradient(circle at 12% 18%, rgba(236,51,56,0.06), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.72), rgba(244,245,246,0.96))",
      }}
    >
      <div className="abt-leadership-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: 72, alignItems: "center" }}>
        <div data-scroll-reveal="text">
          <span className="about-label-font font-montserrat text-[15px]" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3em", color: "#EC3338", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
            OUR LEADERSHIP
          </span>
          <h2 className="page-title-font font-montserrat" style={{ fontWeight: 600, fontSize: "36px", color: "rgb(17,24,39)", letterSpacing: "-0.01em", lineHeight: 1.15, margin: "0 0 20px" }}>
            The People Building What's Next.
          </h2>
          <p className="font-inter" style={{ fontSize: "0.8rem", color: "#949599", lineHeight: 1.85, margin: "0 0 28px" }}>
            For over five decades, MECPL has been shaped by leaders who combine deep industry experience with a forward-looking approach to construction, people and business.
          </p>
          <p className="font-montserrat" style={{ fontSize: "0.62rem", color: "#949599", lineHeight: 1.9, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 28px" }}>
            Experience · Leadership · Continuity · A Stronger Tomorrow
          </p>
          <div style={{ width: 36, height: 2, background: "rgba(0,0,0,0.15)" }} />
        </div>

        <div className="abt-leadership-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18 }}>
          {leaders.map((leader, i) => (
            <div
              key={leader.name}
              data-scroll-reveal="image"
              data-scroll-reveal-delay={String(i * 90)}
              style={{
                position: "relative",
                background: "#ffffff",
                border: "1px solid rgba(17,24,39,0.08)",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 16px 36px rgba(17,24,39,0.08)",
                display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "1.18", background: "#dfe2e5" }}>
                <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                <button
                  type="button"
                  aria-label={`View profile of ${leader.name}`}
                  onClick={() => setSelectedLeader(leader)}
                  style={{
                    position: "absolute",
                    left: 16,
                    bottom: -18,
                    zIndex: 4,
                    width: 38,
                    height: 38,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid #ffffff",
                    borderRadius: "50%",
                    background: "#EC3338",
                    color: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(17,24,39,0.2)",
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: 24, fontWeight: 300, lineHeight: 1, marginTop: -2 }}>+</span>
                </button>
              </div>

              <div style={{ padding: "30px 18px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div className="font-montserrat" style={{ fontWeight: 600, fontSize: "0.78rem", color: "#111827", textTransform: "none", letterSpacing: "0.01em", lineHeight: 1.3, marginBottom: 8 }}>
                  {leader.name}
                </div>
                <div className="font-montserrat" style={{ fontWeight: 600, fontSize: "0.48rem", color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.5 }}>
                  {leader.role}
                </div>
              </div>
            </div>
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
                  <p key={detail} className="font-inter" style={{ margin: 0, color: "#e1e3e6", fontSize: "0.82rem", lineHeight: 1.75 }}>
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.74)_0%,rgba(6,10,16,0.58)_48%,rgba(6,10,16,0.42)_100%)]" />
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
      {/* ─── 05 — OUR FOUNDER ────────────────────────────────── */}
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
                Founder & Promoter
              </div>
              <p className="font-inter" style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 40 }}>
                A civil engineer with over six decades of experience, M. B. Nambiar began his professional journey in 1964 and went on to establish Shreyas Constructions, laying the foundation for what would become the Millennium Engineers group.
                <br /><br />
                Since the establishment of MECPL in 1999, his vision and entrepreneurial leadership have shaped the company's growth, reputation and enduring commitment to quality, safety and professional excellence.
                <br /><br />
                His contribution to the construction industry has been recognised with the Nirman Ratna Lifetime Achievement Award by the Builders Association of India and the AESA Lifetime Achievement Award in 2022, presented by the Architects, Engineers and Surveyors Association (AESA), Pune.
              </p>
              <div style={{ borderTop: "2px solid #EC3338", paddingTop: 24, maxWidth: 420, margin: "0 auto" }}>
                <p className="font-montserrat" style={{ fontSize: "1.1rem", fontWeight: 500, fontStyle: "italic", lineHeight: 1.6, color: "#ffffff", margin: 0 }}>
                  "A legacy built on experience.<br/>A culture built to endure."
                </p>
                <span className="font-montserrat" style={{ display: "block", marginTop: 16, color: "rgba(255,255,255,0.55)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  M. B. Nambiar
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ─── 06 — OUR LEADERSHIP ─────────────────────────────── */}
      <LeadershipDoorSlider />
      {/* ─── 07 — AWARDS & CERTIFICATIONS ────────────────────── */}
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
