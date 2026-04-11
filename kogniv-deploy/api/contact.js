const nodemailer = require("nodemailer");

/** Strip HTML tags and limit length to prevent injection / spam */
function sanitize(str, maxLen = 500) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function handler(req, res) {
  // CORS preflight
  res.setHeader("Access-Control-Allow-Origin",  "https://kogniv.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST")    { res.status(405).json({ error: "Method not allowed" }); return; }

  const raw = req.body ?? {};

  const name    = sanitize(raw.name,    100);
  const email   = sanitize(raw.email,   254);
  const company = sanitize(raw.company, 100);
  const message = sanitize(raw.message, 2000);

  // Validation
  if (!name || name.length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters." });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }
  if (!company || company.length < 2) {
    return res.status(400).json({ error: "Company must be at least 2 characters." });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const toEmail  = process.env.CONTACT_TO_EMAIL || "pchalla@kogniv.com";

  if (!smtpUser || !smtpPass) {
    console.warn("SMTP_USER or SMTP_PASS not configured — logging submission.");
    console.log("Contact form submission:", { name, email, company, message });
    return res.status(200).json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host:   smtpHost,
      port:   smtpPort,
      secure: smtpPort === 465,
      auth:   { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from:    `"Kogniv Website" <${smtpUser}>`,
      to:      toEmail,
      replyTo: email,
      subject: `New inquiry from ${name} — ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1d4ed8;">New Contact Inquiry — Kogniv</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Company</td><td>${company}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Message</td><td>${message || "—"}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;"/>
          <p style="color:#6b7280;font-size:12px;">Sent from kogniv.com contact form</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }
};

