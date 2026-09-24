import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const logoAsset = "/assets/logo/mecpl-logo.webp";

const navLinks = [
  { label: "Home",     path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Certifications", path: "/about#certifications" },
  { label: "Awards",   path: "/awards" },
  { label: "Careers",  path: "/careers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [location]              = useLocation();
  const { openModal }           = useModal();

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY < 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-mecpl-dark shadow-[0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-500 ${
        isAtTop || menuOpen ? "translate-y-0" : "-translate-y-full"
      } ${location === "/" ? "home-page-navbar" : ""}`}
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
                  className={`navbar-nav-label font-montserrat relative inline-block px-4 py-2 text-sm font-medium tracking-normal uppercase cursor-pointer transition-colors duration-300 group ${
                    active ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-mecpl-red transition-transform duration-300 origin-left ${
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
          <button
            onClick={openModal}
            className="mecpl-button mecpl-button--primary whitespace-nowrap px-5 py-3"
            data-testid="button-contact-nav"
          >
            Enquire Now
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-white transition-colors cursor-pointer"
          data-testid="button-hamburger"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile panel ── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 top-20 z-40 bg-mecpl-dark/20 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden bg-white border-t border-mecpl-dark/[0.06] px-6 py-5 space-y-1 relative z-50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                     className={`navbar-nav-label font-montserrat py-3 text-sm font-medium uppercase tracking-normal border-b border-mecpl-dark/[0.05] cursor-pointer transition-colors ${
                    location === link.path ? "text-mecpl-red" : "text-mecpl-text hover:text-mecpl-red"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="pt-4">
              <button
                onClick={() => { setMenuOpen(false); openModal(); }}
                  className="mecpl-button mecpl-button--primary w-full"
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
