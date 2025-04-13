"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Button } from "./ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import "@/styles/rich-text.css";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  disabled = false,
}: RichTextEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary hover:underline",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `rich-text-editor ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`,
      },
    },
    editable: !disabled,
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setLinkDialogOpen(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg">
        <div
          className={`border-b p-2 flex flex-wrap gap-2 ${
            disabled ? "bg-gray-50" : ""
          }`}
        >
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-accent" : ""}
              title="Gras (Ctrl+B)"
              disabled={disabled}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-accent" : ""}
              title="Italique (Ctrl+I)"
              disabled={disabled}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "bg-accent" : ""}
              title="Liste à puces"
              disabled={disabled}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "bg-accent" : ""}
              title="Liste numérotée"
              disabled={disabled}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={editor.isActive("link") ? "bg-accent" : ""}
                  title="Ajouter un lien"
                  disabled={disabled}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un lien</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="URL du lien"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addLink();
                      }
                    }}
                    disabled={disabled}
                  />
                  <Button onClick={addLink} disabled={disabled}>
                    Ajouter
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo() || disabled}
              title="Annuler (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo() || disabled}
              title="Rétablir (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className={`relative ${disabled ? "pointer-events-none" : ""}`}
          tabIndex={disabled ? -1 : 0}
        >
          <EditorContent
            editor={editor}
            className={`focus:outline-none ${
              disabled ? "pointer-events-none" : ""
            }`}
          />
        </div>
      </div>
    </>
  );
}
