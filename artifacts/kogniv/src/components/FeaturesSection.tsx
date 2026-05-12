const features = [
  {
    img: "/feature-workflow.png",
    tag: "Workflow AI",
    title: "Automate the workflows your team dreads.",
    body: "From IT ticketing to HR case creation and service catalog fulfillment — AI agents take the manual out of your most repetitive, high-volume workflows. Integrated with Slack, Teams, and email so adoption is instant.",
    bullets: ["Near-zero manual ticketing", "Automatic routing and escalation", "Works in tools teams already use"],
  },
  {
    img: "/feature-integration.png",
    tag: "Integration",
    title: "Wired to your real data and systems.",
    body: "Agents aren't useful in isolation. KAFE wires AI directly to your ServiceNow environment, knowledge bases, and enterprise data sources — so every response is grounded in reality, not hallucinated.",
    bullets: ["ServiceNow-native deployment", "Knowledge search across Confluence, SharePoint", "Secure data access with full governance"],
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16">
      <div className="flex flex-col gap-16">
        {features.map((f, i) => (
          <div key={f.tag} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
            {/* Image */}
            <div className={`rounded-2xl overflow-hidden border border-[#1E3055] ${i % 2 === 1 ? "lg:order-2" : ""}`} style={{ height: 320 }}>
              <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
            </div>

            {/* Text */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <span className="inline-block border border-[#2E4878] text-[#8BA4C8] text-xs font-medium px-3 py-1.5 rounded-full mb-5">{f.tag}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">{f.title}</h3>
              <p className="text-[#8BA4C8] text-base leading-relaxed mb-6">{f.body}</p>
              <ul className="flex flex-col gap-2.5">
                {f.bullets.map(b => (
                  <li key={b} className="flex items-center gap-3 text-[#8BA4C8] text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#131F35] border border-[#1E3055] flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
