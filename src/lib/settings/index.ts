import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { defaultSettings } from "./defaults";
import type { SiteSettings } from "./types";

type Row = {
  tagline: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  whatsapp_message: string | null;
  whatsapp_bubble_enabled: boolean | null;
  cta_primary_label: string | null;
};

/** A null column means "not set, use the default". An empty string means "deliberately empty (hidden)". */
function fromRow(row: Row): SiteSettings {
  const d = defaultSettings;
  return {
    tagline: row.tagline ?? d.tagline,
    email: row.email ?? d.email,
    phone: row.phone ?? d.phone,
    whatsapp: row.whatsapp ?? d.whatsapp,
    whatsappMessage: row.whatsapp_message ?? d.whatsappMessage,
    whatsappBubbleEnabled: row.whatsapp_bubble_enabled ?? d.whatsappBubbleEnabled,
    ctaPrimaryLabel: row.cta_primary_label ?? d.ctaPrimaryLabel,
  };
}

export function toRow(s: SiteSettings) {
  return {
    tagline: s.tagline,
    email: s.email,
    phone: s.phone,
    whatsapp: s.whatsapp,
    whatsapp_message: s.whatsappMessage,
    whatsapp_bubble_enabled: s.whatsappBubbleEnabled,
    cta_primary_label: s.ctaPrimaryLabel,
  };
}

/**
 * Public read of the site settings. Falls back to the built-in defaults if the
 * database is not configured, empty or unreachable, so the site never breaks.
 */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  const client = createPublicClient();
  if (!client) return defaultSettings;
  try {
    const { data, error } = await client.from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data) return defaultSettings;
    return fromRow(data as Row);
  } catch {
    return defaultSettings;
  }
});
