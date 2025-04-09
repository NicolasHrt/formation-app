"use client";

import { useCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Formations</h1>
        <Link href="/dashboard/courses/new">
          <Button>Créer une formation</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
