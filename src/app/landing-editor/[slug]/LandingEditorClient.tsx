"use client";

import { useState } from "react";
import { LandingSidebarEditor } from "@/components/landing-editor/LandingSidebarEditor";
import { Landing } from "@/components/landing-editor/Landing";
import { LandingContent } from "@/components/landing-editor/types";
import { defaultLandingContent } from "@/components/landing-editor/defaultContent";

export function LandingEditorClient({ slug }: { slug: string }) {
  const [landingContent, setLandingContent] = useState<LandingContent>(
    defaultLandingContent
  );

  return (
    <div className="flex h-screen">
      <div className="w-[30%] border-r border-border flex flex-col">
        <div className="flex-1 overflow-y-scroll px-4">
          <LandingSidebarEditor
            landingContent={landingContent}
            onLandingContentChange={setLandingContent}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Landing
          heroContent={landingContent.heroContent}
          promiseContent={landingContent.promiseContent}
          testimonialsContent={landingContent.testimonialsContent}
          faqContent={landingContent.faqContent}
          pricingContent={landingContent.pricingContent}
          authorityContent={landingContent.authorityContent}
          problemContent={landingContent.problemContent}
          productContent={landingContent.productContent}
          primaryColor={landingContent.primaryColor}
        />
      </div>
    </div>
  );
}
