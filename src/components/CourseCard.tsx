import { Course } from "@prisma/client";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {course.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Link
            href={`/dashboard/courses/${course.id}`}
            className="text-blue-600 hover:text-blue-700"
          >
            Gérer les modules
          </Link>
          <Link
            href={`/dashboard/courses/${course.id}/edit`}
            className="text-gray-600 hover:text-gray-700"
          >
            Modifier
          </Link>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(course.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
