import { NextResponse } from "next/server";
import { getServices } from "@/lib/content";
import { sendQuoteEmail } from "@/lib/quote/mail";
import { clientKey, isRateLimited } from "@/lib/quote/rate-limit";
import { validateQuote } from "@/lib/quote/validate";

// Nodemailer needs the Node.js runtime (it isn't Edge-compatible).
export const runtime = "nodejs";

export async function POST(req: Request) {
  // Basic abuse guard: a handful of requests per IP per 10 minutes.
  if (isRateLimited(clientKey(req))) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Something went wrong with your request. Please try again." }, { status: 400 });
  }

  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Honeypot: a real visitor never fills this hidden field. Pretend success
  // so automated submitters don't learn the field is being checked.
  if (typeof b.company === "string" && b.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const services = await getServices();
  const result = validateQuote(body, services.map((s) => s.id));
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "Please fix the highlighted fields.", errors: result.errors }, { status: 400 });
  }

  const serviceLabel = services.find((s) => s.id === result.value.serviceId)?.title ?? result.value.serviceId;
  const sent = await sendQuoteEmail(result.value, serviceLabel);
  if (!sent.ok) {
    return NextResponse.json({ ok: false, message: "Could not send your request. Please try again, or contact us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
