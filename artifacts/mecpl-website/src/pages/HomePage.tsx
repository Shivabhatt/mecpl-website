import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import PeopleSafetySection from "../components/PeopleSafetySection";
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

const heroSlides = [
  {
    heading: ["GIANT BEHIND THE GIANTS"],
    subtitle: "We're Millennium Engineers & Contractors, a Pune-based civil, structural & interior contractor that turns ambitious ideas into buildings people trust. For 45 years, that's simply what we do.",
  },
  {
    heading: ["TO BUILD IS A", "FORCE WITHIN US"],
    subtitle: "An 8,000+ strong team that treats every industrial, commercial, residential or institutional site like it's their own.",
  },
  {
    heading: ["QUALITY YOU CAN SEE.", "SAFETY YOU CAN RELY ON."],
    subtitle: "ISO certified in Quality, Environment & Occupational Health & Safety | CRISIL BBB / Positive",
  },
  {
    heading: ["PEOPLE BEHIND THE BUILDING"],
    subtitle: "A team of experts, backed by experienced professionals, bringing expertise and precision to every structure.",
  },
];

const stats = [
  { target: 45,  suffix: "+",   label: "Years of Legacy"             },
  { target: 150, suffix: "+",   label: "Projects Delivered"           },
  { target: 900, suffix: "+Cr", label: "Revenue"          },
  { target: 30,  suffix: "+",   label: "Ongoing Projects" },
];

const recognitionData = [
  { title: "India's Small Giants", detail: "Emerging Enterprises of India", image: "assets/recognition/indias-small-giants.png" },
  { title: "India SME 100 Awards", detail: "Recognised SME Excellence", image: "assets/recognition/india-sme-100-awards.jpeg" },
  { title: "Iconic Brand of the Year 2026", detail: "Brand Recognition", image: "assets/recognition/iconic-brand-2026.png" },
  { title: "CRISIL BBB / Positive", detail: "Financial Rating", image: "assets/recognition/crisil-rating.jpg" },
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

const testimonials = [
  { quote: "MECPL is equipped with better infrastructure and well-qualified, experienced staff — capable of handling any type of project.", name: "Pride Properties", role: "Certificate of Testimony" },
  { quote: "We were particularly impressed by MECPL's professional expertise and interaction with our project managers — despite the site's unyielding terrain.", name: "Mahindra United World College", role: "Project Correspondence" },
  { quote: "Millennium Engineers & Contractors completed our Universal Temple project on time, with real professionalism and skilled staff.", name: "Mahindra United World College", role: "President, Ramakrishna Math" },
];

const clients = [
  { name: "Panchshil",                         logo: "assets/clients/partner-logos/panchshil.webp" },
  { name: "K Raheja Corp",                     logo: "assets/clients/partner-logos/k-raheja.webp" },
  { name: "Godrej",                            logo: "assets/clients/partner-logos/godrej.webp" },
  { name: "Tata Consultancy Services",          logo: "assets/clients/partner-logos/tcs.webp" },
  { name: "Praj",                              logo: "assets/clients/partner-logos/praj.webp" },
  { name: "Nandan",                            logo: "assets/clients/partner-logos/nandan.webp" },
  { name: "Atos Syntel",                       logo: "assets/clients/partner-logos/atos-syntel.webp" },
  { name: "Pride Purple",                      logo: "assets/clients/partner-logos/pride-purple.webp" },
  { name: "Kalpataru",                         logo: "assets/clients/partner-logos/kalpataru.webp" },
  { name: "Gera World",                        logo: "assets/clients/partner-logos/gera-world.webp" },
  { name: "Pride",                             logo: "assets/clients/partner-logos/pride.webp" },
  { name: "Bekaert",                           logo: "assets/clients/partner-logos/bekaert.webp" },
  { name: "Mondelez International",             logo: "assets/clients/partner-logos/mondelez.webp" },
  { name: "TCG International Biotech Park",     logo: "assets/clients/partner-logos/tcg-ibp.webp" },
  { name: "UWC Mahindra",                      logo: "assets/clients/partner-logos/mahindra-uwc.webp" },
  { name: "OmniActive",                        logo: "assets/clients/partner-logos/omniactive.webp" },
  { name: "Bombay YMCA",                       logo: "assets/clients/partner-logos/bombay-ymca.webp" },
];

/* ─── COMPONENT ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [videoIdx, setVideoIdx] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeRisingProject, setActiveRisingProject] = useState(0);
  const [activeProj, setActiveProj] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const risingVideoRef = useRef<HTMLVideoElement | null>(null);
  const assetBase = import.meta.env.BASE_URL;
  const posterFor = (src: string) =>
    `${assetBase}assets/video/posters/${src.split("/").pop()?.replace(/\.mp4$/i, ".jpg") ?? ""}`;

  const heroSectionRef  = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const video = risingVideoRef.current;
    if (!video) return;

    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
        video.currentTime = 0;
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
      video.currentTime = 0;
    };
  }, [activeRisingProject]);
  const heroTagRef      = useRef<HTMLElement>(null);
  const heroSubRef      = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLElement>(null);
  const aboutRef        = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const clientsRef      = useRef<HTMLElement>(null);
  const recognitionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => window.clearInterval(testimonialTimer);
  }, []);

  /* ── HERO: entrance (SplitText chars + section slide-up) ── */
  useEffect(() => {
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
  }, []);

  /* ── HERO: video cycling ── */
  useEffect(() => {
    const id = setInterval(() => setVideoIdx(v => (v + 1) % heroVideos.length), 8000);
    return () => clearInterval(id);
  }, []);

  /* ── HERO: play/pause based on active index ── */
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === videoIdx) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [videoIdx]);

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

  /* ── CLIENTS: GSAP infinite ticker ── */
  useEffect(() => {
    const sec = clientsRef.current;
    if (!sec) return;
    const track = sec.querySelector<HTMLElement>(".clients-track");
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 56,
        ease: "none",
        repeat: -1,
      });
      const pause = () => tween.pause();
      const play  = () => tween.play();
      sec.addEventListener("mouseenter", pause);
      sec.addEventListener("mouseleave", play);
      return () => {
        sec.removeEventListener("mouseenter", pause);
        sec.removeEventListener("mouseleave", play);
        tween.kill();
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
        className="relative h-screen overflow-hidden"
        data-testid="section-hero"
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
          background: "rgba(0,0,0,0.46)",
        }} />

        {/* TOP RIGHT: video counter + progress */}
        <div style={{
          position: "absolute", top: "100px", right: "40px", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px",
        }}>
          <div style={{
            fontSize: "9px",
            fontWeight: 300, color: "rgba(255,255,255,0.45)", letterSpacing: "0.24em",
          }}>
            {String(videoIdx + 1).padStart(2, "0")} / {String(heroVideos.length).padStart(2, "0")}
          </div>
          <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
            <div key={videoIdx} className="hero-progress-bar" style={{
              position: "absolute", left: 0, top: 0, height: "100%", background: "#ffffff",
            }} />
          </div>
        </div>

        {/* CENTER: hero text — label/mission/button constant, heading swaps per slide */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 clamp(8px, 2.8vw, 40px)" }}>
            {/* Constant label */}
            <div
              style={{
                fontSize: "clamp(11px, 2.75vw, 15px)",
                fontWeight: 600, color: "rgba(255,255,255,0.92)",
                letterSpacing: "clamp(0.05em, 0.18vw, 0.18em)", textTransform: "uppercase",
                whiteSpace: "nowrap",
                marginBottom: "14px",
                textShadow: "0 2px 10px rgba(0,0,0,0.78), 0 0 3px rgba(0,0,0,0.62)",
              }}
              className="text-[15px]">
              Millennium Engineers &amp; Contractors Pvt. Ltd.
            </div>

            {/* Per-slide heading — re-mounts with key to trigger animation */}
            <h1 className="hp-banner-title page-title-font" key={videoIdx} style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
              {(heroSlides[videoIdx] ?? heroSlides[0]).heading.map((line, i) => (
                <div key={i} className="hp-banner-line text-[26px]" style={{
                  lineHeight: 1.15, color: "#ffffff",
                  whiteSpace: "nowrap",
                }}>
                  {line}
                </div>
              ))}
            </h1>

            {/* Per-slide subtitle */}
            <p className="page-subtitle-font text-[14px]" key={`sub-${videoIdx}`} style={{
              fontSize: "16px",
              fontWeight: 400, color: "rgba(255,255,255,0.9)",
              lineHeight: 1.7, margin: "0 auto 28px", maxWidth: "460px",
              textShadow: "0 2px 10px rgba(0,0,0,0.78), 0 0 2px rgba(0,0,0,0.6)",
              animation: "heroSlideIn 0.7s ease forwards",
            }}>
              {(heroSlides[videoIdx] ?? heroSlides[0]).subtitle}
            </p>

            {/* Constant buttons */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/projects" data-testid="button-hero-projects">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#EC3338", color: "#ffffff",
                    fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600,
                    padding: "14px 32px", cursor: "pointer",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#232529")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#EC3338")}
                  className="text-[12px]">
                  EXPLORE OUR WORK <ArrowRight size={11} />
                </span>
              </Link>
              <Link href="/about">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    border: "1px solid rgba(255,255,255,0.55)", color: "#ffffff",
                    fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600,
                    padding: "13px 28px", cursor: "pointer",
                  }}
                  className="text-[12px]">
                  WATCH OUR STORY <ArrowRight size={11} />
                </span>
              </Link>
            </div>
            <div
              style={{
                marginTop: "22px",
                color: "rgba(255,255,255,0.88)",
                fontSize: "10px",
                letterSpacing: "0.16em",
                lineHeight: 1.6,
                textTransform: "uppercase",
                textShadow: "0 2px 8px rgba(0,0,0,0.72), 0 0 2px rgba(0,0,0,0.55)",
              }}
              className="font-semibold text-[12px]">
              Recognised as one of India&apos;s Small Giants · SME 100 · Iconic Brand of the Year
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
            fontSize: "7px",
            letterSpacing: "0.34em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase",
          }}>
            SCROLL
          </span>
          <div className="scroll-bounce">
            <ChevronDown size={16} color="rgba(255,255,255,0.32)" />
          </div>
        </div>
      </section>
      {/* ══════════ 2. RECOGNITION ══════════ */}
      <section id="recognition" ref={recognitionRef} className="bg-[#f7f6f3] px-5 py-7 md:px-10 md:py-8 lg:px-[100px]">
        <div className="mx-auto w-full">
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <div className="grid min-w-[560px] grid-cols-5 md:min-w-0">
              {recognitionData.map((item, index) => (
                <div
                  key={item.title}
                  className={`rec-card flex min-h-[142px] flex-col items-center justify-center px-2 py-3 text-center ${
                    index > 0 ? "border-l border-mecpl-dark/[0.08]" : ""
                  }`}
                >
                  <div className="recognition-mark-frame">
                    <img
                      src={`${assetBase}${item.image}`}
                      alt={item.title}
                      className="recognition-mark-image"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="rec-card-title recognition-card-title mt-2 max-w-[180px] font-montserrat font-semibold text-[#30343a]">
                    {item.title}
                  </h2>
                  <p
                    className="recognition-card-detail mt-1 max-w-[180px] font-montserrat tracking-[0.01em] text-[#74777b]"
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
              <div
                role="group"
                aria-label="ISO certifications"
                className="rec-card flex min-h-[142px] flex-col items-center justify-center border-l border-mecpl-dark/[0.08] px-2 py-3 text-center"
              >
                <div className="recognition-mark-frame">
                  <img
                    src={`${assetBase}assets/recognition/iso-mark.png`}
                    alt="Blue ISO logo"
                    className="recognition-mark-image"
                    style={{
                      filter: "drop-shadow(0 2px 5px rgba(23,95,155,0.16))",
                    }}
                    loading="lazy"
                  />
                </div>
                <h2 className="rec-card-title recognition-card-title mt-2 max-w-[180px] font-montserrat font-semibold text-[#30343a]">
                  ISO Certified
                </h2>
                <p className="recognition-card-detail mt-1 w-full max-w-[220px] font-montserrat tracking-[0.01em] text-[#74777b]">
                  <span className="block xl:whitespace-nowrap">
                    ISO 14001:2015, ISO 9001:2015,
                  </span>
                  <span className="block">ISO 45001: 2018</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                    className="stat-num page-title-font"
                    data-target={s.target}
                    style={{
                       fontSize: "clamp(2.1rem, 3.2vw, 3.1rem)",
                      fontWeight: 300, color: "#ffffff", letterSpacing: "-0.055em", lineHeight: 0.9,
                    }}
                  >
                    0
                  </span>
                  <span className="page-title-font" style={{
                     fontSize: "clamp(2.1rem, 3.2vw, 3.1rem)",
                    fontWeight: 300, color: "#EC3338", letterSpacing: "-0.055em", lineHeight: 0.9,
                  }}>
                    {s.suffix}
                  </span>
                </div>
                <div className="home-stat-label" style={{
                  maxWidth: 240,
                  margin: "0 auto",
                   fontSize: "14px",
                  fontWeight: 500, letterSpacing: "0.18em",
                   lineHeight: 1.35,
                  textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ CLIENTS: partner logo marquee ══════════ */}
      <section
        id="clients"
        ref={clientsRef}
        data-testid="section-clients"
        aria-label="Our clients"
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(35,37,41,0.08)",
          padding: "clamp(52px, 6vw, 76px) 0",
        }}
      >
        <div className="clients-marquee" role="region" aria-label="Client logos">
          <div
            className="clients-track"
            style={{ display: "flex", alignItems: "center", width: "max-content" }}
          >
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                className="clients-loop-group"
                aria-hidden={copyIndex === 1 ? "true" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(32px, 4vw, 72px)",
                  paddingRight: "clamp(32px, 4vw, 72px)",
                }}
              >
                {clients.map((client, index) => (
                  <div
                    key={`${copyIndex}-${client.name}`}
                    className="client-logo-cell"
                    data-testid={copyIndex === 0 ? `card-client-${index}` : undefined}
                    style={{
                      width: "clamp(132px, 12vw, 180px)",
                      height: "112px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`${assetBase}${client.logo}`}
                      alt={copyIndex === 0 ? client.name : ""}
                      className="client-logo-image"
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: client.name === "Praj" ? "cover" : "contain",
                      }}
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
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 40px 56px", paddingLeft: "45px" }}
      >
        <div className="max-w-none mx-auto">
          <div className="grid items-start gap-16 lg:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">

            {/* Left: editorial */}
            <div className="lg:pl-[120px]">
              <div className="about-fade" style={{ marginBottom: "36px", textAlign: "center" }}>
                <span className="home-section-label font-montserrat text-[15px]" style={{
                  fontSize: "15px", fontWeight: 600,
                  letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
                  display: "block", marginBottom: "10px",
                }}>
                  WHO WE ARE
                </span>
                <h2 className="hp-section-title whitespace-normal font-montserrat lg:whitespace-nowrap" style={{
                  margin: "0 0 20px",
                  fontSize: "clamp(1.5rem, 1.9vw, 1.75rem)",
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
                <p style={{
                  fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                  fontWeight: 300, color: "rgba(17,24,39,0.8)",
                  lineHeight: 1.6, margin: "0 0 18px", letterSpacing: "-0.01em",
                }}>
                  “Bringing positive changes in the lives of the people around me is the biggest achievement I've had in my life.”
                </p>
                <div
                  className="font-montserrat text-[15px]"
                  style={{
                    color: "#232529",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "15px" }}>
                    <span style={{ color: "#232529" }}>M. B Nambiar</span>
                    <span style={{ color: "#949599", fontWeight: 500 }}> — </span>
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>Founder &amp; Chairman</span>
                  </span>
                  <span
                    style={{ display: "block", marginTop: "4px", color: "#949599", fontSize: "14px", fontWeight: 500 }}
                    className="text-[14px]">
                    Honoured with the prestigious{" "}
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>Nirman Ratna Lifetime Achievement Award</span>{" "}
                    by the BAI and the{" "}
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>Lifetime Achievement Award</span> by AESA
                  </span>
                </div>
              </div>

              <div className="about-fade">
                <p style={{
                  fontSize: "13.5px",
                  lineHeight: 1.85, color: "#949599", marginBottom: "28px",
                }}>
                  Millennium Engineers &amp; Contractors began in the 1980s as a small partnership, taken on by an engineer who wasn't content working for someone else. Four and a half decades on, that same commitment to quality and timely delivery has grown MECPL into one of Pune's most trusted structural engineering and construction names — ISO-certified, CRISIL-rated, and built on 8,000+ skilled hands.
                </p>

                <Link href="/about" data-testid="button-about-more">
                  <span
                    className="font-montserrat inline-flex items-center gap-2 cursor-pointer text-[15px]"
                    style={{
                      fontSize: "15px",
                      letterSpacing: "0.2em", color: "#EC3338",
                      textTransform: "none", fontWeight: 600,
                    }}
                  >
                    Read Our Full Story <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: founder portrait */}
            <div
              className="about-img h-[420px] lg:h-auto lg:self-stretch"
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
            <span className="home-section-label font-montserrat text-[15px]" style={{
              fontSize: "15px", fontWeight: 700,
              letterSpacing: "0.28em", color: "#EC3338", textTransform: "uppercase",
              display: "block", marginBottom: "18px",
            }}>
              WHAT WE DO
            </span>
            <h2 className="home-services-title font-montserrat text-white" style={{
              margin: 0, fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 0.98,
              textShadow: "0 3px 18px rgba(0,0,0,0.65)",
            }}>
              Our{" "}
              <span style={{ color: "#ffffff" }}>Services</span>
            </h2>
            <p
              className="page-subtitle-font mt-6 max-w-[700px] text-[18px]"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "15px",
                lineHeight: 1.7,
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
                  <h3 className={`home-service-title font-montserrat font-semibold tracking-[-0.025em] text-[#232529] transition-colors duration-300 sm:text-[18px] text-[15px] ${svc.icon === "residential" ? "home-service-title-residential" : ""}`}>
                    {svc.title}
                  </h3>
                  <p className="mt-2 font-montserrat text-[#4f545b] sm:text-[11px] text-[14px]">
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
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="font-montserrat font-semibold tracking-[0.25em] text-mecpl-red uppercase text-[15px]">
                  OUR PROJECTS
                </span>
              </div>
              <h2 className="font-montserrat text-4xl lg:text-5xl leading-none font-semibold text-mecpl-text uppercase tracking-tight m-0">
                Landmark Works
              </h2>
              <p
                className="font-montserrat text-[#949599] w-full max-w-none mx-auto m-0 text-center"
                style={{ whiteSpace: "nowrap", fontSize: "clamp(0.625rem, 2.6vw, 16px)" }}
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
                        className={`font-montserrat font-semibold leading-[1.12] tracking-[-0.02em] text-white transition-[font-size] duration-500 ${
                          isActive
                            ? "text-xl sm:text-2xl lg:text-[clamp(20px,2.25vw,30px)]"
                            : "text-[11px] sm:text-xs lg:text-[clamp(8px,0.62vw,9px)] text-balance"
                        }`}
                      >
                        {proj.name}
                      </h3>
                      <p
                        className={`mt-1 min-w-0 font-montserrat font-medium leading-[1.2] text-white/90 ${
                          isActive
                            ? "text-[11px] sm:text-xs lg:text-[13px]"
                            : "text-[10px] sm:text-[11px] lg:text-[clamp(7px,0.68vw,10px)]"
                        }`}
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
                  <span className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase">
                    View All 150+ Projects
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
          </div>
        </div>
      </section>
      {/* ══════════ 6. RISING AS WE SPEAK ══════════ */}
      <section
        id="rising-projects"
        data-testid="section-home-ongoing-projects"
        className="relative overflow-hidden bg-white"
        style={{ background: "#ffffff", padding: "0 0 128px" }}
      >
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-[38%] opacity-[0.055]" aria-hidden="true">
          <svg viewBox="0 0 540 260" className="h-full w-full" fill="none" stroke="#232529">
            <path d="M14 260V160l76-50v150M90 260V78l98 60v122M188 260V118l80-44 72 57v129M340 260V95l84-59 102 72v152" />
            <path d="M28 260v-86l47-30v116M110 260V116l56 34v110M210 260V139l54-31 52 40v112M365 260V112l57-40 79 56v132" />
          </svg>
        </div>

        <div
          className="relative w-full"
        >
          <div data-scroll-reveal="text" className="mb-10 px-6 text-center md:mb-12 md:px-10">
            <span className="home-section-label block font-montserrat text-[15px] font-semibold uppercase tracking-[0.3em] text-mecpl-red">
              RIGHT NOW
            </span>
            <h2 className="hp-section-title mt-3 font-montserrat text-mecpl-text font-medium">
              Rising As We Speak
            </h2>
            <p className="mx-auto mt-2 max-w-xl font-montserrat text-[#73767c] text-[18px]">
              Four project milestones and active works currently taking shape across Pune.
            </p>
          </div>

          <div
            data-scroll-reveal="image"
            className="relative grid items-center gap-10 lg:grid-cols-[1.65fr_0.95fr] lg:gap-14"
            style={{ background: "#e4e4e6" }}
          >
            <div className="group relative aspect-video overflow-hidden rounded-[5px] bg-[#d8d7d3] shadow-[0_15px_45px_rgba(35,37,41,0.08)]">
              <video
                key={risingProjectVideos[activeRisingProject].video}
                ref={risingVideoRef}
                controls
                muted
                playsInline
                preload="metadata"
                poster={posterFor(risingProjectVideos[activeRisingProject].video)}
                className="h-full w-full object-cover"
                aria-label={`${risingProjectVideos[activeRisingProject].name} construction progress video`}
              >
                <source src={`${assetBase}${risingProjectVideos[activeRisingProject].video}`} type="video/mp4" />
              </video>
            </div>

            <div className="relative">
              <article>
                <div className="-translate-y-2 mb-7 flex items-center">
                  <span className="font-montserrat text-[11px] font-semibold tracking-[0.16em] text-mecpl-red">
                    {String(activeRisingProject + 1).padStart(2, "0")}
                    <span className="ml-1 text-[#a7a8ab]">/ {String(risingProjectVideos.length).padStart(2, "0")}</span>
                  </span>
                </div>
                <p className="mb-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-mecpl-red">
                  {risingProjectVideos[activeRisingProject].name}
                </p>
                <h2 className="font-montserrat text-[clamp(2rem,3vw,2.7rem)] font-medium leading-[1.05] text-mecpl-text">
                  {risingProjectVideos[activeRisingProject].headline}
                </h2>
                <span className="mt-5 block h-0.5 w-10 bg-mecpl-red" />
                <p className="mt-6 max-w-sm font-montserrat text-[#696c71] text-[14px]">
                  {risingProjectVideos[activeRisingProject].description}
                </p>
                <Link
                  href="/projects"
                  className="mt-7 inline-flex items-center gap-4 border border-mecpl-red bg-mecpl-red px-5 py-3 font-montserrat font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-mecpl-dark hover:bg-mecpl-dark text-[12px]"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </article>
            </div>
            <div className="-mt-10 flex justify-end lg:absolute lg:bottom-[8px] lg:right-[5px] lg:z-10 lg:mt-0">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => setActiveRisingProject((current) => (current - 1 + risingProjectVideos.length) % risingProjectVideos.length)}
                className="rising-project-control flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-mecpl-dark/10 bg-white text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => setActiveRisingProject((current) => (current + 1) % risingProjectVideos.length)}
                className="rising-project-control -ml-px flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-mecpl-dark/10 bg-white text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════ 6. PEOPLE & SAFETY ══════════ */}
      <PeopleSafetySection />
      {/* ══════════ 7. TESTIMONIALS ══════════ */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        data-testid="section-testimonials"
        style={{
          background: "#232529",
          borderTop: "1px solid rgba(35,37,41,0.07)",
          padding: "96px 0 0",
          marginTop: "120px",
        }}
      >
        <div
          className="mx-auto grid gap-12 px-6 md:grid-cols-[0.72fr_1.6fr] md:gap-16 md:px-10"
          style={{
            width: "100%",
            background: "#232529",
          }}
        >
          <div data-scroll-reveal="text" className="flex flex-col pt-8 md:justify-between md:pt-10 lg:pl-[80px]" style={{ color: "#ffffff" }}>
            <div>
              <span className="home-section-label block font-montserrat font-semibold tracking-[0.2em] text-mecpl-red text-[15px]">
                CLIENT VOICES
              </span>
              <h2 className="hp-section-title mt-3 font-montserrat">
                What Our<br className="hidden md:block" /> Clients Say
              </h2>
              <p className="mt-5 max-w-sm font-montserrat text-[#c2c5cb] text-[18px]">
                Long-standing relationships are built on delivery, transparency and trust.
              </p>
            </div>
          </div>

          <div className="testi-card overflow-hidden border border-mecpl-dark/[0.08] bg-white">
            <div className="flex h-[400px] flex-col overflow-hidden bg-white px-7 py-9 sm:px-10 sm:py-11 md:px-14 md:py-12">
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="font-montserrat text-[76px] font-semibold leading-[0.72] text-mecpl-red md:text-[92px]">
                  “
                </span>
                <span className="font-montserrat text-[9px] tracking-[0.22em] text-mecpl-steel">
                  {String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <blockquote
                key={activeTestimonial}
                className="mt-5 max-w-3xl font-montserrat text-[clamp(1.1rem,2vw,1.65rem)] font-medium leading-[1.5] tracking-[-0.025em] text-mecpl-text md:mt-7 bg-[ffff]"
              >
                {testimonials[activeTestimonial].quote}
              </blockquote>

              <div className="mt-auto flex items-start gap-4 border-t border-mecpl-dark/10 pt-6">
                <span className="mt-2 h-0.5 w-8 shrink-0 bg-mecpl-red" />
                <div>
                  <div className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.08em] text-mecpl-text">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="mt-1 font-montserrat text-[10px] text-mecpl-steel">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid border-t border-mecpl-dark/[0.08] md:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={`${testimonial.name}-${index}`}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    aria-pressed={activeTestimonial === index}
                    className={`border-b border-mecpl-dark/[0.08] px-5 py-4 text-left font-montserrat transition-colors sm:border-b-0 sm:border-r ${
                      activeTestimonial === index
                        ? "bg-mecpl-dark text-white"
                        : "bg-white text-[#73767c] hover:bg-[#f5f4f1] hover:text-mecpl-text"
                    }`}
                  >
                    <span className="block text-[8px] tracking-[0.18em] opacity-50">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-1.5 block truncate text-[9px] font-semibold uppercase tracking-[0.08em]">
                      {testimonial.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end bg-white px-4 py-3">
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)}
                  className="testimonial-arrow-control flex h-10 w-10 items-center justify-center border border-mecpl-dark/10 text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}
                  className="testimonial-arrow-control -ml-px flex h-10 w-10 items-center justify-center border border-mecpl-dark/10 text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
