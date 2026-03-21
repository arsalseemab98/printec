import { NextRequest, NextResponse } from "next/server";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

// ── Rate limiting (in-memory) ──
const recentSubmissions = new Map<string, number>();

// Clean up old entries on each request (serverless-safe)
function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp > 120_000) recentSubmissions.delete(key);
  }
}

function getGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID!,
    process.env.AZURE_CLIENT_ID!,
    process.env.AZURE_CLIENT_SECRET!
  );
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return Client.initWithMiddleware({ authProvider });
}

function buildNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  description?: string;
  budget?: string;
  source: string;
  page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  const isQuote = data.source === "contact-form";
  const subject = isQuote
    ? `New Quote Request from ${data.name} — ${data.service || "General"}`
    : `New Contact from ${data.name}`;

  const hasUtm = data.utm_source || data.utm_medium || data.utm_campaign;

  const rows = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone || "—" },
    ...(isQuote
      ? [
          { label: "Service", value: data.service || "—" },
          { label: "Budget", value: data.budget || "—" },
        ]
      : []),
    { label: "Message", value: data.description || "—" },
    { label: "Form", value: isQuote ? "Contact Page Form" : "Floating Widget" },
    { label: "Page", value: data.page || "—" },
    ...(hasUtm
      ? [
          { label: "📊 UTM Source", value: data.utm_source || "—" },
          { label: "📊 UTM Medium", value: data.utm_medium || "—" },
          { label: "📊 UTM Campaign", value: data.utm_campaign || "—" },
          ...(data.utm_term ? [{ label: "📊 UTM Term", value: data.utm_term }] : []),
          ...(data.utm_content ? [{ label: "📊 UTM Content", value: data.utm_content }] : []),
        ]
      : [{ label: "Traffic", value: "Direct / Organic" }]),
  ];

  const tableRows = rows
    .map(
      (r) =>
        `<tr>
          <td style="padding:10px 14px;font-weight:700;color:#F7941D;border-bottom:1px solid #222;white-space:nowrap;vertical-align:top;">${r.label}</td>
          <td style="padding:10px 14px;color:#ffffff;border-bottom:1px solid #222;">${escapeHtml(r.value)}</td>
        </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          ${isQuote ? "New Quote Request" : "New Contact Message"}
        </h1>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#111;">
        ${tableRows}
      </table>
      <div style="padding:16px 24px;color:#666;font-size:12px;">
        Submitted at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET via printecwrap.com
      </div>
    </div>
  </div>
</body>
</html>`;

  return { subject, html };
}

function buildConfirmationEmail(name: string) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          Thank You, ${escapeHtml(name)}!
        </h1>
      </div>
      <div style="padding:28px 24px;color:#ccc;font-size:15px;line-height:1.7;">
        <p style="margin:0 0 16px;">Thanks for reaching out to <strong style="color:#F7941D;">Printec Corp</strong>. We've received your message and our team will get back to you within <strong style="color:#fff;">24 hours</strong>.</p>
        <p style="margin:0 0 16px;">In the meantime, feel free to check out our latest work on <a href="https://www.instagram.com/printecvirginia/" style="color:#F7941D;text-decoration:none;">Instagram</a> or browse our <a href="https://printecwrap.com/portfolio" style="color:#F7941D;text-decoration:none;">portfolio</a>.</p>
        <p style="margin:0;color:#888;">— The Printec Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px;color:#444;font-size:11px;letter-spacing:1px;">
      PRINTEC CORP &mdash; FROM VISION TO VINYL
    </div>
  </div>
</body>
</html>`;

  return {
    subject: "Thanks for contacting Printec Corp!",
    html,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, description, budget, source, page, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = body;

    cleanupRateLimit();

    // ── Validation ──
    if (!name || !email || !source) {
      return NextResponse.json(
        { error: "Name, email, and source are required." },
        { status: 400 }
      );
    }

    if (source === "contact-form" && (!service || !description)) {
      return NextResponse.json(
        { error: "Service and description are required for quote requests." },
        { status: 400 }
      );
    }

    // ── Rate limiting ──
    const rateKey = `${email.toLowerCase()}_${source}`;
    const lastSubmission = recentSubmissions.get(rateKey);
    if (lastSubmission && Date.now() - lastSubmission < 60_000) {
      return NextResponse.json(
        { error: "Please wait a moment before submitting again." },
        { status: 429 }
      );
    }
    recentSubmissions.set(rateKey, Date.now());

    // ── Build emails ──
    const emailFrom = process.env.EMAIL_FROM!;
    const client = getGraphClient();

    const notification = buildNotificationEmail({
      name,
      email,
      phone,
      service,
      description,
      budget,
      source,
      page,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    });

    const confirmation = buildConfirmationEmail(name);

    // ── Send notification to Printec ──
    await client.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject: notification.subject,
        body: { contentType: "HTML", content: notification.html },
        toRecipients: [{ emailAddress: { address: emailFrom } }],
        replyTo: [{ emailAddress: { address: email } }],
      },
    });

    // ── Send confirmation to customer ──
    await client.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject: confirmation.subject,
        body: { contentType: "HTML", content: confirmation.html },
        toRecipients: [{ emailAddress: { address: email } }],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
