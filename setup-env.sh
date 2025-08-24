#!/bin/bash
echo "=== AI Listing Tool Setup ==="
read -p "Enter your OpenAI API key: " OPENAI_API_KEY
read -p "Enter your Stripe Secret Key: " STRIPE_SECRET_KEY
read -p "Enter your Stripe Publishable Key: " NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
read -p "Enter your Stripe Price ID: " STRIPE_PRICE_ID
read -p "Enter your Base URL (e.g., https://myapp.vercel.app): " NEXT_PUBLIC_BASE_URL
read -p "Enter your Supabase URL: " NEXT_PUBLIC_SUPABASE_URL
read -p "Enter your Supabase Anon Key: " NEXT_PUBLIC_SUPABASE_ANON_KEY
read -p "Enter your Supabase Service Role Key: " SUPABASE_SERVICE_ROLE_KEY

cat <<EOF > .env.local
MOCK_MODE=false
OPENAI_API_KEY=$OPENAI_API_KEY
STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_PRICE_ID=$STRIPE_PRICE_ID
NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
EOF

echo "✅ .env.local created!"
