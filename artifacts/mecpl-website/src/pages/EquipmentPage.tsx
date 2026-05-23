import { Link } from "wouter";
import { Settings, Zap, Shield, TrendingUp } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const equipment = [
  {
    name: "Automated Concrete Batching Plants",
    icon: Settings,
    desc: "Complete high-output automated concrete batching plants equipped with specialized Star Batcher Management Core Systems. Delivers precise concrete mixes at scale for mega-projects.",
    specs: ["Star Batcher Management System", "High-output automated mixing", "Precise batch control", "Quality consistency"],
  },
  {
    name: "Schwing Stetter Concrete Pumps",
    icon: Zap,
    desc: "High-pressure industrial mobile concrete delivery pumps for tall vertical structural pours. Enables efficient concrete placement at significant heights for highrise construction.",
    specs: ["High-pressure delivery system", "Vertical pour capability", "Mobile deployment", "Highrise-ready"],
  },
  {
    name: "Boomplacer Fleets",
    icon: TrendingUp,
    desc: "High-reach heavy articulate concrete distribution mechanisms. Provides maximum concrete reach and flexibility on large, complex construction sites.",
    specs: ["High-reach articulation", "360-degree rotation", "Precise placement", "Large-site coverage"],
  },
  {
    name: "Mobile Boom Placer Machinery",
    icon: Settings,
    desc: "Rapid deployment vehicular systems for dynamic job-site requirements. Provides flexible concrete distribution across varying site configurations and locations.",
    specs: ["Rapid deployment capability", "Vehicular mobility", "Dynamic site adaptation", "Multi-project deployment"],
  },
  {
    name: "Tower Boom Placer Infrastructure",
    icon: TrendingUp,
    desc: "Pinned structural steel tower systems for vertical concrete placement at extreme heights. Essential for highrise and multi-tower residential and commercial projects.",
    specs: ["Extreme height placement", "Structural steel frame", "Pinned installation", "Highrise specialized"],
  },
];

export default function EquipmentPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Infrastructure</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Equipment & Machinery</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            State-of-the-art heavy machinery demonstrating MECPL's self-reliance and operational capacity for large-scale tenders.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Equipment</span>
          </div>
        </div>
      </div>

      {/* Capability strip */}
      <div className="bg-[#F47920] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, label: "Self-Reliant Operations" },
              { icon: Zap, label: "High-Output Capacity" },
              { icon: TrendingUp, label: "Highrise-Ready" },
              { icon: Settings, label: "Modern Technology" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white">
                <Icon size={16} />
                <span className="text-sm font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment list */}
      <section className="py-16 bg-gray-50" data-testid="section-equipment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Fleet"
            title="Heavy Industrial Machinery"
            subtitle="MECPL's self-owned equipment fleet ensures operational independence, consistent quality, and cost efficiency on every project."
          />
          <div className="space-y-6">
            {equipment.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#1B2F6E]/20 hover:shadow-lg transition-all"
                  data-testid={`card-equipment-${i}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#1B2F6E] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon size={22} className="text-white" />
                        </div>
                        <div>
                          <span className="text-[#F47920] text-xs font-bold uppercase tracking-widest block mb-1">Equipment 0{i + 1}</span>
                          <h3 className="text-[#1B2F6E] font-black text-xl">{item.name}</h3>
                        </div>
                      </div>
                      <div className="w-10 h-1 bg-[#F47920] mb-4 ml-16"></div>
                      <p className="text-gray-600 text-sm leading-relaxed ml-16">{item.desc}</p>
                    </div>
                    <div>
                      <h4 className="text-[#1B2F6E] font-bold text-xs uppercase tracking-widest mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {item.specs.map((spec, j) => (
                          <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 bg-[#F47920] rounded-full flex-shrink-0"></span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why self-owned */}
      <section className="py-16 bg-[#1B2F6E]" data-testid="section-equipment-why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Advantage" title="Why Our Own Equipment?" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {[
              { title: "Zero Dependency", desc: "No reliance on external machinery suppliers — full control over timelines." },
              { title: "Cost Efficiency", desc: "Self-owned equipment reduces project costs passed on to clients." },
              { title: "Tender Strength", desc: "Demonstrates operational capacity for large-scale enterprise tenders." },
              { title: "Quality Control", desc: "Maintained in-house to highest standards ensuring consistent performance." },
            ].map((point, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-[#F47920] font-black text-2xl mb-2">0{i + 1}</div>
                <h3 className="text-white font-bold text-sm mb-2">{point.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
