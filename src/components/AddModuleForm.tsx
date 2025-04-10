"use client";

import { useState } from "react";
import { useCourse } from "@/hooks/useCourse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AddModuleForm({ courseId }: { courseId: string }) {
  const { addModule, loading, error } = useCourse();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    order: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addModule({ ...formData, courseId });
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      order: 1,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Titre du module</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL de la vidéo</Label>
        <Input
          type="url"
          name="videoUrl"
          id="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Ordre du module</Label>
        <Input
          type="number"
          name="order"
          id="order"
          min="1"
          value={formData.order}
          onChange={handleChange}
          required
          placeholder="1"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter le module"}
        </Button>
      </div>
    </form>
  );
}
