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
| What | Where |
| --- | --- |
| Brand name, tagline, nav labels, CTA text, feature switches | `src/content/site.ts` |
| Services | `src/content/services.ts` |
| Process steps | `src/content/process.ts` |
| FAQ entries | `src/content/faq.ts` |
| Homepage copy | `src/content/home.ts` |
| Email / phone / WhatsApp | `.env.local` (`NEXT_PUBLIC_*`, see `.env.example`) |
| Colours and theme | `src/app/globals.css` |

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

## Quote form (Milestone 3)
The "Request a Quote" form on `/contact` posts to `/api/contact`, which validates the submission on the server and emails it via Gmail. There is no database for quote requests yet — email is the record.

### Setup: a Gmail App Password
Gmail requires an **App Password** rather than your normal password for this kind of sending.
1. Turn on 2-Step Verification on the Gmail account you want to send from (Google Account > Security).
2. Go to Google Account > Security > **App passwords**, create one (name it "Softsmith website"), and copy the 16-character password.
3. Add to `.env.local`:
   ```
   GMAIL_USER=you@gmail.com
   GMAIL_APP_PASSWORD=the16characterpassword
   QUOTE_TO_EMAIL=you@gmail.com
   ```
   `QUOTE_TO_EMAIL` is where requests are delivered — it can be a different address than the sender, or left unset to default to `GMAIL_USER`.
4. Restart the server. On Vercel, add the same three variables under Project Settings > Environment Variables (mark them **Sensitive**) and redeploy.

### Development mode
If those three variables aren't set, submissions still succeed — the email is printed to the server console instead of sent. This lets you build and test the form before Gmail is configured, and it's what happens automatically in local development until you add real credentials.

### What's built in
- Server-side validation on every field, independent of the browser (a request can't bypass it).
- A hidden honeypot field: if it's filled in, the request is silently discarded but still reports success, so automated spam tools can't tell they were caught.
- A basic rate limit (5 submissions per IP per 10 minutes) to blunt accidental or automated flooding. It resets on redeploy — a lightweight v1 safeguard, not a hard security boundary.
- If sending fails (bad credentials, Gmail unreachable), the visitor sees a clear error and the direct contact methods (WhatsApp, email, phone) as a fallback, within 8 seconds — it never hangs waiting on a slow or dead mail server.
- The "Service needed" dropdown is generated from whatever services are currently visible in the dashboard, so it stays in sync automatically.

## Quality pass (Milestone 4)
A full pass across accessibility, performance, SEO, and error handling — fixing real issues found along the way, not just documenting them.

### SEO infrastructure (new)
- `robots.txt` and `sitemap.xml` are generated automatically (`src/app/robots.ts`, `src/app/sitemap.ts`), listing the six public pages and excluding `/admin`.
- Every page has its own title, meta description, canonical URL, Open Graph tags, and Twitter card tags — set explicitly rather than relying on Next.js's fallback inheritance, which isn't reliable for these.
- A branded Open Graph preview image is generated at build time (`src/app/opengraph-image.tsx`) and used by every page, so links shared on social media or messaging apps show a proper card instead of nothing.
- Set `NEXT_PUBLIC_SITE_URL` to your real domain before deploying — it's used to build all of the above.

### Error handling (new)
- A branded 404 page (`not-found.tsx`) for any URL that doesn't exist.
- If a page crashes, a friendly error screen appears in its place — the header, footer, and navigation stay fully working around it, and there's a "Try again" button and a link to contact you directly. The visitor never sees a raw stack trace.
- This applies separately to the public site and the admin dashboard, so a problem in one never takes down the other.

### Verified (not just assumed)
- **Accessibility:** every page has exactly one `<h1>` and no skipped heading levels; text contrast exceeds WCAG AA (4.5:1) in both light and dark mode; full keyboard navigation with no traps, tested end to end on every page.
- **Reduced motion:** every animation (the hero graphic, the WhatsApp button's entrance) is neutralized when the visitor's system requests reduced motion.
- **Performance:** every public page loads in under 1 second on a throttled 1 Mbps connection and stays under the 200 KB budget.
- **Links:** every internal link across the site resolves correctly; external links open safely in a new tab.

### Two real bugs found and fixed during this pass
- Setting explicit Open Graph metadata on a page silently disabled Next.js's automatic detection of the preview image — now fixed by referencing it explicitly on every page.
- The Fraunces font used for the preview image needed a different file format than the one used on the website itself; without it, the image failed to generate at all.
