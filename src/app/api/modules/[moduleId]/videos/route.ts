import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour ajouter une vidéo" },
        { status: 401 }
      );
    }

    const { moduleId } = await params;
    const { title, description, videoUrl } = await request.json();

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

    // Récupérer la dernière vidéo pour déterminer l'ordre
    const lastVideo = await prisma.video.findFirst({
      where: { moduleId },
      orderBy: { order: "desc" },
    });

    const newOrder = lastVideo ? lastVideo.order + 1 : 0;

    const video = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl,
        order: newOrder,
        moduleId,
      },
    });

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la vidéo:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'ajout de la vidéo" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { moduleId } = await params;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder aux vidéos" },
        { status: 401 }
      );
    }

    const videos = await prisma.video.findMany({
      where: {
        moduleId: moduleId,
        module: {
          course: {
            authorId: session.user.id,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    const response = NextResponse.json({ success: true, data: videos });

    // Ajout des en-têtes de cache
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );

    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
