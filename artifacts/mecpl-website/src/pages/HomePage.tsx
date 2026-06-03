import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import {
  ArrowRight, Clock, Building2, HardHat,
  Factory, Home, Layers, ClipboardList, CheckCircle, Timer, Shield,
  Star, Users, Wrench, Quote, Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── DATA ──────────────────────────────────────────────────────────── */

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop",
    tag: "25+ Years of Structural Excellence",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop",
    tag: "150+ Landmark Projects Delivered",
  },
  {
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=1920&auto=format&fit=crop",
    tag: "ISO 9001 · 14001 · 45001 Certified",
  },
];

const stats = [
  { value: 25,  suffix: "+",  label: "Years Legacy",         sub: "Since 1998" },
  { value: 150, suffix: "+",  label: "Projects Handed Over", sub: "Across India" },
  { value: 20,  suffix: "M+", label: "Sq. Ft. Executed",     sub: "Structural Work" },
  { value: 50,  suffix: "+",  label: "Tier-1 Clients",       sub: "Trust MECPL" },
];

const services = [
  { icon: Building2,   title: "Civil Construction",  desc: "High-performance foundational engineering for complex architectural blueprints across residential, commercial, and industrial sectors.",           image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop", path: "/services" },
  { icon: ClipboardList, title: "Turnkey Projects",    desc: "Complete end-to-end project delivery — from design coordination through structural handover — under one accountable partner.",                   image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", path: "/services" },
  { icon: Factory,     title: "Industrial Projects",  desc: "Warehouses, logistics hubs, and manufacturing plants built to the tightest tolerance levels in the industry.",                                  image: "https://images.unsplash.com/photo-1567361672830-f7aa558020c4?q=80&w=800&auto=format&fit=crop", path: "/services" },
  { icon: Home,        title: "Residential Projects", desc: "Mid-rise to ultra-high-rise towers including Trump Towers, Godrej Boulevard, and VTP Bel Air — delivered on time.",                           image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop", path: "/services" },
  { icon: Layers,      title: "Interior Fitouts",     desc: "Premium commercial and institutional interior fitouts combining structural reliability with aesthetic refinement.",                              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", path: "/services" },
  { icon: HardHat,     title: "Project Management",   desc: "Expert site governance — scheduling, cost control, safety auditing, and milestone management as a standalone service.",                        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop", path: "/services" },
];

const projects = [
  { name: "Panchshil Highrise Towers", location: "Kharadi, Pune",       type: "Civil Structural Framework",      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop", featured: true },
  { name: "Trump Towers Pune",         location: "Kalyani Nagar, Pune", type: "Luxury Highrise · Civil Handover", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop" },
  { name: "Godrej Boulevard",          location: "Mamurdi, Pune",       type: "Residential Framework",           image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop" },
  { name: "VTP Bel Air",               location: "Mahalunge, Pune",     type: "Complex Core Works",              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" },
  { name: "Gera Commerzone",           location: "Kharadi, Pune",       type: "Commercial Core Infrastructure",  image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1200&auto=format&fit=crop" },
  { name: "Industrial Megaplex",       location: "Chakan, Pune",        type: "Industrial Structural Works",     image: "https://images.unsplash.com/photo-1567361672830-f7aa558020c4?q=80&w=1200&auto=format&fit=crop" },
];

const whyChoose = [
  { icon: Timer,       title: "Timely Delivery",        desc: "Over 95% of projects handed over on or ahead of schedule." },
  { icon: Shield,      title: "Safety First",           desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site." },
  { icon: Star,        title: "Engineering Excellence", desc: "25+ years of structural engineering expertise on India's most complex projects." },
  { icon: CheckCircle, title: "Quality Assurance",      desc: "ISO 9001:2015 certified quality management across every project phase." },
  { icon: Users,       title: "Experienced Team",       desc: "300+ trained engineers, site managers, and safety officers." },
  { icon: Wrench,      title: "End-to-End Solutions",   desc: "From concept to completion — MECPL manages the full construction lifecycle." },
];

const testimonials = [
  { quote: "MECPL delivered our 42-storey tower ahead of schedule with exceptional structural quality. Their site management and safety protocols set a new benchmark in the industry.",                   name: "Mr. Atul Chordia",   role: "Chairman, Panchshil Realty" },
  { quote: "Working with MECPL on Trump Towers Pune was a seamless experience. Their technical precision, proactive communication, and zero-compromise quality made them an invaluable partner.",          name: "Project Director",    role: "Trump Towers Pune" },
  { quote: "MECPL's team demonstrated remarkable engineering capability throughout the Godrej Boulevard project. Their ability to manage complexity at scale is truly impressive.",                        name: "Senior Project Head", role: "Godrej Properties" },
];

const clients = ["TRUMP TOWERS", "GODREJ PROPS", "VTP REALTY", "PANCHSHIL", "KALPATARU", "K RAHEJA", "MALPANI", "GERA DEVS"];

const serviceRows = [
  {
    word: "CONSTRUCT",
    title: "Civil Construction",
    desc: "High-performance foundational engineering for complex architectural blueprints across residential, commercial, and industrial sectors.",
    image: "/assets/projects/HIGH-RISE-1-scaled.jpg",
    path: "/services",
    imgRight: true,
  },
  {
    word: "DELIVER",
    title: "Turnkey Projects",
    desc: "Complete end-to-end project delivery — from design coordination through structural handover — under one accountable partner.",
    image: "/assets/projects/GODREJ-INFINITY.jpg",
    path: "/services",
    imgRight: false,
  },
  {
    word: "BUILD",
    title: "Industrial & Residential",
    desc: "From warehouse megaplexes to ultra-high-rise residential towers — built to the tightest tolerances in the industry.",
    image: "/assets/projects/AMTEK-AUTO-LTD.png",
    path: "/services",
    imgRight: true,
  },
];

const tickerItems = [
  "ISO 9001:2015 Certified", "ISO 14001:2015 Environmental Integrity", "ISO 45001:2018 Occupational Safety",
  "CRISIL SME 1 Rating", "25+ Years of Structural Excellence", "150+ Landmark Projects", "MECPL — Building India's Future",
];

const bentoClients = [
  { name: "TRUMP TOWERS",  col: 2, bg: "#111827",              text: "#ffffff",  height: 176 },
  { name: "VTP REALTY",    col: 1, bg: "rgba(196,30,58,0.05)", text: "#C41E3A",  border: "rgba(196,30,58,0.2)", height: 176 },
  { name: "PANCHSHIL",     col: 1, bg: "#f0f0f0",              text: "#111827",  height: 176 },
  { name: "GODREJ PROPS",  col: 1, bg: "#ffffff",              text: "#111827",  border: "rgba(0,0,0,0.10)", height: 144 },
  { name: "KALPATARU",     col: 1, bg: "#C41E3A",              text: "#ffffff",  height: 144 },
  { name: "K RAHEJA",      col: 2, bg: "#1e293b",              text: "#ffffff",  height: 144 },
  { name: "MALPANI",       col: 2, bg: "#f5f5f5",              text: "#111827",  height: 120 },
  { name: "GERA DEVS",     col: 2, bg: "#ffffff",              text: "#111827",  border: "rgba(0,0,0,0.10)", height: 120 },
];

/* ─── HOME PAGE ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const assetBase = import.meta.env.BASE_URL;

  const heroSectionRef   = useRef<HTMLElement>(null);
  const heroBgRef        = useRef<HTMLDivElement>(null);
  const heroHeadlineRef  = useRef<HTMLDivElement>(null);
  const heroTagRef       = useRef<HTMLSpanElement>(null);
  const heroSubRef       = useRef<HTMLParagraphElement>(null);
  const heroCTARef       = useRef<HTMLDivElement>(null);
  const statsRef         = useRef<HTMLElement>(null);
  const servicesRef      = useRef<HTMLElement>(null);
  const projectsRef      = useRef<HTMLElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const whyRef           = useRef<HTMLElement>(null);
  const testimonialsRef  = useRef<HTMLElement>(null);
  const clientsRef       = useRef<HTMLElement>(null);
  const awardsRef        = useRef<HTMLElement>(null);

  /* Hero auto-slide */
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* ── HERO: SplitText chars + parallax bg — waits for preloader-exit ── */
  useEffect(() => {
    const headline = heroHeadlineRef.current;
    const heroBg   = heroBgRef.current;
    const section  = heroSectionRef.current;
    if (!headline || !heroBg || !section) return;

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

          gsap.to(heroBg, {
            yPercent: 28, ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });
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

  /* ── STATS: pinned sequence + scroll-scrub count-up ── */
  useEffect(() => {
    const sec = statsRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ruler = sec.querySelector<HTMLElement>(".stat-ruler");
        const items = gsap.utils.toArray<HTMLElement>(".stat-item", sec);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec, start: "top top", end: "+=900",
            pin: true, scrub: 1.5, anticipatePin: 1, invalidateOnRefresh: true,
          },
        });

        if (ruler) {
          gsap.set(ruler, { scaleX: 0 });
          tl.to(ruler, { scaleX: 1, duration: 1, ease: "power3.out" });
        }

        items.forEach((item, i) => {
          const numEl = item.querySelector<HTMLElement>(".stat-num");
          gsap.set(item, { opacity: 0, y: 50 });

          if (numEl) {
            /* Read the target value + suffix baked into data-attributes */
            const target = parseFloat(numEl.dataset.value || "0");
            const suffix = numEl.dataset.suffix || "";
            const proxy  = { val: 0 };

            /* Reveal the item, then count the number in sync with scrub */
            tl.to(item, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.8 + i * 0.45)
              .to(proxy, {
                val: target, duration: 1.2, ease: "power2.out",
                snap: { val: 1 },
                onUpdate() { numEl.textContent = Math.round(proxy.val) + suffix; },
              }, "<");
          } else {
            tl.to(item, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.8 + i * 0.45);
          }
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── SERVICES: row entrance + scroll-driven image scale ── */
  useEffect(() => {
    const sec = servicesRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".svc-row", sec).forEach(row => {
          gsap.from(row, {
            opacity: 0, y: 50, duration: 1.0, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".svc-img", sec).forEach(img => {
          gsap.fromTo(img,
            { scale: 1.0 },
            {
              scale: 1.08, ease: "none",
              scrollTrigger: {
                trigger: img.closest(".svc-img-wrap") as HTMLElement,
                start: "top bottom", end: "bottom top", scrub: true,
              },
            }
          );
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── PROJECTS: horizontal scroll panel ── */
  useEffect(() => {
    const container = projectsRef.current;
    const track     = projectsTrackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getAmt = () => -(track.scrollWidth - window.innerWidth);

      /* Save the tween — containerAnimation needs the tween, NOT the ScrollTrigger */
      const projTween = gsap.to(track, {
        x: getAmt, ease: "none",
        scrollTrigger: {
          trigger: container, start: "top top",
          end: () => `+=${Math.abs(getAmt())}`,
          pin: true, scrub: 1.5, invalidateOnRefresh: true, anticipatePin: 1,
        },
      });

      const imgs = gsap.utils.toArray<HTMLElement>(".proj-img", track);
      imgs.forEach(img => {
        gsap.fromTo(img,
          { scale: 1.0 },
          {
            scale: 1.08, ease: "none",
            scrollTrigger: {
              trigger: img.closest(".h-scroll-card") as HTMLElement,
              containerAnimation: projTween,
              start: "left right", end: "right left", scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── WHY CHOOSE: stacked rows slide-in ── */
  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".why-row", sec).forEach((row, i) => {
          gsap.from(row, {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
          });
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── TESTIMONIALS:
       LAYOUT  → VwbywPd: layered pinning — each 100vh card pins at top,
                 next card scrolls over it (pinSpacing:false, z-index stack)
       TEXT    → GggpRoB: AutoSplit mask:"lines" — when a card pins into
                 view its quote lines slide up from yPercent:120 (overflow
                 hidden per line), staggered, playing once on entry. ── */
  useEffect(() => {
    const sec = testimonialsRef.current;
    if (!sec) return;

    const splits: { revert: () => void }[] = [];
    let cancelled = false;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".testi-block", sec);

        /* ── VwbywPd: layered pin each card ── */
        cards.forEach((card, i) => {
          gsap.set(card, { zIndex: i + 1 });

          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
          });

          /* Cards 2+ lift in over the pinned card below */
          if (i > 0) {
            gsap.from(card, {
              opacity: 0,
              y: 24,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 98%",
                end: "top top",
                scrub: 1,
              },
            });
          }
        });

        /* ── GggpRoB: AutoSplit line-mask reveal on each card ── */
        document.fonts.ready.then(() => {
          if (cancelled) return;

          cards.forEach((card) => {
            const quoteEl = card.querySelector<HTMLElement>(".testi-quote");
            if (!quoteEl) return;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const split = (SplitText as any).create(quoteEl, {
              type: "words,lines",
              mask: "lines",
              linesClass: "testi-line",
              autoSplit: true,
              onSplit: (instance: { lines: HTMLElement[] }) => {
                /* Play line-reveal once when the card pins to top */
                return gsap.from(instance.lines, {
                  yPercent: 120,
                  stagger: 0.12,
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top top+=2",
                    toggleActions: "play none none reset",
                  },
                });
              },
            });
            splits.push(split);
          });
        });

        return () => {
          cancelled = true;
          splits.forEach(s => s.revert());
        };
      });
    }, sec);

    return () => {
      cancelled = true;
      splits.forEach(s => s.revert());
      ctx.revert();
    };
  }, []);

  /* ── CLIENTS: name grid entrance ── */
  useEffect(() => {
    const sec = clientsRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".client-name", sec).forEach((cell, i) => {
          gsap.from(cell, {
            opacity: 0, y: 24, duration: 0.7, ease: "power3.out", delay: i * 0.05,
            scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none none" },
          });
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── AWARDS: rows enter from right ── */
  useEffect(() => {
    const sec = awardsRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fadeEl = sec.querySelector<HTMLElement>("[data-animate='fade']");
        if (fadeEl) {
          gsap.from(fadeEl, {
            y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" },
          });
        }
        gsap.utils.toArray<HTMLElement>(".award-row", sec).forEach((row, i) => {
          gsap.from(row, {
            x: 40, opacity: 0, duration: 0.7, ease: "power3.out", delay: i * 0.07,
            scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
          });
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);


  const s = heroSlides[slide];

  /* ─── JSX ─────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: "#ffffff", color: "#111827" }}>

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroSectionRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        <div ref={heroBgRef} className="absolute inset-0 z-0 scale-110 will-change-transform">
          {heroSlides.map((sl, i) => (
            <img
              key={i}
              src={sl.image}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${i === slide ? "opacity-40" : "opacity-0"}`}
              alt="Construction backdrop"
            />
          ))}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
            <source src={`${assetBase}assets/video/hero.webm`} type="video/webm" />
            <source src={`${assetBase}assets/video/hero.mp4`}  type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span
            ref={heroTagRef}
            className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C41E3A] border border-[#C41E3A]/30 px-4 py-2 mb-8"
            style={{ fontFamily: "'Montserrat',sans-serif" }}
          >
            {s.tag}
          </span>

          <div ref={heroHeadlineRef}>
            {/* dangerouslySetInnerHTML prevents React from creating text fibers
                that SplitText's char-splitting would later conflict with */}
            <div className="hero-line overflow-hidden block text-[clamp(3.5rem,8vw,7rem)] font-bold uppercase leading-none tracking-tight text-white mb-1"
              style={{ fontFamily: "'Montserrat',sans-serif" }}
              dangerouslySetInnerHTML={{ __html: "Engineering" }} />
            <div className="hero-line overflow-hidden block text-[clamp(3.5rem,8vw,7rem)] font-bold uppercase leading-none tracking-tight mb-1"
              style={{ fontFamily: "'Montserrat',sans-serif", color: "#C41E3A" }}
              dangerouslySetInnerHTML={{ __html: "Excellence" }} />
            <div className="hero-line overflow-hidden block text-[clamp(3.5rem,8vw,7rem)] font-bold uppercase leading-none tracking-tight text-white"
              style={{ fontFamily: "'Montserrat',sans-serif" }}
              dangerouslySetInnerHTML={{ __html: "Delivered" }} />
          </div>

          <p ref={heroSubRef}
            className="mt-8 text-white/65 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(0.9rem,1.5vw,1.1rem)" }}>
            Pune's premier structural engineering contractor — 25 years, 150+ landmark projects, and India's most trusted development partners.
          </p>

          <div ref={heroCTARef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/completed-projects" data-testid="button-hero-projects">
              <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#ab1831] text-white px-8 py-4 cursor-pointer transition-all"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                View Projects <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/about" data-testid="button-hero-about">
              <span className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-8 py-4 cursor-pointer transition-all"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                Our Story
              </span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`transition-all duration-300 cursor-pointer ${i === slide ? "w-8 h-1 bg-[#C41E3A]" : "w-2 h-1 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
      </section>

      {/* ══════════ CERTIFICATION TICKER ══════════ */}
      <div className="overflow-hidden border-y py-3.5"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: "#f7f7f7" }}
        data-testid="section-ticker">
        <div className="animate-ticker">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-8 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(17,24,39,0.45)", textTransform: "uppercase" }}>
              {item}
              <span style={{ color: "#C41E3A", fontSize: "6px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ STATS ══════════ */}
      <section ref={statsRef}
        className="min-h-screen flex items-center border-b"
        style={{ background: "#ffffff", borderColor: "rgba(0,0,0,0.07)" }}
        data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="mb-16">
            <div className="stat-ruler h-px w-full" style={{ background: "#C41E3A" }} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            {stats.map((st, i) => (
              <div key={i} className="stat-item px-0 lg:px-10 first:pl-0 last:pr-0 space-y-3">
                <div className="overflow-hidden">
                  {/* dangerouslySetInnerHTML lets GSAP own the text — prevents React
                      reconciliation from fighting the count-up onUpdate mutation */}
                  <div className="stat-num font-bold uppercase"
                    data-value={st.value}
                    data-suffix={st.suffix}
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(3rem,6vw,5rem)", color: "#C41E3A", lineHeight: 1 }}
                    dangerouslySetInnerHTML={{ __html: `0${st.suffix}` }}
                  />
                </div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#111827", textTransform: "uppercase" }}>
                  {st.label}
                </div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", color: "rgba(17,24,39,0.4)", letterSpacing: "0.1em" }}>
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT STRIP ══════════ */}
      <section className="py-28 px-6 border-b"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: "#f9f9f9" }}
        data-testid="section-about-strip">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                  Our Foundation
                </span>
                <h2 className="font-bold uppercase leading-tight"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#111827", fontWeight: 700 }}>
                  Structural Precision.<br />
                  <span style={{ color: "#C41E3A" }}>Timeless Legacy.</span>
                </h2>
              </div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", lineHeight: 1.8, color: "#4b5563" }}>
                Since 1998, MECPL has been the structural partner of choice for India's leading developers — from Trump Towers to Panchshil's skyline-defining highrises. We combine ISO-certified processes with 25 years of on-site wisdom to deliver structures that stand for generations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "ISO 9001:2015", sub: "Quality" },
                  { label: "ISO 45001:2018", sub: "Safety" },
                  { label: "CRISIL SME 1", sub: "Rating" },
                  { label: "ISO 14001:2015", sub: "Environment" },
                ].map(cert => (
                  <div key={cert.label} className="p-4 border"
                    style={{ borderColor: "rgba(196,30,58,0.2)", background: "rgba(196,30,58,0.03)" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 700, color: "#111827", letterSpacing: "0.1em" }}>{cert.label}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", color: "rgba(17,24,39,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "3px" }}>{cert.sub}</div>
                  </div>
                ))}
              </div>
              <Link href="/about" data-testid="button-about-more">
                <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                  Our Full Story <ArrowRight size={12} />
                </span>
              </Link>
            </div>
            <div className="relative h-[480px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop"
                alt="MECPL construction site"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6">
                <div className="inline-block px-4 py-2" style={{ background: "#C41E3A" }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>
                    Pune HQ · Balewadi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section ref={servicesRef}
        className="border-b"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: "#ffffff" }}
        data-testid="section-services">

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
              What We Build
            </span>
            <h2 className="font-bold uppercase" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#111827", fontWeight: 700 }}>
              Our Services
            </h2>
          </div>
          <Link href="/services" data-testid="button-all-services">
            <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
              All Services <ArrowRight size={12} />
            </span>
          </Link>
        </div>

        {serviceRows.map((row, i) => (
          <div key={i}
            className={`svc-row flex flex-col ${row.imgRight ? "md:flex-row" : "md:flex-row-reverse"}`}
            style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>

            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none" style={{ zIndex: 0 }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(4rem,10vw,9rem)", fontWeight: 800, color: "rgba(17,24,39,0.04)", lineHeight: 1, whiteSpace: "nowrap" }}>
                  {row.word}
                </span>
              </div>
              <div className="relative space-y-6" style={{ zIndex: 1 }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold uppercase"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#111827", fontWeight: 700, letterSpacing: "0.03em" }}>
                  {row.title}
                </h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", lineHeight: 1.85, color: "#4b5563", maxWidth: "440px" }}>
                  {row.desc}
                </p>
                <Link href={row.path}>
                  <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                    Learn More <ArrowRight size={11} />
                  </span>
                </Link>
              </div>
            </div>

            <div className="svc-img-wrap flex-1 relative" style={{ minHeight: "420px" }}>
              <img src={row.image} alt={row.title} className="svc-img absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)" }} />
            </div>
          </div>
        ))}
      </section>

      {/* ══════════ PROJECTS — HORIZONTAL SCROLL ══════════ */}
      <section ref={projectsRef} className="h-scroll-section" style={{ background: "#faf9f7" }} data-testid="section-projects">
        <div className="absolute top-10 left-8 z-10 pointer-events-none select-none" style={{ width: "400px" }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
            Showcase
          </span>
          <h2 className="font-bold uppercase leading-tight"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#111827", fontWeight: 700 }}>
            Engineering<br /><span style={{ color: "#C41E3A" }}>Landmarks</span>
          </h2>
          <div className="mt-4 text-xs" style={{ fontFamily: "'Montserrat',sans-serif", color: "rgba(17,24,39,0.35)", letterSpacing: "0.1em" }}>
            ← Scroll to explore →
          </div>
        </div>

        <div ref={projectsTrackRef} className="h-scroll-track" style={{ height: "100vh" }}>
          <div style={{ width: "480px", flexShrink: 0 }} />
          {projects.map((proj, i) => (
            <div key={i} className="h-scroll-card"
              style={{ width: proj.featured ? "72vw" : "52vw", height: "100vh", marginRight: "24px" }}>
              <img src={proj.image} alt={proj.name}
                className="proj-img absolute inset-0 w-full h-full object-cover will-change-transform"
                style={{ transformOrigin: "center" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }} />
              {proj.featured && (
                <div className="absolute top-8 right-8 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5"
                  style={{ background: "#C41E3A", color: "#fff", fontFamily: "'Montserrat',sans-serif" }}>Featured</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", marginBottom: "8px" }}>
                  {proj.type}
                </div>
                <h3 className="font-bold uppercase"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2.2rem)", color: "#fff", letterSpacing: "0.03em" }}>
                  {proj.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={11} style={{ color: "#C41E3A" }} />
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
                    {proj.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="h-scroll-card flex items-center justify-center" style={{ width: "40vw", height: "100vh", background: "#ffffff", borderLeft: "1px solid rgba(0,0,0,0.07)" }}>
            <div className="text-center p-10">
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", color: "rgba(17,24,39,0.06)", fontWeight: 800, lineHeight: 1, marginBottom: "28px", textTransform: "uppercase" }}>
                150+<br />Projects
              </div>
              <Link href="/completed-projects" data-testid="button-all-projects">
                <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600, border: "1px solid rgba(196,30,58,0.3)", padding: "14px 24px" }}>
                  View All Projects <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CAREERS STRIP ══════════ */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "rgba(0,0,0,0.07)", background: "#ffffff" }} data-testid="section-careers-lead">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden border p-10 md:p-14" style={{ borderColor: "rgba(196,30,58,0.2)", background: "rgba(196,30,58,0.03)" }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C41E3A]" />
            <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 pl-4">
              <div className="space-y-4">
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>
                  Careers at MECPL
                </span>
                <h2 className="font-bold uppercase"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: "#111827", fontWeight: 700 }}>
                  Build the Next Generation<br />of Landmarks
                </h2>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", lineHeight: 1.75, color: "#4b5563", maxWidth: "520px" }}>
                  Great execution comes from great teams. Explore opportunities across engineering, project management, safety, and quality.
                </p>
              </div>
              <Link href="/careers" data-testid="button-home-careers">
                <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-8 py-4 cursor-pointer transition-all"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                  Explore Careers <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE ══════════ */}
      <section ref={whyRef}
        className="py-28 px-6 border-b"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: "#f9f9f9" }}
        data-testid="section-why-mecpl">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
              Our Advantage
            </span>
            <h2 className="font-bold uppercase"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#111827", fontWeight: 700 }}>
              Why Choose MECPL
            </h2>
          </div>
          <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            {whyChoose.map((item, i) => (
              <div key={i}
                className="why-row border-b py-8 items-start gap-6 md:gap-12"
                style={{ borderColor: "rgba(0,0,0,0.07)", display: "grid", gridTemplateColumns: "72px 1fr 1fr" }}
                data-testid={`card-why-${i}`}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 800, color: "rgba(196,30,58,0.1)", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-bold uppercase pt-1"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", fontWeight: 700, color: "#111827", letterSpacing: "0.1em" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", lineHeight: 1.8, color: "#4b5563", paddingTop: "2px" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 cursor-pointer transition-all"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                Start Your Project <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      {/* VwbywPda layered-pinning: each card is 100vh and pins at the top;
          next card scrolls up and stacks over it — "deck of cards" reveal */}
      <section ref={testimonialsRef}
        style={{ background: "#ffffff" }}
        data-testid="section-testimonials">

        {(["#ffffff", "#f9f9f9", "#f4f4f4"] as const).map((bg, i) => {
          const t = testimonials[i];
          return (
            <div key={i} className="testi-block"
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: bg,
                borderTop: "1px solid rgba(0,0,0,0.07)",
                position: "relative",
              }}>

              {/* Card content — centered column */}
              <div className="max-w-3xl mx-auto w-full px-8 md:px-16">

                {/* Index + eyebrow */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "3rem" }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(3.5rem,6vw,5rem)", fontWeight: 800, color: "rgba(196,30,58,0.07)", lineHeight: 1, userSelect: "none" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", marginBottom: "4px" }}>
                      Client Voice
                    </div>
                    <div style={{ width: "40px", height: "1px", background: "rgba(196,30,58,0.3)" }} />
                  </div>
                </div>

                {/* Opening quote mark */}
                <div style={{ fontFamily: "Georgia, serif", fontSize: "4rem", color: "#C41E3A", lineHeight: 0.6, marginBottom: "1.5rem", opacity: 0.2, userSelect: "none" }}>
                  &ldquo;
                </div>

                {/* Quote — no italic, Montserrat; dangerouslySetInnerHTML safe for GSAP */}
                <p className="testi-quote"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(1.1rem,2.2vw,1.7rem)",
                    fontWeight: 400,
                    color: "#111827",
                    lineHeight: 1.8,
                    marginBottom: "3rem",
                  }}
                  dangerouslySetInnerHTML={{ __html: t.quote }}
                />

                {/* Attribution */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "32px", height: "2px", background: "#C41E3A", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, color: "#111827", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {t.name}
                    </div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", color: "rgba(17,24,39,0.4)", marginTop: "4px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </section>

      {/* ══════════ CLIENTS ══════════ */}
      <section ref={clientsRef}
        className="py-28 px-6 border-b"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: "#f9f9f9" }}
        data-testid="section-clients">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-5">
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block" }}>
                Ecosystem
              </span>
              <h2 className="font-bold uppercase"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#111827", fontWeight: 700 }}>
                Clients &amp; Partners
              </h2>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", lineHeight: 1.8, color: "#4b5563" }}>
                India's most trusted developers and industrialists have chosen MECPL for their landmark projects.
              </p>
              <Link href="/clients" data-testid="button-all-clients">
                <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                  View All Clients <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 border-t border-l" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                {clients.map((c, i) => (
                  <div key={i} className="client-name py-7 px-6 border-b border-r"
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}
                    data-testid={`card-client-${i}`}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(0.75rem,1.5vw,1rem)", fontWeight: 700, letterSpacing: "0.15em", color: "#111827", textTransform: "uppercase" }}>
                      {c}
                    </div>
                    <div className="mt-2 w-6 h-px" style={{ background: "rgba(196,30,58,0.35)" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 overflow-hidden border-y py-5" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <div className="animate-ticker overflow-hidden">
              {[...clients, ...clients, ...clients].map((c, i) => (
                <span key={i} className="inline-flex items-center gap-6 px-6 whitespace-nowrap"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(17,24,39,0.25)", textTransform: "uppercase" }}>
                  {c} <span style={{ color: "#C41E3A" }}>◆</span>
                </span>
              ))}
            </div>
            <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(196,30,58,0.25), transparent)" }} />
            <div className="animate-ticker-rev overflow-hidden">
              {[...clients, ...clients, ...clients].map((c, i) => (
                <span key={i} className="inline-flex items-center gap-6 px-6 whitespace-nowrap"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(17,24,39,0.15)", textTransform: "uppercase" }}>
                  {c} <span style={{ color: "rgba(196,30,58,0.4)" }}>◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ AWARDS ══════════ */}
      <section ref={awardsRef} className="py-28 px-6 border-b"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: "#ffffff" }}
        data-testid="section-awards-strip">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6" data-animate="fade">
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>Recognition</span>
              <h2 className="font-bold uppercase"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#111827", fontWeight: 700 }}>
                Award-Winning<br />Excellence
              </h2>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", lineHeight: 1.75, color: "#4b5563" }}>
                20+ consecutive industry awards for structural quality, safety leadership, and on-time delivery.
              </p>
              <Link href="/awards" data-testid="button-awards-more">
                <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                  Full Awards History <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            <div className="lg:w-2/3 border-t w-full" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
              {[
                { year: "2023", award: "BAI Special Jury Award",    org: "Builders Association of India" },
                { year: "2022", award: "Constro Silver Trophy",     org: "Constro Awards" },
                { year: "2021", award: "Constro Gold Trophy",       org: "Constro Awards" },
                { year: "2018", award: "Industry Excellence Gold",  org: "National Construction" },
                { year: "2017", award: "India's Small Giants",      org: "Forbes India" },
                { year: "2007", award: "BAI First Prize",           org: "Builders Association of India" },
              ].map(a => (
                <div key={a.year} className="award-row py-7 border-b flex items-center gap-8"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                  data-testid={`card-award-${a.year}`}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: "#C41E3A", lineHeight: 1, flexShrink: 0, minWidth: "80px" }}>
                    {a.year}
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "4px" }}>
                      {a.award}
                    </div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(17,24,39,0.4)", textTransform: "uppercase" }}>
                      {a.org}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
