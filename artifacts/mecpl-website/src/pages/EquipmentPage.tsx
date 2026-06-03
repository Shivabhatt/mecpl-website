import { Link } from "wouter";

const equipment = [
  {
    name: "Automated Concrete Batching Plants",
    desc: "Complete high-output automated concrete batching plants equipped with specialized Star Batcher Management Core Systems. Delivers precise concrete mixes at scale for mega-projects.",
    specs: ["Star Batcher Management System", "High-output automated mixing", "Precise batch control", "Quality consistency assurance"],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Schwing Stetter Concrete Pumps",
    desc: "High-pressure industrial mobile concrete delivery pumps for tall vertical structural pours. Enables efficient concrete placement at significant heights for highrise construction.",
    specs: ["High-pressure delivery system", "Vertical pour capability", "Mobile deployment", "Highrise-ready engineering"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Boomplacer Fleet Systems",
    desc: "High-reach heavy articulate concrete distribution mechanisms providing maximum concrete reach and flexibility on large, complex construction sites.",
    specs: ["High-reach articulation", "360-degree rotation", "Precise placement", "Large-site coverage"],
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mobile Boom Placer Machinery",
    desc: "Rapid deployment vehicular systems for dynamic job-site requirements. Provides flexible concrete distribution across varying site configurations and locations.",
    specs: ["Rapid deployment capability", "Vehicular mobility", "Dynamic site adaptation", "Multi-project deployment"],
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Tower Boom Placer Infrastructure",
    desc: "Pinned structural steel tower systems for vertical concrete placement at extreme heights. Essential for highrise and multi-tower residential and commercial projects.",
    specs: ["Extreme height placement", "Structural steel frame", "Pinned installation", "Highrise specialized"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
  },
];

export default function EquipmentPage() {
  return (
    <div data-animate-page className="bg-white pt-20">
      {/* Header */}
      <div className="relative py-20 border-b border-black/[0.06] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" alt="Heavy machinery" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-3">Infrastructure Assets</span>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-[#111827]">Advanced Machinery Inventory</h3>
          <div className="w-16 h-0.5 bg-[#C41E3A] mt-4"></div>
          <p className="text-[#4b5563] text-base mt-4 max-w-xl leading-relaxed">Our execution velocity stems directly from total strategic ownership over heavy industrial machinery assets, eliminating supply dependency bottlenecks entirely.</p>
        </div>
      </div>

      {/* Equipment grid+image layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-14 border-b border-black/[0.06]">
          <div className="h-96 rounded-sm overflow-hidden border border-black/[0.1] shadow-xl">
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-all duration-500" alt="Heavy machinery" />
          </div>
          <div className="space-y-6">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Self-Owned Fleet</span>
            <h3 className="text-3xl font-black tracking-tight uppercase text-[#111827]">Total Operational Independence</h3>
            <p className="text-[#4b5563] text-sm leading-relaxed">MECPL's self-owned equipment fleet ensures operational independence, consistent quality, and cost efficiency on every project — a key competitive advantage in large-scale tender bidding.</p>
            <ul className="space-y-3">
              {["Automated High-Capacity Tower Cranes & Heavy Material Lifts", "Computerized Central Concrete Batching Plants", "Heavy Earth Excavation Machinery & Transit Mixer Fleets", "Certified Modular Formwork & Heavy Infrastructure Shuttering Systems"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                  <span className="text-[#C41E3A] mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Equipment list */}
      <section className="max-w-7xl mx-auto px-6 py-10" data-testid="section-equipment">
        <div className="space-y-6">
          {equipment.map((item, i) => (
            <div key={i} className="group bg-white border border-black/[0.07] rounded-sm overflow-hidden hover:border-[#C41E3A]/30 transition-all shadow-sm lg:h-[22rem]" data-testid={`card-equipment-${i}`}>
              <div className="grid h-full lg:grid-cols-3">
                <div className="h-52 lg:h-full overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover transition-all duration-700" alt={item.name} loading="lazy" />
                </div>
                <div className="lg:col-span-2 p-8 flex h-full flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[#C41E3A] text-[9px] font-black uppercase tracking-widest">Equipment 0{i + 1}</span>
                      <h3 className="text-[#111827] font-black text-xl uppercase tracking-tight mt-1">{item.name}</h3>
                      <div className="w-8 h-0.5 bg-[#C41E3A] mt-3"></div>
                    </div>
                    <p className="text-[#4b5563] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] mb-2">Key Features</div>
                    <div className="grid grid-cols-2 gap-2">
                      {item.specs.map((spec, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-[#4b5563]">
                          <span className="text-[#C41E3A]">→</span> {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
