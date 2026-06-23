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

insert into storage.buckets (id, name, public)
values ('catalogue-images', 'catalogue-images', true)
on conflict (id) do update set public = true;

drop policy if exists "catalogue images public read" on storage.objects;

create policy "catalogue images public read"
on storage.objects for select
using (bucket_id = 'catalogue-images');

-- Services par défaut (ignorés si déjà présents)
insert into public.catalogue_services (
  id, image_url, name_fr, name_en, description_fr, description_en,
  includes_fr, includes_en, audience_fr, audience_en, order_index
) values
(
  'sourcing-procurement',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
  'Sourcing & Approvisionnement',
  'Sourcing & Procurement',
  'Identification de fournisseurs qualifiés et gestion des achats internationaux pour vos projets B2B.',
  'Qualified supplier identification and international procurement management for your B2B projects.',
  '["Recherche fournisseurs","Négociation commerciale","Contrôle qualité","Coordination logistique"]'::jsonb,
  '["Supplier research","Commercial negotiation","Quality control","Logistics coordination"]'::jsonb,
  'Importateurs, distributeurs et EPC',
  'Importers, distributors and EPC contractors',
  1
),
(
  'customs-compliance',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  'Douanes & Conformité',
  'Customs & Compliance',
  'Accompagnement réglementaire et facilitation des flux transfrontaliers sans friction.',
  'Regulatory support and frictionless cross-border flow facilitation.',
  '["Classification douanière","Documentation export/import","Conformité produit","Suivi clearance"]'::jsonb,
  '["Customs classification","Export/import documentation","Product compliance","Clearance tracking"]'::jsonb,
  'Trading houses et industriels',
  'Trading houses and industrial companies',
  2
),
(
  'logistics-corridors',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  'Logistique & Corridors',
  'Logistics & Corridors',
  'Orchestration des corridors Chine, EAU, Europe et Afrique selon vos incoterms.',
  'Orchestration of China, UAE, Europe and Africa corridors based on your incoterms.',
  '["Planification transport","Fret maritime/aérien","Assurance cargo","Suivi bout-en-bout"]'::jsonb,
  '["Transport planning","Sea/air freight","Cargo insurance","End-to-end tracking"]'::jsonb,
  'Projets multi-pays et grossistes',
  'Multi-country projects and wholesalers',
  3
)
on conflict (id) do nothing;
