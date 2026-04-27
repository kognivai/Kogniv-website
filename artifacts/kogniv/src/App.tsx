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
import { ArrowRight, Zap, ScanSearch, GitBranch, BarChart3, Wrench } from "lucide-react";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";
import { OpportunityHeatmap } from "@/components/opportunity-heatmap";

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

      {/* HERO */}
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
              ServiceNow AI Transformation Intelligence
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[5.5rem] font-bold tracking-tighter leading-[1.05] mb-8"
            >
              We built the platform that{" "}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">
                finds your AI opportunities first.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light"
            >
              KAFE — Kogniv's Agentic AI Factory — scans your entire ServiceNow environment, scores every workflow for AI readiness, and hands you a prioritised transformation roadmap with ROI projections. Then our team delivers it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
                Work with us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/platform">
                <Button size="lg" variant="outline"
                  className="rounded-full h-14 px-9 text-base bg-white/5 border-border hover:bg-white/10 w-full sm:w-auto"
                >
                  See how KAFE works
                </Button>
              </Link>
            </motion.div>
            {/* Outcome stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/40"
            >
              {[
                { value: "72%", label: "Avg auto-processing rate after transformation" },
                { value: "3 wks", label: "Average ROI payback period" },
                { value: "$649K", label: "Avg annual saving per workflow" },
                { value: "< 5 min", label: "Time to get your KAFE readiness score" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-primary tracking-tight mb-1">{s.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PAGE TEASERS */}
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
                body: "KAFE — Kogniv Agentic AI Factory — is our proprietary intelligence platform. It scans your ServiceNow environment, scores every workflow across 5 dimensions, and generates your transformation roadmap before we write a line of code.",
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
                key={i} {...fadeUp}
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

      {/* KAFE INTELLIGENCE MODULES */}
      <section className="py-32 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-6">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">KAFE Platform</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Five tools.{" "}
              <span className="text-muted-foreground font-normal">One intelligence layer.</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
            KAFE automates what most consulting firms do manually — identifying, scoring, and prioritising AI opportunities across your entire ServiceNow environment. Before the first sprint. Before the first meeting.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                Icon: ScanSearch, name: "Kogniv Simulate", tagline: "Gap signal engine",
                body: "Tune 8 gap signal sliders or connect your ServiceNow instance. KAFE returns a composite AI readiness score across 5 weighted dimensions — Automation Potential, Business Impact, AI Complexity, Data Availability, and Implementation Effort.",
                tags: ["5-dimension scoring", "P0–P3 prioritisation", "Platform recommendation"],
              },
              {
                Icon: Zap, name: "Kogniv Studio", tagline: "Live ServiceNow import",
                body: "Connect your ServiceNow instance via REST API. KAFE browses every flow, process, and catalog item and runs the full scoring engine against each — returning your complete AI opportunity portfolio in minutes.",
                tags: ["REST API scan", "Flows · Processes · Catalog", "Live environment analysis"],
              },
              {
                Icon: GitBranch, name: "Kogniv Transform", tagline: "Workflow diagram studio",
                body: "Current-state node maps with gap coding and target-state AI-enabled designs, side-by-side. Every node is clickable and fires a Claude-powered analysis of that specific automation gap and its NOW Assist replacement.",
                tags: ["Current vs target diagrams", "NOW Assist capability mapping", "Node-level gap analysis"],
              },
              {
                Icon: Wrench, name: "Kogniv Workbench", tagline: "Step-by-step implementation",
                body: "Four-phase implementation guide — Configuration, Training data, Testing, Cutover — with exact ServiceNow code snippets, shadow mode protocols, rollout percentages, and a progress tracker for every step.",
                tags: ["Implementation checklists", "Config code templates", "Shadow mode guidance"],
              },
              {
                Icon: BarChart3, name: "Kogniv Score", tagline: "Free public ROI calculator",
                body: "Paste your ServiceNow instance URL — no account required. Get composite scores, tier rankings, platform recommendations, and estimated ROI for every workflow in under 5 minutes.",
                tags: ["No sign-up required", "Full gap report", "ROI + payback estimate"],
              },
              {
                Icon: ArrowRight, name: "See KAFE in action", tagline: "30-minute live walkthrough",
                body: "We'll run KAFE against your actual ServiceNow environment and walk through your top 3 Quick Win workflows — with scoring, platform recommendations, and implementation roadmap. Live. In 30 minutes.",
                tags: ["Live on your instance", "Your top 3 Quick Wins", "Implementation roadmap"],
                isCTA: true,
              },
            ].map((mod, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
                  (mod as any).isCTA
                    ? "border-primary/40 bg-primary/5 hover:bg-primary/8 cursor-pointer"
                    : "border-border bg-card hover:border-primary/40"
                }`}
                onClick={(mod as any).isCTA ? () => setIsDemoModalOpen(true) : undefined}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-5">
                  <mod.Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary/60 tracking-[0.14em] uppercase mb-1">{mod.tagline}</div>
                <h3 className="text-lg font-semibold mb-3">{mod.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{mod.body}</p>
                <div className="flex flex-wrap gap-2">
                  {mod.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL WORKFLOW OUTCOMES */}
      <section className="py-32 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-6">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">KAFE in action</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Real workflows.{" "}
              <span className="text-muted-foreground font-normal">Real transformations.</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
            Actual ServiceNow workflow analyses from KAFE — exact node counts, real ROI figures, and the specific NOW Assist capabilities that replace each manual gap.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                workflow: "Incident Management", domain: "ITSM · sys_incident",
                score: "7.3", tier: "P1 — High Value",
                before: "14 nodes · 10 automation gaps · 4.2h avg approval wait",
                after: "9 nodes · 72% auto-processed · routing time < 45 sec",
                caps: ["Predictive Intelligence", "Auto-Approve Gate", "GenAI Summarise"],
                saving: "$649K", payback: "3 wks",
              },
              {
                workflow: "Change Advisory Pre-Check", domain: "ITSM · change_request",
                score: "9.1", tier: "P0 — Quick Win",
                before: "8 nodes · 68% of CAB approvals unchanged · avg 2-day wait",
                after: "5 nodes · 62% auto-approved · standard changes bypass CAB",
                caps: ["PI Risk Scoring", "Auto-Approve Standard", "GenAI CAB Summary"],
                saving: "$412K", payback: "4 wks",
              },
              {
                workflow: "HR Onboarding", domain: "HR · sn_hr_core_case",
                score: "8.8", tier: "P0 — Quick Win",
                before: "9 nodes · M365 + AD + Workday all manual · 3-day avg",
                after: "6 nodes · 78% automated · Day 1 ready in < 2 hours",
                caps: ["Teams Adaptive Card", "AI Builder Verify", "Copilot Personalised"],
                saving: "$280K", payback: "9 wks",
              },
            ].map((wf, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl border border-border bg-card flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="text-xs font-bold text-primary/60 tracking-[0.14em] uppercase mb-1">{wf.domain}</div>
                    <h3 className="text-lg font-semibold">{wf.workflow}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{wf.score}</div>
                    <div className="text-xs text-muted-foreground">{wf.tier}</div>
                  </div>
                </div>
                <div className="space-y-3 mb-5 flex-1">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/15">
                    <div className="text-xs font-bold text-red-400/70 uppercase tracking-wider mb-1">Current state</div>
                    <p className="text-sm text-muted-foreground">{wf.before}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-1">After KAFE</div>
                    <p className="text-sm text-muted-foreground">{wf.after}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {wf.caps.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary/80">{c}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <div>
                    <div className="text-xl font-bold text-primary">{wf.saving}</div>
                    <div className="text-xs text-muted-foreground">annual saving</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">{wf.payback}</div>
                    <div className="text-xs text-muted-foreground">payback</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-32 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Outcomes</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What our clients see.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "70%",         label: "Reduction in manual work",  sub: "across automated workflow areas" },
              { metric: "4×",          label: "Faster process completion", sub: "from days to hours on average" },
              { metric: "Up to $1.5M", label: "Avg. annual savings",       sub: "per engagement in recovered capacity" },
            ].map((stat, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-10 rounded-2xl border border-border bg-card/40"
              >
                <div className="text-6xl md:text-7xl font-bold text-primary mb-4 tracking-tight">{stat.metric}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KOGNIV SCORE — HEATMAP + CTA */}
      <section id="score" className="py-32 border-b border-border/40 bg-primary/4">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div {...fadeUp} className="mb-6">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Kogniv Score · Free · No sign-up · 5 minutes</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl">
              AI Workflow Transformation Opportunity{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                Heatmap by Domain
              </span>{" "}
              <span className="text-muted-foreground font-normal">across the NOW Platform.</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
            KAFE scores every ServiceNow workflow across 5 dimensions — Automation Potential, Business Impact, AI Complexity, Data Availability, and Implementation Effort — and maps them by domain. Click any cell to see the transformation detail and ROI projection.
          </motion.p>

          {/* Heatmap */}
          <motion.div {...fadeUp} className="p-8 rounded-2xl border border-border bg-card">
            <OpportunityHeatmap />
          </motion.div>

          {/* CTA below heatmap */}
          <motion.div {...fadeUp} className="mt-12 text-center">
            <p className="text-muted-foreground mb-6 text-lg">
              See what KAFE finds in <span className="text-foreground font-semibold">your</span> ServiceNow environment — composite scores, P0–P3 rankings, platform recommendations, and ROI for every workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
                Get my free Kogniv Score <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/platform">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-9 text-base bg-white/5 border-border hover:bg-white/10 w-full sm:w-auto">
                  See how KAFE works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
              Let's build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">something together.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Tell us about the workflows slowing your business down. We'll run KAFE against your environment and map out your AI transformation in 30 minutes.
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
