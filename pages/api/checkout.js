import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();
	try {
		if (process.env.MOCK_MODE === 'true') {
			return res.status(200).json({ url: '/mock-checkout' });
		}

		const { supabaseAccessToken } = req.body;
		const {
			data: { user },
			error
		} = await supabase.auth.getUser(supabaseAccessToken);

		if (error || !user) return res.status(401).json({ error: 'User not authenticated' });

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment', // changed from 'subscription' to 'payment'
			line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?success=1`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?canceled=1`,
			client_reference_id: user.id // <- Supabase user id
		});
		res.status(200).json({ url: session.url });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: String(err) });
	}
}
