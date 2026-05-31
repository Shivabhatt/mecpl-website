import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import EquipmentPage from "@/pages/EquipmentPage";
import InvestorsPage from "@/pages/InvestorsPage";
const assetBase = import.meta.env.BASE_URL;

const clientLogos = [
  { name: "Panchshil Realty", src: `${assetBase}assets/clients/client-09-1.webp` },
  { name: "Flame University", src: `${assetBase}assets/clients/client-05.webp` },
  { name: "Godrej Properties", src: `${assetBase}assets/clients/client-12-1.webp` },
  { name: "Hublikar Constructions", src: `${assetBase}assets/clients/omniactive.webp` },
  { name: "K Raheja Corp", src: `${assetBase}assets/clients/client-17.webp` },
  { name: "Kalpataru", src: `${assetBase}assets/clients/client-14.webp` },
  { name: "Lotus", src: `${assetBase}assets/clients/client-13.webp` },
  { name: "VTP Realty", src: `${assetBase}assets/clients/vtp-realty.webp` },
  { name: "Tata Consultancy Services", src: `${assetBase}assets/clients/client-06.webp` },
  { name: "Pride Purple Group", src: `${assetBase}assets/clients/client-15-1.webp` },
];

const loopingClientLogos = [...clientLogos, ...clientLogos];

const services = [
  {
    title: "Civil Construction",
    subtitle: "Structural Excellence at Every Scale",
    desc: "From foundations to finishes, MECPL delivers comprehensive civil construction services — RCC framing, slabs, columns, shear walls, and more — with ISO-certified quality benchmarks and zero-compromise safety protocols.",
    highlights: ["RCC Structural Works", "Foundation Engineering", "Shear Wall Construction", "Post-Tensioning Works"],
  },
  {
    title: "Turnkey Projects",
    subtitle: "End-to-End Delivery, Zero Gaps",
    desc: "MECPL takes full ownership from design coordination through structural handover. Our turnkey model eliminates fragmentation — one partner, one accountability chain, complete execution.",
    highlights: ["Design Coordination", "Material Procurement", "Complete Site Execution", "Quality Commissioning"],
  },
  {
    title: "Industrial Projects",
    subtitle: "Heavy Infrastructure, Precision Engineered",
    desc: "Industrial facilities demand tolerance levels that most contractors cannot sustain. MECPL's industrial division specializes in warehouses, logistics hubs, manufacturing plants, and large-format industrial complexes.",
    highlights: ["Manufacturing Facilities", "Warehouse Structures", "Logistics Hubs", "Industrial Sheds"],
  },
  {
    title: "Residential Projects",
    subtitle: "Premium Housing, Delivered on Time",
    desc: "From mid-rise to ultra-high-rise residential towers, MECPL has built some of Pune's most recognized addresses — Trump Towers, Godrej Boulevard, VTP Bel Air — with meticulous detailing and systematic milestone delivery.",
    highlights: ["High-Rise Towers", "Gated Communities", "Luxury Residences", "Mixed-Use Complexes"],
  },
  {
    title: "Interior Fitouts",
    subtitle: "Premium Interiors with Engineering Precision",
    desc: "MECPL extends its quality ethos into premium interior fitouts — commercial office spaces, hospitality fit-outs, and institutional interiors — blending structural reliability with aesthetic refinement.",
    highlights: ["Commercial Offices", "Hospitality Interiors", "Institutional Spaces", "Retail Environments"],
  },
  {
    title: "Project Management",
    subtitle: "Strategic Oversight, Measurable Outcomes",
    desc: "For clients who demand professional site governance, MECPL provides expert project management — scheduling, cost control, safety auditing, and milestone management — as a standalone service.",
    highlights: ["Scheduling & Planning", "Cost Management", "Safety Auditing", "Quality Assurance"],
  },
];

const leaders = [
  { name: "Mr. M B Nambiar", role: "Chairman", desc: "Visionary leadership steering MECPL's growth and legacy protection over 25+ years of landmark engineering.", image: `${assetBase}assets/leaders/leader-01.jpg` },
  { name: "Mr. Jeevan K", role: "Managing Director", desc: "Operational strategy and cross-industry technology deployment driving MECPL's competitive advantage.", image: `${assetBase}assets/leaders/leader-03.jpg` },
  { name: "Mr. Manojkumar M R", role: "Director Finance", desc: "Fiscal governance, financial compliance, and credit rating maintenance ensuring MECPL's financial integrity.", image: `${assetBase}assets/leaders/leader-02.jpg` },
  { name: "Mr. Jitin Nambiar", role: "Executive Director", desc: "Infrastructure delivery monitoring and on-site engineering execution across all active projects.", image: `${assetBase}assets/leaders/jitin.png` },
];

const milestones = [
  { year: "1998", event: "MECPL founded in Pune, Maharashtra, India" },
  { year: "2002", event: "First CONSTRO Safety Medal — early industry recognition" },
  { year: "2007", event: "Achieved CRISIL SME 1 Rating — highest financial credibility" },
  { year: "2013", event: "ICI Best Structural Execution Award program commenced" },
  { year: "2017", event: "Selected into India's Small Giants Elite Index" },
  { year: "2018", event: "PCERF CONSTRO Industry Excellence Gold Trophy" },
  { year: "2021", event: "PCERF Constro Gold Trophy — Godrej Nurture Project" },
  { year: "2023", event: "BAI Well-Built Structure Special Jury's Recommendation" },
];

export default function AboutPage() {
  return (
    <div data-animate-page className="bg-mecpl-dark">
      {/* Page header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          alt="Construction"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mecpl-dark via-mecpl-dark/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6" style={{ paddingTop: 25 }}>
          <SectionHeader label="Who We Are" title="About MECPL" subtitle="25+ years of building trust, delivering excellence, and shaping Pune's skyline." />
        
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-20 z-30 bg-mecpl-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.28em] whitespace-nowrap text-white/50">
            <a href="#abt1" className="hover:text-[#C41E3A] hover:font-black transition-colors">Vision &amp; Mission</a>
            <a href="#abt2" className="hover:text-[#C41E3A] hover:font-black transition-colors">Services</a>
            <a href="#abt3" className="hover:text-[#C41E3A] hover:font-black transition-colors">Leadership</a>
            <a href="#abt4" className="hover:text-[#C41E3A] hover:font-black transition-colors">Milestones</a>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <section id="abt1" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5 scroll-mt-28" data-testid="section-vision-mission">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Vision</span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">Becoming India's Most Preferred Contractor</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To become the country's most preferred civil engineering contractor by delivering exceptional client satisfaction while ensuring strict regulatory compliance, health-first worker safety, and eco-friendly practices that sustain our environment for future generations.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Mission</span>
              <p className="text-gray-400 text-sm leading-relaxed">
                Providing elite structural quality and timely execution through continuous adaptation of modern building technologies and personnel training programs — delivering projects that stand as testaments to engineering excellence and client trust.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ val: "25+", label: "Years" }, { val: "150+", label: "Projects" }, { val: "100%", label: "Quality" }].map(s => (
                <div key={s.label} className="p-4 bg-mecpl-card border border-white/5 text-center rounded-sm">
                  <div className="text-2xl font-black text-[#C41E3A]">{s.val}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-96 rounded-sm overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover transition-all duration-500"
              alt="MECPL structural integrity"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="abt2" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5 scroll-mt-28" data-testid="section-about-services">
        <SectionHeader label="Services" title="What MECPL Delivers" center useH1={false} />
        <p className="max-w-3xl mx-auto text-center text-gray-400 text-sm leading-relaxed mt-4">
          Our service portfolio covers the full construction lifecycle, from civil execution to project management, with the same precision and accountability across every delivery.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {services.map((service) => (
            <div key={service.title} className="group bg-mecpl-card border border-white/5 rounded-[24px] p-6 hover:border-[#C41E3A]/30 transition-all duration-300" data-testid={`card-about-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#C41E3A]" />
                </div>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-[#C41E3A]/40 transition-colors" />
              </div>
              <div>
                <span className="text-[#C41E3A] text-[9px] font-black tracking-widest uppercase">{service.subtitle}</span>
                <h3 className="text-white font-black text-base uppercase tracking-tight mt-1">{service.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mt-3">{service.desc}</p>
              <ul className="space-y-1.5 pt-4 mt-4 border-t border-white/5">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section id="abt3" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5 scroll-mt-28" data-testid="section-leadership">
        <SectionHeader label="Our Team" title="Executive Leadership" center useH1={false} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {leaders.map((leader, i) => (
            <div key={i} className="bg-mecpl-card border border-white/5 rounded-sm overflow-hidden hover:border-[#C41E3A]/30 transition-all" data-testid={`card-leader-${i}`}>
              <div className="h-40 flex items-center justify-center relative overflow-hidden bg-black/5">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-white font-black text-sm uppercase tracking-tight leading-snug">{leader.name}</h3>
                <div className="text-[#C41E3A] text-[9px] font-black uppercase tracking-widest">{leader.role}</div>
                <div className="w-6 h-0.5 bg-[#C41E3A]"></div>
                <p className="text-gray-500 text-xs leading-relaxed">{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-mecpl-card/40 border-y border-white/5 py-20 scroll-mt-28" data-testid="section-certifications">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Standards" title="Certifications & Compliance" center useH1={false} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { code: "ISO 9001:2015", label: "Quality Management System", icon: "✦" },
              { code: "ISO 14001:2015", label: "Environmental Management System", icon: "✦" },
              { code: "ISO 45001:2018", label: "Occupational Health & Safety", icon: "✦" },
              { code: "CRISIL SME 1", label: "Financial Rating — Since 2007", icon: "✦" },
            ].map((cert) => (
              <div key={cert.code} className="text-center p-8 bg-mecpl-dark border border-white/5 rounded-sm hover:border-[#C41E3A]/30 transition-all" data-testid={`card-cert-${cert.code}`}>
                <div className="text-[#C41E3A] text-3xl mb-4">{cert.icon}</div>
                <h3 className="text-white font-black text-base uppercase mb-2">{cert.code}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="abt4" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-28" data-testid="section-milestones">
        <SectionHeader label="Journey" title="Our Milestone Timeline" useH1={false} />
          <div className="relative mt-10">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-white/10"></div>
          <div className="space-y-5">
            {milestones.slice().reverse().map((item) => (
              <div key={item.year} className="flex gap-8 items-start" data-testid={`milestone-${item.year}`}>
                <div className="w-12 flex-shrink-0 text-right">
                  <span className="text-[#C41E3A] font-black text-sm">{item.year}</span>
                </div>
                <div className="flex-shrink-0 mt-1.5 relative z-10">
                  <div className="w-4 h-4 bg-[#C41E3A] rounded-sm border-4 border-[#1A1A1A] shadow"></div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="bg-mecpl-card border border-white/5 rounded-sm p-4 hover:border-[#C41E3A]/20 transition-colors">
                    <p className="text-gray-300 text-sm">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EquipmentPage />
      <InvestorsPage />

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-black/10 bg-white py-8 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,30,58,0.08),transparent_38%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.04),transparent_44%)]" />
        <div className="relative max-w-7xl mx-auto px-6 mb-5 text-center">
          <h3 className="text-3xl font-black tracking-tight uppercase text-black">
            Trusted by leading brands
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-black/65">
            A continuous showcase of the developers, institutions, and enterprises that trust MECPL across landmark projects.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 md:w-28 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 md:w-28 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="animate-ticker gap-4 md:gap-6 px-6 py-2 select-none">
            {loopingClientLogos.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-[188px] md:w-[236px] h-[112px] md:h-[128px] rounded-[1.5rem] bg-[#fbfbfb] shadow-[0_16px_34px_rgba(0,0,0,0.08)] border border-black/5 flex items-center justify-center px-5"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-12 md:max-h-14 w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#C41E3A] py-16" data-testid="section-about-cta">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">Work With MECPL</h3>
            <p className="text-white/70 text-sm mt-1">Join 50+ enterprise clients who trust us with their most ambitious projects.</p>
          </div>
          <Link href="/contact" data-testid="button-about-contact">
            <span className="inline-flex items-center gap-2 bg-white text-[#C41E3A] px-8 py-4 font-black text-xs tracking-widest uppercase rounded-sm hover:bg-gray-200 transition-colors cursor-pointer">
              Get in Touch <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}