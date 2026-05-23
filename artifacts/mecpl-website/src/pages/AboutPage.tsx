import { Link } from "wouter";
import { ArrowRight, CheckCircle, Award, Target, Eye } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const leaders = [
  { name: "Mr. M B Nambiar", role: "Chairman", desc: "Executive guidance and legacy protection since founding. Visionary leadership steering MECPL's growth over 25+ years." },
  { name: "Mr. Jeevan K", role: "Managing Director", desc: "Operational strategy leadership and cross-industry technology deployment driving MECPL's competitive advantage." },
  { name: "Mr. Manojkumar M R", role: "Director Finance", desc: "Fiscal governance, financial compliance, and credit rating maintenance ensuring MECPL's financial excellence." },
  { name: "Mr. Jitin Nambiar", role: "Executive Director", desc: "Infrastructure delivery monitoring and on-site engineering execution ensuring quality across all active projects." },
];

const milestones = [
  { year: "1998", event: "MECPL founded in Pune, Maharashtra" },
  { year: "2002", event: "First CONSTRO Safety Medal awarded" },
  { year: "2007", event: "Achieved CRISIL SME 1 Rating — highest financial credibility" },
  { year: "2013", event: "ICI Best Structural Execution Award commenced" },
  { year: "2017", event: "Selected into India's Small Giants Elite Index" },
  { year: "2018", event: "PCERF CONSTRO Industry Excellence Gold Trophy" },
  { year: "2021", event: "PCERF Constro Gold Trophy — Godrej Nurture Project" },
  { year: "2023", event: "BAI Well-Built Structure Special Jury's Recommendation" },
];

const certifications = [
  { code: "ISO 9001:2015", label: "Quality Management System", color: "#1B2F6E" },
  { code: "ISO 14001:2015", label: "Environmental Management System", color: "#0d4a8a" },
  { code: "ISO 45001:2018", label: "Occupational Health & Safety", color: "#163268" },
  { code: "CRISIL SME 1", label: "Financial Rating — Since 2007", color: "#F47920" },
];

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Page header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
          <div className="absolute -bottom-10 left-10 w-48 h-48 border border-orange-400 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Who We Are</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">About MECPL</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            25+ years of building trust, delivering excellence, and shaping Pune's skyline.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/">
              <span className="hover:text-[#F47920] cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="py-20 bg-white" data-testid="section-vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#1B2F6E]/20 transition-colors">
              <div className="w-12 h-12 bg-[#1B2F6E] rounded-xl flex items-center justify-center mb-5">
                <Eye size={22} className="text-white" />
              </div>
              <h3 className="text-[#1B2F6E] font-black text-xl mb-4">Our Vision</h3>
              <div className="w-10 h-1 bg-[#F47920] mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                To become the country's most preferred civil engineering contractor by delivering exceptional client satisfaction while ensuring strict regulatory compliance, health-first worker safety parameters, and eco-friendly practices that sustain our environment for future generations.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#1B2F6E]/20 transition-colors">
              <div className="w-12 h-12 bg-[#F47920] rounded-xl flex items-center justify-center mb-5">
                <Target size={22} className="text-white" />
              </div>
              <h3 className="text-[#1B2F6E] font-black text-xl mb-4">Our Mission</h3>
              <div className="w-10 h-1 bg-[#F47920] mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Providing elite structural quality and timely execution through continuous adaptation of modern building technologies and personnel training programs — delivering projects that stand as testaments to engineering excellence and client trust.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-[#1B2F6E] rounded-2xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-white">25<span className="text-[#F47920]">+</span></div>
                <div className="text-white/60 text-sm mt-1 uppercase tracking-wide">Years of Experience</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0">
                <div className="text-4xl font-black text-white">150<span className="text-[#F47920]">+</span></div>
                <div className="text-white/60 text-sm mt-1 uppercase tracking-wide">Completed Projects</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0">
                <div className="text-4xl font-black text-white">100<span className="text-[#F47920]">%</span></div>
                <div className="text-white/60 text-sm mt-1 uppercase tracking-wide">Quality Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50" data-testid="section-leadership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Team"
            title="Executive Leadership"
            subtitle="Experienced leaders driving MECPL's vision, strategy, and operational excellence."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {leaders.map((leader, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-testid={`card-leader-${i}`}>
                <div className="h-32 bg-gradient-to-br from-[#1B2F6E] to-[#0d1a42] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="80" cy="20" r="30" fill="white" />
                      <circle cx="20" cy="80" r="20" fill="white" />
                    </svg>
                  </div>
                  <div className="w-16 h-16 bg-[#F47920] rounded-full flex items-center justify-center text-white font-black text-2xl z-10">
                    {leader.name.split(" ").slice(-1)[0][0]}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[#1B2F6E] font-black text-base leading-snug">{leader.name}</h3>
                  <div className="text-[#F47920] text-xs font-bold uppercase tracking-wide mt-1 mb-3">{leader.role}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{leader.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white" data-testid="section-certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Standards"
            title="Certifications & Compliance"
            subtitle="MECPL operates under the highest international quality, environmental, and safety standards."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {certifications.map((cert) => (
              <div key={cert.code} className="text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-[#F47920]/30 hover:shadow-md transition-all" data-testid={`card-cert-${cert.code}`}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: cert.color }}>
                  <Award size={28} className="text-white" />
                </div>
                <h3 className="text-[#1B2F6E] font-black text-lg mb-2">{cert.code}</h3>
                <p className="text-gray-500 text-sm">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-[#1B2F6E]" data-testid="section-milestones">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Journey"
            title="Our Milestones"
            subtitle="A history of excellence, recognition, and continuous growth."
            light
          />
          <div className="relative mt-10">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/20"></div>
            <div className="space-y-6">
              {milestones.map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative" data-testid={`milestone-${item.year}`}>
                  <div className="w-16 flex-shrink-0 text-center">
                    <div className="w-4 h-4 bg-[#F47920] rounded-full ml-6 mt-1 relative z-10 ring-4 ring-[#1B2F6E]"></div>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <span className="text-[#F47920] font-black text-base">{item.year}</span>
                    <p className="text-white/70 text-sm mt-1">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Core Values" title="What Drives Us" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Structural Quality", desc: "Every structure we deliver meets the highest engineering and material standards, with zero compromise on quality." },
              { title: "Timely Execution", desc: "Our project management systems ensure on-time delivery without compromising structural integrity." },
              { title: "Worker Safety", desc: "ISO 45001 certified occupational health and safety protocols protecting every worker on every site." },
              { title: "Environmental Responsibility", desc: "ISO 14001 certified eco-friendly practices integrated into every phase of construction." },
              { title: "Client Satisfaction", desc: "Building long-term relationships with India's most respected developers through consistent excellence." },
              { title: "Innovation", desc: "Continuous adaptation of modern building technologies and construction methodologies." },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#F47920]/30 hover:shadow-md transition-all" data-testid={`card-value-${i}`}>
                <div className="w-3 h-3 bg-[#F47920] rounded-full mb-4"></div>
                <h3 className="text-[#1B2F6E] font-bold text-base mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F47920]" data-testid="section-about-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Work With MECPL</h2>
          <p className="text-white/80 mb-7">Join 20+ enterprise clients who trust us with their most ambitious projects.</p>
          <Link href="/contact" data-testid="button-about-contact">
            <span className="inline-flex items-center gap-2 bg-white text-[#F47920] px-8 py-4 font-black text-sm uppercase tracking-wide rounded hover:bg-gray-100 transition-colors cursor-pointer">
              Get in Touch <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
