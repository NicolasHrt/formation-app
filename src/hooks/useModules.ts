import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Module } from "@prisma/client";

const fetchModules = async (courseId: string): Promise<Module[]> => {
  const response = await fetch(`/api/courses/${courseId}/modules`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des modules");
  }
  const data = await response.json();
  return data.data;
};

export function useModules(courseId: string) {
  return useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => fetchModules(courseId),
  });
}

export function useAddModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courseId,
      moduleData,
    }: {
      courseId: string;
      moduleData: { title: string; description: string };
    }) => {
      const response = await fetch(`/api/courses/${courseId}/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création du module");
      }

      return response.json();
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["modules", courseId] });
    },
  });
}
