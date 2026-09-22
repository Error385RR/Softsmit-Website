import { cache } from "react";
import { aboutContent } from "@/content/about";
import { faqs as defaultFaqs } from "@/content/faq";
import { processSteps as defaultProcess } from "@/content/process";
import { services as defaultServices } from "@/content/services";
import type { AboutEditable, FaqEntry, ProcessStep, Service } from "@/content/types";
import { createPublicClient } from "@/lib/supabase/public";
import { validateAbout, validateFaqs, validateProcess, validateServices, type Result } from "./validate";

export type ContentKey = "faqs" | "services" | "process" | "about";

/** One request per render fetches every content block. */
const getRows = cache(async (): Promise<Partial<Record<ContentKey, unknown>>> => {
  const client = createPublicClient();
  if (!client) return {};
  try {
    const { data, error } = await client.from("site_content").select("key,value");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r: { key: string; value: unknown }) => [r.key, r.value]));
  } catch {
    return {};
  }
});

/** Stored content is re-validated on every read; anything malformed falls back to the built-in defaults. */
async function resolve<T>(key: ContentKey, validate: (v: unknown) => Result<T>, fallback: T): Promise<T> {
  const raw = (await getRows())[key];
  if (raw === undefined) return fallback;
  const result = validate(raw);
  return result.ok ? result.value : fallback;
}

// These include hidden items: used by the dashboard editors.
export const loadFaqs = () => resolve<FaqEntry[]>("faqs", validateFaqs, defaultFaqs);
export const loadServices = () => resolve<Service[]>("services", validateServices, defaultServices);
export const loadProcess = () => resolve<ProcessStep[]>("process", validateProcess, defaultProcess);
export const loadAbout = () =>
  resolve<AboutEditable>("about", validateAbout, {
    intro: aboutContent.intro,
    paragraphs: aboutContent.philosophy.paragraphs,
    approachItems: aboutContent.approach.items,
    person: aboutContent.behind.person,
  });
