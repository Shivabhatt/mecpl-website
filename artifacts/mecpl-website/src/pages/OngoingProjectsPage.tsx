import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import { MapPin, Activity } from "lucide-react";
const assetBase = import.meta.env.BASE_URL;

const ongoingProjects = [
  { name: "Panchshil SRA Dhanori", location: "Vishrantwadi, Pune", desc: "Structural rehabilitation development for SRA housing. Advanced concrete execution on high-density residential blocks.", image: `${assetBase}assets/projects/SRA-DHANORI-scaled.jpg` },
  { name: "VTP Township Framework", location: "Baner Highrise Sector, Pune", desc: "Large-scale township infrastructure framework. Multi-tower concrete structure execution across phased development zones.", image: `${assetBase}assets/projects/VTP-scaled.jpg` },
  { name: "Solitaire World Kothrud", location: "Kothrud, Pune", desc: "Premium residential towers development. High-specification concrete work for luxury residential project.", image: `${assetBase}assets/projects/2.Solitaire-World-Kothrud.jpg` },
  { name: "Wellington Sector — 01", location: "Charholi, Pune", desc: "Mass mega-township infrastructure block. Large-scale civil engineering execution across Pune's largest township projects.", image: `${assetBase}assets/projects/WhatsApp-Image-2025-05-06-at-17.24.37_0a4a5d3c-scaled.jpg` },
  { name: "Malpani Soul String", location: "Baner, Pune", desc: "Multi-tower residential structural execution. Precision concrete delivery for premium mid-rise residential towers.", image: `${assetBase}assets/projects/Malpani-Soul-String-scaled.jpg` },
  { name: "Raheja Sterling Frame", location: "Mohammedwadi, Pune", desc: "High-density precision residential blocks. Complex formwork and structural engineering for premium residential development.", image: `${assetBase}assets/projects/WhatsApp-Image-2024-01-06-at-11.01.23_faa333d0.jpg` },
  { name: "Solitaire Business Hub II", location: "Baner, Pune", desc: "Premium integrated commercial workspace platform. State-of-the-art structural engineering for next-generation office spaces.", image: `${assetBase}assets/projects/Solitaire-Business-Hub-II.jpeg` },
  { name: "Godrej Emerald Waters", location: "Pimpri, Pune", desc: "High-scale concrete engineering matrix. Advanced structural systems for premium residential development by Godrej Properties.", image: `${assetBase}assets/projects/Godrej-Emerald-Waters.jpg` },
  { name: "Raheja Vista NIBM", location: "Mohammedwadi, Pune", desc: "Residential structural development in prime NIBM corridor. High-quality concrete execution for luxury residential towers.", image: `${assetBase}assets/projects/Raheja-Vistas-scaled.jpg` },
  { name: "Godrej Park Ridge", location: "Mohammedwadi, Pune", desc: "Premium residential cluster pipeline. Multi-phase residential development with complex structural engineering requirements.", image: `${assetBase}assets/projects/Godrej-Park-Ridge-.jpg` },
];

export default function OngoingProjectsPage() {
  return (
    <div data-animate-page className="bg-mecpl-dark pt-20">
      {/* Header */}
      <div className="relative py-14 md:py-20 border-b border-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-15" alt="Construction" />
        <div className="absolute inset-0 bg-gradient-to-r from-mecpl-dark via-mecpl-dark/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#C41E3A] rounded-full animate-pulse"></span>
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Active Construction</span>
          </div>
          <SectionHeader title="Ongoing Projects" subtitle="10 active engineering pipelines currently under construction across Pune's premier development zones." center light />
          <div className="flex items-center gap-2 mt-3 text-white/30 text-[10px] md:text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white/60">Ongoing Projects</span>
          </div>
        </div>
      </div>

      {/* Live indicator bar */}
      <div className="bg-mecpl-card border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-3 text-center">
          <Activity size={14} className="text-[#C41E3A]" />
          <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest">10 Projects Currently Active</span>
          <span className="w-2 h-2 bg-[#C41E3A] rounded-full animate-pulse"></span>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-ongoing-projects">
        <div className="grid md:grid-cols-2 gap-8">
          {ongoingProjects.map((project, i) => (
            <div
              key={i}
              className="group bg-mecpl-card border border-white/5 rounded-sm overflow-hidden hover:border-[#C41E3A]/30 transition-all duration-300 shadow-xl flex flex-col"
              data-testid={`card-ongoing-project-${i}`}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  alt={project.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                  <span className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full animate-pulse"></span>
                  <span className="text-[#C41E3A] text-[9px] font-black uppercase tracking-widest">Active Build</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/30 text-xs font-black">0{i + 1}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <h3 className="text-white font-black text-lg uppercase tracking-tight group-hover:text-[#C41E3A] transition-colors">{project.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#C41E3A]" />
                    <span className="text-gray-500 text-xs">{project.location}</span>
                  </div>
                  <div className="w-8 h-0.5 bg-[#C41E3A]"></div>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-gradient-to-b from-mecpl-dark to-black py-20" data-testid="section-ongoing-cta">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Partner on Your Next Project</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">Looking for a trusted civil engineering partner? Connect with MECPL's project team.</p>
          <Link href="/contact" data-testid="button-ongoing-contact">
            <span className="inline-block bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg cursor-pointer">
              Contact Our Team
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}