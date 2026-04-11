import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";
import { RequestDemoModal } from "@/components/request-demo-modal";
import { ArrowRight, Shield, Eye, Zap, RefreshCw, BookOpen, BarChart3 } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

export default function Platform() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans dark">
      <Nav onGetInTouch={() => setIsDemoModalOpen(true)} />

      {/* ── Hero ── */}
      <section className="relative pt-44 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            KAFE — Kogniv Agentic AI Factory on NOW
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8"
          >
            A factory model for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">
              continuous AI delivery.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          >
            KAFE is Kogniv's proprietary framework for building, deploying, and continuously improving AI agents on the ServiceNow platform — compressing time-to-value from months to weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              See KAFE in action <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="py-28 border-y border-border/40 bg-card/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="24" cy="24" r="8" />
                    <circle cx="24" cy="8"  r="3" />
                    <circle cx="24" cy="40" r="3" />
                    <circle cx="8"  cy="24" r="3" />
                    <circle cx="40" cy="24" r="3" />
                    <line x1="24" y1="11" x2="24" y2="16" />
                    <line x1="24" y1="32" x2="24" y2="37" />
                    <line x1="11"  y1="24" x2="16"  y2="24" />
                    <line x1="32" y1="24" x2="37" y2="24" />
                  </svg>
                ),
                title: "AI to Build AI",
                body: "AI — not just humans — creates and refines automated processes with human-in-the-loop feedback. The KAFE model uses AI to accelerate the design and build of AI agents themselves, compressing delivery from months to days.",
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
                    <rect x="8" y="8" width="14" height="14" rx="2" />
                    <rect x="26" y="8" width="14" height="14" rx="2" />
                    <rect x="8" y="26" width="14" height="14" rx="2" />
                    <rect x="26" y="26" width="14" height="14" rx="2" />
                  </svg>
                ),
                title: "Iterative or Radical",
                body: "KAFE supports two proven approaches: Iterative — lower risk, use-case-by-use-case delivery — and Radical — full business re-imagination starting with advisory services and design thinking. We match the approach to your enterprise's readiness.",
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="24" cy="16" r="8" />
                    <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" />
                    <path d="M30 34l4 4 8-8" />
                  </svg>
                ),
                title: "Forward Deployment",
                body: "Our AI Agent Design Squad and Development Squads embed directly with your organization — forward-deployed to own the outcome alongside you. Core team members remain engaged throughout every sprint, with flex squads scaled as needed.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-6">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KAFE Components ── */}
      <section className="py-36">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Platform Components</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Everything the factory
              <br />
              <span className="text-muted-foreground font-normal">needs to run at scale.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: BookOpen,
                title: "AI Use Case Assessment",
                description: "Structured framework to identify, score, and prioritize AI automation opportunities. Every use case is evaluated for business impact, technical feasibility, and ROI before a single sprint begins.",
                tags: ["Opportunity scoring", "Design thinking workshops", "ROI model"],
              },
              {
                num: "02",
                icon: Zap,
                title: "Agent Studio",
                description: "ServiceNow's native environment for configuring, testing, and deploying AI agents — with Kogniv's practitioners building inside it daily. Agents are wired to your real data, workflows, and edge cases.",
                tags: ["AI Agent Studio", "ServiceNow-native", "Custom agent config"],
              },
              {
                num: "03",
                icon: BarChart3,
                title: "AI Agents Orchestrator",
                description: "The Orchestrator plans and coordinates a team of AI agents to address complex, multi-step use cases — connecting external agents, internal workflows, and human escalation paths seamlessly.",
                tags: ["Multi-agent coordination", "External agent integration", "Human-in-loop"],
              },
              {
                num: "04",
                icon: Eye,
                title: "AI Control Tower",
                description: "Unified observability across your entire AI agent workforce. Every decision, action, and output is tracked and logged — giving you full transparency, governance, and compliance confidence.",
                tags: ["Agent monitoring", "Audit trails", "Performance dashboards"],
              },
              {
                num: "05",
                icon: RefreshCw,
                title: "Continuous Improvement Loop",
                description: "Subject matter experts flag, refine, and approve agent outputs directly. Feedback loops mean agents get smarter with every interaction — no retraining cycles, no disruption to operations.",
                tags: ["SME feedback", "Real-time refinement", "Self-improving agents"],
              },
              {
                num: "06",
                icon: Shield,
                title: "Enterprise Security & Governance",
                description: "Role-based access control, multi-tenancy, and full data governance baked into every deployment. Built on Claude (Anthropic) and OpenAI models. Your data never trains our base models.",
                tags: ["RBAC", "Data isolation", "Anthropic & OpenAI"],
              },
            ].map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-muted-foreground/50 font-mono">{cap.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-32 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">How KAFE Works</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              From use case to
              <br />
              <span className="text-muted-foreground font-normal">live agent — fast.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-[28px] left-[calc(10%-8px)] right-[calc(10%-8px)] h-px bg-border/60" />
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { num: "01", title: "Intake", body: "Define the business problem and overall goal — incident summarization, HR case creation, knowledge search, or any other use case." },
                { num: "02", title: "Assess", body: "Use case scoring against impact, feasibility, and ROI. Design thinking workshops to refine and sequence the build." },
                { num: "03", title: "Build", body: "Agent Design Squad configures agents in Agent Studio, wired to your data, prompts, flow actions, and scripts." },
                { num: "04", title: "Deploy", body: "Integration testing, Orchestrator configuration, and go-live inside your existing stack — no new interfaces." },
                { num: "05", title: "Improve", body: "AI Control Tower monitors performance. Feedback loops continuously refine agents. The factory keeps churning." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-6 border-2 ${
                    i === 0 ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"
                  }`}>
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-8">
              Ready to see KAFE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                in action?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              We'll walk you through a live demo of the factory model, tailored to your workflows, in 30 minutes.
            </p>
            <Button size="lg" className="rounded-full h-16 px-12 text-lg font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              Request a walkthrough <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
      <RequestDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </div>
  );
}
