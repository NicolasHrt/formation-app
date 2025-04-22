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
  FAQContent,
  PricingContent,
  AuthorityContent,
  ProblemContent,
  LandingContent,
} from "@/components/landing-editor/types";

import {
  defaultHeroContent,
  defaultTransformationContent,
  defaultTestimonialsContent,
  defaultFAQContent,
  defaultPricingContent,
  defaultAuthorityContent,
  defaultProblemContent,
  defaultLandingContent,
} from "@/components/landing-editor/defaultContent";

export default function LandingEditor({
  params,
}: {
  params: { slug: string };
}) {
  const [landingContent, setLandingContent] = useState<LandingContent>(
    defaultLandingContent
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r py-4 flex flex-col">
        <div className="flex-1 overflow-y-scroll  px-4">
          <LandingSidebarEditor
            landingContent={landingContent}
            onLandingContentChange={setLandingContent}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Landing
          heroContent={landingContent.heroContent}
          transformationContent={landingContent.transformationContent}
          testimonialsContent={landingContent.testimonialsContent}
          faqContent={landingContent.faqContent}
          pricingContent={landingContent.pricingContent}
          authorityContent={landingContent.authorityContent}
          problemContent={landingContent.problemContent}
          primaryColor={landingContent.primaryColor}
        />
      </div>
    </div>
  );
}
