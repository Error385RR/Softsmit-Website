"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toRow } from "@/lib/settings";
import { parseSettingsForm, type FieldErrors } from "@/lib/settings/validate";
import type { SiteSettings } from "@/lib/settings/types";
import { getAdminEmail } from "@/lib/supabase/env";
import { createSupabaseServerClient, getAdminUser } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const adminEmail = getAdminEmail();
  const supabase = await createSupabaseServerClient();
  if (!supabase || !adminEmail) return { error: "The dashboard is not configured yet." };

  // Only the configured admin address may even attempt to sign in.
  if (email !== adminEmail) return { error: "Incorrect email or password." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export type SaveState = {
  status: "idle" | "saved" | "error";
  message?: string;
  errors?: FieldErrors;
  values?: SiteSettings;
};

export async function saveSettingsAction(_prev: SaveState, formData: FormData): Promise<SaveState> {
  // Authorisation is checked on every save, not just when the page was shown.
  const user = await getAdminUser();
  if (!user) return { status: "error", message: "Your session has expired. Please sign in again." };

  const parsed = parseSettingsForm(formData);
  if (!parsed.ok) {
    return { status: "error", message: "Please fix the highlighted fields.", errors: parsed.errors, values: parsed.values };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "The dashboard is not configured yet.", values: parsed.value };

  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...toRow(parsed.value), updated_at: new Date().toISOString() });
  if (error) {
    console.error("[admin] saving settings failed:", error.message);
    return { status: "error", message: "Could not save your changes. Please try again.", values: parsed.value };
  }

  // Rebuild the public pages so the new details appear straight away.
  revalidatePath("/", "layout");
  return { status: "saved", message: "Saved. The public site is updated.", values: parsed.value };
}
