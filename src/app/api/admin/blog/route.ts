import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data || [] });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      slug,
      title,
      excerpt,
      category,
      read_time,
      content,
      cover_image,
      published,
    } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "slug and title are required" },
        { status: 400 }
      );
    }

    const sb = createServerClient();

    const { data, error } = await sb
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt: excerpt || "",
        category: category || "General",
        read_time: read_time || "5 min read",
        content: content || "",
        cover_image: cover_image || "",
        published: published ?? false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err) {
    console.error("Blog create error:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
