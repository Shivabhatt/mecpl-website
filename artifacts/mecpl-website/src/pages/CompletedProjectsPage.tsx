import { useState } from "react";
import { Link } from "wouter";
import { MapPin } from "lucide-react";

const allProjects = [
  // Residential
  { name: "Kingsbury Pride Purple Group", type: "Residential", location: "Charoli, Pune", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop" },
  { name: "Gera Song of Joy", type: "Residential", location: "Kharadi, Pune", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop" },
  { name: "Godrej Rejuve", type: "Residential", location: "Keshav Nagar, Pune", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=400&auto=format&fit=crop" },
  { name: "Kalpataru Jade Residences", type: "Residential", location: "Baner, Pune", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop" },
  { name: "Yoo Villas", type: "Residential", location: "Wagholi, Pune", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400&auto=format&fit=crop" },
  { name: "Trump Tower", type: "Residential", location: "Kalyani Nagar, Pune", image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=400&auto=format&fit=crop" },
  { name: "Godrej Nurture", type: "Residential", location: "Mamurdi, Pune", image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=400&auto=format&fit=crop" },
  { name: "Pride Atlantic", type: "Residential", location: "Charholi, Pune", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=400&auto=format&fit=crop" },
  { name: "Highrise-Panchshil Tower", type: "Residential", location: "Wagholi, Pune", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=400&auto=format&fit=crop" },
  { name: "Godrej Forest Grove", type: "Residential", location: "Mamurdi, Pune", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=400&auto=format&fit=crop" },
  { name: "Godrej Infinity", type: "Residential", location: "Keshav Nagar, Pune", image: "https://images.unsplash.com/photo-1566908829550-e6551b00979b?q=80&w=400&auto=format&fit=crop" },
  { name: "Emirus Project", type: "Residential", location: "Balewadi, Pune", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=400&auto=format&fit=crop" },
  // Commercial
  { name: "Eon West LP II", type: "Commercial", location: "Wakad, Pune", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" },
  { name: "Panchshil Tech Park", type: "Commercial", location: "Viman Nagar, Pune", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=400&auto=format&fit=crop" },
  { name: "Gera Commerzone", type: "Commercial", location: "Kharadi, Pune", image: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?q=80&w=400&auto=format&fit=crop" },
  { name: "Syntel Phase I & II", type: "Commercial", location: "Talawade IT Park", image: "https://images.unsplash.com/photo-1554435493-93422e8d1c46?q=80&w=400&auto=format&fit=crop" },
  { name: "Indira College of Engineering", type: "Commercial", location: "Tathawade, Pune", image: "https://images.unsplash.com/photo-1597762117709-859f744b84c3?q=80&w=400&auto=format&fit=crop" },
  { name: "Golden Bell Complex", type: "Commercial", location: "Mundhwa, Pune", image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=400&auto=format&fit=crop" },
  { name: "43 Privet Drive", type: "Commercial", location: "Balewadi, Pune", image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=400&auto=format&fit=crop" },
  { name: "Connect Project", type: "Commercial", location: "Baudhan, Pune", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop" },
  // Industrial
  { name: "Mahindra Electric", type: "Industrial", location: "Chakan, Pune", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop" },
  { name: "Praj Industries Ltd.", type: "Industrial", location: "Pirangut, Pune", image: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=400&auto=format&fit=crop" },
  { name: "Amtek Auto Ltd.", type: "Industrial", location: "Sanaswadi, Pune", image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=400&auto=format&fit=crop" },
  { name: "Bekaert Industries", type: "Industrial", location: "Ranjangaon, Pune", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop" },
  // Special
  { name: "Universal Temple Ramakrishna Math", type: "Special", location: "Pune City Hub", image: "https://images.unsplash.com/photo-1558618047-f4e60cfd4a32?q=80&w=400&auto=format&fit=crop" },
];

const filters = ["All", "Residential", "Commercial", "Industrial", "Special"];

const typeBadge: Record<string, string> = {
  Residential: "bg-blue-900/60 text-blue-300",
  Commercial: "bg-violet-900/60 text-violet-300",
  Industrial: "bg-orange-900/60 text-orange-300",
  Special: "bg-emerald-900/60 text-emerald-300",
};

export default function CompletedProjectsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter(p => p.type === active);

  return (
    <div className="bg-[#1A1A1A] pt-20">
      {/* Header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale" alt="Construction" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-3">Our Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">Completed Projects</h1>
          <div className="w-16 h-0.5 bg-[#C41E3A] mt-4"></div>
          <p className="text-gray-400 text-base mt-4 max-w-xl leading-relaxed">150+ landmark structures delivered across residential, commercial, and industrial sectors.</p>
          <div className="flex items-center gap-2 mt-5 text-white/30 text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white/60">Completed Projects</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#C41E3A] py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 gap-y-1">
          {[["16", "Residential"], ["8", "Commercial"], ["4", "Industrial"], ["1", "Special"], ["150+", "Total Delivered"]].map(([n, l]) => (
            <span key={l} className="text-white text-xs font-black uppercase tracking-wider">{n} {l}</span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-[#1A1A1A] border-b border-white/5 py-5" data-testid="section-project-filters">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all ${
                active === f ? "bg-[#C41E3A] text-white" : "bg-[#2C2C2C] text-white/50 hover:text-white border border-white/5 hover:border-white/20"
              }`}
              data-testid={`button-filter-${f.toLowerCase()}`}
            >
              {f} {f !== "All" && <span className="opacity-50 ml-1">({allProjects.filter(p => p.type === f).length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-projects-grid">
        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-6">
          Showing {filtered.length} projects{active !== "All" ? ` · ${active}` : ""}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div key={i} className="group bg-[#2C2C2C] border border-white/5 rounded-sm overflow-hidden hover:border-[#C41E3A]/30 hover:shadow-2xl transition-all duration-300" data-testid={`card-project-${i}`}>
              <div className="h-44 overflow-hidden relative">
                <img
                  src={project.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  alt={project.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm ${typeBadge[project.type]}`}>
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-sm uppercase tracking-tight group-hover:text-[#C41E3A] transition-colors leading-snug">{project.name}</h3>
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin size={11} className="text-[#C41E3A] flex-shrink-0" />
                  <span className="text-gray-500 text-xs">{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
