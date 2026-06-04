import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink, Linkedin, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".footer-stack-card", wrapper);
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.88,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1] as Element,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <footer data-testid="footer">
      <div ref={wrapperRef}>

        {/* ── CARD 1: Let's Build Together CTA ── */}
        <div
          className="footer-stack-card"
          style={{ background: "#111827", color: "#ffffff" }}
        >
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
            <div style={{ maxWidth: "720px", width: "100%" }}>
              <div style={{ height: "1px", width: "48px", background: "#C41E3A", margin: "0 auto 28px" }} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "28px" }}>
                Let's Work Together
              </span>

              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2.6rem,6vw,5.5rem)", color: "#ffffff", fontWeight: 300, lineHeight: 1.05, marginBottom: "0", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                LET'S BUILD
              </h2>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2.6rem,6vw,5.5rem)", color: "#C41E3A", fontWeight: 800, lineHeight: 1.05, marginBottom: "40px", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                TOGETHER
              </h2>

              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px", lineHeight: 1.85, color: "rgba(255,255,255,0.45)", maxWidth: "460px", margin: "0 auto 52px" }}>
                India's most trusted construction partner — built on precision, safety, and 25 years of structural performance.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
                <Link href="/contact" data-testid="button-footer-cta-connect">
                  <span
                    className="inline-flex items-center gap-2 cursor-pointer transition-all"
                    style={{ background: "#C41E3A", color: "#ffffff", padding: "16px 40px", fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#ab1831")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#C41E3A")}
                  >
                    Connect with MECPL <ArrowRight size={12} />
                  </span>
                </Link>
                <Link href="/careers" data-testid="button-footer-cta-careers">
                  <span
                    className="inline-flex items-center gap-2 border cursor-pointer transition-all"
                    style={{ padding: "16px 40px", fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, borderColor: "rgba(255,255,255,0.25)", color: "#ffffff" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#C41E3A"; el.style.borderColor = "#C41E3A"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  >
                    View Job Openings
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: Footer body ── */}
        <div
          className="footer-stack-card"
          style={{ background: "#0d0d0d", color: "#ffffff", borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column" }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12"
              style={{ paddingTop: "80px" }}>

              {/* Brand */}
              <div className="space-y-5">
                <img src="/assets/logo/mecpl-logo.webp" alt="MECPL logo" className="h-12 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }} />
                <p style={{ fontSize: "12px", lineHeight: 1.85, color: "rgba(255,255,255,0.38)" }}>
                  Engineering India's skyline, one landmark at a time.<br />ISO certified, CRISIL SME 1 rated — since 1998.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#C41E3A" }} />
                    <span style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
                      Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045
                    </span>
                  </div>
                  <a href="tel:02066865858"
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
                    data-testid="link-footer-phone">
                    <Phone size={12} style={{ color: "#C41E3A" }} /> 020 6686 5858
                  </a>
                  <a href="mailto:contact@mecpl.in"
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
                    data-testid="link-footer-email">
                    <Mail size={12} style={{ color: "#C41E3A" }} /> contact@mecpl.in
                  </a>
                </div>

                {/* Social */}
                <div className="space-y-3 pt-2">
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
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
                        style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#C41E3A"; el.style.color = "#fff"; el.style.borderColor = "#C41E3A"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.4)"; el.style.borderColor = "rgba(255,255,255,0.15)"; }}
                      >
                        <s.icon size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
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
                      style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>
                        {cert.code}
                      </div>
                      {cert.label && (
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
                          {cert.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <a href="https://www.mecpl.in" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:underline"
                  style={{ color: "#C41E3A", fontSize: "11px" }}
                  data-testid="link-footer-official-site">
                  <ExternalLink size={11} /> www.mecpl.in
                </a>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t mt-16 py-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                  &copy; {new Date().getFullYear()} MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-5"
                  style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                  <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">PRIVACY POLICY</span>
                  <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">CSR POLICY</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
