import AnimatedBackground from "./AnimatedBackground";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(11,15,30,0.92) 0%, rgba(11,15,30,0.80) 50%, rgba(11,15,30,0.95) 100%)" }} />

      {/* Animated particle network */}
      <AnimatedBackground />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ zIndex: 2, background: "radial-gradient(circle, #6366F1 0%, transparent 65%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ zIndex: 2, background: "radial-gradient(circle, #22D3EE 0%, transparent 65%)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-[1000px] mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
          Reimagining Your Workflows<br />for the AI Era
        </h1>

        <p className="text-[#8BA4C8] text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Kogniv creates 'Future of Work' for Organizations, deploying autonomous AI that operates under strict human-defined guardrails. Kogniv embeds with your team to deliver measurable, 'AI-Native Operations'.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="bg-[#6366F1] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#4F46E5] transition-colors duration-200"
          >
            Request a Demo
          </a>
          <a
            href="#kafe"
            className="border border-[#1E3055] text-white text-sm font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            Explore KAFE →
          </a>
        </div>

        {/* Stat strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { num: "KAFE",        label: "Proprietary AI Framework" },
            { num: "Industry Focus", label: "HCLS, BFSI, Retail"      },
            { num: "Weeks",       label: "Not months to deploy"      },
          ].map(s => (
            <div key={s.num} className="text-center">
              <div className="text-white font-bold text-xl md:text-2xl">{s.num}</div>
              <div className="text-[#4A6E90] text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" style={{ zIndex: 10 }}>
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#6366F1]" />
        <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
      </div>
    </section>
  );
}
