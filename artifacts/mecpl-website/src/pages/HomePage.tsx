import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, ArrowRight, Award, Users, Building2, Shield, CheckCircle } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const heroSlides = [
  {
    id: 1,
    bg: "linear-gradient(135deg, #0d1a42 0%, #1B2F6E 40%, #2a4499 100%)",
    pattern: "residential",
    project: "Yoo Villa — Wagholi",
    tag: "Completed Project",
    desc: "A landmark residential development redefining luxury living in Pune's eastern corridor.",
  },
  {
    id: 2,
    bg: "linear-gradient(135deg, #0a1228 0%, #162455 40%, #1B2F6E 100%)",
    pattern: "highrise",
    project: "Panchshil Highrise Towers — Kharadi",
    tag: "Structural Excellence",
    desc: "Vertical engineering at its finest — precision concrete work on one of Pune's tallest towers.",
  },
  {
    id: 3,
    bg: "linear-gradient(135deg, #0d1a42 0%, #1a3060 40%, #243d7a 100%)",
    pattern: "urban",
    project: "ANP Universe — Balewadi",
    tag: "Ongoing Urban Ecosystem",
    desc: "An integrated township ecosystem under active construction, setting benchmarks for urban living.",
  },
  {
    id: 4,
    bg: "linear-gradient(135deg, #0a1228 0%, #1B2F6E 50%, #1e367e 100%)",
    pattern: "commercial",
    project: "Gera Commerzone — Kharadi",
    tag: "Commercial Hub",
    desc: "State-of-the-art commercial infrastructure delivering world-class workspace environments.",
  },
];

const stats = [
  { value: 25, suffix: "+", label: "Years of Legacy", icon: Award },
  { value: 150, suffix: "+", label: "Completed Projects", icon: Building2 },
  { value: 100, suffix: "%", label: "Quality Record", icon: Shield },
  { value: 20, suffix: "+", label: "Enterprise Clients", icon: Users },
];

const featuredProjects = [
  { name: "Highrise-Panchshil Tower", type: "Residential", location: "Wagholi", color: "#1B2F6E" },
  { name: "Gera Commerzone", type: "Commercial", location: "Kharadi", color: "#0d4a8a" },
  { name: "Godrej Properties", type: "Residential", location: "Keshav Nagar", color: "#163268" },
  { name: "Panchshil Tech Park", type: "Commercial", location: "Viman Nagar", color: "#1a3c7a" },
  { name: "Mahindra Electric", type: "Industrial", location: "Chakan", color: "#0f2455" },
  { name: "Syntel Phase I & II", type: "Commercial", location: "Talawade IT Park", color: "#1B2F6E" },
];

const clients = [
  "Panchshil Realty", "VTP Realty", "Godrej Properties", "Tata Consultancy Services",
  "Kalpataru", "K Raheja Corp", "Malpani Group", "Gera Developments",
  "Pride Purple Group", "Praj Industries", "Mahindra & Mahindra", "Syntel Corp",
  "Aurus Developers", "Indira Group", "Nandan Buildcon", "Bekaert Industries",
];

const certifications = [
  { code: "ISO 9001:2015", label: "Quality Management" },
  { code: "ISO 14001:2015", label: "Environmental" },
  { code: "ISO 45001:2018", label: "Occupational Safety" },
  { code: "CRISIL SME 1", label: "Since 2007" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-5xl font-black text-white">
      {count}
      <span className="text-[#F47920]">{suffix}</span>
    </div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ background: slide.bg, transition: "background 0.8s ease" }}
        data-testid="section-hero"
      >
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 border border-white rounded-full"></div>
          <div className="absolute top-40 right-40 w-64 h-64 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 border border-orange-400 rounded-full"></div>
          <div className="absolute top-0 left-1/3 w-1 h-full bg-white/5"></div>
          <div className="absolute top-0 left-2/3 w-1 h-full bg-white/5"></div>
        </div>

        {/* Building silhouette illustration */}
        <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:flex items-end justify-end pointer-events-none overflow-hidden">
          <svg viewBox="0 0 500 600" className="w-full h-full opacity-15" preserveAspectRatio="xMidYMax meet">
            <rect x="150" y="100" width="80" height="500" fill="white" />
            <rect x="240" y="200" width="60" height="400" fill="white" />
            <rect x="80" y="250" width="60" height="350" fill="white" />
            <rect x="310" y="300" width="80" height="300" fill="white" />
            {[110,140,170,200,230,260,290,320,350,380,410,440,470].map((y, i) => (
              <rect key={i} x="152" y={y} width="76" height="1" fill="#F47920" opacity="0.5" />
            ))}
            {[220,250,280,310,340,370,400,430,460,490].map((y, i) => (
              <rect key={i} x="242" y={y} width="56" height="1" fill="#F47920" opacity="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F47920]/20 border border-[#F47920]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#F47920] rounded-full animate-pulse"></span>
              <span className="text-[#F47920] text-xs font-bold tracking-widest uppercase">{slide.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Building
              <span className="text-[#F47920]"> Excellence.</span>
              <br />
              Delivering Trust.
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-3">
              {slide.project}
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-lg">
              {slide.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/completed-projects" data-testid="button-hero-projects">
                <span className="inline-flex items-center gap-2 bg-[#F47920] text-white px-8 py-4 font-bold text-sm tracking-wide uppercase rounded hover:bg-orange-600 transition-colors cursor-pointer">
                  View Our Projects <ArrowRight size={16} />
                </span>
              </Link>
              <Link href="/about" data-testid="button-hero-about">
                <span className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 font-bold text-sm tracking-wide uppercase rounded hover:border-white/60 hover:bg-white/10 transition-all cursor-pointer">
                  About MECPL
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#F47920] hover:text-[#F47920] transition-colors"
            data-testid="button-slide-prev"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-[#F47920]" : "w-3 bg-white/40"}`}
                data-testid={`button-slide-dot-${i}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#F47920] hover:text-[#F47920] transition-colors"
            data-testid="button-slide-next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1B2F6E] py-16" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-[#F47920]/20 rounded-lg flex items-center justify-center">
                      <Icon size={22} className="text-[#F47920]" />
                    </div>
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-white/60 text-sm font-medium mt-1 uppercase tracking-wide">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 bg-white" data-testid="section-about-teaser">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionHeader
                label="Who We Are"
                title="India's Premier Civil Engineering Contractor"
                subtitle="Millennium Engineers & Contractors Pvt. Ltd. (MECPL) has been delivering landmark civil engineering projects across residential, commercial, and industrial sectors since 1998."
              />
              <div className="space-y-4 mb-8">
                {[
                  "25+ years of unmatched structural execution across Pune and beyond",
                  "150+ completed landmark projects for Tier-1 developers",
                  "ISO certified quality, safety, and environmental systems",
                  "CRISIL SME 1 rated — highest financial credibility since 2007",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#F47920] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" data-testid="button-about-teaser">
                <span className="inline-flex items-center gap-2 bg-[#1B2F6E] text-white px-7 py-3.5 font-bold text-sm tracking-wide uppercase rounded hover:bg-[#162459] transition-colors cursor-pointer">
                  Learn More <ArrowRight size={16} />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.code} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-[#F47920]/30 hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-[#F47920] rounded flex items-center justify-center mb-3">
                    <Shield size={16} className="text-white" />
                  </div>
                  <div className="text-[#1B2F6E] font-bold text-sm mb-1">{cert.code}</div>
                  <div className="text-gray-500 text-xs">{cert.label}</div>
                </div>
              ))}
              <div className="col-span-2 bg-[#1B2F6E] rounded-xl p-5 text-center">
                <div className="text-4xl font-black text-white">1998</div>
                <div className="text-[#F47920] text-sm font-bold mt-1 uppercase tracking-wider">Established</div>
                <div className="text-white/60 text-xs mt-1">Pune, Maharashtra, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 bg-gray-50" data-testid="section-featured-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <SectionHeader
              label="Our Portfolio"
              title="Landmark Projects"
              subtitle="A selection from 150+ completed projects across residential, commercial, and industrial sectors."
            />
            <Link href="/completed-projects" data-testid="button-view-all-projects">
              <span className="inline-flex items-center gap-2 text-[#F47920] font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all cursor-pointer flex-shrink-0 mb-10">
                View All <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <Link href="/completed-projects" key={i} data-testid={`card-project-${i}`}>
                <div className="group rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div
                    className="h-44 flex items-end p-5 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}cc 100%)` }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <svg viewBox="0 0 100 100"><rect x="20" y="0" width="30" height="100" fill="white" /><rect x="55" y="20" width="25" height="80" fill="white" /></svg>
                    </div>
                    <div>
                      <span className="inline-block bg-[#F47920] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide mb-2">
                        {project.type}
                      </span>
                      <h3 className="text-white font-bold text-base leading-snug group-hover:text-[#F47920] transition-colors">{project.name}</h3>
                      <p className="text-white/70 text-xs mt-1">{project.location}, Pune</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ONGOING PROJECTS STRIP */}
      <section className="py-16 bg-[#1B2F6E]" data-testid="section-ongoing-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-2 block">Active Construction</span>
              <h2 className="text-white text-3xl font-black">10 Ongoing Projects</h2>
              <p className="text-white/60 text-sm mt-2">Active engineering pipelines across Pune's prime development zones.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Panchshil SRA Dhanori", "VTP Township", "Godrej Emerald Waters", "Solitaire World Kothrud"].map((p, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="w-2 h-2 bg-[#F47920] rounded-full mx-auto mb-2 animate-pulse"></div>
                  <p className="text-white text-xs font-semibold leading-snug">{p}</p>
                </div>
              ))}
            </div>
            <Link href="/ongoing-projects" data-testid="button-ongoing-projects">
              <span className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F47920] text-white px-7 py-3.5 font-bold text-sm uppercase tracking-wide rounded hover:bg-orange-600 transition-colors cursor-pointer">
                View Pipeline <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-20 bg-white overflow-hidden" data-testid="section-clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Clients"
            title="Trusted by Industry Leaders"
            subtitle="MECPL is the preferred structural contractor for India's most respected real estate and infrastructure companies."
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-8">
            {clients.map((client, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 border border-gray-100 rounded-lg hover:border-[#1B2F6E]/20 hover:shadow-sm transition-all bg-gray-50"
                data-testid={`card-client-${i}`}
              >
                <span className="text-[#1B2F6E] font-bold text-xs text-center leading-snug">{client}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/clients" data-testid="button-all-clients">
              <span className="inline-flex items-center gap-2 text-[#F47920] font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all cursor-pointer">
                View All Clients <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* AWARDS TEASER */}
      <section className="py-20 bg-gray-50" data-testid="section-awards-teaser">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionHeader
                label="Recognition"
                title="Award-Winning Excellence"
                subtitle="MECPL has been honored with prestigious industry awards for structural excellence, safety, and quality delivery year after year."
              />
              <div className="space-y-3">
                {[
                  { year: "2023", award: "BAI Well-Built Structure — Special Jury's Recommendation" },
                  { year: "2022", award: "PCERF Constro Silver Trophy — Eon West Project" },
                  { year: "2021", award: "PCERF Constro Gold Trophy — Godrej Nurture Project" },
                  { year: "2018", award: "PCERF CONSTRO Industry Excellence Gold Trophy" },
                ].map((item) => (
                  <div key={item.year} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#F47920]/30 transition-colors">
                    <div className="text-[#F47920] font-black text-xl w-14 flex-shrink-0">{item.year}</div>
                    <p className="text-gray-700 text-sm font-medium leading-snug mt-0.5">{item.award}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/awards" data-testid="button-all-awards">
                  <span className="inline-flex items-center gap-2 text-[#F47920] font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all cursor-pointer">
                    Full Awards History <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: "2023", label: "BAI Special Jury", icon: "🏆" },
                { year: "2022", label: "Constro Silver", icon: "🥈" },
                { year: "2021", label: "Constro Gold", icon: "🥇" },
                { year: "2018", label: "Industry Excellence", icon: "⭐" },
                { year: "2017", label: "India's Small Giants", icon: "🏅" },
                { year: "2016", label: "SME Excellence", icon: "🎖" },
              ].map((award) => (
                <div key={award.year} className="bg-[#1B2F6E] rounded-xl p-5 text-center">
                  <div className="text-2xl mb-2">{award.icon}</div>
                  <div className="text-[#F47920] font-black text-lg">{award.year}</div>
                  <div className="text-white/70 text-xs mt-1">{award.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-[#F47920]" data-testid="section-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Build Something Exceptional?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Partner with Pune's most trusted civil engineering contractor. Get in touch with our team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-cta-contact">
              <span className="inline-flex items-center gap-2 bg-white text-[#F47920] px-10 py-4 font-black text-sm tracking-wide uppercase rounded hover:bg-gray-100 transition-colors cursor-pointer">
                Contact Us <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/completed-projects" data-testid="button-cta-projects">
              <span className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 font-bold text-sm tracking-wide uppercase rounded hover:bg-white/10 transition-colors cursor-pointer">
                Our Portfolio
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
