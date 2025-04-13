"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LandingSidebarEditor } from "@/components/landing-editor/LandingSidebarEditor";
import { Landing } from "@/components/landing-editor/Landing";
import { TemplateSelector } from "@/components/landing-editor/TemplateSelector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LandingEditor() {
  const searchParams = useSearchParams();

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
