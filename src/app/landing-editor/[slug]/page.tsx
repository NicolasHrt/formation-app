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

interface TransformationContent {
  title: string;
  subtitle: string;
  mainPromise: string;
  capabilitiesTitle: string;
  capabilities: string[];
}

export default function LandingEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [heroContent, setHeroContent] = useState<HeroContent>({
    headerTitle: "Créateurs, Formateurs, Coachs :",
    title: "Vous allez adorer développer votre business avec TinyPages",
    subtitle:
      "1 workspace simple et élégant pour piloter toute votre activité — site web, landing pages, email marketing, produits numériques, et bien plus",
    cta: "Démarrer l'essai gratuit",
    videoUrl:
      "https://formation-app.s3.us-east-1.amazonaws.com/videos/cm9r95ytw000a4uajwyv3bwhq/1745250845112-ey6wzbilvp.mp4",
  });

  const [transformationContent, setTransformationContent] =
    useState<TransformationContent>({
      title: "Transformez votre potentiel",
      subtitle: "Une formation qui change la donne",
      mainPromise:
        "Cette formation va vous permettre de maîtriser complètement la création de landing pages qui convertissent",
      capabilitiesTitle: "À la fin, vous serez capable de :",
      capabilities: [
        "Créer des landing pages professionnelles de A à Z",
        "Comprendre les principes de copywriting qui convertissent",
        "Optimiser votre taux de conversion",
        "Analyser et améliorer vos performances",
        "Générer plus de leads qualifiés",
      ],
    });

  const [content, setContent] = useState<any>({});

  // if (!courseId) {
  //   return <LoadingSpinner />;
  // }

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
          transformationContent={transformationContent}
          onTransformationContentChange={setTransformationContent}
        />
      </div>
      <div className="w-3/4">
        <Landing
          content={content}
          heroContent={heroContent}
          transformationContent={transformationContent}
        />
      </div>
    </div>
  );
}
