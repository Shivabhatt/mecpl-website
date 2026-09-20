import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ServiceLineIcon, { type ServiceIconType } from "@/components/ServiceLineIcon";

const services = [
  {
    icon: "residential",
    title: "Residential Construction",
    subtitle: "Scale, Safety & Lasting Performance",
    desc: "High-rise, township and residential developments built for scale, safety and lasting performance.",
    highlights: ["High-Rise Towers", "Township Developments", "Luxury Residences", "Gated Communities"],
    image: "/assets/projects/Trump-Tower.jpg",
  },
  {
    icon: "institutional-industrial",
    title: "Institutional & Industrial Construction",
    subtitle: "High-Performance Structures",
    desc: "From educational and institutional spaces to factories, R&D centres and process plants, we build high-performance structures engineered for demanding operations.",
    highlights: ["Manufacturing Facilities", "R&D Centres", "Educational Campuses", "Process Plants"],
    image: "/assets/projects/PRAJ-INDUSTRIES.png",
  },
  {
    icon: "commercial",
    title: "Commercial Construction",
    subtitle: "Precision, Efficiency & Quality",
    desc: "Office, retail and mixed-use developments delivered with precision, efficiency and quality.",
    highlights: ["Office Buildings", "Retail Spaces", "Mixed-Use Developments", "Corporate IT Parks"],
    image: "/assets/projects/Eonwest.jpg",
  },
  {
    icon: "infrastructure",
    title: "Infrastructure Construction",
    subtitle: "Durability & Functionality",
    desc: "Large-scale infrastructure and civil works built for durability, functionality and long-term performance.",
    highlights: ["Civil Works", "Roads & Bridges", "Urban Infrastructure", "Public Utilities"],
    image: "/assets/projects/Godrej-Forest-grove.jpg",
  },
  {
    icon: "interiors",
    title: "Interiors Projects",
    subtitle: "Complete Interior Environments",
    desc: "B2B interior solutions extending our construction expertise into doors, modular furniture and complete interior environments.",
    highlights: ["Modular Furniture", "B2B Doors", "Commercial Fitouts", "Institutional Interiors"],
    image: "/assets/projects/Rejuve.jpg",
  },
  {
    icon: "turnkey",
    title: "Turnkey Projects",
    subtitle: "End-to-End Execution",
    desc: "End-to-end project execution bringing together planning, construction, interiors and finishing under one roof.",
    highlights: ["Design Coordination", "Material Procurement", "Site Execution", "Finishing & Handover"],
    image: "/assets/projects/Solitaire-Business-Hub-II.jpeg",
  },
] satisfies Array<{
  icon: ServiceIconType;
  title: string;
  subtitle: string;
  desc: string;
  highlights: string[];
  image: string;
}>;

export default function ServicesPage() {
  return (
    <div data-animate-page className="bg-white">
      {/* Header */}
      <div className="relative py-24 border-b border-mecpl-dark/[0.06] overflow-hidden">
        <img
          src="/assets/projects/HIGH-RISE-1-scaled.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.1]"
          alt="Services"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-6" style={{ paddingTop: 25 }}>
          <SectionHeader label="What We Do" title="Our Services" subtitle="End-to-end construction and execution across residential, commercial, institutional, industrial and infrastructure projects." center />
          <div className="flex items-center gap-3 mt-4 text-mecpl-steel text-[10px] font-semibold tracking-widest uppercase">
            <Link href="/">
              <span className="hover:text-mecpl-red cursor-pointer transition-colors">Home</span>
            </Link>
            <span>/</span>
            <span className="text-mecpl-steel">Services</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-mecpl-red py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 justify-around text-center">
          {[
            { val: "6", label: "Core Service Verticals" },
            { val: "25+", label: "Years Executing" },
            { val: "150+", label: "Projects Delivered" },
            { val: "ISO", label: "9001 · 14001 · 45001" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white font-semibold text-2xl">{s.val}</div>
              <div className="text-white/70 text-[9px] uppercase tracking-widest font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-8">
        <SectionHeader label="Service Verticals" title="Built for India's Most Demanding Projects" center subtitle="Six specialized service pillars, each backed by 25+ years of execution experience and ISO-certified quality standards." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((svc, i) => (
            <div key={i} className="group bg-white border border-mecpl-dark/[0.07] rounded-sm overflow-hidden hover:border-mecpl-red/30 hover:shadow-lg transition-all duration-300 flex flex-col shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <img src={svc.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={svc.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <ServiceLineIcon type={svc.icon} className="h-7 w-7 text-mecpl-red" />
                </div>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col">
                <div>
                  <span className="text-mecpl-red text-[9px] font-semibold tracking-widest uppercase">{svc.subtitle}</span>
                  <h3 className="text-xl font-semibold uppercase tracking-tight text-mecpl-text mt-1">{svc.title}</h3>
                </div>
                <p className="text-mecpl-text text-sm leading-relaxed flex-1">{svc.desc}</p>
                <ul className="space-y-1.5 pt-2 border-t border-mecpl-dark/[0.06]">
                  {svc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[11px] text-mecpl-text font-semibold uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 bg-mecpl-red rounded-full flex-shrink-0"></span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why partner CTA */}
      <section className="bg-[#f9f9f9] border-y border-mecpl-dark/[0.06] py-20" data-animate-exclude="true">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-mecpl-red text-[10px] font-semibold tracking-widest uppercase">Get Started</span>
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tighter uppercase text-mecpl-text">
            Ready to Discuss Your Project?
          </h3>
          <p className="text-mecpl-text text-sm leading-relaxed max-w-xl mx-auto">
            Share your structural blueprints or project brief and our senior engineering team will respond within 24 hours with a tailored assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 bg-mecpl-red hover:bg-mecpl-dark text-white px-10 py-4 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-[#EC3338]/20 cursor-pointer">
                Start Your Project <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/projects">
              <span className="inline-flex items-center gap-2 border border-mecpl-dark/[0.15] hover:border-mecpl-dark text-mecpl-text px-10 py-4 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all cursor-pointer">
                View Portfolio <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
