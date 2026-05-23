import { Link } from "wouter";
import SectionHeader from "../components/SectionHeader";

const clients = [
  { name: "Panchshil Realty", sector: "Real Estate" },
  { name: "VTP Realty", sector: "Real Estate" },
  { name: "Godrej Properties", sector: "Real Estate" },
  { name: "Tata Consultancy Services", sector: "IT & Technology" },
  { name: "Kalpataru", sector: "Real Estate" },
  { name: "K Raheja Corp", sector: "Real Estate" },
  { name: "Malpani Group", sector: "Real Estate" },
  { name: "Gera Developments", sector: "Real Estate" },
  { name: "Pride Purple Group", sector: "Real Estate" },
  { name: "Praj Industries", sector: "Industrial" },
  { name: "Mahindra & Mahindra", sector: "Automotive" },
  { name: "Syntel Corp", sector: "IT & Technology" },
  { name: "Aurus Developers", sector: "Real Estate" },
  { name: "Indira Group", sector: "Education" },
  { name: "Nandan Buildcon", sector: "Construction" },
  { name: "Bekaert Industries", sector: "Industrial" },
  { name: "OmniActive Health Technologies", sector: "Healthcare" },
  { name: "Cadbury India", sector: "FMCG" },
  { name: "G.M. Kenjale", sector: "Real Estate" },
  { name: "Bhandari Associates", sector: "Real Estate" },
];

const sectorColors: Record<string, string> = {
  "Real Estate": "#1B2F6E",
  "IT & Technology": "#0d4a8a",
  "Industrial": "#0f2455",
  "Automotive": "#163268",
  "Education": "#1a3c7a",
  "Construction": "#243d7a",
  "Healthcare": "#0a2b6e",
  "FMCG": "#1e3a7a",
};

export default function ClientsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Our Network</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Clients & Partners</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            India's most respected real estate developers, industrialists, and corporates trust MECPL for their landmark projects.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Clients</span>
          </div>
        </div>
      </div>

      {/* Trust statement */}
      <section className="py-16 bg-white" data-testid="section-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              label="Client Trust"
              title="20+ Enterprise Clients"
              subtitle="MECPL's client portfolio represents the who's who of Indian real estate and industry — from global IT giants to Tier-1 residential developers."
              center
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-8">
            {[
              { val: "20+", label: "Enterprise Clients" },
              { val: "150+", label: "Projects Delivered" },
              { val: "25+", label: "Years of Trust" },
              { val: "100%", label: "Quality Record" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl font-black text-[#1B2F6E]">{s.val}</div>
                <div className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients grid */}
      <section className="py-16 bg-gray-50" data-testid="section-clients-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Partners" title="Corporate Client Portfolio" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {clients.map((client, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#F47920]/30 hover:shadow-md transition-all group"
                data-testid={`card-client-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white font-black text-lg"
                  style={{ backgroundColor: sectorColors[client.sector] || "#1B2F6E" }}
                >
                  {client.name[0]}
                </div>
                <h3 className="text-[#1B2F6E] font-bold text-sm leading-snug group-hover:text-[#F47920] transition-colors mb-2">
                  {client.name}
                </h3>
                <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full font-medium">
                  {client.sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B2F6E]" data-testid="section-clients-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Join Our Client Family</h2>
          <p className="text-white/60 mb-8">Become MECPL's next success story. Contact us for project collaboration.</p>
          <Link href="/contact" data-testid="button-clients-contact">
            <span className="inline-flex items-center gap-2 bg-[#F47920] text-white px-8 py-4 font-bold text-sm uppercase tracking-wide rounded hover:bg-orange-600 transition-colors cursor-pointer">
              Start a Conversation
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
