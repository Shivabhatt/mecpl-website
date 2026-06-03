import { Link } from "wouter";
import { ArrowRight, Building2, HardHat, Factory, Home, Layers, ClipboardList } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const services = [
  {
    icon: Building2,
    title: "Civil Construction",
    subtitle: "Structural Excellence at Every Scale",
    desc: "From foundations to finishes, MECPL delivers comprehensive civil construction services — RCC framing, slabs, columns, shear walls, and more — with ISO-certified quality benchmarks and zero-compromise safety protocols.",
    highlights: ["RCC Structural Works", "Foundation Engineering", "Shear Wall Construction", "Post-Tensioning Works"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: ClipboardList,
    title: "Turnkey Projects",
    subtitle: "End-to-End Delivery, Zero Gaps",
    desc: "MECPL takes full ownership from design coordination through structural handover. Our turnkey model eliminates fragmentation — one partner, one accountability chain, complete execution.",
    highlights: ["Design Coordination", "Material Procurement", "Complete Site Execution", "Quality Commissioning"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Factory,
    title: "Industrial Projects",
    subtitle: "Heavy Infrastructure, Precision Engineered",
    desc: "Industrial facilities demand tolerance levels that most contractors cannot sustain. MECPL's industrial division specializes in warehouses, logistics hubs, manufacturing plants, and large-format industrial complexes.",
    highlights: ["Manufacturing Facilities", "Warehouse Structures", "Logistics Hubs", "Industrial Sheds"],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Home,
    title: "Residential Projects",
    subtitle: "Premium Housing, Delivered on Time",
    desc: "From mid-rise to ultra-high-rise residential towers, MECPL has built some of Pune's most recognized addresses — Trump Towers, Godrej Boulevard, VTP Bel Air — with meticulous detailing and systematic milestone delivery.",
    highlights: ["High-Rise Towers", "Gated Communities", "Luxury Residences", "Mixed-Use Complexes"],
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Layers,
    title: "Interior Fitouts",
    subtitle: "Premium Interiors with Engineering Precision",
    desc: "MECPL extends its quality ethos into premium interior fitouts — commercial office spaces, hospitality fit-outs, and institutional interiors — blending structural reliability with aesthetic refinement.",
    highlights: ["Commercial Offices", "Hospitality Interiors", "Institutional Spaces", "Retail Environments"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: HardHat,
    title: "Project Management",
    subtitle: "Strategic Oversight, Measurable Outcomes",
    desc: "For clients who demand professional site governance, MECPL provides expert project management — scheduling, cost control, safety auditing, and milestone management — as a standalone service.",
    highlights: ["Scheduling & Planning", "Cost Management", "Safety Auditing", "Quality Assurance"],
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  return (
    <div data-animate-page className="bg-white">
      {/* Header */}
      <div className="relative py-24 border-b border-black/[0.06] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.1]"
          alt="Services"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-6" style={{ paddingTop: 25 }}>
          <SectionHeader label="What We Do" title="Our Services" subtitle="From civil structural works to full turnkey delivery — six core service pillars that cover the entire construction lifecycle for India's most demanding projects." center />
          <div className="flex items-center gap-3 mt-4 text-[#9ca3af] text-[10px] font-bold tracking-widest uppercase">
            <Link href="/">
              <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#6b7280]">Services</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#C41E3A] py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 justify-around text-center">
          {[
            { val: "6", label: "Core Service Verticals" },
            { val: "25+", label: "Years Executing" },
            { val: "150+", label: "Projects Delivered" },
            { val: "ISO", label: "9001 · 14001 · 45001" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white font-black text-2xl">{s.val}</div>
              <div className="text-white/70 text-[9px] uppercase tracking-widest font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-8">
        <SectionHeader label="Service Verticals" title="Built for India's Most Demanding Projects" center subtitle="Six specialized service pillars, each backed by 25+ years of execution experience and ISO-certified quality standards." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((svc, i) => (
            <div key={i} className="group bg-white border border-black/[0.07] rounded-sm overflow-hidden hover:border-[#C41E3A]/30 hover:shadow-lg transition-all duration-300 flex flex-col shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <img src={svc.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={svc.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <svc.icon size={20} className="text-[#C41E3A]" />
                </div>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col">
                <div>
                  <span className="text-[#C41E3A] text-[9px] font-black tracking-widest uppercase">{svc.subtitle}</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#111827] mt-1">{svc.title}</h3>
                </div>
                <p className="text-[#4b5563] text-sm leading-relaxed flex-1">{svc.desc}</p>
                <ul className="space-y-1.5 pt-2 border-t border-black/[0.06]">
                  {svc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[11px] text-[#4b5563] font-bold uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full flex-shrink-0"></span>
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
      <section className="bg-[#f9f9f9] border-y border-black/[0.06] py-20" data-animate-exclude="true">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Get Started</span>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#111827]">
            Ready to Discuss Your Project?
          </h3>
          <p className="text-[#4b5563] text-sm leading-relaxed max-w-xl mx-auto">
            Share your structural blueprints or project brief and our senior engineering team will respond within 24 hours with a tailored assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-10 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-[#C41E3A]/20 cursor-pointer">
                Start Your Project <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/completed-projects">
              <span className="inline-flex items-center gap-2 border border-black/[0.15] hover:border-[#111827] text-[#111827] px-10 py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all cursor-pointer">
                View Portfolio <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
