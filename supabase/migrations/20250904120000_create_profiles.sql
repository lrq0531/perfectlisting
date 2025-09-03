-- Create profiles table linked to auth.users
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  is_paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Policy: users can view their own profile
create policy "Individuals can view their own profile."
  on profiles for select
  using (auth.uid() = id);

-- Policy: users can update their own profile
create policy "Individuals can update their own profile."
  on profiles for update
  using (auth.uid() = id);
