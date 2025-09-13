import Stripe from 'stripe';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    if (process.env.MOCK_MODE === 'true') {
      return res.status(200).json({ url: '/mock-checkout' });
    }

    // Reads the auth cookie from the incoming request (supplied by the browser) to create supabase client.
    const supabase = createPagesServerClient({ req, res });
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return res.status(200).json({ error: error });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // changed from 'subscription' to 'payment'
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/dashboard?success=1`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/dashboard?canceled=1`,
      client_reference_id: user.id, // <- Supabase user id
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
}
