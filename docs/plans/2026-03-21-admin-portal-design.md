# Admin Portal Design

## Summary

Custom admin portal at `/admin/*` for managing page images, page text, and blog posts. Single admin login with env-var password. Images stored in Supabase Storage. Content stored in Supabase Postgres. WYSIWYG blog editor using Tiptap.

## Architecture

### Routes

```
/admin/login        → Password form
/admin              → Dashboard (page list, blog count, recent uploads)
/admin/pages        → List all pages with image slots
/admin/pages/[slug] → Edit page images + text
/admin/blog         → List blog posts (draft/published)
/admin/blog/new     → Create blog post (WYSIWYG)
/admin/blog/[slug]  → Edit blog post
```

### Auth

- `proxy.ts` checks for session cookie on `/admin/*` (except `/admin/login`)
- Login POST → API route compares against `ADMIN_PASSWORD` env var → sets HTTP-only cookie (24h expiry)
- No auth packages needed

### Data Flow

- Images → Supabase Storage bucket `images` → URL stored in `page_images` table
- Page text → `page_content` table
- Blog posts → `blog_posts` table (replaces hardcoded `blog-data.ts`)
- Frontend reads from Supabase at request time (SSR) with fallback to current hardcoded values

## Database Schema

### page_images

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| page_slug | text | e.g. 'dance-floor-wraps' |
| slot | text | e.g. 'hero', 'before', 'after' |
| url | text | Supabase Storage URL |
| alt_text | text | nullable |
| created_at | timestamptz | default now() |
| **UNIQUE** | (page_slug, slot) | |

### page_content

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| page_slug | text | |
| field | text | e.g. 'hero_title', 'intro_body' |
| value | text | |
| created_at | timestamptz | default now() |
| **UNIQUE** | (page_slug, field) | |

### blog_posts

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | UNIQUE |
| title | text | |
| excerpt | text | nullable |
| content | text | HTML from WYSIWYG |
| cover_image | text | Supabase Storage URL, nullable |
| published | boolean | default false |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

## Admin UI

- Dark theme matching main site (#0C0C0C, #F7941D orange accents)
- shadcn/ui components for forms, buttons, tables
- Page editor: image slot cards with preview + upload, text fields as editable inputs
- Blog editor: Tiptap WYSIWYG (bold, italic, headings, links, images, lists)

## Packages to Add

- `@supabase/supabase-js` — database + storage client
- `@tiptap/react` + `@tiptap/starter-kit` — WYSIWYG core
- `@tiptap/extension-image` + `@tiptap/extension-link` — WYSIWYG extensions

## Frontend Changes

- Helper function `getPageImage(pageSlug, slot)` reads from Supabase, falls back to current hardcoded value
- Helper function `getPageContent(pageSlug, field)` reads text from Supabase, falls back to current text
- Blog page reads from `blog_posts` table instead of `blog-data.ts`
- All changes are backward-compatible (fallback to existing data if Supabase entry missing)

## Database Setup

Use Supabase MCP tools (`mcp__supabase__apply_migration`, `mcp__supabase__execute_sql`) to create tables and set up RLS policies.

## Implementation Order

1. Database tables (via Supabase MCP)
2. Supabase client library setup
3. Admin auth (login page, middleware, API route)
4. Admin dashboard layout
5. Page image management (upload, preview, delete)
6. Page text management (edit, save)
7. Blog CRUD (list, create, edit, delete, WYSIWYG)
8. Frontend migration (pages read from Supabase with fallback)
9. Migrate existing blog-data.ts content to Supabase
