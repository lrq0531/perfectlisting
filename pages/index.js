import Link from 'next/link';

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6">
			<div className="max-w-3xl w-full bg-white rounded-xl shadow p-8">
				<h1 className="text-3xl font-bold mb-2">Get Perfect Product Listings in Seconds</h1>
				<p className="text-gray-600 mb-6">
					AI that writes optimized titles, descriptions, tags, and social captions for Etsy and Shopify
					sellers.
				</p>
				<div className="flex gap-4">
					<Link href="/dashboard">Try Free</Link>
				</div>
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
								"Handmade Blue Ceramic Mug — 400ml, Dishwasher Safe — Perfect Gift for Coffee Lovers"
							</p>
						</div>
					</div>
				</div>
			</div>
			<footer className="mt-6 text-sm text-gray-500">Built with ❤️ — deploy to Vercel or Fly.io</footer>
		</div>
	);
}
