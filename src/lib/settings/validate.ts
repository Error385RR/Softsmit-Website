import type { SiteSettings } from "./types";

export type FieldErrors = Partial<Record<keyof SiteSettings, string>>;
export type ParseResult = { ok: true; value: SiteSettings } | { ok: false; errors: FieldErrors; values: SiteSettings };

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/** Server-side validation. Never trust the browser: this runs on every save. */
export function parseSettingsForm(fd: FormData): ParseResult {
  const digits = text(fd, "whatsapp").replace(/[\s+()-]/g, "");
  const value: SiteSettings = {
    tagline: text(fd, "tagline"),
    ctaPrimaryLabel: text(fd, "ctaPrimaryLabel"),
    email: text(fd, "email"),
    phone: text(fd, "phone"),
    whatsapp: digits,
    whatsappMessage: text(fd, "whatsappMessage"),
    whatsappBubbleEnabled: fd.get("whatsappBubbleEnabled") === "on",
  };
  const errors: FieldErrors = {};

  if (!value.tagline) errors.tagline = "Enter a tagline.";
  else if (value.tagline.length > 120) errors.tagline = "Keep the tagline under 120 characters.";

  if (!value.ctaPrimaryLabel) errors.ctaPrimaryLabel = "Enter the button text.";
  else if (value.ctaPrimaryLabel.length > 30) errors.ctaPrimaryLabel = "Keep the button text under 30 characters.";

  if (value.email && (value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.email))) {
    errors.email = "Enter a valid email address, or leave it empty to hide it.";
  }

  if (value.phone) {
    const phoneDigits = value.phone.replace(/\D/g, "");
    if (!/^\+?[0-9 ()-]+$/.test(value.phone) || phoneDigits.length < 6 || phoneDigits.length > 15) {
      errors.phone = "Enter a valid phone number, or leave it empty to hide it.";
    }
  }

  if (value.whatsapp && !/^[0-9]{8,15}$/.test(value.whatsapp)) {
    errors.whatsapp = "Use the full international number, digits only (for example 971501234567).";
  }

  if (value.whatsappMessage.length > 200) errors.whatsappMessage = "Keep the message under 200 characters.";

  return Object.keys(errors).length ? { ok: false, errors, values: value } : { ok: true, value };
}
