"use client";

import { Course } from "@prisma/client";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import AddCourseModal from "@/components/AddCourseModal";
import { useCourses } from "@/hooks/useCourses";

export default function DashboardPage() {
  const { data: courses, isLoading, error } = useCourses();

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
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
