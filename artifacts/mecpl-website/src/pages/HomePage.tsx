import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Clock } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop",
    tag: "25+ Years of Excellence",
    headline: "Shaping Skylines.",
    accent: "Building Trust.",
    sub: "Delivering precision infrastructure, high-scale residential marvels, and advanced industrial complexes across India since 1998.",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop",
    tag: "150+ Landmark Projects",
    headline: "Structural Mastery.",
    accent: "At Scale.",
    sub: "From highrise towers to industrial megacomplexes — MECPL executes with precision, quality, and zero compromise.",
  },
  {
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=1920&auto=format&fit=crop",
    tag: "ISO 9001 · 14001 · 45001 Certified",
    headline: "Certified Quality.",
    accent: "Proven Safety.",
    sub: "Triple ISO certified with CRISIL SME 1 financial rating — the gold standard of India's construction industry.",
  },
];

const stats = [
  { value: 25, suffix: "+", label: "Years Legacy" },
  { value: 150, suffix: "+", label: "Projects Handed Over" },
  { value: 20, suffix: "M+", label: "Sq. Ft. Executed" },
  { value: 50, suffix: "+", label: "Tier-1 Clients" },
];

const capabilities = [
  {
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
    title: "Civil Structural Works",
    desc: "High-performance foundational engineering for complex architectural blueprints and structural demands across residential, commercial, and industrial sectors.",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    title: "Heavy Turnkey Infrastructure",
    desc: "Comprehensive, end-to-end site layout design and massive building logistics handled transparently with precision concrete execution.",
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=600&auto=format&fit=crop",
    title: "Management & Planning",
    desc: "Strict safety frameworks and scheduling protocols guaranteeing systematic risk mitigation and milestone handovers on every project.",
  },
];

const featuredProjects = [
  {
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=600&auto=format&fit=crop",
    name: "Panchshil Highrise Towers, Kharadi",
    scope: "Comprehensive Concrete Civil Construction Frame",
    desc: "Managing intricate deep structural reinforcement frameworks under aggressive real-time milestone constraints cleanly.",
    tag: "Featured Landmark",
  },
];

const smallProjects = [
  { name: "Trump Towers, Pune", desc: "Iconic luxury double-tower architecture using cutting edge performance mix metrics.", type: "Civil Structural Handover" },
  { name: "Godrej Boulevard, Pune", desc: "Sprawling residential infrastructure with synchronized foundational deployment.", type: "Residential Framework" },
  { name: "VTP Bel Air, Pune", desc: "High-density multi-tower structural contract completed with uncompromised asset alignment.", type: "Complex Core Works" },
  { name: "Gera Commerzone, Kharadi", desc: "Advanced commercial glass-and-steel infrastructure mapped precisely to technical layouts.", type: "Commercial Core Infra" },
];

const clients = ["TRUMP TOWERS", "GODREJ PROPS", "VTP REALTY", "PANCHSHIL", "KALPATARU", "K RAHEJA", "MALPANI", "GERA DEVS"];

const tickerItems = [
  "ISO 9001:2015 Certified Company",
  "ISO 14001:2015 Environmental Integrity",
  "ISO 45001:2018 Occupational Safety",
  "CRISIL SME 1 Rating — Highest Financial Reliability",
  "25+ Years of Structural Excellence",
  "150+ Landmark Projects Completed",
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 2000 / steps);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref} className="text-5xl md:text-6xl font-black text-[#C41E3A] tracking-tight">{count}{suffix}</div>;
}

export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const s = heroSlides[slide];

  return (
    <div className="bg-[#1A1A1A]">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            key={slide}
            src={s.image}
            className="w-full h-full object-cover opacity-30 grayscale transition-opacity duration-1000"
            alt="Construction backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/40"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 border border-[#C41E3A]/40 bg-[#C41E3A]/10 px-4 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full animate-pulse"></span>
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">{s.tag}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
            {s.headline}<br />
            <span className="text-[#C41E3A]">{s.accent}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg tracking-wide leading-relaxed">
            {s.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact" data-testid="button-hero-enquire">
              <span className="inline-block bg-[#C41E3A] hover:bg-red-700 text-white px-8 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-[#C41E3A]/30 cursor-pointer">
                Start Your Project
              </span>
            </Link>
            <Link href="/completed-projects" data-testid="button-hero-projects">
              <span className="inline-block border border-white/30 hover:border-white bg-white/5 backdrop-blur-sm text-white px-8 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all cursor-pointer">
                Explore Projects
              </span>
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button onClick={() => setSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)} className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors rounded-sm" data-testid="button-slide-prev">
            <ChevronLeft size={14} />
          </button>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-1 rounded-full transition-all ${i === slide ? "w-8 bg-[#C41E3A]" : "w-3 bg-white/30"}`} data-testid={`button-slide-${i}`} />
          ))}
          <button onClick={() => setSlide(p => (p + 1) % heroSlides.length)} className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors rounded-sm" data-testid="button-slide-next">
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* CERTIFICATION TICKER */}
      <section className="bg-[#2C2C2C] border-y border-white/5 py-4 overflow-hidden select-none" data-testid="section-ticker">
        <div className="animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-[10px] font-black uppercase tracking-widest text-white/50 whitespace-nowrap">
              {item}
              <span className="text-[#C41E3A] text-base">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" data-testid="section-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 border-l-2 border-[#C41E3A] bg-[#2C2C2C]/30 rounded-sm" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-2">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-6 py-12" data-testid="section-capabilities">
        <SectionHeader label="Expertise" title="Core Capabilities Matrix" center subtitle="From structural execution to project management — MECPL delivers across every phase of construction." />
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {capabilities.map((cap, i) => (
            <div key={i} className="group bg-[#2C2C2C] border border-white/5 rounded-sm overflow-hidden shadow-2xl hover:border-[#C41E3A]/30 transition-all duration-300" data-testid={`card-capability-${i}`}>
              <div className="h-52 overflow-hidden relative">
                <img
                  src={cap.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  alt={cap.title}
                />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">{cap.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="border-t border-white/5 py-24" data-testid="section-about-strip">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Corporate Profile</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white">
              A Legacy Of<br />Quality & Commitment
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Millennium Engineers & Contractors Pvt. Ltd. (MECPL) is a Pune-based engineering powerhouse recognized for delivering heavy complex structural projects with absolute safety, premium workmanship, and financial integrity since 1998.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {["ISO 9001", "ISO 14001", "ISO 45001"].map(cert => (
                <div key={cert} className="p-4 bg-[#2C2C2C] rounded-sm border border-white/5 text-center">
                  <div className="text-[#C41E3A] text-lg mb-1">✓</div>
                  <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{cert}</div>
                </div>
              ))}
            </div>
            <Link href="/about" data-testid="button-about-strip">
              <span className="inline-flex items-center gap-2 text-[#C41E3A] text-xs font-black tracking-widest uppercase hover:gap-4 transition-all cursor-pointer">
                Read Corporate Profile <ArrowRight size={14} />
              </span>
            </Link>
          </div>
          <div className="h-96 rounded-sm overflow-hidden relative shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              alt="MECPL structural integrity"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-6 py-16" data-testid="section-projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader label="Showcase" title="Engineering Landmarks at Scale" />
          <Link href="/completed-projects" data-testid="button-all-projects">
            <span className="inline-flex items-center gap-2 text-[#C41E3A] text-xs font-black tracking-widest uppercase hover:gap-4 transition-all cursor-pointer mb-10 flex-shrink-0">
              View All Projects <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured large card */}
          <div className="group bg-[#2C2C2C] border border-white/5 rounded-sm overflow-hidden shadow-2xl flex flex-col" data-testid="card-featured-project">
            <div className="h-72 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=700&auto=format&fit=crop"
                className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                alt="Panchshil Highrise"
              />
              <div className="absolute top-4 right-4 bg-[#C41E3A] text-white font-black uppercase text-[9px] tracking-widest px-3 py-1.5 rounded-sm">
                Featured Landmark
              </div>
            </div>
            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">Panchshil Highrise Towers, Kharadi</h3>
                <p className="text-[10px] font-bold text-[#C41E3A] uppercase tracking-widest">Scope: Comprehensive Concrete Civil Construction Frame</p>
                <p className="text-gray-400 text-sm leading-relaxed">Managing intricate deep structural reinforcement frameworks under aggressive real-time milestone constraints cleanly.</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <span className="flex items-center gap-1.5"><Clock size={11} className="text-[#C41E3A]" /> 100% On-Time Handover</span>
                <Link href="/completed-projects">
                  <span className="text-white hover:text-[#C41E3A] flex items-center gap-1 cursor-pointer transition-colors">View All <ArrowRight size={10} /></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Small project cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {smallProjects.map((p, i) => (
              <div key={i} className="bg-[#2C2C2C] border border-white/5 p-6 rounded-sm flex flex-col justify-between gap-4 shadow-xl hover:border-[#C41E3A]/30 transition-colors" data-testid={`card-small-project-${i}`}>
                <h4 className="text-base font-bold uppercase text-white tracking-tight border-b border-white/5 pb-3">{p.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{p.desc}</p>
                <span className="text-[9px] font-black uppercase text-[#C41E3A] tracking-widest">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="bg-[#2C2C2C]/50 border-y border-white/5 py-24" data-testid="section-clients">
        <div className="max-w-7xl mx-auto px-6 space-y-14">
          <SectionHeader label="Ecosystem" title="Clients & Premium Partners" center subtitle="We orchestrate high-tier development work hand-in-hand with India's marquee real estate enterprises." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center text-sm font-black tracking-widest uppercase text-white/30">
            {clients.map((client, i) => (
              <div key={i} className="p-6 border border-white/5 rounded-sm hover:text-white hover:border-[#C41E3A] transition-all cursor-default" data-testid={`card-client-${i}`}>
                {client}
              </div>
            ))}
          </div>

          <div className="w-full h-56 rounded-sm overflow-hidden relative shadow-inner border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-40 grayscale"
              alt="Corporate architecture partners"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link href="/clients" data-testid="button-all-clients">
                <span className="bg-[#C41E3A] text-white text-xs font-black tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-red-700 transition-colors cursor-pointer">
                  View All Clients
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-20" data-testid="section-awards-strip">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3 space-y-6">
            <SectionHeader label="Recognition" title="Award-Winning Excellence" />
            <p className="text-gray-400 text-sm leading-relaxed">
              20+ years of consecutive industry awards for structural quality, safety leadership, and on-time delivery.
            </p>
            <Link href="/awards" data-testid="button-awards-more">
              <span className="inline-flex items-center gap-2 text-[#C41E3A] text-xs font-black tracking-widest uppercase hover:gap-4 transition-all cursor-pointer">
                Full Awards History <ArrowRight size={14} />
              </span>
            </Link>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { year: "2023", award: "BAI Special Jury", icon: "🏆" },
              { year: "2022", award: "Constro Silver Trophy", icon: "🥈" },
              { year: "2021", award: "Constro Gold Trophy", icon: "🥇" },
              { year: "2018", award: "Industry Excellence Gold", icon: "⭐" },
              { year: "2017", award: "India's Small Giants", icon: "🏅" },
              { year: "2007", award: "BAI First Prize", icon: "🎖" },
            ].map((a) => (
              <div key={a.year} className="p-5 bg-[#2C2C2C] border border-white/5 rounded-sm hover:border-[#C41E3A]/30 transition-colors text-center" data-testid={`card-award-${a.year}`}>
                <div className="text-2xl mb-2">{a.icon}</div>
                <div className="text-[#C41E3A] font-black text-lg">{a.year}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wide mt-1 font-bold">{a.award}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ENQUIRY */}
      <section className="border-t border-white/5 bg-gradient-to-b from-[#1A1A1A] to-black py-24" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Project Intake</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
            Let's Build Something<br />Extraordinary Together
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
            Transmit your structural blueprints or enterprise construction specifications directly. Our central operations team will analyze your requirements immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-cta-enquire">
              <span className="inline-block bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-[#C41E3A]/20 cursor-pointer">
                Enquire Now
              </span>
            </Link>
            <Link href="/completed-projects" data-testid="button-cta-projects">
              <span className="inline-block border border-white/20 hover:border-white text-white px-10 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all cursor-pointer">
                View Portfolio
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
