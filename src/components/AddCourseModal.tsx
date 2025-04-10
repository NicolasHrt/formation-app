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
import AddCourseForm from "@/components/AddCourseForm";
import { Plus } from "lucide-react";

interface AddCourseModalProps {
  onSuccess?: () => void;
}

export default function AddCourseModal({ onSuccess }: AddCourseModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4" />
          Ajouter une formation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une formation</DialogTitle>
        </DialogHeader>
        <AddCourseForm
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
