import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone, X } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const logoAsset = "/assets/logo/mecpl-logo.webp";

const navLinks = [
  { label: "Home",     path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Blog",     path: "/blog" },
  { label: "Projects", path: "/projects" },
  { label: "Awards",   path: "/awards" },
  { label: "Careers",  path: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location]              = useLocation();
  const { openModal }           = useModal();

  const isHome      = location === "/";
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-white/[0.98] backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.07)]"
      }`}
      data-testid="navbar"
      data-navbar-root="true"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center cursor-pointer select-none flex-shrink-0">
            <img
              src={logoAsset}
              alt="MECPL"
              className="h-10 w-auto object-contain transition-all duration-500"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const active = location === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span
                  className={`relative inline-block px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase cursor-pointer transition-colors duration-300 group ${
                    transparent
                      ? active ? "text-white" : "text-white/70 hover:text-white"
                      : active ? "text-[#111827]" : "text-[#6b7280] hover:text-[#111827]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#C41E3A] transition-transform duration-300 origin-left ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop right ── */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <a
            href="tel:02066865858"
            className={`flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase transition-colors whitespace-nowrap ${
              transparent ? "text-white/65 hover:text-white" : "text-[#6b7280] hover:text-[#111827]"
            }`}
          >
            <Phone size={12} /> 020&nbsp;6686&nbsp;5858
          </a>
          <button
            onClick={openModal}
            className="bg-[#C41E3A] hover:bg-[#ab1831] text-white text-[11px] font-bold tracking-[0.22em] uppercase px-5 py-3 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="button-contact-nav"
          >
            Enquire Now
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors cursor-pointer ${
            transparent ? "text-white" : "text-[#111827]"
          }`}
          data-testid="button-hamburger"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile panel ── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 top-20 z-40 bg-black/20 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-5 space-y-1 relative z-50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className={`py-3 text-[13px] font-semibold uppercase tracking-wider border-b border-black/[0.05] cursor-pointer transition-colors ${
                    location === link.path ? "text-[#C41E3A]" : "text-[#111827] hover:text-[#C41E3A]"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="tel:02066865858"
                className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6b7280]"
              >
                <Phone size={12} /> 020 6686 5858
              </a>
              <button
                onClick={() => { setMenuOpen(false); openModal(); }}
                className="w-full text-center bg-[#C41E3A] hover:bg-[#ab1831] text-white py-3 text-[11px] font-bold tracking-[0.22em] uppercase cursor-pointer transition-colors"
                data-testid="button-mobile-enquire"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
