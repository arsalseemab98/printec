import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Public client (for frontend reads + public writes permitted by RLS)
const _supabase = supabaseUrl ? createClient(supabaseUrl, supabaseAnonKey) : (null as never);
export function getSupabase() {
  return _supabase;
}
// Legacy export for existing imports
export const supabase = _supabase;

// Server client (for admin writes — service role bypasses RLS)
export function createServerClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
