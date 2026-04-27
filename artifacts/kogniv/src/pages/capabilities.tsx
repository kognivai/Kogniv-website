import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";
import { RequestDemoModal } from "@/components/request-demo-modal";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

export default function Capabilities() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans dark">
      <Nav onGetInTouch={() => setIsDemoModalOpen(true)} />

      {/* Hero */}
      <section className="relative pt-44 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Capabilities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8 max-w-4xl"
          >
            Platform expertise.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">
              Enterprise outcomes.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-5"
          >
            We power enterprises across four transformation pillars — built on ServiceNow, with KAFE as the intelligence layer that scores, prioritises, and delivers every use case.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground/75 max-w-2xl leading-relaxed"
          >
            Every capability below is backed by KAFE's scoring engine — meaning we don't start from a blank whiteboard. We start from a ranked list of your highest-ROI AI opportunities, already scored and sequenced before day one.
          </motion.p>
        </div>
      </section>

      {/* Four Offering Areas */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Our Hero Offerings</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-xl">
              Four pillars.{" "}
              <span className="text-muted-foreground font-normal">Delivering end-to-end transformation.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              {
                area: "Autonomous IT",
                tagline: "Self-healing IT operations powered by AI.",
                description: "Modernize ITSM with AI-native operations that reduce manual ticketing, predict failures before they happen, and make your IT team dramatically more effective. KAFE scores every incident, change, and problem workflow — identifying which ones are P0 Quick Wins for NOW Assist Predictive Intelligence versus which need deeper orchestration.",
                items: ["ITSM Modernization", "Intelligent CMDB", "NOW Assist Predictive Intelligence", "Intelligent ITAM", "AIOps & Event Correlation", "Risk & Security Operations"],
                kafe: "KAFE avg score for ITSM workflows: 8.4/10",
              },
              {
                area: "Future of Work",
                tagline: "One universal agent for every employee and customer need.",
                description: "A single AI Assist that routes every employee and customer request — from HR cases and IT incidents to service catalog orders — automatically, across Slack, Teams, and email. KAFE identifies which approval gates, decision nodes, and static notifications across your HR and catalog workflows are ready for automation today.",
                items: ["Universal Employee Agent", "AI Powered Customer Workflows", "Self-service automation", "HR case & approval automation", "Multi-lingual NLU/NLP", "Proactive support & notifications"],
                kafe: "HR onboarding avg payback: 9 weeks",
              },
            ].map((cap, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold">{cap.area}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 mt-1" />
                </div>
                <p className="text-primary text-sm font-semibold mb-4">{cap.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-5">{cap.description}</p>
                <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-primary/6 border border-primary/15 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-xs font-mono text-primary/70">{cap.kafe}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                area: "Enterprise Service Management",
                tagline: "ServiceNow as the intelligence layer of your business.",
                description: "Deep implementation and transformation across the full ServiceNow suite — with AI infused at every layer: agents, knowledge, workflows, and governance. KAFE's orchestrator connects external agents, internal workflows, and human escalation paths into a single coordinated intelligence layer.",
                items: ["ServiceNow Implementation & Delivery", "Symphony AI & Agent Orchestration", "AI Control Tower", "Observability & Governance", "GRC & Compliance Frameworks", "Knowledge Graph & Enterprise Search"],
                kafe: "Change Advisory avg score: 9.1/10 — P0 Quick Win",
              },
              {
                area: "Industry Verticals",
                tagline: "Proven patterns for HCLS and BFSI — deployed fast.",
                description: "Pre-built industry frameworks and AI workflow patterns tuned for Healthcare & Life Sciences and Banking, Financial Services & Insurance. KAFE identifies domain-specific automation opportunities and pre-populates the scoring model with HCLS and BFSI workflow signatures from day one.",
                items: ["HC Claims Exception Management", "Patient 360 workflows", "Financial Service Operations", "Regulatory compliance & audit", "Change request prediction", "Audit trails & risk controls"],
                kafe: "HCLS and BFSI workflow library: 40+ pre-scored patterns",
              },
            ].map((cap, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold">{cap.area}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 mt-1" />
                </div>
                <p className="text-primary text-sm font-semibold mb-4">{cap.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-5">{cap.description}</p>
                <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-primary/6 border border-primary/15 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-xs font-mono text-primary/70">{cap.kafe}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents */}
      <section className="py-24 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">AI Agent Roster</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              One platform.{" "}
              <span className="text-muted-foreground font-normal">Every enterprise persona.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                agent: "Employee Assist",
                score: "8.9",
                tier: "P0",
                description: "Handles employee requests, HR cases, IT issues, and service catalog orders — through Slack, Teams, or email. Reduces manual ticketing to near zero. KAFE scores this as the highest-ROI first deployment for most enterprises.",
              },
              {
                agent: "IT Agent Assist",
                score: "8.4",
                tier: "P0",
                description: "Provides IT support teams with real-time incident summarisation, related KB articles, resolution suggestions, and automated ticket creation. Predictive Intelligence routes before a human sees it.",
              },
              {
                agent: "HR Assist",
                score: "8.8",
                tier: "P0",
                description: "Automates HR case creation, routing, approvals, and employee communications — delivering seamless employee experiences at scale. Connected to Workday, Active Directory, and M365 natively.",
              },
              {
                agent: "Knowledge Assist",
                score: "6.2",
                tier: "P1",
                description: "Creates accurate knowledge articles, SOPs, and resolution steps from historical data — continuously optimising your knowledge database. GenAI Summarise drafts articles from incident resolutions automatically.",
              },
              {
                agent: "Customer Assist",
                score: "8.5",
                tier: "P0",
                description: "Handles customer cases across channels with NLU/NLP capability, multilingual support, and intelligent routing to reduce resolution time. Virtual Agent deflects 25–30% before cases enter the flow.",
              },
              {
                agent: "Enterprise Search",
                score: "5.9",
                tier: "P2",
                description: "AI-powered search and summarisation across all enterprise knowledge sources — ServiceNow, Confluence, SharePoint, and more. AI Search surfaces relevant articles to agents before ticket creation.",
              },
            ].map((agent, i) => (
              <motion.div
                key={i} {...fadeUp}
                transition={{ duration: 0.65, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl border border-border bg-background hover:border-primary/40 hover:bg-card/60 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20" />
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{agent.score}</div>
                    <div className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      agent.tier === "P0" ? "bg-teal-500/10 text-teal-400" : "bg-primary/10 text-primary/70"
                    }`}>{agent.tier}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{agent.agent}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp} className="text-sm text-muted-foreground/60 mt-8 text-center font-mono">
            Scores shown are KAFE composite AI readiness scores from representative ServiceNow environments. Your scores will vary based on workflow complexity and data volume.
          </motion.p>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Integrations</div>
            <p className="text-muted-foreground">Works inside the tools your teams already use. KAFE's data gravity analysis determines which platform is right for each workflow.</p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-4">
            {[
              "Slack", "Microsoft Teams", "ServiceNow", "Workday", "Salesforce",
              "SAP", "Active Directory", "M365 / SharePoint", "Email",
              "Anthropic Claude", "OpenAI", "PagerDuty",
            ].map((tool) => (
              <span key={tool} className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground">
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* KAFE-powered Engagement Model */}
      <section className="py-36 bg-card/20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">KAFE-Powered Engagement Model</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Four steps to AI that works.
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Unlike traditional consulting engagements, KAFE means step one isn't discovery — it's already done. You arrive at the first meeting with your AI readiness scores, Quick Win list, and platform recommendations in hand.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-[28px] left-[calc(12.5%-8px)] right-[calc(12.5%-8px)] h-px bg-border/60" />
            <div className="grid md:grid-cols-4 gap-12 md:gap-8">
              {[
                {
                  num: "01", title: "Discover", active: true,
                  body: "KAFE's scoring engine connects to your ServiceNow instance and scans every flow, process, and catalog item automatically. You receive composite AI readiness scores, P0–P3 rankings, platform recommendations, and ROI estimates — before the first workshop.",
                  kafe: "KAFE Score: automated in < 5 min",
                },
                {
                  num: "02", title: "Design", active: false,
                  body: "AI use case workshops sequence and refine your P0 Quick Wins. Agent architecture designed using KAFE Transform diagrams — current-state and AI-enabled target node maps that make the design tangible and approvable.",
                  kafe: "KAFE Transform: current → target diagrams",
                },
                {
                  num: "03", title: "Deploy", active: false,
                  body: "KAFE factory model builds, tests, and launches AI agents in production — embedded with your team throughout. Phased rollout (10% → 50% → 100%) with automated rollback triggers and shadow mode validation.",
                  kafe: "KAFE Workbench: phase-by-phase guide",
                },
                {
                  num: "04", title: "Sustain", active: false,
                  body: "Continuous agent improvement, feedback loop management, and monitoring through AI Control Tower. Monthly accuracy reviews, automated retraining triggers, and a self-improving agent workforce.",
                  kafe: "KAFE Control Tower: live monitoring",
                },
              ].map((step, i) => (
                <motion.div
                  key={i} {...fadeUp}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-8 border-2 ${
                    step.active ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"
                  }`}>
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4 flex-1">{step.body}</p>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/6 border border-primary/15 w-fit">
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    <span className="text-xs font-mono text-primary/70">{step.kafe}</span>
                  </div>
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
              Find out which of these capabilities{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">apply to your workflows.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Run a free Kogniv Score on your ServiceNow instance. KAFE will tell you which of the four pillars has the highest-ROI opportunities in your environment — ranked, scored, and with a platform recommendation for each one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
                Get my free Kogniv Score <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-9 text-base bg-white/5 border-border hover:bg-white/10" onClick={() => setIsDemoModalOpen(true)}>
                Book a 30-min walkthrough
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-8">
              Let's map what
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                AI can do for you.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Tell us your biggest workflow bottleneck. We'll run KAFE against your environment and show you exactly how we'd automate it — in 30 minutes.
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
