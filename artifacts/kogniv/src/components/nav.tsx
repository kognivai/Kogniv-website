import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { KognivLogo } from "@/components/kogniv-logo";

interface NavProps {
  onGetInTouch?: () => void;
}

export function Nav({ onGetInTouch }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About",        href: "/about" },
    { label: "Platform",     href: "/platform" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Kogniv Score", href: "/#score", highlight: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-4"
        : "bg-transparent py-7"
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <span className="cursor-pointer"><KognivLogo size="md" /></span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`transition-colors cursor-pointer ${
                (link as any).highlight
                  ? "text-primary font-semibold"
                  : location === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {onGetInTouch && (
          <Button onClick={onGetInTouch} className="rounded-full px-6 text-sm">
            Get in Touch
          </Button>
        )}
      </div>
    </nav>
  );
}
