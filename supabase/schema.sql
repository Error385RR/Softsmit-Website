-- Softsmith dashboard schema (Phase A: site settings).
-- Run this once in Supabase: SQL Editor > New query > paste > Run.
--
-- BEFORE RUNNING: replace both occurrences of YOUR_ADMIN_EMAIL with your admin
-- login email, in lowercase. Only that account can change settings; the database
-- enforces this even if someone finds another way in.

create table if not exists public.site_settings (
  id int primary key check (id = 1),           -- one row only
  tagline text,
  email text,
  phone text,
  whatsapp text,
  whatsapp_message text,
  whatsapp_bubble_enabled boolean,
  cta_primary_label text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;

-- Contact details are shown publicly on the site, so anyone may read them.
create policy "Public can read site settings"
  on public.site_settings for select
  using (true);

create policy "Owner can insert site settings"
  on public.site_settings for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

create policy "Owner can update site settings"
  on public.site_settings for update to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL')
  with check ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

-- No delete policy on purpose: nobody can delete the row.
