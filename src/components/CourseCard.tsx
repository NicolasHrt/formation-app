import { Course } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1 line-clamp-1">
              {course.title}
            </h2>
            <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500 font-medium">
              {new Date(course.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3">
            <Link href={`/dashboard/courses/${course.id}`}>
              <Button variant="default">Gérer les modules</Button>
            </Link>
            <Link href={`/courses/${course.id}`} target="_blank">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Prévisualiser
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
