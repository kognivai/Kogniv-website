const phases = [
  {
    id: "discover-detail",
    number: "01",
    label: "Discover",
    labelColor: "bg-[#6366F1] text-white",
    headline: "The Thesis for Transformation.",
    subhead: "Where certainty begins — with a complete picture of reality.",
    description: "Most organisations begin transforming before they truly understand where they are. We start with immersive discovery: mapping the full landscape of your current workflows, surfacing the constraints invisible from the inside, and identifying the opportunities that make change worth pursuing.",
    outcomes: ["Current-state process mapping","Stakeholder interviews & workshops","Bottleneck and waste identification","Opportunity landscape report","Baseline performance metrics","Executive alignment sessions"],
  },
  {
    id: "decode-detail",
    number: "02",
    label: "Decode",
    labelColor: "bg-[#A855F7] text-white",
    headline: "The Intelligence Layer.",
    subhead: "Where raw data becomes a clear mandate for change.",
    description: "Discovery surfaces reality. Decoding makes sense of it. We analyse patterns, quantify the costs of the status quo, and translate complexity into a strategic narrative that aligns your organisation behind a single, unambiguous direction — backed by evidence.",
    outcomes: ["Process performance analytics","Root cause analysis","Quantified impact modelling","Priority matrix & quick wins","Transformation business case","Strategic roadmap design"],
  },
  {
    id: "transform-detail",
    number: "03",
    label: "Transform",
    labelColor: "bg-[#22D3EE] text-[#0B0F1E]",
    headline: "The Engine for Change.",
    subhead: "Where redesign replaces incremental fixes.",
    description: "Transformation is not patching the existing system — it is deliberate redesign from first principles. We co-create future-state workflows with your teams, implement intelligent automation where it creates leverage, and embed structural changes that make your organisation fundamentally harder to disrupt.",
    outcomes: ["Future-state process design","Technology & automation implementation","Integration architecture","Change management & enablement","Training & capability uplift","Performance measurement framework"],
  },
];

export default function PhasesSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10">
      {phases.map(phase => (
        <div
          key={phase.id}
          id={phase.id}
          className="border-t border-[#1E3055] py-16 md:py-24 scroll-mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-5">
              <span className={`inline-block text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 ${phase.labelColor}`}>
                {phase.label}
              </span>
              <p className="text-[#2E4878] text-sm font-mono mb-2">{phase.number}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{phase.headline}</h2>
              <p className="text-[#8BA4C8] text-lg leading-relaxed mb-6">{phase.subhead}</p>
              <p className="text-[#4A6E90] text-base leading-relaxed">{phase.description}</p>
            </div>

            <div className="lg:col-span-7 lg:pt-16">
              <p className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">What&apos;s included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phase.outcomes.map(outcome => (
                  <div key={outcome} className="flex items-start gap-3 bg-[#131F35] border border-[#1E3055] rounded-xl px-4 py-3.5">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                    <span className="text-[#A8C8D8] text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
