import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ moduleId: string; videoId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour modifier une vidéo" },
        { status: 401 }
      );
    }

    const { moduleId, videoId } = await params;
    const { title, description } = await request.json();

    // Vérifier que l'utilisateur est bien l'auteur du module
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: true,
      },
    });

    if (!module) {
      return NextResponse.json({ error: "Module non trouvé" }, { status: 404 });
    }

    if (module.course.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à modifier cette vidéo" },
        { status: 403 }
      );
    }

    const video = await prisma.video.update({
      where: { id: videoId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la vidéo:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de la vidéo" },
      { status: 500 }
    );
  }
}
