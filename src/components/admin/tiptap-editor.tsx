"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  onClick,
  active = false,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        background: active ? "rgba(247,148,29,0.2)" : "transparent",
        border: active ? "1px solid #F7941D" : "1px solid transparent",
        color: active ? "#F7941D" : "#fff",
        borderRadius: "4px",
        padding: "0.375rem 0.5rem",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 600,
        lineHeight: 1,
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
    editorProps: {
      attributes: {
        style:
          "min-height:300px;padding:1rem;color:#fff;font-size:15px;line-height:1.8;outline:none;",
      },
    },
  });

  // Sync external content changes (e.g. loading existing post)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!editor) return null;

  return (
    <div style={{ border: "1px solid #222", borderRadius: "4px", overflow: "hidden" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.25rem",
          padding: "0.5rem",
          background: "#111",
          borderBottom: "1px solid #222",
        }}
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          &bull; List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive("link")}
          title="Link"
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          title="Image"
        >
          Img
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          Undo
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          Redo
        </ToolbarButton>
      </div>

      {/* Editor */}
      <div
        style={{ background: "#111" }}
        className="tiptap-editor-wrapper"
      >
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .tiptap-editor-wrapper .tiptap {
          min-height: 300px;
        }
        .tiptap-editor-wrapper .tiptap h2 {
          font-size: 24px;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #fff;
        }
        .tiptap-editor-wrapper .tiptap h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem;
          color: #fff;
        }
        .tiptap-editor-wrapper .tiptap p {
          margin: 0.75rem 0;
        }
        .tiptap-editor-wrapper .tiptap ul,
        .tiptap-editor-wrapper .tiptap ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }
        .tiptap-editor-wrapper .tiptap li {
          margin: 0.25rem 0;
        }
        .tiptap-editor-wrapper .tiptap a {
          color: #F7941D;
          text-decoration: underline;
        }
        .tiptap-editor-wrapper .tiptap img {
          max-width: 100%;
          border-radius: 4px;
          margin: 1rem 0;
        }
        .tiptap-editor-wrapper .tiptap:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
