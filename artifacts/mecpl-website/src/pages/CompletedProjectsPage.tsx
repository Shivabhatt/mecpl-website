import { useState } from "react";
import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import { MapPin } from "lucide-react";
const assetBase = import.meta.env.BASE_URL;

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
      {/* Header */}
      <div className="relative py-14 md:py-20 border-b border-black/[0.06] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" alt="Construction" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-6" style={{ paddingTop: 25 }}>
          <SectionHeader label="Our Portfolio" title="Completed Projects" subtitle="150+ landmark structures delivered across residential, commercial, and industrial sectors." center />
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
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-projects-grid">
        <p className="text-[#6b7280] text-xs uppercase tracking-widest font-bold mb-6">
          Showing {filtered.length} projects{active !== "All" ? ` · ${active}` : ""}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div key={i} className="group bg-white border border-black/[0.07] rounded-sm overflow-hidden hover:border-[#C41E3A]/30 hover:shadow-lg transition-all duration-300 shadow-sm" data-testid={`card-project-${i}`}>
              <div className="h-44 overflow-hidden relative">
                <img
                  src={project.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
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
                <h3 className="text-[#111827] font-bold text-sm uppercase tracking-tight group-hover:text-[#C41E3A] transition-colors leading-snug">{project.name}</h3>
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin size={11} className="text-[#C41E3A] flex-shrink-0" />
                  <span className="text-[#6b7280] text-xs">{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
