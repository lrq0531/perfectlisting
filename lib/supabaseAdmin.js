import { createClient } from '@supabase/supabase-js';

// Should only be used in server-side code (e.g., API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
