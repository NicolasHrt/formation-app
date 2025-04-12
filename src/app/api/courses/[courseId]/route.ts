import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: {
            order: "asc",
          },
          include: {
            videos: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération du cours" },
      { status: 500 }
    );
  }
}
