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
    heading: ["PEOPLE BEHIND", "THE BUILDING"],
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

const isoCertifications = [
  { standard: "ISO 9001:2015", detail: "Quality Management System", color: "#168455", markFilter: "hue-rotate(285deg) saturate(0.85)" },
  { standard: "ISO 14001:2015", detail: "Environmental Management System", color: "#175f9b", markFilter: "saturate(0.9)" },
  { standard: "ISO 45001:2018", detail: "Occupational Health & Safety Management System", color: "#bf3036", markFilter: "hue-rotate(125deg) saturate(1.35)" },
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
  { name: "Trump Tower",                 location: "Kalyani Nagar, Pune", type: "Panchshil Group",    image: "assets/projects/Trump-Tower.jpg" },
  { name: "Panchshil Highrise Towers",   location: "Wagholi, Pune",       type: "Panchshil Group",    image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { name: "Godrej Nurture",              location: "Mamurdi, Pune",       type: "Godrej Properties", image: "assets/projects/Godrej-Forest-grove.jpg" },
  { name: "EON Phase II",                location: "Kharadi, Pune",       type: "Panchshil Group",    image: "assets/projects/Eonwest.jpg" },
  { name: "Mahindra Electric Facility", location: "Chakan, Pune",        type: "Industrial",        image: "assets/projects/PRAJ-INDUSTRIES.png" },
  { name: "Kalpataru Jade Residences",  location: "Baner, Pune",         type: "Kalpataru",          image: "assets/projects/KRC-scaled-e1700730314593.jpg" },
];

const risingProjectVideos = [
  {
    name: "Riverfront Infrastructure",
    location: "Pune",
    video: "assets/video/rising-riverfront-infrastructure.mp4",
    description: "Aerial progress across a newly delivered river crossing and its surrounding infrastructure works.",
  },
  {
    name: "Concrete Pouring Milestone",
    location: "Pune",
    video: "assets/video/rising-concrete-pouring.mp4",
    description: "A major construction milestone documenting one lakh cubic metres of concrete pouring.",
  },
  {
    name: "Vantage Tower B",
    location: "Pune",
    video: "assets/video/rising-vantage-tower-b.mp4",
    description: "Panchshil Realty Vantage Tower B progressing with award-recognized international safety standards.",
  },
  {
    name: "Well Built Structure 2025",
    location: "Pune",
    video: "assets/video/rising-well-built-structure.mp4",
    description: "Construction progress recognized in the Well Built Structure Competition 2025 by the Builders Association of India, Pune.",
  },
];

const testimonials = [
  { quote: "MECPL is equipped with better infrastructure and well-qualified, experienced staff — capable of handling any type of project.", name: "Pride Properties", role: "Certificate of Testimony" },
  { quote: "We were particularly impressed by MECPL's professional expertise and interaction with our project managers — despite the site's unyielding terrain.", name: "Mahindra United World College", role: "Project Correspondence" },
  { quote: "Millennium Engineers & Contractors completed our Universal Temple project on time, with real professionalism and skilled staff.", name: "Mahindra United World College", role: "President, Ramakrishna Math" },
];

const clients = [
  { name: "Panchshil Group",      logo: "assets/clients/client-09-1.webp" },
  { name: "Godrej Properties",    logo: "assets/clients/client-12-1.webp" },
  { name: "K Raheja Corp",        logo: "assets/clients/client-17.webp"   },
  { name: "Kalpataru",            logo: "assets/clients/client-14.webp"   },
  { name: "Tata Consultancy",     logo: "assets/clients/client-06.webp"   },
  { name: "Gera Developers",      logo: "assets/clients/client-05.webp"   },
  { name: "Pride Builders",       logo: "assets/clients/client-15-1.webp" },
  { name: "Syntel International", logo: "assets/clients/omniactive.webp"  },
  { name: "Praj Industries",      logo: "assets/clients/client-13.webp"   },
  { name: "Mahindra",             logo: "assets/clients/vtp-realty.webp"  },
  { name: "Sahara India",         logo: "assets/clients/client-09-1.webp" },
  { name: "Cadbury India",        logo: "assets/clients/client-12-1.webp" },
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
        x: () => -(track.scrollWidth / 2),
        duration: 28, ease: "none", repeat: -1,
        onRepeat: () => gsap.set(track, { x: 0 }),
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
          background: "rgba(0,0,0,0.32)",
        }} />

        {/* TOP RIGHT: video counter + progress */}
        <div style={{
          position: "absolute", top: "100px", right: "40px", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px",
        }}>
          <div style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
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
          <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 40px" }}>
            {/* Constant label */}
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "11px",
                fontWeight: 500, color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.18em", textTransform: "uppercase",
                marginBottom: "14px",
              }}
              className="text-[14px]">
              Millennium Engineers &amp; Contractors Pvt. Ltd.
            </div>

            {/* Per-slide heading — re-mounts with key to trigger animation */}
            <h1 className="hp-banner-title page-title-font" key={videoIdx} style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
              {(heroSlides[videoIdx] ?? heroSlides[0]).heading.map((line, i) => (
                <div key={i} className="hp-banner-line text-[36px]" style={{
                  fontSize: videoIdx === 0 ? "36px" : "clamp(1.6rem, 4vw, 3.2rem)",
                  lineHeight: 1.15, color: "#ffffff",
                  whiteSpace: "nowrap",
                }}>
                  {line}
                </div>
              ))}
            </h1>

            {/* Per-slide subtitle */}
            <p className="page-subtitle-font text-[14px]" key={`sub-${videoIdx}`} style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "12px",
              fontWeight: 300, color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7, margin: "0 auto 28px", maxWidth: "460px",
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
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
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
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
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
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "8px",
                letterSpacing: "0.16em",
                lineHeight: 1.6,
                textTransform: "uppercase",
              }}
              className="text-[15px] font-semibold">
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
            fontFamily: "'Montserrat',sans-serif", fontSize: "7px",
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
      <section id="recognition" ref={recognitionRef} className="bg-[#f7f6f3] px-5 py-7 md:px-10 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <div className="grid min-w-[440px] grid-cols-4 md:min-w-0">
              {recognitionData.map((item, index) => (
                <div
                  key={item.title}
                  className={`rec-card flex min-h-[118px] flex-col items-center justify-center px-2 py-3 text-center ${
                    index > 0 ? "border-l border-mecpl-dark/[0.08]" : ""
                  }`}
                >
                  <div className="flex h-[50px] w-full items-center justify-center">
                    <img
                      src={`${assetBase}${item.image}`}
                      alt={item.title}
                      className="max-h-[48px] max-w-[90px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="rec-card-title mt-2 max-w-[150px] font-montserrat font-medium text-[#74777b]">
                    {item.title}
                  </h2>
                  <p className="mt-1 max-w-[150px] font-montserrat text-[8px] font-normal leading-[1.4] tracking-[0.01em] text-[#74777b]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ══════════ 2.5 STATS STRIP ══════════ */}
      <section
        ref={statsRef}
        data-testid="section-stats"
        style={{ background: "#232529", padding: "64px 40px" }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap items-stretch divide-x-0 divide-white/10 lg:flex-nowrap lg:divide-x">
            {stats.map((s, i) => (
              <div
                key={i}
                data-scroll-reveal="text"
                data-scroll-reveal-delay={String(i * 70)}
                className="w-1/2 flex-none lg:w-auto lg:flex-1"
                style={{ padding: "16px 28px", textAlign: "center" }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "2px", marginBottom: "8px" }}>
                  <span
                    className="stat-num"
                    data-target={s.target}
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                      fontWeight: 400, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1,
                    }}
                  >
                    0
                  </span>
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    fontWeight: 400, color: "#EC3338", lineHeight: 1,
                  }}>
                    {s.suffix}
                  </span>
                </div>
                <div className="home-stat-label" style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                  fontWeight: 600, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ 2.75 ISO CERTIFICATIONS ══════════ */}
      <section className="bg-[#f7f6f3] px-5 py-6 md:px-10 md:py-7" aria-label="ISO certifications">
        <div className="mx-auto grid max-w-4xl grid-cols-3">
          {isoCertifications.map((item, index) => (
            <div
              key={item.standard}
              className={`flex min-h-[112px] flex-col items-center justify-center px-2 py-3 text-center md:px-6 ${
                index > 0 ? "border-l border-mecpl-dark/[0.08]" : ""
              }`}
            >
              <div className="flex h-[48px] items-center justify-center">
                <img
                  src={`${assetBase}assets/recognition/iso-mark.png`}
                  alt=""
                  aria-hidden="true"
                  className="h-[42px] w-[52px] object-contain md:h-[46px] md:w-[58px]"
                  style={{ filter: `${item.markFilter} drop-shadow(0 2px 4px ${item.color}22)` }}
                  loading="lazy"
                />
              </div>
              <h2
                className="iso-card-title mt-2 font-montserrat font-semibold leading-tight"
                style={{ color: item.color }}
              >
                {item.standard}
              </h2>
              <p className="mt-1 max-w-[170px] font-montserrat text-[6px] font-medium leading-[1.35] text-[#74777b] md:text-[8px]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* ══════════ 3. ABOUT — Storytelling ══════════ */}
      <section
        id="about"
        ref={aboutRef}
        data-testid="section-about"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 40px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:items-stretch">

            {/* Left: editorial */}
            <div>
              <div className="about-fade" style={{ marginBottom: "36px", textAlign: "center" }}>
                <span className="home-section-label font-montserrat text-[15px]" style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "15px", fontWeight: 600,
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
                  fontFamily: "'Montserrat',sans-serif",
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
                  <span style={{ display: "block", marginTop: "4px", color: "#949599", fontSize: "10px", fontWeight: 500 }}>
                    Honored with the prestigious AESA, Pune (Architects and Engineers Association){" "}
                    <span style={{ color: "#EC3338", fontWeight: 600 }}>Lifetime Achievement Award</span>
                  </span>
                </div>
              </div>

              <div className="about-fade">
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px",
                  lineHeight: 1.85, color: "#949599", marginBottom: "28px",
                }}>
                  Millennium Engineers &amp; Contractors began in the 1980s as a small partnership, taken on by an engineer who wasn't content working for someone else. Four and a half decades on, that same commitment to quality and timely delivery has grown MECPL into one of Pune's most trusted structural engineering and construction names — ISO-certified, CRISIL-rated, and built on 8,000+ skilled hands.
                </p>

                <Link href="/about" data-testid="button-about-more">
                  <span
                    className="font-montserrat inline-flex items-center gap-2 cursor-pointer text-[12px]"
                    style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
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
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${assetBase}assets/services-crane-background.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          padding: "100px 0 120px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: "linear-gradient(180deg, rgba(12,17,23,0.55) 0%, rgba(12,17,23,0.68) 48%, rgba(12,17,23,0.78) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10">
          <div style={{ marginBottom: "56px", textAlign: "center" }}>
            <span className="home-section-label font-montserrat text-[15px]" style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "15px", fontWeight: 600,
              letterSpacing: "0.2em", color: "#EC3338", textTransform: "uppercase",
              display: "block", marginBottom: "10px",
            }}>
              WHAT WE DO
            </span>
            <h2 className="hp-section-title font-montserrat text-white" style={{
              margin: 0, fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em"
            }}>
              Our <span style={{ color: "#EC3338" }}>Services</span>
            </h2>
            <p
              className="page-subtitle-font"
              style={{
                maxWidth: "720px",
                margin: "18px auto 24px",
                color: "rgba(255,255,255,0.76)",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "13.5px",
                lineHeight: 1.7,
              }}
            >
              End-to-end construction and execution across residential, commercial, institutional, industrial and infrastructure projects.
            </p>
            <div style={{ width: "40px", height: "2px", background: "#EC3338", margin: "0 auto" }} />
          </div>

          {/* 3×2 architectural service grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => {
              return (
                <div
                  key={svc.num}
                  className="svc-grid-card group relative flex min-h-[290px] flex-col justify-between overflow-hidden px-8 py-9 transition-all duration-300"
                  data-testid={`card-service-${i}`}
                  style={{
                    background: "rgba(20, 25, 33, 0.58)",
                    border: "1px solid rgba(255,255,255,0.24)",
                    borderRadius: "12px",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                  }}
                >
                  {/* Subtle technical line-art background lower-right */}
                  <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.035] transition-opacity duration-500 group-hover:opacity-[0.065]">
                    {i % 3 === 0 && (
                      <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#ffffff" className="translate-x-6 translate-y-6">
                        <path d="M10,90 L90,90 M20,90 L20,30 L50,10 L80,30 L80,90 M35,90 L35,60 L65,60 L65,90" strokeWidth="0.5" />
                        <path d="M25,45 L45,45 M25,55 L45,55" strokeWidth="0.5" strokeDasharray="1 1" />
                        <path d="M55,45 L75,45 M55,55 L75,55" strokeWidth="0.5" strokeDasharray="1 1" />
                      </svg>
                    )}
                    {i % 3 === 1 && (
                      <svg width="240" height="240" viewBox="0 0 100 100" fill="none" stroke="#ffffff" className="translate-x-8 translate-y-8">
                        <path d="M10,90 L90,90 M15,90 L15,40 L35,40 L35,90 M40,90 L40,20 L60,20 L60,90 M65,90 L65,50 L85,50 L85,90" strokeWidth="0.5" />
                        <path d="M45,30 L55,30 M45,40 L55,40 M45,50 L55,50 M45,60 L55,60 M45,70 L55,70" strokeWidth="0.5" />
                      </svg>
                    )}
                    {i % 3 === 2 && (
                      <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#ffffff" className="translate-x-2 translate-y-4">
                        <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
                        <path d="M50,10 L50,90 M10,50 L90,50" strokeWidth="0.5" />
                        <path d="M21.7,21.7 L78.3,78.3 M21.7,78.3 L78.3,21.7" strokeWidth="0.5" />
                      </svg>
                    )}
                  </div>

                  {/* Top content */}
                  <div className="relative z-10 flex flex-col items-start">
                    <ServiceLineIcon
                      type={svc.icon}
                      className="mb-6 h-10 w-10 text-[#EC3338] transition-transform duration-500 group-hover:-translate-y-1"
                    />
                    <h2 className="font-montserrat text-[17px] font-semibold text-white tracking-wide">
                      {svc.title}
                    </h2>
                    <p className="mt-4 font-montserrat text-[13px] leading-[1.65] text-[#9a9ca0]">
                      {svc.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ══════════ 5. PROJECTS — Expanding Structural Matrix ══════════ */}
      <section
        id="featured-projects"
        data-testid="section-projects"
        className="bg-white py-24 lg:py-32 border-t border-mecpl-dark/10 relative overflow-hidden"
      >
        {/* Engineering grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(35, 37, 41, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(35, 37, 41, 0.1) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }} />

        <div className="max-w-[96rem] mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
            <div data-scroll-reveal="text">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-mecpl-red"></span>
                <span className="font-montserrat font-semibold tracking-[0.25em] text-mecpl-red uppercase text-[15px]">
                  OUR PROJECTS
                </span>
              </div>
              <h2 className="font-montserrat text-4xl lg:text-5xl leading-none font-semibold text-mecpl-text uppercase tracking-tight m-0">
                Landmark Works
              </h2>
              <p className="font-inter lg:text-[15px] text-[#949599] max-w-md m-0 text-[18px]">
                A selection of the structures MECPL has delivered across Pune.
              </p>
            </div>

            <div className="hidden md:block">
              <Link href="/projects" data-testid="button-all-projects">
                <span className="group inline-flex items-center justify-center gap-4 border border-mecpl-red bg-mecpl-red text-white px-8 py-4 cursor-pointer transition-colors hover:border-mecpl-dark hover:bg-mecpl-dark">
                  <span className="font-montserrat font-semibold tracking-[0.2em] uppercase text-[12px]">
                    View All 150+ Projects
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* The Expanding Matrix */}
          <div className="relative w-full h-[700px] lg:h-[75vh] min-h-[600px] max-h-[850px] bg-mecpl-dark/10 p-[1px] flex flex-col lg:flex-row gap-[1px]">
            {/* Corner crosshairs */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-mecpl-dark pointer-events-none z-10" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-mecpl-dark pointer-events-none z-10" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-mecpl-dark pointer-events-none z-10" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-mecpl-dark pointer-events-none z-10" />

            {projects.map((proj, i) => {
              const isActive = activeProj === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveProj(i)}
                  onClick={() => setActiveProj(i)}
                  className={`group relative overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none cursor-pointer ${
                    isActive
                      ? 'flex-[1_1_100%] lg:flex-[1_1_60%]'
                      : 'flex-[0_0_72px] lg:flex-[0_0_8%]'
                  }`}
                >
                  {/* The Background Image */}
                  <div className={`absolute inset-0 bg-mecpl-dark transition-opacity duration-700 motion-reduce:transition-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                      src={`${assetBase}${proj.image}`}
                      alt={proj.name}
                      className={`w-full h-full object-cover transition-all duration-1000 motion-reduce:transition-none ${isActive ? 'scale-100 opacity-90' : 'scale-110 opacity-0'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  </div>

                  {/* Inactive State Content */}
                  <div className={`absolute inset-0 flex flex-row lg:flex-col items-center justify-between lg:justify-start px-5 py-0 lg:py-10 lg:px-0 transition-opacity duration-300 motion-reduce:transition-none ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}`}>

                    {/* Mobile: Group Number and Name on left */}
                    <div className="flex items-center gap-4 lg:hidden w-full overflow-hidden pr-4">
                      <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] text-mecpl-red flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-montserrat text-[12px] font-semibold tracking-widest text-mecpl-text uppercase truncate">
                        {proj.name}
                      </span>
                    </div>

                    {/* Desktop: Number at top */}
                    <span className="hidden lg:block font-montserrat text-[11px] font-semibold tracking-[0.2em] text-mecpl-steel group-hover:text-mecpl-red transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Desktop: Vertical Name */}
                    <div className="hidden lg:flex flex-1 items-center justify-center relative w-full">
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-mecpl-steel/20 group-hover:bg-mecpl-red/30 transition-colors" />
                      <span
                        className="font-montserrat text-[14px] xl:text-[16px] font-semibold tracking-[0.15em] text-mecpl-text uppercase whitespace-nowrap group-hover:text-mecpl-red transition-colors z-10 bg-white py-6"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {proj.name}
                      </span>
                    </div>

                    <div className="lg:hidden text-mecpl-steel group-hover:text-mecpl-red transition-colors flex-shrink-0">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Active State Content */}
                  <div className={`absolute inset-0 flex flex-col justify-end p-6 lg:p-10 xl:p-12 transition-all duration-700 motion-reduce:transition-none transform ${isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-8 opacity-0 pointer-events-none'}`}>

                     {/* Top Engineering Stamp */}
                     <div className="hidden lg:flex absolute top-8 left-10 items-center gap-3">
                       <div className="w-2 h-2 bg-mecpl-red" />
                       <span className="font-montserrat text-[9px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                         MECPL_PROJ_{String(i + 1).padStart(2, "0")}
                       </span>
                     </div>

                     <div className="flex items-center gap-4 mb-4">
                       <span className="font-montserrat text-[12px] xl:text-[14px] font-semibold tracking-widest text-mecpl-red">
                         {String(i + 1).padStart(2, "0")}
                       </span>
                       <div className="w-12 xl:w-16 h-[1px] bg-white/30" />
                       <span className="font-montserrat text-[9px] xl:text-[10px] font-semibold tracking-[0.2em] text-mecpl-steel uppercase">
                         {proj.type}
                       </span>
                     </div>

                     <h2 className="font-montserrat text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold uppercase tracking-tight text-white mb-3 lg:mb-4 leading-none">
                       {proj.name}
                     </h2>

                     <p className="font-inter text-[13px] md:text-sm xl:text-base text-mecpl-steel flex items-center gap-3 mb-8 lg:mb-10 max-w-md">
                       <span className="w-1 h-1 bg-mecpl-red rounded-full" />
                       {proj.location}
                     </p>

                     <div className="mt-auto">
                       <Link href="/projects" data-testid={`button-proj-${i}`}>
                         <span className="inline-flex items-center gap-4 text-white hover:text-mecpl-red transition-colors cursor-pointer group/btn">
                           <span className="font-montserrat text-[9px] xl:text-[10px] font-semibold tracking-[0.2em] uppercase">
                             View Project
                           </span>
                           <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-mecpl-red transition-colors">
                             <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                           </div>
                         </span>
                       </Link>
                     </div>
                  </div>

                  {/* Hover Outline */}
                  <div className="absolute inset-0 border-[1.5px] border-transparent group-hover:border-mecpl-red/50 transition-colors pointer-events-none z-20" />
                </div>
              )
            })}
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
        className="relative overflow-hidden bg-[transparent]"
        style={{ background: "#ffffff", padding: "88px 0 104px" }}
      >
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-[38%] opacity-[0.055]" aria-hidden="true">
          <svg viewBox="0 0 540 260" className="h-full w-full" fill="none" stroke="#232529">
            <path d="M14 260V160l76-50v150M90 260V78l98 60v122M188 260V118l80-44 72 57v129M340 260V95l84-59 102 72v152" />
            <path d="M28 260v-86l47-30v116M110 260V116l56 34v110M210 260V139l54-31 52 40v112M365 260V112l57-40 79 56v132" />
          </svg>
        </div>

        <div
          className="relative mx-auto"
          style={{ width: "min(1460px, calc(100% - clamp(24px, 4vw, 32px)))" }}
        >
          <div data-scroll-reveal="text" className="mb-10 text-center md:mb-12">
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
            className="grid items-center gap-10 lg:grid-cols-[1.65fr_0.95fr] lg:gap-14"
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
                className="h-full w-full object-cover"
                aria-label={`${risingProjectVideos[activeRisingProject].name} construction progress video`}
              >
                <source src={`${assetBase}${risingProjectVideos[activeRisingProject].video}`} type="video/mp4" />
              </video>
            </div>

            <article className="relative">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-montserrat text-[11px] font-semibold tracking-[0.16em] text-mecpl-red">
                  {String(activeRisingProject + 1).padStart(2, "0")}
                  <span className="ml-1 text-[#a7a8ab]">/ {String(risingProjectVideos.length).padStart(2, "0")}</span>
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => setActiveRisingProject((current) => (current - 1 + risingProjectVideos.length) % risingProjectVideos.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mecpl-text shadow-[0_4px_15px_rgba(35,37,41,0.08)] transition-colors hover:bg-mecpl-red hover:text-white"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => setActiveRisingProject((current) => (current + 1) % risingProjectVideos.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mecpl-text shadow-[0_4px_15px_rgba(35,37,41,0.08)] transition-colors hover:bg-mecpl-red hover:text-white"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
              <h2 className="font-montserrat text-[clamp(2rem,3vw,2.7rem)] font-medium leading-none text-mecpl-text">
                {risingProjectVideos[activeRisingProject].name}
              </h2>
              <p className="mt-4 font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8c8e92]">
                Live construction progress · {risingProjectVideos[activeRisingProject].location}
              </p>
              <span className="mt-5 block h-0.5 w-10 bg-mecpl-red" />
              <p className="mt-6 max-w-sm font-montserrat text-[12px] leading-6 text-[#696c71]">
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
        </div>
      </section>
      {/* ══════════ 6. PEOPLE & SAFETY ══════════ */}
      <PeopleSafetySection />
      {/* ══════════ 7. TESTIMONIALS ══════════ */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        data-testid="section-testimonials"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(35,37,41,0.07)", padding: "96px 0" }}
      >
        <div
          className="mx-auto grid gap-12 px-6 md:grid-cols-[0.72fr_1.6fr] md:gap-16 md:px-10"
          style={{
            width: "min(1460px, calc(100% - clamp(24px, 4vw, 32px)))",
            background: "#e4e4e6",
          }}
        >
          <div data-scroll-reveal="text" className="flex flex-col pt-8 md:justify-between md:pt-10">
            <div>
              <span className="home-section-label block font-montserrat font-semibold tracking-[0.2em] text-mecpl-red text-[15px]">
                CLIENT VOICES
              </span>
              <h2 className="hp-section-title mt-3 font-montserrat">
                What Our<br className="hidden md:block" /> Clients Say
              </h2>
              <p className="mt-5 max-w-sm font-montserrat text-[#73767c] text-[20px]">
                Long-standing relationships are built on delivery, transparency and trust.
              </p>
            </div>
          </div>

          <div className="testi-card overflow-hidden border border-mecpl-dark/[0.08] bg-transparent">
            <div className="flex h-[400px] flex-col overflow-hidden bg-transparent px-7 py-9 sm:px-10 sm:py-11 md:px-14 md:py-12">
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="font-serif text-[76px] font-semibold leading-[0.72] text-mecpl-red md:text-[92px]">
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
                  className="flex h-10 w-10 items-center justify-center border border-mecpl-dark/10 text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}
                  className="-ml-px flex h-10 w-10 items-center justify-center border border-mecpl-dark/10 text-mecpl-text transition-colors hover:border-mecpl-red hover:bg-mecpl-red hover:text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════ 8. CLIENTS ══════════ */}
      <section
        id="clients"
        ref={clientsRef}
        data-testid="section-clients"
        style={{
          background: "#232529",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "96px 0 120px",
        }}
      >
        {/* Heading */}
        <div data-scroll-reveal="text" style={{ padding: "0 40px", marginBottom: "36px", textAlign: "center" }}>
          <span className="home-section-label font-montserrat text-[15px] text-[color:var(--mecpl-red)]" style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "15px", fontWeight: 600,
              letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
            display: "block", marginBottom: "10px",
          }}>
             OUR CLIENTS
          </span>
           <h2 className="hp-section-title font-montserrat" style={{
             margin: 0,
              color: "#ffffff",
           }}>
            Trusted Partners
          </h2>
          <p className="page-subtitle-font text-[18px]" style={{
            maxWidth: "620px",
            margin: "14px auto 0",
              color: "rgba(255,255,255,0.5)",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "13px",
            lineHeight: 1.7,
          }}>
             Built on trusted relationships with the teams shaping India&apos;s future.
          </p>
        </div>

        {/* Single GSAP ticker */}
        <div style={{
          overflow: "hidden",
          margin: 0,
          padding: "12px 0 0",
          background: "#232529",
        }}>
          <div className="clients-track" style={{ display: "flex", alignItems: "center", gap: "18px", width: "max-content" }}>
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                data-testid={i < clients.length ? `card-client-${i}` : undefined}
                style={{
                   width: "clamp(210px, 21vw, 420px)",
                   height: "clamp(126px, 10vw, 160px)",
                   flexShrink: 0,
                  background: "#ffffff", border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "10px", display: "flex",
                    alignItems: "center", justifyContent: "center", padding: "24px 34px",
                }}
              >
                <img src={`${assetBase}${c.logo}`} alt={c.name}
                   style={{ maxWidth: "100%", maxHeight: "72px", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
