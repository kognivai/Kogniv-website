import { LatticeCube, SpikyStar, WireframeGlobe, InfinityWave } from "./WireframeShapes";

const phases = [
  {
    id: "discover",
    label: "Discover",
    title: "Certainty starts with clarity.",
    blurb: "We map how work actually flows — surfacing what's hidden before anything can truly change.",
    Shape: LatticeCube,
    pill: "bg-[#6366F1] text-white",
  },
  {
    id: "decode",
    label: "Decode",
    title: "Era of intelligent insight.",
    blurb: "Raw data becomes strategy. We translate complexity buried in your processes into clear direction.",
    Shape: SpikyStar,
    pill: "bg-[#A855F7] text-white",
  },
  {
    id: "transform",
    label: "Transform",
    title: "Redesign from first principles.",
    blurb: "Transformation is deliberate redesign, not incremental tweaking. We co-create workflows that make you fundamentally more capable.",
    Shape: WireframeGlobe,
    pill: "bg-[#8B5CF6] text-white",
  },
  {
    id: "thrive",
    label: "Thrive",
    title: "Build for what comes next.",
    blurb: "Real transformation compounds. We ensure your teams have the systems and habits to adapt continuously.",
    Shape: InfinityWave,
    pill: "bg-[#6366F1] text-white",
  },
];

const separators: Record<string, string> = {
  discover: "+",
  decode:   "+",
  transform: "× =",
};

export default function PhaseCards() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16">
      <div className="flex flex-col xl:flex-row items-stretch gap-0">
        {phases.map((phase, i) => (
          <div key={phase.id} className="flex xl:flex-row flex-col items-stretch flex-1">
            {/* Card */}
            <div
              id={phase.id}
              className="flex-1 bg-[#131F35] border border-[#1E3055] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#3B4F88] hover:bg-[#1A2845] transition-colors duration-300 scroll-mt-20"
            >
              <div>
                <span className={`inline-block text-xs font-semibold px-3.5 py-1.5 rounded-full ${phase.pill}`}>
                  {phase.label}
                </span>
              </div>

              <div className="w-full aspect-square max-w-[160px] mx-auto my-2">
                <phase.Shape />
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <h3 className="text-white font-semibold text-base leading-snug">{phase.title}</h3>
                <p className="text-[#8BA4C8] text-sm leading-relaxed">{phase.blurb}</p>
                <a
                  href={`#${phase.id}-detail`}
                  className="text-[#6366F1] text-sm font-medium hover:underline mt-1 inline-flex items-center gap-1"
                >
                  Read more <span className="text-xs">→</span>
                </a>
              </div>
            </div>

            {/* Separator — shown between cards, not after the last */}
            {i < phases.length - 1 && (
              <div className="flex items-center justify-center xl:px-2 py-3 xl:py-0 flex-shrink-0">
                <span className="text-[#6366F1] text-xl font-bold select-none">
                  {separators[phase.id]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
