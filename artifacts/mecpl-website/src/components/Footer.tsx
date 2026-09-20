import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const footerMuted = "rgba(255,255,255,0.78)";
  const footerBorder = "rgba(255,255,255,0.28)";

  return (
    <footer data-testid="footer" className="home-page-typography">
      <div
        style={{
          background: "#EC3338", color: "#ffffff",
          borderRadius: "12px 12px 0 0",
          borderTop: "1px solid rgba(255,255,255,0.42)",
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          {/* Main grid */}
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12"
            style={{ paddingTop: "64px", paddingBottom: "42px" }}>

            {/* Contact and social links */}
            <div className="space-y-6">
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#ffffff" }} />
                  <span style={{ color: footerMuted, lineHeight: 1.65 }}>
                    Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045
                  </span>
                </div>
                <a href="tel:02066865858"
                  className="flex items-center gap-2 transition-colors"
                   style={{ color: footerMuted }}
                   onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                   onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = footerMuted)}
                  data-testid="link-footer-phone">
                    <Phone size={12} style={{ color: "#ffffff" }} /> 020 6686 5858
                </a>
                <a href="mailto:contact@mecpl.in"
                  className="flex items-center gap-2 transition-colors"
                   style={{ color: footerMuted }}
                   onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                   onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = footerMuted)}
                  data-testid="link-footer-email">
                    <Mail size={12} style={{ color: "#ffffff" }} /> contact@mecpl.in
                </a>
               </div>

              {/* Social */}
              <div className="space-y-3 pt-1">
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff" }}>
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
                       style={{ borderColor: footerBorder, color: "#ffffff" }}
                       onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#232529"; el.style.color = "#fff"; el.style.borderColor = "#232529"; }}
                       onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#ffffff"; el.style.borderColor = footerBorder; }}
                    >
                      <s.icon size={13} />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Certifications */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingTop: "2px" }}>
              <div style={{ maxWidth: "470px", width: "100%", textAlign: "left" }}>
                <div style={{
                  marginBottom: "10px",
                  color: "#ffffff",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}>
                  Certifications
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "8px",
                  maxWidth: "470px",
                  textAlign: "left",
                }}>
                  {[
                    ["ISO 9001:2015", "Quality Mgmt"],
                    ["ISO 14001:2015", "Environmental"],
                    ["ISO 45001:2018", "Occ. Safety"],
                    ["CRISIL SME 1", ""],
                  ].map(([certification, description]) => (
                    <div
                      key={certification}
                      style={{
                        minHeight: "58px",
                        padding: "11px 12px",
                        border: `1px solid ${footerBorder}`,
                        background: "rgba(255,255,255,0.1)",
                        color: "#ffffff",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        lineHeight: 1.35,
                      }}
                    >
                      <div>{certification}</div>
                      {description && (
                        <div style={{ marginTop: "4px", color: footerMuted, fontSize: "8px", fontWeight: 400 }}>
                          {description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
           <div className="border-t py-5" style={{ borderColor: "rgba(255,255,255,0.35)" }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
               <p style={{ fontSize: "9px", letterSpacing: "0.12em", color: footerMuted, textTransform: "uppercase" }}>
                &copy; {new Date().getFullYear()} MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.
              </p>
              <div className="flex gap-5"
                 style={{ fontSize: "9px", letterSpacing: "0.12em", color: footerMuted, textTransform: "uppercase" }}>
                <span className="hover:text-mecpl-red cursor-pointer transition-colors">PRIVACY POLICY</span>
                <span className="hover:text-mecpl-red cursor-pointer transition-colors">CSR POLICY</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
