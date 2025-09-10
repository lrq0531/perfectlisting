import Stripe from 'stripe';
import getRawBody from 'raw-body';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const buf = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  //   const supabase = createPagesServerClient({ req, res });

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
    const customerEmail = session.customer_details.email;
    // Use client_reference_id or metadata to know which user paid
    const userId = session.client_reference_id;

    console.log('Payment successful for:', customerEmail);
    console.log('Payment successful for:', userId);

    // Example: mark user as paid in Supabase
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ is_paid: true })
      .eq('id', userId);

    if (error) {
      console.error('Supabase update error:', error);
    } else {
      console.log(`User ${userId} marked as paid`);
    }
  }

  res.json({ received: true });
}
