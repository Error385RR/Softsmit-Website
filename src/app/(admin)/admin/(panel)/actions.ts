"use server";

import { revalidatePath } from "next/cache";
import { validateAbout, validateFaqs, validateProcess, validateServices, type Errors, type Result } from "@/lib/cms/validate";
import { createSupabaseServerClient, getAdminUser } from "@/lib/supabase/server";

export type ContentSaveState = { status: "idle" | "saved" | "error"; message?: string; errors?: Errors };

async function save<T>(key: "faqs" | "services" | "process" | "about", validate: (v: unknown) => Result<T>, formData: FormData): Promise<ContentSaveState> {
  // Authorisation is re-checked on every save.
  if (!(await getAdminUser())) return { status: "error", message: "Your session has expired. Please sign in again." };

  const raw = String(formData.get("payload") ?? "");
  if (raw.length > 200_000) return { status: "error", message: "That is too much content to save at once." };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { status: "error", message: "Something went wrong with the form data. Please reload the page." };
  }

  const result = validate(parsed);
  if (!result.ok) return { status: "error", message: "Please fix the highlighted problems.", errors: result.errors };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "The dashboard is not configured yet." };
  const { error } = await supabase.from("site_content").upsert({ key, value: result.value, updated_at: new Date().toISOString() });
  if (error) {
    console.error(`[admin] saving ${key} failed:`, error.message);
    const hint = /relation .* does not exist|schema cache/i.test(error.message) ? " Run the latest supabase/schema.sql first." : "";
    return { status: "error", message: `Could not save your changes.${hint}` };
  }
  revalidatePath("/", "layout");
  return { status: "saved", message: "Saved. The public site is updated." };
}

export async function saveFaqsAction(_p: ContentSaveState, fd: FormData) {
  return save("faqs", validateFaqs, fd);
}
export async function saveServicesAction(_p: ContentSaveState, fd: FormData) {
  return save("services", validateServices, fd);
}
export async function saveProcessAction(_p: ContentSaveState, fd: FormData) {
  return save("process", validateProcess, fd);
}
export async function saveAboutAction(_p: ContentSaveState, fd: FormData) {
  return save("about", validateAbout, fd);
}
