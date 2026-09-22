import { AdminNav } from "@/components/admin/AdminNav";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!getSupabaseEnv()) return <NotConfigured />;
  const user = await requireAdmin();
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Signed in as <span className="text-fg">{user.email}</span>
        </p>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-accent-text underline underline-offset-4 hover:no-underline">
            View site (new tab)
          </a>
          <form action={logoutAction}>
            <button type="submit" className="min-h-11 rounded-md border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-surface">
              Sign out
            </button>
          </form>
        </div>
      </div>
      <AdminNav />
      <div className="mt-8">{children}</div>
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
