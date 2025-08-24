import { useEffect, useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import ListingForm from '../components/ListingForm';
import OutputCard from '../components/OutputCard';

export default function Dashboard() {
	const session = useSession();
	const supabase = useSupabaseClient();
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		if (!session) return;
		fetch('/api/history')
			.then(r => r.json())
			.then(d => {
				if (d.error) {
					console.error('Error fetching history:', d.error);
					return;
				}
				setHistory(d || []);
			});
	}, [session]);

	async function handleGenerate(payload) {
		setLoading(true);
		const res = await fetch('/api/generate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		setResult(data);
		setLoading(false);
	}

	if (!session) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="p-6 bg-white rounded shadow">
					<h2 className="text-xl font-semibold mb-4">Please sign in to continue</h2>
					<a href="/auth" className="px-4 py-2 bg-blue-600 text-white rounded">
						Sign in / Sign up
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-4">AI Listing Optimizer — Dashboard</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<ListingForm onGenerate={handleGenerate} loading={loading} />
					<div>
						<h2 className="font-semibold mb-2">Output</h2>
						<OutputCard result={result} />
						<div className="mt-6">
							<h3 className="font-semibold">History</h3>
							<div className="space-y-2 mt-2">
								{history.map(h => (
									<div key={h.id} className="p-2 border rounded bg-gray-50">
										<div className="text-sm font-medium">{h.product}</div>
										<div className="text-xs text-gray-600">
											{new Date(h.created_at).toLocaleString()}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
