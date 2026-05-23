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
    <div className="bg-[#1A1A1A] pt-20">
      {/* Header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-15" alt="Heavy machinery" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-3">Infrastructure Assets</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">Advanced Machinery Inventory</h1>
          <div className="w-16 h-0.5 bg-[#C41E3A] mt-4"></div>
          <p className="text-gray-400 text-base mt-4 max-w-xl leading-relaxed">Our execution velocity stems directly from total strategic ownership over heavy industrial machinery assets, eliminating supply dependency bottlenecks entirely.</p>
          <div className="flex items-center gap-2 mt-5 text-white/30 text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white/60">Equipment</span>
          </div>
        </div>
      </div>

      {/* Equipment grid+image layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-14 border-b border-white/5">
          <div className="h-96 rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-all duration-500" alt="Heavy machinery" />
          </div>
          <div className="space-y-6">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Self-Owned Fleet</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white">Total Operational Independence</h2>
            <p className="text-gray-400 text-sm leading-relaxed">MECPL's self-owned equipment fleet ensures operational independence, consistent quality, and cost efficiency on every project — a key competitive advantage in large-scale tender bidding.</p>
            <ul className="space-y-3">
              {["Automated High-Capacity Tower Cranes & Heavy Material Lifts", "Computerized Central Concrete Batching Plants", "Heavy Earth Excavation Machinery & Transit Mixer Fleets", "Certified Modular Formwork & Heavy Infrastructure Shuttering Systems"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
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
            <div key={i} className="group bg-[#2C2C2C] border border-white/5 rounded-sm overflow-hidden hover:border-[#C41E3A]/30 transition-all shadow-xl" data-testid={`card-equipment-${i}`}>
              <div className="grid lg:grid-cols-3">
                <div className="h-52 lg:h-auto overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover transition-all duration-700" alt={item.name} loading="lazy" />
                </div>
                <div className="lg:col-span-2 p-8 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[#C41E3A] text-[9px] font-black uppercase tracking-widest">Equipment 0{i + 1}</span>
                      <h3 className="text-white font-black text-xl uppercase tracking-tight mt-1">{item.name}</h3>
                      <div className="w-8 h-0.5 bg-[#C41E3A] mt-3"></div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Key Features</div>
                    <div className="grid grid-cols-2 gap-2">
                      {item.specs.map((spec, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-gray-400">
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
