import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour ajouter une vidéo" },
        { status: 401 }
      );
    }

    const { moduleId } = params;
    const { title, description, videoUrl, order } = await request.json();

    if (!title || !description || !videoUrl) {
      return NextResponse.json(
        { error: "Le titre, la description et l'URL de la vidéo sont requis" },
        { status: 400 }
      );
    }

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
        { error: "Vous n'êtes pas autorisé à ajouter une vidéo à ce module" },
        { status: 403 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl,
        order: order || 1,
        moduleId,
      },
    });

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la vidéo:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
