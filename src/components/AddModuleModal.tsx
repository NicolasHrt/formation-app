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
import AddModuleForm from "@/components/AddModuleForm";
import { Plus } from "lucide-react";

interface AddModuleModalProps {
  courseId: string;
  onSuccess?: () => void;
}

export default function AddModuleModal({
  courseId,
  onSuccess,
}: AddModuleModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" />
          Ajouter un module
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un module</DialogTitle>
        </DialogHeader>
        <AddModuleForm
          courseId={courseId}
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
