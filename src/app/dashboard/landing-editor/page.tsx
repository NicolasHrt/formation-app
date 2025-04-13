"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "../../../components/landing-editor/Sidebar";
import { Landing } from "../../../components/landing-editor/Landing";
import { TemplateSelector } from "../../../components/landing-editor/TemplateSelector";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function LandingEditor() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) return null;
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la formation");
      }
      const data = await response.json();
      return data.data;
    },
    enabled: !!courseId,
  });

  const [selectedSection, setSelectedSection] = useState("hero");
  const [template, setTemplate] = useState("default");
  const [content, setContent] = useState({
    hero: {
      title: course?.title || "Créez et vendez vos formations en ligne",
      subtitle:
        course?.description ||
        "Une plateforme simple et efficace pour partager votre savoir",
      cta: "Commencer maintenant",
    },
    benefits: [],
    faq: [],
    pricing: [],
  });

  useEffect(() => {
    if (course) {
      setContent((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          title: course.title,
          subtitle: course.description,
        },
      }));
    }
  }, [course]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!courseId) {
    return (
      <div className="p-8 text-center">Veuillez sélectionner une formation</div>
    );
  }

  return (
    <div className="flex">
      <div className="w-1/4 border-r p-4 overflow-scroll max-h-screen">
        <Link href="/dashboard" className="mb-4 block">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au dashboard
          </Button>
        </Link>
        <TemplateSelector
          selectedTemplate={template}
          onTemplateChange={setTemplate}
        />
        <Sidebar
          selectedSection={selectedSection}
          onSectionSelect={setSelectedSection}
          content={content}
          onContentChange={setContent}
        />
      </div>
      <div className="w-3/4">
        <Landing template={template} content={content} />
      </div>
    </div>
  );
}
