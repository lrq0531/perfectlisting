import { useState } from 'react';

export default function ListingForm({ onGenerate, loading }) {
	const [product, setProduct] = useState('');
	const [description, setDescription] = useState('');
	const [platform, setPlatform] = useState('Etsy');
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);

	async function submit(e) {
		e.preventDefault();
		let imageUrl = null;
		if (file) {
			setUploading(true);
			const fd = new FormData();
			fd.append('file', file);
			const r = await fetch('/api/upload', { method: 'POST', body: fd });
			const j = await r.json();
			imageUrl = j.url;
			setUploading(false);
		}
		onGenerate({ product, description, platform, imageUrl });
	}

	async function handleCheckout() {
		const res = await fetch('/api/checkout', { method: 'POST' });
		const data = await res.json();
		if (data.url) {
			window.location.href = data.url; // Redirect to Stripe Checkout
		} else {
			alert('Checkout failed');
		}
	}

	return (
		<form onSubmit={submit} className="p-4 bg-white border rounded">
			<label className="block mb-2">
				<div className="text-sm font-medium">Product name</div>
				<input
					value={product}
					onChange={e => setProduct(e.target.value)}
					className="mt-1 w-full border rounded px-2 py-1"
					placeholder="Handmade ceramic mug"
				/>
			</label>
			<label className="block mb-2">
				<div className="text-sm font-medium">Short description</div>
				<textarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					className="mt-1 w-full border rounded px-2 py-1"
					placeholder="Large 400ml mug with rustic glaze..."
				/>
			</label>
			<label className="block mb-2">
				<div className="text-sm font-medium">Photo (optional)</div>
				<input type="file" onChange={e => setFile(e.target.files[0])} />
			</label>
			<label className="block mb-4">
				<div className="text-sm font-medium">Platform</div>
				<select
					value={platform}
					onChange={e => setPlatform(e.target.value)}
					className="mt-1 w-full border rounded px-2 py-1"
				>
					<option>Etsy</option>
					<option>Shopify</option>
					<option>Amazon</option>
				</select>
			</label>
			<div className="flex gap-2">
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded"
					disabled={loading || uploading}
				>
					Generate Listing
				</button>
				<button
					type="button"
					className="px-4 py-2 border rounded"
					onClick={() => {
						setProduct('');
						setDescription('');
					}}
				>
					Clear
				</button>
				<button onClick={handleCheckout} className="bg-blue-600 text-white px-4 py-2 rounded">
					Upgrade to Pro
				</button>
			</div>
		</form>
	);
}
