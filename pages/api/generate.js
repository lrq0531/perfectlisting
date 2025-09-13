import { describeImageWithVision, generateListingFromPrompt } from '../../lib/openai';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { product, description, platform, imageUrl } = req.body || {};
  if (!product || !description)
    return res.status(400).json({ error: 'Missing product or description' });

  try {
    let imageText = null;
    console.log('Received payload:', { product, description, platform, imageUrl });
    if (imageUrl) {
      const img = await describeImageWithVision(imageUrl);
      imageText = img.description;
    }

    const result = await generateListingFromPrompt({ product, description, platform, imageText });

    // Save to Supabase listings table if user provided Authorization header with bearer (optional)
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // Use Supabase Admin to insert (you might verify token in production)
        await supabaseAdmin.from('listings').insert([
          {
            user_id: null,
            product,
            description,
            platform: platform || 'Etsy',
            result,
          },
        ]);
      }
    } catch (e) {
      console.error('Warning: failed to save listing to DB', e);
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'generation_failed', detail: String(err) });
  }
}
