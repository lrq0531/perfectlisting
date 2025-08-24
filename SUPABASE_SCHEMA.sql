-- Run this in Supabase SQL editor to create listings table
create extension if not exists "pgcrypto";

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  created_at timestamptz default now(),
  product text,
  description text,
  platform text,
  result jsonb
);
