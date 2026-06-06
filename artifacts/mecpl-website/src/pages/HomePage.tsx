import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import { ArrowRight, Star, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface WhyCard {
  stat: string;
  title: string;
  desc: string;
  image: string;
}

/* ─── DATA ───────────────────────────────────────────────────────── */
const heroVideos = [
  "assets/video/hero-new.mp4",
  "assets/video/hero.mp4",
  "assets/video/istockphoto-891492418-640_adpp_is.mp4",
];

const stats = [
  { target: 25,  suffix: "+",  label: "Years of Excellence"  },
  { target: 150, suffix: "+",  label: "Landmark Projects"    },
  { target: 4,   suffix: "",   label: "ISO Certifications"   },
  { target: 95,  suffix: "%+", label: "On-Time Delivery"     },
];

const services = [
  { num: "01", title: "Civil Construction",   desc: "High-performance foundational engineering for complex architectural blueprints across residential, commercial, and industrial sectors.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" },
  { num: "02", title: "Turnkey Projects",     desc: "Complete end-to-end project delivery — from design coordination through structural handover — under one accountable partner.",          image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" },
  { num: "03", title: "Industrial Projects",  desc: "Warehouses, logistics hubs, and manufacturing plants built to the tightest tolerance levels in the industry.",                       image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop" },
  { num: "04", title: "Residential Projects", desc: "Mid-rise to ultra-high-rise towers including Trump Towers, Godrej Boulevard, and VTP Bel Air — delivered on time.",                  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop" },
  { num: "05", title: "Interior Fitouts",     desc: "Premium commercial and institutional interior fitouts combining structural reliability with aesthetic refinement.",                     image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
  { num: "06", title: "Project Management",   desc: "Expert site governance — scheduling, cost control, safety auditing, and milestone management as a standalone service.",               image: "https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=800&auto=format&fit=crop" },
];

const projects = [
  { name: "Panchshil Highrise Towers", location: "Kharadi, Pune",       type: "Civil Structural Framework",       image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1920&auto=format&fit=crop" },
  { name: "Trump Towers Pune",         location: "Kalyani Nagar, Pune", type: "Luxury Highrise · Civil Handover",  image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop" },
  { name: "Godrej Boulevard",          location: "Mamurdi, Pune",       type: "Residential Framework",             image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop" },
  { name: "VTP Bel Air",               location: "Mahalunge, Pune",     type: "Complex Core Works",                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" },
  { name: "Gera Commerzone",           location: "Kharadi, Pune",       type: "Commercial Core Infrastructure",    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1920&auto=format&fit=crop" },
  { name: "Industrial Megaplex",       location: "Chakan, Pune",        type: "Industrial Structural Works",       image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1920&auto=format&fit=crop" },
];

const whyChoose: WhyCard[] = [
  { stat: "95%+",      title: "Timely Delivery",        desc: "Over 95% of projects handed over on or ahead of schedule — backed by rigorous scheduling and proactive site governance.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop" },
  { stat: "ISO 45001", title: "Safety First",           desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site, protecting our teams on India's most complex builds.", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1400&auto=format&fit=crop" },
  { stat: "25+ Years", title: "Engineering Excellence", desc: "25+ years of structural engineering expertise on India's most ambitious and technically demanding projects.", image: "https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=1400&auto=format&fit=crop" },
  { stat: "ISO 9001",  title: "Quality Assurance",      desc: "ISO 9001:2015 certified quality management applied across every project phase — from structural planning to final handover.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1400&auto=format&fit=crop" },
];

const testimonials = [
  { quote: "MECPL delivered our 42-storey tower ahead of schedule with exceptional structural quality. Their site management and safety protocols set a new benchmark in the industry.",               name: "Mr. Atul Chordia",    role: "Chairman, Panchshil Realty", image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { quote: "Working with MECPL on Trump Towers Pune was a seamless experience. Their technical precision, proactive communication, and zero-compromise quality made them an invaluable partner.",      name: "Project Director",    role: "Trump Towers Pune",          image: "assets/projects/Trump-Tower.jpg"          },
  { quote: "MECPL's team demonstrated remarkable engineering capability throughout the Godrej Boulevard project. Their ability to manage complexity at scale is truly impressive.",                    name: "Senior Project Head", role: "Godrej Properties",          image: "assets/projects/GODREJ-INFINITY.jpg"      },
];

const clients = [
  { name: "Panchshil Realty",  logo: "assets/clients/client-09-1.webp" },
  { name: "VTP Realty",        logo: "assets/clients/vtp-realty.webp"  },
  { name: "Godrej Properties", logo: "assets/clients/client-12-1.webp" },
  { name: "TCS",               logo: "assets/clients/client-06.webp"   },
  { name: "Kalpataru",         logo: "assets/clients/client-14.webp"   },
  { name: "K Raheja Corp",     logo: "assets/clients/client-17.webp"   },
  { name: "Malpani Group",     logo: "assets/clients/client-13.webp"   },
  { name: "Gera Developments", logo: "assets/clients/client-05.webp"   },
  { name: "Pride Purple",      logo: "assets/clients/client-15-1.webp" },
  { name: "OmniActive",        logo: "assets/clients/omniactive.webp"  },
];

const masonryCols = [
  [
    { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop", h: 280 },
    { src: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=400&auto=format&fit=crop", h: 200 },
  ],
  [
    { src: "https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=400&auto=format&fit=crop", h: 190 },
    { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=400&auto=format&fit=crop", h: 280 },
  ],
  [
    { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop", h: 340 },
    { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400&auto=format&fit=crop", h: 150 },
  ],
  [
    { src: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?q=80&w=400&auto=format&fit=crop", h: 220 },
    { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop", h: 265 },
  ],
  [
    { src: "https://images.unsplash.com/photo-1481253127861-534498168948?q=80&w=400&auto=format&fit=crop", h: 305 },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop", h: 175 },
  ],
  [
    { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=400&auto=format&fit=crop", h: 210 },
    { src: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=400&auto=format&fit=crop", h: 275 },
  ],
];

/* ─── COMPONENT ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [videoIdx, setVideoIdx] = useState(0);
  const assetBase = import.meta.env.BASE_URL;

  const heroSectionRef  = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroTagRef      = useRef<HTMLElement>(null);
  const [activeWhy, setActiveWhy] = useState<number>(0);
  const heroSubRef      = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLElement>(null);
  const aboutRef        = useRef<HTMLElement>(null);
  const servicesRef     = useRef<HTMLElement>(null);
  const projTrackRef = useRef<HTMLDivElement>(null);
  const whyRef          = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const clientsRef      = useRef<HTMLElement>(null);

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

        if ((window as any)._preloaderDone) {
          gsap.set(section, { y: 0, scale: 1 });
          runAnims();
        } else {
          window.addEventListener("preloader-exit", () => runAnims(), { once: true });
        }

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
              const suffix = el.dataset.suffix ?? "";
              const tracker = { val: 0 };
              gsap.to(tracker, {
                val: target, duration: 2.4, ease: "power2.out",
                onUpdate: () => { el.textContent = Math.round(tracker.val) + suffix; },
              });
            });
          },
        });
      });
      // Reduced-motion: show final values immediately
      mm.add("(prefers-reduced-motion: reduce)", () => {
        sec.querySelectorAll<HTMLElement>(".stat-num").forEach(el => {
          const target = parseFloat(el.dataset.target ?? "0");
          const suffix = el.dataset.suffix ?? "";
          el.textContent = target + suffix;
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

  /* ── WHY CHOOSE: section entrance ── */
  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const leftCol = sec.querySelector<HTMLElement>(".why-left-col");
        if (!leftCol) return;
        gsap.from(leftCol, {
          x: -40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none none" },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── WHY CHOOSE: SplitText reveal on active change ── */
  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desc = sec.querySelector<HTMLElement>(`.why-desc[data-idx="${activeWhy}"]`);
    if (!desc) return;
    let split: SplitText | null = null;
    const raf = requestAnimationFrame(() => {
      split = SplitText.create(desc, { type: "lines", mask: "lines" });
      gsap.from(split.lines, { yPercent: 110, duration: 0.55, ease: "power3.out", stagger: 0.07 });
    });
    return () => { cancelAnimationFrame(raf); split?.revert(); };
  }, [activeWhy]);

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
    <div style={{ background: "#ffffff", color: "#111827" }}>

      {/* ══════════ 1. HERO — Cinematic centered ══════════ */}
      <section
        ref={heroSectionRef}
        className="relative h-screen overflow-hidden"
        data-testid="section-hero"
      >
        {/* 3 cycling videos */}
        {heroVideos.map((src, i) => (
          <video
            key={i}
            autoPlay muted loop playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              opacity: videoIdx === i ? 1 : 0,
              transition: "opacity 1.4s ease",
              zIndex: 0,
            }}
          >
            <source src={`${assetBase}${src}`} type="video/mp4" />
          </video>
        ))}

        {/* Cinematic gradient overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.62) 100%)",
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

        {/* CENTER: heading + description + buttons */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", maxWidth: "720px", padding: "0 40px" }}>
            <h1 ref={heroHeadlineRef} style={{ margin: 0, overflow: "hidden" }}>
              <div className="hero-line" style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}>
                <span style={{ color: "#ffffff" }}>WE BUILD </span>
                <span style={{ color: "#C41E3A" }}>INDIA'S SKYLINE</span>
              </div>
            </h1>

            <p ref={heroTagRef} className="hero-sub-item" style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
              fontWeight: 300, color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75, margin: "28px 0 0",
            }}>
              From Trump Towers to Panchshil's skyline-defining highrises — MECPL delivers ISO-certified structural engineering excellence across India's landmark developments since 1998.
            </p>

            <div ref={heroSubRef} style={{ display: "flex", gap: "14px", marginTop: "36px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/completed-projects" data-testid="button-hero-projects">
                <span
                  className="hero-sub-item"
                  style={{
                    background: "#C41E3A", color: "#ffffff", padding: "12px 28px",
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                    display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#a51830")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#C41E3A")}
                >
                  View Projects <ArrowRight size={11} />
                </span>
              </Link>
              <Link href="/careers" data-testid="button-hero-careers">
                <span
                  className="hero-sub-item"
                  style={{
                    background: "transparent", color: "#ffffff", padding: "12px 28px",
                    border: "1.5px solid rgba(255,255,255,0.45)",
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                    display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#ffffff"; el.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.45)"; el.style.background = "transparent"; }}
                >
                  Explore Careers <ArrowRight size={11} />
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

      {/* ══════════ 2. AWARDS STRIP ══════════ */}
      <section
        data-testid="section-awards"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "64px 40px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
              display: "block", marginBottom: "10px",
            }}>
              RECOGNITION
            </span>
            <h3 style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
              fontSize: "1.875rem", color: "#111827",
              textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0,
            }}>
              Awards &amp; Accolades
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5" style={{ gap: "2px", background: "rgba(0,0,0,0.06)" }}>
            {[
              { year: "2023", body: "Construction World", title: "Best Structural Contractor — West India" },
              { year: "2022", body: "CREDAI", title: "Excellence in Quality Construction" },
              { year: "2021", body: "Indian Green Building Council", title: "Sustainable Construction Award" },
              { year: "2019", body: "Builders Association of India", title: "Outstanding Project Delivery" },
              { year: "2018", body: "CIDC Vishwakarma", title: "Best Emerging Contractor" },
            ].map((award, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff", padding: "36px 28px",
                  display: "flex", flexDirection: "column", gap: "12px",
                  transition: "background 0.25s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fdf2f4"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "rgba(196,30,58,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "4px",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="#C41E3A" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600,
                  letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
                }}>
                  {award.year}
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13px", fontWeight: 700,
                  color: "#111827", lineHeight: 1.35, textTransform: "uppercase", letterSpacing: "0.02em",
                }}>
                  {award.title}
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 400,
                  color: "rgba(17,24,39,0.4)", letterSpacing: "0.08em",
                }}>
                  {award.body}
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
              <div className="about-fade" style={{ marginBottom: "36px" }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
                  letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
                  display: "block", marginBottom: "10px",
                }}>
                  ABOUT MECPL
                </span>
                <h3 style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  fontSize: "1.875rem", color: "#111827",
                  textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 20px",
                }}>
                  Building India's Tomorrow
                </h3>
                <div style={{ width: "40px", height: "3px", background: "#C41E3A" }} />
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
                  "Structural partner of choice for India's most ambitious developers — delivering landmark projects, built to outlast generations, since 1998."
                </p>
              </div>

              <div className="about-fade">
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px",
                  lineHeight: 1.85, color: "#6b7280", marginBottom: "28px",
                }}>
                  From Trump Towers to Panchshil's skyline-defining highrises, MECPL brings ISO-certified precision and 25 years of on-site engineering wisdom to every project.
                </p>

                <div className="flex flex-wrap gap-2" style={{ marginBottom: "32px" }}>
                  {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "CRISIL SME 1"].map(cert => (
                    <span key={cert} style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#374151", border: "1px solid rgba(17,24,39,0.12)",
                      padding: "5px 12px", borderRadius: "2px",
                    }}>
                      {cert}
                    </span>
                  ))}
                </div>

                <Link href="/about" data-testid="button-about-more">
                  <span
                    className="inline-flex items-center gap-2 cursor-pointer"
                    style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                      letterSpacing: "0.2em", color: "#C41E3A",
                      textTransform: "uppercase", fontWeight: 600,
                    }}
                  >
                    Our Full Story <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: 2×2 image grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop", h: 260 },
                { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop", h: 180 },
                { src: "https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=600&auto=format&fit=crop", h: 180 },
                { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop", h: 260 },
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

      {/* ══════════ 3. STATS STRIP ══════════ */}
      <section
        ref={statsRef}
        data-testid="section-stats"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "72px 40px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "1px", background: "rgba(0,0,0,0.06)" }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{ background: "#ffffff", padding: "36px 28px", textAlign: "center" }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", marginBottom: "10px" }}>
                  <span
                    className="stat-num"
                    data-target={s.target}
                    data-suffix={s.suffix}
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                      fontWeight: 800, color: "#C41E3A", lineHeight: 1,
                    }}
                  >
                    0
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                  fontWeight: 600, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(17,24,39,0.45)",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
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
          <div style={{ marginBottom: "56px" }}>
            <span style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
              display: "block", marginBottom: "10px",
            }}>
              WHAT WE BUILD
            </span>
            <h3 style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
              fontSize: "1.875rem", color: "#111827",
              textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0,
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
        style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)", borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "80px" }}
      >
        {/* Header row */}
        <div style={{ padding: "0 48px", marginBottom: "48px" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
            display: "block", marginBottom: "10px",
          }}>
            OUR PROJECTS
          </span>
          <h3 style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: "1.875rem", color: "#111827",
            textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0,
          }}>
            Landmark Works
          </h3>
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
                    letterSpacing: "0.24em", color: "rgba(17,24,39,0.25)",
                    textTransform: "uppercase", marginBottom: "10px",
                  }}>
                    {String((i % projects.length) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "1.25rem", fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1.15, textTransform: "uppercase",
                    letterSpacing: "-0.01em", marginBottom: "10px",
                  }}>
                    {proj.name}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                    color: "#6b7280", letterSpacing: "0.16em",
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
        <div style={{ padding: "48px 48px 64px", textAlign: "center" }}>
          <Link href="/completed-projects" data-testid="button-all-projects">
            <span
              className="inline-flex items-center gap-2 cursor-pointer"
              style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                letterSpacing: "0.2em", color: "#C41E3A",
                textTransform: "uppercase", fontWeight: 600,
                borderBottom: "1px solid rgba(196,30,58,0.3)", paddingBottom: "5px",
              }}
            >
              View All 150+ Projects <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════ 6. WHY CHOOSE — Accordion + Image ══════════ */}
      <section
        ref={whyRef}
        data-testid="section-why-mecpl"
        style={{ background: "#ffffff", position: "relative" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "55% 45%", minHeight: "90vh" }}>

          {/* LEFT: header + buttons + accordion */}
          <div className="why-left-col" style={{
            padding: "100px 60px 100px 80px",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            {/* Label + heading + intro */}
            <div style={{ marginBottom: "36px" }}>
              <span style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
                display: "block", marginBottom: "10px",
              }}>
                OUR ADVANTAGE
              </span>
              <h3 style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                fontSize: "1.875rem", color: "#111827",
                textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 16px",
              }}>
                Why Choose MECPL
              </h3>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px",
                lineHeight: 1.75, color: "#6b7280", margin: 0, maxWidth: "400px",
              }}>
                Two decades of structural excellence — on time, on spec, and built to outlast generations.
              </p>
            </div>

            {/* Accordion items */}
            <div>
              {whyChoose.map((item, i) => (
                <div
                  key={i}
                  style={{ borderTop: "1px solid rgba(17,24,39,0.1)" }}
                  onMouseEnter={() => setActiveWhy(i)}
                >
                  {/* Title row */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "22px 0", cursor: "default",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600,
                        color: activeWhy === i ? "#C41E3A" : "rgba(17,24,39,0.3)",
                        letterSpacing: "0.22em", transition: "color 0.3s",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: "13px", fontWeight: 700,
                        color: activeWhy === i ? "#111827" : "rgba(17,24,39,0.45)",
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        transition: "color 0.3s",
                      }}>
                        {item.title}
                      </span>
                    </div>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                      border: `1.5px solid ${activeWhy === i ? "#C41E3A" : "rgba(17,24,39,0.15)"}`,
                      background: activeWhy === i ? "#C41E3A" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "border-color 0.3s, background 0.3s",
                    }}>
                      <span style={{
                        color: activeWhy === i ? "#fff" : "#9ca3af",
                        fontSize: "15px", lineHeight: 1, marginTop: "-1px",
                        fontFamily: "monospace",
                      }}>
                        {activeWhy === i ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Expandable drawer */}
                  <div className={`why-drawer${activeWhy === i ? " why-drawer-open" : ""}`}>
                    <div style={{ paddingBottom: "28px" }}>
                      <div style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "2rem", fontWeight: 800, color: "#C41E3A",
                        marginBottom: "10px", lineHeight: 1.0,
                      }}>
                        {item.stat}
                      </div>
                      <p
                        className="why-desc"
                        data-idx={i}
                        style={{
                          fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
                          lineHeight: 1.8, color: "#6b7280", margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(17,24,39,0.1)" }} />
            </div>
          </div>

          {/* RIGHT: crossfading image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {whyChoose.map((item, i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity: activeWhy === i ? 1 : 0,
                transition: "opacity 0.7s ease",
                pointerEvents: "none",
              }}>
                <img
                  src={item.image} alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 7. TESTIMONIALS ══════════ */}
      <section
        ref={testimonialsRef}
        data-testid="section-testimonials"
        style={{ background: "#f8fafc", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 0" }}
      >
        {/* Heading */}
        <div style={{ padding: "0 40px", marginBottom: "60px", textAlign: "center" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
            display: "block", marginBottom: "10px",
          }}>
            CLIENT VOICES
          </span>
          <h3 style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: "1.875rem", color: "#111827",
            textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, lineHeight: 1.15,
          }}>
            What Our Clients Say
          </h3>
        </div>

        {/* Masonry collage */}
        <div style={{ overflow: "hidden", marginBottom: "64px", padding: "0 32px" }}>
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
                  <Star key={s} size={13} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "12.5px",
                lineHeight: 1.85, color: "#374151", marginBottom: "24px", flex: 1,
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
                    fontWeight: 700, color: "#111827", letterSpacing: "0.06em",
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    color: "#6b7280", marginTop: "2px",
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
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "80px 0" }}
      >
        {/* Heading */}
        <div style={{ padding: "0 40px", marginBottom: "56px", textAlign: "center" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase",
            display: "block", marginBottom: "10px",
          }}>
            OUR CLIENTS
          </span>
          <h3 style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: "1.875rem", color: "#111827",
            textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, lineHeight: 1.15,
          }}>
            Trusted Partners
          </h3>
        </div>

        {/* Single GSAP ticker */}
        <div style={{ overflow: "hidden" }}>
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

      {/* ══════════ 9. CTA ══════════ */}
      <section
        data-testid="section-dual-cta"
        style={{ background: "linear-gradient(135deg, #C41E3A 0%, #8b0f20 100%)", padding: "56px 40px", position: "relative" }}
      >
        <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800, color: "#ffffff",
            textTransform: "uppercase", lineHeight: 1.0,
            letterSpacing: "-0.02em", whiteSpace: "nowrap",
            marginBottom: "28px",
          }}>
            LET'S BUILD TOGETHER
          </div>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/contact" data-testid="button-cta-contact">
              <span
                className="inline-flex items-center gap-2 cursor-pointer"
                style={{
                  background: "#ffffff", color: "#C41E3A", padding: "14px 36px",
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#ffffff")}
              >
                Contact MECPL <ArrowRight size={11} />
              </span>
            </Link>
            <Link href="/careers" data-testid="button-cta-careers">
              <span
                className="inline-flex items-center gap-2 cursor-pointer"
                style={{
                  background: "transparent", color: "#ffffff",
                  padding: "14px 36px", border: "1.5px solid rgba(255,255,255,0.5)",
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#ffffff"; el.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.5)"; el.style.background = "transparent"; }}
              >
                View Careers <ArrowRight size={11} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
