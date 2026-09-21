import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/settings";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { getAdminUser } from "@/lib/supabase/server";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!getSupabaseEnv()) return <NotConfigured />;
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  const settings = await getSettings();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">Site settings</h1>
        <form action={logoutAction}>
          <button type="submit" className="min-h-11 rounded-md border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-surface">
            Sign out
          </button>
        </form>
      </div>
      <p className="mt-2 text-muted">Signed in as {user.email}. Changes go live on the public site as soon as you save.</p>
      <div className="mt-10">
        <SettingsForm initial={settings} />
      </div>
    </>
  );
}

function NotConfigured() {
  return (
    <>
      <h1 className="font-display text-3xl font-medium">Dashboard not set up yet</h1>
      <p className="mt-4 text-muted">
        Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>ADMIN_EMAIL</code> to your environment and run <code>supabase/schema.sql</code>. The README has the steps.
      </p>
    </>
  );
}
