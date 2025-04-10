import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import CreateCourseForm from "@/components/AddCourseForm";

export default async function NewCourse() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Créer une nouvelle formation
      </h1>
      <CreateCourseForm />
    </div>
  );
}
