import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";
import { RequestDemoModal } from "@/components/request-demo-modal";
import { ArrowRight, Shield, Eye, Zap, RefreshCw, BookOpen, BarChart3, ScanSearch, GitBranch, Wrench, Brain } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

export default function Platform() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans dark">
      <Nav onGetInTouch={() => setIsDemoModalOpen(true)} />

      {/* Hero */}
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
            KAFE — Kogniv Agentic AI Factory for Enterprises
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
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-5"
          >
            KAFE is Kogniv's proprietary framework for building, deploying, and continuously improving AI agents on the ServiceNow platform — compressing time-to-value from months to weeks.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground/75 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            KAFE's intelligence layer scans your entire ServiceNow environment — every flow, process, and catalog item — scoring each one across five dimensions and returning a prioritised transformation roadmap with ROI projections before the first sprint begins.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              See KAFE in action <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline"
              className="rounded-full h-14 px-9 text-base bg-white/5 border-border hover:bg-white/10"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Get my free Kogniv Score
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-28 border-y border-border/40 bg-card/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="24" cy="24" r="8" /><circle cx="24" cy="8" r="3" /><circle cx="24" cy="40" r="3" />
                    <circle cx="8" cy="24" r="3" /><circle cx="40" cy="24" r="3" />
                    <line x1="24" y1="11" x2="24" y2="16" /><line x1="24" y1="32" x2="24" y2="37" />
                    <line x1="11" y1="24" x2="16" y2="24" /><line x1="32" y1="24" x2="37" y2="24" />
                  </svg>
                ),
                title: "AI to Build AI",
                body: "AI — not just humans — creates and refines automated processes with human-in-the-loop feedback. The KAFE model uses AI to accelerate the design and build of AI agents themselves, compressing delivery from months to days.",
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
                    <rect x="8" y="8" width="14" height="14" rx="2" /><rect x="26" y="8" width="14" height="14" rx="2" />
                    <rect x="8" y="26" width="14" height="14" rx="2" /><rect x="26" y="26" width="14" height="14" rx="2" />
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
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                <div className="mb-6">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KAFE Intelligence Modules */}
      <section className="py-36">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-6">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Intelligence Layer</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Five modules that automate
              <br />
              <span className="text-muted-foreground font-normal">what others do manually.</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
            Before a single sprint begins, KAFE's scoring engine has already scanned your ServiceNow environment, ranked every workflow by AI readiness, and produced the implementation roadmap. These are the five modules that make it happen.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[
              {
                Icon: ScanSearch, num: "01", name: "Kogniv Simulate", tagline: "Gap signal engine",
                body: "Tune 8 gap signal sliders or connect your ServiceNow instance live. KAFE computes a composite AI readiness score across 5 weighted dimensions — Automation Potential (×0.30), Business Impact (×0.25), AI Complexity (×0.20), Data Availability (×0.15), Implementation Effort (×0.10) — and recommends the right platform for each workflow.",
                tags: ["5-dimension scoring", "P0–P3 prioritisation", "NOW Assist / Power Automate / Salesforce rec."],
              },
              {
                Icon: Zap, num: "02", name: "Kogniv Studio", tagline: "Live ServiceNow import",
                body: "Connect your ServiceNow instance via REST API. KAFE browses every flow, process, and catalog item in sys_hub_flow, wf_workflow, and sc_cat_item — running the full scoring engine against each one and returning your complete AI opportunity portfolio in minutes.",
                tags: ["REST API scan", "Flows · Processes · Catalog", "Live environment", "Business rules analysis"],
              },
              {
                Icon: GitBranch, num: "03", name: "Kogniv Transform", tagline: "Workflow diagram studio",
                body: "Side-by-side current-state and AI-enabled target workflow diagrams for any ServiceNow workflow. Every node is colour-coded by gap signal weight. Every gap node is clickable and fires a Claude-powered analysis of that specific automation opportunity and its NOW Assist replacement.",
                tags: ["Current vs target diagrams", "Node-level gap analysis", "NOW Assist capability mapping", "ROI per workflow"],
              },
              {
                Icon: Wrench, num: "04", name: "Kogniv Workbench", tagline: "Step-by-step implementation",
                body: "Four-phase implementation guide — Configuration, Training data, Testing, Cutover — with exact ServiceNow code snippets, shadow mode protocols, rollout percentages, and a progress tracker. Every step is pre-populated from the KAFE scan output.",
                tags: ["Config code templates", "Shadow mode guidance", "Rollout checklist", "Progress tracking"],
              },
              {
                Icon: BarChart3, num: "05", name: "Kogniv Score", tagline: "Free public ROI calculator",
                body: "The fastest path to a KAFE analysis. Paste your ServiceNow instance URL — no account required. Get composite scores, P0–P3 tier rankings, platform recommendations, and estimated ROI for every workflow in under 5 minutes. Every Score result is a complete gap report ready to present to your CIO.",
                tags: ["No sign-up required", "Full gap report", "ROI + payback estimate", "CIO-ready output"],
              },
              {
                Icon: Brain, num: "06", name: "KAFE Playbook Generator", tagline: "AI-written transformation playbooks",
                body: "Generate a complete, board-ready transformation playbook for any workflow in seconds. Powered by Claude (Anthropic), the playbook covers executive summary, current state assessment, AI target architecture, phased implementation, risk register, success KPIs, and 3-year NPV at 8%.",
                tags: ["Claude-powered", "Board-ready output", "Risk register", "3-year NPV model"],
              },
            ].map((mod, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-muted-foreground/50 font-mono">{mod.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <mod.Icon className="h-5 w-5 text-primary" />
                  </div>
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

      {/* Platform Components (Factory Engine) */}
      <section className="py-32 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Factory Engine</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Everything the factory
              <br />
              <span className="text-muted-foreground font-normal">needs to run at scale.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01", icon: BookOpen,
                title: "AI Use Case Assessment",
                description: "KAFE's scoring engine connects directly to your ServiceNow instance via REST API and analyses every flow, workflow, and catalog item automatically — no workshops, no manual inventory. Each workflow scored across 5 dimensions. Output: composite score 0–10, P0/P1/P2/P3 priority tier, platform recommendation, and ROI estimate — before a single sprint begins.",
                tags: ["5-dimension AI scoring", "Automated workflow scan", "P0–P3 tiers", "Platform recommendation", "ROI projection"],
              },
              {
                num: "02", icon: Zap,
                title: "Agent Studio",
                description: "ServiceNow's native environment for configuring, testing, and deploying AI agents — with Kogniv's practitioners building inside it daily. Before agents are built, KAFE Transform generates side-by-side current-state and AI-enabled target diagrams — every agent built against a documented, approved design.",
                tags: ["AI Agent Studio", "ServiceNow-native", "Custom agent config", "KAFE Transform diagrams"],
              },
              {
                num: "03", icon: BarChart3,
                title: "AI Agents Orchestrator",
                description: "Plans and coordinates a team of AI agents to address complex, multi-step use cases — connecting external agents, internal workflows, and human escalation paths seamlessly. Handles fallback routing, confidence gating, and multi-agent handoffs.",
                tags: ["Multi-agent coordination", "External agent integration", "Human-in-loop", "Confidence gating"],
              },
              {
                num: "04", icon: Eye,
                title: "AI Control Tower",
                description: "Unified observability across your entire AI agent workforce. Every decision, action, and output tracked and logged — full transparency, governance, and compliance confidence. Real-time dashboards, alert thresholds, and automated retraining triggers built in.",
                tags: ["Agent monitoring", "Audit trails", "Performance dashboards", "Auto-retrain triggers"],
              },
              {
                num: "05", icon: RefreshCw,
                title: "Continuous Improvement Loop",
                description: "Subject matter experts flag, refine, and approve agent outputs directly. Feedback loops mean agents get smarter with every interaction — no retraining cycles, no disruption. Monthly accuracy reviews and model refresh cadence built into every engagement.",
                tags: ["SME feedback", "Real-time refinement", "Self-improving agents", "Monthly accuracy review"],
              },
              {
                num: "06", icon: Shield,
                title: "Enterprise Security & Governance",
                description: "RBAC, multi-tenancy, and full data governance baked into every deployment. Built on Claude (Anthropic) and OpenAI. Kogniv is an Anthropic strategic partner — enterprise SLAs, dedicated capacity, joint solution architecture. Your data never trains our base models.",
                tags: ["RBAC", "Data isolation", "Anthropic strategic partner", "OpenAI", "SOC-2 ready"],
              },
            ].map((cap, i) => (
              <motion.div
                key={i} {...fadeUp}
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
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 border-b border-border/40">
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
                { num: "01", title: "Intake", body: "Define the business problem and overall goal — incident summarisation, HR case creation, knowledge search, or any use case." },
                { num: "02", title: "Assess", body: "KAFE's scoring engine scans your ServiceNow environment automatically — composite scores, P0–P3 tiers, and platform recommendations for every workflow. Design thinking workshops sequence the build. Sprint planning starts with your Quick Wins already known." },
                { num: "03", title: "Build", body: "Agent Design Squad configures agents in Agent Studio, wired to your data, prompts, flow actions, and scripts. KAFE Transform diagrams guide every design decision." },
                { num: "04", title: "Deploy", body: "Integration testing, Orchestrator configuration, and go-live inside your existing stack — no new interfaces. Phased rollout from 10% → 50% → 100% with automated rollback triggers." },
                { num: "05", title: "Improve", body: "AI Control Tower monitors performance. Monthly accuracy reviews. Feedback loops continuously refine agents. The factory keeps churning." },
              ].map((step, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
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

      {/* Kogniv Score CTA */}
      <section className="py-24 bg-primary/4 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Free · No sign-up · 5 minutes</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              See what KAFE finds in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">your environment.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Paste your ServiceNow instance URL and read-only credentials. KAFE's scoring engine scans every flow, process, and catalog item — returning composite AI readiness scores, P0–P3 tiers, platform recommendations, and estimated ROI for each one. No sign-up. No consultant call. Just your score.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
                Get my free Kogniv Score <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-9 text-base bg-white/5 border-border hover:bg-white/10" onClick={() => setIsDemoModalOpen(true)}>
                Or request a live walkthrough
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-8">
              Ready to see KAFE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">in action?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              We'll walk you through a live demo of the factory model — KAFE running against your actual ServiceNow environment — in 30 minutes.
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
