import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
const assetBase = import.meta.env.BASE_URL;

const awards = [
  { year: "2023", award: "BAI Well-Built Structure", subtitle: "Special Jury's Recommendation Award", org: "BAI", icon: `${assetBase}assets/awards/WhatsApp-Image-2023-12-27.jpg` },
  { year: "2022", award: "PCERF Constro Silver Trophy", subtitle: "Eon West Project Phase", org: "PCERF", icon: `${assetBase}assets/awards/EON-WEST.jpeg.jpg` },
  { year: "2021", award: "PCERF Constro Gold Trophy", subtitle: "Godrej Nurture Project Phase", org: "PCERF", icon: `${assetBase}assets/awards/GODREJ-NURTURE.jpeg.jpg` },
  { year: "2020", award: "MPL Tournament Runner-Up", subtitle: "Corporate Champions Honors", org: "MPL", icon: `${assetBase}assets/awards/mpl_2020_04.jpg` },
  { year: "2019", award: "MPL Operations & RASS Champions", subtitle: "Champions League Trophy", org: "MPL", icon: `${assetBase}assets/awards/rss_2019_01-scaled.jpg` },
  { year: "2018", award: "PCERF CONSTRO Industry Excellence", subtitle: "Gold Trophy Achievement", org: "PCERF", icon: `${assetBase}assets/awards/mpl_2018_01-scaled.jpg` },
  { year: "2017", award: "India's Small Giants Elite Index", subtitle: "PCERF CONSTRO Safety Commendation", org: "PCERF", icon: `${assetBase}assets/awards/2017-02-large.webp` },
  { year: "2016", award: "National SME Excellence Awards", subtitle: "Corporate Recognition Award", org: "National", icon: `${assetBase}assets/awards/2016-01-large.webp` },
  { year: "2015", award: "ICI Best Structural Execution", subtitle: "Indian Concrete Institute Honor", org: "ICI", icon: `${assetBase}assets/awards/2015-01-large.webp` },
  { year: "2014", award: "ICI Best Structural Execution", subtitle: "Indian Concrete Institute Honor", org: "ICI", icon: `${assetBase}assets/awards/2014-01-large.webp` },
  { year: "2013", award: "ICI Best Structural Execution", subtitle: "Indian Concrete Institute Honor", org: "ICI", icon: `${assetBase}assets/awards/2013-01-large.webp` },
  { year: "2012", award: "CONSTRO Safety Medal", subtitle: "Excellence in Construction Safety", org: "CONSTRO", icon: `${assetBase}assets/awards/2012-01-large.webp` },
  { year: "2007", award: "BAI First Prize — Well-Built Structures", subtitle: "Syntel Campus Phase II", org: "BAI", icon: `${assetBase}assets/awards/2010-01-large.webp` },
  { year: "2002", award: "CONSTRO Safety Medal", subtitle: "Early safety leadership recognition", org: "CONSTRO", icon: `${assetBase}assets/awards/2002-01-large.webp` },
];

export default function AwardsPage() {
  return (
    <div data-animate-page className="bg-mecpl-dark">
      {/* Header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Construction" />
        <div className="absolute inset-0 bg-gradient-to-r from-mecpl-dark via-mecpl-dark/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6" style={{ paddingTop: 25 }}>
          <SectionHeader label="Recognition" title="Awards & Honors" subtitle="Over two decades of consecutive industry recognition for structural excellence, safety leadership, and construction quality." center light />
         
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-[#C41E3A] py-3">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white font-black text-sm uppercase tracking-widest">20+ Years of Consecutive Industry Awards — MECPL's Legacy of Excellence</p>
        </div>
      </div>

      {/* Highlight cards */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-awards-highlights">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {awards.slice(0, 6).map((a, i) => (
            <div key={i} className="bg-mecpl-card border border-white/5 rounded-sm p-5 text-center hover:border-[#C41E3A]/30 transition-all" data-testid={`card-award-highlight-${i}`}>
              <div className="w-16 h-16 mx-auto mb-3 rounded-sm overflow-hidden border border-white/10 bg-black/20">
                <img src={a.icon} alt={a.award} className="w-full h-full object-cover" />
              </div>
              <div className="text-[#C41E3A] font-black text-xl">{a.year}</div>
              <div className="text-white/50 text-[9px] uppercase tracking-widest mt-1 font-bold leading-snug">{a.award.split(" ").slice(0, 3).join(" ")}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-8">Full Timeline</span>
          <div className="relative">
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-white/10"></div>
            <div className="space-y-5">
              {awards.map((award, i) => (
                <div key={i} className="flex gap-8 items-start" data-testid={`award-${award.year}-${i}`}>
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="text-[#C41E3A] font-black text-sm">{award.year}</span>
                  </div>
                  <div className="flex-shrink-0 mt-1.5 relative z-10">
                    <div className="w-4 h-4 bg-[#C41E3A] rounded-sm border-4 border-[#1A1A1A] shadow"></div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-mecpl-card border border-white/5 rounded-sm p-4 hover:border-[#C41E3A]/20 transition-colors group">
                      <div className="flex items-start gap-3">
                        <span className="w-12 h-12 rounded-sm overflow-hidden border border-white/10 flex-shrink-0 bg-black/20">
                          <img src={award.icon} alt={award.award} className="w-full h-full object-cover" />
                        </span>
                        <div>
                          <h3 className="text-white font-bold text-sm group-hover:text-[#C41E3A] transition-colors">{award.award}</h3>
                          <p className="text-gray-500 text-xs mt-1">{award.subtitle}</p>
                          <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-widest text-[#C41E3A] bg-[#C41E3A]/10 px-2 py-0.5 rounded-sm">{award.org}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}