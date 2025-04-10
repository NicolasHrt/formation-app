import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour uploader une vidéo" },
        { status: 401 }
      );
    }

    const { moduleId } = await params;
    const { fileName, fileType } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Le nom et le type du fichier sont requis" },
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
        {
          error: "Vous n'êtes pas autorisé à uploader une vidéo dans ce module",
        },
        { status: 403 }
      );
    }

    // Générer un nom de fichier unique
    const fileExtension = fileName.split(".").pop();
    const uniqueFileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExtension}`;
    const key = `videos/${moduleId}/${uniqueFileName}`;

    // Créer une URL signée pour l'upload
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    // Créer une entrée vidéo en attente
    const video = await prisma.video.create({
      data: {
        title: fileName,
        description: "",
        videoUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
        order: 0,
        moduleId,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        video,
        uploadUrl: signedUrl,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'upload de la vidéo:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'upload de la vidéo" },
      { status: 500 }
    );
  }
}
