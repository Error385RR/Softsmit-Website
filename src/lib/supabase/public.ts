import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

/**
 * Anonymous, cookie-free client for reading public content.
 * Not using cookies keeps the public pages statically generated.
 */
export function createPublicClient() {
  const env = getSupabaseEnv();
  if (!env) return null;
  return createClient(env.url, env.anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
}
