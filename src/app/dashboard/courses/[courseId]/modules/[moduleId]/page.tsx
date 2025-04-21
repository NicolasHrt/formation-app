"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Module, Video } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";

interface ModuleWithVideos extends Module {
  videos: Video[];
  course: {
    title: string;
    id: string;
  };
}

function VideoCard({
  video,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  video: Video;
  onUpdate: (updatedVideo: Video) => void;
  onDelete: (videoId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

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
      onDelete(video.id);
    } catch (error) {
      console.error("Erreur lors de la suppression de la vidéo:", error);
      alert("Une erreur est survenue lors de la suppression de la vidéo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="relative group overflow-hidden">
      <div className="absolute top-3 right-3 flex items-center gap-2 transition-opacity">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveUp}
            disabled={isFirst}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveDown}
            disabled={isLast}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <EditVideoModal
          video={video}
          onSuccess={(updatedVideo: Video) => onUpdate(updatedVideo)}
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

      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full flex items-center gap-2">
            <span className="text-primary/70">Vidéo</span>
            <span>{video.order + 1}</span>
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            {video.duration ? Math.round(video.duration / 60) : 0} min
          </span>
        </div>

        <CardTitle className="text-xl line-clamp-2 mb-6">
          {video.title}
        </CardTitle>

        <CardFooter className="flex justify-between items-center pt-4 pb-0 border-t border-gray-100 px-0">
          <div className="text-sm text-gray-500">
            Mis en ligne le{" "}
            {new Date(video.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
          >
            Prévisualiser
          </Button>
        </CardFooter>
      </CardContent>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
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
          {video.description && (
            <div className="prose max-w-none mt-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: video.description,
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default function VideosPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const resolvedParams = use(params);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [module, setModule] = useState<ModuleWithVideos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: moduleData, isLoading } = useQuery({
    queryKey: ["module", resolvedParams.moduleId],
    queryFn: async () => {
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

      return {
        ...data.data,
        course: {
          title: courseData.data.title,
          id: courseData.data.id,
        },
      };
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (videoId: string) => {
      const response = await fetch(
        `/api/modules/${resolvedParams.moduleId}/videos/${videoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }
    },
    onSuccess: () => {
      // Invalider et recharger les données du module
      queryClient.invalidateQueries({
        queryKey: ["module", resolvedParams.moduleId],
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de la vidéo:", error);
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  useEffect(() => {
    if (moduleData) {
      setModule(moduleData);
      setLoading(false);
    }
  }, [moduleData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!module) {
    return <div>Module non trouvé</div>;
  }

  const hasVideos = module.videos.length > 0;
  const totalDuration = module.videos.reduce(
    (acc, video) => acc + (video.duration || 0),
    0
  );

  return (
    <div>
      <Navbar />
      <div className="space-y-8 container px-4 mx-auto py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/courses">
                Mes formations
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/courses/${module.course.id}`}>
                {module.course.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/courses/${module.course.id}/modules`}
              >
                Modules
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{module.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{module.title}</CardTitle>
              <CardDescription className="mt-1">
                {module.videos.length} vidéos • {Math.round(totalDuration / 60)}{" "}
                min au total
              </CardDescription>
            </div>
            <AddVideoModal
              moduleId={module.id}
              onSuccess={() => window.location.reload()}
            />
          </CardHeader>
        </Card>

        {hasVideos ? (
          <div className="space-y-4">
            {module.videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                onUpdate={(updatedVideo: Video) => {
                  setModule((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      videos: prev.videos.map((v) =>
                        v.id === updatedVideo.id ? updatedVideo : v
                      ),
                    };
                  });
                }}
                onDelete={async (videoId) => {
                  try {
                    setModule((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        videos: prev.videos.filter((v) => v.id !== videoId),
                      };
                    });

                    const response = await fetch(
                      `/api/modules/${module.id}/videos/${videoId}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (!response.ok) {
                      window.location.reload();
                    }
                  } catch (error) {
                    console.error(
                      "Erreur lors de la suppression de la vidéo:",
                      error
                    );
                    window.location.reload();
                  }
                }}
                onMoveUp={() => {
                  if (index > 0) {
                    const newVideos = [...module.videos];
                    const [movedVideo] = newVideos.splice(index, 1);
                    newVideos.splice(index - 1, 0, movedVideo);

                    // Mettre à jour l'ordre de toutes les vidéos
                    const updatedVideos = newVideos.map((video, newIndex) => ({
                      ...video,
                      order: newIndex,
                    }));

                    setModule({ ...module, videos: updatedVideos });

                    fetch(`/api/modules/${module.id}/videos/reorder`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        videos: updatedVideos.map((video) => ({
                          id: video.id,
                          order: video.order,
                        })),
                      }),
                    }).catch((error) => {
                      console.error("Erreur lors du réordonnancement:", error);
                      queryClient.invalidateQueries({
                        queryKey: ["module", resolvedParams.moduleId],
                      });
                    });
                  }
                }}
                onMoveDown={() => {
                  if (index < module.videos.length - 1) {
                    const newVideos = [...module.videos];
                    const [movedVideo] = newVideos.splice(index, 1);
                    newVideos.splice(index + 1, 0, movedVideo);

                    // Mettre à jour l'ordre de toutes les vidéos
                    const updatedVideos = newVideos.map((video, newIndex) => ({
                      ...video,
                      order: newIndex,
                    }));

                    setModule({ ...module, videos: updatedVideos });

                    fetch(`/api/modules/${module.id}/videos/reorder`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        videos: updatedVideos.map((video) => ({
                          id: video.id,
                          order: video.order,
                        })),
                      }),
                    }).catch((error) => {
                      console.error("Erreur lors du réordonnancement:", error);
                      queryClient.invalidateQueries({
                        queryKey: ["module", resolvedParams.moduleId],
                      });
                    });
                  }
                }}
                isFirst={index === 0}
                isLast={index === module.videos.length - 1}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
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
                <CardTitle className="text-lg">
                  Aucune vidéo dans ce module
                </CardTitle>
                <CardDescription>
                  Commencez par ajouter votre première vidéo à ce module.
                </CardDescription>
                <div className="mt-6">
                  <AddVideoModal
                    moduleId={module.id}
                    onSuccess={() => window.location.reload()}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
