import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder aux détails du cours" },
        { status: 401 }
      );
    }

    const { courseId } = params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    if (course.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à accéder à ce cours" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération du cours" },
      { status: 500 }
    );
  }
}
