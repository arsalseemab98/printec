import { createClient } from "@supabase/supabase-js";

// Load from .env.local
import { config } from "dotenv";
config({ path: ".env.local" });

// Import blog data
import { BLOG_POSTS } from "../src/lib/blog-data";

const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!key) throw new Error("No Supabase key found. Set SUPABASE_SERVICE_ROLE_KEY in .env.local");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);

async function seed() {
  console.log(`Seeding ${BLOG_POSTS.length} blog posts...`);

  for (const post of BLOG_POSTS) {
    const { error } = await supabase.from("blog_posts").upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        read_time: post.readTime,
        content: post.content,
        published: true,
        created_at: new Date(post.date).toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`Failed to seed "${post.slug}":`, error.message);
    } else {
      console.log(`✓ ${post.title}`);
    }
  }

  console.log("Done!");
}

seed();
