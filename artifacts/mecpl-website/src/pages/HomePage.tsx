import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Building2, HardHat, Factory, Home, Layers, ClipboardList, CheckCircle, Timer, Shield, Star, Users, Wrench, Quote } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop",
    tag: "25+ Years of Excellence",
    headline: "Engineering Excellence.",
    accent: "Building Tomorrow.",
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

const services = [
  { icon: Building2, title: "Civil Construction", desc: "High-performance foundational engineering for complex architectural blueprints across residential, commercial, and industrial sectors.", path: "/services" },
  { icon: ClipboardList, title: "Turnkey Projects", desc: "Complete end-to-end project delivery — from design coordination through structural handover — under one accountable partner.", path: "/services" },
  { icon: Factory, title: "Industrial Projects", desc: "Warehouses, logistics hubs, and manufacturing plants built to the tightest tolerance levels in the industry.", path: "/services" },
  { icon: Home, title: "Residential Projects", desc: "Mid-rise to ultra-high-rise towers including Trump Towers, Godrej Boulevard, and VTP Bel Air — delivered on time.", path: "/services" },
  { icon: Layers, title: "Interior Fitouts", desc: "Premium commercial and institutional interior fitouts combining structural reliability with aesthetic refinement.", path: "/services" },
  { icon: HardHat, title: "Project Management", desc: "Expert site governance — scheduling, cost control, safety auditing, and milestone management as a standalone service.", path: "/services" },
];

const whyChoose = [
  { icon: Timer, title: "Timely Delivery", desc: "Over 95% of projects handed over on or ahead of schedule. Our milestone-driven model eliminates delays." },
  { icon: Shield, title: "Safety First", desc: "ISO 45001:2018 certified. Zero-compromise safety protocols on every site, every day." },
  { icon: Star, title: "Engineering Excellence", desc: "25+ years of structural engineering expertise applied to India's most complex construction challenges." },
  { icon: CheckCircle, title: "Quality Assurance", desc: "ISO 9001:2015 certified quality management across every phase — materials, execution, and handover." },
  { icon: Users, title: "Experienced Team", desc: "300+ highly trained engineers, site managers, and safety officers with decades of domain expertise." },
  { icon: Wrench, title: "End-to-End Solutions", desc: "From concept to completion — MECPL manages the entire construction lifecycle under one roof." },
];

const testimonials = [
  {
    quote: "MECPL delivered our 42-storey tower ahead of schedule with exceptional structural quality. Their site management and safety protocols set a new benchmark in the industry.",
    name: "Mr. Atul Chordia",
    title: "Chairman, Panchshil Realty",
    rating: 5,
  },
  {
    quote: "Working with MECPL on Trump Towers Pune was a seamless experience. Their technical precision, proactive communication, and zero-compromise quality made them an invaluable partner.",
    name: "Project Director",
    title: "Trump Towers Pune",
    rating: 5,
  },
  {
    quote: "MECPL's team demonstrated remarkable engineering capability throughout the Godrej Boulevard project. Their ability to manage complexity at scale is truly impressive.",
    name: "Senior Project Head",
    title: "Godrej Properties",
    rating: 5,
  },
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = heroSlides[slide];

  return (
    <div className="bg-mecpl-dark">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <img
            key={slide}
            src={s.image}
            className="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
            alt="Construction backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mecpl-dark via-mecpl-dark/60 to-mecpl-dark/40"></div>
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
      <section className="bg-mecpl-card border-y border-white/5 py-4 overflow-hidden select-none" data-testid="section-ticker">
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
          <div key={stat.label} className="p-6 border-l-2 border-[#C41E3A] bg-mecpl-card/30 rounded-sm" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-2">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="bg-mecpl-card/50 border-y border-white/5 py-24" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader label="What We Do" title="Our Service Verticals" subtitle="Six specialized service pillars covering the entire construction lifecycle." />
            <Link href="/services" data-testid="button-all-services">
              <span className="inline-flex items-center gap-2 text-[#C41E3A] text-xs font-black tracking-widest uppercase hover:gap-4 transition-all cursor-pointer mb-10 flex-shrink-0">
                All Services <ArrowRight size={14} />
              </span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link href={svc.path} key={i}>
                <div className="group bg-mecpl-card border border-white/5 rounded-sm p-7 flex flex-col gap-4 hover:border-[#C41E3A]/40 hover:shadow-xl transition-all duration-300 cursor-pointer h-full" data-testid={`card-service-${i}`}>
                  <div className="w-10 h-10 bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center rounded-sm group-hover:bg-[#C41E3A] transition-colors">
                    <svc.icon size={18} className="text-[#C41E3A] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-white">{svc.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1">{svc.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#C41E3A] text-[10px] font-black tracking-widest uppercase group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
                <div key={cert} className="p-4 bg-mecpl-card rounded-sm border border-white/5 text-center">
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
              className="w-full h-full object-cover transition-all duration-500"
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
          <div className="group bg-mecpl-card border border-white/5 rounded-sm overflow-hidden shadow-2xl flex flex-col" data-testid="card-featured-project">
            <div className="h-72 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=700&auto=format&fit=crop"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Trump Towers, Pune", desc: "Iconic luxury double-tower architecture using cutting edge performance mix metrics.", type: "Civil Structural Handover" },
              { name: "Godrej Boulevard, Pune", desc: "Sprawling residential infrastructure with synchronized foundational deployment.", type: "Residential Framework" },
              { name: "VTP Bel Air, Pune", desc: "High-density multi-tower structural contract completed with uncompromised asset alignment.", type: "Complex Core Works" },
              { name: "Gera Commerzone, Kharadi", desc: "Advanced commercial glass-and-steel infrastructure mapped precisely to technical layouts.", type: "Commercial Core Infra" },
            ].map((p, i) => (
              <div key={i} className="bg-mecpl-card border border-white/5 p-6 rounded-sm flex flex-col justify-between gap-4 shadow-xl hover:border-[#C41E3A]/30 transition-colors" data-testid={`card-small-project-${i}`}>
                <h4 className="text-base font-bold uppercase text-white tracking-tight border-b border-white/5 pb-3">{p.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{p.desc}</p>
                <span className="text-[9px] font-black uppercase text-[#C41E3A] tracking-widest">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE MECPL */}
      <section className="bg-mecpl-card/50 border-y border-white/5 py-24" data-testid="section-why-mecpl">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <SectionHeader label="Our Advantage" title="Why Choose MECPL" center subtitle="Six reasons India's top developers and industrialists repeatedly choose MECPL for their most critical projects." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="group bg-mecpl-card border border-white/5 rounded-sm p-8 space-y-4 hover:border-[#C41E3A]/30 hover:shadow-xl transition-all duration-300" data-testid={`card-why-${i}`}>
                <div className="w-12 h-12 bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center rounded-sm group-hover:bg-[#C41E3A] transition-colors">
                  <item.icon size={20} className="text-[#C41E3A] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-4">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-[#C41E3A]/20 cursor-pointer">
                Start Your Project <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-24" data-testid="section-clients">
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
              className="w-full h-full object-cover opacity-40"
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

      {/* TESTIMONIALS */}
      <section className="bg-mecpl-card/50 border-y border-white/5 py-24" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <SectionHeader label="Client Voices" title="What Our Partners Say" center />
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${i === activeTestimonial ? "block" : "hidden"}`}
                  data-testid={`testimonial-${i}`}
                >
                  <div className="bg-mecpl-card border border-white/5 rounded-sm p-10 space-y-6 text-center relative">
                    <Quote size={32} className="text-[#C41E3A]/30 mx-auto" />
                    <p className="text-white text-lg leading-relaxed font-medium italic">
                      "{t.quote}"
                    </p>
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={14} className="text-[#C41E3A] fill-[#C41E3A]" />
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-black text-sm uppercase tracking-wider">{t.name}</div>
                      <div className="text-gray-400 text-xs mt-1">{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Testimonial dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-[#C41E3A]" : "w-3 bg-white/20"}`}
                  data-testid={`button-testimonial-${i}`}
                />
              ))}
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
              <div key={a.year} className="p-5 bg-mecpl-card border border-white/5 rounded-sm hover:border-[#C41E3A]/30 transition-colors text-center" data-testid={`card-award-${a.year}`}>
                <div className="text-2xl mb-2">{a.icon}</div>
                <div className="text-[#C41E3A] font-black text-lg">{a.year}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wide mt-1 font-bold">{a.award}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ENQUIRY */}
      <section className="border-t border-white/5 bg-gradient-to-b from-mecpl-dark to-black py-24" data-testid="section-cta">
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
