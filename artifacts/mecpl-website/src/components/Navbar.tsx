import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Completed Projects", path: "/completed-projects" },
  { label: "Ongoing Projects", path: "/ongoing-projects" },
  { label: "Clients", path: "/clients" },
  { label: "Equipment", path: "/equipment" },
  { label: "Awards", path: "/awards" },
  { label: "Investors", path: "/investors" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === "/";
  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#F47920] text-white text-xs py-1.5 px-4 hidden lg:flex items-center justify-end gap-6">
        <a href="tel:02066865858" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" data-testid="link-phone-top">
          <Phone size={12} />
          020 6686 5858
        </a>
        <a href="tel:+917066865858" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" data-testid="link-mobile-top">
          <Phone size={12} />
          +91 7066865858
        </a>
        <a href="mailto:contact@mecpl.in" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" data-testid="link-email-top">
          <Mail size={12} />
          contact@mecpl.in
        </a>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHome ? (solid ? "bg-[#1B2F6E] shadow-lg top-0" : "bg-transparent") : "bg-[#1B2F6E] shadow-lg"
        } ${isHome && !scrolled && !menuOpen ? "" : ""}`}
        style={{ top: isHome ? (solid ? 0 : 0) : 0 }}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#F47920] rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm lg:text-base leading-none">M</span>
                </div>
                <div>
                  <div className="text-white font-black text-sm lg:text-base leading-tight tracking-wide">MECPL</div>
                  <div className="text-white/70 text-[9px] lg:text-[10px] leading-tight font-medium tracking-wider uppercase">
                    Millennium Engineers
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.filter(l => l.path !== "/contact").map((link) => (
                <Link key={link.path} href={link.path} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span
                    className={`px-2.5 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer uppercase ${
                      location === link.path
                        ? "text-[#F47920]"
                        : "text-white/85 hover:text-[#F47920]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
              <Link href="/contact" data-testid="button-contact-nav">
                <span className="ml-2 px-5 py-2.5 bg-[#F47920] text-white text-xs font-bold tracking-wider uppercase rounded cursor-pointer hover:bg-orange-600 transition-colors">
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden text-white p-2"
              data-testid="button-hamburger"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="xl:hidden bg-[#1B2F6E] border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div
                    className={`block px-4 py-3 text-sm font-semibold rounded transition-colors cursor-pointer uppercase tracking-wide ${
                      location === link.path
                        ? "bg-[#F47920] text-white"
                        : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a href="tel:02066865858" className="flex items-center gap-2 text-[#F47920] text-sm font-medium px-4">
                  <Phone size={14} /> 020 6686 5858
                </a>
                <a href="mailto:contact@mecpl.in" className="flex items-center gap-2 text-[#F47920] text-sm font-medium px-4">
                  <Mail size={14} /> contact@mecpl.in
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
