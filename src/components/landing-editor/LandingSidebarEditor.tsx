import { PencilRuler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RichTextEditor from "@/components/RichTextEditor";

interface HeroContent {
  headerTitle: string;
  title: string;
  subtitle: string;
  cta: string;
  videoUrl: string;
}

interface LandingSidebarEditorProps {
  heroContent: HeroContent;
  onHeroContentChange: Dispatch<SetStateAction<HeroContent>>;
}

export function LandingSidebarEditor({
  heroContent,
  onHeroContentChange,
}: LandingSidebarEditorProps) {
  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    onHeroContentChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <PencilRuler className="w-5 h-5" />
        Modifier le contenu
      </h3>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="hero">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Hero</h4>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pl-2">
            <div className="space-y-2">
              <Label htmlFor="headerTitle">Titre d'en-tête</Label>
              <Input
                id="headerTitle"
                value={heroContent.headerTitle}
                onChange={(e) =>
                  handleHeroChange("headerTitle", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Titre principal</Label>
              <RichTextEditor
                content={heroContent.title}
                onChange={(value) => handleHeroChange("title", value)}
                features={{
                  bold: true,
                  italic: true,
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Textarea
                id="subtitle"
                value={heroContent.subtitle}
                onChange={(e) => handleHeroChange("subtitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta">Texte du bouton CTA</Label>
              <Input
                id="cta"
                value={heroContent.cta}
                onChange={(e) => handleHeroChange("cta", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">URL de la vidéo</Label>
              <Input
                id="videoUrl"
                value={heroContent.videoUrl}
                onChange={(e) => handleHeroChange("videoUrl", e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="problem">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Problème</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des problèmes à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transformation">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Transformation</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des transformations à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Produit</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des modules à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="authority">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Autorité</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des éléments d'autorité à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="testimonials">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Témoignages</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des témoignages à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section Tarifs</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des tarifs à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cta">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section CTA</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition du CTA à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq">
          <AccordionTrigger className="hover:no-underline">
            <h4 className="font-medium">Section FAQ</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des questions fréquentes à venir...
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
