import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

export const journey = [
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
  { year: "2026", title: "GLOBAL SAFETY RECOGNITION", text: "British Safety Council International Safety Award – Distinction (2026)." },
];

export function CurrentJourneyTimeline() {
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

        setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
      });
    };

    scroller.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", updateActiveSlide);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  return (
    <section
      aria-label="Current journey timeline"
      style={{
        minHeight: "100vh",
        background: "#232529",
        color: "#ffffff",
        overflow: "hidden",
        position: "relative",
        paddingBottom: 108,
      }}
    >
      <div style={{ padding: "80px 56px 40px", maxWidth: 1360, margin: "0 auto", textAlign: "center" }}>
        <span style={{ color: "#EC3338", display: "block", fontSize: 15, fontWeight: 600, letterSpacing: "0.3em", marginBottom: 12 }}>
          OUR JOURNEY
        </span>
        <h2 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>
          50+ Years.<br />One Continuing Journey.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.85rem", letterSpacing: "0.08em", margin: "18px 0 0", textTransform: "uppercase" }}>
          Milestones that build a stronger tomorrow
        </p>
      </div>
      <div
        ref={scrollRef}
        style={{ display: "flex", alignItems: "center", minHeight: "50vh", padding: "0 56px", overflowX: "auto", scrollSnapType: "x mandatory", overscrollBehaviorX: "contain" }}
      >
        <div ref={trackRef} style={{ display: "flex", gap: 64, paddingRight: "50vw", paddingBottom: 80 }}>
          {journey.map((item, index) => (
            <div key={`${item.year}-${index}`} style={{ width: 340, flexShrink: 0, position: "relative", paddingTop: 32, scrollSnapAlign: "start" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: "rgba(255,255,255,0.15)" }}>
                <div style={{ position: "absolute", top: -5, left: 0, width: 12, height: 12, borderRadius: "50%", background: "#EC3338" }} />
              </div>
              <div style={{ fontSize: "2.5rem", fontWeight: 600, color: "#ffffff", lineHeight: 1, marginBottom: 16 }}>
                {item.year}
              </div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#EC3338", letterSpacing: "0.05em", margin: "0 0 16px", lineHeight: 1.4 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>
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
        <div style={{ minHeight: 58, display: "flex", alignItems: "center", justifyContent: "center", gap: 13, padding: "0 24px", borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
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
          style={{ width: 58, height: 58, display: "inline-flex", alignItems: "center", justifyContent: "center", border: 0, borderRadius: "50%", background: "rgba(255,255,255,0.06)", color: "#ffffff", cursor: "pointer", flexShrink: 0 }}
        >
          {isPlaying ? <Pause size={21} strokeWidth={3} /> : <Play size={21} fill="currentColor" />}
        </button>
      </div>
    </section>
  );
}

export function ReferenceJourneyTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const updateActiveSlide = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
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
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
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
    <div className="journey-preview">
      <section id="our-journey" className="abt-journey-section" aria-label="Our journey">
        <div
          className="abt-journey-backdrop"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url("/__mockup/images/assets/people-safety/23_1790178654345.jpg")',
          }}
        />
        <header className="abt-journey-header">
          <span className="abt-journey-eyebrow">OUR JOURNEY</span>
          <h2 className="abt-journey-title">50+ Years. <span>One Continuing Journey.</span></h2>
          <p className="abt-journey-subtitle">Milestones that build a stronger tomorrow</p>
        </header>
        <div className="abt-journey-stage">
          <div ref={scrollRef} className="abt-journey-scroll" role="region" aria-label="Journey milestones">
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
                  <div className="abt-journey-year">{item.year}</div>
                  <h3 className="abt-journey-card-title">{item.title}</h3>
                  <p className="abt-journey-copy">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <nav className="abt-journey-controls" aria-label="Journey carousel controls">
          <button
            type="button"
            className="abt-journey-arrow"
            aria-label="Previous milestone"
            onClick={() => navigateTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
          >
            <ArrowLeft size={19} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <p className="abt-journey-count" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="abt-journey-count-divider"> / </span>
            {String(journey.length).padStart(2, "0")}
            <span className="abt-journey-count-year">{journey[activeIndex]?.year}</span>
          </p>
          <button
            type="button"
            className="abt-journey-arrow"
            aria-label="Next milestone"
            onClick={() => navigateTo(Math.min(journey.length - 1, activeIndex + 1))}
            disabled={activeIndex === journey.length - 1}
          >
            <ArrowRight size={19} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </nav>
      </section>
    </div>
  );
}
