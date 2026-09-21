export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && anonKey ? { url, anonKey } : null;
}

/** The single email address allowed to use the dashboard. If unset, nobody can. */
export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() || null;
}
