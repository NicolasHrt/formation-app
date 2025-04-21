"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function AddCourseModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const courseData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      slug: formData.get("slug") as string,
    };

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création du cours");
      }

      setOpen(false);
      router.push("/dashboard/courses");
      // Invalider le cache React Query pour forcer un rafraîchissement
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Ajouter une formation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une formation</DialogTitle>
          <DialogDescription>
            Créez une nouvelle formation en remplissant les informations
            ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Titre de la formation"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Description de la formation"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL de la landing page</Label>
            <div className="flex items-center ">
              <div className="bg-muted px-3 py-2 rounded-l-md text-sm text-muted-foreground border">
                formation.com/
              </div>
              <Input
                id="slug"
                name="slug"
                required
                placeholder="slug"
                className="rounded-l-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Création en cours..." : "Créer la formation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
