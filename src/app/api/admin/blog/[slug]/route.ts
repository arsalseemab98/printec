import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ post: data });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const body = await req.json();
    const sb = createServerClient();

    const { data, error } = await sb
      .from("blog_posts")
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        category: body.category,
        read_time: body.read_time,
        content: body.content,
        cover_image: body.cover_image,
        published: body.published,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (err) {
    console.error("Blog update error:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const sb = createServerClient();

  const { error } = await sb
    .from("blog_posts")
    .delete()
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
