-- STRATELINK — Notifications formulaires (contact + qualification)
-- Supabase SQL Editor → New query → Run

create table if not exists public.form_notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'qualification')),
  first_name text not null,
  last_name text not null,
  email text not null,
  company text not null default '',
  phone text not null default '',
  country text not null default '',
  subject text not null default '',
  message text not null default '',
  payload jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists form_notifications_created_at_idx
  on public.form_notifications (created_at desc);

create index if not exists form_notifications_read_idx
  on public.form_notifications (read);

alter table public.form_notifications enable row level security;

drop policy if exists "form notifications service role" on public.form_notifications;

create policy "form notifications service role"
on public.form_notifications
for all
to service_role
using (true)
with check (true);
