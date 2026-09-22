import { ServiceEditor } from "@/components/admin/ServiceEditor";
import { loadServices } from "@/lib/cms";
import { requireAdmin } from "@/lib/supabase/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminServiceEditorPage() {
  await requireAdmin();
  const initial = await loadServices();
  return (
    <>
      <h1 className="font-display text-3xl font-medium sm:text-4xl">Services</h1>
      <p className="mt-2 text-muted">Up to six services. Hidden services stay saved but don't appear on the site.</p>
      <div className="mt-8">
        <ServiceEditor initial={initial} />
      </div>
    </>
  );
}
