import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import {
  ArrowRight, Clock, Building2, HardHat,
  Factory, Home, Layers, ClipboardList, CheckCircle, Timer, Shield,
  Star, Users, Wrench, Quote, Award, ChevronLeft, ChevronRight,
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
  { icon: Factory,     title: "Industrial Projects",  desc: "Warehouses, logistics hubs, and manufacturing plants built to the tightest tolerance levels in the industry.",                                  image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop", path: "/services" },
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
  { name: "Industrial Megaplex",       location: "Chakan, Pune",        type: "Industrial Structural Works",     image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop" },
];

const whyChoose = [
  { icon: Timer,       title: "Timely Delivery",        desc: "Over 95% of projects handed over on or ahead of schedule." },
  { icon: Shield,      title: "Safety First",           desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site." },
  { icon: Star,        title: "Engineering Excellence", desc: "25+ years of structural engineering expertise on India's most complex projects." },
  { icon: CheckCircle, title: "Quality Assurance",      desc: "ISO 9001:2015 certified quality management across every project phase." },
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

/* ─── GSAP horizontalLoop helper (official GreenSock utility) ──────── */
function horizontalLoop(
  items: HTMLElement[],
  config: {
    repeat?: number;
    speed?: number;
    paused?: boolean;
    paddingRight?: number;
    snap?: number | false;
  } = {}
): gsap.core.Timeline {
  const tl = gsap.timeline({
    repeat: config.repeat ?? -1,
    paused: !!config.paused,
    defaults: { ease: "none" },
    onReverseComplete() { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
  });
  const length           = items.length;
  const startX           = items[0].offsetLeft;
  const times: number[]  = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond  = (config.speed ?? 1) * 100;
  const snap = config.snap === false
    ? (v: number) => v
    : gsap.utils.snap(config.snap ?? 1);

  gsap.set(items, {
    xPercent: (i: number, el: Element) => {
      const w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
      xPercents[i] = snap(
        parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 +
        parseFloat(gsap.getProperty(el, "xPercent") as string)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  const totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      parseFloat(gsap.getProperty(items[length - 1], "scaleX") as string) +
    (config.paddingRight ?? 0);

  for (let i = 0; i < length; i++) {
    const item            = items[i];
    const curX            = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop  = distanceToStart +
      widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);
    tl.to(item, {
      xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
      duration: distanceToLoop / pixelsPerSecond,
    }, 0)
      .fromTo(
        item,
        { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      );
    times[i] = distanceToStart / pixelsPerSecond;
  }

  return tl;
}

/* ─── HOME PAGE ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const [slide, setSlide]           = useState(0);
  const [activeTesti, setActiveTesti] = useState(0);
  const assetBase = import.meta.env.BASE_URL;

  const heroSectionRef   = useRef<HTMLElement>(null);
  const heroBgRef        = useRef<HTMLDivElement>(null);
  const heroHeadlineRef  = useRef<HTMLDivElement>(null);
  const heroTagRef       = useRef<HTMLSpanElement>(null);
  const heroSubRef       = useRef<HTMLParagraphElement>(null);
  const heroCTARef       = useRef<HTMLDivElement>(null);
  const servicesRef      = useRef<HTMLElement>(null);
  const projectsRef      = useRef<HTMLElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const whyRef           = useRef<HTMLElement>(null);
  const testimonialsRef  = useRef<HTMLElement>(null);
  const clientsRef       = useRef<HTMLElement>(null);
  const stackedRef       = useRef<HTMLElement>(null);

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

  /* ── SERVICES: VwbywPd stacking cards (sticky + scale-down) ── */
  useEffect(() => {
    const sec = servicesRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".svc-stack-card", sec);
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.88,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1] as Element,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── PROJECTS: pinned scroll-driven strip (right-to-left) ── */
  useEffect(() => {
    const sec   = projectsRef.current;
    const strip = projectsTrackRef.current;
    if (!sec || !strip) return;

    const ctx = gsap.context(() => {
      gsap.delayedCall(0.05, () => {
        const totalW = strip.scrollWidth / 2; /* 2× cards → half = one full set */
        if (!totalW) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${totalW}`,   /* scroll distance = strip width */
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(strip, { x: 0 }, { x: -totalW, ease: "none" });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── WHY CHOOSE: stacked rows slide-in ── */
  useEffect(() => {
    const sec = whyRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".why-card", sec).forEach((card, i) => {
          gsap.from(card, {
            y: 36, opacity: 0, duration: 0.75, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none none" },
          });
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  /* ── TESTIMONIALS: coverflow carousel + GggpRoB SplitText reveal ── */
  useEffect(() => {
    const sec = testimonialsRef.current;
    if (!sec) return;

    const n = testimonials.length;
    const cards  = Array.from(sec.querySelectorAll<HTMLElement>(".testi-cover-card"));
    const quotes = Array.from(sec.querySelectorAll<HTMLElement>(".testi-quote-block"));

    /* Coverflow card positions */
    cards.forEach((card, i) => {
      let dist = i - activeTesti;
      if (dist >  Math.floor(n / 2)) dist -= n;
      if (dist < -Math.floor(n / 2)) dist += n;
      const absD = Math.abs(dist);
      gsap.to(card, {
        x: dist * 420,
        scale: absD === 0 ? 1 : 0.72,
        opacity: absD === 0 ? 1 : 0.55,
        zIndex: absD === 0 ? 10 : 1,
        duration: 0.65,
        ease: "power3.inOut",
      });
    });

    /* Hide all non-active quote blocks instantly */
    quotes.forEach((q, i) => {
      if (i !== activeTesti) gsap.set(q, { autoAlpha: 0 });
    });

    /* GggpRoB SplitText line-mask reveal on active quote */
    const activeQuote = quotes[activeTesti];
    if (!activeQuote) return;

    let cancelled = false;
    let split: any = null;
    const quoteP = activeQuote.querySelector<HTMLElement>("p");
    const attr   = activeQuote.querySelector<HTMLElement>(".testi-attribution");

    gsap.set(activeQuote, { autoAlpha: 1 });
    if (attr) gsap.set(attr, { autoAlpha: 0, y: 8 });

    document.fonts.ready.then(() => {
      if (cancelled || !quoteP) return;

      split = (SplitText as any).create(quoteP, {
        type: "words",
        autoSplit: true,
        onSplit(self: any) {
          if (attr) {
            gsap.to(attr, {
              autoAlpha: 1,
              y: 0,
              delay: self.words.length * 0.04 + 0.05,
              duration: 0.4,
              ease: "power2.out",
            });
          }
          return gsap.from(self.words, {
            opacity: 0.08,
            stagger: 0.04,
            duration: 0.55,
            ease: "power1.inOut",
          });
        },
      });
    });

    return () => {
      cancelled = true;
      split?.revert();
      cards.forEach(c  => gsap.killTweensOf(c));
      quotes.forEach(q => gsap.killTweensOf(q));
      if (attr) gsap.killTweensOf(attr);
    };
  }, [activeTesti]);

  /* ── CLIENTS: infinite horizontal logo ticker ── */
  useEffect(() => {
    const sec = clientsRef.current;
    if (!sec) return;

    const track = sec.querySelector<HTMLElement>(".clients-track");
    if (!track) return;

    const mm = gsap.matchMedia();
    let tween: gsap.core.Tween | null = null;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      tween = gsap.to(track, {
        x: () => -(track.scrollWidth / 2),
        duration: 22,
        ease: "none",
        repeat: -1,
        onRepeat: () => gsap.set(track, { x: 0 }),
      });

      const pause = () => tween?.pause();
      const play  = () => tween?.play();
      sec.addEventListener("mouseenter", pause);
      sec.addEventListener("mouseleave", play);

      return () => {
        sec.removeEventListener("mouseenter", pause);
        sec.removeEventListener("mouseleave", play);
        tween?.kill();
      };
    });

    return () => mm.revert();
  }, []);



  /* ── STACKED INTRO: CSS sticky stack — Recognition (z1) + About Us (z2) ── */
  useEffect(() => {
    const sec = stackedRef.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-intro-card", sec);
        /* Set stacking order so About Us slides on top of Recognition */
        cards.forEach((card, i) => gsap.set(card, { zIndex: i + 1 }));
        /* Card 2 fades + lifts as it enters from below */
        if (cards[1]) {
          gsap.from(cards[1], {
            opacity: 0, y: 32, ease: "none",
            scrollTrigger: { trigger: cards[1], start: "top 95%", end: "top top", scrub: 1 },
          });
        }
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
            <source src={`${assetBase}assets/video/hero-new.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35 pointer-events-none" />
        </div>

        {/* invisible anchor so heroHeadlineRef stays non-null for GSAP */}
        <div ref={heroHeadlineRef} className="sr-only" />

        <div ref={heroCTARef} className="absolute bottom-10 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-6">
          <div className="inline-flex items-center gap-4">
            <Link href="/completed-projects" data-testid="button-hero-projects">
              <span
                className="inline-flex items-center gap-1.5 cursor-pointer"
                style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontWeight: 400, fontFamily: "'Montserrat',sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                VIEW PROJECTS <ArrowRight size={10} />
              </span>
            </Link>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.22)", flexShrink: 0 }} />
            <Link href="/careers" data-testid="button-hero-careers">
              <span
                className="inline-flex items-center gap-1.5 cursor-pointer"
                style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontWeight: 400, fontFamily: "'Montserrat',sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                EXPLORE CAREERS <ArrowRight size={10} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ STACKED: RECOGNITION + ABOUT US (VwbywPd) ══════════ */}
      <section ref={stackedRef} data-testid="section-stacked-intro">

        {/* Card 1 — Recognition */}
        <div className="stack-intro-card" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", position: "sticky", top: 0, padding: "80px 24px" }}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                Recognition
              </span>
              <h2 className="uppercase text-3xl" style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400 }}>
                Award-Winning Excellence
              </h2>
            </div>
            <div className="flex items-start justify-center gap-8 flex-wrap md:flex-nowrap">
              {[
                { year: "2023", award: "BAI Special\nJury Award",   org: "Builders Assoc. of India",  img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop" },
                { year: "2022", award: "Constro\nSilver Trophy",    org: "Constro Awards",             img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" },
                { year: "2021", award: "Constro\nGold Trophy",      org: "Constro Awards",             img: "https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=400&auto=format&fit=crop" },
                { year: "2018", award: "Industry\nExcellence Gold", org: "National Construction",      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400&auto=format&fit=crop" },
                { year: "2017", award: "India's\nSmall Giants",     org: "Forbes India",               img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=400&auto=format&fit=crop" },
              ].map((a, i) => (
                <div key={a.year} className="group flex flex-col items-center gap-3" style={{ flexShrink: 0, width: "140px" }}>
                  <div style={{ padding: "3px", borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg, #C41E3A 0%, #ff6b35 100%)" : "linear-gradient(135deg, #C41E3A 0%, #8b0000 100%)", boxShadow: "0 4px 20px rgba(196,30,58,0.25)" }}>
                    <div style={{ padding: "3px", borderRadius: "50%", background: "#ffffff" }}>
                      <div style={{ width: "110px", height: "110px", borderRadius: "50%", overflow: "hidden" }}>
                        <img src={a.img} alt={a.award} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} className="group-hover:scale-110" />
                      </div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", color: "#C41E3A", textTransform: "uppercase", background: "rgba(196,30,58,0.07)", padding: "3px 10px", borderRadius: "20px" }}>
                    {a.year}
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 500, color: "#111827", letterSpacing: "0.05em", textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line" }}>
                    {a.award}
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", color: "rgba(17,24,39,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.4 }}>
                    {a.org}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2 — About Us */}
        <div className="stack-intro-card" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f9f9f9", borderTop: "1px solid rgba(0,0,0,0.07)", position: "sticky", top: 0, padding: "80px 24px" }}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                    About Us
                  </span>
                  <h2 className="uppercase leading-tight text-3xl"
                    style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400 }}>
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
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 500, color: "#111827", letterSpacing: "0.1em" }}>{cert.label}</div>
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
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop" alt="MECPL construction site" className="absolute inset-0 w-full h-full object-cover" />
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
        </div>

      </section>

      {/* ══════════ SERVICES — VwbywPd stacking cards ══════════ */}
      <section ref={servicesRef} data-testid="section-services" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>

        {/* Section header */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-12">
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
            What We Build
          </span>
          <h2 className="uppercase" style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.2rem)", margin: 0 }}>
            Our Services
          </h2>
        </div>

        {/* Stacking cards — each sticky at top:0, previous scales down as next arrives */}
        <div style={{ position: "relative" }}>
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="svc-stack-card"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: i + 1,
                  display: "flex",
                  overflow: "hidden",
                  willChange: "transform",
                }}
              >
                {/* Left: light info panel — exactly 50% */}
                <div style={{
                  width: "50%",
                  flexShrink: 0,
                  background: i % 2 === 0 ? "#ffffff" : "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "clamp(28px, 5vw, 72px)",
                  borderRight: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <Icon size={20} color="#C41E3A" strokeWidth={1.5} />

                  <h3 className="uppercase" style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                    fontWeight: 400,
                    color: "#111827",
                    letterSpacing: "0.06em",
                    margin: "18px 0 16px",
                    lineHeight: 1.2,
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.85,
                    color: "#6b7280",
                    margin: 0,
                  }}>
                    {svc.desc}
                  </p>
                </div>

                {/* Right: full image — exactly 50% */}
                <div style={{ width: "50%", position: "relative", overflow: "hidden" }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />
      </section>

      {/* ══════════ PROJECTS — HORIZONTAL LOOP ══════════ */}
      <section
        ref={projectsRef}
        data-testid="section-projects"
        style={{ background: "#fafafa", padding: "80px 0 70px", borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
            Showcase
          </span>
          <h2 className="uppercase" style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400, fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)", lineHeight: 1.2 }}>
            Engineering<br /><span style={{ color: "#C41E3A" }}>Landmarks</span>
          </h2>
        </div>

        {/* Overflow-hidden wrapper — clips the looping strip */}
        <div style={{ overflow: "hidden" }}>
          <div ref={projectsTrackRef} className="proj-loop-strip">
            {[...projects, ...projects].map((proj, i) => (
              <div key={i} className="proj-loop-card">
                <img
                  src={proj.image}
                  alt={proj.name}
                  style={{ width: "100%", height: "65%", objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "12px 16px", background: "#ffffff", height: "35%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "7px", letterSpacing: "0.18em", color: "#C41E3A", textTransform: "uppercase", marginBottom: "5px" }}>
                    {proj.type}
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", fontWeight: 700, color: "#111827", lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {proj.name}
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", color: "#9ca3af", marginTop: "3px", letterSpacing: "0.05em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {proj.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", color: "rgba(17,24,39,0.3)", letterSpacing: "0.12em", marginBottom: "16px" }}>
            150+ landmark projects across India
          </div>
          <Link href="/completed-projects" data-testid="button-all-projects">
            <span className="inline-flex items-center gap-2 cursor-pointer transition-all hover:gap-4"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C41E3A", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(196,30,58,0.32)", paddingBottom: "5px" }}>
              View All Projects <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE ══════════ */}
      <section ref={whyRef}
        className="py-24 px-6"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
        data-testid="section-why-mecpl">
        <div className="max-w-6xl mx-auto">

          {/* ── Centered header ── */}
          <div className="text-center mb-16">
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
              Our Advantage
            </span>
            <h2 className="uppercase text-3xl"
              style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400, marginBottom: "18px" }}>
              Why Choose MECPL
            </h2>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px", lineHeight: 1.85, color: "#6b7280", maxWidth: "500px", margin: "0 auto" }}>
              India's most trusted construction partner — built on precision, safety, and 25 years of structural performance.
            </p>
          </div>

          {/* ── Cards grid — responsive, single col mobile → 3 col desktop ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {whyChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="why-card"
                  data-testid={`card-why-${i}`}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "20px",
                    padding: "48px 28px 44px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 40px rgba(196,30,58,0.10)"; el.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)"; el.style.transform = "translateY(0)"; }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: "rgba(196,30,58,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "28px", marginLeft: "auto", marginRight: "auto",
                  }}>
                    <Icon size={30} color="#C41E3A" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "15px",
                    fontWeight: 500, color: "#111827",
                    marginBottom: "14px", textAlign: "center", lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
                    lineHeight: 1.85, color: "#6b7280", textAlign: "center",
                    margin: 0,
                  }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      {/* Coverflow carousel — 3 cards, center large, sides scaled/faded, GSAP x */}
      <section ref={testimonialsRef}
        className="py-24"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}
        data-testid="section-testimonials">

        {/* ── Header ── */}
        <div className="text-center mb-14 px-6">
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            Client Voices
          </span>
          <h2 className="uppercase text-3xl"
            style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400 }}>
            What Our Clients Say
          </h2>
        </div>

        {/* ── Coverflow ── */}
        <div style={{ position: "relative", height: "460px" }}>
          {/* Anchor div centred horizontally */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0 }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testi-cover-card"
                onClick={() => setActiveTesti(i)}
                style={{
                  position: "absolute",
                  width: "380px",
                  height: "440px",
                  marginLeft: "-190px",
                  top: "10px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.28), 0 8px 20px rgba(0,0,0,0.14)",
                }}
              >
                <img
                  src={`${assetBase}${t.image}`}
                  alt={t.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Bottom label gradient */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                  padding: "48px 24px 20px",
                }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.6)", marginTop: "3px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quote (crossfades per active card) ── */}
        <div style={{ position: "relative", maxWidth: "620px", margin: "0 auto", padding: "0 32px", height: "180px" }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testi-quote-block"
              style={{ position: "absolute", top: 0, left: "32px", right: "32px", opacity: 0, visibility: "hidden" }}
            >
              <div style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: "#C41E3A", lineHeight: 0.7, marginBottom: "14px", opacity: 0.18, userSelect: "none" }}>
                &ldquo;
              </div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px", fontWeight: 400, color: "#374151", lineHeight: 1.85 }}>
                {t.quote}
              </p>
              <div className="testi-attribution" style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "18px" }}>
                <div style={{ width: "24px", height: "2px", background: "#C41E3A", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, color: "#111827", letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.name}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", color: "rgba(17,24,39,0.4)", marginTop: "3px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Navigation ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "24px" }}>
          <button
            onClick={() => setActiveTesti(p => (p - 1 + testimonials.length) % testimonials.length)}
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ChevronLeft size={18} color="#111827" />
          </button>

          {testimonials.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveTesti(i)}
              style={{ width: i === activeTesti ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === activeTesti ? "#C41E3A" : "rgba(0,0,0,0.18)", cursor: "pointer", transition: "width 0.3s, background 0.3s" }}
            />
          ))}

          <button
            onClick={() => setActiveTesti(p => (p + 1) % testimonials.length)}
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ChevronRight size={18} color="#111827" />
          </button>
        </div>

      </section>

      {/* ══════════ CLIENTS ══════════ */}
      <section ref={clientsRef}
        className="py-24"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)" }}
        data-testid="section-clients">

        {/* ── Header ── */}
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl"
            style={{ fontFamily: "'Montserrat',sans-serif", color: "#111827", fontWeight: 400 }}>
            Trusted By Leading Brands
          </h2>
        </div>

        {/* ── Infinite logo ticker ── */}
        <div style={{ overflow: "hidden" }}>
          <div className="clients-track" style={{ display: "flex", alignItems: "center", gap: "24px", width: "max-content" }}>
            {[...clients, ...clients].map((c, i) => (
              <div key={i}
                data-testid={i < clients.length ? `card-client-${i}` : undefined}
                style={{
                  width: "180px",
                  height: "100px",
                  flexShrink: 0,
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
                }}>
                <img
                  src={`${assetBase}${c.logo}`}
                  alt={c.name}
                  style={{ maxWidth: "100%", maxHeight: "56px", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

      </section>



      <Footer />
    </div>
  );
}
