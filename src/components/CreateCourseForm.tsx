"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createCourse, CreateCourseState } from "@/app/actions/courses";

const initialState: CreateCourseState = {
  error: "",
};

export default function CreateCourseForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createCourse,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {state.error}
        </div>
      )}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Titre
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full rounded-md  border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          required
          className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="coverImage"
          className="block text-sm font-medium text-gray-700"
        >
          Image de couverture (URL)
        </label>
        <input
          type="url"
          name="coverImage"
          id="coverImage"
          className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Slug
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            /formation/
          </span>
          <input
            type="text"
            name="slug"
            id="slug"
            required
            pattern="[a-z0-9-]+"
            className="flex-1 text-gray-700 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Utilisez uniquement des lettres minuscules, des chiffres et des tirets
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "Création en cours..." : "Créer la formation"}
        </button>
      </div>
    </form>
  );
}
