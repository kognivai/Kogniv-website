import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E3055] py-12 md:py-16" style={{ background: "#080C1A" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Logo size={36} showWordmark={true} className="mb-4" />
            <p className="text-[#4A6E90] text-sm leading-relaxed max-w-xs">
              The next-generation AI consulting company. We built the intelligence layer ServiceNow was missing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["ServiceNow Partner", "Anthropic", "OpenAI"].map(p => (
                <span key={p} className="border border-[#1E3055] text-[#4A6E90] text-xs px-2.5 py-1 rounded-full">{p}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase mb-4">Solutions</p>
            <ul className="flex flex-col gap-2.5">
              {["IT Operations", "Employee & Customer", "Enterprise Service Mgmt", "Industry Solutions"].map(l => (
                <li key={l}><a href="#solutions" className="text-[#4A6E90] text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase mb-4">Company</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "KAFE", href: "#kafe" },
                { label: "About", href: "#about" },
                { label: "Platform", href: "#platform" },
                { label: "Leadership", href: "#team" },
                { label: "Request Demo", href: "#contact" },
              ].map(l => (
                <li key={l.label}><a href={l.href} className="text-[#4A6E90] text-sm hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E3055] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#2E4878] text-xs">© {new Date().getFullYear()} Kogniv. All rights reserved.</p>
          <p className="text-[#2E4878] text-xs">Built on ServiceNow · Anthropic · OpenAI</p>
        </div>
      </div>
    </footer>
  );
}
