import { useState } from "react";
import { ConcentricRings, GlowOrb, DotGrid } from "./DecorativeBg";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [firstName, setFirstName]   = useState("");
  const [lastName,  setLastName]    = useState("");
  const [email,     setEmail]       = useState("");
  const [company,   setCompany]     = useState("");
  const [message,   setMessage]     = useState("");
  const [status,    setStatus]      = useState<FormState>("idle");
  const [errorMsg,  setErrorMsg]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    `${firstName.trim()} ${lastName.trim()}`.trim(),
          email:   email.trim(),
          company: company.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setFirstName(""); setLastName(""); setEmail(""); setCompany(""); setMessage("");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const inputClass =
    "bg-[#131F35] border border-[#1E3055] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#2E4878] focus:outline-none focus:border-[#6366F1]/50 transition-colors";

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[#1E3055] py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #0F1628 0%, #0B0F1E 100%)" }}
    >
      {/* Background graphics */}
      <DotGrid opacity={0.12} color="#6366F1" spacing={28} />
      <ConcentricRings cx="90%" cy="50%" rings={5} baseR={80} step={110} color="#6366F1" opacity={0.11} />
      <ConcentricRings cx="5%" cy="80%" rings={3} baseR={60} step={90} color="#A855F7" opacity={0.09} />
      <GlowOrb x="75%" y="20%" size={420} color="#6366F1" opacity={0.10} />
      <GlowOrb x="10%" y="60%" size={320} color="#A855F7" opacity={0.08} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block bg-[#6366F1] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
              Request a Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              We'll walk you through the factory model in 30 minutes.
            </h2>
            <p className="text-[#8BA4C8] text-base leading-relaxed mb-8 max-w-sm">
              Tell us about your business and the workflows you want to transform. We'll follow up within one business day with a live demo tailored to your operations.
            </p>
            <div className="flex flex-col gap-3 text-[#4A6E90] text-sm">
              {[
                "Live demo of the KAFE model, tailored to your workflows",
                "Response within one business day",
                "No obligation — designed for enterprise decision-makers",
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
              <div className="w-16 h-16 rounded-full bg-[#131F35] border border-[#1E3055] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-12" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-2">We're on it.</h3>
                <p className="text-[#8BA4C8] text-sm max-w-xs leading-relaxed">
                  Thanks for reaching out. You'll also receive a confirmation email. We'll be in touch within one business day.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-[#6366F1] text-sm hover:underline"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#8BA4C8] text-xs tracking-wider uppercase">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#8BA4C8] text-xs tracking-wider uppercase">Last Name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#8BA4C8] text-xs tracking-wider uppercase">Work Email</label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#8BA4C8] text-xs tracking-wider uppercase">Organisation</label>
                <input
                  type="text"
                  placeholder="Company name"
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#8BA4C8] text-xs tracking-wider uppercase">
                  Describe the workflows you want to automate
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the workflows or processes you want to automate..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm px-1">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group flex items-center justify-between bg-[#6366F1] text-white font-semibold px-6 py-4 rounded-xl hover:bg-[#4F46E5] transition-colors text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Request a walkthrough"}
                {status !== "submitting" && (
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                )}
              </button>

              <p className="text-[#2E4878] text-xs text-center">
                Your data never trains our base models. Built on Claude & OpenAI with full enterprise data governance.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
