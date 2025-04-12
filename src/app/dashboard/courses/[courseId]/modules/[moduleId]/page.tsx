"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Module, Video } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Trash2,
  Pencil,
  ChevronUp,
  ChevronDown,
  Play,
} from "lucide-react";
import AddVideoModal from "@/components/AddVideoModal";
import EditVideoModal from "@/components/EditVideoModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface ModuleWithVideos extends Module {
  videos: Video[];
  course: {
    title: string;
  };
}

function VideoItem({
  video,
  onReorder,
  isFirst,
  isLast,
}: {
  video: Video;
  onReorder: (direction: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression de la vidéo:", error);
      alert("Une erreur est survenue lors de la suppression de la vidéo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow relative">
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onReorder("up")}
            disabled={isFirst}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onReorder("down")}
            disabled={isLast}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <EditVideoModal
          video={video}
          onSuccess={() => window.location.reload()}
        />
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

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVideoModalOpen(true)}
          className="flex-shrink-0"
        >
          <Play className="h-8 w-8" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{video.description}</p>
        </div>
      </div>

      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{video.title}</DialogTitle>
          </DialogHeader>
          <div className="relative pt-[56.25%]">
            <video
              src={video.videoUrl}
              controls
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
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

      const courseResponse = await fetch(
        `/api/courses/${resolvedParams.courseId}`
      );
      const courseData = await courseResponse.json();

      if (!courseResponse.ok) {
        throw new Error(courseData.error || "Une erreur est survenue");
      }

      setModule({
        ...data.data,
        course: {
          title: courseData.data.title,
        },
      });
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

  const moveVideo = async (fromIndex: number, toIndex: number) => {
    if (!module) return;

    const newVideos = [...module.videos];
    const [movedVideo] = newVideos.splice(fromIndex, 1);
    newVideos.splice(toIndex, 0, movedVideo);

    setModule({ ...module, videos: newVideos });

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
      fetchModule();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !module) {
    return <div>Erreur: {error}</div>;
  }

  const hasVideos = module.videos.length > 0;

  return (
    <div className="space-y-8 container px-4 mx-auto pt-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Mes formations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/dashboard/courses/${resolvedParams.courseId}`}
            >
              {module?.course?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{module?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6 ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 mt-1">{module.description}</p>
          </div>
          <AddVideoModal moduleId={module.id} onSuccess={fetchModule} />
        </div>

        {hasVideos ? (
          <div className="space-y-4">
            {module.videos.map((video, index) => (
              <VideoItem
                key={video.id}
                video={video}
                onReorder={(direction) => {
                  if (direction === "up" && index > 0) {
                    moveVideo(index, index - 1);
                  } else if (
                    direction === "down" &&
                    index < module.videos.length - 1
                  ) {
                    moveVideo(index, index + 1);
                  }
                }}
                isFirst={index === 0}
                isLast={index === module.videos.length - 1}
              />
            ))}
          </div>
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
    </div>
  );
}
