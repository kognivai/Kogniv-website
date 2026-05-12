const steps = [
  {
    n: "01",
    title: "Assess",
    body: "Structured framework to identify, score, and prioritise AI automation opportunities. Every use case evaluated for business impact, feasibility, and ROI before a single sprint begins.",
    color: "#6366F1",
  },
  {
    n: "02",
    title: "Design",
    body: "Design thinking workshops, agent architecture, and a phased roadmap aligned to your budget and timeline. Agent Design Squad defines prompts, flows, and data wiring.",
    color: "#8B5CF6",
  },
  {
    n: "03",
    title: "Build",
    body: "Kogniv's practitioners build inside Agent Studio daily — agents wired to your real data, workflows, and edge cases. Core team embedded throughout every sprint.",
    color: "#A855F7",
  },
  {
    n: "04",
    title: "Orchestrate",
    body: "Integration testing, Orchestrator configuration, and go-live inside your existing stack. AI Control Tower monitors every decision, action, and output across your agent workforce.",
    color: "#22D3EE",
  },
  {
    n: "05",
    title: "Improve",
    body: "Subject matter experts flag, refine, and approve agent outputs directly. Feedback loops mean agents get smarter with every interaction — the factory keeps churning.",
    color: "#06B6D4",
  },
];

const capabilities = [
  { label: "AI Use Case Assessment", desc: "Score and prioritise opportunities by impact and ROI" },
  { label: "Agent Studio", desc: "ServiceNow-native environment for AI agent configuration" },
  { label: "AI Agents Orchestrator", desc: "Plans and coordinates teams of agents for complex use cases" },
  { label: "AI Control Tower", desc: "Unified observability across your entire agent workforce" },
  { label: "Continuous Improvement Loop", desc: "SME feedback wired back into agent behaviour" },
  { label: "Enterprise Security", desc: "Role-based access, multi-tenancy, full data governance" },
];

export default function KAFESection() {
  return (
    <section id="kafe" className="border-y border-[#1E3055] py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #0F1628 0%, #0B0F1E 100%)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <span className="inline-block bg-[#6366F1] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
              KAFE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Kogniv Agentic AI<br />Factory for Enterprises.
            </h2>
            <p className="text-[#8BA4C8] text-base leading-relaxed mb-4">
              KAFE is Kogniv's proprietary framework for building, deploying, and continuously improving AI agents on the ServiceNow platform.
            </p>
            <p className="text-[#4A6E90] text-base leading-relaxed">
              The KAFE model uses AI to accelerate the design and build of AI agents themselves — compressing delivery from months to days. Our AI Agent Design Squad and Development Squads embed directly with your organisation and remain engaged throughout every sprint.
            </p>
          </div>

          {/* Feature image */}
          <div className="rounded-2xl overflow-hidden border border-[#1E3055] h-64 lg:h-auto">
            <img src="/feature-agentic.png" alt="KAFE Agentic AI" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Five-step process */}
        <div className="mb-16">
          <p className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-6">The KAFE Process</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {steps.map((s, i) => (
              <div key={s.n} className="relative bg-[#131F35] border border-[#1E3055] rounded-xl p-5 hover:border-[#2E4878] transition-colors">
                <div className="text-xs font-mono mb-3" style={{ color: s.color }}>{s.n}</div>
                <div className="font-semibold text-white text-sm mb-2">{s.title}</div>
                <p className="text-[#4A6E90] text-xs leading-relaxed">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-[#1E3055] text-lg z-10">›</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities grid */}
        <div>
          <p className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">Everything the factory includes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {capabilities.map(c => (
              <div key={c.label} className="flex items-start gap-3 bg-[#131F35] border border-[#1E3055] rounded-xl px-4 py-3.5 hover:border-[#2E4878] transition-colors">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-medium">{c.label}</div>
                  <div className="text-[#4A6E90] text-xs mt-0.5">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
