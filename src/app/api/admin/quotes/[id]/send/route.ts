import { NextRequest, NextResponse } from "next/server";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { createServerClient } from "@/lib/supabase";
import { QuotePDF } from "@/lib/quote-pdf";

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

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    // Fetch quote
    const { data: quote, error: quoteErr } = await supabase
      .from("quotes")
      .select("*")
      .eq("id", id)
      .single();

    if (quoteErr || !quote) {
      return NextResponse.json(
        { error: "Quote not found." },
        { status: 404 }
      );
    }

    // Fetch related inquiry
    const { data: inquiry, error: inqErr } = await supabase
      .from("inquiries")
      .select("*")
      .eq("id", quote.inquiry_id)
      .single();

    if (inqErr || !inquiry) {
      return NextResponse.json(
        { error: "Related inquiry not found." },
        { status: 404 }
      );
    }

    // Generate PDF
    const pdfElement = React.createElement(QuotePDF, {
      quote_number: quote.quote_number,
      items: quote.items || [],
      total: quote.total || 0,
      notes: quote.notes || null,
      created_at: quote.created_at,
      logoUrl: "https://printecwrap.com/printec-logo-light.png",
      customer: {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || null,
        service: inquiry.service || null,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(pdfElement as any);

    const base64Pdf = Buffer.from(pdfBuffer).toString("base64");
    const fileName = `Printec-Quote-${quote.quote_number}.pdf`;

    // Build email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#161616;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="background:#F7941D;padding:20px 24px;">
        <h1 style="margin:0;color:#0C0C0C;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
          Your Quote from Printec Virginia LLC
        </h1>
      </div>
      <div style="padding:28px 24px;color:#ccc;font-size:15px;line-height:1.7;">
        <p style="margin:0 0 16px;">Hi <strong style="color:#fff;">${escapeHtml(inquiry.name)}</strong>,</p>
        <p style="margin:0 0 16px;">Thank you for your interest in <strong style="color:#F7941D;">Printec Virginia LLC</strong>. Please find your personalized quote <strong style="color:#fff;">${escapeHtml(quote.quote_number)}</strong> attached as a PDF.</p>
        <p style="margin:0 0 16px;">Your quoted total is: <strong style="color:#F7941D;font-size:18px;">$${Number(quote.total).toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></p>
        <p style="margin:0 0 16px;color:#888;">This quote is valid for 30 days. If you have any questions or would like to proceed, simply reply to this email or call us at <strong style="color:#fff;">(647) 299-1460</strong>.</p>
        <p style="margin:0;color:#888;">— The Printec Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px;color:#444;font-size:11px;letter-spacing:1px;">
      PRINTEC CORP &mdash; FROM VISION TO VINYL
    </div>
  </div>
</body>
</html>`;

    // Send email via Microsoft Graph
    const emailFrom = process.env.EMAIL_FROM!;
    const graphClient = getGraphClient();

    await graphClient.api(`/users/${emailFrom}/sendMail`).post({
      message: {
        subject: `Your Quote from Printec Virginia LLC — ${quote.quote_number}`,
        body: { contentType: "HTML", content: emailHtml },
        toRecipients: [
          { emailAddress: { address: inquiry.email } },
        ],
        replyTo: [
          { emailAddress: { address: emailFrom } },
        ],
        attachments: [
          {
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: fileName,
            contentType: "application/pdf",
            contentBytes: base64Pdf,
          },
        ],
      },
    });

    // Update sent_at timestamp
    const { data: updated, error: updateErr } = await supabase
      .from("quotes")
      .update({ sent_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      // Email already sent — log but don't fail
      console.error("Failed to update sent_at:", updateErr);
    }

    return NextResponse.json({
      success: true,
      sent_at: updated?.sent_at ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error("Quote send error:", error);
    return NextResponse.json(
      { error: "Failed to send quote. Please try again." },
      { status: 500 }
    );
  }
}
