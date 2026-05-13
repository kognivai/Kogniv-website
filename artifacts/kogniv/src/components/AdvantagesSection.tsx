import { ArcRings, GlowOrb, StarField, DotGrid } from "./DecorativeBg";

const advantages = [
  {
    title: "Deep Industry Expertise",
    body: "ServiceNow-certified architects and AI specialists with deep delivery experience across HCLS and BFSI. Our team has built platforms and advised C-suite leaders at some of the world's largest regulated enterprises.",
    icon: "◈",
    color: "#6366F1",
  },
  {
    title: "We Build, Not Configure",
    body: "We don't configure off-the-shelf tools. We build KAFE — our own Agentic AI Factory — and use it to build AI agents across your enterprise workflows, faster and with higher quality than anyone else.",
    icon: "◉",
    color: "#A855F7",
  },
  {
    title: "AI is Our Delivery Engine",
    body: "From ServiceNow implementation to live AI agents in production — AI is not a feature layered on top. Every engagement is built around measurable business outcomes.",
    icon: "◎",
    color: "#22D3EE",
  },
  {
    title: "Ecosystem Veterans. Startup Energy.",
    body: "Our founders bring decades of hands-on experience from Cognizant, IBM, and American Express — now partnered with ServiceNow, Anthropic, and OpenAI to deliver next-generation AI transformation.",
    icon: "◐",
    color: "#6366F1",
  },
];

const priorRoles = [
  "Former Head of ServiceNow Business, Cognizant",
  "Former CTO, GBS ServiceNow IBM",
  "Former ServiceNow Business Head, LTM",
];

export default function AdvantagesSection() {
  return (
    <>
      {/* Advantages */}
      <section className="relative overflow-hidden">
        <DotGrid opacity={0.13} color="#A855F7" spacing={30} />
        <GlowOrb x="90%" y="50%" size={480} color="#A855F7" opacity={0.10} />
        <GlowOrb x="5%" y="30%" size={350} color="#6366F1" opacity={0.09} />
        <StarField count={45} color="#A855F7" opacity={0.28} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="mb-12">
            <p className="text-[#6366F1] text-sm font-semibold mb-3 tracking-wide uppercase">Why Kogniv</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-xl">
              Strategic advantages of partnering with Kogniv.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map(a => (
              <div key={a.title} className="bg-[#131F35]/80 backdrop-blur-sm border border-[#1E3055] rounded-2xl p-7 flex gap-5 hover:border-[#2E4878] transition-colors">
                <div className="text-2xl flex-shrink-0 mt-0.5" style={{ color: a.color }}>{a.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-2">{a.title}</h3>
                  <p className="text-[#8BA4C8] text-sm leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section id="team" className="relative overflow-hidden border-t border-[#1E3055] py-16 md:py-24"
        style={{ background: "linear-gradient(160deg, #0F1628 0%, #0B0F1E 100%)" }}>
        <ArcRings cx="100%" cy="0%" r1={300} r2={480} r3={640} color="#6366F1" opacity={0.10} />
        <GlowOrb x="20%" y="70%" size={400} color="#6366F1" opacity={0.09} />
        <StarField count={30} color="#22D3EE" opacity={0.22} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="mb-10">
            <p className="text-[#6366F1] text-sm font-semibold mb-3 tracking-wide uppercase">Leadership</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Built by enterprise veterans.
            </h2>
          </div>

          <div className="max-w-xl">
            <div className="bg-[#131F35]/80 backdrop-blur-sm border border-[#1E3055] rounded-2xl p-7 flex flex-col gap-5 hover:border-[#2E4878] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#0B0F1E] border border-[#1E3055] flex items-center justify-center text-[#6366F1] font-bold text-xl">
                P
              </div>
              <div>
                <div className="text-white font-bold text-lg">Praveen</div>
                <div className="text-[#6366F1] text-sm font-semibold mt-0.5">Founder & CEO, Kogniv</div>
              </div>
              <div className="flex flex-col gap-2">
                {priorRoles.map(role => (
                  <div key={role} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#4A6E90] flex-shrink-0" />
                    <span className="text-[#8BA4C8] text-sm">{role}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#4A6E90] text-sm leading-relaxed border-t border-[#1E3055] pt-4">
                Praveen founded Kogniv to bring together two decades of mastery: ServiceNow platform expertise and enterprise AI transformation. He leads a team of proven practitioners with the same rare combination of platform depth and business acumen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
