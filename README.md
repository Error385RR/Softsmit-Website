# Softsmith website

Next.js (App Router) + TypeScript + Tailwind CSS. Statically generated, deployable to Vercel.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in your contact details (optional)
npm run dev                  # http://localhost:3000
```

## Production build
```bash
npm run build
npm run preview              # builds, then serves the production build
```

## Where to edit things

--------------------------------------------------------------------------------------------------------------------
|                      What                                   |                  Where                             |
| ---                                                         | ---                                                |  
| Brand name, tagline, nav labels, CTA text, feature switches | `src/content/site.ts`                              |  
| Services                                                    | `src/content/services.ts`                          |
| Process steps                                               | `src/content/process.ts`                           |
| FAQ entries                                                 | `src/content/faq.ts`                               |
| Homepage copy                                               | `src/content/home.ts`                              |
| Email / phone / WhatsApp                                    | `.env.local` (`NEXT_PUBLIC_*`, see `.env.example`) |
| Colours and theme                                           | `src/app/globals.css`                              |
--------------------------------------------------------------------------------------------------------------------
Content is read through `src/lib/content.ts`, so it can later move to Supabase or a CMS without touching components.

## Status
Milestone 1 (foundation + homepage) complete. Services, Process, About, FAQ and Contact are temporary placeholders until Milestone 2.

## Milestone 2 notes
- All six pages are built. The quote form on `/contact#quote` arrives in Milestone 3 (a notice is shown until then).
- About page: fill in `person` in `src/content/about.ts`. Until then a dev-only reminder shows; production shows a neutral sentence.
- Testimonials: add entries to `src/content/testimonials.ts` and set `features.testimonials` to `true` in `src/content/site.ts`. Nothing is shown otherwise.
- Projects: the data type and `src/content/projects.ts` exist, but no `/projects` route is created until there is real work to show.
- WhatsApp bubble appears only when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, loads after the page is idle, and can be dismissed for the session.
- `NEXT_PUBLIC_*` values are baked in at build time: restart `npm run dev` or rebuild after changing them.

## Dashboard
The owner dashboard lives at `/admin`. It has five sections:

| Section | Edits |
| --- | --- |
| Settings | Email, phone, WhatsApp number, WhatsApp button on/off and its pre-filled message, tagline, main button text |
| FAQs | Add, edit, reorder, hide, remove. "Also show on homepage" marks featured questions |
| Services | Add, edit, reorder, hide, remove (up to 6). A new service's URL anchor is generated from its title once and then kept, so links to it keep working |
| Process | Add, edit, reorder, hide, remove (up to 10 steps) |
| About | Introduction, philosophy paragraphs, approach points, and the "who is behind Softsmith" bio |

Public pages stay static and rebuild automatically when you save. If Supabase is not configured, unreachable, or a stored value fails validation, the affected page falls back to the built-in defaults in `src/content/` — the site never breaks or shows empty content.

### One-time setup
1. Create a free project at supabase.com.
2. **Authentication > Users > Add user**: create your admin login (email + password, tick "Auto confirm").
3. **Authentication > Sign In / Providers**: turn **off** "Allow new users to sign up".
4. **SQL Editor**: open `supabase/schema.sql`, replace `YOUR_ADMIN_EMAIL` on the single `admin_email` line with your admin email (same as step 2), paste and run. If you forget, it stops with a clear error and changes nothing. It is safe to run again, for example to change the admin email.
5. **Project Settings > API**: copy the Project URL and the anon (publishable) key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ADMIN_EMAIL=you@example.com
   ```
6. Restart `npm run dev`, open `/admin/login`.
7. On Vercel add the same three variables (Project Settings > Environment Variables) and redeploy.

### Editing content
- Every editor works the same way: change fields, use ↑/↓ to reorder, tick "Show on the site" to hide something without deleting it, "Remove" to delete (asks you to confirm), "+ Add" for a new one. Nothing is saved until you press **Save changes** at the bottom.
- Hidden items stay in the database so you can bring them back later; they just don't render on the public site.
- At least one item in each list must stay visible — you can't hide every FAQ, service or process step at once.
- Validation happens on the server: if something's wrong (a blank required field, too many items), you'll see the specific problem next to the field and nothing is saved until it's fixed.

### Notes
- Only `ADMIN_EMAIL` can sign in, and the database independently allows only that email to write.
- `NEXT_PUBLIC_*` values are baked in at build time. After changing them, delete the `.next` folder and rebuild, otherwise an old build cache can keep the old values.
- Free Supabase projects may pause after about a week without activity (as far as I know). Public pages keep working from the last build; open the Supabase dashboard to resume the project.
- Nothing in `/admin` is linked from the public site and it is marked `noindex`.
