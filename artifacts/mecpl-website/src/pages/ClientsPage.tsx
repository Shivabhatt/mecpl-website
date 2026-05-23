import { Link } from "wouter";

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

export default function ClientsPage() {
  return (
    <div className="bg-[#1A1A1A] pt-20">
      {/* Header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale" alt="Corporate" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-3">Our Network</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">Clients & Partners</h1>
          <div className="w-16 h-0.5 bg-[#C41E3A] mt-4"></div>
          <p className="text-gray-400 text-base mt-4 max-w-xl leading-relaxed">India's most respected real estate developers, industrialists, and corporates trust MECPL for their landmark projects.</p>
          <div className="flex items-center gap-2 mt-5 text-white/30 text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white/60">Clients</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-trust">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[{ val: "50+", label: "Enterprise Clients" }, { val: "150+", label: "Projects Delivered" }, { val: "25+", label: "Years of Trust" }, { val: "100%", label: "Quality Record" }].map(s => (
            <div key={s.label} className="p-6 border-l-2 border-[#C41E3A] bg-[#2C2C2C]/30 text-center rounded-sm">
              <div className="text-4xl font-black text-[#C41E3A]">{s.val}</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Marquee client logos */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white">Clients & Premium Architects</h2>
          <p className="text-gray-400 text-sm">We orchestrate high-tier development work hand-in-hand with India's marquee real estate enterprises and global master planners.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center font-black tracking-widest uppercase text-white/30 mb-12">
          {["TRUMP TOWERS", "GODREJ PROPS", "VTP REALTY", "PANCHSHIL"].map(c => (
            <div key={c} className="p-8 border border-white/5 rounded-sm hover:text-white hover:border-[#C41E3A] transition-all text-sm">{c}</div>
          ))}
        </div>

        <div className="w-full h-52 rounded-sm overflow-hidden relative shadow-inner border border-white/5 mb-14">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale" alt="Corporate architecture" />
        </div>
      </section>

      {/* Full client grid */}
      <section className="bg-[#2C2C2C]/30 border-t border-white/5 py-14" data-testid="section-clients-grid">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-6">Full Portfolio</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((client, i) => (
              <div
                key={i}
                className="bg-[#2C2C2C] border border-white/5 p-5 rounded-sm hover:border-[#C41E3A]/30 transition-all group"
                data-testid={`card-client-${i}`}
              >
                <div className="w-10 h-10 bg-[#C41E3A]/10 border border-[#C41E3A]/20 rounded-sm flex items-center justify-center text-[#C41E3A] font-black text-lg mb-3 group-hover:bg-[#C41E3A] group-hover:text-white transition-all">
                  {client.name[0]}
                </div>
                <h3 className="text-white font-bold text-sm uppercase tracking-tight leading-snug group-hover:text-[#C41E3A] transition-colors">{client.name}</h3>
                <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-2 py-0.5 rounded-sm">{client.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#C41E3A] py-14" data-testid="section-clients-cta">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Join Our Client Family</h2>
            <p className="text-white/70 text-sm mt-1">Become MECPL's next success story. Contact us for project collaboration.</p>
          </div>
          <Link href="/contact" data-testid="button-clients-contact">
            <span className="inline-block bg-white text-[#C41E3A] px-8 py-4 font-black text-xs tracking-widest uppercase rounded-sm hover:bg-gray-200 transition-colors cursor-pointer">
              Start a Conversation
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
