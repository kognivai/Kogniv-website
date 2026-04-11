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
    title: "Information We Collect",
    body: [
      "When you interact with Kogniv's website or request our services, we may collect information you provide directly — such as your name, email address, company name, and job title — when you fill out our contact form or request a discovery call.",
      "We also automatically collect certain technical information when you visit our site, including your IP address, browser type, pages visited, and the date and time of your visit. This information is collected through cookies and similar tracking technologies.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information you provide to respond to your inquiries, schedule discovery calls, deliver consulting services, and send you updates about Kogniv, KAFE, and relevant industry insights you have opted into.",
      "Technical information collected automatically is used to operate and improve our website, understand how visitors interact with our content, and diagnose technical issues.",
    ],
  },
  {
    title: "Information Sharing",
    body: [
      "Kogniv does not sell, rent, or trade your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.",
      "We may disclose your information if required to do so by law or in the good-faith belief that such disclosure is necessary to comply with legal obligations, protect our rights, or ensure the safety of our users.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Our website uses cookies to enhance your browsing experience. Cookies are small files placed on your device that help us remember your preferences and understand how you use our site. You may disable cookies through your browser settings; however, some features of our website may not function correctly as a result.",
      "We use analytics cookies (such as Google Analytics) to collect aggregated, anonymized information about site usage. These cookies do not identify you personally.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements. Contact inquiries are retained for a period sufficient to address your request and maintain a record of our communications.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "Depending on your location, you may have the right to access, correct, or delete the personal information we hold about you, or to object to or restrict certain processing of your information. To exercise these rights, contact us at the address below.",
      "If you are located in the European Economic Area or the United Kingdom, you may also have the right to lodge a complaint with your local data protection authority.",
    ],
  },
  {
    title: "Security",
    body: [
      "Kogniv takes reasonable technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. Kogniv is not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. We encourage you to review this policy periodically to stay informed about how we are protecting your information.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or our data practices, please contact us at:",
      "Workwayz LLC DBA Kogniv\nEmail: admin@kogniv.com",
    ],
  },
];

export default function Privacy() {
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
            Privacy Policy
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
            Workwayz LLC DBA Kogniv ("Kogniv," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.
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
