import type { ContactPreference, QuoteRequest } from "./types";

export type Errors = Partial<Record<keyof QuoteRequest, string>>;
export type Result = { ok: true; value: QuoteRequest } | { ok: false; errors: Errors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTACT_PREFS: ContactPreference[] = ["email", "whatsapp", "phone"];

function clean(v: unknown): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]+/g, " ").trim() : "";
}

/**
 * Validates a quote request. `allowedServiceIds` should be the current
 * (visible) service ids, so a request can never reference a service that
 * doesn't exist or is hidden.
 */
export function validateQuote(input: unknown, allowedServiceIds: string[]): Result {
  const r = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: Errors = {};

  const name = clean(r.name);
  if (!name) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";

  const business = clean(r.business);
  if (business.length > 100) errors.business = "Keep the business name under 100 characters.";

  const email = clean(r.email);
  if (!email) errors.email = "Enter your email.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  const phone = clean(r.phone);
  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Enter a phone or WhatsApp number.";
  else if (!/^\+?[0-9 ()-]+$/.test(phone) || phoneDigits.length < 6 || phoneDigits.length > 15) {
    errors.phone = "Enter a valid phone or WhatsApp number.";
  }

  const serviceId = clean(r.service);
  if (!serviceId) errors.serviceId = "Choose the service you need.";
  else if (!allowedServiceIds.includes(serviceId)) errors.serviceId = "Choose a service from the list.";

  const description = clean(r.description);
  if (!description) errors.description = "Briefly describe what you need.";
  else if (description.length > 2000) errors.description = "Keep the description under 2000 characters.";

  const budget = clean(r.budget);
  if (budget.length > 100) errors.budget = "Keep the budget note under 100 characters.";

  const preferredRaw = clean(r.preferredContact);
  const preferredContact = (preferredRaw === "" ? "" : preferredRaw) as ContactPreference | "";
  if (preferredContact !== "" && !CONTACT_PREFS.includes(preferredContact)) errors.preferredContact = "Choose a valid contact method.";

  const message = clean(r.message);
  if (message.length > 2000) errors.message = "Keep the message under 2000 characters.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { name, business, email, phone, serviceId, description, budget, preferredContact, message } };
}
