import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
const assetBase = import.meta.env.BASE_URL;

const clients = [
  { name: "Panchshil Realty", sector: "Real Estate", logo: `${assetBase}assets/clients/client-09-1.webp` },
  { name: "VTP Realty", sector: "Real Estate", logo: `${assetBase}assets/clients/vtp-realty.webp` },
  { name: "Godrej Properties", sector: "Real Estate", logo: `${assetBase}assets/clients/client-12-1.webp` },
  { name: "Tata Consultancy Services", sector: "IT & Technology", logo: `${assetBase}assets/clients/client-06.webp` },
  { name: "Kalpataru", sector: "Real Estate", logo: `${assetBase}assets/clients/client-14.webp` },
  { name: "K Raheja Corp", sector: "Real Estate", logo: `${assetBase}assets/clients/client-17.webp` },
  { name: "Malpani Group", sector: "Real Estate", logo: `${assetBase}assets/clients/client-13.webp` },
  { name: "Gera Developments", sector: "Real Estate", logo: `${assetBase}assets/clients/client-05.webp` },
  { name: "Pride Purple Group", sector: "Real Estate", logo: `${assetBase}assets/clients/client-15-1.webp` },
  { name: "Praj Industries", sector: "Industrial", logo: `${assetBase}assets/clients/client-14.webp` },
  { name: "Mahindra & Mahindra", sector: "Automotive", logo: `${assetBase}assets/clients/client-09-1.webp` },
  { name: "Syntel Corp", sector: "IT & Technology", logo: `${assetBase}assets/clients/client-05.webp` },
  { name: "Aurus Developers", sector: "Real Estate", logo: `${assetBase}assets/clients/client-17.webp` },
  { name: "Indira Group", sector: "Education", logo: `${assetBase}assets/clients/client-14.webp` },
  { name: "Nandan Buildcon", sector: "Construction", logo: `${assetBase}assets/clients/client-17.webp` },
  { name: "Bekaert Industries", sector: "Industrial", logo: `${assetBase}assets/clients/client-12-1.webp` },
  { name: "OmniActive Health Technologies", sector: "Healthcare", logo: `${assetBase}assets/clients/omniactive.webp` },
  { name: "Cadbury India", sector: "FMCG", logo: `${assetBase}assets/clients/client-09-1.webp` },
  { name: "G.M. Kenjale", sector: "Real Estate", logo: `${assetBase}assets/clients/client-13.webp` },
  { name: "Bhandari Associates", sector: "Real Estate", logo: `${assetBase}assets/clients/client-05.webp` },
];

const partnerLogos = [
  { alt: "Panchshil", src: `${assetBase}assets/clients/client-09-1.webp` },
  { alt: "VTP", src: `${assetBase}assets/clients/vtp-realty.webp` },
  { alt: "OmniActive", src: `${assetBase}assets/clients/omniactive.webp` },
  { alt: "Nandan", src: `${assetBase}assets/clients/client-17.webp` },
  { alt: "Pride Purple", src: `${assetBase}assets/clients/client-15-1.webp` },
  { alt: "Praj", src: `${assetBase}assets/clients/client-14.webp` },
  { alt: "Ramakrishna Mission", src: `${assetBase}assets/clients/client-13.webp` },
  { alt: "Godrej", src: `${assetBase}assets/clients/client-12-1.webp` },
  { alt: "TCS", src: `${assetBase}assets/clients/client-06.webp` },
  { alt: "Syntel", src: `${assetBase}assets/clients/client-05.webp` },
];

export default function ClientsPage() {
  return (
    <div data-animate-page className="bg-white">
      {/* Header */}
      <div className="relative py-20 border-b border-black/[0.06] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" alt="Corporate" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader label="Our Network" title="Clients & Partners" subtitle="India's most respected real estate developers, industrialists, and corporates trust MECPL for their landmark projects." />
        </div>
      </div>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-trust">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[{ val: "50+", label: "Enterprise Clients" }, { val: "150+", label: "Projects Delivered" }, { val: "25+", label: "Years of Trust" }, { val: "100%", label: "Quality Record" }].map(s => (
            <div key={s.label} className="p-6 border-l-2 border-[#C41E3A] bg-[#f9f9f9] text-center rounded-sm">
              <div className="text-4xl font-black text-[#C41E3A]">{s.val}</div>
              <div className="text-[10px] text-[#4b5563] font-bold uppercase tracking-wider mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Marquee client logos */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Ecosystem</span>
          <h3 className="text-3xl font-black tracking-tight uppercase text-[#111827]">Clients & Premium Architects</h3>
          <p className="text-[#4b5563] text-sm">We orchestrate high-tier development work hand-in-hand with India's marquee real estate enterprises and global master planners.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-stretch mb-12">
          {partnerLogos.map((partner) => (
            <div key={partner.alt} className="p-4 border border-black/[0.07] rounded-sm bg-white flex items-center justify-center min-h-24 hover:border-[#C41E3A] transition-all shadow-sm">
              <img src={partner.src} alt={partner.alt} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>

        <div className="w-full h-52 rounded-sm overflow-hidden relative shadow-inner border border-black/[0.07] mb-14">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Corporate architecture" />
        </div>
      </section>

      {/* Full client grid */}
      <section className="bg-[#f9f9f9] border-t border-black/[0.06] py-14" data-testid="section-clients-grid">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-6">Full Portfolio</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((client, i) => (
              <div
                key={i}
                className="bg-white border border-black/[0.07] p-5 rounded-sm hover:border-[#C41E3A]/30 transition-all group shadow-sm"
                data-testid={`card-client-${i}`}
              >
                <div className="w-full h-16 bg-[#f9f9f9] border border-black/[0.07] rounded-sm flex items-center justify-center mb-3 overflow-hidden">
                  {client.logo ? <img src={client.logo} alt={client.name} className="max-h-10 w-auto object-contain" /> : <span className="text-[#C41E3A] font-black text-lg">{client.name[0]}</span>}
                </div>
                <h3 className="text-[#111827] font-bold text-sm uppercase tracking-tight leading-snug group-hover:text-[#C41E3A] transition-colors">{client.name}</h3>
                <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-widest text-[#6b7280] bg-[#f9f9f9] border border-black/[0.07] px-2 py-0.5 rounded-sm">{client.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
