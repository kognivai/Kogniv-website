import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { KognivLogo } from "@/components/kogniv-logo";
import { Menu, X } from "lucide-react";

interface NavProps {
  onGetInTouch: () => void;
}

export function Nav({ onGetInTouch }: NavProps) {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [location]                    = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { label: "About",        href: "/about" },
    { label: "What we do",   href: "/what-we-do" },
    { label: "Platform",     href: "/platform" },
    { label: "Capabilities", href: "/capabilities" },
  ];

  return (
    <>
      <nav
        data-testid="main-nav"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || mobileOpen
            ? "bg-background/95 backdrop-blur-xl border-b border-border/60 py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/">
            <span className="cursor-pointer"><KognivLogo size="md" /></span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`transition-colors cursor-pointer ${
                  location === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={onGetInTouch} className="hidden md:inline-flex rounded-full px-6 text-sm">
              Get in Touch
            </Button>
            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col pt-24 px-8 pb-10 md:hidden"
          data-testid="mobile-menu"
        >
          <nav className="flex flex-col gap-1 flex-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`block py-4 text-2xl font-semibold tracking-tight border-b border-border/30 cursor-pointer transition-colors ${
                  location === link.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <Button
            size="lg"
            className="rounded-full w-full mt-8 text-base"
            onClick={() => { setMobileOpen(false); onGetInTouch(); }}
          >
            Get in Touch
          </Button>
        </div>
      )}
    </>
  );
}
