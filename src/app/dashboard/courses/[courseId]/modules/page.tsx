"use client";

import { useEffect, useState } from "react";
import { Module, Course } from "@prisma/client";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
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

interface CourseWithModules extends Course {
  modules: Module[];
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
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 relative">
      <div className="absolute top-2 right-2 flex items-center gap-2">
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
        <div>
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

      setCourse(data.data);
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
    <div className="space-y-8 container px-4 mx-auto pt-8">
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

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Modules</h1>
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
                      m.id === updatedModule.id ? updatedModule : m
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
              onMoveUp={async () => {
                if (index > 0) {
                  try {
                    const response = await fetch(
                      `/api/courses/${course.id}/modules/${module.id}/reorder`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          newOrder: index - 1,
                        }),
                      }
                    );

                    if (!response.ok) {
                      const data = await response.json();
                      throw new Error(data.error || "Une erreur est survenue");
                    }

                    fetchCourse();
                  } catch (error) {
                    console.error(
                      "Erreur lors du déplacement du module:",
                      error
                    );
                    alert(
                      "Une erreur est survenue lors du déplacement du module"
                    );
                  }
                }
              }}
              onMoveDown={async () => {
                if (index < course.modules.length - 1) {
                  try {
                    const response = await fetch(
                      `/api/courses/${course.id}/modules/${module.id}/reorder`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          newOrder: index + 1,
                        }),
                      }
                    );

                    if (!response.ok) {
                      const data = await response.json();
                      throw new Error(data.error || "Une erreur est survenue");
                    }

                    fetchCourse();
                  } catch (error) {
                    console.error(
                      "Erreur lors du déplacement du module:",
                      error
                    );
                    alert(
                      "Une erreur est survenue lors du déplacement du module"
                    );
                  }
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
  );
}
