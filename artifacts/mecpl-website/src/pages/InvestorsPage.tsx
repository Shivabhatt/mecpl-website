import { Link } from "wouter";
import { FileText, Shield, Users, BarChart3, ExternalLink } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const policies = [
  "Privacy Policy Charter",
  "CSR Framework Policy",
  "Materiality Thresholds",
  "Nomination & Remuneration Policy",
  "Policy on Board Diversity",
  "Material Event Disclosures",
  "Whistle Blower Protection",
  "Board Code of Conduct",
  "Document Retention Directives",
  "Independent Director Form",
  "Insider Trading Protocols",
  "CSR Committee Allocations",
];

const agmNotices = [
  { title: "Notice of AGM & Shareholder Resolutions", period: "Financial Year 2022-23" },
  { title: "Notice of AGM & Shareholder Resolutions", period: "Financial Year 2021-22" },
];

const annualReturns = [
  { title: "Annual Financial Return Filing", period: "FY 2021-22" },
  { title: "Annual Financial Return Filing", period: "FY 2020-21" },
  { title: "Annual Financial Return Filing", period: "FY 2019-20" },
];

const otherDisclosures = [
  "Official Disclosures — Resignation of Corporate Directors",
  "Nodal IEPF Coordinator Disclosures",
];

export default function InvestorsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Transparency</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Investor Relations</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            Corporate governance, regulatory compliance, and financial transparency documentation for stakeholders.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Investors</span>
          </div>
        </div>
      </div>

      {/* Compliance overview */}
      <section className="py-16 bg-white" data-testid="section-compliance-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Governance"
            title="Corporate Governance Framework"
            subtitle="MECPL maintains rigorous corporate governance standards to ensure complete transparency and regulatory compliance for all stakeholders."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon: Shield, title: "CRISIL SME 1", desc: "Highest financial credibility rating sustained continuously since 2007." },
              { icon: Users, title: "ISO Certified", desc: "ISO 9001, 14001, and 45001 certified operations across all processes." },
              { icon: BarChart3, title: "Financial Compliance", desc: "Regular AGM notices, annual returns, and shareholder resolutions filed." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-11 h-11 bg-[#1B2F6E] rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-[#1B2F6E] font-bold text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy documents */}
      <section className="py-16 bg-gray-50" data-testid="section-policy-docs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Documents" title="Legal Framework & Policies" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {policies.map((policy, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#1B2F6E]/20 hover:shadow-sm transition-all flex items-center gap-4 group cursor-pointer"
                data-testid={`card-policy-${i}`}
              >
                <div className="w-10 h-10 bg-[#1B2F6E]/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#1B2F6E] transition-colors">
                  <FileText size={16} className="text-[#1B2F6E] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[#1B2F6E] text-sm font-semibold block truncate group-hover:text-[#F47920] transition-colors">
                    {policy}
                  </span>
                </div>
                <ExternalLink size={14} className="text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGM & Annual Returns */}
      <section className="py-16 bg-white" data-testid="section-agm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* AGM Notices */}
            <div>
              <SectionHeader label="Meetings" title="AGM Notices" />
              <div className="space-y-3">
                {agmNotices.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#F47920]/30 hover:shadow-sm transition-all group cursor-pointer" data-testid={`card-agm-${i}`}>
                    <div className="w-10 h-10 bg-[#F47920] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#1B2F6E] font-semibold text-sm">{item.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{item.period}</div>
                    </div>
                    <ExternalLink size={14} className="text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Annual Returns */}
            <div>
              <SectionHeader label="Financials" title="Annual Financial Returns" />
              <div className="space-y-3">
                {annualReturns.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#F47920]/30 hover:shadow-sm transition-all group cursor-pointer" data-testid={`card-return-${i}`}>
                    <div className="w-10 h-10 bg-[#1B2F6E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#1B2F6E] font-semibold text-sm">{item.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{item.period}</div>
                    </div>
                    <ExternalLink size={14} className="text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <SectionHeader label="Disclosures" title="Other Disclosures" />
                <div className="space-y-3">
                  {otherDisclosures.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#F47920]/30 transition-all cursor-pointer" data-testid={`card-disclosure-${i}`}>
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText size={16} className="text-gray-500" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
