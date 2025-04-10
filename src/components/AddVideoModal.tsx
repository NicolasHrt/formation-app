"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddVideoForm from "@/components/AddVideoForm";
import { Plus } from "lucide-react";

export default function AddVideoModal({ moduleId }: { moduleId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4" />
          Ajouter une vidéo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une vidéo</DialogTitle>
        </DialogHeader>
        <AddVideoForm moduleId={moduleId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
