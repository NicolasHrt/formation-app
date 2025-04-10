import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder aux modules" },
        { status: 401 }
      );
    }

    const { courseId, moduleId } = await params;

    // Vérifier que l'utilisateur est bien l'auteur du cours
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    if (course.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à accéder à ce module" },
        { status: 403 }
      );
    }

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        videos: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!module) {
      return NextResponse.json({ error: "Module non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: module });
  } catch (error) {
    console.error("Erreur lors de la récupération du module:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération du module" },
      { status: 500 }
    );
  }
}
