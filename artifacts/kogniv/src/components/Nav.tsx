import { useState, useEffect } from "react";
import Logo from "./Logo";

const links = [
  { label: "Solutions",  href: "#solutions" },
  { label: "KAFE",      href: "#kafe" },
  { label: "About",     href: "#about" },
  { label: "Platform",  href: "#platform" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map(l => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0F1E]/95 backdrop-blur-md border-b border-[#1E3055]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-[72px]">
          <a href="#">
            <Logo size={36} showWordmark={true} />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                  active === link.href.replace("#", "")
                    ? "bg-white/10 text-white font-medium"
                    : "text-[#8BA4C8] hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#about" className="text-[#8BA4C8] text-sm hover:text-white transition-colors">
              Sign In
            </a>
            <a
              href="#contact"
              className="bg-[#6366F1] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#4F46E5] transition-colors duration-200"
            >
              Request Demo
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0F1E] flex flex-col pt-20 px-8">
          <nav className="flex flex-col gap-2 mt-8">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold text-white py-3 border-b border-[#1E3055] hover:text-[#6366F1] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-[#6366F1] text-white font-semibold px-6 py-3.5 rounded-full text-center text-base hover:bg-[#4F46E5] transition-colors"
            >
              Request Demo
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
