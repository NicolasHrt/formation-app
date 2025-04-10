"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Video, Module } from "@prisma/client";
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
import { Plus, GripVertical } from "lucide-react";
import AddVideoModal from "@/components/AddVideoModal";

interface ModuleWithVideos extends Module {
  videos: Video[];
}

function SortableVideo({ video }: { video: Video }) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 cursor-move p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-8">
          <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
          <p className="text-gray-600 mt-1">{video.description}</p>
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Voir la vidéo
          </a>
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <p className="text-gray-600 mt-2">{module.description}</p>
        </div>
        <AddVideoModal moduleId={module.id} onSuccess={fetchModule} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={module.videos.map((v) => v.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {module.videos.map((video) => (
              <SortableVideo key={video.id} video={video} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
