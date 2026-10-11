import { MapPin, Phone, Mail, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";

type FooterProps = {
  variant?: "default" | "home";
};

type HomeFooterSocialName = "LinkedIn" | "Instagram" | "YouTube";

function HomeFooterSocialIcon({ name }: { name: HomeFooterSocialName }) {
  if (name === "LinkedIn") {
    return <Linkedin className="home-footer-social-mark" aria-hidden="true" strokeWidth={2.5} />;
  }

  return (
    <svg
      className="home-footer-social-mark"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {name === "Instagram" && (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="17.5" cy="6.7" r="1.3" fill="currentColor" />
        </>
      )}
      {name === "YouTube" && (
        <>
          <rect x="2.1" y="5" width="19.8" height="14" rx="4.2" fill="currentColor" />
          <path d="M10 8.8v6.4l5.3-3.2L10 8.8Z" fill="#CF2E2E" />
        </>
      )}
    </svg>
  );
}

type HomeFooterContactIconName = "location" | "phone" | "email";

function HomeFooterContactIcon({ name }: { name: HomeFooterContactIconName }) {
  return (
    <span className="home-footer-contact-icon" aria-hidden="true">
      {name === "location" && <MapPin className="home-footer-contact-mark" strokeWidth={2.8} />}
      {name === "phone" && <Phone className="home-footer-contact-mark" strokeWidth={2.8} />}
      {name === "email" && <Mail className="home-footer-contact-mark" strokeWidth={2.8} />}
    </span>
  );
}

export default function Footer({ variant = "default" }: FooterProps) {
  const footerMuted = "rgba(255,255,255,0.78)";
  const footerContact = "rgba(255,255,255,0.94)";
  const footerBorder = "rgba(255,255,255,0.28)";

  if (variant === "home") {
    const socialLinks: { href: string; label: HomeFooterSocialName }[] = [
      { href: "https://www.linkedin.com/company/mecpl", label: "LinkedIn" },
      { href: "https://www.instagram.com/mecpl_pune?stkn=M3FoN2RoMWxreTMw", label: "Instagram" },
      { href: "https://www.youtube.com/@mecpl", label: "YouTube" },
    ];
    const quickLinks = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/awards", label: "Awards" },
      { href: "/certifications", label: "Certifications" },
      { href: "/careers", label: "Career" },
    ];

    return (
      <footer data-testid="footer" className="site-footer home-site-footer">
        <div className="home-footer-main">
          <div className="home-footer-grid">
            <section className="home-footer-column home-footer-brand" aria-label="Millennium Engineers & Contractors Pvt. Ltd., Building a stronger tomorrow">
              <div className="home-footer-lockup">
                <div className="home-footer-logo-badge">
                  <img
                    className="home-footer-logo-mark"
                    src="/assets/logo/mecpl-logo.webp"
                    alt="MECPL logo"
                    width="64"
                    height="46"
                  />
                </div>
                <div className="home-footer-copy">
                  <div className="home-footer-full-company">
                    <span>MILLENNIUM ENGINEERS &amp;</span>
                    <span>CONTRACTORS PVT. LTD.</span>
                  </div>
                  <div className="home-footer-tagline">BUILDING A STRONGER TOMORROW</div>
                </div>
              </div>
              <div className="home-footer-social">
                {socialLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="home-footer-social-link"
                  >
                    <HomeFooterSocialIcon name={label} />
                  </a>
                ))}
              </div>
            </section>

            <section className="home-footer-column home-footer-contact" aria-labelledby="home-footer-contact-title">
              <div id="home-footer-contact-title" className="home-footer-heading">Contact Us</div>
              <div className="home-footer-contact-list">
                <div className="home-footer-contact-row">
                  <HomeFooterContactIcon name="location" />
                  <span>Office No. 501-504, 5th Floor,<br />Elite Transbay, Balewadi, Pune - 411045</span>
                </div>
                <a className="home-footer-contact-row" href="tel:02066865858">
                  <HomeFooterContactIcon name="phone" />
                  <span>020 6686 5858</span>
                </a>
                <a className="home-footer-contact-row" href="mailto:contact@mecpl.in">
                  <HomeFooterContactIcon name="email" />
                  <span>contact@mecpl.in</span>
                </a>
              </div>
            </section>

            <nav className="home-footer-column home-footer-links" aria-labelledby="home-footer-links-title">
              <div id="home-footer-links-title" className="home-footer-heading">Quick Links</div>
              <ul className="home-footer-link-list">
                {quickLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="home-footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="home-footer-bottom">
          <div className="home-footer-bottom-inner">
            <p>© {new Date().getFullYear()} MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.</p>
            <div className="home-footer-policies">
              <span>Privacy Policy</span>
              <span>CSR Policy</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer data-testid="footer" className="site-footer">
      <div
        style={{
          background: "#CFE2E2", color: "#ffffff",
          borderRadius: "12px 12px 0 0",
          display: "flex", flexDirection: "column",
        }}
      >
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          className="bg-[#CF2E2E] border-t-[#CF2E2E] border-r-[#CF2E2E] border-b-[#CF2E2E] border-l-[#CF2E2E]">

          {/* Main grid */}
          <div className="w-full px-6 lg:px-[120px] grid grid-cols-1 md:grid-cols-2 gap-12"
            style={{ paddingTop: "64px", paddingBottom: "42px" }}>

            {/* Contact and social links */}
            <div className="space-y-6">
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#ffffff" }} />
                  <span
                    className="font-montserrat text-[13px] font-medium"
                    style={{ color: footerContact, lineHeight: 1.65 }}
                  >
                    Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045
                  </span>
                </div>
                <a href="tel:02066865858"
                  className="flex items-center gap-2 font-montserrat text-[13px] font-medium transition-colors"
                   style={{ color: footerContact }}
                   onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                   onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = footerContact)}
                  data-testid="link-footer-phone">
                    <Phone size={12} style={{ color: "#ffffff" }} /> 020 6686 5858
                </a>
                <a href="mailto:contact@mecpl.in"
                  className="flex items-center gap-2 font-montserrat text-[13px] font-medium transition-colors"
                   style={{ color: footerContact }}
                   onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                   onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = footerContact)}
                  data-testid="link-footer-email">
                    <Mail size={12} style={{ color: "#ffffff" }} /> contact@mecpl.in
                </a>
               </div>

              {/* Social */}
              <div className="space-y-3 pt-1">
                <div className="footer-section-label font-montserrat" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff" }}>
                  Follow Us
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://www.linkedin.com/company/mecpl", icon: Linkedin,  label: "LinkedIn",  testid: "link-social-linkedin" },
                    { href: "https://www.instagram.com/mecpl_pune?stkn=M3FoN2RoMWxreTMw", icon: Instagram, label: "Instagram", testid: "link-social-instagram" },
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
                <div className="footer-section-label font-montserrat" style={{
                  marginBottom: "10px",
                  color: "#ffffff",
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
                      className="font-montserrat"
                      style={{
                        minHeight: "58px",
                        padding: "11px 12px",
                        border: `1px solid ${footerBorder}`,
                        background: "rgba(255,255,255,0.1)",
                        color: "#ffffff",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        lineHeight: 1.35,
                      }}
                    >
                      <div className="footer-certificate-name">{certification}</div>
                      {description && (
                        <div className="footer-certificate-description" style={{ marginTop: "4px", color: footerMuted, fontSize: "8px", fontWeight: 400 }}>
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
             <div className="w-full px-6 lg:px-[120px] flex flex-col sm:flex-row items-center justify-between gap-3">
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
