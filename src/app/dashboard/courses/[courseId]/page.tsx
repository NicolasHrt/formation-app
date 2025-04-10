"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import AddModuleModal from "@/components/AddModuleModal";
import { Module, Course, User } from "@prisma/client";
import { use } from "react";
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
import { GripVertical } from "lucide-react";

interface CourseWithModules extends Course {
  modules: Module[];
  author: User;
}

function SortableModule({ module }: { module: Module }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

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
      <div className="flex flex-col gap-4">
        <div className="flex-1 pr-8">
          <h3 className="text-lg font-semibold text-gray-900">
            {module.title}
          </h3>
          <p className="text-gray-600 mt-1">{module.description}</p>
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex =
        course?.modules.findIndex((m) => m.id === active.id) ?? 0;
      const newIndex = course?.modules.findIndex((m) => m.id === over.id) ?? 0;

      if (course) {
        const newModules = arrayMove(course.modules, oldIndex, newIndex);
        setCourse({ ...course, modules: newModules });

        // Mettre à jour l'ordre dans la base de données
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
          // Recharger les modules en cas d'erreur
          fetchCourse();
        }
      }
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
    <div className="space-y-8">
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={course.modules.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.modules.map((module) => (
                  <SortableModule key={module.id} module={module} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
