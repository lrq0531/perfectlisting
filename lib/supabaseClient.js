import { createClient } from '@supabase/supabase-js';

// DEPRECATED: This client is deprecated and should no longer be used.
// Use `createBrowserSupabaseClient` or `createPagesServerClient` instead.

console.warn(
  'DEPRECATED: The `supabaseClient` is deprecated. Please use `createBrowserSupabaseClient` or `createPagesServerClient` instead.'
);

export const supabaseClient = (() => {
  throw new Error(
    'The `supabaseClient` is deprecated. Please use `createBrowserSupabaseClient` or `createPagesServerClient` instead.'
  );
})();
