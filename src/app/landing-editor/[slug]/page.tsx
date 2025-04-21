"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LandingSidebarEditor } from "@/components/landing-editor/LandingSidebarEditor";
import { Landing } from "@/components/landing-editor/Landing";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface HeroContent {
  headerTitle: string;
  title: string;
  subtitle: string;
  cta: string;
  videoUrl: string;
}

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
  const [content, setContent] = useState<any>(null);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    headerTitle: "Créateurs, Formateurs, Coachs :",
    title: "Vous allez adorer développer votre business avec TinyPages",
    subtitle:
      "1 workspace simple et élégant pour piloter toute votre activité — site web, landing pages, email marketing, produits numériques, et bien plus",
    cta: "Démarrer l'essai gratuit",
    videoUrl:
      "https://formation-app.s3.us-east-1.amazonaws.com/videos/cm9r95ytw000a4uajwyv3bwhq/1745250845112-ey6wzbilvp.mp4",
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
      <div className="w-1/4 border-r p-4 overflow-y-scroll max-h-screen">
        <Link href={`/dashboard/courses/${courseId}`} className="mb-4 block">
          <Button variant="black" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la page d'accueil
          </Button>
        </Link>
        <LandingSidebarEditor
          heroContent={heroContent}
          onHeroContentChange={setHeroContent}
        />
      </div>
      <div className="w-3/4">
        <Landing content={content} heroContent={heroContent} />
      </div>
    </div>
  );
}
