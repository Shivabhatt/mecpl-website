import { Link } from "wouter";
import { FileText, ExternalLink } from "lucide-react";

const policies = [
  "Privacy Policy Charter", "CSR Framework Policy", "Materiality Thresholds",
  "Nomination & Remuneration Policy", "Policy on Board Diversity", "Material Event Disclosures",
  "Whistle Blower Protection", "Board Code of Conduct", "Document Retention Directives",
  "Independent Director Form", "Insider Trading Protocols", "CSR Committee Allocations",
];

const agmNotices = [
  { title: "Notice of AGM & Shareholder Resolutions", period: "FY 2022-23" },
  { title: "Notice of AGM & Shareholder Resolutions", period: "FY 2021-22" },
];

const annualReturns = [
  { title: "Annual Financial Return Filing", period: "FY 2021-22" },
  { title: "Annual Financial Return Filing", period: "FY 2020-21" },
  { title: "Annual Financial Return Filing", period: "FY 2019-20" },
];

export default function InvestorsPage() {
  return (
    <div data-animate-page className="bg-white">
      {/* Header */}
      <div className="relative border-b border-black/[0.06] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" alt="Compliance" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/30"></div>
      </div>

      {/* Compliance overview */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-compliance">
        <div className="grid md:grid-cols-3 gap-12 items-center border-b border-black/[0.06] pb-14">
          <div className="md:col-span-2 space-y-6">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Compliance</span>
            <h3 className="text-3xl font-black tracking-tight uppercase text-[#111827]">Investor Transparency & Legal Compliance</h3>
            <p className="text-[#4b5563] text-sm leading-relaxed">MECPL maintains rigorous corporate governance standards ensuring complete transparency and regulatory compliance for all stakeholders. CRISIL SME 1 rated since 2007 — India's highest financial credibility for SMEs.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="flex items-center justify-between p-4 bg-white hover:bg-[#f9f9f9] border border-black/[0.1] rounded-sm text-[10px] font-bold tracking-wider uppercase transition-all" data-testid="link-crisil">
                <span className="text-[#374151]">CRISIL Credit Valuation Analysis</span>
                <FileText size={16} className="text-[#C41E3A]" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 bg-white hover:bg-[#f9f9f9] border border-black/[0.1] rounded-sm text-[10px] font-bold tracking-wider uppercase transition-all" data-testid="link-audit">
                <span className="text-[#374151]">Annual Account Audits FY 24-25</span>
                <FileText size={16} className="text-[#C41E3A]" />
              </a>
            </div>
          </div>
          <div className="h-56 rounded-sm overflow-hidden border border-black/[0.07]">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover opacity-70" alt="Compliance" />
          </div>
        </div>

        {/* Policy documents */}
        <div className="py-14 border-b border-black/[0.06]" data-testid="section-policy-docs">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-6">Legal Framework</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {policies.map((policy, i) => (
              <div key={i} className="group flex items-center gap-4 p-4 bg-white border border-black/[0.07] rounded-sm hover:border-[#C41E3A]/30 transition-all cursor-pointer" data-testid={`card-policy-${i}`}>
                <div className="w-9 h-9 bg-[#C41E3A]/10 border border-[#C41E3A]/20 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#C41E3A] transition-colors">
                  <FileText size={14} className="text-[#C41E3A] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[#374151] text-xs font-semibold group-hover:text-[#111827] transition-colors flex-1">{policy}</span>
                <ExternalLink size={11} className="text-[#9ca3af] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* AGM & Returns */}
        <div className="grid lg:grid-cols-2 gap-10 pt-14" data-testid="section-agm">
          <div>
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-5">AGM Notices</span>
            <div className="space-y-3">
              {agmNotices.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-black/[0.07] rounded-sm hover:border-[#C41E3A]/30 hover:shadow-sm transition-all cursor-pointer group" data-testid={`card-agm-${i}`}>
                  <div className="w-10 h-10 bg-[#C41E3A] rounded-sm flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#111827] font-semibold text-sm">{item.title}</div>
                    <div className="text-[#6b7280] text-xs mt-0.5">{item.period}</div>
                  </div>
                  <ExternalLink size={13} className="text-[#9ca3af] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-5">Annual Returns</span>
            <div className="space-y-3">
              {annualReturns.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-black/[0.07] rounded-sm hover:border-[#C41E3A]/30 transition-all cursor-pointer group" data-testid={`card-return-${i}`}>
                  <div className="w-10 h-10 bg-[#f9f9f9] border border-black/[0.1] rounded-sm flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-[#6b7280]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#111827] font-semibold text-sm">{item.title}</div>
                    <div className="text-[#6b7280] text-xs mt-0.5">{item.period}</div>
                  </div>
                  <ExternalLink size={13} className="text-[#9ca3af] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
