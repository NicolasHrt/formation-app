import { Course } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pen, StickyNote } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl line-clamp-1">
            {course.title}
          </CardTitle>
          <span className="text-sm text-gray-500 font-medium">
            {new Date(course.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
        <div className="flex justify-between w-full gap-3">
          <div className="flex gap-3">
            <Link href={`/dashboard/courses/${course.id}`}>
              <Button>
                <Pen className="mr-2 h-4 w-4" />
                Gérer la formation
              </Button>
            </Link>
            <Link href={`/dashboard/courses/${course.id}`}>
              <Button variant="black">
                <StickyNote className="mr-2 h-4 w-4" />
                Personnaliser la landing page
              </Button>
            </Link>
          </div>
          <Link href={`/courses/${course.slug}`} target="_blank">
            <Button variant="outline">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
