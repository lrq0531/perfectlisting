import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Home() {
  const supabase = useSupabaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current session
    const inintializeUserState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    inintializeUserState();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <NextSeo
        title="Perfect Product Listings — AI Optimized for Etsy & Shopify"
        description="Generate perfect AI-powered product listings in seconds: optimized titles, descriptions, tags, and social captions for Etsy and Shopify sellers."
        canonical={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}
        openGraph={{
          url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          title: 'Perfect Product Listings — AI Optimized for Etsy & Shopify',
          description:
            'Generate perfect AI-powered product listings in seconds: optimized titles, descriptions, tags, and social captions for Etsy and Shopify sellers.',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/perflis.jpg`,
              width: 1200,
              height: 630,
              alt: 'PerfectListing Preview',
              type: 'image/jpeg',
            },
          ],
          siteName: 'PerfectListing',
        }}
        twitter={{
          handle: '@yourhandle',
          site: '@yourhandle',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'AI, product listings, Etsy, Shopify, e-commerce, SEO',
          },
        ]}
      />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold mb-2">Get Perfect Product Listings in Seconds</h1>
          <p className="text-gray-600 mb-6">
            AI that writes optimized titles, descriptions, tags, and social captions for Etsy and
            Shopify sellers.
          </p>
          {user ? (
            <div className="flex gap-4 items-center">
              <span>Logged in as {user.email}</span>
              <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
              <Link href="/dashboard" className="text-white bg-blue-500 px-4 py-2 rounded">
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/auth" className="text-white bg-blue-500 px-4 py-2 rounded">
                Try Free
              </Link>
              <Link href="/auth/login" className="text-gray-700 bg-gray-200 px-4 py-2 rounded">
                Login
              </Link>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Before / After</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h3 className="font-medium">Before</h3>
                <p className="text-sm text-gray-600">"Mug - 400ml - blue"</p>
              </div>
              <div className="p-4 border rounded bg-gray-50">
                <h3 className="font-medium">After</h3>
                <p className="text-sm text-gray-700">
                  "Handmade Blue Ceramic Mug — 400ml, Dishwasher Safe — Perfect Gift for Coffee
                  Lovers"
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-6 text-sm text-gray-500">
          Built with ❤️ — deploy to Vercel or Fly.io
        </footer>
      </div>
    </>
  );
}
