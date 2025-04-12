"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddModuleModal from "@/components/AddModuleModal";
import EditModuleModal from "@/components/EditModuleModal";
import { Module, Course, User } from "@prisma/client";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, ChevronUp, ChevronDown } from "lucide-react";
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
  modules: Module[];
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
  module: Module;
  onUpdate: (updatedModule: Module) => void;
  onDelete: (moduleId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow relative">
      <div className="absolute top-2 right-2 flex gap-2">
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
      <div className="flex flex-col space-y-4">
        <div className="pr-24">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {module.title}
          </h3>
          <p className="text-gray-600 mt-1 line-clamp-2">
            {module.description}
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
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

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<CourseWithModules | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }
        if (response.status === 403 || response.status === 404) {
          router.push("/dashboard");
          return;
        }
        throw new Error(data.error || "Une erreur est survenue");
      }

      const modulesResponse = await fetch(`/api/courses/${courseId}/modules`);
      const modulesData = await modulesResponse.json();

      if (!modulesResponse.ok) {
        throw new Error(modulesData.error || "Une erreur est survenue");
      }

      setCourse({
        ...data.data,
        modules: modulesData.data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleModuleUpdate = (updatedModule: Module) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === updatedModule.id ? updatedModule : m
      ),
    });
  };

  const handleModuleDelete = (moduleId: string) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.filter((m) => m.id !== moduleId),
    });
  };

  const moveModule = async (fromIndex: number, toIndex: number) => {
    if (!course) return;

    const newModules = [...course.modules];
    const [movedModule] = newModules.splice(fromIndex, 1);
    newModules.splice(toIndex, 0, movedModule);

    setCourse({ ...course, modules: newModules });

    try {
      await fetch(`/api/courses/${courseId}/modules/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modules: newModules.map((module, index) => ({
            id: module.id,
            order: index + 1,
          })),
        }),
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'ordre:", err);
      fetchCourse();
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId, router]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error || !course) {
    return <div>Erreur: {error}</div>;
  }

  const hasModules = Array.isArray(course.modules) && course.modules.length > 0;

  return (
    <div className="space-y-8 container mx-auto px-4 pt-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Mes formations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{course.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {course.title}
        </h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Modules</h2>
          <AddModuleModal courseId={course.id} onSuccess={fetchCourse} />
        </div>

        {!hasModules ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600">Aucun module pour le moment</p>
            <p className="text-gray-500 mt-2">
              Commencez par ajouter un module à votre cours
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                onUpdate={handleModuleUpdate}
                onDelete={handleModuleDelete}
                onMoveUp={() => moveModule(index, index - 1)}
                onMoveDown={() => moveModule(index, index + 1)}
                isFirst={index === 0}
                isLast={index === course.modules.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
