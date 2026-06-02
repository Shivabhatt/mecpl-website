import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import {
  ArrowRight, ChevronLeft, ChevronRight, Clock, Building2, HardHat,
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
  { value: 25,  suffix: "+",  label: "Years Legacy",          sub: "Since 1998" },
  { value: 150, suffix: "+",  label: "Projects Handed Over",  sub: "Across India" },
  { value: 20,  suffix: "M+", label: "Sq. Ft. Executed",      sub: "Structural Work" },
  { value: 50,  suffix: "+",  label: "Tier-1 Clients",        sub: "Trust MECPL" },
];

const services = [
  {
    icon: Building2,
    title: "Civil Construction",
    desc: "High-performance foundational engineering for complex architectural blueprints across residential, commercial, and industrial sectors.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    path: "/services",
  },
  {
    icon: ClipboardList,
    title: "Turnkey Projects",
    desc: "Complete end-to-end project delivery — from design coordination through structural handover — under one accountable partner.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    path: "/services",
  },
  {
    icon: Factory,
    title: "Industrial Projects",
    desc: "Warehouses, logistics hubs, and manufacturing plants built to the tightest tolerance levels in the industry.",
    image: "https://images.unsplash.com/photo-1567361672830-f7aa558020c4?q=80&w=800&auto=format&fit=crop",
    path: "/services",
  },
  {
    icon: Home,
    title: "Residential Projects",
    desc: "Mid-rise to ultra-high-rise towers including Trump Towers, Godrej Boulevard, and VTP Bel Air — delivered on time.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    path: "/services",
  },
  {
    icon: Layers,
    title: "Interior Fitouts",
    desc: "Premium commercial and institutional interior fitouts combining structural reliability with aesthetic refinement.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    path: "/services",
  },
  {
    icon: HardHat,
    title: "Project Management",
    desc: "Expert site governance — scheduling, cost control, safety auditing, and milestone management as a standalone service.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    path: "/services",
  },
];

const projects = [
  {
    name: "Panchshil Highrise Towers",
    location: "Kharadi, Pune",
    type: "Civil Structural Framework",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Trump Towers Pune",
    location: "Kalyani Nagar, Pune",
    type: "Luxury Highrise · Civil Handover",
    image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Godrej Boulevard",
    location: "Mamurdi, Pune",
    type: "Residential Framework",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "VTP Bel Air",
    location: "Mahalunge, Pune",
    type: "Complex Core Works",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gera Commerzone",
    location: "Kharadi, Pune",
    type: "Commercial Core Infrastructure",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Industrial Megaplex",
    location: "Chakan, Pune",
    type: "Industrial Structural Works",
    image: "https://images.unsplash.com/photo-1567361672830-f7aa558020c4?q=80&w=1200&auto=format&fit=crop",
  },
];

const whyChoose = [
  { icon: Timer,        title: "Timely Delivery",        desc: "Over 95% of projects handed over on or ahead of schedule." },
  { icon: Shield,       title: "Safety First",           desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site." },
  { icon: Star,         title: "Engineering Excellence", desc: "25+ years of structural engineering expertise on India's most complex projects." },
  { icon: CheckCircle,  title: "Quality Assurance",      desc: "ISO 9001:2015 certified quality management across every project phase." },
  { icon: Users,        title: "Experienced Team",       desc: "300+ trained engineers, site managers, and safety officers." },
  { icon: Wrench,       title: "End-to-End Solutions",   desc: "From concept to completion — MECPL manages the full construction lifecycle." },
];

const testimonials = [
  {
    quote: "MECPL delivered our 42-storey tower ahead of schedule with exceptional structural quality. Their site management and safety protocols set a new benchmark in the industry.",
    name: "Mr. Atul Chordia",
    role: "Chairman, Panchshil Realty",
  },
  {
    quote: "Working with MECPL on Trump Towers Pune was a seamless experience. Their technical precision, proactive communication, and zero-compromise quality made them an invaluable partner.",
    name: "Project Director",
    role: "Trump Towers Pune",
  },
  {
    quote: "MECPL's team demonstrated remarkable engineering capability throughout the Godrej Boulevard project. Their ability to manage complexity at scale is truly impressive.",
    name: "Senior Project Head",
    role: "Godrej Properties",
  },
];

const clients = ["TRUMP TOWERS", "GODREJ PROPS", "VTP REALTY", "PANCHSHIL", "KALPATARU", "K RAHEJA", "MALPANI", "GERA DEVS"];

const tickerItems = [
  "ISO 9001:2015 Certified",
  "ISO 14001:2015 Environmental Integrity",
  "ISO 45001:2018 Occupational Safety",
  "CRISIL SME 1 Rating",
  "25+ Years of Structural Excellence",
  "150+ Landmark Projects",
  "MECPL — Building India's Future",
];

/* ─── ANIMATED COUNTER ───────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 80;
        const inc = value / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, 1800 / steps);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── HOME PAGE ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const assetBase = import.meta.env.BASE_URL;

  /* refs */
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

  /* Hero auto-slide */
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* ── HERO: bGRdvMy SplitText chars reveal + tag/sub/cta stagger + bg parallax */
  useEffect(() => {
    const headline = heroHeadlineRef.current;
    const heroBg   = heroBgRef.current;
    const section  = heroSectionRef.current;
    if (!headline || !heroBg || !section) return;

    const mm = gsap.matchMedia();
    mm.add({
      "(prefers-reduced-motion: no-preference)": () => {
        const ctx = gsap.context(() => {
          const lines = headline.querySelectorAll<HTMLElement>(".hero-line");
          const splits: SplitText[] = [];

          lines.forEach((line, i) => {
            const split = new SplitText(line, { type: "chars", charsClass: "hp-char" });
            splits.push(split);
            gsap.from(split.chars, {
              yPercent: 115,
              opacity: 0,
              duration: 1.2,
              stagger: 0.022,
              ease: "power4.out",
              delay: 0.35 + i * 0.18,
            });
          });

          const tagEl = heroTagRef.current;
          if (tagEl) {
            gsap.from(tagEl, { opacity: 0, y: 16, duration: 0.9, delay: 0.2, ease: "power3.out" });
          }
          const subEl = heroSubRef.current;
          if (subEl) {
            gsap.from(subEl, { opacity: 0, y: 20, duration: 0.9, delay: 1.05, ease: "power3.out" });
          }
          const ctaEl = heroCTARef.current;
          if (ctaEl && ctaEl.children.length > 0) {
            gsap.from(Array.from(ctaEl.children), {
              opacity: 0, y: 20, duration: 0.8, stagger: 0.12, delay: 1.25, ease: "power3.out",
            });
          }

          gsap.to(heroBg, {
            yPercent: 28,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          return () => splits.forEach(s => s.revert());
        });

        return () => ctx.revert();
      },
    });

    return () => mm.revert();
  }, []);

  /* ── STATS: pinned full-screen sequence + SplitText char reveal on numerals */
  useEffect(() => {
    const sec = statsRef.current;
    if (!sec) return;

    const mm = gsap.matchMedia();
    mm.add({
      "(prefers-reduced-motion: no-preference)": () => {
        const ruler = sec.querySelector<HTMLElement>(".stat-ruler");
        const items = gsap.utils.toArray<HTMLElement>(".stat-item", sec);
        const splits: SplitText[] = [];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=900",
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (ruler) {
          gsap.set(ruler, { scaleX: 0, transformOrigin: "left center" });
          tl.to(ruler, { scaleX: 1, duration: 1, ease: "power3.out" });
        }

        items.forEach((item, i) => {
          const numEl = item.querySelector<HTMLElement>(".stat-num");
          gsap.set(item, { opacity: 0, y: 50 });

          if (numEl) {
            const split = new SplitText(numEl, { type: "chars", charsClass: "inline-block" });
            splits.push(split);
            gsap.set(split.chars, { yPercent: 110 });

            tl.to(item, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.8 + i * 0.45)
              .to(split.chars, { yPercent: 0, duration: 0.7, stagger: 0.04, ease: "power4.out" }, "<0.05");
          } else {
            tl.to(item, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.8 + i * 0.45);
          }
        });

        return () => { splits.forEach(s => s.revert()); };
      },
    });

    return () => mm.revert();
  }, []);

  /* ── SERVICES: vYMzKZx scroll-driven rotateY flip-in per card */
  useEffect(() => {
    const sec = servicesRef.current;
    if (!sec) return;

    const mm = gsap.matchMedia();
    mm.add({
      "(prefers-reduced-motion: no-preference)": () => {
        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(".flip-card", sec);

          cards.forEach((card, i) => {
            const inner = card.querySelector<HTMLElement>(".flip-inner");
            if (!inner) return;

            /* Set initial state: rotated 90° away, invisible */
            gsap.set(inner, { rotationY: -90, opacity: 0, transformOrigin: "left center" });

            /* Scroll triggers the rotateY flip-in; clearProps lets CSS hover take over */
            gsap.to(inner, {
              rotationY: 0,
              opacity: 1,
              duration: 1.1,
              delay: (i % 3) * 0.13,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          });
        }, sec);

        return () => ctx.revert();
      },
    });

    return () => mm.revert();
  }, []);

  /* ── PROJECTS: horizontal scroll panel (RwKwLWK style) */
  useEffect(() => {
    const container = projectsRef.current;
    const track     = projectsTrackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getAmt = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getAmt,
        ease: "none",
        scrollTrigger: {
          id: "proj-scroll",
          trigger: container,
          start: "top top",
          end: () => `+=${Math.abs(getAmt())}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* project card image parallax */
      const imgs = gsap.utils.toArray<HTMLElement>(".proj-img", track);
      imgs.forEach(img => {
        gsap.to(img, {
          x: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".h-scroll-card") as HTMLElement,
            containerAnimation: ScrollTrigger.getById("proj-scroll") as gsap.core.Tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── WHY CHOOSE: oNjgEjm pinned sequential reveal — cards appear one-by-one while section is pinned */
  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;

    const mm = gsap.matchMedia();
    mm.add({
      "(prefers-reduced-motion: no-preference)": () => {
        const cards = gsap.utils.toArray<HTMLElement>(".why-card", sec);

        /* Hide all cards initially; pinned timeline reveals them in sequence */
        gsap.set(cards, { opacity: 0, y: 60 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: `+=${cards.length * 180 + 200}`,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, i * 0.4);
        });
      },
    });

    return () => mm.revert();
  }, []);

  /* ── TESTIMONIALS: SplitText word scrub (bGRdvMy style) */
  useEffect(() => {
    const sec = testimonialsRef.current;
    if (!sec) return;

    const mm = gsap.matchMedia();
    mm.add({
      "(prefers-reduced-motion: no-preference)": () => {
        const ctx = gsap.context(() => {
          const quotes = gsap.utils.toArray<HTMLElement>(".testi-quote", sec);
          const splits: SplitText[] = [];

          quotes.forEach(q => {
            const split = new SplitText(q, { type: "words", wordsClass: "inline-block" });
            splits.push(split);

            gsap.from(split.words, {
              opacity: 0.08,
              duration: 0.1,
              stagger: { each: 0.06 },
              ease: "none",
              scrollTrigger: {
                trigger: q.closest(".testi-block") as HTMLElement,
                start: "top 75%",
                end: "bottom 25%",
                scrub: 1.2,
              },
            });
          });

          return () => splits.forEach(s => s.revert());
        }, sec);

        return () => ctx.revert();
      },
    });

    return () => mm.revert();
  }, []);

  /* ── CLIENTS: section fade-in */
  useEffect(() => {
    const sec = clientsRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>(".client-box", sec);
      boxes.forEach((b, i) => {
        gsap.from(b, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" },
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  const s = heroSlides[slide];

  /* ─── JSX ─────────────────────────────────────────────────────────── */
  return (
    <div className="hp-root" style={{ background: "#0a0a0a", color: "#f0f0f0" }}>

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroSectionRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        {/* Parallax background */}
        <div ref={heroBgRef} className="absolute inset-0 z-0 scale-110 will-change-transform">
          {heroSlides.map((sl, i) => (
            <img
              key={i}
              src={sl.image}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${i === slide ? "opacity-50" : "opacity-0"}`}
              alt="Construction backdrop"
            />
          ))}
          {/* video overlay */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
            <source src={`${assetBase}assets/video/hero.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Tag */}
          <span
            ref={heroTagRef}
            key={slide}
            className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C41E3A] border border-[#C41E3A]/30 px-4 py-2 mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {s.tag}
          </span>

          {/* Headline — SplitText target */}
          <div ref={heroHeadlineRef}>
            <div
              className="hero-line overflow-hidden block text-[clamp(3.5rem,8vw,7rem)] font-bold uppercase leading-none tracking-tight text-white mb-1"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Engineering
            </div>
            <div
              className="hero-line overflow-hidden block text-[clamp(3.5rem,8vw,7rem)] font-bold italic leading-none tracking-tight mb-8"
              style={{ fontFamily: "var(--font-raleway)", color: "#C41E3A" }}
            >
              Excellence.
            </div>
          </div>

          {/* Sub */}
          <p
            ref={heroSubRef}
            className="max-w-xl mx-auto text-sm leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.55)" }}
          >
            Delivering precision infrastructure, high-scale residential marvels, and advanced
            industrial complexes across India since 1998.
          </p>

          {/* CTAs */}
          <div ref={heroCTARef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" data-testid="button-hero-enquire">
              <span className="hero-cta inline-block bg-[#C41E3A] hover:bg-red-700 text-white px-9 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg shadow-[#C41E3A]/25 cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}>
                Start Your Project
              </span>
            </Link>
            <Link href="/completed-projects" data-testid="button-hero-projects">
              <span className="hero-cta inline-flex items-center gap-2 border border-white/25 hover:border-white bg-transparent text-white px-9 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}>
                Explore Projects <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button onClick={() => setSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)}
            className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors"
            data-testid="button-slide-prev">
            <ChevronLeft size={14} />
          </button>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-px rounded-none transition-all ${i === slide ? "w-10 bg-[#C41E3A]" : "w-4 bg-white/25"}`}
              data-testid={`button-slide-${i}`} />
          ))}
          <button onClick={() => setSlide(p => (p + 1) % heroSlides.length)}
            className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors"
            data-testid="button-slide-next">
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* ══════════ CERTIFICATION TICKER ══════════ */}
      <section className="border-y py-4 overflow-hidden select-none" style={{ borderColor: "rgba(255,255,255,0.07)", background: "#111" }}
        data-testid="section-ticker">
        <div className="animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}
              className="inline-flex items-center gap-5 px-6 whitespace-nowrap"
              style={{ fontSize: "10px", fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {item}
              <span style={{ color: "#C41E3A", fontSize: "14px" }}>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section
        ref={statsRef}
        className="min-h-screen flex items-center px-6"
        style={{ background: "#0a0a0a" }}
        data-testid="section-stats"
      >
        <div className="max-w-7xl mx-auto w-full py-20">
          {/* Ruler */}
          <div className="stat-ruler h-px w-full mb-20" style={{ background: "#C41E3A", transformOrigin: "left center" }} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item space-y-3">
                <div
                  className="font-bold italic leading-none overflow-hidden"
                  style={{
                    fontFamily: "var(--font-raleway)",
                    fontSize: "clamp(3.5rem,6vw,5.5rem)",
                    color: "#C41E3A",
                    fontFeatureSettings: '"tnum"',
                  }}
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span className="stat-num">{stat.value}{stat.suffix}</span>
                </div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px mt-20" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      </section>

      {/* ══════════ ABOUT STRIP ══════════ */}
      <section className="py-28 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} data-testid="section-about-strip">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-7" data-animate="fade">
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>
              Corporate Profile
            </span>
            <h2
              className="font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", fontWeight: 700 }}
            >
              A Legacy Of<br />
              <span className="italic" style={{ color: "#C41E3A" }}>Quality &amp; Commitment</span>
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
              Millennium Engineers &amp; Contractors Pvt. Ltd. (MECPL) is a Pune-based engineering powerhouse
              recognized for delivering heavy complex structural projects with absolute safety, premium
              workmanship, and financial integrity since 1998.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {["ISO 9001", "ISO 14001", "ISO 45001"].map(cert => (
                <div key={cert} className="p-4 text-center border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(196,30,58,0.05)" }}>
                  <div style={{ color: "#C41E3A", fontSize: "18px", marginBottom: "6px" }}>✓</div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{cert}</div>
                </div>
              ))}
            </div>
            <Link href="/about" data-testid="button-about-strip">
              <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                Read Corporate Profile <ArrowRight size={12} />
              </span>
            </Link>
          </div>
          <div className="h-96 overflow-hidden relative" style={{ borderRadius: "1px" }} data-animate="fade">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="MECPL structural integrity"
              style={{ transition: "transform 0.7s ease" }}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.7 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.7 })}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
              <div style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                Structural Works · Since 1998
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES — 3D FLIP CARDS ══════════ */}
      <section
        ref={servicesRef}
        className="py-28 px-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d0d" }}
        data-testid="section-services"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                What We Do
              </span>
              <h2 className="font-bold uppercase leading-tight"
                style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", fontWeight: 700 }}>
                Our Service<br />
                <span className="italic" style={{ color: "#C41E3A" }}>Verticals</span>
              </h2>
            </div>
            <Link href="/services" data-testid="button-all-services">
              <span className="inline-flex items-center gap-2 mb-2 cursor-pointer transition-all hover:gap-4"
                style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                All Services <ArrowRight size={12} />
              </span>
            </Link>
          </div>

          {/* Flip cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link href={svc.path} key={i}>
                <div className="flip-card cursor-pointer" data-testid={`card-service-${i}`}>
                  <div className="flip-inner">
                    {/* FRONT — image + title */}
                    <div className="flip-face">
                      <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="w-9 h-9 flex items-center justify-center mb-3" style={{ background: "rgba(196,30,58,0.15)", border: "1px solid rgba(196,30,58,0.4)" }}>
                          <svc.icon size={16} style={{ color: "#C41E3A" }} />
                        </div>
                        <h3 className="font-bold uppercase"
                          style={{ fontFamily: "var(--font-raleway)", fontSize: "18px", color: "#fff", letterSpacing: "0.05em" }}>
                          {svc.title}
                        </h3>
                      </div>
                    </div>

                    {/* BACK — description */}
                    <div className="flip-back">
                      <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: "#C41E3A" }}>
                        <svc.icon size={18} style={{ color: "#fff" }} />
                      </div>
                      <h3 className="font-bold uppercase mb-4"
                        style={{ fontFamily: "var(--font-raleway)", fontSize: "17px", color: "#fff", letterSpacing: "0.05em" }}>
                        {svc.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)" }}>
                        {svc.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-6"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                        Learn More <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROJECTS — HORIZONTAL SCROLL ══════════ */}
      <section
        ref={projectsRef}
        className="h-scroll-section"
        style={{ background: "#080808" }}
        data-testid="section-projects"
      >
        {/* Header outside track so it's visible */}
        <div className="absolute top-10 left-8 z-10 pointer-events-none select-none" style={{ width: "400px" }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
            Showcase
          </span>
          <h2 className="font-bold uppercase leading-tight"
            style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff", fontWeight: 700 }}>
            Engineering<br />
            <span className="italic" style={{ color: "#C41E3A" }}>Landmarks</span>
          </h2>
          <div className="mt-4 text-xs" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
            ← Scroll to explore →
          </div>
        </div>

        <div ref={projectsTrackRef} className="h-scroll-track" style={{ height: "100vh" }}>
          {/* Spacer so first card isn't at edge */}
          <div style={{ width: "480px", flexShrink: 0 }} />

          {projects.map((proj, i) => (
            <div
              key={i}
              className="h-scroll-card"
              style={{ width: proj.featured ? "72vw" : "52vw", height: "100vh", marginRight: "24px" }}
            >
              <img
                src={proj.image}
                alt={proj.name}
                className="proj-img absolute inset-0 w-full h-full object-cover"
                style={{ scale: "1.12", transformOrigin: "center" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
              {proj.featured && (
                <div className="absolute top-8 right-8 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5"
                  style={{ background: "#C41E3A", color: "#fff", fontFamily: "var(--font-inter)" }}>
                  Featured
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", marginBottom: "8px" }}>
                  {proj.type}
                </div>
                <h3 className="font-bold uppercase"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(1.4rem,2.5vw,2.2rem)", color: "#fff", letterSpacing: "0.03em" }}>
                  {proj.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={11} style={{ color: "#C41E3A" }} />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
                    {proj.location}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* End card — View all CTA */}
          <div className="h-scroll-card flex items-center justify-center" style={{ width: "40vw", height: "100vh", background: "#111" }}>
            <div className="text-center p-10">
              <div style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "rgba(255,255,255,0.08)", fontWeight: 700, lineHeight: 1, marginBottom: "28px", textTransform: "uppercase" }}>
                150+<br />Projects
              </div>
              <Link href="/completed-projects" data-testid="button-all-projects">
                <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600, border: "1px solid rgba(196,30,58,0.3)", padding: "14px 24px" }}>
                  View All Projects <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CAREERS STRIP ══════════ */}
      <section className="py-20 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} data-testid="section-careers-lead">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden border p-10 md:p-14" style={{ borderColor: "rgba(196,30,58,0.2)", background: "rgba(196,30,58,0.04)" }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C41E3A]" />
            <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 pl-4">
              <div className="space-y-4">
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>
                  Careers at MECPL
                </span>
                <h2 className="font-bold uppercase"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: "#fff", fontWeight: 700 }}>
                  Build the Next Generation<br />of Landmarks
                </h2>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", maxWidth: "520px" }}>
                  Great execution comes from great teams. Explore opportunities across engineering, project management, safety, and quality.
                </p>
              </div>
              <Link href="/careers" data-testid="button-home-careers">
                <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-8 py-4 cursor-pointer transition-all"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                  Explore Careers <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE — STAGGERED SCALE REVEAL ══════════ */}
      <section
        ref={whyRef}
        className="py-28 px-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d0d" }}
        data-testid="section-why-mecpl"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
              Our Advantage
            </span>
            <h2 className="font-bold uppercase"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", fontWeight: 700 }}>
              Why Choose{" "}
              <span className="italic" style={{ color: "#C41E3A" }}>MECPL</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl" style={{ fontFamily: "var(--font-inter)", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>
              Six reasons India's top developers and industrialists repeatedly choose MECPL for their most critical projects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChoose.map((item, i) => (
              <div
                key={i}
                className="why-card group border p-8 space-y-4 transition-all duration-300 cursor-default"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "#111" }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(196,30,58,0.35)";
                  el.style.background = "rgba(196,30,58,0.04)";
                  gsap.to(el, { y: -6, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.background = "#111";
                  gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out" });
                }}
                data-testid={`card-why-${i}`}
              >
                <div className="w-11 h-11 flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(196,30,58,0.1)", border: "1px solid rgba(196,30,58,0.25)" }}>
                  <item.icon size={20} style={{ color: "#C41E3A" }} />
                </div>
                <h3 className="font-bold uppercase"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "15px", color: "#fff", letterSpacing: "0.05em" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 cursor-pointer transition-all"
                style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                Start Your Project <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS — WORD SCRUB ══════════ */}
      <section
        ref={testimonialsRef}
        className="py-28 px-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0a0a0a" }}
        data-testid="section-testimonials"
      >
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center">
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
              Client Voices
            </span>
            <h2 className="font-bold uppercase"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", fontWeight: 700 }}>
              What Our{" "}
              <span className="italic" style={{ color: "#C41E3A" }}>Partners Say</span>
            </h2>
          </div>

          {testimonials.map((t, i) => (
            <div key={i} className="testi-block border-l-2 pl-8" style={{ borderColor: "rgba(196,30,58,0.4)" }}>
              <Quote size={28} style={{ color: "rgba(196,30,58,0.25)", marginBottom: "20px" }} />
              <p
                className="testi-quote font-light italic leading-relaxed mb-8"
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
                  color: "#fff",
                  lineHeight: 1.65,
                }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(196,30,58,0.15)", border: "1px solid rgba(196,30,58,0.3)" }}>
                  <span style={{ color: "#C41E3A", fontSize: "16px" }}>★</span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "3px", letterSpacing: "0.1em" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CLIENTS — DOUBLE TICKER ══════════ */}
      <section
        ref={clientsRef}
        className="py-28 px-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d0d" }}
        data-testid="section-clients"
      >
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center">
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
              Ecosystem
            </span>
            <h2 className="font-bold uppercase"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", fontWeight: 700 }}>
              Clients &amp;{" "}
              <span className="italic" style={{ color: "#C41E3A" }}>Premium Partners</span>
            </h2>
          </div>

          {/* Client boxes grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clients.map((c, i) => (
              <div key={i}
                className="client-box p-6 text-center border cursor-default transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.06)", fontFamily: "var(--font-raleway)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(196,30,58,0.5)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(196,30,58,0.05)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.background = "transparent";
                }}
                data-testid={`card-client-${i}`}
              >
                {c}
              </div>
            ))}
          </div>

          {/* Double ticker */}
          <div className="space-y-3 overflow-hidden border-y py-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="animate-ticker overflow-hidden">
              {[...clients, ...clients, ...clients].map((c, i) => (
                <span key={i}
                  className="inline-flex items-center gap-6 px-6 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
                  {c}
                  <span style={{ color: "#C41E3A" }}>◆</span>
                </span>
              ))}
            </div>
            <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(196,30,58,0.3), transparent)" }} />
            <div className="animate-ticker-rev overflow-hidden">
              {[...clients, ...clients, ...clients].map((c, i) => (
                <span key={i}
                  className="inline-flex items-center gap-6 px-6 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>
                  {c}
                  <span style={{ color: "rgba(196,30,58,0.4)" }}>◆</span>
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/clients" data-testid="button-all-clients">
              <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                View All Clients <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ AWARDS STRIP ══════════ */}
      <section className="py-28 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} data-testid="section-awards-strip">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6" data-animate="fade">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>
                Recognition
              </span>
              <h2 className="font-bold uppercase"
                style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", fontWeight: 700 }}>
                Award-Winning<br />
                <span className="italic" style={{ color: "#C41E3A" }}>Excellence</span>
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>
                20+ consecutive industry awards for structural quality, safety leadership, and on-time delivery.
              </p>
              <Link href="/awards" data-testid="button-awards-more">
                <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600 }}>
                  Full Awards History <ArrowRight size={12} />
                </span>
              </Link>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { year: "2023", award: "BAI Special Jury" },
                { year: "2022", award: "Constro Silver Trophy" },
                { year: "2021", award: "Constro Gold Trophy" },
                { year: "2018", award: "Industry Excellence Gold" },
                { year: "2017", award: "India's Small Giants" },
                { year: "2007", award: "BAI First Prize" },
              ].map(a => (
                <div key={a.year}
                  className="p-6 border text-center transition-all duration-300 cursor-default"
                  style={{ borderColor: "rgba(255,255,255,0.06)", background: "#111" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,30,58,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  data-testid={`card-award-${a.year}`}
                >
                  <Award size={20} style={{ color: "#C41E3A", margin: "0 auto 10px" }} />
                  <div style={{ fontFamily: "var(--font-raleway)", fontSize: "22px", fontWeight: 700, color: "#C41E3A" }}>{a.year}</div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: "6px" }}>{a.award}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(to bottom, #0a0a0a, #000)" }}
        data-testid="section-cta"
      >
        <div className="flex items-center justify-center py-28 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="h-px w-16 mx-auto" style={{ background: "#C41E3A" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase" }}>
              Project Intake
            </span>
            <h2 className="font-bold uppercase"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "clamp(2.2rem,5vw,4rem)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}>
              Let's Build Something<br />
              <span className="italic" style={{ color: "#C41E3A" }}>Extraordinary</span>
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto" }}>
              Transmit your structural blueprints or enterprise construction specifications directly.
              Our central operations team will analyze your requirements immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" data-testid="button-cta-enquire">
                <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 cursor-pointer transition-all"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                  Enquire Now <ArrowRight size={12} />
                </span>
              </Link>
              <Link href="/completed-projects" data-testid="button-cta-projects">
                <span className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-10 py-4 cursor-pointer transition-all"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                  View Portfolio
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
