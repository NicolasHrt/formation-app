import {
  PencilRuler,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RichTextEditor from "@/components/RichTextEditor";
import {
  HeroContent,
  TransformationContent,
  Capability,
} from "@/components/landing-editor/types";
import {
  defaultHeroContent,
  defaultTransformationContent,
} from "@/components/landing-editor/defaultContent";

interface LandingSidebarEditorProps {
  heroContent: HeroContent;
  onHeroContentChange: Dispatch<SetStateAction<HeroContent>>;
  transformationContent: TransformationContent;
  onTransformationContentChange: Dispatch<
    SetStateAction<TransformationContent>
  >;
}

export function LandingSidebarEditor({
  heroContent = defaultHeroContent,
  onHeroContentChange = () => {},
  transformationContent = defaultTransformationContent,
  onTransformationContentChange = () => {},
}: LandingSidebarEditorProps) {
  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    onHeroContentChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTransformationChange = (
    field: keyof TransformationContent,
    value: string | Capability[]
  ) => {
    onTransformationContentChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCapabilityChange = (index: number, value: string) => {
    const newCapabilities = [...transformationContent.capabilities];
    newCapabilities[index] = { ...newCapabilities[index], text: value };
    handleTransformationChange("capabilities", newCapabilities);
  };

  const addCapability = () => {
    const newCapability: Capability = {
      order: transformationContent.capabilities.length,
      text: "",
    };
    handleTransformationChange("capabilities", [
      ...transformationContent.capabilities,
      newCapability,
    ]);
  };

  const removeCapability = (index: number) => {
    const newCapabilities = transformationContent.capabilities
      .filter((_, i) => i !== index)
      .map((cap, i) => ({ ...cap, order: i }));
    handleTransformationChange("capabilities", newCapabilities);
  };

  const moveCapability = (index: number, direction: "up" | "down") => {
    const newCapabilities = [...transformationContent.capabilities];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newCapabilities.length) {
      [newCapabilities[index], newCapabilities[newIndex]] = [
        newCapabilities[newIndex],
        newCapabilities[index],
      ];
      // Mettre à jour les ordres
      newCapabilities.forEach((cap, i) => {
        cap.order = i;
      });
      handleTransformationChange("capabilities", newCapabilities);
    }
  };

  return (
    <div className="w-80 p-4 border-r border-gray-200 overflow-y-auto bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <PencilRuler className="w-5 h-5" />
        Éditeur de contenu
      </h2>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="hero">
          <AccordionTrigger>Section Hero</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
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
                <Input
                  id="title"
                  value={heroContent.title}
                  onChange={(e) => handleHeroChange("title", e.target.value)}
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
                <Label htmlFor="cta">Bouton CTA</Label>
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
          <AccordionTrigger>Section Transformation</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transformationTitle">Titre</Label>
                <Input
                  id="transformationTitle"
                  value={transformationContent.title}
                  onChange={(e) =>
                    handleTransformationChange("title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transformationSubtitle">Sous-titre</Label>
                <Input
                  id="transformationSubtitle"
                  value={transformationContent.subtitle}
                  onChange={(e) =>
                    handleTransformationChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainPromise">Promesse principale</Label>
                <Textarea
                  id="mainPromise"
                  value={transformationContent.mainPromise}
                  onChange={(e) =>
                    handleTransformationChange("mainPromise", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capabilitiesTitle">Titre des capacités</Label>
                <Input
                  id="capabilitiesTitle"
                  value={transformationContent.capabilitiesTitle}
                  onChange={(e) =>
                    handleTransformationChange(
                      "capabilitiesTitle",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Capacités</Label>
                <div className="space-y-2">
                  {transformationContent.capabilities
                    .sort((a, b) => a.order - b.order)
                    .map((capability, index) => (
                      <div
                        key={capability.order}
                        className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg"
                      >
                        <Input
                          value={capability.text}
                          onChange={(e) =>
                            handleCapabilityChange(index, e.target.value)
                          }
                        />
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveCapability(index, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveCapability(index, "down")}
                            disabled={
                              index ===
                              transformationContent.capabilities.length - 1
                            }
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCapability(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addCapability}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une capacité
                  </Button>
                </div>
              </div>
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
