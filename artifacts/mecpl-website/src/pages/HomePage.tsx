import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import PeopleSafetySection from "../components/PeopleSafetySection";
import RisingProjectsSection from "../components/RisingProjectsSection";
import RecognitionMarksSection from "../components/RecognitionMarksSection";
import "../components/RisingProjectsSection.css";
import ServiceLineIcon, { type ServiceIconType } from "../components/ServiceLineIcon";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── TYPES ──────────────────────────────────────────────────────── */
/* ─── DATA ───────────────────────────────────────────────────────── */
const heroVideos = [
  "assets/video/banner-giant-behind-the-giants.mp4",
  "assets/video/banner-force-within-us.mp4",
  "assets/video/banner-quality-and-safety.mp4",
  "assets/video/banner-people-behind-the-building.mp4",
];

type HeroSlide = {
  heading: string[];
  subtitle: string;
  subtitleSecondLine?: string;
  keepHeadingLines?: boolean;
};

const heroSlides: HeroSlide[] = [
  {
    heading: ["GIANT BEHIND THE GIANTS"],
    keepHeadingLines: true,
    subtitle: "We're Millennium Engineers & Contractors, a Pune-based civil, structural & interior contractor that turns ambitious ideas into buildings people trust. For 45 years, that's simply what we do.",
  },
  {
    heading: ["TO BUILD IS A FORCE", "WITHIN US"],
    keepHeadingLines: true,
    subtitle: "An 8,000+ strong team that treats every industrial, commercial, residential or institutional site like it's their own.",
  },
  {
    heading: ["QUALITY YOU CAN SEE.", "SAFETY YOU CAN RELY ON."],
    keepHeadingLines: true,
    subtitle: "ISO certified in quality, environment & occupational",
    subtitleSecondLine: "health & safety | CRISIL BBB / Positive",
  },
  {
    heading: ["PEOPLE BEHIND THE BUILDING"],
    subtitle: "A team of experts, backed by experienced professionals,",
    subtitleSecondLine: "bringing expertise and precision to every structure.",
  },
];

const stats = [
  { target: 45,  suffix: "+",   label: "Years of Legacy"             },
  { target: 150, suffix: "+",   label: "Projects Delivered"           },
  { target: 900, suffix: "+Cr", label: "Revenue"          },
  { target: 30,  suffix: "+",   label: "Ongoing Projects" },
];

const services = [
  { num: "01", title: "Residential Construction", desc: "High-rise, township and residential developments built for scale, safety and lasting performance.", icon: "residential" },
  { num: "02", title: "Institutional & Industrial Construction", desc: "From educational and institutional spaces to factories, R&D centres and process plants, we build high-performance structures engineered for demanding operations.", icon: "institutional-industrial" },
  { num: "03", title: "Commercial Construction", desc: "Office, retail and mixed-use developments delivered with precision, efficiency and quality.", icon: "commercial" },
  { num: "04", title: "Infrastructure Construction", desc: "Large-scale infrastructure and civil works built for durability, functionality and long-term performance.", icon: "infrastructure" },
  { num: "05", title: "Interiors Projects", desc: "B2B interior solutions extending our construction expertise into doors, modular furniture and complete interior environments.", icon: "interiors" },
  { num: "06", title: "Turnkey Projects", desc: "End-to-end project execution bringing together planning, construction, interiors and finishing under one roof.", icon: "turnkey" },
] satisfies Array<{ num: string; title: string; desc: string; icon: ServiceIconType }>;

const projects = [
  { name: "Trump Tower",                 location: "Kalyani Nagar, Pune", image: "assets/projects/Trump-Tower.jpg" },
  { name: "Panchshil Highrise Towers",   location: "Wagholi, Pune",       image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { name: "Godrej Nurture",              location: "Mamurdi, Pune",      image: "assets/projects/Godrej-Forest-grove.jpg" },
  { name: "EON Phase II",                location: "Kharadi, Pune",      image: "assets/projects/Eonwest.jpg" },
  { name: "Kalpataru Jade Residences",   location: "Baner, Pune",         image: "assets/projects/KRC-scaled-e1700730314593.jpg" },
];

const risingProjectVideos = [
  {
    name: "Concrete Pouring Milestone (B94)",
    location: "Pune",
    headline: "1,00,000 m³ Concrete Poured",
    video: "assets/video/rising-concrete-pouring.mp4",
    description: "A major milestone at our K Raheja Corp B94 site, 1 lakh cubic metres of concrete poured, marking another significant step forward in the journey from foundation to landmark.",
  },
  {
    name: "Vantage Tower B",
    location: "Pune",
    headline: "British Safety Council International Safety Award 2026",
    video: "assets/video/rising-vantage-tower-b.mp4",
    description: "Panchshil Realty Vantage Tower B continues to rise, backed by a safety-first approach and internationally recognized standards of construction safety.",
  },
  {
    name: "K 57",
    location: "Pune",
    headline: "BAI Well Built Structure Award 2025",
    video: "assets/video/rising-well-built-structure.mp4",
    description: "K Raheja Corp K-57 in progress, carrying forward a legacy of excellence with the BAI Well Built Structure Award 2025, our 13th consecutive win.",
  },
  {
    name: "Riverdale Riverfront",
    location: "Pune",
    headline: "Riverfront Infrastructure",
    video: "assets/video/rising-riverfront-infrastructure.mp4",
    description: "Aerial progress across the Riverdale riverfront infrastructure works in Pune.",
  },
];

const risingHighlightPosterNames: Record<string, string> = {
  "rising-concrete-pouring": "rising-concrete-pouring-highlight",
  "rising-vantage-tower-b": "rising-vantage-tower-b-highlight",
  "rising-riverfront-infrastructure": "rising-riverfront-infrastructure-highlight",
};

const testimonials = [
  { quote: "MECPL is equipped with better infrastructure and well-qualified, experienced staff — capable of handling any type of project.", name: "Pride Properties", role: "Certificate of Testimony" },
  { quote: "We were particularly impressed by MECPL's professional expertise and interaction with our project managers — despite the site's unyielding terrain.", name: "Mahindra United World College", role: "Project Correspondence" },
  { quote: "Millennium Engineers & Contractors completed our Universal Temple project on time, with real professionalism and skilled staff.", name: "Mahindra United World College", role: "President, Ramakrishna Math" },
];

const clients = [
  { name: "Tata Consultancy Services", logo: "assets/clients/partner-logos/tcs.webp" },
  { name: "Praj", logo: "assets/clients/partner-logos/praj.webp" },
  { name: "Nandan", logo: "assets/clients/partner-logos/nandan.webp" },
  { name: "Atos Syntel", logo: "assets/clients/partner-logos/atos-syntel.webp" },
  { name: "Pride Purple", logo: "assets/clients/partner-logos/pride-purple.webp" },
  { name: "OmniActive", logo: "assets/clients/partner-logos/omniactive.webp" },
  { name: "Bombay YMCA", logo: "assets/clients/partner-logos/bombay-ymca.webp" },
];

/* ─── COMPONENT ──────────────────────────────────────────────────── */
export default function HomePage({ isReady = true }: { isReady?: boolean }) {
  const [videoIdx, setVideoIdx] = useState(0);
  const activeHeroSlide = heroSlides[videoIdx] ?? heroSlides[0];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeRisingProject, setActiveRisingProject] = useState(0);
  const [activeProj, setActiveProj] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const risingVideoRef = useRef<HTMLVideoElement | null>(null);
  const assetBase = import.meta.env.BASE_URL;
  const posterFor = (src: string) => {
    const videoName = src.split("/").pop()?.replace(/\.mp4$/i, "") ?? "";
    const posterName = risingHighlightPosterNames[videoName] ?? videoName;
    return `${assetBase}assets/video/posters/${posterName}.jpg`;
  };

  const heroSectionRef  = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);

  const heroTagRef      = useRef<HTMLElement>(null);
  const heroSubRef      = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLElement>(null);
  const aboutRef        = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const clientsRef      = useRef<HTMLElement>(null);
  const recognitionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isReady) return;
    const targetId = window.location.hash.slice(1);
    if (!["recognition", "about", "services", "featured-projects", "rising-projects", "people-safety", "testimonials", "clients"].includes(targetId)) return;
    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    };
    const frame = window.requestAnimationFrame(() => {
      scrollToTarget();
    });
    const settledLayoutTimer = window.setTimeout(scrollToTarget, 700);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settledLayoutTimer);
    };
  }, [isReady]);

  useEffect(() => {
    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => window.clearInterval(testimonialTimer);
  }, []);

  /* ── HERO: entrance (SplitText chars + section slide-up) ── */
  useEffect(() => {
    if (!isReady) return;
    const headline = heroHeadlineRef.current;
    const section  = heroSectionRef.current;
    if (!headline || !section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hide section only in animated mode — reduced-motion users see it immediately
        gsap.set(section, { y: "100vh", scale: 0.98 });

        const splits: SplitText[] = [];

        const runAnims = () => {
          gsap.to(section, { y: 0, scale: 1, duration: 1.0, ease: "power3.out" });

          const lines = headline.querySelectorAll<HTMLElement>(".hero-line");
          lines.forEach((line, i) => {
            const split = new SplitText(line, { type: "words", wordsClass: "hp-word" });
            splits.push(split);
            gsap.from(split.words, {
              yPercent: 115, opacity: 0, duration: 1.0, stagger: 0.12,
              ease: "power4.out", delay: 0.15 + i * 0.25,
            });
          });

          const tagEl = heroTagRef.current;
          if (tagEl) gsap.from(tagEl, { opacity: 0, y: 12, duration: 0.8, delay: 0.1, ease: "power3.out" });

          const subEl = heroSubRef.current;
          if (subEl) {
            const items = subEl.querySelectorAll<HTMLElement>(".hero-sub-item");
            gsap.from(items.length ? Array.from(items) : [subEl], {
              opacity: 0, y: 18, duration: 0.85, stagger: 0.14, delay: 1.2, ease: "power3.out",
            });
          }
        };

        runAnims();

        return () => splits.forEach(s => s.revert());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Section visible immediately — no entrance animation
        gsap.set(section, { y: 0, scale: 1, clearProps: "all" });
      });
    });

    return () => ctx.revert();
  }, [isReady]);

  /* ── HERO: video cycling ── */
  useEffect(() => {
    if (!isReady) return;
    setVideoIdx(0);
    const id = setInterval(() => setVideoIdx(v => (v + 1) % heroVideos.length), 8000);
    return () => clearInterval(id);
  }, [isReady]);

  /* ── HERO: play/pause based on active index ── */
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (isReady && i === videoIdx) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [videoIdx, isReady]);

  /* ── STATS: count-up ── */
  useEffect(() => {
    const sec = statsRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const numEls = sec.querySelectorAll<HTMLElement>(".stat-num");
        let triggered = false;
        ScrollTrigger.create({
          trigger: sec, start: "top 80%", once: true,
          onEnter: () => {
            if (triggered) return;
            triggered = true;
            numEls.forEach(el => {
              const target = parseFloat(el.dataset.target ?? "0");
              const tracker = { val: 0 };
              gsap.to(tracker, {
                val: target, duration: 2.4, ease: "power2.out",
                onUpdate: () => { el.textContent = Math.round(tracker.val).toString(); },
              });
            });
          },
        });
      });
      // Reduced-motion: show final values immediately
      mm.add("(prefers-reduced-motion: reduce)", () => {
        sec.querySelectorAll<HTMLElement>(".stat-num").forEach(el => {
          const target = parseFloat(el.dataset.target ?? "0");
          el.textContent = target.toString();
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── RECOGNITION: card stagger ── */
  useEffect(() => {
    const sec = recognitionRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = sec.querySelectorAll<HTMLElement>(".rec-card");
        gsap.from(Array.from(cards), {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none none" },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── ABOUT: clip-path wipe + image stagger ── */
  useEffect(() => {
    const sec = aboutRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const quoteEl = sec.querySelector<HTMLElement>(".about-quote");
        if (quoteEl) {
          gsap.fromTo(quoteEl,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.out",
              scrollTrigger: { trigger: quoteEl, start: "top 75%" } }
          );
        }
        const fadeEls = sec.querySelectorAll<HTMLElement>(".about-fade");
        fadeEls.forEach((el, i) => {
          gsap.from(el, {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: sec, start: "top 70%" },
          });
        });
        const imgEls = sec.querySelectorAll<HTMLElement>(".about-img");
        gsap.from(Array.from(imgEls), {
          y: 40, opacity: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 65%" },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── TESTIMONIALS: card stagger ── */
  useEffect(() => {
    const sec = testimonialsRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = sec.querySelectorAll<HTMLElement>(".testi-card");
        gsap.from(Array.from(cards), {
          y: 48, opacity: 0, duration: 0.75, stagger: 0.14, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 65%", toggleActions: "play none none none" },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── CLIENTS: continuous ticker, retaining hover pause ── */
  useEffect(() => {
    const sec = clientsRef.current;
    const track = sec?.querySelector<HTMLElement>(".clients-track");
    if (!sec || !track) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(track, { x: 0 }, {
        x: () => -(track.scrollWidth / 2),
        duration: 28,
        ease: "none",
        repeat: -1,
      });
      const pause = () => tween.pause();
      const play = () => tween.play();
      sec.addEventListener("mouseenter", pause);
      sec.addEventListener("mouseleave", play);
      const observer = new ResizeObserver(() => {
        const progress = tween.progress();
        tween.invalidate().progress(progress);
      });
      observer.observe(sec);
      return () => {
        observer.disconnect();
        sec.removeEventListener("mouseenter", pause);
        sec.removeEventListener("mouseleave", play);
        tween.revert();
      };
    });
    return () => mm.revert();
  }, []);

  /* ─── JSX ────────────────────────────────────────────────────── */
  return (
    <div className="home-page-typography" style={{ background: "#ffffff", color: "#232529" }}>
      {/* ══════════ 1. HERO — Cinematic centered ══════════ */}
      <section
        ref={heroSectionRef}
        className="home-hero-banner relative h-screen overflow-hidden"
        data-testid="section-hero"
        style={{ visibility: isReady ? "visible" : "hidden" }}
      >
        {/* 3 cycling videos — only active one plays */}
        {heroVideos.map((src, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el; }}
            muted
            loop
            playsInline
            preload={i === 0 ? "auto" : "none"}
            poster={posterFor(src)}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(1.12) contrast(1.03) saturate(1.08)",
              opacity: videoIdx === i ? 1 : 0,
              transition: "opacity 1.4s ease",
              zIndex: videoIdx === i ? 1 : 0,
            }}
          >
            <source src={`${assetBase}${src}`} type="video/mp4" />
          </video>
        ))}

        {/* Cinematic gradient overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "rgba(0,0,0,0.42)",
        }} />

        {/* TOP RIGHT: video counter + progress */}
        <div style={{
          position: "absolute", top: "100px", right: "40px", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px",
        }}>
          <div className="home-slide-counter mecpl-role-swipe-hint" style={{
            
            color: "rgba(255,255,255,0.45)", 
          }}>
            {String(videoIdx + 1).padStart(2, "0")} / {String(heroVideos.length).padStart(2, "0")}
          </div>
          <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
            <div key={`${videoIdx}-${isReady}`} className="hero-progress-bar" style={{
              animationPlayState: isReady ? "running" : "paused",
              position: "absolute", left: 0, top: 0, height: "100%", background: "#ffffff",
            }} />
          </div>
        </div>

        {/* CENTER: hero text — label/mission/button constant, heading swaps per slide */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            textAlign: "center",
            width: "100%",
            maxWidth: "1100px",
            padding: "0 clamp(8px, 2.8vw, 40px)",
            textShadow: "none",
            backgroundImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.14) 45%, transparent 75%)",
            backgroundSize: "min(100%, 700px) 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
            {/* Constant label */}
            <div
              style={{
                
                color: "rgba(255,255,255,0.92)",
                
                marginBottom: "14px",
              }}
              className="mecpl-role-hero-company home-intro-label">
              MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD.
            </div>

            {/* Per-slide heading — re-mounts with key to trigger animation */}
            <h1 className={`mecpl-role-hero-title type-display hp-banner-title page-title-font home-intro-title home-intro-title-has-description${activeHeroSlide.keepHeadingLines ? " hp-banner-title-fit-lines" : ""}`} key={videoIdx} style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
              {activeHeroSlide.heading.map((line, i) => (
                <div key={i} className="hp-banner-line" style={{ color: "#ffffff" }}>
                  {line}
                </div>
              ))}
            </h1>

            {/* Per-slide subtitle */}
            <p className="mecpl-role-lead page-subtitle-font home-intro-description" key={`sub-${videoIdx}`} style={{
              
              color: "rgba(255,255,255,0.95)",
              margin: "0 auto 20px", maxWidth: "460px",
              animation: "heroSlideIn 0.7s ease forwards",
            }}>
              {activeHeroSlide.subtitle}
              {activeHeroSlide.subtitleSecondLine && <><br />{activeHeroSlide.subtitleSecondLine}</>}
            </p>

            {/* Constant buttons */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/projects" data-testid="button-hero-projects">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#EC3338", color: "#ffffff",
                    
                    
                    
                    padding: "14px 32px", cursor: "pointer",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#232529")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#EC3338")}
                  className="mecpl-role-button">
                  Explore our work <ArrowRight size={11} />
                </span>
              </Link>
              <Link href="/about">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    border: "1px solid rgba(255,255,255,0.55)", color: "#ffffff",
                    
                    
                    
                    padding: "13px 28px", cursor: "pointer",
                  }}
                  className="mecpl-role-button">
                  Watch our story <ArrowRight size={11} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM: scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}>
          <span style={{
            
            color: "rgba(255,255,255,0.32)", 
          }} className="home-scroll-hint mecpl-role-swipe-hint">
            SCROLL
          </span>
          <div className="scroll-bounce">
            <ChevronDown size={16} color="rgba(255,255,255,0.32)" />
          </div>
        </div>
      </section>
      {/* ══════════ 2. RECOGNITION ══════════ */}
      <RecognitionMarksSection sectionRef={recognitionRef} />
      {/* ══════════ 2.5 STATS STRIP ══════════ */}
      <section
        id="stats"
        ref={statsRef}
        data-testid="section-stats"
        style={{
          background: "#232529",
           minHeight: "clamp(180px, 18vw, 220px)",
           padding: "clamp(48px, 5vw, 64px) clamp(24px, 6vw, 96px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="w-full">
          <div
             className="home-stats-grid grid grid-cols-2 md:grid-cols-4"
            style={{
              width: "100%",
              maxWidth: 1240,
              margin: "0 auto",
               rowGap: 0,
               columnGap: 0,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                 className="home-stat-item"
                data-scroll-reveal="text"
                data-scroll-reveal-delay={String(i * 70)}
                style={{
                  minWidth: 0,
                   padding: "0 clamp(8px, 2vw, 28px)",
                  textAlign: "center",
                }}
              >
                 <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "1px", marginBottom: 8 }}>
                  <span
                    className="mecpl-role-stat-number stat-num"
                    data-target={s.target}
                    style={{
                       
                      color: "#ffffff", 
                    }}
                  >
                    0
                  </span>
                  <span className="mecpl-role-stat-number home-stat-unit" style={{ color: "#EC3338" }}>
                    {s.suffix}
                  </span>
                </div>
                <div className="home-stat-label" style={{
                  maxWidth: 240,
                  margin: "0 auto",
                   
                  
                   
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ CLIENTS: partner logos ══════════ */}
      <section
        id="clients"
        ref={clientsRef}
        className="clients-logo-section"
        data-testid="section-clients"
        aria-labelledby="clients-title"
      >
        <div className="client-logos-heading-band">
          <h2 id="clients-title" className="mecpl-role-h2-medium client-logos-title">
            Built for Industry Leaders
          </h2>
        </div>
        <div className="client-logos-viewport">
          <div className="client-logos-grid clients-track">
            {[false, true].map((duplicate) => (
              <div
                key={String(duplicate)}
                className="client-logos-set"
                role={duplicate ? undefined : "list"}
                aria-label={duplicate ? undefined : "Client logos"}
                aria-hidden={duplicate || undefined}
              >
            {clients.map((client, index) => (
              <div
                key={client.name}
                className="client-logo-cell"
                data-testid={duplicate ? undefined : `card-client-${index}`}
                role={duplicate ? undefined : "listitem"}
              >
                <img
                  src={`${assetBase}${client.logo}`}
                  alt={duplicate ? "" : client.name}
                  className="client-logo-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ 3. ABOUT — Storytelling ══════════ */}
      <section
        id="about"
        ref={aboutRef}
        data-testid="section-about"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 40px 128px 45px" }}
      >
        <div className="home-about-shell max-w-none mx-auto">
          <div className="home-about-grid grid items-start gap-16 lg:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">

            {/* Left: editorial */}
            <div className="home-about-copy lg:pl-[120px]">
              <div className="home-about-heading about-fade" style={{ marginBottom: "36px", textAlign: "center" }}>
                <span className="home-section-label home-intro-label" style={{
                  
                  color: "#EC3338", 
                  display: "block", marginBottom: "10px",
                }}>
                  Who we are
                </span>
                <h2 className="mecpl-role-h2-large hp-section-title home-heading-26 home-intro-title whitespace-normal" style={{
                  maxWidth: "520px",
                  margin: "0 auto 20px",
                  
                }}>
                  From a ₹2 Lakh Beginning to ₹900+ Cr
                </h2>
                <div style={{ width: "40px", height: "3px", background: "#EC3338", margin: "0 auto" }} />
              </div>

              {/* Clip-path wipe pull-quote */}
              <div
                className="about-quote"
                style={{
                  borderLeft: "3px solid #EC3338",
                  paddingLeft: "24px", marginBottom: "32px",
                  willChange: "clip-path",
                }}
              >
                <p className="mecpl-role-quote" style={{
                  color: "#232529",
                  margin: "0 0 18px", 
                }}>
                  “Bringing positive changes in the lives of the people around me is the biggest achievement I've had in my life.”
                </p>
                <div
                  className="home-founder-attribution"
                  style={{
                    color: "#232529",
                    
                    
                    
                    textAlign: "left",
                  }}
                >
                  <span className="home-founder-name-line">
                    <span style={{ color: "#232529", }}>M. B Nambiar</span>
                    <span style={{ color: "#949599", }}> — </span>
                    <span style={{ color: "#EC3338", }}>Founder &amp; Chairman</span>
                  </span>
                  <span
                    style={{ display: "block", marginTop: "4px", color: "#949599", }}
                    className="home-founder-credit">
                    Honoured with the prestigious{" "}
                    <span style={{ color: "#EC3338", }}>Nirman Ratna Lifetime Achievement Award</span>{" "}
                    by the BAI and the{" "}
                    <span style={{ color: "#EC3338", }}>Lifetime Achievement Award</span> by AESA
                  </span>
                </div>
              </div>

              <div className="about-fade">
                <p className="home-intro-description home-about-description" style={{
                  
                  color: "#4f545b", marginBottom: "28px",
                }}>
                  Millennium Engineers &amp; Contractors began in the 1980s as a small partnership, taken on by an engineer who wasn't content working for someone else. Four and a half decades on, that same commitment to quality and timely delivery has grown MECPL into one of Pune's most trusted structural engineering and construction names — ISO-certified, CRISIL-rated, and built on 8,000+ skilled hands.
                </p>

                <Link href="/about" data-testid="button-about-more">
                  <span
                    className="mecpl-role-button inline-flex items-center gap-2 cursor-pointer"
                    style={{
                      
                      color: "#EC3338",
                      
                    }}
                  >
                    Read our full story <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: founder portrait */}
            <div
              className="home-about-portrait about-img h-[420px] lg:h-auto lg:self-stretch"
              style={{
                width: "100%",
                maxWidth: "440px",
                margin: "0 auto",
                overflow: "hidden",
                borderRadius: "4px",
                background: "#f5f4f1",
              }}
            >
              <img
                src={`${assetBase}assets/leaders/leader-01.jpg`}
                alt="Mr. M. B. Nambiar, Founder and Chairman of MECPL"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ══════════ 4. SERVICES — Architectural information grid ══════════ */}
      <section
        id="services"
        data-testid="section-services"
        className="relative overflow-hidden bg-[#101419]"
        style={{
          minHeight: "clamp(720px, 62vw, 860px)",
          padding: "clamp(72px, 8vw, 112px) 0 clamp(80px, 8vw, 120px)",
          boxShadow: "0 18px 48px rgba(35,37,41,0.18)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 14, 23, 0.82) 0%, rgba(7, 14, 23, 0.38) 42%, rgba(7, 14, 23, 0.62) 100%), url("${assetBase}assets/services-reference-background.jpg")`,
            backgroundPosition: "center 52%",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(236,51,56,0.1),transparent_36%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="home-services-intro mx-auto flex w-full max-w-[820px] flex-col items-center justify-center text-center">
            <span className="home-section-label home-intro-label" style={{
              
              color: "#EC3338", 
              display: "block", marginBottom: "18px",
            }}>
              What we do
            </span>
            <h2 className="mecpl-role-h2-large home-services-title home-heading-26 home-intro-title home-intro-title-has-description text-white" style={{
              margin: 0, 
              textShadow: "0 3px 18px rgba(0,0,0,0.65)",
            }}>
              Our{" "}
              <span style={{ color: "#ffffff" }}>Services</span>
            </h2>
            <p
              className="page-subtitle-font home-intro-description mt-6 max-w-[700px] text-balance"
              style={{
                color: "rgba(255,255,255,0.78)",
                
                
                marginBottom: 0,
              }}
            >
              End-to-end construction and execution across residential, commercial, institutional, industrial and infrastructure projects.
            </p>
          </div>

          <div className="home-services-grid mt-14 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4">
            {services.map((svc, i) => (
              <div
                key={svc.num}
                className="home-service-row group relative flex min-h-[210px] flex-col items-center justify-start rounded-[2px] border border-white/80 bg-white/95 px-5 py-6 text-center shadow-[0_14px_32px_rgba(0,0,0,0.18)] backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-1 hover:border-[#EC3338] hover:bg-white sm:min-h-[220px] sm:px-6 lg:min-h-[228px] lg:px-7 lg:py-7"
                data-testid={`card-service-${i}`}
                style={{
                  color: "#232529",
                }}
              >
                <div className="home-service-icon flex h-12 w-12 shrink-0 items-center justify-center text-[#EC3338] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                  <ServiceLineIcon type={svc.icon} className="h-9 w-9 sm:h-10 sm:w-10" />
                </div>
                <div className="mt-3 min-w-0">
                  <h3 className="mecpl-role-service-title home-service-title text-[#232529] transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-[#4f545b]">
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ 5. PROJECTS — Expanding Structural Matrix ══════════ */}
      <section
        id="featured-projects"
        data-testid="section-projects"
        className="bg-white py-24 lg:py-32 border-t border-mecpl-dark/10 relative overflow-hidden"
      >
        <div className="max-w-none mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-8 mb-12 lg:mb-16">
            <div className="w-full text-center" data-scroll-reveal="text">
              <span className="home-section-label home-intro-label text-mecpl-red">
                Our projects
              </span>
              <h2 className="mecpl-role-h2-large home-heading-26 home-intro-title home-intro-title-has-description text-mecpl-text m-0">
                Landmark Works
              </h2>
              <p
                className="home-intro-description home-projects-description text-[#4f545b] w-full max-w-none mx-auto m-0 text-center"
                style={{ color: "#4f545b" }}
              >
                A selection of the structures MECPL has delivered across Pune.
              </p>
            </div>

          </div>

          {/* Expanding project gallery */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-[5px] z-20" aria-hidden="true">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#232529]" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#232529]" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#232529]" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#232529]" />
            </div>
            <div className="relative flex h-[650px] w-full flex-col gap-[6px] overflow-hidden rounded-[9px] bg-white p-[5px] shadow-[0_12px_36px_rgba(35,37,41,0.12)] lg:flex-row">
            {projects.map((proj, i) => {
              const isActive = activeProj === i;
              return (
                <Link
                  key={proj.name}
                  href="/projects"
                  aria-label={`View ${proj.name} in ${proj.location} on the Projects page`}
                  data-testid={`button-proj-${i}`}
                  onMouseEnter={() => setActiveProj(i)}
                  onFocus={() => setActiveProj(i)}
                  className={`group relative block min-w-0 overflow-hidden rounded-[6px] bg-mecpl-dark transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mecpl-red ${
                    isActive
                      ? "flex-[1_1_100%] lg:flex-[1_1_55%]"
                      : "flex-[0_0_56px] lg:flex-[0_0_9%]"
                  }`}
                >
                  <div className="absolute inset-0 bg-mecpl-dark">
                    <img
                      src={`${assetBase}${proj.image}`}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className={`h-full w-full object-cover transition-[transform,opacity] duration-700 motion-reduce:transition-none ${
                        isActive ? "scale-100 opacity-100" : "scale-105 opacity-85"
                      }`}
                      style={{
                        display: "block",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3 sm:px-4 sm:pb-4 lg:px-2 lg:pb-4"
                  >
                    <div className="min-w-0">
                      <h3
                        className={`home-project-title text-white text-balance ${isActive ? "home-project-title--active" : ""}`}
                      >
                        {proj.name}
                      </h3>
                      <p
                        className="home-project-category mt-1 min-w-0 text-white/90"
                      >
                        {proj.location}
                      </p>
                    </div>
                  </div>

                </Link>
              )
            })}
            </div>
          </div>

          {/* Mobile Button (Hidden on Desktop) */}
          <div className="mt-10 md:hidden w-full">
              <Link href="/projects" data-testid="button-all-projects-mobile">
                <span className="group flex items-center justify-center gap-4 border border-mecpl-dark bg-transparent text-mecpl-text px-6 py-4 cursor-pointer transition-colors hover:bg-mecpl-dark hover:text-white w-full">
                  <span className="mecpl-role-button">
                    View All 150+ Projects
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
          </div>
        </div>
      </section>
      {/* ══════════ 6. RISING AS WE SPEAK ══════════ */}
      <RisingProjectsSection projects={risingProjectVideos} activeIndex={activeRisingProject} onSelect={setActiveRisingProject} videoRef={risingVideoRef} assetBase={assetBase} posterFor={posterFor} />
      {/* ══════════ 6. PEOPLE & SAFETY ══════════ */}
      <PeopleSafetySection />
      {/* ══════════ 7. TESTIMONIALS ══════════ */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        data-testid="section-testimonials"
        aria-labelledby="testimonials-title"
        style={{
          background: "#ffffff",
          borderTop: "1px solid #eceae7",
          borderBottom: "1px solid rgba(236,51,56,0.45)",
          padding: "44px 0 32px",
          marginTop: "64px",
        }}
      >
        <div className="mx-auto w-full max-w-[960px] px-5 text-center">
          <div className="testi-card">
            <div data-scroll-reveal="text">
              <span className="home-section-label home-intro-label block text-mecpl-red">
                Client voices
              </span>
              <h2
                id="testimonials-title"
                className="mecpl-role-h2-large hp-section-title home-heading-26 home-testimonials-title home-intro-title mt-2"
              >
                What Our Clients Say
              </h2>
              <blockquote
                key={activeTestimonial}
                aria-live="polite"
                aria-atomic="true"
                className="mecpl-role-testimonial home-testimonial-quote mx-auto mt-5 grid min-h-[3em] w-full max-w-[820px] place-items-center text-balance text-center text-mecpl-text"
              >
                <span>
                  <span className="home-testimonial-quote-mark">“</span>
                  {testimonials[activeTestimonial].quote}
                  <span className="home-testimonial-quote-mark">”</span>
                </span>
              </blockquote>
              <div className="mt-4">
                <div className="home-testimonial-name text-mecpl-text">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="home-testimonial-role mt-1 text-mecpl-steel">
                  {testimonials[activeTestimonial].role}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
