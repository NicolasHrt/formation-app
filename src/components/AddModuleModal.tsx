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

export default function AddModuleModal({ courseId }: { courseId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un module
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un module</DialogTitle>
        </DialogHeader>
        <AddModuleForm courseId={courseId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
