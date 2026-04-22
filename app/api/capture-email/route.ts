import { NextRequest, NextResponse } from "next/server";

const BREVO = "https://api.brevo.com/v3";
const OWNER_EMAIL = "deep2secure@gmail.com";

export async function POST(req: NextRequest) {
  const { email, businessName, industry, province, employees } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const headers = {
    "api-key": process.env.BREVO_API_KEY!,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  // Save lead to Brevo contacts
  try {
    await fetch(`${BREVO}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: businessName,
          COMPANY: businessName,
          SMS: `${industry} | ${province} | ${employees}`,
        },
        updateEnabled: true,
      }),
    });
  } catch (err) {
    console.error("Brevo contact error:", err);
  }

  // Notify owner of new lead
  try {
    await fetch(`${BREVO}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "CyberAudit", email: "info@deeptechnologies.ca" },
        to: [{ email: OWNER_EMAIL, name: "Deep Technologies" }],
        subject: `New CyberAudit Lead: ${businessName}`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:500px;padding:24px;background:#f8fafc;border-radius:10px;">
            <div style="background:#0c1f3f;color:white;padding:16px 20px;border-radius:8px;margin-bottom:20px;">
              <strong style="font-size:16px;">🔔 New CyberAudit Lead</strong>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#64748b;width:120px;">Business</td><td style="padding:8px 0;font-weight:600;color:#1e293b;">${businessName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;font-weight:600;color:#2563eb;">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Industry</td><td style="padding:8px 0;color:#1e293b;">${industry}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Province</td><td style="padding:8px 0;color:#1e293b;">${province}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Employees</td><td style="padding:8px 0;color:#1e293b;">${employees}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Time</td><td style="padding:8px 0;color:#1e293b;">${new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" })}</td></tr>
            </table>
            <div style="margin-top:20px;padding:14px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:4px;font-size:13px;color:#1e40af;">
              <strong>Follow up within 24 hours.</strong> Pitch the $1,997 Full Assessment.<br>
              Reply directly to this email or call the lead at their business.
            </div>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error("Brevo notification error:", err);
  }

  return NextResponse.json({ success: true });
}
