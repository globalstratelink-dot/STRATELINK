-- Run this SQL in Supabase → SQL Editor → New query → Run

create table if not exists public.catalogue_services (
  id text primary key,
  image_url text not null,
  name_fr text not null,
  name_en text not null,
  description_fr text not null,
  description_en text not null,
  includes_fr jsonb not null default '[]'::jsonb,
  includes_en jsonb not null default '[]'::jsonb,
  audience_fr text not null,
  audience_en text not null,
  order_index integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalogue_services enable row level security;

-- Storage bucket: create manually in Supabase → Storage → New bucket
-- Name: catalogue-images
-- Public bucket: ON
