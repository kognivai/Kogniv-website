import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import PillarsSection from "@/components/PillarsSection";
import KAFESection from "@/components/KAFESection";
import PhaseCards from "@/components/PhaseCards";
import FeaturesSection from "@/components/FeaturesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ConcentricRings, GlowOrb, StarField } from "@/components/DecorativeBg";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <main className="bg-[#0B0F1E]">
      <Nav />
      <Hero />
      <MissionSection />
      <PillarsSection />
      <KAFESection />

      {/* Platform section */}
      <section id="platform" className="relative overflow-hidden border-t border-[#1E3055]">
        {/* Background graphics */}
        <ConcentricRings cx="50%" cy="0%" rings={5} baseR={150} step={160} color="#6366F1" opacity={0.09} />
        <GlowOrb x="10%" y="30%" size={400} color="#6366F1" opacity={0.09} />
        <GlowOrb x="85%" y="70%" size={350} color="#22D3EE" opacity={0.07} />
        <StarField count={40} color="#6366F1" opacity={0.28} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-16 md:pt-24">
          <p className="text-[#6366F1] text-sm font-semibold mb-3 tracking-wide uppercase">Platform</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
            The Kogniv Platform.
          </h2>
          <p className="text-[#86EFAC] text-lg max-w-lg mb-0">
            Four phases that take you from insight to enterprise transformation.
          </p>
        </div>
        <PhaseCards />

        {/* Platform dashboard screenshot */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-24">
          <div className="mt-4 rounded-2xl overflow-hidden border border-[#1E3055] shadow-[0_0_60px_rgba(99,102,241,0.12)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0F1928] border-b border-[#1E3055]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[#4A6E90] text-xs ml-2 font-mono">Kogniv · AI Workflow Intelligence Dashboard</span>
            </div>
            <img
              src="/kogniv-platform-dashboard.png"
              alt="Kogniv AI Workflow Intelligence Dashboard — ServiceNow AI scoring and insights"
              className="w-full block"
            />
          </div>
          <p className="text-[#4A6E90] text-xs text-center mt-3">
            AI readiness scoring across 25+ ServiceNow workflows — surfacing quick wins, migration paths, and NOW Assist opportunities.
          </p>
        </div>
      </section>

      <FeaturesSection />
      <AdvantagesSection />
      <ContactSection />
      <Footer />
      <Analytics />
    </main>
  );
}

export default App;
