-- Softsmith dashboard schema (site settings + editable content).
-- Run in Supabase: SQL Editor > New query > paste > Run.
--
-- BEFORE RUNNING: on the "admin_email" line below, replace YOUR_ADMIN_EMAIL with
-- your admin login email. That is the ONLY line you need to edit.
-- Only that account can change settings; the database enforces this even if
-- someone finds another way in. Safe to run more than once (e.g. to change the email).
-- If you forget to edit it, the script stops with an error and changes nothing.

do $$
declare
  admin_email text := 'YOUR_ADMIN_EMAIL';   -- <<< EDIT THIS LINE ONLY
begin
  admin_email := lower(trim(admin_email));
  if admin_email = 'your_admin_email'
     or admin_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Edit the admin_email line: replace YOUR_ADMIN_EMAIL with your real admin email, then run this script again.';
  end if;

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

  drop policy if exists "Public can read site settings" on public.site_settings;
  drop policy if exists "Owner can insert site settings" on public.site_settings;
  drop policy if exists "Owner can update site settings" on public.site_settings;

  -- Contact details are shown publicly on the site, so anyone may read them.
  create policy "Public can read site settings"
    on public.site_settings for select
    using (true);

  execute format(
    'create policy "Owner can insert site settings" on public.site_settings
       for insert to authenticated
       with check ((auth.jwt() ->> ''email'') = %L)', admin_email);

  execute format(
    'create policy "Owner can update site settings" on public.site_settings
       for update to authenticated
       using ((auth.jwt() ->> ''email'') = %L)
       with check ((auth.jwt() ->> ''email'') = %L)', admin_email, admin_email);

  -- No delete policy on purpose: nobody can delete the row.

  -- ---------------------------------------------------------------------------
  -- Editable content (FAQs, services, process steps, About text).
  -- One row per content block; the value is JSON validated by the website.
  -- ---------------------------------------------------------------------------
  create table if not exists public.site_content (
    key text primary key check (key in ('faqs', 'services', 'process', 'about')),
    value jsonb not null,
    updated_at timestamptz not null default now()
  );

  alter table public.site_content enable row level security;

  grant select on public.site_content to anon, authenticated;
  grant insert, update on public.site_content to authenticated;

  drop policy if exists "Public can read site content" on public.site_content;
  drop policy if exists "Owner can insert site content" on public.site_content;
  drop policy if exists "Owner can update site content" on public.site_content;

  create policy "Public can read site content"
    on public.site_content for select
    using (true);

  execute format(
    'create policy "Owner can insert site content" on public.site_content
       for insert to authenticated
       with check ((auth.jwt() ->> ''email'') = %L)', admin_email);

  execute format(
    'create policy "Owner can update site content" on public.site_content
       for update to authenticated
       using ((auth.jwt() ->> ''email'') = %L)
       with check ((auth.jwt() ->> ''email'') = %L)', admin_email, admin_email);
end $$;
