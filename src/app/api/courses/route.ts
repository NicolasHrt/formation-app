import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder aux formations" },
        { status: 401 }
      );
    }

    const courses = await prisma.course.findMany({
      where: {
        authorId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = NextResponse.json({ success: true, data: courses });

    // Ajout des en-têtes de cache
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );

    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des cours:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour créer une formation" },
        { status: 401 }
      );
    }

    const { title, description, slug } = await request.json();

    if (!title || !description || !slug) {
      return NextResponse.json(
        { error: "Le titre, la description et le slug sont requis" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        authorId: session.user.id,
        slug,
      },
    });

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
