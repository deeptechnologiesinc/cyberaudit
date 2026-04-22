"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/* ── helpers ── */
function parseMarkdown(md: string): string {
  return md
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^\|[-:\s|]+\|$/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^---$/gm, "<hr>")
    .replace(/^\| (.+)$/gm, (line) => {
      if (line.includes("---")) return "";
      const cells = line.replace(/^\| /, "").replace(/ \|$/, "").split(" | ");
      const tag = cells[0].includes("**") ? "th" : "td";
      return `<tr>${cells.map((c) => `<${tag}>${c.replace(/\*\*/g, "")}</${tag}>`).join("")}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, (m) => `<table>${m}</table>`)
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
    .replace(/(<li>.*<\/li>\n?)+/gs, (m) => `<ul>${m}</ul>`)
    .replace(/^(?!<[a-z]).+$/gm, (line) => (line.trim() ? `<p>${line}</p>` : ""))
    .replace(/\n{3,}/g, "\n");
}

/* ── PDF generator ── */
function generatePrintDocument(
  businessName: string,
  date: string,
  industry: string,
  province: string,
  employees: string,
  reportHtml: string
): string {
  const shield = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" stroke="white" stroke-width="1"/></svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CyberAudit Security Report — ${businessName}</title>
<style>
@page {
  size: letter;
  margin: 0.65in 0.7in 0.75in 0.7in;
  @bottom-center {
    content: "Deep Technologies Inc.  ·  deeptechnologies.ca  ·  778-689-0690";
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 7pt;
    color: #94a3b8;
  }
  @bottom-right {
    content: "Page " counter(page) " of " counter(pages);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 7pt;
    color: #94a3b8;
  }
}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;
  font-size:10.5pt;line-height:1.55;color:#1e293b;background:white;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;
}

/* HEADER */
.doc-header{
  background:linear-gradient(135deg,#0c1f3f 0%,#1e3a5f 100%);
  color:white;padding:20px 26px;border-radius:10px;
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:14px;
}
.header-left{display:flex;align-items:center;gap:14px;}
.logo-box{
  width:46px;height:46px;background:#2563eb;border-radius:10px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.header-text h1{font-size:15.5pt;font-weight:800;letter-spacing:-0.3px;line-height:1.2;}
.header-text .sub{font-size:8.5pt;opacity:0.6;margin-top:3px;letter-spacing:0.2px;}
.header-right{text-align:right;}
.header-right .rl{font-size:7pt;text-transform:uppercase;letter-spacing:1px;opacity:0.55;display:block;}
.header-right .rd{font-size:10pt;font-weight:600;margin-top:2px;}

/* META STRIP */
.meta-strip{
  background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;
  padding:13px 20px;display:grid;grid-template-columns:2fr 1.5fr 1fr 1fr;
  gap:16px;margin-bottom:22px;
}
.meta-item .ml{font-size:6.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;display:block;margin-bottom:2px;}
.meta-item .mv{font-size:10pt;font-weight:600;color:#0c1f3f;}

/* SCORE CALLOUT */
.score-callout{
  display:flex;align-items:center;gap:20px;
  background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;
  border-radius:8px;padding:14px 18px;margin:8px 0 14px;
}
.score-ring{
  width:64px;height:64px;border-radius:50%;border:5px solid #dc2626;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.score-ring.high{border-color:#ea580c;}
.score-ring.medium{border-color:#d97706;}
.score-ring.low{border-color:#16a34a;}
.score-num{font-size:18pt;font-weight:800;color:#dc2626;line-height:1;}
.score-ring.high .score-num{color:#ea580c;}
.score-ring.medium .score-num{color:#d97706;}
.score-ring.low .score-num{color:#16a34a;}
.score-label{font-size:7.5pt;text-transform:uppercase;letter-spacing:0.6px;color:#64748b;font-weight:700;display:block;}
.score-desc{font-size:10.5pt;font-weight:600;color:#1e293b;margin-top:2px;}

/* HEADINGS */
h2{
  font-size:12pt;font-weight:700;color:#0c1f3f;
  border-left:4px solid #2563eb;padding-left:12px;
  margin:22px 0 9px;page-break-after:avoid;line-height:1.3;
}
h3{font-size:11pt;font-weight:600;color:#1e3a5f;margin:14px 0 5px;page-break-after:avoid;}
p{margin:5px 0 8px;color:#374151;font-size:10.5pt;}
strong{font-weight:600;color:#1e293b;}
em{font-style:italic;}

/* TABLE */
table{width:100%;border-collapse:collapse;margin:10px 0 16px;font-size:10pt;page-break-inside:avoid;}
th{
  background:#0c1f3f;color:white;text-align:left;
  padding:9px 13px;font-size:8pt;font-weight:700;
  text-transform:uppercase;letter-spacing:0.5px;
}
th:first-child{border-radius:6px 0 0 0;}th:last-child{border-radius:0 6px 0 0;}
td{padding:8px 13px;border-bottom:1px solid #e8edf3;color:#374151;vertical-align:middle;}
tr:last-child td{border-bottom:none;}
tr:nth-child(odd) td{background:#f8fafc;}
tr:nth-child(even) td{background:white;}

/* RISK BADGES */
.badge{
  display:inline-block;padding:2px 9px;border-radius:20px;
  font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;
}
.badge-critical{background:#fef2f2;color:#991b1b;border:1px solid #fca5a5;}
.badge-high{background:#fff7ed;color:#9a3412;border:1px solid #fdba74;}
.badge-moderate{background:#fffbeb;color:#92400e;border:1px solid #fcd34d;}
.badge-low{background:#f0fdf4;color:#166534;border:1px solid #86efac;}

/* SEVERITY LABELS */
.sev{font-weight:700;font-size:9pt;text-transform:uppercase;letter-spacing:0.3px;}
.sev-critical{color:#dc2626;}.sev-high{color:#ea580c;}.sev-moderate{color:#d97706;}.sev-low{color:#16a34a;}

/* LISTS */
ul,ol{margin:6px 0 10px 20px;}
li{margin:4px 0;color:#374151;font-size:10.5pt;}
li::marker{color:#2563eb;}

/* ACTION PLAN ITEMS */
.action-item{
  background:#f8fafc;border:1px solid #e8edf3;border-radius:6px;
  padding:8px 12px;margin:5px 0;font-size:10pt;color:#374151;
}

/* DIVIDER */
hr{border:none;border-top:1.5px solid #e2e8f0;margin:18px 0;}

/* PIPEDA / CALLOUT BLOCKS */
blockquote{
  background:#eff6ff;border-left:4px solid #2563eb;border-radius:0 6px 6px 0;
  padding:10px 14px;margin:8px 0;color:#1e40af;font-size:10pt;
}

/* FOOTER */
.doc-footer{
  background:#0c1f3f;color:rgba(255,255,255,0.65);
  text-align:center;padding:10px 20px;font-size:7pt;line-height:1.5;
  border-radius:8px;margin-top:32px;
}
.doc-footer strong{color:rgba(255,255,255,0.92);}

@media screen{
  body{padding:24px;max-width:900px;margin:0 auto;}
  .print-btn{
    display:block;width:220px;margin:20px auto;padding:12px 28px;
    background:#2563eb;color:white;border:none;border-radius:8px;
    font-size:11pt;font-weight:600;cursor:pointer;
  }
  .print-btn:hover{background:#1d4ed8;}
}
@media print{.print-btn{display:none!important;}}
</style>
</head>
<body>

<div class="doc-header">
  <div class="header-left">
    <div class="logo-box">${shield}</div>
    <div class="header-text">
      <h1>Security Risk Report</h1>
      <div class="sub">CyberAudit AI &nbsp;·&nbsp; Powered by Deep Technologies Inc.</div>
    </div>
  </div>
  <div class="header-right">
    <span class="rl">Generated</span>
    <div class="rd">${date}</div>
  </div>
</div>

<div class="meta-strip">
  <div class="meta-item"><span class="ml">Business</span><span class="mv">${businessName}</span></div>
  <div class="meta-item"><span class="ml">Industry</span><span class="mv">${industry || "Not specified"}</span></div>
  <div class="meta-item"><span class="ml">Province</span><span class="mv">${province}</span></div>
  <div class="meta-item"><span class="ml">Employees</span><span class="mv">${employees}</span></div>
</div>

<div class="report-body">${reportHtml}</div>

<div class="doc-footer">
  <strong>Deep Technologies Inc.</strong> &nbsp;&middot;&nbsp; deeptechnologies.ca &nbsp;&middot;&nbsp; 778-689-0690 &nbsp;&middot;&nbsp; info@deeptechnologies.ca<br>
  This automated report is for informational purposes only and does not constitute a professional security audit. &copy; ${new Date().getFullYear()} Deep Technologies Inc.
</div>

<button class="print-btn no-print" onclick="window.print()">&#8595;&nbsp; Save as PDF</button>

<script>
(function(){
  // Color-code risk level cells in tables
  document.querySelectorAll('td').forEach(function(td){
    var t = td.textContent.trim();
    var map = {Critical:'critical',High:'high',Moderate:'moderate',Low:'low'};
    if(map[t]) td.innerHTML='<span class="badge badge-'+map[t]+'">'+t+'</span>';
  });

  // Style Severity: X labels
  document.querySelectorAll('strong').forEach(function(el){
    var t = el.textContent.trim();
    var m = t.match(/^Severity:\\s*(Critical|High|Moderate|Low)$/i);
    if(m){
      var lvl = m[1].toLowerCase();
      el.outerHTML='<span class="sev sev-'+lvl+'">'+t+'</span>';
    }
  });

  // Extract score and inject visual callout after the score heading
  document.querySelectorAll('h2').forEach(function(h2){
    var m = h2.textContent.match(/(\\d+)\\/100/);
    if(!m) return;
    var score = parseInt(m[1]);
    var ringClass = score >= 65 ? 'high' : score >= 40 ? 'medium' : 'low';
    var label = score >= 65 ? 'High Risk' : score >= 40 ? 'Moderate Risk' : 'Lower Risk';
    var div = document.createElement('div');
    div.className='score-callout';
    div.innerHTML='<div class="score-ring '+ringClass+'"><span class="score-num">'+score+'</span></div>'
      +'<div><span class="score-label">Overall Risk Score (out of 100)</span>'
      +'<div class="score-desc">'+label+' — higher scores indicate more exposure</div></div>';
    h2.insertAdjacentElement('afterend',div);
    // Update the heading text to remove the score number (already shown visually)
    h2.textContent='Overall Security Risk Score';
  });

  // Auto-print on load
  window.addEventListener('load',function(){
    setTimeout(function(){ window.print(); },350);
  });
})();
</script>
</body>
</html>`;
}

/* ── types ── */
type Step = "form" | "loading" | "email-gate" | "report";

interface FormData {
  businessName: string;
  domain: string;
  industry: string;
  province: string;
  employees: string;
  itSetup: string;
  concerns: string[];
}

const CONCERNS = [
  "Data breach / ransomware",
  "Phishing & email fraud",
  "PIPEDA / privacy compliance",
  "Remote work security",
  "Customer data protection",
  "Cyber insurance requirements",
];

const INDUSTRIES = [
  "Dental Office / Clinic",
  "Law Firm",
  "Accounting / CPA Firm",
  "Real Estate Brokerage",
  "Medical / Healthcare Clinic",
  "E-commerce / Retail",
  "Financial Services",
  "Other Professional Services",
];

/* ── sub-components ── */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-300 mb-2">{children}</label>;
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-lg px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 focus:border-blue-500/50 transition-all"
      style={{ background: "#0a1628" }}
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-lg px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 focus:border-blue-500/50 transition-all appearance-none"
      style={{ background: "#0a1628" }}
    >
      {children}
    </select>
  );
}

/* ── main component ── */
export default function AuditPage() {
  const [step, setStep] = useState<Step>("form");
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    businessName: "",
    domain: "",
    industry: "",
    province: "British Columbia",
    employees: "",
    itSetup: "",
    concerns: [],
  });

  function setField(k: keyof FormData, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toggleConcern(c: string) {
    setForm((f) => ({
      ...f,
      concerns: f.concerns.includes(c) ? f.concerns.filter((x) => x !== c) : [...f.concerns, c],
    }));
  }

  function handleSavePDF() {
    const date = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
    const html = generatePrintDocument(
      form.businessName, date, form.industry, form.province, form.employees,
      parseMarkdown(report)
    );
    const win = window.open("", "_blank");
    if (!win) {
      alert("Pop-up blocked. Please allow pop-ups for this site, then try again.");
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.businessName || !form.industry || !form.employees) return;
    setError("");
    setStep("loading");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const { report: text } = await res.json();
      setReport(text);
      setStep("email-gate");
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError("Something went wrong generating your report. Please try again.");
      setStep("form");
      console.error(err);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEmailLoading(true);
    try {
      await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          businessName: form.businessName,
          industry: form.industry,
          province: form.province,
          employees: form.employees,
        }),
      });
    } catch (err) {
      console.error("Email capture failed:", err);
    }
    setEmailLoading(false);
    setStep("report");
    setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #050d1a 0%, #0d1f3c 50%, #050d1a 100%)" }}>

      {/* NAV */}
      <nav className="border-b border-blue-500/10 sticky top-0 z-50" style={{ background: "rgba(5,13,26,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">CyberAudit</span>
          </Link>
          <a href="https://deeptechnologies.ca" target="_blank" rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors hidden sm:block">
            Need a full assessment? → deeptechnologies.ca
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* FORM */}
        {(step === "form" || step === "loading") && (
          <div>
            <div className="text-center mb-10">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Free Report</span>
              <h1 className="text-3xl font-extrabold mt-2 mb-3">Your AI Security Assessment</h1>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Answer 6 quick questions about your business. We'll generate a comprehensive security risk report — free, no signup needed.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-blue-500/15 p-7 space-y-6" style={{ background: "#0d1f3c" }}>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest pb-2 border-b border-blue-500/15">
                  About Your Business
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Business Name *</Label>
                    <Input
                      required
                      placeholder="Acme Dental Clinic"
                      value={form.businessName}
                      onChange={(e) => setField("businessName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Website / Domain</Label>
                    <Input
                      placeholder="acmedental.ca"
                      value={form.domain}
                      onChange={(e) => setField("domain", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Industry *</Label>
                    <Select required value={form.industry} onChange={(e) => setField("industry", e.target.value)}>
                      <option value="">Select your industry…</option>
                      {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                    </Select>
                  </div>
                  <div>
                    <Label>Province</Label>
                    <Select value={form.province} onChange={(e) => setField("province", e.target.value)}>
                      {["British Columbia", "Alberta", "Ontario", "Manitoba", "Saskatchewan", "Other"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Number of Employees *</Label>
                    <Select required value={form.employees} onChange={(e) => setField("employees", e.target.value)}>
                      <option value="">Select…</option>
                      <option>1–5 employees</option>
                      <option>6–15 employees</option>
                      <option>16–30 employees</option>
                      <option>31–50 employees</option>
                      <option>50+ employees</option>
                    </Select>
                  </div>
                  <div>
                    <Label>Current IT Setup</Label>
                    <Select value={form.itSetup} onChange={(e) => setField("itSetup", e.target.value)}>
                      <option value="">Select…</option>
                      <option>No IT support at all</option>
                      <option>Occasional freelance IT help</option>
                      <option>Dedicated internal IT person</option>
                      <option>Managed IT company / MSP</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-500/15 p-7" style={{ background: "#0d1f3c" }}>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest pb-2 border-b border-blue-500/15 mb-5">
                  Top Security Concerns (select all that apply)
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CONCERNS.map((c) => {
                    const checked = form.concerns.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleConcern(c)}
                        className={`text-left text-sm px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
                          checked
                            ? "bg-blue-600/20 border-blue-500/50 text-white"
                            : "border-blue-500/15 text-slate-400 hover:border-blue-500/30 hover:text-slate-300"
                        }`}
                        style={!checked ? { background: "#0a1628" } : {}}
                      >
                        <span className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all ${
                          checked ? "bg-blue-600 border-blue-600" : "border-slate-600"
                        }`}>
                          {checked && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={step === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                {step === "loading" ? (
                  <>
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Generating your report…
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Generate My Free Security Report
                  </>
                )}
              </button>

              {step === "loading" && (
                <p className="text-center text-sm text-slate-500 -mt-2">
                  This takes 15–30 seconds. Our AI is analysing your business profile…
                </p>
              )}
            </form>
          </div>
        )}

        {/* EMAIL GATE */}
        {step === "email-gate" && (
          <div ref={reportRef} className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Score teaser */}
            {(() => {
              const m = report.match(/(\d+)\/100/);
              const score = m ? parseInt(m[1]) : null;
              const color = score === null ? "#2563eb" : score >= 65 ? "#dc2626" : score >= 40 ? "#d97706" : "#16a34a";
              const label = score === null ? "" : score >= 65 ? "High Risk" : score >= 40 ? "Moderate Risk" : "Lower Risk";
              return score !== null ? (
                <div className="mb-8 flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 mb-1" style={{ borderColor: color }}>
                    <span className="text-4xl font-extrabold" style={{ color }}>{score}</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
                    {label} — {score}/100
                  </div>
                  <div className="text-slate-500 text-xs">Your full report is ready</div>
                </div>
              ) : null;
            })()}

            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-blue-500/20 p-8" style={{ background: "#0d1f3c" }}>
                <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">One Last Step</div>
                <h2 className="text-2xl font-bold mb-2">Your report is ready</h2>
                <p className="text-slate-400 text-sm mb-6">
                  Enter your email to access your full security report for <strong className="text-white">{form.businessName}</strong>.
                  We'll also send you a copy to keep.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="you@yourbusiness.ca"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 focus:border-blue-500/50 transition-all"
                    style={{ background: "#0a1628" }}
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {emailLoading ? (
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    )}
                    {emailLoading ? "Unlocking…" : "View My Full Report"}
                  </button>
                </form>
                <p className="text-xs text-slate-600 mt-4">No spam. No credit card. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        )}

        {/* REPORT */}
        {step === "report" && (
          <div ref={reportRef}>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Your Report</span>
                <h1 className="text-2xl font-bold mt-1">{form.businessName} — Security Assessment</h1>
                <p className="text-slate-500 text-sm mt-1">Generated by CyberAudit AI · {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSavePDF}
                  className="border border-blue-500/30 hover:border-blue-500/60 text-slate-300 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Save as PDF ↓
                </button>
                <button
                  onClick={() => { setStep("form"); setReport(""); }}
                  className="border border-blue-500/30 hover:border-blue-500/60 text-slate-300 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  New Report
                </button>
              </div>
            </div>

            {/* Report content */}
            <div className="rounded-2xl border border-blue-500/15 p-8 mb-8" style={{ background: "#0d1f3c" }}>
              <div
                className="report-content"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(report) }}
              />
            </div>

            {/* CTA after report */}
            <div className="rounded-2xl border border-blue-500/25 p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f3c, #112748)" }}>
              <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="text-2xl font-bold mb-2">Want a professional deep-dive?</div>
                <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                  This AI report is a starting point. Deep Technologies' full assessment includes dark web scans, live email security tests, and a 60-minute review call — delivered in 48 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://deeptechnologies.ca/pages/services.html#full-assessment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    Book Full Assessment — $1,997 CAD
                  </a>
                  <a
                    href="tel:+17786890690"
                    className="border border-blue-500/30 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    Call 778-689-0690
                  </a>
                </div>
                <p className="text-xs text-slate-600 mt-4">Flat fee · 48-hour delivery · No lock-in contracts</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
