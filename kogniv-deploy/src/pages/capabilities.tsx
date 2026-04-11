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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans dark">
      <Nav onGetInTouch={() => setIsDemoModalOpen(true)} />

      {/* ── Hero ── */}
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
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            We power enterprises across four transformation pillars — built on ServiceNow, with Anthropic and OpenAI at the model layer.
          </motion.p>
        </div>
      </section>

      {/* ── Four Offering Areas ── */}
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
                description: "Modernize ITSM with AI-native operations that reduce manual ticketing, predict failures before they happen, and make your IT team dramatically more effective.",
                items: ["ITSM Modernization", "Intelligent CMDB", "NOW Assist", "Intelligent ITAM", "AIOps & Predictive Intelligence", "Risk & Security Operations"],
              },
              {
                area: "Future of Work",
                tagline: "One universal agent for every employee and customer need.",
                description: "A single AI Assist that routes every employee and customer request — from HR cases and IT incidents to service catalog orders — automatically, across Slack, Teams, and email.",
                items: ["Universal Employee Agent", "AI Powered Customer Workflows", "Self-service automation", "HR case & approval automation", "Multi-lingual NLU/NLP", "Proactive support & notifications"],
              },
            ].map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold">{cap.area}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 mt-1" />
                </div>
                <p className="text-primary text-sm font-semibold mb-4">{cap.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">
                      {item}
                    </span>
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
                description: "Deep implementation and transformation across the full ServiceNow suite — with AI infused at every layer: agents, knowledge, workflows, and governance.",
                items: ["ServiceNow Delivery", "Symphony AI & Agent Orchestration", "AI Control Tower", "Observability & Governance", "GRC & Compliance Frameworks", "Knowledge Graph & Enterprise Search"],
              },
              {
                area: "Industry Verticals",
                tagline: "Proven patterns for HCLS and BFSI — deployed fast.",
                description: "Pre-built industry frameworks and AI workflow patterns tuned for Healthcare & Life Sciences and Banking, Financial Services & Insurance — capturing best practices from day one.",
                items: ["HC Claims Exception Management", "Patient 360", "Financial Service Operations", "Regulatory alignment", "Change request prediction", "Audit trails & risk controls"],
              },
            ].map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold">{cap.area}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 mt-1" />
                </div>
                <p className="text-primary text-sm font-semibold mb-4">{cap.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Agents ── */}
      <section className="py-24 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Platform Expertise</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              One platform.{" "}
              <span className="text-muted-foreground font-normal">Every enterprise persona.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                agent: "Employee Assist",
                description: "Handles employee requests, HR cases, IT issues, and service catalog orders — through Slack, Teams, or email. Reduces manual ticketing to near zero.",
              },
              {
                agent: "IT Agent Assist",
                description: "Provides IT support teams with real-time incident summarization, related KB articles, resolution suggestions, and automated ticket creation.",
              },
              {
                agent: "HR Assist",
                description: "Automates HR case creation, routing, approvals, and employee communications — delivering seamless employee experiences at scale.",
              },
              {
                agent: "Knowledge Assist",
                description: "Creates accurate knowledge articles, SOPs, and resolution steps from historical data — continuously optimizing your knowledge database.",
              },
              {
                agent: "Customer Assist",
                description: "Handles customer cases across channels with NLU/NLP capability, multilingual support, and intelligent routing to reduce resolution time.",
              },
              {
                agent: "Enterprise Search",
                description: "AI-powered search and summarization across all enterprise knowledge sources — ServiceNow, Confluence, SharePoint, and more.",
              },
            ].map((agent, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl border border-border bg-background hover:border-primary/40 hover:bg-card/60 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 mb-5" />
                <h3 className="text-lg font-semibold mb-3">{agent.agent}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Integrations</div>
            <p className="text-muted-foreground">Works inside the tools your teams already use</p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-4">
            {["Slack", "Microsoft Teams", "ServiceNow", "Workday", "Salesforce", "Email", "Anthropic Claude", "OpenAI"].map((tool) => (
              <span key={tool} className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground">
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-36 bg-card/20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Our Engagement Model</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Four steps to AI that works.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-[28px] left-[calc(12.5%-8px)] right-[calc(12.5%-8px)] h-px bg-border/60" />
            <div className="grid md:grid-cols-4 gap-12 md:gap-8">
              {[
                { num: "01", title: "Discover", body: "We audit your ServiceNow environment and identify the highest-ROI AI opportunities with automated scanning and expert analysis.", active: true },
                { num: "02", title: "Design", body: "AI use case workshops, agent architecture design, and a phased roadmap aligned to your budget and timeline." },
                { num: "03", title: "Deploy", body: "KAFE factory model builds, tests, and launches AI agents in production — embedded with your team throughout." },
                { num: "04", title: "Sustain", body: "Continuous agent improvement, feedback loop management, and monitoring through AI Control Tower." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-8 border-2 ${
                    step.active ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"
                  }`}>
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.body}</p>
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
              Let's map what<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                AI can do for you.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Tell us your biggest workflow bottleneck. We'll show you exactly how we'd automate it.
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
