"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Module, Video } from "@prisma/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Loader2, Trash2 } from "lucide-react";
import AddVideoModal from "@/components/AddVideoModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModuleWithVideos extends Module {
  videos: Video[];
}

function SortableVideo({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/modules/${video.moduleId}/videos/${video.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      setOpen(false);
      // Recharger la page pour mettre à jour l'affichage
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression de la vidéo:", error);
      alert("Une erreur est survenue lors de la suppression de la vidéo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow relative h-full"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-500 hover:bg-red-50"
              title="Supprimer la vidéo"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer la vidéo</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer cette vidéo ? Cette action
                est irréversible.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isDeleting}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col space-y-4 h-full">
        <div className="pr-12">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{video.description}</p>
        </div>
        <div className="relative pt-[56.25%] flex-1">
          <video
            src={video.videoUrl}
            controls
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default function ModuleVideosPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const resolvedParams = use(params);
  const [module, setModule] = useState<ModuleWithVideos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchModule = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/courses/${resolvedParams.courseId}/modules/${resolvedParams.moduleId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setModule(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [resolvedParams.moduleId]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = module?.videos.findIndex((v) => v.id === active.id) ?? 0;
      const newIndex = module?.videos.findIndex((v) => v.id === over.id) ?? 0;

      const newVideos = arrayMove(module?.videos ?? [], oldIndex, newIndex);

      setModule((prev) => {
        if (!prev) return null;
        return { ...prev, videos: newVideos };
      });

      try {
        await fetch(
          `/api/courses/${resolvedParams.courseId}/modules/${resolvedParams.moduleId}/videos/reorder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videos: newVideos.map((video, index) => ({
                id: video.id,
                order: index,
              })),
            }),
          }
        );
      } catch (error) {
        console.error("Erreur lors du réordonnancement des vidéos:", error);
      }
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!module) {
    return <div>Module non trouvé</div>;
  }

  const hasVideos = module.videos.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
          <p className="text-gray-600 mt-1">{module.description}</p>
        </div>
        <AddVideoModal moduleId={module.id} onSuccess={fetchModule} />
      </div>

      {hasVideos ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={module.videos.map((v) => v.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.videos.map((video) => (
                <SortableVideo key={video.id} video={video} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Aucune vidéo dans ce module
            </h3>
            <p className="text-gray-500">
              Commencez par ajouter votre première vidéo pour ce module.
            </p>
            <div className="mt-6">
              <AddVideoModal moduleId={module.id} onSuccess={fetchModule} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
