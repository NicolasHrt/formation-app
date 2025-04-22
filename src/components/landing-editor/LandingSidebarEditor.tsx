import {
  PencilRuler,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  CheckCircle,
  Maximize2,
  Minimize2,
  Layout,
  AlertTriangle,
  Sparkles,
  Package,
  User,
  MessageSquare,
  CreditCard,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
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
  TestimonialsContent,
  Testimonial,
  FAQContent,
  FAQItem,
  PricingContent,
  defaultPricingContent,
} from "@/components/landing-editor/types";
import {
  defaultHeroContent,
  defaultTransformationContent,
  defaultTestimonialsContent,
  defaultFAQContent,
} from "@/components/landing-editor/defaultContent";

interface LandingSidebarEditorProps {
  heroContent: HeroContent;
  onHeroContentChange: Dispatch<SetStateAction<HeroContent>>;
  transformationContent: TransformationContent;
  onTransformationContentChange: Dispatch<
    SetStateAction<TransformationContent>
  >;
  testimonialsContent: TestimonialsContent;
  onTestimonialsContentChange: Dispatch<SetStateAction<TestimonialsContent>>;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  faqContent: FAQContent;
  onFAQContentChange: (content: FAQContent) => void;
  pricingContent: PricingContent;
  onPricingContentChange: (content: PricingContent) => void;
}

export function LandingSidebarEditor({
  heroContent = defaultHeroContent,
  onHeroContentChange = () => {},
  transformationContent = defaultTransformationContent,
  onTransformationContentChange = () => {},
  testimonialsContent = defaultTestimonialsContent,
  onTestimonialsContentChange = () => {},
  onFullscreenChange,
  faqContent = defaultFAQContent,
  onFAQContentChange = () => {},
  pricingContent = defaultPricingContent,
  onPricingContentChange = () => {},
}: LandingSidebarEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    onFullscreenChange?.(newFullscreenState);
  };

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

  const handleTestimonialsChange = (
    field: keyof TestimonialsContent,
    value: string | Testimonial[]
  ) => {
    onTestimonialsContentChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: string | number | { name: string; role: string; avatar?: string }
  ) => {
    const newTestimonials = [...testimonialsContent.testimonials];
    if (field === "author") {
      newTestimonials[index] = {
        ...newTestimonials[index],
        author: value as { name: string; role: string; avatar?: string },
      };
    } else {
      newTestimonials[index] = {
        ...newTestimonials[index],
        [field]: value,
      };
    }
    handleTestimonialsChange("testimonials", newTestimonials);
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      author: {
        name: "",
        role: "",
        avatar: "https://i.pravatar.cc/150",
      },
      content: "",
      rating: 5,
    };
    handleTestimonialsChange("testimonials", [
      ...testimonialsContent.testimonials,
      newTestimonial,
    ]);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = testimonialsContent.testimonials.filter(
      (_, i) => i !== index
    );
    handleTestimonialsChange("testimonials", newTestimonials);
  };

  const moveTestimonial = (index: number, direction: "up" | "down") => {
    const newTestimonials = [...testimonialsContent.testimonials];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newTestimonials.length) {
      [newTestimonials[index], newTestimonials[newIndex]] = [
        newTestimonials[newIndex],
        newTestimonials[index],
      ];
      handleTestimonialsChange("testimonials", newTestimonials);
    }
  };

  const handleFAQChange = (
    field: keyof FAQContent,
    value: string | FAQItem[]
  ) => {
    onFAQContentChange({
      ...faqContent,
      [field]: value,
    });
  };

  const handleFAQItemChange = (
    index: number,
    field: keyof FAQItem,
    value: string
  ) => {
    const newQuestions = [...faqContent.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    handleFAQChange("questions", newQuestions);
  };

  const addFAQItem = () => {
    const newItem: FAQItem = {
      question: "",
      answer: "",
    };
    handleFAQChange("questions", [...faqContent.questions, newItem]);
  };

  const removeFAQItem = (index: number) => {
    const newQuestions = faqContent.questions.filter((_, i) => i !== index);
    handleFAQChange("questions", newQuestions);
  };

  const moveFAQItem = (index: number, direction: "up" | "down") => {
    const newQuestions = [...faqContent.questions];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newQuestions.length) {
      [newQuestions[index], newQuestions[newIndex]] = [
        newQuestions[newIndex],
        newQuestions[index],
      ];
      handleFAQChange("questions", newQuestions);
    }
  };

  const handlePricingChange = (
    field: keyof PricingContent,
    value: string | string[]
  ) => {
    onPricingContentChange({
      ...pricingContent,
      [field]: value,
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...pricingContent.features];
    newFeatures[index] = value;
    handlePricingChange("features", newFeatures);
  };

  const addFeature = () => {
    handlePricingChange("features", [...pricingContent.features, ""]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = pricingContent.features.filter((_, i) => i !== index);
    handlePricingChange("features", newFeatures);
  };

  const moveFeature = (index: number, direction: "up" | "down") => {
    const newFeatures = [...pricingContent.features];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newFeatures.length) {
      [newFeatures[index], newFeatures[newIndex]] = [
        newFeatures[newIndex],
        newFeatures[index],
      ];
      handlePricingChange("features", newFeatures);
    }
  };

  return (
    <div
      className={`${
        isFullscreen ? "h-screen overflow-y-auto bg-background px-4" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <PencilRuler className="w-5 h-5" />
          Landing Editor
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="ml-2"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="hero">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Hero
            </div>
          </AccordionTrigger>
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
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Problème à resoudre
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des problèmes à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transformation">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Promesse
            </div>
          </AccordionTrigger>
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
                        className="flex items-center gap-2 p-2 rounded-lg"
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
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produit
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des modules à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="authority">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Autorité
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 p-2">
              Édition des éléments d'autorité à venir...
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="testimonials">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Témoignages
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testimonialsTitle">Titre</Label>
                <Input
                  id="testimonialsTitle"
                  value={testimonialsContent.title}
                  onChange={(e) =>
                    handleTestimonialsChange("title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonialsSubtitle">Sous-titre</Label>
                <Input
                  id="testimonialsSubtitle"
                  value={testimonialsContent.subtitle}
                  onChange={(e) =>
                    handleTestimonialsChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Témoignages</Label>
                <div className="space-y-4">
                  {testimonialsContent.testimonials.map(
                    (testimonial, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Témoignage {index + 1}
                          </h4>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveTestimonial(index, "up")}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveTestimonial(index, "down")}
                              disabled={
                                index ===
                                testimonialsContent.testimonials.length - 1
                              }
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTestimonial(index)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Nom</Label>
                          <Input
                            value={testimonial.author.name}
                            onChange={(e) =>
                              handleTestimonialChange(index, "author", {
                                ...testimonial.author,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Rôle</Label>
                          <Input
                            value={testimonial.author.role}
                            onChange={(e) =>
                              handleTestimonialChange(index, "author", {
                                ...testimonial.author,
                                role: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Avatar URL</Label>
                          <Input
                            value={testimonial.author.avatar}
                            onChange={(e) =>
                              handleTestimonialChange(index, "author", {
                                ...testimonial.author,
                                avatar: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Contenu</Label>
                          <Textarea
                            value={testimonial.content}
                            onChange={(e) =>
                              handleTestimonialChange(
                                index,
                                "content",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Note</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) =>
                              handleTestimonialChange(
                                index,
                                "rating",
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                    )
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addTestimonial}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un témoignage
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Prix
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricingTitle">Titre</Label>
                <Input
                  id="pricingTitle"
                  value={pricingContent.title}
                  onChange={(e) => handlePricingChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricingSubtitle">Sous-titre</Label>
                <Input
                  id="pricingSubtitle"
                  value={pricingContent.subtitle}
                  onChange={(e) =>
                    handlePricingChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input
                  id="price"
                  value={pricingContent.price}
                  onChange={(e) => handlePricingChange("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText">Texte du bouton</Label>
                <Input
                  id="ctaText"
                  value={pricingContent.ctaText}
                  onChange={(e) =>
                    handlePricingChange("ctaText", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bestOffer">Texte de la meilleure offre</Label>
                <Input
                  id="bestOffer"
                  value={pricingContent.bestOffer}
                  onChange={(e) =>
                    handlePricingChange("bestOffer", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat">Texte TVA</Label>
                <Input
                  id="vat"
                  value={pricingContent.vat}
                  onChange={(e) => handlePricingChange("vat", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oneTimeAccess">Texte accès unique</Label>
                <Input
                  id="oneTimeAccess"
                  value={pricingContent.oneTimeAccess}
                  onChange={(e) =>
                    handlePricingChange("oneTimeAccess", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fonctionnalités</Label>
                <div className="space-y-4">
                  {pricingContent.features.map((feature, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Fonctionnalité {index + 1}
                        </h4>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFeature(index, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFeature(index, "down")}
                            disabled={
                              index === pricingContent.features.length - 1
                            }
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFeature(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addFeature}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une fonctionnalité
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faqTitle">Titre</Label>
                <Input
                  id="faqTitle"
                  value={faqContent.title}
                  onChange={(e) => handleFAQChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faqSubtitle">Sous-titre</Label>
                <Input
                  id="faqSubtitle"
                  value={faqContent.subtitle}
                  onChange={(e) => handleFAQChange("subtitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Questions</Label>
                <div className="space-y-4">
                  {faqContent.questions.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFAQItem(index, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFAQItem(index, "down")}
                            disabled={index === faqContent.questions.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFAQItem(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                          value={item.question}
                          onChange={(e) =>
                            handleFAQItemChange(
                              index,
                              "question",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Réponse</Label>
                        <Textarea
                          value={item.answer}
                          onChange={(e) =>
                            handleFAQItemChange(index, "answer", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addFAQItem}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une question
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
