"use client";

import { useActionState } from "react";
import { addModule } from "@/actions/courses/addModule";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ActionState } from "@/actions/types";

const initialState: ActionState = {
  error: "",
};

export default function AddModuleForm({ courseId }: { courseId: string }) {
  const [state, formAction, pending] = useActionState(addModule, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="courseId" value={courseId} />

      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Titre du module</Label>
        <Input type="text" name="title" id="title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" rows={4} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL de la vidéo</Label>
        <Input type="url" name="videoUrl" id="videoUrl" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Ordre du module</Label>
        <Input
          type="number"
          name="order"
          id="order"
          min="1"
          required
          placeholder="1"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Ajout en cours..." : "Ajouter le module"}
        </Button>
      </div>
    </form>
  );
}
