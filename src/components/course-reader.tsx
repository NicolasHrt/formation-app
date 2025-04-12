"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, MoreVertical } from "lucide-react";
import { formatDuration } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import VideoPlayer from "@/components/video-player";

interface CourseReaderProps {
  course: any;
}

export default function CourseReader({ course }: CourseReaderProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    course.modules[0]?.videos[0]?.id || null
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(
    course.modules.reduce((acc: Record<string, boolean>, module: any) => {
      acc[module.id] = true;
      return acc;
    }, {})
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeVideo = course.modules
    .flatMap((module: any) => module.videos)
    .find((video: any) => video.id === activeVideoId);

  const toggleSection = (moduleId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const totalVideos = course.modules.reduce(
    (acc: number, module: any) => acc + module.videos.length,
    0
  );

  // Mock completed videos (in a real app, this would come from a database)
  const completedVideos = Math.floor(totalVideos * 0.4);
  const progressPercentage = (completedVideos / totalVideos) * 100;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-xl">{course.title}</div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Partager
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 overflow-auto">
          {activeVideo ? (
            <div className="flex h-full flex-col">
              <div className="relative aspect-video w-full bg-black">
                <VideoPlayer videoUrl={activeVideo.videoUrl} />
              </div>
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <h2 className="text-2xl font-bold">{activeVideo.title}</h2>
                <p className="mt-2 text-muted-foreground">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">
                Sélectionnez une vidéo pour commencer
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 border-l overflow-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-background p-4 shadow-sm">
              <h3 className="font-semibold">Contenu du cours</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Votre progression
                </span>
                <span className="text-sm font-medium">
                  {completedVideos}/{totalVideos}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <Separator />

            <div className="space-y-1 p-2">
              {course.modules.map((module: any, moduleIndex: number) => (
                <div key={module.id} className="rounded-md">
                  <button
                    onClick={() => toggleSection(module.id)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex flex-col">
                      <span>
                        Section {moduleIndex + 1} : {module.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {module.videos.length} vidéos •{" "}
                        {module.videos.reduce(
                          (acc: number, video: any) =>
                            acc + (video.duration || 0),
                          0
                        ) / 60}{" "}
                        min
                      </span>
                    </div>
                    {expandedSections[module.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {expandedSections[module.id] && (
                    <div className="mt-1 space-y-1 pl-6 pr-2">
                      {module.videos.map((video: any, videoIndex: number) => (
                        <button
                          key={video.id}
                          onClick={() => setActiveVideoId(video.id)}
                          className={`flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm ${
                            activeVideoId === video.id
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                          }`}
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs">
                            {videoIndex < completedVideos ? (
                              <div className="h-3 w-3 rounded-full bg-primary" />
                            ) : (
                              videoIndex + 1
                            )}
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span className="line-clamp-2">
                              {videoIndex + 1}. {video.title}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {video.duration && (
                                <span>{formatDuration(video.duration)}</span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
