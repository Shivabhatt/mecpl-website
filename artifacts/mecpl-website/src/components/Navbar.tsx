import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/about",
    children: [
      { label: "Our Profile", path: "/about" },
      { label: "Clients & Architects", path: "/clients" },
      { label: "Equipment", path: "/equipment" },
      { label: "Investors", path: "/investors" },
    ],
  },
  { label: "Services", path: "/services" },
  {
    label: "Projects",
    path: "/completed-projects",
    children: [
      { label: "Completed Projects", path: "/completed-projects" },
      { label: "Ongoing Projects", path: "/ongoing-projects" },
    ],
  },
  { label: "Awards", path: "/awards" },
  { label: "Careers", path: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-[#1A1A1A]/95 backdrop-blur-md shadow-2xl"
          : "bg-[#1A1A1A]/80 backdrop-blur-md"
      } border-b border-white/10`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-[#C41E3A] flex items-center justify-between p-2 rounded-sm transform group-hover:rotate-90 transition-transform duration-500">
              <div className="w-1.5 h-full bg-white rounded-full"></div>
              <div className="w-1.5 h-full bg-white rounded-full"></div>
            </div>
            <div>
              <div className="text-white font-black text-xl tracking-tighter">MECPL</div>
              <div className="text-white/40 text-[8px] font-bold tracking-widest uppercase leading-none">
                Millennium Engineers
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-wider uppercase">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="relative group py-2"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 transition-colors ${
                    location.startsWith(link.path) || (link.children?.some(c => location.startsWith(c.path))) ? "text-[#C41E3A]" : "text-white/80 hover:text-white"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                  <ChevronDown size={10} className="opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div
                  className={`absolute top-full left-0 w-52 bg-[#2C2C2C] border border-white/10 shadow-2xl transition-all duration-200 flex flex-col p-2 gap-0.5 ${
                    openDropdown === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link key={child.path} href={child.path} data-testid={`link-nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="block px-4 py-2.5 text-[11px] text-white/70 hover:text-white hover:bg-[#C41E3A] transition-colors cursor-pointer rounded-sm">
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.path} href={link.path} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span
                  className={`transition-colors cursor-pointer ${
                    location === link.path ? "text-[#C41E3A]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            )
          )}
        </nav>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:02066865858" className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors" data-testid="link-phone-nav">
            <Phone size={12} /> 020 6686 5858
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 border border-white/20 hover:border-[#C41E3A] flex items-center justify-center text-white/50 hover:text-[#C41E3A] transition-all rounded-sm"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <Link href="/contact" data-testid="button-contact-nav">
            <span className="bg-[#C41E3A] hover:bg-red-700 text-white text-xs font-black tracking-widest uppercase px-6 py-3 rounded-sm transition-all cursor-pointer shadow-lg shadow-[#C41E3A]/20">
              Enquire Now
            </span>
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 transition-all rounded-sm"
            data-testid="button-theme-toggle-mobile"
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-xl focus:outline-none"
            data-testid="button-hamburger"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-b border-white/10 px-6 py-6 space-y-4 text-sm font-bold uppercase tracking-wider">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.path}>
                <div className="text-white/50 text-xs uppercase tracking-widest font-black mb-2">{link.label}</div>
                {link.children.map((child) => (
                  <Link key={child.path} href={child.path} data-testid={`link-mobile-${child.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="block pl-3 py-2 text-xs text-white/60 hover:text-[#C41E3A] transition-colors cursor-pointer border-l border-white/10 mb-1">
                      {child.label}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={link.path} href={link.path} data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className={`block py-2 text-sm hover:text-[#C41E3A] transition-colors cursor-pointer ${location === link.path ? "text-[#C41E3A]" : "text-white/70"}`}>
                  {link.label}
                </div>
              </Link>
            )
          )}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <a href="tel:02066865858" className="flex items-center gap-2 text-white/50 text-xs">
              <Phone size={12} /> 020 6686 5858
            </a>
            <Link href="/contact">
              <div className="block text-center bg-[#C41E3A] text-white py-3 text-xs font-black tracking-widest uppercase cursor-pointer mt-2">
                Enquire Now
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
