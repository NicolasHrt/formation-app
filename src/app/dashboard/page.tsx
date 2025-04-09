import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/app/actions/courses";
import { Course } from "@prisma/client";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const result = await getCourses();

  if (!result.success) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{result.error}</p>
      </div>
    );
  }

  const courses = result.data as Course[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes formations</h1>
        <Button asChild className="text-white px-4 py-2 rounded-md">
          <Link href="/dashboard/courses/new">Créer une formation</Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Vous n&apos;avez pas encore créé de formation
          </p>
          <Link
            href="/dashboard/courses/new"
            className="text-blue-600 hover:text-blue-700"
          >
            Créer votre première formation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: Course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/dashboard/courses/${course.id}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Modifier
                </Link>
                <span className="text-sm text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
