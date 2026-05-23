import { useState } from "react";
import { Link } from "wouter";
import { MapPin } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const allProjects = [
  // Residential
  { name: "Kingsbury Pride Purple Group", type: "Residential", location: "Charoli, Pune" },
  { name: "Gera Song of Joy", type: "Residential", location: "Kharadi, Pune" },
  { name: "Godrej Rejuve", type: "Residential", location: "Keshav Nagar, Pune" },
  { name: "Kalpataru Jade Residences", type: "Residential", location: "Baner, Pune" },
  { name: "Yoo Villas", type: "Residential", location: "Wagholi, Pune" },
  { name: "Cereza Project", type: "Residential", location: "Punawale, Pune" },
  { name: "Trump Tower", type: "Residential", location: "Kalyani Nagar, Pune" },
  { name: "Godrej Nurture", type: "Residential", location: "Mamurdi, Pune" },
  { name: "Lakhani Bungalow", type: "Residential", location: "Koregaon Park, Pune" },
  { name: "Pride Atlantic", type: "Residential", location: "Charholi, Pune" },
  { name: "Emirus Project", type: "Residential", location: "Balewadi, Pune" },
  { name: "Highrise-Panchshil Tower", type: "Residential", location: "Wagholi, Pune" },
  { name: "Vivanta Project", type: "Residential", location: "Balewadi, Pune" },
  { name: "Soho Project", type: "Residential", location: "Wagholi, Pune" },
  { name: "Godrej Forest Grove", type: "Residential", location: "Mamurdi, Pune" },
  { name: "Godrej Infinity", type: "Residential", location: "Keshav Nagar, Pune" },
  // Commercial
  { name: "Eon West LP II", type: "Commercial", location: "Wakad, Pune" },
  { name: "Office Building", type: "Commercial", location: "Kalyani Nagar, Pune" },
  { name: "Golden Bell", type: "Commercial", location: "Mundhwa, Pune" },
  { name: "43 Privet Drive", type: "Commercial", location: "Balewadi, Pune" },
  { name: "Panchshil Tech Park", type: "Commercial", location: "Viman Nagar, Pune" },
  { name: "Eon-Kharadi Infrastructure", type: "Commercial", location: "Kharadi, Pune" },
  { name: "Connect Project", type: "Commercial", location: "Baudhan, Pune" },
  { name: "Food Plaza Complex", type: "Commercial", location: "Lonavala Highway" },
  { name: "Gera Commerzone", type: "Commercial", location: "Kharadi, Pune" },
  { name: "Syntel Phase I & II", type: "Commercial", location: "Talawade IT Park" },
  { name: "Indira College of Engineering", type: "Commercial", location: "Tathawade, Pune" },
  // Industrial
  { name: "Mahindra Electric", type: "Industrial", location: "Chakan, Pune" },
  { name: "Praj Industries Ltd.", type: "Industrial", location: "Pirangut, Pune" },
  { name: "Amtek Auto Ltd.", type: "Industrial", location: "Sanaswadi, Pune" },
  { name: "Bekaert Industries", type: "Industrial", location: "Ranjangaon, Pune" },
  // Special
  { name: "Universal Temple Ramakrishna Math", type: "Special", location: "Pune City Hub" },
];

const typeColors: Record<string, { bg: string; badge: string }> = {
  Residential: { bg: "linear-gradient(135deg, #1B2F6E 0%, #243d7a 100%)", badge: "#1B2F6E" },
  Commercial: { bg: "linear-gradient(135deg, #0d4a8a 0%, #1a6ab5 100%)", badge: "#0d4a8a" },
  Industrial: { bg: "linear-gradient(135deg, #0f2455 0%, #1B2F6E 100%)", badge: "#5a3e00" },
  Special: { bg: "linear-gradient(135deg, #3a1a5c 0%, #5c2e8a 100%)", badge: "#5c2e8a" },
};

const filters = ["All", "Residential", "Commercial", "Industrial", "Special"];

export default function CompletedProjectsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.type === active);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Our Portfolio</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Completed Projects</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            150+ landmark structures delivered across residential, commercial, and industrial sectors.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Completed Projects</span>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-[#F47920] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            <span className="text-white text-sm font-bold">16 Residential</span>
            <span className="text-white/60">|</span>
            <span className="text-white text-sm font-bold">11 Commercial</span>
            <span className="text-white/60">|</span>
            <span className="text-white text-sm font-bold">4 Industrial</span>
            <span className="text-white/60">|</span>
            <span className="text-white text-sm font-bold">1 Special</span>
            <span className="text-white/60">|</span>
            <span className="text-white text-sm font-bold">150+ Total</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="py-10 bg-gray-50 sticky top-16 lg:top-20 z-20 border-b border-gray-200 shadow-sm" data-testid="section-project-filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${
                  active === f
                    ? "bg-[#1B2F6E] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#1B2F6E] hover:text-[#1B2F6E]"
                }`}
                data-testid={`button-filter-${f.toLowerCase()}`}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-2 text-xs opacity-60">
                    ({allProjects.filter((p) => p.type === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-14 bg-white" data-testid="section-projects-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-6">
            Showing <strong>{filtered.length}</strong> projects
            {active !== "All" && <span> in <strong>{active}</strong></span>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const colors = typeColors[project.type] || typeColors["Residential"];
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  data-testid={`card-completed-project-${i}`}
                >
                  <div
                    className="h-36 flex items-end p-5 relative overflow-hidden"
                    style={{ background: colors.bg }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                      <svg viewBox="0 0 100 100">
                        <rect x="20" y="0" width="30" height="100" fill="white" />
                        <rect x="55" y="20" width="20" height="80" fill="white" />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className="text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                        style={{ backgroundColor: "rgba(244,121,32,0.9)" }}
                      >
                        {project.type}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#F47920] transition-colors">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center gap-2">
                    <MapPin size={13} className="text-[#F47920] flex-shrink-0" />
                    <span className="text-gray-600 text-xs">{project.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
