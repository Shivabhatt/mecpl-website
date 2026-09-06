import { Link } from "wouter";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="home-page-typography">
      <div
        style={{
          background: "#ffffff", color: "#232529",
          borderRadius: "20px 20px 0 0",
          borderTop: "1px solid rgba(148,149,153,0.35)",
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          {/* Main grid */}
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12"
            style={{ paddingTop: "80px" }}>

            {/* Brand */}
            <div className="space-y-5">
              <img src="/assets/logo/mecpl-logo.webp" alt="MECPL logo" className="h-12 w-auto object-contain" />
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#EC3338" }} />
                  <span style={{ color: "var(--mecpl-steel)", lineHeight: 1.65 }}>
                    Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045
                  </span>
                </div>
                <a href="tel:02066865858"
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: "var(--mecpl-steel)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#232529")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--mecpl-steel)")}
                  data-testid="link-footer-phone">
                  <Phone size={12} style={{ color: "#EC3338" }} /> 020 6686 5858
                </a>
                <a href="mailto:contact@mecpl.in"
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: "var(--mecpl-steel)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#232529")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--mecpl-steel)")}
                  data-testid="link-footer-email">
                  <Mail size={12} style={{ color: "#EC3338" }} /> contact@mecpl.in
                </a>
              </div>

              {/* Social */}
              <div className="space-y-3 pt-2">
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#232529" }}>
                  Follow Us
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://www.linkedin.com/company/mecpl", icon: Linkedin,  label: "LinkedIn",  testid: "link-social-linkedin" },
                    { href: "https://www.facebook.com/mecpl",         icon: Facebook,  label: "Facebook",  testid: "link-social-facebook" },
                    { href: "https://www.instagram.com/mecpl",        icon: Instagram, label: "Instagram", testid: "link-social-instagram" },
                    { href: "https://www.youtube.com/@mecpl",         icon: Youtube,   label: "YouTube",   testid: "link-social-youtube" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                      data-testid={s.testid}
                      className="w-8 h-8 border flex items-center justify-center transition-all"
                      style={{ borderColor: "rgba(148,149,153,0.45)", color: "var(--mecpl-steel)" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#EC3338"; el.style.color = "#fff"; el.style.borderColor = "#EC3338"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--mecpl-steel)"; el.style.borderColor = "rgba(148,149,153,0.45)"; }}
                    >
                      <s.icon size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#232529" }}>
                Certifications
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { code: "ISO 9001:2015",  label: "Quality Mgmt" },
                  { code: "ISO 14001:2015", label: "Environmental" },
                  { code: "ISO 45001:2018", label: "Occ. Safety" },
                  { code: "CRISIL SME 1",   label: "" },
                ].map(cert => (
                  <div key={cert.code} className="p-3 border"
                    style={{ borderColor: "rgba(148,149,153,0.35)", background: "#ffffff" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 700, color: "#232529" }}>
                      {cert.code}
                    </div>
                    {cert.label && (
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", color: "var(--mecpl-steel)", marginTop: "2px" }}>
                        {cert.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t mt-16 py-6" style={{ borderColor: "rgba(148,149,153,0.35)" }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--mecpl-steel)", textTransform: "uppercase" }}>
                &copy; {new Date().getFullYear()} MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.
              </p>
              <div className="flex gap-5"
                style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--mecpl-steel)", textTransform: "uppercase" }}>
                <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">PRIVACY POLICY</span>
                <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">CSR POLICY</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
