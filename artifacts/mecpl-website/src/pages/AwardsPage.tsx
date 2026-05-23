import { Link } from "wouter";
import { Award } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const awards = [
  { year: "2023", award: "BAI Well-Built Structure", subtitle: "Special Jury's Recommendation Award", org: "BAI" },
  { year: "2022", award: "PCERF Constro Silver Trophy", subtitle: "Eon West Project Phase", org: "PCERF" },
  { year: "2021", award: "PCERF Constro Gold Trophy", subtitle: "Godrej Nurture Project Phase", org: "PCERF" },
  { year: "2020", award: "MPL Tournament Winner", subtitle: "Corporate Runner-Up Honors", org: "MPL" },
  { year: "2019", award: "MPL Operations & RASS Champions", subtitle: "Champions League Trophy", org: "MPL" },
  { year: "2018", award: "PCERF CONSTRO Industry Excellence", subtitle: "Gold Trophy Achievement", org: "PCERF" },
  { year: "2017", award: "India's Small Giants Elite Index", subtitle: "PCERF CONSTRO Safety Commendation", org: "PCERF" },
  { year: "2016", award: "National SME Excellence Awards", subtitle: "Corporate Recognition Award", org: "National" },
  { year: "2015", award: "ICI Best Structural Execution", subtitle: "Indian Concrete Institute Honor", org: "ICI" },
  { year: "2014", award: "ICI Best Structural Execution", subtitle: "Indian Concrete Institute Honor", org: "ICI" },
  { year: "2013", award: "ICI Best Structural Execution", subtitle: "Indian Concrete Institute Honor", org: "ICI" },
  { year: "2012", award: "CONSTRO Safety Medal", subtitle: "Excellence in Construction Safety", org: "CONSTRO" },
  { year: "2007", award: "BAI First Prize — Well-Built Structures", subtitle: "Syntel Campus Phase II", org: "BAI" },
  { year: "2002", award: "CONSTRO Safety Medal", subtitle: "Early safety leadership recognition", org: "CONSTRO" },
];

export default function AwardsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Recognition</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Awards & Honors</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            Over two decades of industry recognition for structural excellence, safety leadership, and construction quality.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Awards</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[#F47920] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-bold text-lg">
            20+ Years of Consecutive Industry Awards — MECPL's Legacy of Excellence
          </p>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-16 bg-gray-50" data-testid="section-awards-timeline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Timeline"
            title="Chronological Awards Archive"
            subtitle="A full history of MECPL's industry recognitions from 2002 to 2023."
          />
          <div className="relative mt-10">
            {/* Vertical line */}
            <div className="absolute left-16 sm:left-24 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-5">
              {awards.map((award, i) => (
                <div key={i} className="flex gap-6 sm:gap-10 items-start" data-testid={`award-${award.year}-${i}`}>
                  {/* Year */}
                  <div className="w-14 sm:w-20 flex-shrink-0 text-right">
                    <span className="text-[#F47920] font-black text-sm sm:text-base">{award.year}</span>
                  </div>

                  {/* Dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-5 h-5 bg-[#F47920] rounded-full border-4 border-gray-50 shadow"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-5 border border-gray-100 hover:border-[#F47920]/30 hover:shadow-md transition-all group mb-1">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#1B2F6E] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award size={14} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-[#1B2F6E] font-bold text-sm group-hover:text-[#F47920] transition-colors">
                          {award.award}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">{award.subtitle}</p>
                        <span className="inline-block mt-2 bg-gray-100 text-gray-500 text-xs px-2.5 py-0.5 rounded-full font-medium">
                          {award.org}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards grid highlight */}
      <section className="py-16 bg-[#1B2F6E]" data-testid="section-awards-highlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Highlights" title="Key Award Organizations" light />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { org: "BAI", name: "Builders Association of India", awards: "Well-Built Structure Awards" },
              { org: "PCERF", name: "Pune Contractors & Engineers Regional Forum", awards: "CONSTRO Trophy Series" },
              { org: "ICI", name: "Indian Concrete Institute", awards: "Best Structural Execution" },
              { org: "National", name: "National SME Excellence", awards: "Corporate Recognition" },
            ].map((org) => (
              <div key={org.org} className="bg-white/5 rounded-xl p-5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                <div className="text-[#F47920] font-black text-2xl mb-2">{org.org}</div>
                <div className="text-white font-bold text-xs mb-2">{org.name}</div>
                <div className="text-white/50 text-xs">{org.awards}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
