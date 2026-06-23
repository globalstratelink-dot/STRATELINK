-- STRATELINK — Configuration catalogue (Supabase SQL Editor → New query → Run)

-- 1. Table des services
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

-- 2. Bucket images (public)
insert into storage.buckets (id, name, public)
values ('catalogue-images', 'catalogue-images', true)
on conflict (id) do update set public = true;

-- 3. Lecture publique des images
create policy "catalogue images public read"
on storage.objects for select
using (bucket_id = 'catalogue-images');
