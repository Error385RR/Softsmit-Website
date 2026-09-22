import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/settings";
import { requireAdmin } from "@/lib/supabase/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <>
      <h1 className="font-display text-3xl font-medium sm:text-4xl">Site settings</h1>
      <p className="mt-2 text-muted">Changes go live on the public site as soon as you save.</p>
      <div className="mt-8">
        <SettingsForm initial={settings} />
      </div>
    </>
  );
}
