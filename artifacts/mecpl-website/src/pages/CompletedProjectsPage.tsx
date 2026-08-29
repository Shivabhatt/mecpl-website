import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, ArrowUpRight } from "lucide-react";
const assetBase = import.meta.env.BASE_URL;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

const allProjects = [
  // Residential
  { name: "Kingsbury Pride Purple Group", type: "Residential", location: "Charoli, Pune", image: `${assetBase}assets/projects/Kingsbury.jpg` },
  { name: "Gera Song of Joy", type: "Residential", location: "Kharadi, Pune", image: `${assetBase}assets/projects/gera-songs-of-joy-01-large.png` },
  { name: "Godrej Rejuve", type: "Residential", location: "Keshav Nagar, Pune", image: `${assetBase}assets/projects/Rejuve.jpg` },
  { name: "Kalpataru Jade Residences", type: "Residential", location: "Baner, Pune", image: `${assetBase}assets/projects/Kalpataru.jpeg` },
  { name: "Yoo Villas", type: "Residential", location: "Wagholi, Pune", image: `${assetBase}assets/projects/yoovilla-1.png` },
  { name: "Trump Tower", type: "Residential", location: "Kalyani Nagar, Pune", image: `${assetBase}assets/projects/Trump-Tower.jpg` },
  { name: "Godrej Nurture", type: "Residential", location: "Mamurdi, Pune", image: `${assetBase}assets/projects/nurture-scaled.jpg` },
  { name: "Pride Atlantic", type: "Residential", location: "Charholi, Pune", image: `${assetBase}assets/projects/Atlantic.png` },
  { name: "Highrise-Panchshil Tower", type: "Residential", location: "Wagholi, Pune", image: `${assetBase}assets/projects/HIGH-RISE-1-scaled.jpg` },
  { name: "Godrej Forest Grove", type: "Residential", location: "Mamurdi, Pune", image: `${assetBase}assets/projects/Godrej-Forest-grove.jpg` },
  { name: "Godrej Infinity", type: "Residential", location: "Keshav Nagar, Pune", image: `${assetBase}assets/projects/GODREJ-INFINITY.jpg` },
  { name: "Emirus Project", type: "Residential", location: "Balewadi, Pune", image: `${assetBase}assets/projects/Emirus-scaled.jpg` },
  // Commercial
  { name: "Eon West LP II", type: "Commercial", location: "Wakad, Pune", image: `${assetBase}assets/projects/Eonwest.jpg` },
  { name: "Panchshil Tech Park", type: "Commercial", location: "Viman Nagar, Pune", image: `${assetBase}assets/projects/TechPark.jpg` },
  { name: "Gera Commerzone", type: "Commercial", location: "Kharadi, Pune", image: `${assetBase}assets/projects/KRC-scaled-e1700730314593.jpg` },
  { name: "Syntel Phase I & II", type: "Commercial", location: "Talawade IT Park", image: `${assetBase}assets/projects/syntel-03-large.png` },
  { name: "Indira College of Engineering", type: "Commercial", location: "Tathawade, Pune", image: `${assetBase}assets/projects/indira-01-large-1.png` },
  { name: "Golden Bell Complex", type: "Commercial", location: "Mundhwa, Pune", image: `${assetBase}assets/projects/Golden-Bell.jpg` },
  { name: "43 Privet Drive", type: "Commercial", location: "Balewadi, Pune", image: `${assetBase}assets/projects/43PD-1-scaled.jpg` },
  { name: "Connect Project", type: "Commercial", location: "Baudhan, Pune", image: `${assetBase}assets/projects/connect-01.png` },
  // Industrial
  { name: "Mahindra Electric", type: "Industrial", location: "Chakan, Pune", image: `${assetBase}assets/projects/MAHINDRA-1.png` },
  { name: "Praj Industries Ltd.", type: "Industrial", location: "Pirangut, Pune", image: `${assetBase}assets/projects/PRAJ-INDUSTRIES.png` },
  { name: "Amtek Auto Ltd.", type: "Industrial", location: "Sanaswadi, Pune", image: `${assetBase}assets/projects/AMTEK-AUTO-LTD.png` },
  { name: "Bekaert Industries", type: "Industrial", location: "Ranjangaon, Pune", image: `${assetBase}assets/projects/BEKAERT-INDUSTRIES-PVT.LTD_.png` },
  // Special
  { name: "Universal Temple Ramakrishna Math", type: "Special", location: "Pune City Hub", image: `${assetBase}assets/projects/Ramkrishna-Math.jpg` },
];

const filters = ["All", "Residential", "Commercial", "Industrial", "Special"];

const typeBadge: Record<string, string> = {
  Residential: "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
  Commercial: "bg-[#f9f9f9] text-[#6b7280] border border-black/[0.1]",
  Industrial: "bg-[#f9f9f9] text-[#6b7280] border border-black/[0.1]",
  Special: "bg-[#C41E3A]/15 text-[#C41E3A] border border-[#C41E3A]/20",
};

export default function CompletedProjectsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter(p => p.type === active);

  return (
    <div data-animate-page className="bg-white">
      {/* Project Hero */}
      <div className="relative min-h-[500px] overflow-hidden bg-[#111827] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover"
          alt="MECPL construction projects"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.88)_0%,rgba(6,10,16,0.68)_48%,rgba(6,10,16,0.38)_100%)]" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center">
          <span className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-[#d5a51b]">
            Our Projects
          </span>
          <div className="mb-5 h-px w-8 bg-[#d5a51b]" />
          <h1 className="page-title-font max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
            Building Landmarks.
            <br />
            Transforming Tomorrow<span className="text-[#d5a51b]">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            From visionary designs to enduring structures, explore 150+ successful projects across Pune.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-left">
            {[
              ["150+", "Projects Delivered"],
              ["50M+", "Sq. Ft. Delivered"],
              ["25+", "Locations in Pune"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="text-2xl font-medium tracking-tight text-white md:text-3xl">{value}</span>
                <span className="max-w-[76px] text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-white/60">{label}</span>
              </div>
            ))}
          </div>
          <Link
            href="#project-grid"
            className="group mt-9 inline-flex items-center gap-3 border border-[#d5a51b] px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#d5a51b] hover:text-[#111827]"
          >
            Explore Projects
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#C41E3A] py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-center">
          {[ ["16", "Residential"], ["8", "Commercial"], ["4", "Industrial"], ["1", "Special"], ["150+", "Total Delivered"] ].map(([n, l]) => (
            <span key={l} className="text-white text-[10px] md:text-xs font-black uppercase tracking-wider">{n} {l}</span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-white border-b border-black/[0.06] py-4 md:py-5" data-testid="section-project-filters">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all ${
                active === f ? "bg-[#C41E3A] text-white" : "bg-white text-[#6b7280] hover:text-[#111827] border border-black/[0.1] hover:border-black/[0.2]"
              }`}
              data-testid={`button-filter-${f.toLowerCase()}`}
            >
              {f} {f !== "All" && <span className="opacity-50 ml-1">({allProjects.filter(p => p.type === f).length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section id="project-grid" className="max-w-7xl mx-auto px-6 py-14" data-testid="section-projects-grid">
        <p className="text-[#6b7280] text-xs uppercase tracking-widest font-bold mb-6">
          Showing {filtered.length} projects{active !== "All" ? ` · ${active}` : ""}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={`${active}-${i}`} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof allProjects)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delay = (index % 3) * 90;

  return (
    <div
      ref={ref}
      className="group relative bg-white border border-black/[0.07] rounded-sm overflow-hidden hover:border-[#C41E3A]/25 hover:shadow-xl transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 0.4s ease, border-color 0.4s ease`,
      }}
      data-testid={`card-project-${index}`}
    >
      <div className="h-52 overflow-hidden relative">
        <img
          src={project.image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out"
          alt={project.name}
          loading="lazy"
        />
        {/* Base gradient — always visible, subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-40"></div>

        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm ${typeBadge[project.type]}`}>
            {project.type}
          </span>
        </div>

        {/* Glassy white reveal panel — slides up on hover */}
        <div
          className="absolute inset-x-0 bottom-0 px-5 py-4 bg-white/85 backdrop-blur-md border-t border-white/60 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
        >
          <h3 className="text-[#111827] font-bold text-sm uppercase tracking-tight leading-snug mb-1.5">{project.name}</h3>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin size={11} className="text-[#C41E3A] flex-shrink-0" />
              <span className="text-[#6b7280] text-xs truncate">{project.location}</span>
            </div>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#C41E3A] flex-shrink-0 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={13} className="text-white" />
            </span>
          </div>
        </div>
      </div>

      {/* Static body — fades out as the glass panel rises on hover */}
      <div className="p-5 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-[#111827] font-bold text-sm uppercase tracking-tight leading-snug">{project.name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <MapPin size={11} className="text-[#C41E3A] flex-shrink-0" />
          <span className="text-[#6b7280] text-xs">{project.location}</span>
        </div>
      </div>
    </div>
  );
}
