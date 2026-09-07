# AadalArchive — Backend setup

This project is moving from mock data to a real Supabase-backed product.
The UI stays as designed; backend plugs into existing pages.

## 1. Create a Supabase project

1. Go to https://supabase.com and create a project.
2. Open **Project Settings → API**.
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Do **not** put the `service_role` key in any `NEXT_PUBLIC_*` variable.

## 2. Local environment

```bash
cp .env.example .env.local
```

Fill in Supabase values. Optionally add:

- `UNSPLASH_ACCESS_KEY` — https://unsplash.com/oauth/applications
- `PEXELS_API_KEY` — https://www.pexels.com/api/
- `PINTEREST_APP_ID` / `PINTEREST_APP_SECRET` / `PINTEREST_ACCESS_TOKEN` — https://developers.pinterest.com/
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

### Pinterest Discover source

1. Create an app at https://developers.pinterest.com/
2. Set redirect URI to `{NEXT_PUBLIC_SITE_URL}/api/pinterest/oauth/callback`
3. Request scopes `pins:read` and `boards:read`
4. Put `PINTEREST_APP_ID` and `PINTEREST_APP_SECRET` in `.env.local`
5. Open `/api/pinterest/oauth` while signed into Pinterest, approve, then paste the shown tokens into `.env.local` (and Vercel)
6. Set `PINTEREST_SEARCH_MODE=user` (default). Use `partner` only if Pinterest granted partner pin search beta access
7. Restart the server / redeploy

Discover will then interleave Pinterest pins with Unsplash and Pexels. Without a token, Unsplash/Pexels continue to work alone.

## 3. Apply the database schema

In the Supabase dashboard → **SQL Editor**, paste and run:

1. `supabase/migrations/20260307000000_init.sql` — profiles, boards, inspiration cache, saved items, albums, choreography, practice, collaborations, notifications, search history, RLS.
2. `supabase/migrations/20260307120000_creative_ideas.sql` — `creative_ideas` table + optional profile fields (`secondary_dance_forms`, `current_project`, `experience_level`, `guru_name`).

Run both in order in the SQL Editor.

## 4. Auth settings

Supabase → **Authentication → Providers**

- Enable **Email**
- For local development, under **Authentication → Providers → Email**, you may disable “Confirm email” so signup reaches onboarding immediately
- Docs mention Google OAuth as optional:

## Enable Google (optional)

1. Supabase → **Authentication → Providers → Google** → Enable
2. Create OAuth credentials in Google Cloud Console
3. Add redirect URL: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
4. In `.env.local` set: `NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true`
5. Restart the app

Until then, use **email + password** on `/signup` and `/login`.

Also set **Authentication → URL Configuration**:

- Site URL: `http://localhost:3000`
- Redirect URLs: include `/auth/callback`

## 5. Storage buckets (Phase 4)

Create buckets (public/private as noted):

| Bucket         | Public | Used for              |
|----------------|--------|------------------------|
| avatars        | yes    | profile photos         |
| album-media    | no     | event photos/videos    |
| choreography   | no     | choreography videos    |
| practice       | no     | practice captures      |

Path convention: `{user_id}/...`

## 6. Run the app

```bash
npm run dev
```

Then:

1. `/signup` → create account  
2. `/onboarding` → dance form + interests  
3. `/home` → authenticated shell  
4. `/discover` search uses `/api/inspiration/search` when API keys are set  

## 7. Phase status

| Phase | Status | Scope |
|-------|--------|--------|
| 1 | Implemented in code | Supabase clients, schema, auth, profiles, middleware |
| 2 | Partial | Boards + saved inspirations services/API |
| 3 | Implemented in code | Unsplash/Pexels search API + cache upsert |
| 4–7 | Next | Albums uploads, choreography/practice, collab, personalization |

Mock arrays in `src/lib/data.ts` remain as a **development fallback** until each page is fully wired. Prefer DB queries when `isSupabaseConfigured()` is true.

## Security checklist

- [ ] RLS enabled (included in migration)
- [ ] No service-role key in client bundles
- [ ] `.env.local` gitignored
- [ ] External image APIs called only from server routes
