import { Link } from "wouter";
import { KognivLogo } from "@/components/kogniv-logo";

export function PageFooter() {
  return (
    <footer className="py-12 border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/">
          <span className="opacity-75 cursor-pointer"><KognivLogo size="sm" /></span>
        </Link>
        <p className="text-xs text-muted-foreground/50 order-last md:order-none">
          © 2026 Kogniv. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
