import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import PeopleSafetySection from "../components/PeopleSafetySection";
import {
  Award,
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Factory,
  GraduationCap,
  Landmark,
  PanelsTopLeft,
  Play,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── TYPES ──────────────────────────────────────────────────────── */
/* ─── DATA ───────────────────────────────────────────────────────── */
const heroVideos = [
  "assets/video/banner-video-1.mp4",
  "assets/video/banner-video-title2.mp4",
  "assets/video/banner-video-title3b.mp4",
  "assets/video/banner-video-4.mp4",
];

const heroSlides = [
  {
    heading: ["QUALITY YOU CAN SEE.", "SAFETY YOU CAN RELY ON."],
    subtitle: "A 3,000-strong team that treats every site like it's their own.",
  },
  {
    heading: ["TO BUILD IS A", "FORCE WITHIN US"],
    subtitle: "We're Millennium Engineers & Contractors — a Pune-based construction company that turns ambitious ideas into buildings people trust. For 45 years, that's simply what we do.",
  },
  {
    heading: ["45 YEARS OF", "BUILDING TRUST"],
    subtitle: "ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018 · CRISIL BBB / POSITIVE",
  },
  {
    heading: ["RECOGNISED FOR", "BUILDING BETTER"],
    subtitle: "Recognised as one of India's Small Giants, SME 100, and Iconic Brand of the Year.",
  },
];

const stats = [
  { target: 45,  suffix: "+",   label: "Years of Legacy"             },
  { target: 150, suffix: "+",   label: "Projects Delivered"           },
  { target: 900, suffix: "+Cr", label: "Revenue"          },
  { target: 30,  suffix: "+",   label: "Ongoing Projects" },
];

const recognitionData = [
  { title: "India's Small Giants Season", detail: "NDTV PROFIT", icon: Trophy },
  { title: "Winner of SME 100 Award 2017", detail: "SME FORUM", icon: Award },
  { title: "Iconic CRP", detail: "Industry Recognition", icon: BadgeCheck },
  { title: "CRISIL BBB / Stable", detail: "Financial Rating", icon: ShieldCheck },
];

const services = [
  { num: "01", title: "Civil & Structural Construction", desc: "Foundation to superstructure — RCC framework, core & shell, structural finishing.", icon: Landmark },
  { num: "02", title: "Interiors Projects", desc: "Extending our RCC expertise into B2B doors and modular furniture solutions for commercial, institutional and hospitality spaces.", icon: PanelsTopLeft },
  { num: "03", title: "Industrial Projects", desc: "Factories, R&D centres and process plants engineered for heavy operational load.", icon: Factory },
  { num: "04", title: "Residential Projects", desc: "Highrise and township construction built for scale, safety and speed.", icon: Building2 },
  { num: "05", title: "Institutional Projects", desc: "Schools, colleges and research campuses delivered to exacting specification.", icon: GraduationCap },
  { num: "06", title: "Project Management", desc: "Schedule, cost and quality control across every stakeholder and site.", icon: ClipboardCheck },
];

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
    name: "B94",
    location: "Pune",
    video: "assets/video/b94.mp4",
    poster: "assets/projects/43PD-1-scaled.jpg",
    description: "A thoughtfully designed residential space crafted for modern living, taking shape in the heart of Pune.",
  },
  {
    name: "K57 Raheja",
    location: "Pune",
    video: "assets/video/k57-raheja.mp4",
    poster: "assets/projects/Raheja-Vistas-scaled.jpg",
    description: "A landmark development progressing with disciplined engineering, quality execution and close attention to every detail.",
  },
  {
    name: "Riverdale Project",
    location: "Pune",
    video: "assets/video/riverdale-project.mp4",
    poster: "assets/projects/Atlantic.png",
    description: "Contemporary urban construction delivered through careful planning, strong site coordination and proven technical expertise.",
  },
];

const testimonials = [
  { quote: "MECPL is equipped with better infrastructure and well-qualified, experienced staff — capable of handling any type of project.", name: "Pride Properties", role: "Certificate of Testimony" },
  { quote: "We were particularly impressed by MECPL's professional expertise and interaction with our project managers — despite the site's unyielding terrain.", name: "Mahindra United World College", role: "Project Correspondence" },
  { quote: "Millennium Engineers & Contractors completed our Universal Temple project on time, with real professionalism and skilled staff.", name: "Swami Bhaumananda", role: "President, Ramakrishna Math" },
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const assetBase = import.meta.env.BASE_URL;

  const heroSectionRef  = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroTagRef      = useRef<HTMLElement>(null);
  const heroSubRef      = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLElement>(null);
  const aboutRef        = useRef<HTMLElement>(null);
  const servicesRef     = useRef<HTMLElement>(null);
  const projTrackRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const clientsRef      = useRef<HTMLElement>(null);
  const recognitionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!["recognition", "about", "services", "rising-projects", "people-safety", "testimonials", "clients"].includes(targetId)) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
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

  /* ── SERVICES: card stagger ── */
  useEffect(() => {
    const sec = servicesRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = sec.querySelectorAll<HTMLElement>(".svc-grid-card");
        gsap.from(Array.from(cards), {
          y: 50, opacity: 0, duration: 0.75, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 60%", toggleActions: "play none none none" },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── PROJECTS: infinite ticker (same pattern as clients) ── */
  useEffect(() => {
    const track = projTrackRef.current;
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth / 2),
        duration: 36,
        ease: "none",
        repeat: -1,
        onRepeat: () => gsap.set(track, { x: 0 }),
      });
      const pause = () => tween.pause();
      const play  = () => tween.play();
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", play);
      return () => {
        track.removeEventListener("mouseenter", pause);
        track.removeEventListener("mouseleave", play);
      };
    });
    return () => mm.revert();
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
            <div style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "11px",
              fontWeight: 500, color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.18em", textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Millennium Engineers &amp; Contractors Pvt. Ltd.
            </div>

            {/* Per-slide heading — re-mounts with key to trigger animation */}
            <h1 className="hp-banner-title page-title-font" key={videoIdx} style={{ margin: "0 0 16px", animation: "heroSlideIn 0.7s ease forwards" }}>
              {(heroSlides[videoIdx] ?? heroSlides[0]).heading.map((line, i) => (
                <div key={i} className="hp-banner-line" style={{
                  fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                  lineHeight: 1.15, color: "#ffffff",
                  whiteSpace: "nowrap",
                }}>
                  {line}
                </div>
              ))}
            </h1>

            {/* Per-slide subtitle */}
            <p className="page-subtitle-font" key={`sub-${videoIdx}`} style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "12px",
              fontWeight: 300, color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7, margin: "0 auto 28px", maxWidth: "460px",
              animation: "heroSlideIn 0.7s ease forwards",
            }}>
              {(heroSlides[videoIdx] ?? heroSlides[0]).subtitle}
            </p>

            {/* Constant buttons */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/completed-projects" data-testid="button-hero-projects">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#EC3338", color: "#ffffff",
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                    padding: "14px 32px", cursor: "pointer",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#232529")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#EC3338")}
                >
                  EXPLORE OUR WORK <ArrowRight size={11} />
                </span>
              </Link>
              <Link href="/about">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    border: "1px solid rgba(255,255,255,0.55)", color: "#ffffff",
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                    padding: "13px 28px", cursor: "pointer",
                  }}
                >
                  WATCH OUR STORY <ArrowRight size={11} />
                </span>
              </Link>
            </div>
            <div style={{
              marginTop: "22px",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "8px",
              letterSpacing: "0.16em",
              lineHeight: 1.6,
              textTransform: "uppercase",
            }}>
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
      {/* ══════════ 2. STATS STRIP ══════════ */}
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
      {/* ══════════ 2.5 RECOGNITION ══════════ */}
      <section id="recognition" ref={recognitionRef} style={{ padding: "48px 40px", background: "#f5f4f1" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
            {recognitionData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rec-card flex min-h-[148px] flex-col items-center justify-start px-4 text-center sm:border-l sm:border-black/10 sm:first:border-l-0"
                >
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_3px_14px_rgba(35,37,41,0.06)]">
                    <Icon aria-hidden="true" size={34} strokeWidth={1.45} className="text-[#9C7A32]" />
                  </div>
                  <h3 className="mt-5 max-w-[150px] font-montserrat text-[11px] font-medium leading-[1.45] text-[#62656a]">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-[150px] font-montserrat text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9a9ca0]">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
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
                <span className="home-section-label font-montserrat" style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
                  letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
                  display: "block", marginBottom: "10px",
                }}>
                  WHO WE ARE
                </span>
                <h3 className="hp-section-title whitespace-normal font-montserrat lg:whitespace-nowrap" style={{
                  margin: "0 0 20px",
                  fontSize: "clamp(1.5rem, 1.9vw, 1.75rem)",
                }}>
                  From a ₹2 Lakh Beginning to ₹900+ Cr
                </h3>
                <div style={{ width: "40px", height: "3px", background: "#EC3338", margin: "0 auto" }} />
              </div>

              {/* Clip-path wipe pull-quote */}
              <div
                className="about-quote"
                style={{
                  borderLeft: "3px solid #C41E3A",
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
                  className="font-montserrat"
                  style={{
                    color: "#232529",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textAlign: "left",
                    textTransform: "uppercase",
                  }}
                >
                  Mr. M.B. Nambiar <span style={{ color: "#949599", fontWeight: 500 }}>— Founder &amp; Chairman</span>
                </div>
              </div>

              <div className="about-fade">
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px",
                  lineHeight: 1.85, color: "#949599", marginBottom: "28px",
                }}>
                  Millennium Engineers &amp; Contractors began in the 1980s as a small partnership, taken on by an engineer who wasn't content working for someone else. Four and a half decades on, that same commitment to quality and timely delivery has grown MECPL into one of Pune's most trusted structural engineering and construction names — ISO-certified, CRISIL-rated, and built on 8,000+ skilled hands.
                </p>

                <div className="flex flex-wrap gap-2" style={{ marginBottom: "32px" }}>
                  {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "CRISIL BBB / POSITIVE"].map(cert => (
                    <span key={cert} style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#232529", border: "1px solid rgba(35,37,41,0.12)",
                      padding: "5px 12px", borderRadius: "2px",
                    }}>
                      {cert}
                    </span>
                  ))}
                </div>

                <Link href="/about" data-testid="button-about-more">
                  <span
                    className="font-montserrat inline-flex items-center gap-2 cursor-pointer"
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
        ref={servicesRef}
        data-testid="section-services"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 0" }}
      >
        <div className="max-w-7xl mx-auto px-10">
          <div style={{ marginBottom: "56px", textAlign: "center" }}>
            <span className="home-section-label font-montserrat" style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
              display: "block", marginBottom: "10px",
            }}>
              WHAT WE DO
            </span>
            <h3 className="hp-section-title font-montserrat" style={{
              margin: 0,
            }}>
              OUR SERVICES
            </h3>
            <p
              className="page-subtitle-font"
              style={{
                maxWidth: "760px",
                margin: "16px auto 0",
                color: "#73767c",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              End-to-end structural and civil execution — from foundation to finishing, across residential, commercial and industrial scale.
            </p>
          </div>

          {/* 3×2 architectural service grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.num}
                  className="svc-grid-card min-h-[220px] border border-black/[0.07] bg-[#f5f4f1] px-7 py-8 transition-colors hover:bg-[#ecebe8] md:px-9 md:py-9"
                  data-testid={`card-service-${i}`}
                >
                  <Icon
                    aria-hidden="true"
                    className="text-[#232529]"
                    size={25}
                    strokeWidth={1.35}
                  />
                  <h4 className="mt-4 font-montserrat text-[14px] font-semibold leading-snug text-[#232529]">
                    {svc.title}
                  </h4>
                  <p className="mt-2 max-w-[320px] font-montserrat text-[11px] leading-[1.75] text-[#35373b]">
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ══════════ 5. PROJECTS — Horizontal carousel ══════════ */}
      <section
        data-testid="section-projects"
        style={{ background: "#232529", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "80px" }}
      >
        {/* Header row */}
        <div className="max-w-7xl mx-auto" data-scroll-reveal="text" style={{ padding: "0 40px", marginBottom: "48px", textAlign: "center" }}>
          <span className="home-section-label font-montserrat" style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
                 letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
            display: "block", marginBottom: "10px",
          }}>
            OUR PROJECTS
          </span>
          <h3 className="hp-section-title font-montserrat" style={{
            margin: 0, color: "#ffffff",
          }}>
            Landmark Works
          </h3>
          <p className="page-subtitle-font" style={{
            maxWidth: "620px",
            margin: "16px auto 0",
            color: "rgba(255,255,255,0.58)",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "13px",
            lineHeight: 1.7,
          }}>
            A selection of the structures MECPL has delivered across Pune.
          </p>
        </div>

        {/* Infinite ticker — hover to pause */}
        <div style={{ overflow: "hidden" }}>
          <div
            ref={projTrackRef}
            style={{ display: "flex", gap: "20px", width: "max-content", willChange: "transform" }}
          >
            {[...projects, ...projects].map((proj, i) => (
              <div
                key={i}
                style={{ width: "400px", flexShrink: 0 }}
              >
                {/* Text above image */}
                <div style={{ paddingBottom: "20px", paddingRight: "16px" }}>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                    letterSpacing: "0.24em", color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase", marginBottom: "10px",
                  }}>
                    {String((i % projects.length) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                  <div
                    className="project-card-title font-montserrat font-semibold"
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "1.25rem", fontWeight: 600,
                      color: "#ffffff",
                      lineHeight: 1.15, textTransform: "uppercase",
                      letterSpacing: "-0.01em", marginBottom: "10px",
                    }}
                  >
                    {proj.name}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                    color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}>
                    {proj.location}&nbsp;·&nbsp;{proj.type}
                  </div>
                </div>

                {/* Image */}
                <div style={{ height: "500px", overflow: "hidden" }}>
                  <img
                    src={proj.image}
                    alt={proj.name}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover", display: "block",
                      transition: "transform 0.6s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <div data-scroll-reveal="text" style={{ padding: "48px 48px 64px", textAlign: "center" }}>
          <Link href="/completed-projects" data-testid="button-all-projects">
            <span
              className="home-section-cta font-montserrat inline-flex items-center gap-2 cursor-pointer"
              style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                letterSpacing: "0.2em", color: "#EC3338",
                textTransform: "none", fontWeight: 600,
                borderBottom: "1px solid rgba(236,51,56,0.55)", paddingBottom: "5px",
              }}
            >
              View All 150+ Projects <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </section>
      {/* ══════════ 6. RISING AS WE SPEAK ══════════ */}
      <section
        id="rising-projects"
        data-testid="section-home-ongoing-projects"
        className="relative overflow-hidden"
        style={{ background: "#f8f7f4", padding: "88px 40px 104px" }}
      >
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-[38%] opacity-[0.055]" aria-hidden="true">
          <svg viewBox="0 0 540 260" className="h-full w-full" fill="none" stroke="#232529">
            <path d="M14 260V160l76-50v150M90 260V78l98 60v122M188 260V118l80-44 72 57v129M340 260V95l84-59 102 72v152" />
            <path d="M28 260v-86l47-30v116M110 260V116l56 34v110M210 260V139l54-31 52 40v112M365 260V112l57-40 79 56v132" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div data-scroll-reveal="text" className="mb-10 text-center md:mb-12">
            <span className="home-section-label inline-flex items-center gap-4 font-montserrat text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[#EC3338] before:h-px before:w-12 before:bg-black/10 after:h-px after:w-12 after:bg-black/10">
              RIGHT NOW
            </span>
            <h3 className="hp-section-title mt-3 font-montserrat text-[#232529]">
              Rising As We Speak
            </h3>
            <p className="mx-auto mt-2 max-w-xl font-montserrat text-[12px] leading-6 text-[#73767c]">
              Three of the projects currently under construction across Pune.
            </p>
          </div>

          <div data-scroll-reveal="image" className="grid items-center gap-10 lg:grid-cols-[1.65fr_0.95fr] lg:gap-14">
            <div className="group relative aspect-video overflow-hidden rounded-[5px] bg-[#d8d7d3] shadow-[0_15px_45px_rgba(35,37,41,0.08)]">
              <video
                key={risingProjectVideos[activeRisingProject].video}
                controls
                playsInline
                preload="metadata"
                poster={`${assetBase}${risingProjectVideos[activeRisingProject].poster}`}
                className="h-full w-full object-cover"
                aria-label={`${risingProjectVideos[activeRisingProject].name} construction progress video`}
              >
                <source src={`${assetBase}${risingProjectVideos[activeRisingProject].video}`} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EC3338] text-white shadow-xl transition-transform group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-105">
                <Play size={23} fill="currentColor" className="ml-1" />
              </div>
            </div>

            <article className="relative">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-montserrat text-[11px] font-bold tracking-[0.16em] text-[#EC3338]">
                  {String(activeRisingProject + 1).padStart(2, "0")}
                  <span className="ml-1 text-[#a7a8ab]">/ {String(risingProjectVideos.length).padStart(2, "0")}</span>
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => setActiveRisingProject((current) => (current - 1 + risingProjectVideos.length) % risingProjectVideos.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#232529] shadow-[0_4px_15px_rgba(35,37,41,0.08)] transition-colors hover:bg-[#EC3338] hover:text-white"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => setActiveRisingProject((current) => (current + 1) % risingProjectVideos.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#232529] shadow-[0_4px_15px_rgba(35,37,41,0.08)] transition-colors hover:bg-[#EC3338] hover:text-white"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
              <h4 className="font-montserrat text-[clamp(2rem,3vw,2.7rem)] font-medium leading-none text-[#232529]">
                {risingProjectVideos[activeRisingProject].name}
              </h4>
              <p className="mt-4 font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8c8e92]">
                Live construction progress · {risingProjectVideos[activeRisingProject].location}
              </p>
              <span className="mt-5 block h-0.5 w-10 bg-[#EC3338]" />
              <p className="mt-6 max-w-sm font-montserrat text-[12px] leading-6 text-[#696c71]">
                {risingProjectVideos[activeRisingProject].description}
              </p>
              <Link
                href="/completed-projects"
                className="mt-7 inline-flex items-center gap-4 border border-[#393b3f] px-5 py-3 font-montserrat text-[9px] font-bold uppercase tracking-[0.14em] text-[#232529] transition-colors hover:bg-[#232529] hover:text-white"
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
        style={{ background: "#f5f4f1", borderTop: "1px solid rgba(35,37,41,0.07)", padding: "96px 0" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[0.72fr_1.6fr] md:gap-16 md:px-10">
          <div data-scroll-reveal="text" className="flex flex-col md:justify-between">
            <div>
              <span className="home-section-label block font-montserrat text-[0.75rem] font-semibold tracking-[0.2em] text-[#EC3338]">
                CLIENT VOICES
              </span>
              <h3 className="hp-section-title mt-3 font-montserrat">
                What Our<br className="hidden md:block" /> Clients Say
              </h3>
              <p className="mt-5 max-w-sm font-montserrat text-[13px] leading-7 text-[#73767c]">
                Long-standing relationships are built on delivery, transparency and trust.
              </p>
            </div>
            <span className="mt-10 hidden border-t border-black/10 pt-5 font-montserrat text-[9px] font-semibold uppercase tracking-[0.2em] text-[#949599] md:block">
              Trusted across sectors
            </span>
          </div>

          <div className="testi-card overflow-hidden border border-black/[0.08] bg-white">
            <div className="flex h-[400px] flex-col overflow-hidden px-7 py-9 sm:px-10 sm:py-11 md:px-14 md:py-12">
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="font-serif text-[76px] font-bold leading-[0.72] text-[#EC3338] md:text-[92px]">
                  “
                </span>
                <span className="font-montserrat text-[9px] tracking-[0.22em] text-[#949599]">
                  {String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <blockquote
                key={activeTestimonial}
                className="mt-5 max-w-3xl font-montserrat text-[clamp(1.1rem,2vw,1.65rem)] font-medium leading-[1.5] tracking-[-0.025em] text-[#232529] md:mt-7"
              >
                {testimonials[activeTestimonial].quote}
              </blockquote>

              <div className="mt-auto flex items-start gap-4 border-t border-black/10 pt-6">
                <span className="mt-2 h-0.5 w-8 shrink-0 bg-[#EC3338]" />
                <div>
                  <div className="font-montserrat text-[11px] font-bold uppercase tracking-[0.08em] text-[#232529]">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="mt-1 font-montserrat text-[10px] text-[#949599]">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid border-t border-black/[0.08] md:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    aria-pressed={activeTestimonial === index}
                    className={`border-b border-black/[0.08] px-5 py-4 text-left font-montserrat transition-colors sm:border-b-0 sm:border-r ${
                      activeTestimonial === index
                        ? "bg-[#232529] text-white"
                        : "bg-white text-[#73767c] hover:bg-[#f5f4f1] hover:text-[#232529]"
                    }`}
                  >
                    <span className="block text-[8px] tracking-[0.18em] opacity-50">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-1.5 block truncate text-[9px] font-bold uppercase tracking-[0.08em]">
                      {testimonial.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end bg-white px-4 py-3">
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)}
                  className="flex h-10 w-10 items-center justify-center border border-black/10 text-[#232529] transition-colors hover:border-[#EC3338] hover:bg-[#EC3338] hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}
                  className="-ml-px flex h-10 w-10 items-center justify-center border border-black/10 text-[#232529] transition-colors hover:border-[#EC3338] hover:bg-[#EC3338] hover:text-white"
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
            padding: "36px 0 40px",
        }}
      >
        {/* Heading */}
          <div data-scroll-reveal="text" style={{ padding: "0 40px", marginBottom: "14px", textAlign: "center" }}>
          <span className="home-section-label font-montserrat" style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.62)", textTransform: "none",
            display: "block", marginBottom: "10px",
          }}>
             OUR CLIENTS
          </span>
           <h3 className="hp-section-title font-montserrat" style={{
             margin: 0,
              color: "#ffffff",
           }}>
            Trusted Partners
          </h3>
          <p className="page-subtitle-font" style={{
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
            padding: "4px 0 0",
           background: "#232529",
         }}>
           <div className="clients-track" style={{ display: "flex", alignItems: "center", gap: "18px", width: "max-content" }}>
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                data-testid={i < clients.length ? `card-client-${i}` : undefined}
                style={{
                  width: "164px", height: "80px", flexShrink: 0,
                  background: "#ffffff", border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "2px", display: "flex",
                  alignItems: "center", justifyContent: "center", padding: "16px 20px",
                }}
              >
                <img src={`${assetBase}${c.logo}`} alt={c.name}
                  style={{ maxWidth: "100%", maxHeight: "44px", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
