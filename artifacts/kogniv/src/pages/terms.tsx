import { useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { PageFooter } from "@/components/page-footer";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing or using the Kogniv website (the \"Site\"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree to these terms, you are prohibited from using or accessing this Site.",
    ],
  },
  {
    title: "Use of the Site",
    body: [
      "You may use this Site for lawful purposes only. You agree not to use the Site in any way that violates applicable local, state, national, or international laws or regulations; to transmit any unsolicited or unauthorized advertising or promotional material; or to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.",
      "Kogniv reserves the right to terminate your access to the Site at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "All content on this Site — including but not limited to text, graphics, logos, images, and software — is the property of Kogniv LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from this Site without our prior written consent.",
      "The KAFE (Kogniv Agentic AI Factory for Enterprises) brand, methodology, and related technology are proprietary to Kogniv LLC. No license or right to use any Kogniv trademark is granted by these Terms.",
    ],
  },
  {
    title: "Consulting Services",
    body: [
      "Any consulting, advisory, or implementation services provided by Kogniv are governed by a separate written agreement between Kogniv and the client. These Terms of Service do not constitute an offer to provide services and do not create any obligation on the part of Kogniv to deliver any particular service.",
      "The information on this Site is provided for general informational purposes only and does not constitute professional consulting advice. You should not act upon any information on this Site without seeking professional guidance tailored to your specific situation.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      "This Site is provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      "Kogniv does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. Kogniv makes no warranties or representations about the accuracy or completeness of the content on this Site.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Kogniv LLC and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, goodwill, or other intangible losses — arising out of or in connection with your use of, or inability to use, this Site or its content.",
      "In no event shall Kogniv's total liability to you for all claims arising out of or relating to these Terms or your use of the Site exceed one hundred US dollars (USD $100).",
    ],
  },
  {
    title: "Third-Party Links",
    body: [
      "This Site may contain links to third-party websites or services that are not owned or controlled by Kogniv. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Delaware.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "Kogniv reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new Terms. We encourage you to review this page periodically.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "If you have any questions about these Terms of Service, please contact us at:",
      "Kogniv LLC\nEmail: admin@kogniv.com",
    ],
  },
];

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans dark">
      <Nav />

      {/* Hero */}
      <section className="pt-44 pb-16 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Legal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-lg"
          >
            Effective date: April 1, 2026
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <motion.p {...fadeUp} className="text-muted-foreground leading-relaxed text-lg">
            These Terms of Service ("Terms") govern your access to and use of the website operated by Kogniv LLC ("Kogniv," "we," "our," or "us"). Please read these Terms carefully before using our Site. By accessing this Site, you confirm that you have read, understood, and agree to be bound by these Terms.
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-14">
          {sections.map((section, i) => (
            <motion.div key={i} {...fadeUp}>
              <h2 className="text-xl font-bold mb-4 text-foreground">{section.title}</h2>
              <div className="space-y-4">
                {section.body.map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
