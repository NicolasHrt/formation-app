"use client";

import { CourseCard } from "@/components/CourseCard";
import AddCourseModal from "@/components/AddCourseModal";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@prisma/client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";

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
    <div>
      {" "}
      <Navbar />
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
          <Card className="w-full">
            <CardHeader className="text-center pb-2">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <CardTitle className="text-xl">
                Aucune formation pour le moment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-500">
                Commencez par créer votre première formation.
              </p>
              <div className="pt-4">
                <AddCourseModal />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
