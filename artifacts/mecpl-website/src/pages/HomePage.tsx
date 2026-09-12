import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import PeopleSafetySection from "../components/PeopleSafetySection";
import { ArrowRight, Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
  { target: 920, suffix: "+Cr", label: "Turnover"                     },
  { target: 25,  suffix: "+",   label: "Ongoing Prestigious Projects" },
];

const recognitionData = [
  { year: "2018", title: "India's Small Giants", desc: "Recognised nationally for our contribution to the MSME sector.", image: "assets/projects/GODREJ-INFINITY.jpg" },
  { year: "2019", title: "SME 100 Award", desc: "Ranked among the top 100 SMEs in India for growth and excellence.", image: "assets/projects/Solitaire-Business-Hub-II.jpeg" },
  { year: "2021", title: "Iconic Brand", desc: "Awarded for industry leadership and sustained trust over decades.", image: "assets/projects/Trump-Tower.jpg" },
  { year: "2022", title: "ISO 9001:2015", desc: "Certified for Quality Management Systems across all our project sites.", image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { year: "2023", title: "ISO 45001:2018", desc: "Certified for Occupational Health and Safety Management.", image: "assets/projects/PRAJ-INDUSTRIES.png" },
  { year: "2024", title: "CRISIL Rated", desc: "CRISIL BBB / POSITIVE rating reflecting our strong financial stability.", image: "assets/projects/Eonwest.jpg" },
];

const services = [
  { num: "01", title: "Civil & Structural Construction", desc: "Foundation to superstructure — RCC framework, core & shell, structural finishing.", image: "assets/projects/GODREJ-INFINITY.jpg" },
  { num: "02", title: "Turnkey Projects",               desc: "Single point of accountability from design coordination through handover.",          image: "assets/projects/Solitaire-Business-Hub-II.jpeg" },
  { num: "03", title: "Industrial Projects",            desc: "Factories, R&D centres and process plants engineered for heavy operational load.", image: "assets/projects/PRAJ-INDUSTRIES.png" },
  { num: "04", title: "Residential Projects",            desc: "Highrise and township construction built for scale, safety and speed.",            image: "assets/projects/Trump-Tower.jpg" },
  { num: "05", title: "Institutional Projects",          desc: "Schools, colleges and research campuses delivered to exacting specification.",      image: "assets/projects/Rejuve.jpg" },
  { num: "06", title: "Project Management",              desc: "Schedule, cost and quality control across every stakeholder and site.",             image: "assets/projects/43PD-1-scaled.jpg" },
];

const projects = [
  { name: "Trump Tower",                 location: "Kalyani Nagar, Pune", type: "Panchshil Group",    image: "assets/projects/Trump-Tower.jpg" },
  { name: "Panchshil Highrise Towers",   location: "Wagholi, Pune",       type: "Panchshil Group",    image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { name: "Godrej Nurture",              location: "Mamurdi, Pune",       type: "Godrej Properties", image: "assets/projects/Godrej-Forest-grove.jpg" },
  { name: "EON Phase II",                location: "Kharadi, Pune",       type: "Panchshil Group",    image: "assets/projects/Eonwest.jpg" },
  { name: "Mahindra Electric Facility", location: "Chakan, Pune",        type: "Industrial",        image: "assets/projects/PRAJ-INDUSTRIES.png" },
  { name: "Kalpataru Jade Residences",  location: "Baner, Pune",         type: "Kalpataru",          image: "assets/projects/KRC-scaled-e1700730314593.jpg" },
];

const ongoingProjects = [
  { name: "Panchshil SRA Dhanori", location: "Vishrantwadi, Pune", type: "Residential Development", floors: "Multi-Tower Project", desc: "Structural rehabilitation and high-density residential construction delivered with controlled concrete execution.", image: "assets/projects/SRA-DHANORI-scaled.jpg" },
  { name: "VTP Township Framework", location: "Baner Highrise Sector, Pune", type: "Township Development", floors: "Phased Highrise Works", desc: "Large-scale township infrastructure with multi-tower structural work across phased development zones.", image: "assets/projects/VTP-scaled.jpg" },
  { name: "Solitaire World Kothrud", location: "Kothrud, Pune", type: "Premium Residential", floors: "Highrise Towers", desc: "Premium residential towers combining high-specification concrete work with exacting quality standards.", image: "assets/projects/2.Solitaire-World-Kothrud.jpg" },
  { name: "Wellington Sector", location: "Charholi, Pune", type: "Mega Township", floors: "Structural Framework", desc: "Mass township infrastructure supported by coordinated civil engineering and high-volume site execution.", image: "assets/projects/WhatsApp-Image-2025-05-06-at-17.24.37_0a4a5d3c-scaled.jpg" },
  { name: "Malpani Soul String", location: "Baner, Pune", type: "Premium Residential", floors: "Multi-Tower Development", desc: "Precision structural construction for a contemporary residential development in Pune's western corridor.", image: "assets/projects/Malpani-Soul-String-scaled.jpg" },
];

const testimonials = [
  { quote: "MECPL is equipped with better infrastructure and well-qualified, experienced staff — capable of handling any type of project.", name: "Pride Properties", role: "Certificate of Testimony", image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { quote: "We were particularly impressed by MECPL's professional expertise and interaction with our project managers — despite the site's unyielding terrain.", name: "Mahindra United World College", role: "Project Correspondence", image: "assets/projects/Trump-Tower.jpg" },
  { quote: "Millennium Engineers & Contractors completed our Universal Temple project on time, with real professionalism and skilled staff.", name: "Swami Bhaumananda", role: "President, Ramakrishna Math", image: "assets/projects/GODREJ-INFINITY.jpg" },
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

const masonryCols = [
  [
    { src: "assets/projects/GODREJ-INFINITY.jpg", h: 280 },
    { src: "assets/projects/Emirus-scaled.jpg", h: 200 },
  ],
  [
    { src: "assets/projects/43PD-1-scaled.jpg", h: 190 },
    { src: "assets/projects/HIGH-RISE-1-scaled.jpg", h: 280 },
  ],
  [
    { src: "assets/projects/TechPark.jpg", h: 340 },
    { src: "assets/projects/Godrej-Emerald-Waters.jpg", h: 150 },
  ],
  [
    { src: "assets/projects/Eonwest.jpg", h: 220 },
    { src: "assets/projects/Trump-Tower.jpg", h: 265 },
  ],
  [
    { src: "assets/projects/KRC-scaled-e1700730314593.jpg", h: 305 },
    { src: "assets/projects/VTP-scaled.jpg", h: 175 },
  ],
  [
    { src: "assets/projects/PRAJ-INDUSTRIES.png", h: 210 },
    { src: "assets/projects/Solitaire-Business-Hub-II.jpeg", h: 275 },
  ],
];

/* ─── COMPONENT ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [videoIdx, setVideoIdx] = useState(0);
  const [ongoingProjectIndex, setOngoingProjectIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const assetBase = import.meta.env.BASE_URL;
  const carouselProjects = ongoingProjects.map(
    (_, offset) => ongoingProjects[(ongoingProjectIndex + offset) % ongoingProjects.length],
  );

  const showPreviousOngoingProject = () => {
    setOngoingProjectIndex((current) => (current - 1 + ongoingProjects.length) % ongoingProjects.length);
  };

  const showNextOngoingProject = () => {
    setOngoingProjectIndex((current) => (current + 1) % ongoingProjects.length);
  };

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
        const cards = sec.querySelectorAll<HTMLElement>(".svc-hover-card");
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
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 divide-x-0 lg:divide-x divide-white/10">
            {stats.map((s, i) => (
              <div
                key={i}
                data-scroll-reveal="text"
                data-scroll-reveal-delay={String(i * 70)}
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
      <section id="recognition" ref={recognitionRef} style={{ padding: "100px 40px", background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <span style={{
              display: "inline-block",
              color: "#EC3338",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}>
              Recognition
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "16px" }}>
              <div style={{ height: "1px", width: "80px", background: "rgba(0,0,0,0.1)" }} className="hidden sm:block" />
              <h2 style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                color: "#232529"
              }}>
                Awards &amp; Accolades
              </h2>
              <div style={{ height: "1px", width: "80px", background: "rgba(0,0,0,0.1)" }} className="hidden sm:block" />
            </div>
            <p style={{
              color: "#949599",
              fontSize: "15px",
              fontFamily: "'Montserrat',sans-serif",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Our commitment to safety, quality and engineering excellence—recognised nationally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {recognitionData.map((item, i) => (
              <div key={i} className="rec-card" style={{
                background: "#f7f7f6",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "40px 32px 70px",
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), 50% 100%, 0 calc(100% - 30px))"
              }}>
                <div style={{
                  width: "40px", height: "4px", background: "#EC3338", borderRadius: "2px", marginBottom: "24px"
                }} />
                <h3 style={{
                  color: "#EC3338", fontFamily: "'Montserrat',sans-serif", fontSize: "16px", fontWeight: 600, marginBottom: "12px"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: "#62656b", fontSize: "12px", lineHeight: 1.6, marginBottom: "24px", minHeight: "40px"
                }}>
                  {item.desc}
                </p>
                <div style={{ width: "100%", height: "140px", overflow: "hidden", marginBottom: "0", background: "#fff" }}>
                  <img src={import.meta.env.BASE_URL + item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{
                  fontSize: "20px", fontWeight: 600, fontFamily: "'Montserrat',sans-serif", color: "#232529",
                  position: "absolute", bottom: "16px"
                }}>
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ 3. ABOUT — Storytelling ══════════ */}
      <section
        ref={aboutRef}
        data-testid="section-about"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 40px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

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
                <h3 className="hp-section-title font-montserrat" style={{
                  margin: "0 0 20px",
                }}>
                  From A ₹2 Lakh Beginning To ₹780 Cr
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
                  lineHeight: 1.6, margin: 0, letterSpacing: "-0.01em",
                }}>
                  “Bringing positive changes in the lives of the people around me is the biggest achievement I've had in my life.”
                </p>
              </div>

              <div className="about-fade">
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px",
                  lineHeight: 1.85, color: "#949599", marginBottom: "28px",
                }}>
                  Millennium Engineers &amp; Contractors began in 1973 as a small partnership, taken on by an engineer who wasn't content working for someone else. Four and a half decades on, that same commitment to quality and timely delivery has grown MECPL into one of Pune's most trusted structural engineering and construction names — ISO-certified, CRISIL-rated, and built on 3,000+ skilled hands.
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

            {/* Right: 2×2 image grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { src: "assets/projects/GODREJ-INFINITY.jpg", h: 260 },
                { src: "assets/projects/HIGH-RISE-1-scaled.jpg", h: 180 },
                { src: "assets/projects/43PD-1-scaled.jpg", h: 180 },
                { src: "assets/projects/Trump-Tower.jpg", h: 260 },
              ].map((img, i) => (
                <div key={i} className="about-img" style={{ height: `${img.h}px`, borderRadius: "4px" }}>
                  <img
                    src={img.src} alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ══════════ 4. SERVICES — Light bg hover-card grid ══════════ */}
      <section
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
              Our Services
            </h3>
          </div>

          {/* 3×2 hover-reveal card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "2px", background: "rgba(0,0,0,0.06)" }}>
            {services.map((svc, i) => (
              <div key={i} className="svc-hover-card" data-testid={`card-service-${i}`}>
                <img src={svc.image} alt={svc.title} />
                <div className="svc-overlay">
                  <div>
                    <div className="svc-card-bar" />
                    <div style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                      fontWeight: 300, letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.42)", textTransform: "uppercase",
                      marginBottom: "7px",
                    }}>
                      {svc.num}
                    </div>
                    <div style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "14px",
                      fontWeight: 700, color: "#ffffff",
                      textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      {svc.title}
                    </div>
                    <div className="svc-card-desc">
                      <p style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: "12px",
                        color: "rgba(255,255,255,0.62)", lineHeight: 1.7, margin: "0",
                      }}>
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      {/* ══════════ 6. ONGOING PROJECTS ══════════ */}
      <section
        data-testid="section-home-ongoing-projects"
        style={{ background: "#f5f4f1", padding: "96px 40px 104px" }}
        className="bg-[#ffff]">
        <div className="max-w-7xl mx-auto">
          <div data-scroll-reveal="text" style={{ textAlign: "center", marginBottom: "22px" }}>
            <span className="home-section-label font-montserrat" style={{
              display: "block",
              marginBottom: "10px",
              color: "#EC3338",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
              WHAT WE DO
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
              <div className="hidden sm:block" style={{ width: "180px", height: "1px", background: "rgba(35,37,41,0.28)" }} />
              <h3 className="hp-section-title font-montserrat" style={{ margin: 0, color: "#232529", textTransform: "uppercase" }}>
                Our Ongoing Projects
              </h3>
              <div className="hidden sm:block" style={{ width: "180px", height: "1px", background: "rgba(35,37,41,0.28)" }} />
            </div>
          </div>

          {/* Architectural gallery */}
          <div style={{
            position: "relative",
            marginBottom: 0,
            padding: "14px",
            background: "#deddd9",
          }}>
            <button
                type="button"
                aria-label="Show previous ongoing project"
                onClick={showPreviousOngoingProject}
                className="flex"
                style={{
                  position: "absolute", left: "-18px", top: "50%", zIndex: 4,
                  width: "38px", height: "38px", borderRadius: "50%",
                  transform: "translateY(-50%)", alignItems: "center", justifyContent: "center",
                  border: 0, background: "#232529", color: "#ffffff", cursor: "pointer",
                }}
              >
                <ChevronLeft size={18} />
            </button>

            <div
              data-scroll-reveal="image"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:h-[480px] items-stretch md:items-end"
              style={{ gap: "10px", overflow: "hidden" }}
            >
              {carouselProjects.map((project, i) => (
                <Link
                  key={project.name}
                  href="/ongoing-projects"
                  className={`h-[320px] md:min-h-0 ${
                    i % 2 === 0 ? "md:h-full" : "md:h-[78%]"
                  } ${i === 4 ? "hidden md:block" : ""}`}
                >
                  <div
                    className="group h-full cursor-pointer"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      background: "#deddd9",
                    }}
                  >
                    <img
                      src={`${assetBase}${project.image}`}
                      alt={project.name}
                      loading="lazy"
                      className="group-hover:scale-105"
                      style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transition: "transform 700ms ease",
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(20,22,25,0.02) 38%, rgba(20,22,25,0.92) 100%)",
                      pointerEvents: "none",
                    }} />
                    <div style={{
                      position: "absolute",
                      left: "18px",
                      right: "18px",
                      bottom: "18px",
                      color: "#ffffff",
                    }}>
                      <h4 style={{
                        margin: "0 0 7px",
                        fontSize: "clamp(0.8rem, 1.25vw, 1.05rem)",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                      }}>
                        {project.name}
                      </h4>
                      <p style={{
                        margin: "0 0 4px",
                        color: "rgba(255,255,255,0.78)",
                        fontSize: "8px",
                        fontWeight: 600,
                        lineHeight: 1.4,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                      }}>
                        {project.floors}
                      </p>
                      <p style={{
                        margin: 0,
                        color: "rgba(255,255,255,0.62)",
                        fontSize: "8px",
                        lineHeight: 1.4,
                        textTransform: "uppercase",
                      }}>
                        {project.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button
                type="button"
                aria-label="Show next ongoing project"
                onClick={showNextOngoingProject}
                className="flex"
                style={{
                  position: "absolute", right: "-18px", top: "50%", zIndex: 4,
                  width: "38px", height: "38px", borderRadius: "50%",
                  transform: "translateY(-50%)", alignItems: "center", justifyContent: "center",
                  border: 0, background: "#232529", color: "#ffffff", cursor: "pointer",
                }}
              >
                <ChevronRight size={18} />
            </button>
          </div>

          <div data-scroll-reveal="text" style={{ paddingTop: "24px", textAlign: "center" }}>
            <Link href="/ongoing-projects" data-testid="button-all-ongoing-projects">
              <span className="home-section-cta font-montserrat inline-flex items-center gap-2 cursor-pointer" style={{
                color: "#EC3338",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(236,51,56,0.35)",
                paddingBottom: "6px",
              }}>
                View All Ongoing Projects <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* ══════════ 6. PEOPLE & SAFETY ══════════ */}
      <PeopleSafetySection />
      {/* ══════════ 7. TESTIMONIALS ══════════ */}
      <section
        ref={testimonialsRef}
        data-testid="section-testimonials"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(35,37,41,0.07)", padding: "100px 0" }}
      >
        {/* Heading */}
        <div style={{ padding: "0 40px", marginBottom: "60px", textAlign: "center" }}>
          <span className="home-section-label font-montserrat" style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
            display: "block", marginBottom: "10px",
          }}>
             CLIENTS VOICES
          </span>
          <h3 className="hp-section-title font-montserrat" style={{
            margin: 0,
          }}>
             What Our Clients Say
          </h3>
        </div>

        {/* Masonry collage */}
        <div
          data-scroll-reveal="image"
          className="grid grid-cols-2 gap-2 px-4 mb-10 md:hidden"
        >
          {masonryCols.flat().slice(0, 2).map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="h-40 overflow-hidden rounded-lg"
            >
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        <div
          data-scroll-reveal="image"
          className="hidden md:block"
          style={{ overflow: "hidden", marginBottom: "64px", padding: "0 32px" }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {masonryCols.map((col, ci) => (
              <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.map((photo, pi) => (
                  <div key={pi} style={{
                    height: `${photo.h}px`, borderRadius: "10px",
                    overflow: "hidden", flexShrink: 0,
                  }}>
                    <img src={photo.src} alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3 star-rating cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{
          gap: "24px", maxWidth: "1100px", margin: "0 auto", padding: "0 40px",
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card" style={{
              background: "#ffffff", borderRadius: "10px",
              padding: "32px",
              borderTop: "3px solid #C41E3A",
              borderRight: "1px solid rgba(0,0,0,0.07)",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              borderLeft: "1px solid rgba(0,0,0,0.07)",
              display: "flex", flexDirection: "column",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={13} fill="#EC3338" color="#EC3338" />
                ))}
              </div>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "12.5px",
                lineHeight: 1.85, color: "#232529", marginBottom: "24px", flex: 1,
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0, background: "rgba(0,0,0,0.06)",
                }}>
                  <img src={`${assetBase}${t.image}`} alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "11px",
                    fontWeight: 700, color: "#232529", letterSpacing: "0.06em",
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    color: "#949599", marginTop: "2px",
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ══════════ 8. CLIENTS ══════════ */}
      <section
        ref={clientsRef}
        data-testid="section-clients"
        style={{
           background: "#f5f4f1",
           borderTop: "1px solid rgba(0,0,0,0.07)",
           padding: "64px 0 0",
        }}
      >
        {/* Heading */}
          <div data-scroll-reveal="text" style={{ padding: "0 40px", marginBottom: "32px", textAlign: "center" }}>
          <span className="home-section-label font-montserrat" style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.2em", color: "#EC3338", textTransform: "none",
            display: "block", marginBottom: "10px",
          }}>
             OUR CLIENTS
          </span>
           <h3 className="hp-section-title font-montserrat" style={{
             margin: 0,
              color: "#232529",
           }}>
            Trusted Partners
          </h3>
          <p className="page-subtitle-font" style={{
            maxWidth: "620px",
            margin: "14px auto 0",
              color: "#62656b",
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
           margin: "0 8px",
           padding: "28px 0",
           background: "#232529",
           borderRadius: "8px",
         }}>
          <div className="clients-track" style={{ display: "flex", alignItems: "center", gap: "24px", width: "max-content" }}>
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                data-testid={i < clients.length ? `card-client-${i}` : undefined}
                style={{
                  width: "180px", height: "96px", flexShrink: 0,
                  background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "6px", display: "flex",
                  alignItems: "center", justifyContent: "center", padding: "20px",
                }}
              >
                <img src={`${assetBase}${c.logo}`} alt={c.name}
                  style={{ maxWidth: "100%", maxHeight: "52px", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
