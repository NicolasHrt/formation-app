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
import {
  HeroContent,
  TransformationContent,
  TestimonialsContent,
} from "@/components/landing-editor/types";

import {
  defaultHeroContent,
  defaultTransformationContent,
  defaultTestimonialsContent,
} from "@/components/landing-editor/defaultContent";

export default function LandingEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [heroContent, setHeroContent] =
    useState<HeroContent>(defaultHeroContent);

  const [transformationContent, setTransformationContent] =
    useState<TransformationContent>(defaultTransformationContent);

  const [testimonialsContent, setTestimonialsContent] =
    useState<TestimonialsContent>(defaultTestimonialsContent);

  const [isSidebarFullscreen, setIsSidebarFullscreen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`${
          isSidebarFullscreen
            ? "fixed inset-0 z-50 bg-background"
            : "w-1/4 p-4 overflow-y-scroll max-h-screen"
        }`}
      >
        <div
          className={`${
            isSidebarFullscreen ? "max-w-4xl mx-auto px-8 py-6" : ""
          }`}
        >
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
            testimonialsContent={testimonialsContent}
            onTestimonialsContentChange={setTestimonialsContent}
            onFullscreenChange={setIsSidebarFullscreen}
          />
        </div>
      </div>
      <div className={`${isSidebarFullscreen ? "hidden" : "w-3/4"}`}>
        <Landing
          heroContent={heroContent}
          transformationContent={transformationContent}
          testimonialsContent={testimonialsContent}
        />
      </div>
    </div>
  );
}
