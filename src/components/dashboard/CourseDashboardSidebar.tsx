import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Mail, BarChart2, Layout, Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface CourseDashboardSidebarProps {
  courseId: string;
  courseSlug: string;
}

export function CourseDashboardSidebar({
  courseId,
  courseSlug,
}: CourseDashboardSidebarProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Card className="w-64">
      <CardContent className="p-4 space-y-2">
        <Button
          variant={
            isActive(`/dashboard/courses/${courseId}`) ? "outline" : "ghost"
          }
          className="w-full justify-start"
          asChild
        >
          <Link href={`/dashboard/courses/${courseId}`}>
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
        <Button
          variant={
            isActive(`/dashboard/courses/${courseId}/modules`)
              ? "outline"
              : "ghost"
          }
          className="w-full justify-start"
          asChild
        >
          <Link href={`/dashboard/courses/${courseId}/modules`}>
            <BookOpen className="mr-2 h-4 w-4" />
            Modules
          </Link>
        </Button>
        <Button
          variant={
            isActive(`/landing-editor/${courseSlug}`) ? "outline" : "ghost"
          }
          className="w-full justify-start"
          asChild
        >
          <Link href={`/landing-editor/${courseSlug}`}>
            <Layout className="mr-2 h-4 w-4" />
            Landing page
          </Link>
        </Button>
        <Button
          variant={
            isActive(`/dashboard/courses/${courseId}/students`)
              ? "outline"
              : "ghost"
          }
          className="w-full justify-start"
          asChild
        >
          <Link href={`/dashboard/courses/${courseId}/students`}>
            <Users className="mr-2 h-4 w-4" />
            Étudiants
          </Link>
        </Button>
        <Button
          variant={
            isActive(`/dashboard/courses/${courseId}/emails`)
              ? "outline"
              : "ghost"
          }
          className="w-full justify-start"
          asChild
        >
          <Link href={`/dashboard/courses/${courseId}/emails`}>
            <Mail className="mr-2 h-4 w-4" />
            Emails
          </Link>
        </Button>
        <div className="pt-2 border-t border-gray-100">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href={`/courses/${courseSlug}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Prévisualiser la formation
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
