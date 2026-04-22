import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #050d1a 0%, #0d1f3c 50%, #050d1a 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            background: "#2563eb",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white", fontSize: "34px", fontWeight: 900 }}>CA</span>
        </div>
        <span style={{ color: "white", fontSize: "42px", fontWeight: 800, letterSpacing: "-1px" }}>
          CyberAudit
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          color: "white",
          fontSize: "62px",
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-2px",
          marginBottom: "12px",
        }}
      >
        Free AI Security Report
      </div>
      <div
        style={{
          color: "#60a5fa",
          fontSize: "62px",
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-2px",
          marginBottom: "32px",
        }}
      >
        for BC Small Businesses
      </div>

      {/* Subtext */}
      <div
        style={{
          color: "#94a3b8",
          fontSize: "24px",
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        PIPEDA compliance · Email security · Prioritized action plan · Free, no signup required
      </div>

      {/* Stat pills */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "48px" }}>
        {[
          { val: "2 min", label: "to complete" },
          { val: "6", label: "risk categories" },
          { val: "$0", label: "no credit card" },
        ].map(({ val, label }) => (
          <div
            key={label}
            style={{
              background: "rgba(37,99,235,0.25)",
              border: "1px solid rgba(37,99,235,0.5)",
              borderRadius: "12px",
              padding: "14px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#60a5fa", fontSize: "30px", fontWeight: 800 }}>{val}</span>
            <span style={{ color: "#94a3b8", fontSize: "15px", marginTop: "4px" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", color: "#475569", fontSize: "18px" }}>
        Powered by Deep Technologies Inc. · deeptechnologies.ca
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
