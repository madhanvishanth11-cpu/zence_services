-- Create the inquiries table used by the ZENCE contact form.
-- Copy and paste this script directly into your Supabase Dashboard -> SQL Editor.

create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  service text not null,
  project_scope text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'New'::text not null
);

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Create policy to allow anonymous inserts from the frontend via the anon API key
create policy "Allow anonymous inserts" on public.inquiries
for insert
to anon
with check (true);

-- Create policy to allow public select/reads (if needed)
create policy "Allow select for anon" on public.inquiries
for select
to anon
using (true);
