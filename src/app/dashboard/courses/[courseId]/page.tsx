"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditCourseModal from "@/components/EditCourseModal";
import { Course, Module, User } from "@prisma/client";
import { use } from "react";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Loader2,
  BarChart2,
  Users,
  Mail,
  BookOpen,
  Eye,
  Layout,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CourseWithModules extends Course {
  modules: Module[];
  author: User;
}

function CourseSidebar({
  courseId,
  courseSlug,
}: {
  courseId: string;
  courseSlug: string;
}) {
  return (
    <Card className="w-64">
      <CardContent className="p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href={`/dashboard/courses/${courseId}/modules`}>
            <BookOpen className="mr-2 h-4 w-4" />
            Modules
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href={`/dashboard/courses/${courseId}/students`}>
            <Users className="mr-2 h-4 w-4" />
            Étudiants
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href={`/dashboard/courses/${courseId}/emails`}>
            <Mail className="mr-2 h-4 w-4" />
            Emails
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href={`/dashboard/courses/${courseId}/analytics`}>
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href={`/dashboard/landing-editor?courseId=${courseId}`}>
            <Layout className="mr-2 h-4 w-4" />
            Landing page
          </a>
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

function CourseStats({ course }: { course: CourseWithModules }) {
  // Données mockées pour l'exemple
  const salesData = [
    { date: "2024-01", sales: 12 },
    { date: "2024-02", sales: 19 },
    { date: "2024-03", sales: 15 },
    { date: "2024-04", sales: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventes totales
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">
              +20% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 700€</div>
            <p className="text-xs text-muted-foreground">
              +15% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux de complétion
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              +5% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution des ventes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<CourseWithModules | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${resolvedParams.courseId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setCourse(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [resolvedParams.courseId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/courses/${resolvedParams.courseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.refetchQueries({ queryKey: ["courses"] });
      router.push("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la suppression de la formation:", error);
      alert("Une erreur est survenue lors de la suppression de la formation");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!course) {
    return <div>Formation non trouvée</div>;
  }

  return (
    <div className="space-y-8 container px-4 mx-auto py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Mes formations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{course.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{course.title}</CardTitle>
              <p className="text-gray-600 mt-1">{course.description}</p>
            </div>
            <div className="flex gap-2">
              <EditCourseModal course={course} onSuccess={fetchCourse} />
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-500 hover:bg-red-50"
                    title="Supprimer la formation"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Supprimer la formation</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer la formation{" "}
                      <span className="font-semibold text-gray-900">
                        {course.title}
                      </span>
                      ? Cette action est irréversible et supprimera également
                      tous les modules et vidéos associés.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Tapez le nom de la formation pour confirmer
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        value={confirmationTitle}
                        onChange={(e) => setConfirmationTitle(e.target.value)}
                        placeholder="Nom de la formation"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Tapez "supprimer définitivement" pour confirmer
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        placeholder="supprimer définitivement"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOpen(false);
                          setConfirmationTitle("");
                          setConfirmationText("");
                        }}
                        disabled={isDeleting}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={
                          isDeleting ||
                          confirmationTitle !== course.title ||
                          confirmationText !== "supprimer définitivement"
                        }
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Suppression...
                          </>
                        ) : (
                          "Supprimer définitivement"
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        <div className="flex gap-6">
          <CourseSidebar courseId={course.id} courseSlug={course.slug} />
          <div className="flex-1">
            <CourseStats course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}
