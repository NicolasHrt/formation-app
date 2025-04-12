"use client";

import { CourseCard } from "@/components/CourseCard";
import AddCourseModal from "@/components/AddCourseModal";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@prisma/client";

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
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Formations</h1>
        <div className="space-x-4">
          <AddCourseModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses?.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
