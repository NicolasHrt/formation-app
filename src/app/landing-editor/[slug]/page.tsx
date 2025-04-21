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
        <LandingSidebarEditor />
      </div>
      <div className="w-3/4">
        <Landing content={content} />
      </div>
    </div>
  );
}
