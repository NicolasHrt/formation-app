import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ moduleId: string; videoId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour supprimer une vidéo" },
        { status: 401 }
      );
    }

    const { moduleId, videoId } = await params;

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
        { error: "Vous n'êtes pas autorisé à supprimer cette vidéo" },
        { status: 403 }
      );
    }

    // Récupérer la vidéo pour obtenir son URL
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return NextResponse.json({ error: "Vidéo non trouvée" }, { status: 404 });
    }

    // Extraire la clé S3 de l'URL
    const url = new URL(video.videoUrl);
    const key = url.pathname.substring(1); // Supprimer le premier slash

    // Supprimer le fichier sur S3
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    await s3Client.send(deleteCommand);

    // Supprimer la vidéo de la base de données
    await prisma.video.delete({
      where: { id: videoId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la vidéo:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de la vidéo" },
      { status: 500 }
    );
  }
}
