import { getSupabase } from '@/lib/supabase/client';

export async function signInWithPassword(email: string, password: string) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error('Supabase is not configured. Copy .env.example to .env.local.');
  }
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error('Supabase is not configured. Copy .env.example to .env.local.');
  }
  return supabase.auth.signUp({ email, password });
}
