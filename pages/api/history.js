import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  try {
    if (process.env.MOCK_MODE === 'true') {
      return res.status(200).json([
        { id: '1', product: 'Mock Mug', created_at: new Date().toISOString() },
        { id: '2', product: 'Sample Candle', created_at: new Date().toISOString() },
      ]);
    }
    const { data, error } = await supabaseAdmin
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
}
