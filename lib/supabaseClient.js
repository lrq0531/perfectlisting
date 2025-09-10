import { createClient } from '@supabase/supabase-js';

// This is only used in client-side code (e.g., pages)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
