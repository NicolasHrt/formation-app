"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { ActionState } from "../types";

export async function getCourses(): Promise<ActionState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      error: "Vous devez être connecté pour accéder aux formations",
      success: false,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return {
      error: "Utilisateur non trouvé",
      success: false,
    };
  }

  const courses = await prisma.course.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,
    data: courses,
  };
}
