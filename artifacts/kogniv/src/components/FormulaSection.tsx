import { LatticeCube, SpikyStar, WireframeGlobe, InfinityWave } from "./WireframeShapes";

const components = [
  { label: "Discover",  tagline: "See what others miss",      desc: "Immersive diagnosis — stakeholder interviews, process mapping, opportunity identification.", Shape: LatticeCube },
  { label: "Decode",    tagline: "Turn signals into strategy", desc: "Analytics, root cause analysis, and impact modelling that translate complexity into clear direction.", Shape: SpikyStar },
  { label: "Transform", tagline: "Redesign with intention",   desc: "Future-state design, automation implementation, and change enablement for lasting capability.", Shape: WireframeGlobe },
];

const result = {
  label: "Thrive",
  tagline: "Grow without limits",
  desc: "When discovery, intelligence, and transformation work as one — organisations build the capability to compound results continuously.",
  Shape: InfinityWave,
};

export default function FormulaSection() {
  return (
    <section
      id="thrive-detail"
      className="border-y border-[#1E3055] py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #0F1628 0%, #0B0F1E 100%)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <p className="text-[#6366F1] text-sm font-semibold mb-3 tracking-wide">The Kogniv Framework</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-xl">
            The engine for adaptive transformation.
          </h2>
          <p className="text-[#8BA4C8] text-lg mt-3 max-w-lg">
            Where discovery, intelligence, and execution move as one.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          {components.map((comp, i) => (
            <div key={comp.label} className="flex flex-col lg:flex-row items-center gap-4 flex-1">
              <div className="bg-[#131F35] border border-[#1E3055] rounded-2xl p-6 flex flex-col gap-4 w-full flex-1 min-h-[280px]">
                <span className="inline-block border border-[#2E4878] text-[#8BA4C8] text-xs font-medium px-3 py-1.5 rounded-full w-fit">
                  {comp.label}
                </span>
                <div className="w-28 h-28 mx-auto"><comp.Shape /></div>
                <div>
                  <p className="text-white font-semibold text-sm">{comp.tagline}</p>
                  <p className="text-[#8BA4C8] text-sm mt-1 leading-relaxed">{comp.desc}</p>
                </div>
              </div>
              <div className="text-[#6366F1] text-2xl font-bold flex-shrink-0 rotate-90 lg:rotate-0">×</div>
            </div>
          ))}

          <div className="flex flex-col lg:flex-row items-center gap-4 flex-1">
            <div className="text-[#6366F1] text-2xl font-bold flex-shrink-0 rotate-90 lg:rotate-0">=</div>
            <div
              className="rounded-2xl p-6 flex flex-col gap-4 w-full flex-1 min-h-[280px]"
              style={{ background: "linear-gradient(135deg, #1A1060 0%, #2A0A5A 40%, #0F1E50 100%)", border: "1px solid #3730A3" }}
            >
              <span className="inline-block border border-white/20 text-[#6366F1] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                {result.label}
              </span>
              <div className="w-28 h-28 mx-auto opacity-50"><result.Shape /></div>
              <div>
                <p className="text-white font-semibold text-sm">{result.tagline}</p>
                <p className="text-white/60 text-sm mt-1 leading-relaxed">{result.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
