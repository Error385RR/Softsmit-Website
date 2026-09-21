import { site } from "@/content/site";
import type { SiteSettings } from "./types";

/** Used when nothing is stored yet, or when the database is unreachable. */
export const defaultSettings: SiteSettings = {
  tagline: site.tagline,
  email: site.contact.email ?? "",
  phone: site.contact.phone ?? "",
  whatsapp: site.contact.whatsapp ?? "",
  whatsappMessage: site.whatsappMessage,
  whatsappBubbleEnabled: true,
  ctaPrimaryLabel: site.cta.primary.label,
};
