"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, Upload } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

interface AddVideoModalProps {
  moduleId: string;
  onSuccess?: () => void;
}

export default function AddVideoModal({
  moduleId,
  onSuccess,
}: AddVideoModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setTitle(file.name.split(".")[0]);

      // Calcul de la durée de la vidéo
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        setDuration(Math.round(video.duration));
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Veuillez sélectionner un fichier vidéo");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Obtenir l'URL signée pour l'upload
      const response = await fetch(`/api/modules/${moduleId}/videos/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      // Uploader le fichier vers S3
      const uploadResponse = await fetch(data.data.uploadUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Erreur lors de l'upload de la vidéo");
      }

      // Mettre à jour les métadonnées de la vidéo
      await fetch(`/api/modules/${moduleId}/videos/${data.data.video.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          duration,
          size: selectedFile.size,
        }),
      });

      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setUploadProgress(0);
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className=" h-4 w-4" />
          Ajouter une vidéo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une vidéo</DialogTitle>
          <DialogDescription>
            Téléchargez une vidéo et remplissez les informations ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="video">Vidéo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedFile ? selectedFile.name : "Sélectionner une vidéo"}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor content={description} onChange={setDescription} />
          </div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !selectedFile}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Upload en cours..." : "Ajouter la vidéo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
