import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const leaders = [
  { name: "Mr. M B Nambiar", role: "Chairman", desc: "Visionary leadership steering MECPL's growth and legacy protection over 25+ years of landmark engineering." },
  { name: "Mr. Jeevan K", role: "Managing Director", desc: "Operational strategy and cross-industry technology deployment driving MECPL's competitive advantage." },
  { name: "Mr. Manojkumar M R", role: "Director Finance", desc: "Fiscal governance, financial compliance, and credit rating maintenance ensuring MECPL's financial integrity." },
  { name: "Mr. Jitin Nambiar", role: "Executive Director", desc: "Infrastructure delivery monitoring and on-site engineering execution across all active projects." },
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
    <div className="bg-[#1A1A1A] pt-20">
      {/* Page header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale"
          alt="Construction"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-3">Who We Are</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">About MECPL</h1>
          <div className="w-16 h-0.5 bg-[#C41E3A] mt-4"></div>
          <p className="text-gray-400 text-base mt-4 max-w-xl leading-relaxed">
            25+ years of building trust, delivering excellence, and shaping Pune's skyline.
          </p>
          <div className="flex items-center gap-2 mt-5 text-white/30 text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white/60">About</span>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5" data-testid="section-vision-mission">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Vision</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Becoming India's Most Preferred Contractor</h2>
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
                <div key={s.label} className="p-4 bg-[#2C2C2C] border border-white/5 text-center rounded-sm">
                  <div className="text-2xl font-black text-[#C41E3A]">{s.val}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-96 rounded-sm overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              alt="MECPL structural integrity"
            />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5" data-testid="section-leadership">
        <SectionHeader label="Our Team" title="Executive Leadership" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {leaders.map((leader, i) => (
            <div key={i} className="bg-[#2C2C2C] border border-white/5 rounded-sm overflow-hidden hover:border-[#C41E3A]/30 transition-all" data-testid={`card-leader-${i}`}>
              <div className="h-28 bg-gradient-to-br from-[#C41E3A]/20 to-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 bg-[#C41E3A] rounded-sm flex items-center justify-center text-white font-black text-2xl z-10">
                  {leader.name.split(" ").pop()![0]}
                </div>
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
      <section className="bg-[#2C2C2C]/40 border-y border-white/5 py-20" data-testid="section-certifications">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Standards" title="Certifications & Compliance" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { code: "ISO 9001:2015", label: "Quality Management System", icon: "✦" },
              { code: "ISO 14001:2015", label: "Environmental Management System", icon: "✦" },
              { code: "ISO 45001:2018", label: "Occupational Health & Safety", icon: "✦" },
              { code: "CRISIL SME 1", label: "Financial Rating — Since 2007", icon: "✦" },
            ].map((cert) => (
              <div key={cert.code} className="text-center p-8 bg-[#1A1A1A] border border-white/5 rounded-sm hover:border-[#C41E3A]/30 transition-all" data-testid={`card-cert-${cert.code}`}>
                <div className="text-[#C41E3A] text-3xl mb-4">{cert.icon}</div>
                <h3 className="text-white font-black text-base uppercase mb-2">{cert.code}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="max-w-5xl mx-auto px-6 py-20" data-testid="section-milestones">
        <SectionHeader label="Journey" title="Our Milestone Timeline" />
        <div className="relative mt-10">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-white/10"></div>
          <div className="space-y-5">
            {milestones.map((item, i) => (
              <div key={i} className="flex gap-8 items-start" data-testid={`milestone-${item.year}`}>
                <div className="w-12 flex-shrink-0 text-right">
                  <span className="text-[#C41E3A] font-black text-sm">{item.year}</span>
                </div>
                <div className="flex-shrink-0 mt-1.5 relative z-10">
                  <div className="w-4 h-4 bg-[#C41E3A] rounded-sm border-4 border-[#1A1A1A] shadow"></div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="bg-[#2C2C2C] border border-white/5 rounded-sm p-4 hover:border-[#C41E3A]/20 transition-colors">
                    <p className="text-gray-300 text-sm">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C41E3A] py-16" data-testid="section-about-cta">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Work With MECPL</h2>
            <p className="text-white/70 text-sm mt-1">Join 50+ enterprise clients who trust us with their most ambitious projects.</p>
          </div>
          <Link href="/contact" data-testid="button-about-contact">
            <span className="inline-flex items-center gap-2 bg-white text-[#C41E3A] px-8 py-4 font-black text-xs tracking-widest uppercase rounded-sm hover:bg-gray-100 transition-colors cursor-pointer">
              Get in Touch <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
