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
  features?: {
    bold?: boolean;
    italic?: boolean;
    bulletList?: boolean;
    orderedList?: boolean;
    link?: boolean;
    undo?: boolean;
    redo?: boolean;
  };
}

export default function RichTextEditor({
  content,
  onChange,
  disabled = false,
  features = {
    bold: true,
    italic: true,
    bulletList: true,
    orderedList: true,
    link: true,
    undo: true,
    redo: true,
  },
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
      <div className="border border-border rounded-lg">
        <div
          className={`border-b p-2 flex flex-wrap gap-2 border-border ${
            disabled ? "bg-gray-50" : ""
          }`}
        >
          <div className="flex gap-2">
            {features.bold && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "bg-accent" : ""}
                title="Gras (Ctrl+B)"
                disabled={disabled}
                type="button"
              >
                <Bold className="h-4 w-4" />
              </Button>
            )}
            {features.italic && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "bg-accent" : ""}
                title="Italique (Ctrl+I)"
                disabled={disabled}
                type="button"
              >
                <Italic className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {features.bulletList && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "bg-accent" : ""}
                title="Liste à puces"
                disabled={disabled}
                type="button"
              >
                <List className="h-4 w-4" />
              </Button>
            )}
            {features.orderedList && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "bg-accent" : ""}
                title="Liste numérotée"
                disabled={disabled}
                type="button"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {features.link && (
              <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={editor.isActive("link") ? "bg-accent" : ""}
                    title="Ajouter un lien"
                    disabled={disabled}
                    type="button"
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
            )}
          </div>

          <div className="flex gap-2">
            {features.undo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo() || disabled}
                title="Annuler (Ctrl+Z)"
                type="button"
              >
                <Undo className="h-4 w-4" />
              </Button>
            )}
            {features.redo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo() || disabled}
                title="Rétablir (Ctrl+Y)"
                type="button"
              >
                <Redo className="h-4 w-4" />
              </Button>
            )}
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
