import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { deleteAllVideosFromModule } from "@/lib/s3";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder aux formations" },
        { status: 401 }
      );
    }

    const { courseId } = await params;

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
      return NextResponse.json(
        { error: "Formation non trouvée" },
        { status: 404 }
      );
    }

    if (course.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à accéder à cette formation" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Erreur lors de la récupération de la formation:", error);
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de la récupération de la formation",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour modifier une formation" },
        { status: 401 }
      );
    }

    const { courseId } = await params;
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Le titre est requis" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Formation non trouvée" },
        { status: 404 }
      );
    }

    if (course.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à modifier cette formation" },
        { status: 403 }
      );
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la formation:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la mise à jour de la formation",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour supprimer une formation" },
        { status: 401 }
      );
    }

    const { courseId } = await params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Formation non trouvée" },
        { status: 404 }
      );
    }

    if (course.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à supprimer cette formation" },
        { status: 403 }
      );
    }

    // Supprimer toutes les vidéos des modules
    await Promise.all(
      course.modules.map((module) => deleteAllVideosFromModule(module.id))
    );

    // Supprimer la formation (cela supprimera aussi les modules grâce à onDelete: Cascade)
    await prisma.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la formation:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la suppression de la formation",
      },
      { status: 500 }
    );
  }
}
