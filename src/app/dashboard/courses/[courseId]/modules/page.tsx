"use client";

import { useEffect, useState } from "react";
import { Module, Course, User } from "@prisma/client";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, ChevronUp, ChevronDown, Eye } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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
  index,
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
  index: number;
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

  return (
    <Card className="relative group overflow-hidden">
      <div className="absolute top-3 right-3 flex items-center gap-2  transition-opacity">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveUp}
            disabled={isFirst}
            className="disabled:opacity-50"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveDown}
            disabled={isLast}
            className=" disabled:opacity-50"
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
                irréversible.
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
                onClick={() => {
                  setIsDeleting(true);
                  onDelete(module.id);
                  setOpen(false);
                }}
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
            <span className="">Module</span>
            <span>{index + 1}</span>
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {totalVideos} vidéos
          </span>
        </div>

        <CardTitle className="text-xl text-foreground line-clamp-2 mb-2">
          {module.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mb-6 text-muted-foreground">
          {module.description}
        </CardDescription>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">
                Durée totale
              </div>
              <div className="text-lg font-semibold text-foreground">
                {Math.round(totalDuration / 60)} min
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">
                Taux de complétion
              </div>
              <div className="text-lg font-semibold text-foreground">0%</div>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">
                Vidéos
              </div>
              <div className="text-lg font-semibold text-foreground">
                {totalVideos}
              </div>
            </CardContent>
          </Card>
        </div>

        <CardFooter className="flex justify-between items-center pt-4 pb-0 border-t border-border px-0">
          <div className="text-sm text-muted-foreground">
            Mis en ligne le {publishedAt}
          </div>
          <Link
            href={`/dashboard/courses/${module.courseId}/modules/${module.id}`}
          >
            <Button variant="outline">Gérer les vidéos</Button>
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
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
        data.data.modules
          .sort((a: Module, b: Module) => a.order - b.order)
          .map(async (module: Module) => {
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
              <h1 className="text-2xl font-bold text-foreground">Modules</h1>
              <p className="mt-1 text-muted-foreground">
                Gérez les modules de votre formation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/courses/${course.slug}`} target="_blank">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Prévisualiser la formation
                </Button>
              </Link>
              <AddModuleModal courseId={course.id} onSuccess={fetchCourse} />
            </div>
          </div>

          {hasModules ? (
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
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
                    // Mise à jour immédiate de l'interface
                    setCourse((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        modules: prev.modules.filter((m) => m.id !== moduleId),
                      };
                    });

                    // Appel API en arrière-plan
                    fetch(`/api/courses/${course.id}/modules/${moduleId}`, {
                      method: "DELETE",
                    }).catch((error) => {
                      console.error(
                        "Erreur lors de la suppression du module:",
                        error
                      );
                    });
                  }}
                  onMoveUp={() => {
                    if (index > 0) {
                      const newModules = [...course.modules];
                      const [movedModule] = newModules.splice(index, 1);
                      newModules.splice(index - 1, 0, movedModule);

                      // Mettre à jour l'ordre de tous les modules
                      const updatedModules = newModules.map(
                        (module, newIndex) => ({
                          ...module,
                          order: newIndex,
                        })
                      );

                      setCourse({ ...course, modules: updatedModules });

                      fetch(`/api/courses/${course.id}/modules/reorder`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          modules: updatedModules.map((module) => ({
                            id: module.id,
                            order: module.order,
                          })),
                        }),
                      }).catch((error) => {
                        console.error(
                          "Erreur lors du réordonnancement:",
                          error
                        );
                        fetchCourse();
                      });
                    }
                  }}
                  onMoveDown={() => {
                    if (index < course.modules.length - 1) {
                      const newModules = [...course.modules];
                      const [movedModule] = newModules.splice(index, 1);
                      newModules.splice(index + 1, 0, movedModule);

                      // Mettre à jour l'ordre de tous les modules
                      const updatedModules = newModules.map(
                        (module, newIndex) => ({
                          ...module,
                          order: newIndex,
                        })
                      );

                      setCourse({ ...course, modules: updatedModules });

                      fetch(`/api/courses/${course.id}/modules/reorder`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          modules: updatedModules.map((module) => ({
                            id: module.id,
                            order: module.order,
                          })),
                        }),
                      }).catch((error) => {
                        console.error(
                          "Erreur lors du réordonnancement:",
                          error
                        );
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-lg">
                    Aucun module dans cette formation
                  </CardTitle>
                  <CardDescription>
                    Commencez par ajouter votre premier module à cette
                    formation.
                  </CardDescription>
                  <div className="mt-6">
                    <AddModuleModal
                      courseId={course.id}
                      onSuccess={() => window.location.reload()}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
