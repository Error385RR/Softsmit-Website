import { ProcessEditor } from "@/components/admin/ProcessEditor";
import { loadProcess } from "@/lib/cms";
import { requireAdmin } from "@/lib/supabase/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminProcessEditorPage() {
  await requireAdmin();
  const initial = await loadProcess();
  return (
    <>
      <h1 className="font-display text-3xl font-medium sm:text-4xl">Process</h1>
      <p className="mt-2 text-muted">The steps of how working together goes, in order. Hidden steps don't appear on the site.</p>
      <div className="mt-8">
        <ProcessEditor initial={initial} />
      </div>
    </>
  );
}
