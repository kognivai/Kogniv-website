export default function AboutSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#131F35] border border-[#1E3055] rounded-2xl p-8 md:p-10 flex flex-col gap-4 min-h-[220px] hover:border-[#2E4878] transition-colors">
          <h3 className="text-white font-semibold text-xl">Insights</h3>
          <p className="text-[#8BA4C8] text-base leading-relaxed max-w-sm">
            Perspectives on navigating operational complexity, accelerating change, and building organisations that adapt in real time.
          </p>
          <a href="#contact" className="text-[#6366F1] text-sm font-medium hover:underline mt-auto inline-flex items-center gap-1">
            Read more <span>→</span>
          </a>
        </div>

        <div className="bg-[#131F35] border border-[#1E3055] rounded-2xl p-8 md:p-10 flex flex-col gap-4 min-h-[220px] hover:border-[#2E4878] transition-colors">
          <h3 className="text-white font-semibold text-xl">About</h3>
          <p className="text-[#8BA4C8] text-base leading-relaxed max-w-sm">
            Built on deep operational expertise. Designed for what comes next. Kogniv partners with organisations where it matters most.
          </p>
          <a href="#contact" className="text-[#6366F1] text-sm font-medium hover:underline mt-auto inline-flex items-center gap-1">
            Read more <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
