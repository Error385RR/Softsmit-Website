import { FaqEditor } from "@/components/admin/FaqEditor";
import { loadFaqs } from "@/lib/cms";
import { requireAdmin } from "@/lib/supabase/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminFaqEditorPage() {
  await requireAdmin();
  const initial = await loadFaqs();
  return (
    <>
      <h1 className="font-display text-3xl font-medium sm:text-4xl">FAQs</h1>
      <p className="mt-2 text-muted">Edit, reorder or hide questions. Hidden questions stay saved but don't appear on the site.</p>
      <div className="mt-8">
        <FaqEditor initial={initial} />
      </div>
    </>
  );
}
