"use client";

import { useEffect, useState } from "react";
import { Module, Course, User } from "@prisma/client";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import AddModuleModal from "@/components/AddModuleModal";
import EditModuleModal from "@/components/EditModuleModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CourseWithModules extends Course {
  modules: (Module & {
    videos: {
      id: string;
      duration: number;
    }[];
  })[];
  author: User;
}

function ModuleCard({
  module,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  module: Module & {
    videos: {
      id: string;
      duration: number;
    }[];
  };
  onUpdate: (updatedModule: Module) => void;
  onDelete: (moduleId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculer les statistiques réelles
  const totalVideos = module.videos.length;
  const totalDuration = module.videos.reduce(
    (acc, video) => acc + (video.duration || 0),
    0
  );
  const publishedAt = new Date(module.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/courses/${module.courseId}/modules/${module.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      setOpen(false);
      onDelete(module.id);
    } catch (error) {
      console.error("Erreur lors de la suppression du module:", error);
      alert("Une erreur est survenue lors de la suppression du module");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 relative group overflow-hidden">
      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
        <EditModuleModal
          module={module}
          onSuccess={(updatedModule) => onUpdate(updatedModule)}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-500 hover:bg-red-50"
              title="Supprimer le module"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer le module</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer ce module ? Cette action est
                irréversible et supprimera également toutes les vidéos
                associées.
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

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            Module {module.order}
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">{totalVideos} vidéos</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
          {module.title}
        </h3>
        <p className="text-gray-600 line-clamp-2 mb-6">{module.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">
              Durée totale
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {Math.round(totalDuration / 60)} min
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">
              Taux de complétion
            </div>
            <div className="text-lg font-semibold text-gray-900">0%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">Vidéos</div>
            <div className="text-lg font-semibold text-gray-900">
              {totalVideos}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Mis en ligne le {publishedAt}
          </div>
          <Button
            variant="black"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/dashboard/courses/${module.courseId}/modules/${module.id}`;
            }}
          >
            Gérer les vidéos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ModulesPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<CourseWithModules | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${resolvedParams.courseId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      // Récupérer les vidéos pour chaque module
      const modulesWithVideos = await Promise.all(
        data.data.modules.map(async (module: Module) => {
          const videosResponse = await fetch(
            `/api/modules/${module.id}/videos`
          );
          const videosData = await videosResponse.json();
          return {
            ...module,
            videos: videosData.data || [],
          };
        })
      );

      setCourse({
        ...data.data,
        modules: modulesWithVideos,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [resolvedParams.courseId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!course) {
    return <div>Formation non trouvée</div>;
  }

  const hasModules = course.modules.length > 0;

  return (
    <div className="space-y-8 container px-4 mx-auto py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Mes formations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/courses/${course.id}`}>
              {course.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Modules</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Modules</h1>
            <p className="text-gray-500 mt-1">
              Gérez les modules de votre formation
            </p>
          </div>
          <AddModuleModal courseId={course.id} onSuccess={fetchCourse} />
        </div>

        {hasModules ? (
          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                onUpdate={(updatedModule) => {
                  setCourse((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      modules: prev.modules.map((m) =>
                        m.id === updatedModule.id
                          ? { ...updatedModule, videos: m.videos }
                          : m
                      ),
                    };
                  });
                }}
                onDelete={async (moduleId) => {
                  try {
                    const response = await fetch(
                      `/api/courses/${course.id}/modules/${moduleId}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (!response.ok) {
                      const data = await response.json();
                      throw new Error(data.error || "Une erreur est survenue");
                    }

                    fetchCourse();
                  } catch (error) {
                    console.error(
                      "Erreur lors de la suppression du module:",
                      error
                    );
                    alert(
                      "Une erreur est survenue lors de la suppression du module"
                    );
                  }
                }}
                onMoveUp={() => {
                  if (index > 0) {
                    const newModules = [...course.modules];
                    const [movedModule] = newModules.splice(index, 1);
                    newModules.splice(index - 1, 0, movedModule);
                    setCourse({ ...course, modules: newModules });

                    fetch(`/api/courses/${course.id}/modules/reorder`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        modules: newModules.map((module, index) => ({
                          id: module.id,
                          order: index,
                        })),
                      }),
                    }).catch((error) => {
                      console.error("Erreur lors du réordonnancement:", error);
                      fetchCourse();
                    });
                  }
                }}
                onMoveDown={() => {
                  if (index < course.modules.length - 1) {
                    const newModules = [...course.modules];
                    const [movedModule] = newModules.splice(index, 1);
                    newModules.splice(index + 1, 0, movedModule);
                    setCourse({ ...course, modules: newModules });

                    fetch(`/api/courses/${course.id}/modules/reorder`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        modules: newModules.map((module, index) => ({
                          id: module.id,
                          order: index,
                        })),
                      }),
                    }).catch((error) => {
                      console.error("Erreur lors du réordonnancement:", error);
                      fetchCourse();
                    });
                  }
                }}
                isFirst={index === 0}
                isLast={index === course.modules.length - 1}
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Aucun module dans cette formation
              </h3>
              <p className="text-gray-500">
                Commencez par ajouter votre premier module à cette formation.
              </p>
              <div className="mt-6">
                <AddModuleModal courseId={course.id} onSuccess={fetchCourse} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
