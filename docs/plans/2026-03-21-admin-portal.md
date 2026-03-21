# Admin Portal Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a custom admin portal at `/admin` for managing page images, page text, and blog posts with WYSIWYG editing.

**Architecture:** Next.js App Router admin pages protected by simple password auth (env var). Supabase Postgres for content storage, Supabase Storage for image uploads. Frontend pages read from Supabase with fallback to existing hardcoded values.

**Tech Stack:** Next.js 16, Supabase (Postgres + Storage), Tiptap WYSIWYG, shadcn/ui

---

### Task 1: Create Supabase Database Tables

**Files:**
- None (uses Supabase MCP tools)

**Step 1: Create the `page_images` table**

Use `mcp__supabase__apply_migration` with name `create_page_images`:

```sql
CREATE TABLE page_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  slot text NOT NULL,
  url text NOT NULL,
  alt_text text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(page_slug, slot)
);

ALTER TABLE page_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON page_images FOR SELECT USING (true);
CREATE POLICY "Allow all for service role" ON page_images FOR ALL USING (true);
```

**Step 2: Create the `page_content` table**

Use `mcp__supabase__apply_migration` with name `create_page_content`:

```sql
CREATE TABLE page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  field text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(page_slug, field)
);

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON page_content FOR SELECT USING (true);
CREATE POLICY "Allow all for service role" ON page_content FOR ALL USING (true);
```

**Step 3: Create the `blog_posts` table**

Use `mcp__supabase__apply_migration` with name `create_blog_posts`:

```sql
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  category text DEFAULT 'General',
  read_time text DEFAULT '5 min read',
  content text NOT NULL,
  cover_image text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read published" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow all for service role" ON blog_posts FOR ALL USING (true);
```

**Step 4: Verify tables exist**

Use `mcp__supabase__list_tables` to confirm all 3 tables were created.

**Step 5: Commit** (no code changes, just migration tracking)

---

### Task 2: Install Dependencies & Setup Supabase Client

**Files:**
- Modify: `package.json`
- Create: `src/lib/supabase.ts`
- Create: `.env.local`

**Step 1: Install packages**

```bash
cd /Users/arsalseemab/Desktop/github/printec
npm install @supabase/supabase-js @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/pm
```

**Step 2: Create `.env.local`**

Use `mcp__supabase__get_project_url` and `mcp__supabase__get_publishable_keys` to get the URL and anon key.

```env
NEXT_PUBLIC_SUPABASE_URL=https://eofjaizkkxqxbynnvemi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key_from_mcp>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
ADMIN_PASSWORD=<choose_a_strong_password>
```

**Step 3: Create Supabase client**

Create `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

// Public client (for frontend reads)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server client (for admin writes — service role bypasses RLS)
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

**Step 4: Add `.env*.local` to `.gitignore`**

Verify `.gitignore` includes `.env*.local`.

**Step 5: Commit**

```bash
git add src/lib/supabase.ts .gitignore package.json package-lock.json
git commit -m "feat: add Supabase client and admin dependencies"
```

---

### Task 3: Admin Auth (Login + Middleware)

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/api/admin/login/route.ts`
- Create: `src/app/api/admin/logout/route.ts`
- Create: `src/proxy.ts`

**Step 1: Create login API route**

`src/app/api/admin/login/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
  return res;
}
```

**Step 2: Create logout API route**

`src/app/api/admin/logout/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}
```

**Step 3: Create proxy.ts**

`src/proxy.ts` (at the same level as `app/`):

```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Step 4: Create login page**

`src/app/admin/login/page.tsx` — client component with password form, dark theme, orange accents. On submit, POST to `/api/admin/login`, redirect to `/admin` on success.

**Step 5: Verify login flow manually**

- Visit `localhost:3424/admin` → should redirect to `/admin/login`
- Enter wrong password → should show error
- Enter correct password → should redirect to `/admin`

**Step 6: Commit**

```bash
git add src/app/admin/ src/app/api/admin/ src/proxy.ts
git commit -m "feat: add admin auth (login, logout, middleware)"
```

---

### Task 4: Admin Layout & Dashboard

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`

**Step 1: Create admin layout**

`src/app/admin/layout.tsx` — dark sidebar with nav links:
- Dashboard (`/admin`)
- Pages (`/admin/pages`)
- Blog (`/admin/blog`)
- Logout button
- Printec logo at top

**Step 2: Create dashboard page**

`src/app/admin/page.tsx` — overview cards showing:
- Number of pages with images
- Number of blog posts (published/draft)
- Quick links to edit pages

**Step 3: Verify layout renders**

Visit `localhost:3424/admin` after login.

**Step 4: Commit**

```bash
git add src/app/admin/layout.tsx src/app/admin/page.tsx
git commit -m "feat: add admin dashboard layout"
```

---

### Task 5: Page Image Management

**Files:**
- Create: `src/app/admin/pages/page.tsx`
- Create: `src/app/admin/pages/[slug]/page.tsx`
- Create: `src/app/api/admin/upload/route.ts`
- Create: `src/app/api/admin/pages/[slug]/images/route.ts`

**Step 1: Create upload API route**

`src/app/api/admin/upload/route.ts` — accepts FormData with file, uploads to Supabase Storage bucket `images`, returns public URL.

**Step 2: Create page images API route**

`src/app/api/admin/pages/[slug]/images/route.ts`:
- GET: fetch all images for a page slug from `page_images` table
- POST: upsert image entry (page_slug, slot, url, alt_text)
- DELETE: remove image entry

**Step 3: Create pages list page**

`src/app/admin/pages/page.tsx` — list of all site pages with image count per page. Hardcoded page list:

```ts
const PAGES = [
  { slug: "about", name: "About Us", slots: ["hero", "story"] },
  { slug: "dance-floor-wraps", name: "Dance Floor Wraps", slots: ["hero", "before", "after", "card-weddings", "card-corporate", "card-trade-shows", "card-galas", "card-venues", "card-djs", "gallery-1", "gallery-2", "gallery-3", "gallery-4"] },
  { slug: "wall-wraps", name: "Wall Wraps", slots: ["hero", "before", "after", ...] },
  { slug: "window-wraps", name: "Window Wraps", slots: ["hero", "before", "after", ...] },
  { slug: "channel-letters-signage", name: "Channel Letters", slots: ["hero", "before", "after", ...] },
];
```

**Step 4: Create page editor**

`src/app/admin/pages/[slug]/page.tsx` — grid of image slot cards. Each card:
- Shows current image (preview) or placeholder
- Upload button (file picker → uploads to Supabase → saves URL)
- Alt text input
- Delete button

**Step 5: Verify upload flow**

Upload an image through admin, verify it appears in Supabase Storage and the page_images table.

**Step 6: Commit**

```bash
git add src/app/admin/pages/ src/app/api/admin/
git commit -m "feat: add page image management in admin"
```

---

### Task 6: Page Text Management

**Files:**
- Create: `src/app/api/admin/pages/[slug]/content/route.ts`
- Modify: `src/app/admin/pages/[slug]/page.tsx`

**Step 1: Create content API route**

`src/app/api/admin/pages/[slug]/content/route.ts`:
- GET: fetch all content fields for a page
- POST: upsert content field (page_slug, field, value)

**Step 2: Add text editing to page editor**

Below the image slots, add editable text fields for each page:
- Hero title
- Intro heading
- Intro body text
- Section headings

Each field: text input or textarea, save button that POSTs to the content API.

**Step 3: Verify text editing**

Edit a heading in admin, verify it saves to `page_content` table.

**Step 4: Commit**

```bash
git add src/app/api/admin/pages/ src/app/admin/pages/
git commit -m "feat: add page text management in admin"
```

---

### Task 7: Blog CRUD with WYSIWYG

**Files:**
- Create: `src/app/admin/blog/page.tsx`
- Create: `src/app/admin/blog/new/page.tsx`
- Create: `src/app/admin/blog/[slug]/page.tsx`
- Create: `src/components/admin/tiptap-editor.tsx`
- Create: `src/app/api/admin/blog/route.ts`
- Create: `src/app/api/admin/blog/[slug]/route.ts`

**Step 1: Create Tiptap WYSIWYG component**

`src/components/admin/tiptap-editor.tsx` — client component wrapping Tiptap with:
- Toolbar: Bold, Italic, H1-H3, Bullet/Ordered list, Link, Image, Undo/Redo
- Dark theme styling
- `onChange` callback returning HTML string

**Step 2: Create blog API routes**

`src/app/api/admin/blog/route.ts`:
- GET: list all blog posts (admin sees drafts too)
- POST: create new blog post

`src/app/api/admin/blog/[slug]/route.ts`:
- GET: single post
- PUT: update post
- DELETE: delete post

**Step 3: Create blog list page**

`src/app/admin/blog/page.tsx` — table with columns: Title, Category, Status (Published/Draft), Date, Actions (Edit/Delete). "New Post" button at top.

**Step 4: Create blog editor page**

`src/app/admin/blog/new/page.tsx` and `src/app/admin/blog/[slug]/page.tsx`:
- Title input
- Slug input (auto-generated from title)
- Category dropdown
- Cover image upload
- Excerpt textarea
- Tiptap WYSIWYG editor for content
- Published toggle
- Save / Delete buttons

**Step 5: Verify blog creation**

Create a test post through admin, verify it appears in `blog_posts` table.

**Step 6: Commit**

```bash
git add src/app/admin/blog/ src/components/admin/ src/app/api/admin/blog/
git commit -m "feat: add blog CRUD with Tiptap WYSIWYG editor"
```

---

### Task 8: Frontend Migration (Read from Supabase)

**Files:**
- Create: `src/lib/content.ts`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify service pages as needed

**Step 1: Create content helper functions**

`src/lib/content.ts`:

```ts
import { supabase } from "./supabase";

export async function getPageImage(pageSlug: string, slot: string): Promise<string | null> {
  const { data } = await supabase
    .from("page_images")
    .select("url")
    .eq("page_slug", pageSlug)
    .eq("slot", slot)
    .single();
  return data?.url ?? null;
}

export async function getPageContent(pageSlug: string, field: string): Promise<string | null> {
  const { data } = await supabase
    .from("page_content")
    .select("value")
    .eq("page_slug", pageSlug)
    .eq("field", field)
    .single();
  return data?.value ?? null;
}

export async function getBlogPosts(publishedOnly = true) {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (publishedOnly) query = query.eq("published", true);
  const { data } = await query;
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}
```

**Step 2: Update blog page to read from Supabase**

Modify `src/app/blog/page.tsx`:
- Import `getBlogPosts` from `@/lib/content`
- Make page component async
- Fetch posts from Supabase
- Fallback: if empty, import and use `BLOG_POSTS` from `blog-data.ts`

**Step 3: Update blog slug page similarly**

**Step 4: Verify blog renders from database**

**Step 5: Commit**

```bash
git add src/lib/content.ts src/app/blog/
git commit -m "feat: migrate blog to Supabase with fallback to hardcoded data"
```

---

### Task 9: Seed Blog Data

**Files:**
- Create: `scripts/seed-blog.ts` (or use Supabase MCP)

**Step 1: Migrate existing blog posts to Supabase**

Use `mcp__supabase__execute_sql` to insert the 6 existing blog posts from `blog-data.ts` into the `blog_posts` table. Set `published = true` for all.

**Step 2: Verify posts appear on the blog page from Supabase**

**Step 3: Commit**

```bash
git commit -m "feat: seed blog posts into Supabase"
```

---

## Execution Notes

- **Supabase MCP tools** available for database operations: `mcp__supabase__apply_migration`, `mcp__supabase__execute_sql`, `mcp__supabase__list_tables`, `mcp__supabase__get_project_url`, `mcp__supabase__get_publishable_keys`
- **Supabase project ID**: `eofjaizkkxqxbynnvemi`
- **No test framework** in project — verify manually via browser
- **proxy.ts** goes in `src/` directory (same level as `app/`)
- **Admin pages** are client components (forms, file uploads, state)
- **Service role key** needed for admin writes (bypasses RLS) — get from Supabase dashboard
