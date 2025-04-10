"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import AddModuleModal from "@/components/AddModuleModal";
import { Module, Course, User } from "@prisma/client";
import { use } from "react";

interface CourseWithModules extends Course {
  modules: Module[];
  author: User;
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

  useEffect(() => {
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
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

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
          <AddModuleModal courseId={course.id} />
        </div>

        {!hasModules ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600">Aucun module pour le moment</p>
            <p className="text-gray-500 mt-2">
              Commencez par ajouter un module à votre cours
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {course.modules.map((module: Module) => (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
