"use client";

import { CourseCard } from "@/components/CourseCard";
import AddCourseModal from "@/components/AddCourseModal";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@prisma/client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function DashboardPage() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des cours");
      }
      const data = await response.json();
      return data.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  const hasCourses = courses && courses.length > 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Formations</h1>
        <div className="space-x-4">
          <AddCourseModal />
        </div>
      </div>

      {hasCourses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Aucune formation pour le moment
            </h3>
            <p className="text-gray-500">
              Commencez par créer votre première formation.
            </p>
            <div className="mt-6">
              <AddCourseModal />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
