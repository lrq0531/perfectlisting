import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export const config = {
	api: {
		bodyParser: false // Stripe requires raw body
	}
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();

	const buf = await buffer(req);
	const sig = req.headers['stripe-signature'];

	let event;

	try {
		event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error('Webhook signature verification failed:', err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	// Handle checkout completion
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;
		const customerEmail = session.customer_email;

		console.log('Payment successful for:', customerEmail);

		// Example: mark user as paid in Supabase
		const { error } = await supabaseAdmin.from('users').update({ is_paid: true }).eq('email', customerEmail);

		if (error) console.error('Supabase update error:', error);
	}

	res.json({ received: true });
}
