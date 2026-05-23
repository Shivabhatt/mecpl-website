import { Link } from "wouter";
import { MapPin, Activity } from "lucide-react";

const ongoingProjects = [
  { name: "Panchshil SRA Dhanori", location: "Vishrantwadi, Pune", desc: "Structural rehabilitation development for SRA housing. Advanced concrete execution on high-density residential blocks." },
  { name: "VTP Township Framework", location: "Baner Highrise Sector, Pune", desc: "Large-scale township infrastructure framework. Multi-tower concrete structure execution across phased development zones." },
  { name: "Solitaire World Kothrud", location: "Kothrud, Pune", desc: "Premium residential towers development infrastructure. High-specification concrete work for luxury residential project." },
  { name: "Wellington Sector – 01", location: "Charholi, Pune", desc: "Mass mega-township infrastructure block. Large-scale civil engineering execution across one of Pune's largest township projects." },
  { name: "Malpani Soul String", location: "Baner, Pune", desc: "Multi-tower residential structural execution. Precision concrete delivery for premium mid-rise residential towers." },
  { name: "Raheja Sterling Frame", location: "Mohammedwadi, Pune", desc: "High-density precision residential blocks. Complex formwork and structural engineering for premium residential development." },
  { name: "Solitaire Business Hub II", location: "Baner, Pune", desc: "Premium integrated commercial workspace platform. State-of-the-art structural engineering for next-generation office spaces." },
  { name: "Godrej Emerald Waters", location: "Pimpri, Pune", desc: "High-scale concrete engineering matrix. Advanced structural systems for premium residential development by Godrej Properties." },
  { name: "Raheja Vista NIBM", location: "Mohammedwadi, Pune", desc: "Residential structural development in prime NIBM corridor. High-quality concrete execution for luxury residential towers." },
  { name: "Godrej Park Ridge", location: "Mohammedwadi, Pune", desc: "Premium residential cluster pipeline. Multi-phase residential development with complex structural engineering requirements." },
];

export default function OngoingProjectsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#F47920] rounded-full animate-pulse"></span>
            <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase">Active Construction</div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Ongoing Projects</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            10 active engineering pipelines currently under construction across Pune's premier development zones.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Ongoing Projects</span>
          </div>
        </div>
      </div>

      {/* Active indicator */}
      <div className="bg-[#F47920] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3">
          <Activity size={16} className="text-white" />
          <span className="text-white text-sm font-bold uppercase tracking-wider">10 Projects Currently Active</span>
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        </div>
      </div>

      {/* Projects */}
      <section className="py-16 bg-gray-50" data-testid="section-ongoing-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ongoingProjects.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                data-testid={`card-ongoing-project-${i}`}
              >
                <div className="h-2 bg-[#F47920]"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0 mt-0.5"></span>
                      <span className="text-green-600 text-xs font-bold uppercase tracking-wide">Active Build</span>
                    </div>
                    <span className="text-[#1B2F6E] font-black text-sm opacity-20">0{i + 1}</span>
                  </div>
                  <h3 className="text-[#1B2F6E] font-black text-lg mb-2 group-hover:text-[#F47920] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin size={13} className="text-[#F47920]" />
                    <span className="text-gray-500 text-xs">{project.location}</span>
                  </div>
                  <div className="w-8 h-0.5 bg-[#F47920] mb-4"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B2F6E]" data-testid="section-ongoing-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Partner on Your Next Project</h2>
          <p className="text-white/60 text-base mb-8 max-w-md mx-auto">
            Looking for a trusted civil engineering partner? Connect with MECPL's project team.
          </p>
          <Link href="/contact" data-testid="button-ongoing-contact">
            <span className="inline-flex items-center gap-2 bg-[#F47920] text-white px-8 py-4 font-bold text-sm uppercase tracking-wide rounded hover:bg-orange-600 transition-colors cursor-pointer">
              Contact Our Team
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
