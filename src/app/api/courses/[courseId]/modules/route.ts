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
        { error: "Vous devez être connecté pour accéder aux modules" },
        { status: 401 }
      );
    }

    const { courseId } = params;

    // Vérifier que l'utilisateur est bien l'auteur du cours
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
        { error: "Vous n'êtes pas autorisé à accéder aux modules de ce cours" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: course.modules });
  } catch (error) {
    console.error("Erreur lors de la récupération des modules:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des modules" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour ajouter un module" },
        { status: 401 }
      );
    }

    const { courseId } = params;
    const { title, description, order } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Le titre et la description sont requis" },
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
        { error: "Vous n'êtes pas autorisé à ajouter un module à ce cours" },
        { status: 403 }
      );
    }

    const module = await prisma.module.create({
      data: {
        title,
        description,
        order: order || 1,
        courseId,
      },
    });

    return NextResponse.json({ success: true, data: module });
  } catch (error) {
    console.error("Erreur lors de l'ajout du module:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'ajout du module" },
      { status: 500 }
    );
  }
}
