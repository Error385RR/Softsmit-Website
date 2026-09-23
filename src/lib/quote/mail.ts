import nodemailer from "nodemailer";
import type { QuoteRequest } from "./types";

function envConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.QUOTE_TO_EMAIL || user;
  return user && pass && to ? { user, pass, to } : null;
}

const CONTACT_LABEL: Record<string, string> = { email: "Email", whatsapp: "WhatsApp", phone: "Phone" };

function buildMessage(q: QuoteRequest, serviceLabel: string) {
  const lines = [
    `Name: ${q.name}`,
    q.business ? `Business: ${q.business}` : null,
    `Email: ${q.email}`,
    `Phone / WhatsApp: ${q.phone}`,
    `Service needed: ${serviceLabel}`,
    q.budget ? `Budget: ${q.budget}` : null,
    q.preferredContact ? `Preferred contact method: ${CONTACT_LABEL[q.preferredContact]}` : null,
    "",
    "Description:",
    q.description,
    q.message ? `\nAdditional message:\n${q.message}` : null,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}

export type SendResult = { ok: true; devMode?: true } | { ok: false };

/**
 * Sends the quote request by email. If Gmail credentials aren't configured
 * (local development, or not set up yet), it logs the message to the console
 * instead of pretending to send it — never silently drop a request.
 */
export async function sendQuoteEmail(q: QuoteRequest, serviceLabel: string): Promise<SendResult> {
  const config = envConfig();
  const text = buildMessage(q, serviceLabel);
  const subject = `New quote request from ${q.name}${q.business ? ` (${q.business})` : ""}`;

  if (!config) {
    console.log(`[quote:dev-mode] Email delivery isn't configured — logging instead of sending.\nSubject: ${subject}\n${text}\n`);
    return { ok: true, devMode: true };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: config.user, pass: config.pass },
    // Fail fast rather than hanging: serverless functions have their own
    // time limit (as low as 10s on some Vercel plans), so a slow or
    // unreachable mail server must not block the request past that.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  try {
    await transporter.sendMail({
      from: `"Softsmith website" <${config.user}>`,
      to: config.to,
      replyTo: `"${q.name}" <${q.email}>`,
      subject,
      text,
    });
    return { ok: true };
  } catch (err) {
    console.error("[quote] sending email failed:", err instanceof Error ? err.message : err);
    return { ok: false };
  }
}
