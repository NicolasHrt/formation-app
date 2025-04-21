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

interface TransformationContent {
  title: string;
  subtitle: string;
  mainPromise: string;
  capabilitiesTitle: string;
  capabilities: string[];
}

interface LandingSidebarEditorProps {
  heroContent: HeroContent;
  onHeroContentChange: Dispatch<SetStateAction<HeroContent>>;
  transformationContent?: TransformationContent;
  onTransformationContentChange?: Dispatch<
    SetStateAction<TransformationContent>
  >;
}

const defaultHeroContent: HeroContent = {
  headerTitle: "Créateurs, Formateurs, Coachs :",
  title: "Vous allez adorer développer votre business avec TinyPages",
  subtitle:
    "1 workspace simple et élégant pour piloter toute votre activité — site web, landing pages, email marketing, produits numériques, et bien plus",
  cta: "Démarrer l'essai gratuit",
  videoUrl:
    "https://formation-app.s3.us-east-1.amazonaws.com/videos/cm9r95ytw000a4uajwyv3bwhq/1745250845112-ey6wzbilvp.mp4",
};

const defaultTransformationContent: TransformationContent = {
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
};

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
    value: string | string[]
  ) => {
    if (onTransformationContentChange) {
      onTransformationContentChange((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleCapabilityChange = (index: number, value: string) => {
    const newCapabilities = [...transformationContent.capabilities];
    newCapabilities[index] = value;
    handleTransformationChange("capabilities", newCapabilities);
  };

  const addCapability = () => {
    handleTransformationChange("capabilities", [
      ...transformationContent.capabilities,
      "",
    ]);
  };

  const removeCapability = (index: number) => {
    const newCapabilities = transformationContent.capabilities.filter(
      (_, i) => i !== index
    );
    handleTransformationChange("capabilities", newCapabilities);
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
          <AccordionContent className="space-y-4 pl-2">
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
              <RichTextEditor
                content={transformationContent.mainPromise}
                onChange={(value) =>
                  handleTransformationChange("mainPromise", value)
                }
                features={{
                  bold: true,
                  italic: true,
                }}
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
              {transformationContent.capabilities.map((capability, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={capability}
                    onChange={(e) =>
                      handleCapabilityChange(index, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeCapability(index)}
                    className="px-2 py-1 text-red-500 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button
                onClick={addCapability}
                className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Ajouter une capacité
              </button>
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
