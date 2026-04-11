import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Platform from "@/pages/platform";
import About from "@/pages/about";
import Capabilities from "@/pages/capabilities";
import WhatWeDo from "@/pages/what-we-do";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RequestDemoModal } from "@/components/request-demo-modal";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";

const queryClient = new QueryClient();

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/30 font-sans dark">
      <Nav onGetInTouch={() => setIsDemoModalOpen(true)} />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: heroY }} className="w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/75 to-background z-10" />
            <img src="/hero-bg.png" alt="" aria-hidden="true" className="w-full h-full object-cover opacity-50" />
          </motion.div>
        </div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div style={{ opacity: heroOpacity }} className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI Consulting for Business Transformation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[5.5rem] font-bold tracking-tighter leading-[1.05] mb-8"
            >
              We build AI that{" "}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">
                transforms how you work.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light"
            >
              The AI consulting company powered by KAFE — our Agentic AI Factory on ServiceNow. We help enterprises unshackle from legacy systems and fragmented workflows using deep platform expertise and purpose-built AI agents.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
                Work with us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/platform">
                <Button size="lg" variant="outline"
                  className="rounded-full h-14 px-9 text-base bg-white/5 border-border hover:bg-white/10 w-full sm:w-auto"
                >
                  See how we work
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Page Teasers ── */}
      <section className="py-32 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">What we offer</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Built for enterprises that need{" "}
              <span className="text-muted-foreground font-normal">AI that actually works in production.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                eyebrow: "Who we are",
                title: "About Kogniv",
                body: "Founded by proven leaders from Cognizant, IBM, and LTI Mindtree — with strategic partnerships with ServiceNow, Anthropic, and OpenAI. This is who we are.",
                href: "/about",
                cta: "Our story",
              },
              {
                eyebrow: "How we deliver",
                title: "KAFE Platform",
                body: "KAFE — Kogniv Agentic AI Factory on NOW — is our proprietary framework for building, deploying, and continuously improving AI agents. Iterative or radical. Your choice.",
                href: "/platform",
                cta: "Explore KAFE",
              },
              {
                eyebrow: "What we cover",
                title: "Capabilities",
                body: "Autonomous IT, Future of Service Ops, Future of Work, and industry verticals — all on ServiceNow, all production-grade, all built by certified specialists.",
                href: "/capabilities",
                cta: "View capabilities",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex flex-col"
              >
                <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-5">{card.eyebrow}</div>
                <h3 className="text-2xl font-semibold tracking-tight mb-4">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{card.body}</p>
                <Link href={card.href}>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 cursor-pointer">
                    {card.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="py-32 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Outcomes</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What our clients see.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { metric: "70%",        label: "Reduction in manual work",  sub: "across automated workflow areas" },
              { metric: "4×",         label: "Faster process completion", sub: "from days to hours on average" },
              { metric: "Up to $1.5M", label: "Avg. annual savings",      sub: "per engagement in recovered capacity" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-10 rounded-2xl border border-border bg-card/40"
              >
                <div className="text-6xl md:text-7xl font-bold text-primary mb-4 tracking-tight">{stat.metric}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-8">
              "Kogniv rebuilt our entire employee onboarding workflow in eight weeks. What used to take our HR team three days now runs completely hands-free."
            </blockquote>
            <div className="text-sm text-muted-foreground font-medium">
              Chief People Officer — Series C SaaS Company
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
              Let's build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                something together.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Tell us about the workflows slowing your business down.
              We'll map out what AI can do in 30 minutes.
            </p>
            <Button size="lg" className="rounded-full h-16 px-12 text-lg font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              Start a conversation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
      <RequestDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/"             component={Home} />
      <Route path="/about"        component={About} />
      <Route path="/platform"     component={Platform} />
      <Route path="/capabilities" component={Capabilities} />
      <Route path="/what-we-do"   component={WhatWeDo} />
      <Route path="/privacy"      component={Privacy} />
      <Route path="/terms"        component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={base}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
