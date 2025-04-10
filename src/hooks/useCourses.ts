import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "@prisma/client";

const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch("/api/courses");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des cours");
  }
  const data = await response.json();
  return data.data;
};

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
}

export function useAddCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData: {
      title: string;
      description: string;
      slug: string;
    }) => {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création du cours");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
