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

export default function About() {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            About Kogniv
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8"
          >
            Join the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">
              AI-Driven Employee and Enterprise Operations.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Kogniv is the next-generation AI consulting company — differentiated by a unique value-creation model and built to help enterprises move from fragmented, legacy operations to AI-native ways of working.
          </motion.p>
        </div>
      </section>

      {/* ── Company Story ── */}
      <section className="py-28 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
            {/* Left label */}
            <motion.div {...fadeUp} className="md:col-span-3">
              <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-3">Our Story</div>
              <div className="w-8 h-px bg-primary/50" />
            </motion.div>

            {/* Right content */}
            <motion.div {...fadeUp} className="md:col-span-9 space-y-10">
              {/* Pull quote */}
              <p className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug text-foreground">
                Enterprises today are stuck — legacy systems that don't talk to each other, fragmented data that can't be acted on, and workflows built for a world before AI existed.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                The tools are improving fast. But most organizations don't know how to apply them where it matters.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-border/50" />

              <p className="text-lg text-muted-foreground leading-relaxed">
                Kogniv was built to close that gap. We combine deep domain expertise with forward-deployed engineering capability to help enterprises actually transform — not just experiment.
              </p>

              {/* Highlighted statement */}
              <div className="pl-6 border-l-2 border-primary">
                <p className="text-xl text-foreground font-medium leading-relaxed">
                  Our model is differentiated by design: we don't sell software licenses and walk away. We embed with your team, configure AI to your operations, and stay until results are real and measurable.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-xl mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-4">Why Kogniv</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Strategic Advantages of{" "}
              <span className="text-muted-foreground font-normal">Partnering with Kogniv.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden">
            {[
              {
                eyebrow: "01",
                title: "Deep Industry Expertise",
                body: "ServiceNow-certified architects and AI specialists with deep delivery experience across HCLS and BFSI. Our team has built platforms and advised C-suite leaders at some of the world's largest regulated enterprises.",
              },
              {
                eyebrow: "02",
                title: "Agentic Platform & Architecture",
                body: "We don't configure off-the-shelf tools. We build KAFE — Kogniv's Agentic AI Factory — purpose-engineered to design, deploy, and continuously improve AI agents across your enterprise workflows.",
              },
              {
                eyebrow: "03",
                title: "AI-Native End-to-End",
                body: "From ServiceNow implementation to live AI agents in production — AI is our delivery engine, not a feature layered on top. Every engagement is built around measurable business outcomes.",
              },
              {
                eyebrow: "04",
                title: "Ecosystem Veterans. Startup Energy.",
                body: "Our founders bring decades of hands-on experience from Cognizant, IBM, and American Express — paired with strategic partnerships with ServiceNow, Anthropic, and OpenAI — to deliver enterprise transformation at startup speed.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background p-10 md:p-14 group hover:bg-card/60 transition-colors duration-300"
              >
                <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-6">{item.eyebrow}</div>
                <h3 className="text-xl font-semibold tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                {item.body && <p className="text-muted-foreground leading-relaxed">{item.body}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <motion.div {...fadeUp}>
            <div className="text-primary text-xs font-bold tracking-[0.18em] uppercase mb-10">Leadership</div>
            <div className="p-10 md:p-14 rounded-2xl border border-border bg-card">
              <div className="mb-8">
                <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xl font-bold text-primary mb-6">
                  PC
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">Praveen Challa</h3>
                <p className="text-primary text-sm font-semibold mb-6">CEO & Founder, Kogniv</p>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  Praveen founded Kogniv to bring together the two things he spent two decades mastering: deep ServiceNow platform expertise and enterprise AI transformation. He leads a team of proven practitioners with the same rare combination of platform depth and business acumen.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Former Head of ServiceNow Business, Cognizant",
                  "Former CTO, GBS ServiceNow IBM",
                  "Former Head of ServiceNow Business, LTM",
                ].map((role, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 relative overflow-hidden border-t border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-8">
              Let's Build Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">
                AI-Native Future.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Stop patching legacy workflows and start building AI-native operations on ServiceNow. Get in touch to see how Kogniv accelerates your enterprise transformation.
            </p>
            <Button size="lg" className="rounded-full h-16 px-12 text-lg font-semibold" onClick={() => setIsDemoModalOpen(true)}>
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
      <RequestDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </div>
  );
}
