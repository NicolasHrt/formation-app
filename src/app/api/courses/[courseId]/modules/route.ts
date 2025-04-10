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

    const modules = await prisma.module.findMany({
      where: {
        courseId: params.courseId,
        course: {
          authorId: session.user.id,
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    const response = NextResponse.json({ success: true, data: modules });

    // Ajout des en-têtes de cache
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );

    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des modules:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour ajouter un module" },
        { status: 401 }
      );
    }

    const { courseId } = await params;
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Le titre et la description sont requis" },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est bien l'auteur du cours
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: {
            order: "desc",
          },
          take: 1,
        },
      },
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

    const lastOrder = course.modules.length > 0 ? course.modules[0].order : 0;
    const newOrder = lastOrder + 1;

    const module = await prisma.module.create({
      data: {
        title,
        description,
        order: newOrder,
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
