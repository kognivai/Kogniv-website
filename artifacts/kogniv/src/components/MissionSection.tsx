export default function MissionSection() {
  return (
    <section id="about" className="border-y border-[#1E3055] py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #0F1628 0%, #0B0F1E 100%)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="text-[#6366F1] text-sm font-semibold mb-4 tracking-wide uppercase">Who we are</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              The next-generation AI consulting company.
            </h2>
            <p className="text-[#8BA4C8] text-base leading-relaxed mb-5">
              Enterprises today are stuck. The tools are improving fast — but most organisations don't know how to apply them where it matters. Legacy workflows stay intact. Value stays locked.
            </p>
            <p className="text-[#8BA4C8] text-base leading-relaxed mb-5">
              Kogniv was built to close that gap. We combine deep domain expertise with forward-deployed engineering to help enterprises actually transform — not just plan it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["ServiceNow Certified", "Anthropic Partner", "OpenAI Partner", "HCLS", "BFSI"].map(tag => (
                <span key={tag} className="border border-[#1E3055] text-[#8BA4C8] text-xs font-medium px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — visual card grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "⬡", label: "Agentic AI",        sub: "Autonomous agents under human guardrails" },
              { icon: "◈", label: "ServiceNow Native",  sub: "Built inside the platform, not bolted on" },
              { icon: "◉", label: "HCLS & BFSI",        sub: "Pre-built patterns for regulated industries" },
              { icon: "◎", label: "Days, Not Months",   sub: "KAFE compresses delivery from months to days" },
            ].map(c => (
              <div key={c.label} className="bg-[#131F35] border border-[#1E3055] rounded-2xl p-5 flex flex-col gap-2 hover:border-[#3B4F88] transition-colors">
                <span className="text-2xl text-[#6366F1]">{c.icon}</span>
                <div className="text-white text-sm font-semibold">{c.label}</div>
                <div className="text-[#4A6E90] text-xs leading-relaxed">{c.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
