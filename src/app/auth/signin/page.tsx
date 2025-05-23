import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import SignInButton from "@/components/SignInButton";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard/courses");
  }

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Connectez-vous à votre compte
          </h2>
        </div>
        <div className="mt-8">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
