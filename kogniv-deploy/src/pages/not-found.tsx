import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground dark px-6">
      <div className="text-center max-w-md">
        <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-6">404</p>
        <h1 className="text-5xl font-bold tracking-tight mb-4">Page not found</h1>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}

