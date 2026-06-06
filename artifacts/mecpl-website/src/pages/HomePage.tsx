import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import { ArrowRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── DATA ──────────────────────────────────────────────────────────── */

const heroVideos = [
  "assets/video/hero-new.mp4",
  "assets/video/hero.mp4",
  "assets/video/istockphoto-891492418-640_adpp_is.mp4",
];

const services = [
  { title: "Civil Construction",   desc: "High-performance foundational engineering for complex architectural blueprints across residential, commercial, and industrial sectors.",          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop" },
  { title: "Turnkey Projects",     desc: "Complete end-to-end project delivery — from design coordination through structural handover — under one accountable partner.",                    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop" },
  { title: "Industrial Projects",  desc: "Warehouses, logistics hubs, and manufacturing plants built to the tightest tolerance levels in the industry.",                                   image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop" },
  { title: "Residential Projects", desc: "Mid-rise to ultra-high-rise towers including Trump Towers, Godrej Boulevard, and VTP Bel Air — delivered on time.",                            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop" },
  { title: "Interior Fitouts",     desc: "Premium commercial and institutional interior fitouts combining structural reliability with aesthetic refinement.",                               image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" },
  { title: "Project Management",   desc: "Expert site governance — scheduling, cost control, safety auditing, and milestone management as a standalone service.",                         image: "https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=1200&auto=format&fit=crop" },
];

const projects = [
  { name: "Panchshil Highrise Towers", location: "Kharadi, Pune",       type: "Civil Structural Framework",      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1920&auto=format&fit=crop" },
  { name: "Trump Towers Pune",         location: "Kalyani Nagar, Pune", type: "Luxury Highrise · Civil Handover", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop" },
  { name: "Godrej Boulevard",          location: "Mamurdi, Pune",       type: "Residential Framework",           image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop" },
  { name: "VTP Bel Air",               location: "Mahalunge, Pune",     type: "Complex Core Works",              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" },
  { name: "Gera Commerzone",           location: "Kharadi, Pune",       type: "Commercial Core Infrastructure",  image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1920&auto=format&fit=crop" },
  { name: "Industrial Megaplex",       location: "Chakan, Pune",        type: "Industrial Structural Works",     image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1920&auto=format&fit=crop" },
];

const whyChoose = [
  { stat: "95%+",       title: "Timely Delivery",        desc: "Over 95% of projects handed over on or ahead of schedule." },
  { stat: "ISO\n45001", title: "Safety First",           desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site." },
  { stat: "25+\nYrs",   title: "Engineering Excellence", desc: "25+ years of structural engineering expertise on India's most complex projects." },
  { stat: "ISO\n9001",  title: "Quality Assurance",      desc: "ISO 9001:2015 certified quality management across every project phase." },
];

const testimonials = [
  { quote: "MECPL delivered our 42-storey tower ahead of schedule with exceptional structural quality. Their site management and safety protocols set a new benchmark in the industry.",                name: "Mr. Atul Chordia",   role: "Chairman, Panchshil Realty", image: "assets/projects/HIGH-RISE-1-scaled.jpg" },
  { quote: "Working with MECPL on Trump Towers Pune was a seamless experience. Their technical precision, proactive communication, and zero-compromise quality made them an invaluable partner.",       name: "Project Director",    role: "Trump Towers Pune",          image: "assets/projects/Trump-Tower.jpg"          },
  { quote: "MECPL's team demonstrated remarkable engineering capability throughout the Godrej Boulevard project. Their ability to manage complexity at scale is truly impressive.",                     name: "Senior Project Head", role: "Godrej Properties",          image: "assets/projects/GODREJ-INFINITY.jpg"      },
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

/* masonry: 6 columns, 2 items each — heights crafted for stagger variety */
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

/* ─── HOME PAGE ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const [videoIdx, setVideoIdx]     = useState(0);
  const [activeSvc, setActiveSvc]   = useState(0);
  const [svcKey, setSvcKey]         = useState(0);

  const assetBase = import.meta.env.BASE_URL;

  /* refs */
  const heroSectionRef  = useRef<HTMLElement>(null);
  const heroBgRef       = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroTagRef      = useRef<HTMLSpanElement>(null);
  const heroSubRef      = useRef<HTMLParagraphElement>(null);
  const heroCTARef      = useRef<HTMLDivElement>(null);
  const panelRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const whyRef          = useRef<HTMLElement>(null);
  const clientsRef      = useRef<HTMLElement>(null);

  /* ── HERO: initial entrance anim (SplitText chars) ── */
  useEffect(() => {
    const headline = heroHeadlineRef.current;
    const section  = heroSectionRef.current;
    if (!headline || !section) return;

    gsap.set(section, { y: "100vh", scale: 0.98 });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitText[] = [];

        const runHeroAnims = () => {
          gsap.to(section, { y: 0, scale: 1, duration: 1.0, ease: "power3.out" });

          const lines = headline.querySelectorAll<HTMLElement>(".hero-line");
          lines.forEach((line, i) => {
            const split = new SplitText(line, { type: "chars", charsClass: "hp-char" });
            splits.push(split);
            gsap.from(split.chars, {
              yPercent: 115, opacity: 0, duration: 1.2, stagger: 0.022,
              ease: "power4.out", delay: 0.15 + i * 0.18,
            });
          });

          const tagEl = heroTagRef.current;
          if (tagEl) gsap.from(tagEl, { opacity: 0, y: 16, duration: 0.9, delay: 0.1, ease: "power3.out" });

          const subEl = heroSubRef.current;
          if (subEl) gsap.from(subEl, { opacity: 0, y: 20, duration: 0.9, delay: 0.8, ease: "power3.out" });

          const ctaEl = heroCTARef.current;
          if (ctaEl?.children.length) {
            gsap.from(Array.from(ctaEl.children), {
              opacity: 0, y: 20, duration: 0.8, stagger: 0.12, delay: 1.0, ease: "power3.out",
            });
          }
        };

        if ((window as any)._preloaderDone) {
          gsap.set(section, { y: 0, scale: 1 });
          runHeroAnims();
        } else {
          window.addEventListener("preloader-exit", () => runHeroAnims(), { once: true });
        }

        return () => splits.forEach(s => s.revert());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(section, { y: 0, scale: 1 });
        window.addEventListener("preloader-exit", () => gsap.set(section, { y: 0, scale: 1 }), { once: true });
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── HERO: video cycling (3 local videos) ── */
  useEffect(() => {
    const id = setInterval(() => setVideoIdx(v => (v + 1) % heroVideos.length), 8000);
    return () => clearInterval(id);
  }, []);

  /* ── SERVICES: auto-advance active tab every 5s ── */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSvc(v => {
        const next = (v + 1) % services.length;
        setSvcKey(k => k + 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* ── PROJECTS: ScrollTrigger pin/reveal sequence ── */
  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length < 2) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: () => `+=${panel.offsetHeight}`,
            pin: true,
            pinSpacing: true,
          });
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── WHY CHOOSE: scroll reveal ── */
  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".why-card", sec).forEach((card, i) => {
          gsap.from(card, {
            y: 36, opacity: 0, duration: 0.75, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none none" },
          });
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── CLIENTS: infinite logo ticker (row 1) ── */
  useEffect(() => {
    const sec = clientsRef.current;
    if (!sec) return;
    const track = sec.querySelector<HTMLElement>(".clients-track");
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth / 2),
        duration: 22, ease: "none", repeat: -1,
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

  /* ─── JSX ─────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: "#ffffff", color: "#111827" }}>

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroSectionRef}
        className="relative h-screen overflow-hidden"
        data-testid="section-hero"
      >
        {/* Background: cycling video + images */}
        <div ref={heroBgRef} className="absolute inset-0 z-0">
          {/* 3 cycling construction videos */}
          {heroVideos.map((src, i) => (
            <video
              key={i}
              autoPlay muted loop playsInline
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
                opacity: videoIdx === i ? 1 : 0,
                transition: "opacity 1.2s ease",
              }}
            >
              <source src={`${assetBase}${src}`} type="video/mp4" />
            </video>
          ))}
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.28) 100%)",
          }} />
        </div>

        {/* Counter + progress — top right */}
        <div style={{
          position: "absolute", top: "96px", right: "40px",
          zIndex: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px",
        }}>
          <div style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
            fontWeight: 300, color: "rgba(255,255,255,0.65)", letterSpacing: "0.22em",
          }}>
            {String(videoIdx + 1).padStart(2, "0")} / {String(heroVideos.length).padStart(2, "0")}
          </div>
          <div style={{ width: "72px", height: "1px", background: "rgba(255,255,255,0.18)", position: "relative", overflow: "hidden" }}>
            <div key={videoIdx} className="hero-progress-bar" style={{
              position: "absolute", left: 0, top: 0, height: "100%", background: "#ffffff",
            }} />
          </div>
        </div>

        {/* Editorial text — bottom left */}
        <div style={{
          position: "absolute", bottom: "128px", left: "40px", right: "200px", zIndex: 20,
        }}>
          <span ref={heroTagRef} style={{
            display: "block",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "9px", fontWeight: 300, letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: "22px",
          }}>
            EST. 1998 · PUNE, INDIA
          </span>

          <div ref={heroHeadlineRef} style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: "clamp(2.8rem,6.5vw,5.5rem)",
            color: "#ffffff", lineHeight: 0.98,
            textTransform: "uppercase", letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}>
            <div className="hero-line" style={{ overflow: "hidden" }}>BUILDING</div>
            <div className="hero-line" style={{ overflow: "hidden", color: "#C41E3A" }}>INDIA'S SKYLINE</div>
          </div>

          <p ref={heroSubRef} style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "13px", fontWeight: 400,
            color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em", margin: 0,
          }}>
            Structural engineering for landmark projects
          </p>
        </div>

        {/* CTA buttons — bottom center */}
        <div ref={heroCTARef} className="absolute bottom-10 left-0 right-0 z-20 hidden md:flex items-center justify-center gap-4 px-6">
          <Link href="/completed-projects" data-testid="button-hero-projects">
            <span
              className="inline-flex items-center cursor-pointer"
              style={{ background: "#C41E3A", color: "#ffffff", padding: "12px 28px", fontFamily: "'Montserrat',sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, transition: "background 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#a51830")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#C41E3A")}
            >
              View Projects
            </span>
          </Link>
          <Link href="/careers" data-testid="button-hero-careers">
            <span
              className="inline-flex items-center cursor-pointer"
              style={{ background: "transparent", color: "#ffffff", padding: "12px 28px", fontFamily: "'Montserrat',sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid rgba(255,255,255,0.55)", transition: "border-color 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "#ffffff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.55)")}
            >
              Explore Careers
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════ ABOUT US ══════════ */}
      <section
        data-testid="section-about"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 40px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: editorial heading */}
            <div>
              <span style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 700,
                letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase",
                display: "block", marginBottom: "20px",
              }}>
                EST. 1998
              </span>
              <h2 style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "clamp(3rem,7vw,6rem)",
                fontWeight: 200, color: "#111827",
                lineHeight: 0.95, letterSpacing: "-0.03em",
                textTransform: "uppercase", margin: "0 0 32px",
              }}>
                About
              </h2>
              <div style={{ width: "48px", height: "2px", background: "#C41E3A" }} />
            </div>

            {/* Right: content */}
            <div className="space-y-8">
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", lineHeight: 1.85, color: "#4b5563" }}>
                Since 1998, MECPL has been the structural partner of choice for India's leading developers — from Trump Towers to Panchshil's skyline-defining highrises. We combine ISO-certified processes with 25 years of on-site wisdom to deliver structures that stand for generations.
              </p>

              {/* ISO cert pills */}
              <div className="flex flex-wrap gap-2">
                {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "CRISIL SME 1"].map(cert => (
                  <span key={cert} style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "#111827", border: "1px solid rgba(17,24,39,0.18)",
                    padding: "5px 12px", borderRadius: "2px",
                  }}>
                    {cert}
                  </span>
                ))}
              </div>

              <Link href="/about" data-testid="button-about-more">
                <span className="inline-flex items-center gap-2 cursor-pointer hover:gap-4 transition-all" style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em",
                  color: "#C41E3A", textTransform: "uppercase", fontWeight: 600,
                }}>
                  Our Full Story <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES — Hometi tab layout ══════════ */}
      <section
        data-testid="section-services"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 0" }}
      >
        <div className="max-w-7xl mx-auto px-10">
          {/* Header */}
          <div style={{ marginBottom: "56px" }}>
            <span style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase",
              display: "block", marginBottom: "12px",
            }}>
              WHAT WE BUILD
            </span>
            <h2 style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#111827",
              textTransform: "uppercase", letterSpacing: "0.04em", margin: 0,
            }}>
              Our Services
            </h2>
          </div>

          {/* Two-column: left tabs | right image */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", minHeight: "520px" }}>
            {/* Left: tab rows */}
            <div style={{ borderRight: "1px solid rgba(0,0,0,0.07)" }}>
              {services.map((svc, i) => {
                const isActive = activeSvc === i;
                return (
                  <div
                    key={i}
                    onClick={() => { setActiveSvc(i); setSvcKey(k => k + 1); }}
                    style={{
                      padding: "22px 28px",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      borderLeft: isActive ? "3px solid #C41E3A" : "3px solid transparent",
                      background: isActive ? "rgba(196,30,58,0.02)" : "transparent",
                      cursor: "pointer",
                      transition: "border-color 0.25s, background 0.25s",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                        fontWeight: 300, letterSpacing: "0.1em", lineHeight: 1.9,
                        color: isActive ? "#C41E3A" : "rgba(17,24,39,0.28)",
                        transition: "color 0.25s", flexShrink: 0, minWidth: "24px",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div style={{
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: "12px",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "#111827" : "rgba(17,24,39,0.55)",
                          letterSpacing: "0.14em", textTransform: "uppercase",
                          marginBottom: "5px", transition: "color 0.25s",
                        }}>
                          {svc.title}
                        </div>
                        <div style={{
                          fontFamily: "'Montserrat',sans-serif", fontSize: "11px",
                          color: "rgba(17,24,39,0.4)", lineHeight: 1.6,
                        }}>
                          {svc.desc.split(".")[0]}.
                        </div>
                      </div>
                    </div>

                    {/* Progress line at bottom of active row */}
                    {isActive && (
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: "2px", background: "rgba(196,30,58,0.10)", overflow: "hidden",
                      }}>
                        <div
                          key={svcKey}
                          className="svc-tab-progress"
                          style={{ height: "100%", background: "#C41E3A" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: image panel */}
            <div style={{ position: "relative", overflow: "hidden", background: "#f0f0f0" }}>
              {services.map((svc, i) => (
                <img
                  key={i}
                  src={svc.image}
                  alt={svc.title}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: activeSvc === i ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                />
              ))}
              {/* Service name overlay bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
                padding: "48px 32px 28px",
              }}>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                  letterSpacing: "0.22em", color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase", marginBottom: "6px",
                }}>
                  {String(activeSvc + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "18px",
                  fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>
                  {services[activeSvc].title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROJECTS — full-bleed sticky panels ══════════ */}
      <section data-testid="section-projects" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ position: "relative" }}>
          {projects.map((proj, i) => (
            <div
              key={i}
              ref={el => { panelRefs.current[i] = el; }}
              style={{
                height: "100vh", zIndex: i + 1,
                overflow: "hidden", position: "relative",
              }}
            >
              <img
                src={proj.image}
                alt={proj.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Bottom gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)",
              }} />
              {/* Text — bottom */}
              <div style={{
                position: "absolute", bottom: "48px", left: "48px", right: "48px",
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                    letterSpacing: "0.26em", color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase", marginBottom: "12px",
                  }}>
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                  <h2 style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "clamp(2rem,4.5vw,4rem)",
                    fontWeight: 800, color: "#ffffff",
                    lineHeight: 0.96, margin: 0,
                    textTransform: "uppercase", letterSpacing: "-0.01em",
                  }}>
                    {proj.name}
                  </h2>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: "24px" }}>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    fontWeight: 500, color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "5px",
                  }}>
                    {proj.location}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                    color: "rgba(255,255,255,0.38)", letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}>
                    {proj.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* After panels CTA */}
        <div style={{
          background: "#ffffff", padding: "80px 48px",
          borderTop: "1px solid rgba(0,0,0,0.07)", textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
            color: "rgba(17,24,39,0.3)", letterSpacing: "0.14em",
            textTransform: "uppercase", marginBottom: "20px",
          }}>
            150+ landmark projects across India
          </div>
          <Link href="/completed-projects" data-testid="button-all-projects">
            <span className="inline-flex items-center gap-2 cursor-pointer hover:gap-4 transition-all" style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
              letterSpacing: "0.2em", color: "#C41E3A",
              textTransform: "uppercase", fontWeight: 600,
              borderBottom: "1px solid rgba(196,30,58,0.32)", paddingBottom: "5px",
            }}>
              View All Projects <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE — 2×2 grid ══════════ */}
      <section
        ref={whyRef}
        data-testid="section-why-mecpl"
        style={{ background: "#f8fafc", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "100px 40px" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div style={{ marginBottom: "64px" }}>
            <span style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase",
              display: "block", marginBottom: "12px",
            }}>
              OUR ADVANTAGE
            </span>
            <h2 style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#111827",
              textTransform: "uppercase", letterSpacing: "0.04em", margin: 0,
            }}>
              Why Choose MECPL
            </h2>
          </div>

          {/* 2×2 grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px", background: "rgba(0,0,0,0.07)",
          }}>
            {whyChoose.map((item, i) => (
              <div
                key={i}
                className="why-card"
                data-testid={`card-why-${i}`}
                style={{
                  background: "#ffffff", padding: "48px 40px",
                  borderTop: "4px solid #C41E3A",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#fef2f2")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#ffffff")}
              >
                <div style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                  fontWeight: 800, color: "#C41E3A",
                  marginBottom: "12px", lineHeight: 1.1, whiteSpace: "pre-line",
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
                  fontWeight: 700, color: "#111827", marginBottom: "12px",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  {item.title}
                </div>
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
                  lineHeight: 1.75, color: "#6b7280", margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS — masonry collage + 3 cards ══════════ */}
      <section
        data-testid="section-testimonials"
        style={{ background: "#f8fafc", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "80px 0" }}
      >
        {/* Section heading */}
        <div style={{ padding: "0 40px", marginBottom: "56px", textAlign: "center" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase",
            display: "block", marginBottom: "16px",
          }}>
            CLIENT VOICES
          </span>
          <h2 style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3.6rem)",
            fontWeight: 700, color: "#111827",
            lineHeight: 1.05, margin: "0 0 4px",
            textTransform: "uppercase", letterSpacing: "-0.02em",
          }}>
            Trusted by India's leading
          </h2>
          <h2 style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3.6rem)",
            fontWeight: 200, color: "rgba(17,24,39,0.45)",
            lineHeight: 1.05, margin: 0,
            textTransform: "uppercase", letterSpacing: "-0.02em",
          }}>
            developers and structural partners
          </h2>
        </div>

        {/* Top: masonry photo collage */}
        <div style={{ position: "relative", marginBottom: "64px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "10px", padding: "0 32px" }}>
            {masonryCols.map((col, ci) => (
              <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.map((photo, pi) => (
                  <div key={pi} style={{
                    height: `${photo.h}px`, borderRadius: "14px",
                    overflow: "hidden", flexShrink: 0,
                  }}>
                    <img
                      src={photo.src}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: 3 testimonial cards — responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{
          gap: "24px", maxWidth: "1100px",
          margin: "0 auto", padding: "0 40px",
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: "#ffffff", borderRadius: "12px",
              padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column",
            }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              {/* Quote */}
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "12.5px",
                lineHeight: 1.85, color: "#374151",
                marginBottom: "24px", flex: 1,
              }}>
                "{t.quote}"
              </p>
              {/* Attribution */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0, background: "#e5e7eb",
                }}>
                  <img
                    src={`${assetBase}${t.image}`}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "11px",
                    fontWeight: 700, color: "#111827", letterSpacing: "0.08em",
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    color: "rgba(17,24,39,0.45)", marginTop: "2px", letterSpacing: "0.06em",
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CLIENTS — heading + single auto-scroll row ══════════ */}
      <section
        ref={clientsRef}
        data-testid="section-clients"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "80px 0" }}
      >
        {/* Section heading */}
        <div style={{ padding: "0 40px", marginBottom: "56px", textAlign: "center" }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.28em", color: "#C41E3A", textTransform: "uppercase",
            display: "block", marginBottom: "16px",
          }}>
            OUR CLIENTS
          </span>
          <h2 style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3.6rem)",
            fontWeight: 700, color: "#111827",
            lineHeight: 1.05, margin: "0 0 4px",
            textTransform: "uppercase", letterSpacing: "-0.02em",
          }}>
            Trusted by India's
          </h2>
          <h2 style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3.6rem)",
            fontWeight: 200, color: "rgba(17,24,39,0.45)",
            lineHeight: 1.05, margin: 0,
            textTransform: "uppercase", letterSpacing: "-0.02em",
          }}>
            finest developers
          </h2>
        </div>

        {/* Single auto-scrolling ticker row */}
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
                <img
                  src={`${assetBase}${c.logo}`}
                  alt={c.name}
                  style={{ maxWidth: "100%", maxHeight: "52px", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DUAL CTA ══════════ */}
      <section
        data-testid="section-dual-cta"
        style={{ background: "#111827", padding: "100px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto" style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          gap: "0", alignItems: "center",
        }}>
          {/* Left block */}
          <div style={{ textAlign: "center", padding: "0 60px 0 0" }}>
            <div style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "clamp(1.5rem,3vw,2.5rem)",
              fontWeight: 800, color: "#ffffff",
              textTransform: "uppercase", lineHeight: 1.05,
              marginBottom: "16px", letterSpacing: "-0.01em",
            }}>
              LET'S BUILD<br />TOGETHER
            </div>
            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
              color: "rgba(255,255,255,0.45)", marginBottom: "36px", lineHeight: 1.6,
            }}>
              Connect with our engineering team
            </p>
            <Link href="/contact" data-testid="button-cta-contact">
              <span
                className="inline-flex items-center gap-2 cursor-pointer transition-all"
                style={{
                  background: "#C41E3A", color: "#ffffff",
                  padding: "14px 36px",
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#a51830")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#C41E3A")}
              >
                Contact MECPL <ArrowRight size={11} />
              </span>
            </Link>
          </div>

          {/* Vertical divider */}
          <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", alignSelf: "stretch", minHeight: "180px" }} />

          {/* Right block */}
          <div style={{ textAlign: "center", padding: "0 0 0 60px" }}>
            <div style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "clamp(1.5rem,3vw,2.5rem)",
              fontWeight: 800, color: "#ffffff",
              textTransform: "uppercase", lineHeight: 1.05,
              marginBottom: "16px", letterSpacing: "-0.01em",
            }}>
              JOIN<br />OUR TEAM
            </div>
            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
              color: "rgba(255,255,255,0.45)", marginBottom: "36px", lineHeight: 1.6,
            }}>
              Explore career opportunities at MECPL
            </p>
            <Link href="/careers" data-testid="button-cta-careers">
              <span
                className="inline-flex items-center gap-2 cursor-pointer transition-all"
                style={{
                  background: "transparent", color: "#ffffff",
                  padding: "14px 36px", border: "1.5px solid rgba(255,255,255,0.35)",
                  fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#ffffff"; el.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.35)"; el.style.background = "transparent"; }}
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
