import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Video } from "@prisma/client";

const fetchVideos = async (moduleId: string): Promise<Video[]> => {
  const response = await fetch(`/api/modules/${moduleId}/videos`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des vidéos");
  }
  const data = await response.json();
  return data.data;
};

export function useVideos(moduleId: string) {
  return useQuery({
    queryKey: ["videos", moduleId],
    queryFn: () => fetchVideos(moduleId),
  });
}

export function useAddVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      moduleId,
      videoData,
    }: {
      moduleId: string;
      videoData: { title: string; description: string; videoUrl: string };
    }) => {
      const response = await fetch(`/api/modules/${moduleId}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création de la vidéo");
      }

      return response.json();
    },
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries({ queryKey: ["videos", moduleId] });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      moduleId,
      videoId,
      videoData,
    }: {
      moduleId: string;
      videoId: string;
      videoData: { title: string; description: string };
    }) => {
      const response = await fetch(
        `/api/modules/${moduleId}/videos/${videoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(videoData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Erreur lors de la mise à jour de la vidéo"
        );
      }

      return response.json();
    },
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries({ queryKey: ["videos", moduleId] });
    },
  });
}
