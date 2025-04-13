"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LandingSidebarEditor } from "@/components/landing-editor/LandingSidebarEditor";
import { Landing } from "@/components/landing-editor/Landing";
import { TemplateSelector } from "@/components/landing-editor/TemplateSelector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LandingEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const [courseId, setCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] = useState("hero");
  const [template, setTemplate] = useState("default");
  const [content, setContent] = useState({
    hero: {
      title: "Créez et vendez vos formations en ligne",
      subtitle: "Une plateforme simple et efficace pour partager votre savoir",
      cta: "Commencer maintenant",
    },
    benefits: [],
    faq: [],
    pricing: [],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${resolvedParams.slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Une erreur est survenue");
        }

        setCourseId(data.data.id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [resolvedParams.slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 border-r p-4 overflow-scroll max-h-screen">
        <Link href={`/dashboard/courses/${courseId}`} className="mb-4 block">
          <Button variant="black" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la formation
          </Button>
        </Link>
        <TemplateSelector
          selectedTemplate={template}
          onTemplateChange={setTemplate}
        />
        <LandingSidebarEditor
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
