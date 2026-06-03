import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink, Linkedin, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ctaPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = ctaPanelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      gsap.from(panel, {
        scale: 0.92,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer style={{ background: "#f9f9f9", color: "#111827" }} data-testid="footer">

      {/* ── CTA PANEL ── */}
      <div className="px-6 pt-24 pb-0">
        <div
          ref={ctaPanelRef}
          className="max-w-7xl mx-auto p-14 md:p-20 text-center border will-change-transform"
          style={{ borderColor: "rgba(196,30,58,0.18)", background: "#ffffff" }}
        >
          <div className="h-px w-12 mx-auto mb-6" style={{ background: "#C41E3A" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C41E3A", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
            Let's Work Together
          </span>
          <h2
            className="font-bold uppercase mx-auto"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#111827", fontWeight: 800, lineHeight: 1.1, maxWidth: "680px", marginBottom: "32px" }}
          >
            Ready to Build Something Extraordinary
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-footer-cta-connect">
              <span className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#ab1831] text-white px-10 py-4 cursor-pointer transition-all"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                Connect with MECPL <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/careers" data-testid="button-footer-cta-careers">
              <span
                className="inline-flex items-center gap-2 border px-10 py-4 cursor-pointer transition-all"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, borderColor: "rgba(17,24,39,0.25)", color: "#111827" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C41E3A"; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "#C41E3A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#111827"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,24,39,0.25)"; }}
              >
                View Job Openings
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER BODY ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t mt-16"
        style={{ borderColor: "rgba(0,0,0,0.07)" }}>

        {/* Brand */}
        <div className="space-y-5">
          <img src="/assets/logo/mecpl-logo.png" alt="MECPL logo" className="h-12 w-auto object-contain" style={{ filter: "brightness(0)" }} />
          <p style={{ fontSize: "12px", lineHeight: 1.8, color: "rgba(17,24,39,0.45)" }}>
            Engineering India's skyline, one landmark at a time. ISO certified, CRISIL SME 1 rated — since 1998.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-[#C41E3A] flex-shrink-0 mt-0.5" />
              <span style={{ color: "rgba(17,24,39,0.55)", lineHeight: 1.6 }}>Office No. 501-504, 5th Floor, Elite Transbay, Balewadi, Pune - 411045</span>
            </div>
            <a href="tel:02066865858" className="flex items-center gap-2 transition-colors" style={{ color: "rgba(17,24,39,0.55)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#111827")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(17,24,39,0.55)")}
              data-testid="link-footer-phone">
              <Phone size={12} className="text-[#C41E3A]" /> 020 6686 5858
            </a>
            <a href="mailto:contact@mecpl.in" className="flex items-center gap-2 transition-colors" style={{ color: "rgba(17,24,39,0.55)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#111827")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(17,24,39,0.55)")}
              data-testid="link-footer-email">
              <Mail size={12} className="text-[#C41E3A]" /> contact@mecpl.in
            </a>
          </div>
          <div className="space-y-3 pt-2">
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#111827" }}>Follow Us</div>
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
                  style={{ borderColor: "rgba(17,24,39,0.15)", color: "rgba(17,24,39,0.45)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#C41E3A"; el.style.color = "#fff"; el.style.borderColor = "#C41E3A"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(17,24,39,0.45)"; el.style.borderColor = "rgba(17,24,39,0.15)"; }}
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#111827" }}>
            Certifications
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { code: "ISO 9001:2015",  label: "Quality Mgmt" },
              { code: "ISO 14001:2015", label: "Environmental" },
              { code: "ISO 45001:2018", label: "Occ. Safety" },
              { code: "CRISIL SME 1",   label: "" },
            ].map(cert => (
              <div key={cert.code} className="p-3 border" style={{ borderColor: "rgba(0,0,0,0.08)", background: "#ffffff" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", fontWeight: 700, color: "#111827" }}>{cert.code}</div>
                {cert.label && <div style={{ fontSize: "10px", color: "rgba(17,24,39,0.4)", marginTop: "2px" }}>{cert.label}</div>}
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

      <div className="border-t py-6" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(17,24,39,0.35)", textTransform: "uppercase" }}>
            &copy; {new Date().getFullYear()} MILLENNIUM ENGINEERS &amp; CONTRACTORS PVT. LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-5" style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(17,24,39,0.35)", textTransform: "uppercase" }}>
            <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="hover:text-[#C41E3A] cursor-pointer transition-colors">CSR POLICY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
