"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { ActionState } from "../types";

export async function addModule(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      error: "Vous devez être connecté pour ajouter un module",
    };
  }

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    videoUrl: formData.get("videoUrl"),
    order: formData.get("order"),
    courseId: formData.get("courseId"),
  };

  if (
    !data.title ||
    !data.description ||
    !data.videoUrl ||
    !data.order ||
    !data.courseId
  ) {
    return {
      error: "Tous les champs sont requis",
    };
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: data.courseId as string },
      include: { author: true },
    });

    if (!course) {
      return {
        error: "Formation non trouvée",
      };
    }

    if (course.author.email !== session.user.email) {
      return {
        error: "Vous n'êtes pas autorisé à modifier cette formation",
      };
    }

    await prisma.module.create({
      data: {
        title: data.title as string,
        description: data.description as string,
        videoUrl: data.videoUrl as string,
        order: parseInt(data.order as string),
        courseId: data.courseId as string,
      },
    });

    revalidatePath(`/dashboard/courses/${data.courseId}`);
    return {
      error: "",
      success: true,
    };
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return {
      error: "Une erreur est survenue lors de l'ajout du module",
    };
  }
}
