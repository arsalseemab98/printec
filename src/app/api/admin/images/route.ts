import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.storage.from("images").list("", {
      limit: 1000,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter out folders (only files)
    const files = (data || []).filter(
      (item) => item.name && item.id && !item.name.endsWith("/")
    );

    // Attach public URLs
    const images = files.map((file) => {
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(file.name);
      return {
        name: file.name,
        size: file.metadata?.size ?? 0,
        created_at: file.created_at,
        url: urlData.publicUrl,
      };
    });

    return NextResponse.json({ images });
  } catch (err) {
    console.error("List images error:", err);
    return NextResponse.json(
      { error: "Failed to list images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const supabase = createServerClient();
    const results: { name: string; url: string; size: number; error?: string }[] = [];

    for (const file of files) {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${timestamp}_${safeName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        results.push({ name: file.name, url: "", size: 0, error: error.message });
      } else {
        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);
        results.push({
          name: filePath,
          url: urlData.publicUrl,
          size: file.size,
        });
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.storage
      .from("images")
      .remove([filename]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
