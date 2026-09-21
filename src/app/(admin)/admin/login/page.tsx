import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { getAdminUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (!getSupabaseEnv()) redirect("/admin");
  if (await getAdminUser()) redirect("/admin");
  return (
    <div className="max-w-sm">
      <h1 className="font-display text-3xl font-medium">Admin sign in</h1>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
