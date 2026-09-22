import { AboutEditor } from "@/components/admin/AboutEditor";
import { loadAbout } from "@/lib/cms";
import { requireAdmin } from "@/lib/supabase/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminAboutEditorPage() {
  await requireAdmin();
  const initial = await loadAbout();
  return (
    <>
      <h1 className="font-display text-3xl font-medium sm:text-4xl">About page</h1>
      <p className="mt-2 text-muted">The text on the About page.</p>
      <div className="mt-8">
        <AboutEditor initial={initial} />
      </div>
    </>
  );
}
