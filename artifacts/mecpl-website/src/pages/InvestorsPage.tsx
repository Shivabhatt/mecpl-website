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

     
    </div>
  );
}
