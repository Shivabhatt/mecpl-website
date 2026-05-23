import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d1a42] text-white" data-testid="footer">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#F47920] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">M</span>
              </div>
              <div>
                <div className="text-white font-black text-sm leading-tight">MECPL</div>
                <div className="text-white/60 text-[9px] leading-tight font-medium tracking-wider uppercase">Millennium Engineers</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Building excellence and delivering trust since 1998. India's premier civil engineering contractor with 25+ years of landmark projects.
            </p>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#F47920]"></div>
              <div className="w-8 h-2 rounded-full bg-[#F47920]/40"></div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 pb-2 border-b border-[#F47920]/30">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#F47920] flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm leading-relaxed">
                  Office No. 501-504, 5th Floor,<br />
                  Elite Transbay, Sr. No. 3,<br />
                  Opp. S.K.P Campus, Balewadi,<br />
                  Pune - 411045, Maharashtra
                </p>
              </div>
              <a href="tel:02066865858" className="flex gap-3 items-center hover:text-[#F47920] transition-colors group" data-testid="link-footer-phone">
                <Phone size={16} className="text-[#F47920] flex-shrink-0" />
                <span className="text-white/60 text-sm group-hover:text-[#F47920]">020 6686 5858</span>
              </a>
              <a href="tel:+917066865858" className="flex gap-3 items-center hover:text-[#F47920] transition-colors group" data-testid="link-footer-mobile">
                <Phone size={16} className="text-[#F47920] flex-shrink-0" />
                <span className="text-white/60 text-sm group-hover:text-[#F47920]">+91 7066865858</span>
              </a>
              <a href="mailto:contact@mecpl.in" className="flex gap-3 items-center hover:text-[#F47920] transition-colors group" data-testid="link-footer-email">
                <Mail size={16} className="text-[#F47920] flex-shrink-0" />
                <span className="text-white/60 text-sm group-hover:text-[#F47920]">contact@mecpl.in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 pb-2 border-b border-[#F47920]/30">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", path: "/about" },
                { label: "Completed Projects", path: "/completed-projects" },
                { label: "Ongoing Projects", path: "/ongoing-projects" },
                { label: "Our Clients", path: "/clients" },
                { label: "Equipment", path: "/equipment" },
                { label: "Awards", path: "/awards" },
                { label: "Investor Relations", path: "/investors" },
                { label: "Careers", path: "/careers" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-white/60 text-sm hover:text-[#F47920] transition-colors cursor-pointer flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#F47920] rounded-full inline-block flex-shrink-0"></span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 pb-2 border-b border-[#F47920]/30">Certifications</h4>
            <div className="space-y-3">
              {[
                { code: "ISO 9001:2015", label: "Quality Management" },
                { code: "ISO 14001:2015", label: "Environmental Management" },
                { code: "ISO 45001:2018", label: "Occupational Safety" },
                { code: "CRISIL SME 1", label: "Financial Rating Since 2007" },
              ].map((cert) => (
                <div key={cert.code} className="flex items-start gap-3 p-2.5 bg-white/5 rounded">
                  <div className="w-1.5 h-1.5 bg-[#F47920] rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <div className="text-white text-xs font-bold">{cert.code}</div>
                    <div className="text-white/50 text-xs">{cert.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.mecpl.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-1.5 text-[#F47920] text-xs font-medium hover:underline"
              data-testid="link-footer-official-site"
            >
              <ExternalLink size={12} /> Visit Official Website
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Millennium Engineers &amp; Contractors Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/investors">
              <span className="text-white/40 text-xs hover:text-[#F47920] cursor-pointer transition-colors">Privacy Policy</span>
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/investors">
              <span className="text-white/40 text-xs hover:text-[#F47920] cursor-pointer transition-colors">CSR Policy</span>
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/contact">
              <span className="text-white/40 text-xs hover:text-[#F47920] cursor-pointer transition-colors">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
