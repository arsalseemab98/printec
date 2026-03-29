import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapEmailHtml(body: string): string {
  return `
    <div style="background:#0C0C0C;padding:0;margin:0;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#0C0C0C;">
        <div style="background:#F7941D;padding:20px 24px;text-align:center;">
          <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;font-family:'Arial Black',Arial,sans-serif;letter-spacing:2px;">
            PRINTEC VIRGINIA LLC
          </h1>
        </div>
        <div style="padding:32px 24px;color:#ffffff;font-size:15px;line-height:1.8;">
          ${body}
        </div>
        <div style="padding:20px 24px;border-top:1px solid #161616;text-align:center;">
          <p style="margin:0;color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:2px;text-transform:uppercase;">
            Printec Virginia LLC — From Vision to Vinyl
          </p>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.25);font-size:11px;">
            <a href="https://printecwrap.com" style="color:#F7941D;text-decoration:none;">printecwrap.com</a>
            &nbsp;&middot;&nbsp; (715) 503-5444
            &nbsp;&middot;&nbsp; info@printecwrap.com
          </p>
        </div>
      </div>
    </div>
  `;
}

function replacePlaceholders(text: string, recipient: { name: string; email: string; service?: string }): string {
  return text
    .replace(/\{name\}/gi, escapeHtml(recipient.name))
    .replace(/\{email\}/gi, escapeHtml(recipient.email))
    .replace(/\{service\}/gi, escapeHtml(recipient.service || "your project"));
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();
  const { subject, emailBody, recipients, templateId } = body;

  if (!subject || !emailBody || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return NextResponse.json({ error: "subject, emailBody, and recipients[] are required" }, { status: 400 });
  }

  const emailFrom = process.env.EMAIL_FROM || "info@printecwrap.com";
  const graphClient = getGraphClient();

  const results: { email: string; status: string; error?: string }[] = [];

  for (const recipient of recipients) {
    const personalizedSubject = replacePlaceholders(subject, recipient);
    const personalizedBody = replacePlaceholders(emailBody, recipient);
    const fullHtml = wrapEmailHtml(personalizedBody);

    try {
      await graphClient.api(`/users/${emailFrom}/sendMail`).post({
        message: {
          subject: personalizedSubject,
          body: { contentType: "HTML", content: fullHtml },
          toRecipients: [{ emailAddress: { address: recipient.email } }],
          replyTo: [{ emailAddress: { address: emailFrom } }],
        },
      });

      // Log success
      await supabase.from("email_logs").insert({
        template_id: templateId || null,
        subject: personalizedSubject,
        recipient_email: recipient.email,
        recipient_name: recipient.name,
        status: "sent",
      });

      results.push({ email: recipient.email, status: "sent" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error(`[Email Send] Failed to send to ${recipient.email}:`, msg);

      await supabase.from("email_logs").insert({
        template_id: templateId || null,
        subject: personalizedSubject,
        recipient_email: recipient.email,
        recipient_name: recipient.name,
        status: "failed",
      });

      results.push({ email: recipient.email, status: "failed", error: msg });
    }
  }

  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return NextResponse.json({ sent, failed, total: recipients.length, results });
}
