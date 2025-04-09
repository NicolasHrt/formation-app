import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";
import AddModuleForm from "@/components/AddModuleForm";
import { Module } from "@prisma/client";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: {
          order: "asc",
        },
      },
      author: true,
    },
  });

  if (!course) {
    redirect("/dashboard");
  }

  if (course.author.email !== session.user.email) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {course.title}
        </h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Modules</h2>

        {course.modules.length === 0 ? (
          <p className="text-gray-600">Aucun module pour le moment</p>
        ) : (
          <div className="space-y-4">
            {course.modules.map((module: Module) => (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="aspect-video">
                  <iframe
                    src={module.videoUrl}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Ajouter un module
        </h2>
        <AddModuleForm courseId={course.id} />
      </div>
    </div>
  );
}
