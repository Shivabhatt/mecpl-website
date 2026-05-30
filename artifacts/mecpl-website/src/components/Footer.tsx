import { MapPin, Phone, Mail, ExternalLink, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mecpl-dark border-t border-white/10 text-gray-400 text-xs" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img src="/assets/logo/mecpl-logo.png" alt="MECPL logo" className="h-12 w-auto object-contain" />
            </div>
            <div>
              <div className="text-white font-black text-lg tracking-tighter">MECPL</div>
              <div className="text-white/60 text-[8px] font-bold tracking-widest uppercase">Millennium Engineers</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">
            Pune's premier civil engineering contractor delivering landmark structures since 1998. ISO certified, CRISIL SME 1 rated.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-[#C41E3A] flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045</span>
            </div>
            <a href="tel:02066865858" className="flex items-center gap-2 hover:text-white transition-colors" data-testid="link-footer-phone">
              <Phone size={12} className="text-[#C41E3A]" /> 020 6686 5858
            </a>
            <a href="mailto:contact@mecpl.in" className="flex items-center gap-2 hover:text-white transition-colors" data-testid="link-footer-email">
              <Mail size={12} className="text-[#C41E3A]" /> contact@mecpl.in
            </a>
          </div>

          {/* Social Media */}
          <div className="space-y-3 pt-2">
            <div className="text-white font-black text-[10px] tracking-widest uppercase">Follow Us</div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/mecpl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#C41E3A] hover:bg-[#C41E3A] transition-all rounded-sm"
                title="LinkedIn"
                data-testid="link-social-linkedin"
              >
                <Linkedin size={13} />
              </a>
              <a
                href="https://www.facebook.com/mecpl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#C41E3A] hover:bg-[#C41E3A] transition-all rounded-sm"
                title="Facebook"
                data-testid="link-social-facebook"
              >
                <Facebook size={13} />
              </a>
              <a
                href="https://www.instagram.com/mecpl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#C41E3A] hover:bg-[#C41E3A] transition-all rounded-sm"
                title="Instagram"
                data-testid="link-social-instagram"
              >
                <Instagram size={13} />
              </a>
              <a
                href="https://www.youtube.com/@mecpl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#C41E3A] hover:bg-[#C41E3A] transition-all rounded-sm"
                title="YouTube"
                data-testid="link-social-youtube"
              >
                <Youtube size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <h4 className="text-white font-black text-[10px] tracking-widest uppercase">Certifications</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { code: "ISO 9001:2015", label: "Quality Mgmt" },
              { code: "ISO 14001:2015", label: "Environmental" },
              { code: "ISO 45001:2018", label: "Occ. Safety" },
              { code: "CRISIL SME 1", label: "" },
            ].map((cert) => (
              <div key={cert.code} className="p-3 bg-white/5 border border-white/5 rounded-sm">
                <div className="text-white font-black text-xs">{cert.code}</div>
                {cert.label && <div className="text-white/40 text-[10px] mt-0.5">{cert.label}</div>}
              </div>
            ))}
          </div>
          <a
            href="https://www.mecpl.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#C41E3A] hover:underline"
            data-testid="link-footer-official-site"
          >
            <ExternalLink size={11} /> www.mecpl.in
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/60 text-[10px] tracking-wider">
            &copy; {new Date().getFullYear()} MILLENNIUM ENGINEERS & CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-5 text-white/60 text-[10px] tracking-wider">
            <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">CSR POLICY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
