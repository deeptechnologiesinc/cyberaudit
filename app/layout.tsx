import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberAudit — Free AI Security Report for BC Businesses",
  description:
    "Get a free AI-powered cybersecurity risk report in 2 minutes. PIPEDA compliance, email security audit, and a prioritized action plan. Built for BC small businesses.",
  openGraph: {
    title: "CyberAudit — Free AI Security Report for BC Businesses",
    description: "Know your cybersecurity risk in 2 minutes. Free report covering 6 risk categories + PIPEDA compliance.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
