import { HexGrid, GlowOrb, StarField } from "./DecorativeBg";

const pillars = [
  {
    id: "it-ops",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="6" width="24" height="16" rx="3" stroke="#6366F1" strokeWidth="1.6"/><path d="M9 14h10M14 10v8" stroke="#22D3EE" strokeWidth="1.4" strokeLinecap="round"/></svg>
    ),
    label: "IT Operations",
    headline: "Self-healing IT, powered by AI.",
    body: "Reduce manual ticketing, predict failures before they happen, and make your IT team dramatically more effective. AI-native ITSM that runs itself.",
    features: ["Incident summarisation", "Failure prediction", "Auto-resolution", "Change request prediction"],
  },
  {
    id: "employee",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke="#6366F1" strokeWidth="1.6"/><path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#22D3EE" strokeWidth="1.4" strokeLinecap="round"/></svg>
    ),
    label: "Employee & Customer",
    headline: "One universal agent for every need.",
    body: "A single AI Assist that routes every employee and customer request — from HR cases and IT incidents to service catalog orders — via Slack, Teams, or email.",
    features: ["Universal Employee Agent", "HR case automation", "Customer workflows", "NLU/NLP multilingual"],
  },
  {
    id: "esm",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="3" stroke="#6366F1" strokeWidth="1.6"/><path d="M8 14h12M8 10h12M8 18h8" stroke="#22D3EE" strokeWidth="1.4" strokeLinecap="round"/></svg>
    ),
    label: "Enterprise Service Mgmt",
    headline: "ServiceNow as your intelligence layer.",
    body: "Deep implementation and transformation across the full ServiceNow suite — AI infused at every layer, from strategy through production.",
    features: ["Full suite implementation", "AI at every layer", "Workflow transformation", "Governance & compliance"],
  },
  {
    id: "industry",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3L25 8.5v11L14 25 3 19.5v-11L14 3z" stroke="#6366F1" strokeWidth="1.6"/><path d="M14 3v22M3 8.5l11 5.5 11-5.5" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round"/></svg>
    ),
    label: "Industry Solutions",
    headline: "Pre-built for HCLS and BFSI.",
    body: "Pre-built AI workflow patterns tuned for Healthcare & Life Sciences and Banking, Financial Services & Insurance — proven patterns, faster time-to-value.",
    features: ["HC claims exception mgmt", "Financial service ops", "Regulatory compliance AI", "Industry-tuned agents"],
  },
];

export default function PillarsSection() {
  return (
    <section id="solutions" className="relative overflow-hidden">
      {/* Background graphics */}
      <HexGrid opacity={0.09} color="#6366F1" size={44} />
      <GlowOrb x="15%" y="50%" size={500} color="#6366F1" opacity={0.09} />
      <GlowOrb x="90%" y="30%" size={380} color="#A855F7" opacity={0.08} />
      <StarField count={50} color="#22D3EE" opacity={0.25} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-[#6366F1] text-sm font-semibold mb-3 tracking-wide uppercase">Solutions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-xl mb-3">
            We power enterprises across four transformation pillars.
          </h2>
          <p className="text-[#86EFAC] text-lg max-w-lg">Built on ServiceNow, with Anthropic and OpenAI at the model layer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map(p => (
            <div key={p.id} className="bg-[#131F35]/80 backdrop-blur-sm border border-[#1E3055] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#3B4F88] hover:bg-[#1A2845] transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#0B0F1E] border border-[#1E3055] flex items-center justify-center">
                {p.icon}
              </div>
              <div>
                <span className="text-[#6366F1] text-xs font-semibold uppercase tracking-wide">{p.label}</span>
                <h3 className="text-white font-semibold text-base mt-1 leading-snug">{p.headline}</h3>
              </div>
              <p className="text-[#86EFAC] text-sm leading-relaxed flex-1">{p.body}</p>
              <ul className="flex flex-col gap-1.5">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#4A6E90] text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#6366F1] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
