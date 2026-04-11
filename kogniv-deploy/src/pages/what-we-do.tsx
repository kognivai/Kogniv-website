import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";
import { RequestDemoModal } from "@/components/request-demo-modal";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

const practiceAreas = [
  {
    tag: "Foundation",
    title: "AI Platform Architecture & Governance",
    body: "Platform strategy, CMDB design, AIOps, and AI readiness — architecting the ServiceNow foundation your AI programs need to scale. Every engagement starts here.",
    items: ["Platform health assessment", "CMDB design & governance", "AI readiness roadmap", "AIOps enablement", "Architecture design authority"],
  },
  {
    tag: "Our IP",
    title: "KAFE — Agentic AI Factory on NOW",
    body: "Kogniv's proprietary factory model for building, deploying, and continuously improving AI agents on ServiceNow. Iterative or radical — we match the approach to your transformation stage.",
    items: ["AI use case assessment & scoring", "Agent Studio configuration", "AI Agents Orchestrator", "AI Control Tower & monitoring", "Continuous agent improvement loop"],
  },
  {
    tag: "Core Platform",
    title: "ITSM · ITOM · ITAM · SPM",
    body: "Integrated visibility, spend control, and portfolio governance on ServiceNow. Modernizing your platform core so it's ready for the AI layer on top.",
    items: ["ITSM modernization", "Intelligent CMDB", "IT Asset Management", "Service Portfolio Management", "Enterprise architecture alignment"],
  },
  {
    tag: "Workflows",
    title: "Employee & Customer Workflows",
    body: "AI agents that replace manual ticketing across Slack, Teams, ServiceNow, Workday, and email — for every employee and customer persona in your organization.",
    items: ["Employee Assist & IT Agent Assist", "HR Assist & HR case automation", "Customer Assist & CSM", "Knowledge Assist & Enterprise Search", "Multi-lingual NLU/NLP support"],
  },
];

const industries = [
  {
    name: "Healthcare & Life Sciences",
    short: "HCLS",
    description: "Governance-first, compliance-aligned.",
    items: [
      "HC Claims Exception Management",
      "Patient 360 workflows",
      "Clinical operations automation",
      "Regulatory compliance & audit workflows",
      "AI-powered risk and resilience ops",
    ],
  },
  {
    name: "Banking & Financial Services",
    short: "BFSI",
    description: "AI-native banking and insurance ops.",
    items: [
      "Financial risk & compliance workflows",
      "Operational resilience & SecOps",
      "Spend visibility and control",
      "FNOL and claims automation",
      "Enterprise architecture modernization",
    ],
  },
];

const deliveryPhases = [
  {
    num: "01",
    title: "Strategy & Architecture",
    description: "Every engagement starts with a deep platform and AI readiness assessment — not a sales pitch.",
    items: [
      "Platform health assessment (4–8 weeks)",
      "Architecture design authority",
      "AI readiness & CMDB governance",
      "Roadmap & prioritization",
      "Value engineering & business case",
    ],
  },
  {
    num: "02",
    title: "Build & Deploy (KAFE)",
    description: "Our factory model compresses AI agent delivery from months to weeks — with your team embedded throughout.",
    items: [
      "AI use case design workshops",
      "Agent Studio & Orchestrator build",
      "Integrations & data configuration",
      "AI automation enablement",
      "Testing, QA & production go-live",
    ],
  },
  {
    num: "03",
    title: "Run & Improve",
    description: "We don't hand over a completed project and disappear. We stay, monitor, and keep the factory running.",
    items: [
      "Managed services & administration",
      "AI Control Tower monitoring",
      "Continuous agent improvement",
      "Governance & release management",
      "Adoption analytics & value tracking",
    ],
  },
];

export default function WhatWeDo() {
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
        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            What We Do
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8"
          >
            We build AI Engine{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">
              for Enterprise Operations.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            Every engagement begins with architecture, governance, and a deep understanding of your industry. We are not implementers. We are transformation partners who measure success by what clients achieve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button size="lg" className="rounded-full h-14 px-9 text-base font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              Connect with us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Practice Areas ── */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Practice Areas</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-xl">
              Designing and operating{" "}
              <span className="text-muted-foreground font-normal">intelligent enterprise platforms.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {practiceAreas.map((area, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                  {area.tag}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{area.body}</p>
                <div className="space-y-2.5">
                  {area.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/75">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-24 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Industries We Serve</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl">
              Built for industries where{" "}
              <span className="text-muted-foreground font-normal">architecture, governance, and trust matter most.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 rounded-2xl border border-border bg-background"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">{ind.short}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{ind.name}</h3>
                <p className="text-primary text-sm font-semibold mb-8">{ind.description}</p>
                <div className="space-y-3">
                  {ind.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Deliver ── */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-20">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Our Process</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-xl">
              How We Deliver
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-[28px] left-[calc(16.5%)] right-[calc(16.5%)] h-px bg-border/60" />
            {deliveryPhases.map((phase, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-8 border-2 ${
                  i === 0 ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"
                }`}>
                  {phase.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{phase.description}</p>
                <div className="space-y-2.5">
                  {phase.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      <span className="text-sm text-foreground/70">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 relative overflow-hidden border-t border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-6">AI-Native by Design</div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-8">
              Let's build something<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                that endures.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Stop patching legacy workflows and start designing AI-native operations on ServiceNow. Connect with us to see how Kogniv scales with your business.
            </p>
            <Button size="lg" className="rounded-full h-16 px-12 text-lg font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              Connect with us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
      <RequestDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </div>
  );
}
