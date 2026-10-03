import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Menu, Phone, X, Youtube } from "lucide-react";

const logo = "/__mockup/images/mecpl-certifications/mecpl-logo.webp";
const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Projects", "/projects"],
  ["Certifications", "/about#certifications"],
  ["Awards", "/awards"],
  ["Careers", "/careers"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const preventRoute = (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault();

  return (
    <>
      <header className="mecpl-site-header" data-testid="navbar" data-navbar-root="true">
        <div className="mecpl-header-inner">
          <a className="mecpl-logo-link" href="/" onClick={preventRoute} data-testid="link-logo">
            <img src={logo} alt="MECPL" />
          </a>
          <nav className="mecpl-desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={preventRoute} data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                {label}
              </a>
            ))}
          </nav>
          <button className="mecpl-enquire mecpl-header-enquire" onClick={() => setEnquiryOpen(true)} data-testid="button-contact-nav">
            Enquire Now
          </button>
          <button
            className="mecpl-mobile-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-hamburger"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mecpl-mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={(event) => { preventRoute(event); setMenuOpen(false); }}>
                {label}
              </a>
            ))}
            <button className="mecpl-enquire" onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }}>
              Enquire Now
            </button>
          </nav>
        )}
      </header>
      {enquiryOpen && (
        <div className="mecpl-enquiry-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEnquiryOpen(false); }}>
          <section className="mecpl-enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="mecpl-enquiry-title">
            <h2 id="mecpl-enquiry-title">Talk with MECPL</h2>
            <p>For project enquiries, contact our Pune team directly.</p>
            <a href="tel:02066865858">020 6686 5858</a>
            <a href="mailto:contact@mecpl.in">contact@mecpl.in</a>
            <button className="mecpl-enquiry-close" onClick={() => setEnquiryOpen(false)}>Close</button>
          </section>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const footerSocials = [
    { href: "https://www.linkedin.com/company/mecpl", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.facebook.com/mecpl", Icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/mecpl", Icon: Instagram, label: "Instagram" },
    { href: "https://www.youtube.com/@mecpl", Icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="mecpl-site-footer" data-testid="footer">
      <div className="mecpl-footer-main">
        <div className="mecpl-footer-contact">
          <div className="mecpl-footer-contact-list">
            <span><MapPin size={12} />Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045</span>
            <a href="tel:02066865858"><Phone size={12} />020 6686 5858</a>
            <a href="mailto:contact@mecpl.in"><Mail size={12} />contact@mecpl.in</a>
          </div>
          <div>
            <div className="mecpl-footer-social-title">Follow Us</div>
            <div className="mecpl-footer-social">
              {footerSocials.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label}>
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mecpl-footer-certifications">
          <div className="mecpl-footer-certs-title">Certifications</div>
          <div className="mecpl-footer-cert-grid">
            <div>ISO 9001:2015<small>Quality Mgmt</small></div>
            <div>ISO 14001:2015<small>Environmental</small></div>
            <div>ISO 45001:2018<small>Occ. Safety</small></div>
            <div>CRISIL SME 1</div>
          </div>
        </div>
      </div>
      <div className="mecpl-footer-bottom">
        <div className="mecpl-footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.</p>
          <div className="mecpl-footer-policies"><span>PRIVACY POLICY</span><span>CSR POLICY</span></div>
        </div>
      </div>
    </footer>
  );
}