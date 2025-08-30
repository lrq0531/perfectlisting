import '../styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
			<DefaultSeo
				titleTemplate="%s | PerfectListing"
				defaultTitle="PerfectListing - AI Product Listings"
				description="Generate high-quality AI-powered product descriptions and images for your online store."
				canonical={process.env.NEXT_PUBLIC_BASE_URL}
				openGraph={{
					type: 'website',
					locale: 'en_AU',
					url: process.env.NEXT_PUBLIC_BASE_URL,
					site_name: 'PerfectListing'
				}}
				twitter={{
					handle: '@lrqnz',
					site: '@lrqnz',
					cardType: 'summary_large_image'
				}}
			/>
			<Component {...pageProps} />
		</SessionContextProvider>
	);
}

export default MyApp;
