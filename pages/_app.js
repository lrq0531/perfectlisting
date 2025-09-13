import '../styles/globals.css';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      options: {
        schema: 'public', // Use the default schema
        headers: async () => {
          const session = await supabaseClient.auth.getSession();
          return {
            'X-Custom-Header': 'CustomValue',
            'X-User-Email': session?.user?.email || 'anonymous',
            'X-Auth-Token': session?.access_token || 'no-token',
          };
        },
      },
      cookieOptions: {
        name: 'supabase-auth-token', // Name of the session cookie
        maxAge: 60 * 60 * 24 * 1, // 7 days
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      },
      isSingleton: true,
    })
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <DefaultSeo
        titleTemplate="%s | PerfectListing"
        defaultTitle="PerfectListing - AI Product Listings"
        description="Generate high-quality AI-powered product descriptions and images for your online store."
        canonical={process.env.NEXT_PUBLIC_BASE_URL}
        openGraph={{
          type: 'website',
          locale: 'en_AU',
          url: process.env.NEXT_PUBLIC_BASE_URL,
          site_name: 'PerfectListing',
        }}
        twitter={{
          handle: '@lrqnz',
          site: '@lrqnz',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
