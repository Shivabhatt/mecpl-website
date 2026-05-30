import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone, X } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";
// Use the unified webp logo from public assets
const logoAsset = "/assets/logo/mecpl-logo.webp";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Projects", path: "/projects" },
  { label: "Awards", path: "/awards" },
  { label: "Careers", path: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location] = useLocation();
  const { theme } = useTheme();
  const { openModal } = useModal();

  const isLight = true;
  const isLinkActive = (path: string) => location === path;

  const shellClass = isLight
    ? "bg-[#ffffff] backdrop-blur-0 border-black/10 shadow-2xl shadow-black/10 md:bg-[#ffffff]/95 md:backdrop-blur-2xl"
    : "bg-[#111827] backdrop-blur-0 border-white/10 shadow-2xl shadow-black/20 md:bg-white/10 md:dark:bg-black/20 md:backdrop-blur-2xl";
  const navTextClass = isLight ? "text-[#111827]/65 hover:text-[#111827]" : "text-white/75 hover:text-white";
  const navActiveClass = isLight ? "text-[#111827]" : "text-white";
  const mutedTextClass = isLight ? "text-[#4b5563]/80 hover:text-[#111827]" : "text-white/55 hover:text-white";
  const mobilePanelClass = isLight
    ? "bg-[#ffffff] backdrop-blur-0 border-black/10 shadow-2xl shadow-black/10"
    : "bg-[#111827] backdrop-blur-0 border-white/10 shadow-2xl shadow-black/20";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  function LogoImage() {
    const [imgError, setImgError] = useState(false);

    if (!imgError) {
      return (
        <img
          src={logoAsset}
          alt="MECPL logo"
          className="h-10 md:h-12 w-auto object-contain"
          onError={() => setImgError(true)}
        />
      );
    }

    return (
      <div className="w-9 h-9 md:w-10 md:h-10 bg-[#C41E3A] flex items-center justify-center rounded-[14px] shadow-lg shadow-[#C41E3A]/25 transform group-hover:scale-105 transition-transform duration-300">
        <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white rounded-full relative">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/80" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/80" />
        </div>
      </div>
    );
  }

  return (
    <header
      className={`mecpl-mobile-flat-nav fixed top-2 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-0.75rem)] md:w-[calc(100%-1rem)] max-w-7xl z-50 transition-all duration-300 border rounded-full ${shellClass} ${scrolled || menuOpen ? "scale-[1.01]" : ""}`}
      style={isMobile ? { backgroundColor: isLight ? "#ffffff" : "#111827", backdropFilter: "none", WebkitBackdropFilter: "none" } : undefined}
      data-testid="navbar"
      data-navbar-root="true"
    >
      <div className="px-4 sm:px-5 md:px-7 h-15 md:h-18 flex items-center justify-between gap-3 md:gap-4">
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-2.5 cursor-pointer group select-none">
            <LogoImage />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group py-2">
              <Link href={link.path} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 cursor-pointer ${isLinkActive(link.path) ? navActiveClass : navTextClass}`}>
                  {link.label}
                </span>
              </Link>
              <span className={`absolute left-4 right-4 -bottom-0.5 h-px bg-[#C41E3A] transition-all duration-200 origin-left ${isLinkActive(link.path) ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-80"}`} />
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:02066865858" className={`flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors px-3 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${mutedTextClass}`}>
            <Phone size={12} /> 020 6686 5858
          </a>

          <button
            onClick={openModal}
            className="bg-[#C41E3A] hover:bg-[#ab1831] text-[#fff] text-[11px] font-black tracking-[0.22em] uppercase px-5 py-3 rounded-full transition-colors cursor-pointer border border-[#C41E3A] whitespace-nowrap"
            data-testid="button-contact-nav"
          >
            Enquire Now
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className={`w-9 h-9 flex items-center justify-center border rounded-full focus:outline-none bg-transparent ${isLight ? "border-black/10 text-[#1a1a1a]" : "border-white/15 text-white"}`}
            data-testid="button-hamburger"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 top-20 z-40 bg-black/35 md:hidden"
        />
      )}

      {menuOpen && (
        <div
          className={`mecpl-mobile-flat-panel fixed left-3 right-3 top-20 z-50 md:hidden rounded-[24px] border px-4 py-4 space-y-2 text-sm font-bold uppercase tracking-wider max-h-[calc(100dvh-6rem)] overflow-y-auto ${mobilePanelClass}`}
          style={isMobile ? { backgroundColor: isLight ? "#ffffff" : "#111827", backdropFilter: "none", WebkitBackdropFilter: "none" } : undefined}
        >
          {navLinks.map((link, index) => (
            <Link key={link.path} href={link.path} data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className={`block py-3 text-[13px] sm:text-sm transition-colors cursor-pointer whitespace-nowrap ${isLinkActive(link.path) ? navActiveClass : navTextClass} ${index !== navLinks.length - 1 ? "border-b border-white/8" : ""}`}>
                {link.label}
              </div>
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <a href="tel:02066865858" className={`flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase whitespace-nowrap ${mutedTextClass}`}>
              <Phone size={12} /> 020 6686 5858
            </a>
            <button
              onClick={() => {
                setMenuOpen(false);
                openModal();
              }}
              className="w-full text-center bg-[#C41E3A] border border-[#C41E3A] text-[#fff] py-3 text-[10px] font-black tracking-[0.22em] uppercase cursor-pointer mt-2 rounded-full whitespace-nowrap"
              data-testid="button-mobile-enquire"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}