# Teens Kingdom Ministry (TKM)

A modern, mobile-first website for **Teens Kingdom Ministry** in Lagos, Nigeria. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase for authentication, data, and media storage.

## ✨ Features
- Vibrant, youth-friendly design (blue/green palette) with responsive layouts.
- Supabase Auth (email/password + optional Google login).
- Supabase PostgreSQL tables for events, posts, departments, workers, rankings, media, RSVPs, and join requests.
- Supabase Storage for photos and videos.
- Member dashboard with ranking progress and profile editing.
- Admin dashboard to manage all content, join requests, and RSVPs.
- Branding tools to upload a logo and customize ministry name, tagline, and WhatsApp link.

## ✅ Tech Stack (2026-ready)
- **Next.js 14+ (App Router)** + TypeScript
- **Tailwind CSS**
- **Supabase** (Auth, Database, Storage, RLS)
- **Vercel** (free hobby tier)

## 🚀 Local Development
```bash
npm install
npm run dev
```

## 🔐 Supabase Setup (Free Tier)
1. Create a new Supabase project (free tier).
2. Grab your **Project URL** and **Anon Key**.
3. Create a `.env.local` file using `.env.example`.

```bash
cp .env.example .env.local
```

4. Add:
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

5. In Supabase SQL Editor, run the schema in `supabase/schema.sql`.
6. Create storage buckets:
   - `media` (photos/videos)
   - `avatars` (profile images)

## 📦 Deployment (GitHub → Vercel)
1. Create a new GitHub repo and push this code.
2. Sign in to Vercel and import the repository.
3. Add env vars in Vercel settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy (Vercel will auto-build and host).

## 🗂️ Project Structure
```
src/
  app/
    about/
    announcements/
    admin/
    dashboard/
    departments/
    events/
    join/
    login/
    media/
  components/
    forms/
    FeatureCard.tsx
    Footer.tsx
    MediaTabs.tsx
    Navbar.tsx
    SectionHeading.tsx
    WhatsAppFloat.tsx
  lib/
    placeholder-data.ts
    supabase/
      auth.ts
      client.ts
      server.ts
supabase/
  schema.sql
```

## 🧠 Notes for Ministry Leaders
- Update announcements/events/media by inserting new rows in Supabase tables.
- Upload photos/videos to Supabase Storage and paste the public URL in the `media` table.
- If you want admin-only functionality, add a `role` column in `profiles` and extend `/admin`.

## 📸 WhatsApp Links
Replace the placeholder WhatsApp links in:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/WhatsAppFloat.tsx`
- `src/lib/placeholder-data.ts`

## 📝 License
Free to use for ministry purposes.
