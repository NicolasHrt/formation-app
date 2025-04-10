import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour réorganiser les modules" },
        { status: 401 }
      );
    }

    const { courseId } = await params;
    const { modules } = await request.json();

    if (!Array.isArray(modules)) {
      return NextResponse.json(
        { error: "Format de données invalide" },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est bien l'auteur du cours
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    if (course.authorId !== session.user.id) {
      return NextResponse.json(
        {
          error:
            "Vous n'êtes pas autorisé à réorganiser les modules de ce cours",
        },
        { status: 403 }
      );
    }

    // Mettre à jour l'ordre de chaque module
    await Promise.all(
      modules.map(({ id, order }) =>
        prisma.module.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors du réordonnancement des modules:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du réordonnancement des modules" },
      { status: 500 }
    );
  }
}
