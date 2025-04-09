"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createCourse, ActionState } from "@/app/actions/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState: ActionState = {
  error: "",
};

export default function CreateCourseForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createCourse,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input type="text" name="title" id="title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" rows={4} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Image de couverture (URL)</Label>
        <Input type="url" name="coverImage" id="coverImage" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
            /formation/
          </span>
          <Input
            type="text"
            name="slug"
            id="slug"
            required
            pattern="[a-z0-9-]+"
            className="rounded-l-none"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Utilisez uniquement des lettres minuscules, des chiffres et des tirets
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Création en cours..." : "Créer la formation"}
        </Button>
      </div>
    </form>
  );
}
