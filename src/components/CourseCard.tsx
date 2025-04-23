import { Course } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pen, StickyNote, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Badge className="mb-2">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(course.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Badge>
            <CardTitle className="text-2xl font-bold line-clamp-1 text-foreground">
              {course.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row w-full gap-3">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href={`/dashboard/courses/${course.id}`}
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90">
                <Pen className="mr-2 h-4 w-4" />
                Gérer la formation
              </Button>
            </Link>
            <Link
              href={`/dashboard/courses/${course.id}`}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                <StickyNote className="mr-2 h-4 w-4" />
                Landing page
              </Button>
            </Link>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            target="_blank"
            className="sm:ml-auto"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto hover:bg-primary hover:text-white transition-colors"
              title="Prévisualiser la formation"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
