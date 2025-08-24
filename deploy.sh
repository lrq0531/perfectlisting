#!/bin/bash
if [ ! -f .env.local ]; then
  echo ".env.local not found. Run setup-env.sh first or copy .env.local.example to .env.local"
  exit 1
fi

read -p "Deploy to (vercel/fly): " PLATFORM

if [ "$PLATFORM" = "vercel" ]; then
    echo "Deploying to Vercel..."
    npx vercel login
    # Upload env vars
    while IFS= read -r line; do
      if [[ -z "$line" ]] || [[ "$line" == \#* ]]; then continue; fi
      key=$(echo "$line" | cut -d'=' -f1)
      value=$(echo "$line" | cut -d'=' -f2-)
      echo "Setting Vercel env: $key"
      npx vercel env add $key <<< "$value" || true
    done < .env.local
    npx vercel --prod
elif [ "$PLATFORM" = "fly" ]; then
    echo "Deploying to Fly.io..."
    flyctl auth login
    flyctl launch --no-deploy
    while IFS= read -r line; do
      if [[ -z "$line" ]] || [[ "$line" == \#* ]]; then continue; fi
      key=$(echo "$line" | cut -d'=' -f1)
      value=$(echo "$line" | cut -d'=' -f2-)
      echo "Setting Fly secret: $key"
      flyctl secrets set $key="$value" || true
    done < .env.local
    flyctl deploy
else
    echo "Unknown platform: $PLATFORM"
    exit 1
fi
