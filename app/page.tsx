import Link from "next/link";

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const categories = [
  { icon: "✉️", title: "Email Security", desc: "SPF, DKIM, DMARC — the #1 attack vector for SMBs" },
  { icon: "🔍", title: "Dark Web Exposure", desc: "Check if your credentials are already compromised" },
  { icon: "🛡️", title: "PIPEDA Compliance", desc: "Canada's privacy law requirements for your industry" },
  { icon: "🌐", title: "Network Risk", desc: "Remote access, firewall, and endpoint exposure" },
  { icon: "🔐", title: "Access Control", desc: "MFA, password practices, and admin privileges" },
  { icon: "👥", title: "Staff Awareness", desc: "Human risk — your first and last line of defence" },
];

const steps = [
  { num: "01", title: "Answer 6 questions", desc: "Tell us your business type, size, and top concerns. Takes under 2 minutes." },
  { num: "02", title: "AI analyses your risk", desc: "Our AI reviews your business profile against 6 security categories and PIPEDA requirements." },
  { num: "03", title: "Get your report", desc: "Receive a full risk score, gap analysis, and prioritized action plan — ready to act on today." },
];

const stats = [
  { num: "73%", label: "of Canadian SMBs hit by a cyberattack" },
  { num: "$35K", label: "average breach recovery cost in BC" },
  { num: "48%", label: "of SMBs have zero cyber defences" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #050d1a 0%, #0d1f3c 50%, #050d1a 100%)" }}>

      {/* NAV */}
      <nav className="border-b border-blue-500/10 sticky top-0 z-50" style={{ background: "rgba(5,13,26,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldIcon />
            </div>
            <span className="font-bold text-lg tracking-tight">CyberAudit</span>
            <span className="hidden sm:block text-xs text-blue-400/70 border border-blue-500/20 rounded-full px-2 py-0.5 ml-1">
              by Deep Technologies
            </span>
          </div>
          <Link
            href="/audit"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Generate Free Report →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Free AI-Powered Security Report — No credit card required
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Know Your Cybersecurity<br />
          <span className="text-blue-400">Risk in 2 Minutes</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get a free AI-generated security report covering 6 risk categories, PIPEDA compliance,
          and a plain-English action plan. Built specifically for BC small businesses.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/audit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ShieldIcon />
            Generate My Free Report
          </Link>
          <a
            href="https://deeptechnologies.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-blue-500/30 hover:border-blue-500/60 text-slate-300 hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
          >
            Book a Professional Assessment →
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          {["100% Free", "No signup required", "PIPEDA-specific", "Plain English report"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckIcon />{t}</span>
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <div className="border-y border-blue-500/10 py-6" style={{ background: "rgba(13,31,60,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.num}>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{s.num}</div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl font-bold mt-3">From zero to report in 2 minutes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="rounded-2xl border border-blue-500/15 p-7" style={{ background: "#0d1f3c" }}>
              <div className="text-4xl font-extrabold text-blue-500/30 mb-4">{s.num}</div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S IN THE REPORT */}
      <section className="border-t border-blue-500/10 py-20" style={{ background: "rgba(13,31,60,0.4)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">What You Get</span>
            <h2 className="text-3xl font-bold mt-3">Six categories. One clear report.</h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Every report covers the same six risk categories, with scores, gaps, and specific fixes prioritized for your industry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <div key={c.title} className="rounded-xl border border-blue-500/15 p-5 flex gap-4" style={{ background: "#0d1f3c" }}>
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <div className="font-semibold text-sm mb-1">{c.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Built For</span>
        <h2 className="text-3xl font-bold mt-3 mb-4">Industries we specialize in</h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mb-10">
          PIPEDA compliance requirements differ by industry. Our report is tailored to your specific regulatory obligations.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["🦷 Dental Offices", "⚖️ Law Firms", "📊 Accounting Firms", "🏠 Real Estate", "🏥 Medical Clinics", "🛒 E-commerce"].map((i) => (
            <span key={i} className="border border-blue-500/25 text-slate-300 rounded-full px-5 py-2 text-sm font-medium" style={{ background: "#0d1f3c" }}>
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-blue-500/25 p-10 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f3c, #112748)" }}>
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3">Ready to know where you stand?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Free report. No signup. No sales call. Just a clear picture of your cybersecurity risk in plain English.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors"
            >
              <ShieldIcon />
              Generate My Free Report
            </Link>
            <div className="mt-6 text-sm text-slate-500">
              Need a professional assessment?{" "}
              <a href="https://deeptechnologies.ca" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Deep Technologies — $1,997 full audit, 48-hour delivery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-blue-500/10 py-8 text-center text-sm text-slate-600">
        <div className="max-w-6xl mx-auto px-6">
          <p>CyberAudit is powered by <a href="https://deeptechnologies.ca" className="text-blue-400/70 hover:text-blue-400" target="_blank" rel="noopener noreferrer">Deep Technologies Inc.</a> — Cybersecurity for BC Small Businesses</p>
          <p className="mt-1">Vancouver, BC · info@deeptechnologies.ca · 778-689-0690</p>
        </div>
      </footer>
    </div>
  );
}
