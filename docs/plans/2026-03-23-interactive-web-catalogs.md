# Interactive Web Catalogs — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 6 email-gated interactive web catalogs (fullscreen slideshow style) with admin CRUD for managing catalog content and projects.

**Architecture:** Public pages at `/catalogs` (listing) and `/catalogs/[slug]` (slideshow viewer). Admin pages at `/admin/catalogs` (list + create) and `/admin/catalogs/[id]` (edit catalog + manage projects). 3 new Supabase tables. Images reuse existing Supabase Storage pipeline. Lead capture on email gate saves to `catalog_leads` table.

**Tech Stack:** Next.js 16 App Router, Supabase (PostgreSQL + Storage), React (inline styles matching existing dark theme), lucide-react icons.

---

## Task 1: Create Supabase Tables

**Files:**
- Reference: `src/lib/supabase.ts` (existing client setup)

**Step 1: Create the 3 tables via Supabase SQL Editor**

Run the following SQL in the Supabase dashboard SQL editor (project: `eofjaizkkxqxbynnvemi`):

```sql
-- Catalogs table
CREATE TABLE catalogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catalog projects table
CREATE TABLE catalog_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  catalog_id UUID NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  specs JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_catalog_projects_catalog_id ON catalog_projects(catalog_id);

-- Catalog leads table
CREATE TABLE catalog_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  catalog_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 2: Verify tables exist**

Run: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'catalog%';`

Expected: 3 rows — `catalogs`, `catalog_projects`, `catalog_leads`

**Step 3: Commit** (no code changes yet, but note the SQL was run)

---

## Task 2: API Routes — Catalogs CRUD

**Files:**
- Create: `src/app/api/admin/catalogs/route.ts`
- Create: `src/app/api/admin/catalogs/[id]/route.ts`
- Reference: `src/app/api/admin/inquiries/route.ts` (follow same pattern)
- Reference: `src/lib/supabase.ts`

**Step 1: Create catalogs list + create route**

Create `src/app/api/admin/catalogs/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("catalogs")
    .select("*, catalog_projects(count)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createServerClient();
  const body = await req.json();
  const { title, slug, description } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("catalogs")
    .insert({ title, slug, description: description || "" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
```

**Step 2: Create single catalog route (GET, PUT, DELETE)**

Create `src/app/api/admin/catalogs/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("catalogs")
    .select("*, catalog_projects(*)")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Sort projects by sort_order
  if (data.catalog_projects) {
    data.catalog_projects.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
  }

  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = await req.json();
  const { title, slug, description } = body;

  const { data, error } = await supabase
    .from("catalogs")
    .update({ title, slug, description })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const { error } = await supabase.from("catalogs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

**Step 3: Commit**

```bash
git add src/app/api/admin/catalogs/
git commit -m "feat: add catalog CRUD API routes"
```

---

## Task 3: API Routes — Catalog Projects CRUD

**Files:**
- Create: `src/app/api/admin/catalogs/[id]/projects/route.ts`
- Create: `src/app/api/admin/catalogs/[id]/projects/[projectId]/route.ts`

**Step 1: Create projects list + create route**

Create `src/app/api/admin/catalogs/[id]/projects/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("catalog_projects")
    .select("*")
    .eq("catalog_id", id)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = await req.json();

  // Get max sort_order for this catalog
  const { data: existing } = await supabase
    .from("catalog_projects")
    .select("sort_order")
    .eq("catalog_id", id)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0;

  const { data, error } = await supabase
    .from("catalog_projects")
    .insert({
      catalog_id: id,
      title: body.title || "Untitled Project",
      description: body.description || "",
      image_url: body.image_url || "",
      specs: body.specs || [],
      sort_order: nextOrder,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
```

**Step 2: Create single project route (PUT, DELETE)**

Create `src/app/api/admin/catalogs/[id]/projects/[projectId]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; projectId: string }> }) {
  const { projectId } = await params;
  const supabase = createServerClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("catalog_projects")
    .update({
      title: body.title,
      description: body.description,
      image_url: body.image_url,
      specs: body.specs,
      sort_order: body.sort_order,
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string; projectId: string }> }) {
  const { projectId } = await params;
  const supabase = createServerClient();
  const { error } = await supabase.from("catalog_projects").delete().eq("id", projectId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

**Step 3: Create reorder endpoint**

Add to `src/app/api/admin/catalogs/[id]/projects/route.ts` a PATCH method:

```typescript
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const { order } = await req.json(); // array of { id, sort_order }

  for (const item of order) {
    await supabase
      .from("catalog_projects")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id)
      .eq("catalog_id", id);
  }

  return NextResponse.json({ success: true });
}
```

**Step 4: Commit**

```bash
git add src/app/api/admin/catalogs/
git commit -m "feat: add catalog projects CRUD + reorder API routes"
```

---

## Task 4: API Route — Catalog Leads

**Files:**
- Create: `src/app/api/catalog-leads/route.ts`

**Step 1: Create public lead capture route**

Create `src/app/api/catalog-leads/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const body = await req.json();
  const { name, email, catalog_slug } = body;

  if (!name || !email || !catalog_slug) {
    return NextResponse.json({ error: "Name, email, and catalog are required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("catalog_leads")
    .insert({ name, email, catalog_slug });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

**Step 2: Commit**

```bash
git add src/app/api/catalog-leads/route.ts
git commit -m "feat: add catalog leads capture API route"
```

---

## Task 5: Public API — Fetch Catalog by Slug

**Files:**
- Create: `src/app/api/catalogs/[slug]/route.ts`

**Step 1: Create public catalog fetch route**

Create `src/app/api/catalogs/[slug]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("catalogs")
    .select("*, catalog_projects(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
  }

  // Sort projects by sort_order
  if (data.catalog_projects) {
    data.catalog_projects.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
  }

  return NextResponse.json(data);
}
```

**Step 2: Commit**

```bash
git add src/app/api/catalogs/
git commit -m "feat: add public catalog fetch by slug API"
```

---

## Task 6: Admin Catalogs List Page

**Files:**
- Create: `src/app/admin/catalogs/page.tsx`
- Modify: `src/app/admin/layout.tsx` (add Catalogs nav item)
- Reference: `src/app/admin/blog/page.tsx` (follow same list pattern)
- Reference: `src/lib/constants.ts` (ORANGE, BLACK, DARK1, DARK2, WHITE)

**Step 1: Add "Catalogs" to admin sidebar nav**

In `src/app/admin/layout.tsx`, find the nav items array and add a Catalogs entry with `BookOpen` or `Image` icon from lucide-react, path `/admin/catalogs`, positioned after Blog.

**Step 2: Create admin catalogs list page**

Create `src/app/admin/catalogs/page.tsx` — a `"use client"` page that:

- Fetches catalogs from `GET /api/admin/catalogs` on mount
- Displays a list/table: Title, Slug, Project Count, Created Date, Actions (Edit, Delete)
- "New Catalog" button opens an inline form or modal with fields: Title, Slug (auto-generated from title), Description
- Slug auto-generates from title: `title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")`
- Delete with `window.confirm()` → `DELETE /api/admin/catalogs/[id]`
- Click row → navigate to `/admin/catalogs/[id]`
- Follow existing admin styling: #0C0C0C bg, #111 cards, #222 borders, #F7941D accents
- Orange label at top: "CATALOG MANAGEMENT", h1: "Catalogs"

**Step 3: Verify page loads at /admin/catalogs**

Run: `npm run dev` → navigate to `http://localhost:3000/admin/catalogs`
Expected: Page renders with empty state "No catalogs yet"

**Step 4: Commit**

```bash
git add src/app/admin/catalogs/page.tsx src/app/admin/layout.tsx
git commit -m "feat: add admin catalogs list page with create/delete"
```

---

## Task 7: Admin Catalog Detail Page (Edit + Manage Projects)

**Files:**
- Create: `src/app/admin/catalogs/[id]/page.tsx`
- Reference: `src/app/admin/inquiries/[id]/page.tsx` (detail page pattern)
- Reference: `src/app/admin/images/page.tsx` (image upload pattern)

**Step 1: Create admin catalog detail page**

Create `src/app/admin/catalogs/[id]/page.tsx` — a `"use client"` page that:

**Top section — Catalog info (editable):**
- Back link to `/admin/catalogs`
- Editable fields: Title, Slug, Description
- Save / Cancel buttons
- Delete catalog button (red, with confirmation)

**Bottom section — Projects list:**
- "Add Project" button at top
- Each project card shows:
  - Thumbnail (image_url or placeholder)
  - Title (editable inline)
  - Description (editable textarea)
  - Image upload: file input → upload to Supabase Storage via `POST /api/admin/images`, get URL back, save to project
  - Specs editor: key-value pairs (label + value), add/remove rows. Example specs: `[{ label: "Type", value: "Front-Lit LED" }, { label: "Material", value: "Aluminum" }]`
  - Sort order: up/down arrow buttons to reorder
  - Delete project button
- Save individual project → `PUT /api/admin/catalogs/[id]/projects/[projectId]`
- Delete project → `DELETE /api/admin/catalogs/[id]/projects/[projectId]` with confirmation

**Image upload flow (per project):**
1. User clicks "Upload Image" on a project card
2. File input opens (accept .webp, .png, .jpg, .jpeg)
3. File uploaded via FormData to `POST /api/admin/images`
4. Response returns the public URL
5. URL saved to project's `image_url` field via PUT

**Step 2: Verify the full flow**

Run dev server → Create a catalog → Add projects with images and specs → Reorder → Edit → Delete

**Step 3: Commit**

```bash
git add src/app/admin/catalogs/[id]/page.tsx
git commit -m "feat: add admin catalog detail page with project management"
```

---

## Task 8: Public Catalogs Landing Page

**Files:**
- Create: `src/app/catalogs/page.tsx`
- Reference: `src/app/portfolio/page.tsx` (public page pattern)
- Reference: `src/lib/constants.ts`

**Step 1: Create public catalogs listing page**

Create `src/app/catalogs/page.tsx` — a server component page that:

- Fetches all catalogs from Supabase (with project count)
- Exports metadata: title "Portfolio Catalogs | Printec Virginia", description, openGraph
- Layout:
  - PageHero style header: "PORTFOLIO CATALOGS" with orange label "From Vision to Vinyl"
  - Grid of catalog cards (2-3 columns)
  - Each card:
    - First project's image as thumbnail (or gradient placeholder)
    - Catalog title (Arial Black)
    - Description (white/50)
    - Project count badge
    - "View Catalog →" link to `/catalogs/[slug]`
  - Dark theme matching site (#0C0C0C bg, #161616 cards, #222 borders, #F7941D accents)
- CTA banner at bottom: "Don't see what you need? Contact us"

**Step 2: Add "Catalogs" link to main navbar**

In `src/components/layout/navbar.tsx`, add a "Catalogs" nav link between Portfolio and Blog (or wherever appropriate). Follow existing nav item pattern.

**Step 3: Verify page at /catalogs**

Run dev server → navigate to `/catalogs`
Expected: Page renders with catalog cards (or empty state if no catalogs created yet)

**Step 4: Commit**

```bash
git add src/app/catalogs/page.tsx src/components/layout/navbar.tsx
git commit -m "feat: add public catalogs landing page with nav link"
```

---

## Task 9: Public Catalog Viewer — Fullscreen Slideshow

**Files:**
- Create: `src/app/catalogs/[slug]/page.tsx`
- Create: `src/components/catalogs/catalog-viewer.tsx` (client component)
- Create: `src/components/catalogs/email-gate.tsx` (client component)

This is the core feature — the fullscreen cinematic slideshow matching template #4.

**Step 1: Create the email gate component**

Create `src/components/catalogs/email-gate.tsx`:

```tsx
"use client";
// Email gate overlay matching Printec dark theme
// Props: catalogTitle, catalogSlug, onUnlock
// - Displays overlay with blur background
// - Printec logo (P box + PRINTEC text)
// - Orange divider line
// - Catalog title
// - Name + Email inputs
// - "View Catalog" button
// - On submit: POST to /api/catalog-leads, then call onUnlock()
// - Also check sessionStorage for previously unlocked catalogs
// - Style: gate-overlay with backdrop-filter blur(20px), bg-black/80
// - Card: #161616 bg, #222 border, 4px radius
// - Button: #F7941D bg, black text, pulse-glow animation
```

Key behaviors:
- On mount, check `sessionStorage.getItem("catalog_unlocked_" + slug)` — if "true", skip gate
- On submit, save lead then set sessionStorage and call onUnlock
- Inputs: name (text), email (email) with #0C0C0C bg, #222 border, focus border #F7941D

**Step 2: Create the catalog viewer component**

Create `src/components/catalogs/catalog-viewer.tsx`:

```tsx
"use client";
// Fullscreen slideshow/carousel component
// Props: catalog (title, description, slug), projects (array of project objects)
//
// Layout (matching template #4 — cinematic slideshow):
// - Full viewport height (100vh), overflow hidden
// - Background: gradient placeholder OR project image (full bleed)
// - Overlay: gradient from transparent → dark on right side
// - Right panel (45% width on desktop): project title (Arial Black), description, specs grid, CTA button
// - Animated text entry: staggered slideUp animations on slide change
//
// Navigation:
// - Bottom bar: progress bar (#F7941D fill), prev/next circle buttons, dot indicators
// - Keyboard: ArrowLeft/ArrowRight
// - Touch: swipe left/right detection (touchstart/touchend)
//
// Top bar:
// - Printec logo (left), catalog title in orange (right)
//
// Floating CTA:
// - "Request Quote" button (bottom-right, pulse-glow)
// - Links to /contact
//
// Project slide content:
// - Slide counter: "01 / 08" in orange
// - Title: font-black, 4xl-5xl
// - Orange divider line with glow
// - Description: white/50, sm text
// - Specs grid: 2 columns, label (white/30) + value (white, medium)
// - "Get a Quote Like This" button → links to /contact?service=catalogTitle
//
// Transitions:
// - Slides fade + slight scale (opacity 0.8s, transform scale 1.02 → 1)
// - Text staggers in: title 0.2s, desc 0.4s, specs 0.6s, cta 0.8s
```

**Step 3: Create the page wrapper**

Create `src/app/catalogs/[slug]/page.tsx`:

```tsx
// Server component that:
// 1. Fetches catalog + projects from Supabase by slug
// 2. Returns 404 (notFound()) if catalog doesn't exist
// 3. Exports generateMetadata with catalog title + description
// 4. Renders EmailGate + CatalogViewer
// 5. Manages unlocked state via client wrapper
```

The page should be a server component that fetches data, with a client wrapper component that handles the gate state:

```tsx
// src/app/catalogs/[slug]/page.tsx
import { createServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { CatalogPage } from "@/components/catalogs/catalog-page";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data } = await supabase.from("catalogs").select("title, description").eq("slug", slug).single();
  if (!data) return { title: "Catalog Not Found" };
  return {
    title: `${data.title} | Printec Virginia Portfolio`,
    description: data.description,
    openGraph: { title: data.title, description: data.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data } = await supabase
    .from("catalogs")
    .select("*, catalog_projects(*)")
    .eq("slug", slug)
    .single();

  if (!data) notFound();

  const projects = (data.catalog_projects || []).sort(
    (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
  );

  return <CatalogPage catalog={data} projects={projects} />;
}
```

Create `src/components/catalogs/catalog-page.tsx` — client wrapper that:
- Manages `unlocked` state
- Shows EmailGate when locked, CatalogViewer when unlocked

**Step 4: Verify the full public flow**

1. Create a catalog via admin with 3+ projects and images
2. Navigate to `/catalogs/[slug]`
3. See email gate → enter name/email → gate disappears
4. Slideshow works: arrows, keyboard, swipe, dots, progress bar
5. Refresh page → gate is skipped (sessionStorage)
6. Check `catalog_leads` table in Supabase → lead was saved

**Step 5: Commit**

```bash
git add src/app/catalogs/[slug]/ src/components/catalogs/
git commit -m "feat: add fullscreen slideshow catalog viewer with email gate"
```

---

## Task 10: Add Catalogs to Sitemap + Footer

**Files:**
- Modify: `src/app/sitemap.ts` — add `/catalogs` and `/catalogs/[slug]` entries
- Modify: `src/components/layout/footer.tsx` — add "Catalogs" link in appropriate column

**Step 1: Update sitemap**

In `src/app/sitemap.ts`, fetch all catalogs and add:
- `/catalogs` with priority 0.8
- `/catalogs/[slug]` for each catalog with priority 0.7

**Step 2: Update footer**

Add "Catalogs" link in the Services or Company column of the footer.

**Step 3: Commit**

```bash
git add src/app/sitemap.ts src/components/layout/footer.tsx
git commit -m "feat: add catalogs to sitemap and footer navigation"
```

---

## Task 11: Admin Catalog Leads View

**Files:**
- Create: `src/app/admin/catalogs/leads/page.tsx`

**Step 1: Create leads list page**

Create `src/app/admin/catalogs/leads/page.tsx` — a `"use client"` page that:

- Fetches leads from `catalog_leads` table ordered by created_at desc
- Table: Name, Email, Catalog, Date
- Filter by catalog (dropdown)
- Search by name/email
- Export option: copy all emails to clipboard
- Link from admin catalogs page: "View Leads" button

**Step 2: Add leads link to admin catalogs page**

In `src/app/admin/catalogs/page.tsx`, add a "View Leads" button in the header that links to `/admin/catalogs/leads`.

**Step 3: Commit**

```bash
git add src/app/admin/catalogs/leads/page.tsx src/app/admin/catalogs/page.tsx
git commit -m "feat: add admin catalog leads view with search and filter"
```

---

## Task 12: Seed Initial 6 Catalogs

**Files:**
- Reference: Admin UI created in Tasks 6-7

**Step 1: Create the 6 catalogs via admin UI**

Using the admin interface at `/admin/catalogs`, create:

1. **Channel Letters & Signage** — slug: `channel-letters-signage`
2. **Vehicle & Food Truck Wraps** — slug: `vehicle-wraps`
3. **Window & Storefront Graphics** — slug: `window-storefront-graphics`
4. **Wall Wraps & Murals** — slug: `wall-wraps-murals`
5. **Dance Floor & Wedding Wraps** — slug: `dance-floor-wedding-wraps`
6. **Neon Signs** — slug: `neon-signs`

Each with a relevant description.

**Step 2: Add sample projects to each catalog**

For each catalog, add 2-3 projects using the admin detail page. Use existing portfolio images from Supabase Storage where possible. Add specs like Type, Material, Size, Location.

**Step 3: Verify all 6 catalogs work end-to-end**

Navigate to `/catalogs` → click each → verify email gate → verify slideshow navigation.

---

## Task 13: Final Polish + Testing

**Step 1: Responsive testing**

Test all pages on mobile (375px), tablet (768px), desktop (1440px):
- Email gate: centered, readable on all sizes
- Slideshow: stacks vertically on mobile (image top, info bottom)
- Admin pages: functional on tablet+
- Catalogs landing: cards stack on mobile

**Step 2: Edge cases**

- Catalog with 0 projects: show "No projects yet" message
- Catalog with 1 project: hide navigation dots/arrows
- Very long descriptions: truncate or scroll
- Missing images: show gradient placeholder (matching dark theme)

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete interactive web catalog system with admin CRUD"
```
