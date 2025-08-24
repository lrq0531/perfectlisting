# AI Listing Optimizer — Production-ready Starter

This repo is a production-ready starter for an AI Listing Optimizer SaaS:

- Next.js + Tailwind
- Supabase Auth + Storage + Postgres (listings history)
- OpenAI (text + vision) integration with mock-mode fallback
- Image upload endpoint (uploads to Supabase Storage)
- Stripe checkout scaffold
- Deploy scripts for Vercel and Fly.io
- Zero-setup local mock mode enabled by default

## Quick start (local, zero-setup)

1. Install dependencies:
    ```bash
    npm install
    ```
2. Start dev server (mock mode enabled by default):
    ```bash
    npm run dev
    ```
3. Open http://localhost:3000

## Environment (local)

A `.env.local` is included with mock values for local play. To use real services, run `./setup-env.sh` and provide real keys.

## Marketing & 30-day Launch Plan

See `MARKETING_PLAN.md` for the 30-day checklist and launch playbook.
