import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAdminEmail, getSupabaseEnv } from "./env";

/** Client bound to the visitor's login session. Only for admin pages and actions. */
export async function createSupabaseServerClient() {
  const env = getSupabaseEnv();
  if (!env) return null;
  const cookieStore = await cookies();
  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* called from a Server Component: the proxy refreshes the session instead */
        }
      },
    },
  });
}

/**
 * Returns the logged-in user only if they are the configured admin.
 * Verified with the auth server on every call (not just read from the cookie).
 */
export async function getAdminUser() {
  const adminEmail = getAdminEmail();
  if (!adminEmail) return null;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) return null;
  return data.user.email.toLowerCase() === adminEmail ? data.user : null;
}
