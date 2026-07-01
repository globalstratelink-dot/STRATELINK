-- STRATELINK — Configuration catalogue (Supabase SQL Editor → New query → Run)

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

-- Accès complet via la clé service_role (backend Netlify)
drop policy if exists "catalogue services service role" on public.catalogue_services;

create policy "catalogue services service role"
on public.catalogue_services
for all
to service_role
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('catalogue-images', 'catalogue-images', true)
on conflict (id) do update set public = true;

drop policy if exists "catalogue images public read" on storage.objects;

create policy "catalogue images public read"
on storage.objects for select
using (bucket_id = 'catalogue-images');

drop policy if exists "catalogue images service role upload" on storage.objects;

create policy "catalogue images service role upload"
on storage.objects for insert
to service_role
with check (bucket_id = 'catalogue-images');

drop policy if exists "catalogue images service role update" on storage.objects;

create policy "catalogue images service role update"
on storage.objects for update
to service_role
using (bucket_id = 'catalogue-images');
