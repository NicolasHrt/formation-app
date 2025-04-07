"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { ActionState } from "../types";

export async function createCourse(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      error: "Vous devez être connecté pour créer une formation",
    };
  }

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    slug: formData.get("slug"),
  };

  if (!data.title || !data.description || !data.slug) {
    return {
      error: "Titre, description et slug sont requis",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        error: "Utilisateur non trouvé",
      };
    }

    const existingCourse = await prisma.course.findUnique({
      where: { slug: data.slug as string },
    });

    if (existingCourse) {
      return {
        error: "Un cours avec ce slug existe déjà",
      };
    }

    await prisma.course.create({
      data: {
        title: data.title as string,
        description: data.description as string,
        coverImage: data.coverImage as string,
        slug: data.slug as string,
        authorId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return {
      error: "",
      success: true,
    };
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return {
      error: "Une erreur est survenue lors de la création de la formation",
    };
  }
}
