import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function describeImageMock() {
	return { description: 'A handcrafted ceramic coffee mug with a matte blue glaze and rounded handle.' };
}

export async function describeImageWithVision(imageUrl) {
	if (process.env.MOCK_MODE === 'true') {
		return describeImageMock();
	}
	// Example vision usage — adapt if your SDK differs
	const res = await client.chat.completions.create({
		model: 'gpt-4.1-mini',
		messages: [
			{ role: 'system', content: "You are an AI assistant that writes compelling e-commerce listings from product images." },
			{
				role: 'user',
				content: [
					{ type: 'text', text: 'Describe this product for a sales listing:' },
					{ type: 'image_url', image_url: { url: imageUrl } }
				]
			}
		],
		temperature: 0.4
	});
	const text = res.choices?.[0]?.message?.content || res.choices?.[0]?.text;
	console.log('Image description choices:', res.choices);
	return { description: text };
}

export async function generateListingFromPrompt({ product, description, platform, imageText }) {
	if (process.env.MOCK_MODE === 'true') {
		return {
			title: `Mock: ${product}`,
			description: `Mock description for ${product}. ${description} ${imageText || ''}`,
			tags: ['mock', 'test', 'sample'],
			social_caption: `Check out my ${product}!`
		};
	}

	console.log('Generating listing with OpenAI:', { product, description, platform, imageText });

	const prompt = `You are an expert e-commerce copywriter specializing in ${platform}. Product: ${product}\nDescription: ${description}\nImage details: ${imageText || 'None'}\nReturn JSON with fields: title, description, tags (array), social_caption.`;

	const res = await client.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{ role: 'system', content: `You are an expert e-commerce copywriter specializing in ${platform}.` },
			{ role: 'user', content: prompt }
		],
		temperature: 0.6,
		max_tokens: 600
	});

	const text = res.choices?.[0]?.message?.content || res.choices?.[0]?.text;
	try {
		const jsonText = text.replace(/```json|```/g, '').trim();
		return JSON.parse(jsonText);
	} catch (e) {
		return { title: product, description: text, tags: [], social_caption: '' };
	}
}
