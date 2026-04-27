import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const ENQUIRY_TO = "pchalla@kogniv.com";

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, message } = (req.body ?? {}) as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.length < 2) {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!company || typeof company !== "string" || company.length < 2) {
    return res.status(400).json({ error: "Invalid company" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "Kogniv <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  console.log("[contact] New inquiry from:", name, email, company);

  const notif = await resend.emails.send({
    from,
    to: [ENQUIRY_TO],
    subject: `New enquiry from ${name} — ${company}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#2040c8">New Kogniv Enquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;font-weight:bold;width:120px">Name</td><td>${escHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${escHtml(email)}">${escHtml(email)}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:bold">Company</td><td>${escHtml(company)}</td></tr>
          ${message && typeof message === "string" ? `<tr><td style="padding:8px 0;font-weight:bold;vertical-align:top">Message</td><td style="white-space:pre-wrap">${escHtml(message)}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  if (notif.error) {
    console.error("[contact] Resend error (team notification):", JSON.stringify(notif.error));
    return res.status(500).json({ error: "Failed to send enquiry. Please try again." });
  }

  console.log("[contact] Team notification sent, id:", notif.data?.id);

  const confirm = await resend.emails.send({
    from,
    to: [email],
    subject: "We've received your enquiry — Kogniv",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#2040c8">Thanks for reaching out, ${escHtml(name)}!</h2>
        <p>We've received your enquiry and a member of the Kogniv team will be in touch shortly.</p>
        <p style="color:#666;font-size:13px">
          If you have any urgent questions in the meantime, reply to this email and we'll get back to you as soon as possible.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="color:#999;font-size:12px">Kogniv — ServiceNow AI Transformation Intelligence</p>
      </div>
    `,
  });

  if (confirm.error) {
    console.warn("[contact] Resend error (visitor confirmation):", JSON.stringify(confirm.error));
  } else {
    console.log("[contact] Visitor confirmation sent, id:", confirm.data?.id);
  }

  return res.status(200).json({ ok: true });
}
