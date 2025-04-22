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
  Palette,
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
  AuthorityContent,
  Achievement,
  ProblemContent,
  Problem,
  PrimaryColor,
  LandingContent,
} from "./types";
import {
  defaultHeroContent,
  defaultTransformationContent,
  defaultTestimonialsContent,
  defaultFAQContent,
  defaultPricingContent,
  defaultAuthorityContent,
  defaultProblemContent,
  defaultLandingContent,
} from "./defaultContent";

interface LandingSidebarEditorProps {
  landingContent: LandingContent;
  onLandingContentChange: (content: LandingContent) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export function LandingSidebarEditor({
  landingContent = defaultLandingContent,
  onLandingContentChange = () => {},
  onFullscreenChange,
}: LandingSidebarEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    onFullscreenChange?.(newFullscreenState);
  };

  const handlePrimaryColorChange = (color: PrimaryColor) => {
    onLandingContentChange({
      ...landingContent,
      primaryColor: color,
    });
  };

  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    onLandingContentChange({
      ...landingContent,
      heroContent: {
        ...landingContent.heroContent,
        [field]: value,
      },
    });
  };

  const handleTransformationChange = (
    field: keyof TransformationContent,
    value: string | Capability[]
  ) => {
    onLandingContentChange({
      ...landingContent,
      transformationContent: {
        ...landingContent.transformationContent,
        [field]: value,
      },
    });
  };

  const handleCapabilityChange = (index: number, value: string) => {
    const newCapabilities = [
      ...landingContent.transformationContent.capabilities,
    ];
    newCapabilities[index] = { ...newCapabilities[index], text: value };
    handleTransformationChange("capabilities", newCapabilities);
  };

  const addCapability = () => {
    const newCapability: Capability = {
      order: landingContent.transformationContent.capabilities.length,
      text: "",
    };
    handleTransformationChange("capabilities", [
      ...landingContent.transformationContent.capabilities,
      newCapability,
    ]);
  };

  const removeCapability = (index: number) => {
    const newCapabilities = landingContent.transformationContent.capabilities
      .filter((_, i) => i !== index)
      .map((cap, i) => ({ ...cap, order: i }));
    handleTransformationChange("capabilities", newCapabilities);
  };

  const moveCapability = (index: number, direction: "up" | "down") => {
    const newCapabilities = [
      ...landingContent.transformationContent.capabilities,
    ];
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
    onLandingContentChange({
      ...landingContent,
      testimonialsContent: {
        ...landingContent.testimonialsContent,
        [field]: value,
      },
    });
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: string | number | { name: string; role: string; avatar?: string }
  ) => {
    const newTestimonials = [
      ...landingContent.testimonialsContent.testimonials,
    ];
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
      ...landingContent.testimonialsContent.testimonials,
      newTestimonial,
    ]);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials =
      landingContent.testimonialsContent.testimonials.filter(
        (_, i) => i !== index
      );
    handleTestimonialsChange("testimonials", newTestimonials);
  };

  const moveTestimonial = (index: number, direction: "up" | "down") => {
    const newTestimonials = [
      ...landingContent.testimonialsContent.testimonials,
    ];
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
    onLandingContentChange({
      ...landingContent,
      faqContent: {
        ...landingContent.faqContent,
        [field]: value,
      },
    });
  };

  const handleFAQItemChange = (
    index: number,
    field: keyof FAQItem,
    value: string
  ) => {
    const newQuestions = [...landingContent.faqContent.questions];
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
    handleFAQChange("questions", [
      ...landingContent.faqContent.questions,
      newItem,
    ]);
  };

  const removeFAQItem = (index: number) => {
    const newQuestions = landingContent.faqContent.questions.filter(
      (_, i) => i !== index
    );
    handleFAQChange("questions", newQuestions);
  };

  const moveFAQItem = (index: number, direction: "up" | "down") => {
    const newQuestions = [...landingContent.faqContent.questions];
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
    onLandingContentChange({
      ...landingContent,
      pricingContent: {
        ...landingContent.pricingContent,
        [field]: value,
      },
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...landingContent.pricingContent.features];
    newFeatures[index] = value;
    handlePricingChange("features", newFeatures);
  };

  const addFeature = () => {
    handlePricingChange("features", [
      ...landingContent.pricingContent.features,
      "",
    ]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = landingContent.pricingContent.features.filter(
      (_, i) => i !== index
    );
    handlePricingChange("features", newFeatures);
  };

  const moveFeature = (index: number, direction: "up" | "down") => {
    const newFeatures = [...landingContent.pricingContent.features];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newFeatures.length) {
      [newFeatures[index], newFeatures[newIndex]] = [
        newFeatures[newIndex],
        newFeatures[index],
      ];
      handlePricingChange("features", newFeatures);
    }
  };

  const handleAuthorityChange = (
    field: keyof AuthorityContent,
    value: string | Achievement[]
  ) => {
    onLandingContentChange({
      ...landingContent,
      authorityContent: {
        ...landingContent.authorityContent,
        [field]: value,
      },
    });
  };

  const handleAchievementChange = (
    index: number,
    field: "value" | "label",
    value: string
  ) => {
    const newAchievements = [...landingContent.authorityContent.achievements];
    newAchievements[index] = {
      ...newAchievements[index],
      [field]: value,
    };
    handleAuthorityChange("achievements", newAchievements);
  };

  const addAchievement = () => {
    handleAuthorityChange("achievements", [
      ...landingContent.authorityContent.achievements,
      { value: "", label: "" },
    ]);
  };

  const removeAchievement = (index: number) => {
    const newAchievements = landingContent.authorityContent.achievements.filter(
      (_, i) => i !== index
    );
    handleAuthorityChange("achievements", newAchievements);
  };

  const handleProblemChange = (
    field: keyof ProblemContent,
    value: string | Problem[]
  ) => {
    onLandingContentChange({
      ...landingContent,
      problemContent: {
        ...landingContent.problemContent,
        [field]: value,
      },
    });
  };

  const handleProblemItemChange = (
    index: number,
    field: keyof Problem,
    value: string
  ) => {
    const newProblems = [...landingContent.problemContent.problems];
    newProblems[index] = {
      ...newProblems[index],
      [field]: value,
    };
    handleProblemChange("problems", newProblems);
  };

  const addProblem = () => {
    const newProblem: Problem = {
      title: "",
      description: "",
    };
    handleProblemChange("problems", [
      ...landingContent.problemContent.problems,
      newProblem,
    ]);
  };

  const removeProblem = (index: number) => {
    const newProblems = landingContent.problemContent.problems.filter(
      (_, i) => i !== index
    );
    handleProblemChange("problems", newProblems);
  };

  const moveProblem = (index: number, direction: "up" | "down") => {
    const newProblems = [...landingContent.problemContent.problems];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newProblems.length) {
      [newProblems[index], newProblems[newIndex]] = [
        newProblems[newIndex],
        newProblems[index],
      ];
      handleProblemChange("problems", newProblems);
    }
  };

  const colors: { name: PrimaryColor; bg: string; hover: string }[] = [
    { name: "red", bg: "bg-red-500", hover: "hover:bg-red-600" },
    { name: "orange", bg: "bg-orange-500", hover: "hover:bg-orange-600" },
    { name: "amber", bg: "bg-amber-500", hover: "hover:bg-amber-600" },
    { name: "yellow", bg: "bg-yellow-500", hover: "hover:bg-yellow-600" },
    { name: "lime", bg: "bg-lime-500", hover: "hover:bg-lime-600" },
    { name: "green", bg: "bg-green-500", hover: "hover:bg-green-600" },
    { name: "emerald", bg: "bg-emerald-500", hover: "hover:bg-emerald-600" },
    { name: "teal", bg: "bg-teal-500", hover: "hover:bg-teal-600" },
    { name: "cyan", bg: "bg-cyan-500", hover: "hover:bg-cyan-600" },
    { name: "sky", bg: "bg-sky-500", hover: "hover:bg-sky-600" },
    { name: "blue", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
    { name: "indigo", bg: "bg-indigo-500", hover: "hover:bg-indigo-600" },
    { name: "violet", bg: "bg-violet-500", hover: "hover:bg-violet-600" },
    { name: "purple", bg: "bg-purple-500", hover: "hover:bg-purple-600" },
    { name: "fuchsia", bg: "bg-fuchsia-500", hover: "hover:bg-fuchsia-600" },
    { name: "pink", bg: "bg-pink-500", hover: "hover:bg-pink-600" },
    { name: "rose", bg: "bg-rose-500", hover: "hover:bg-rose-600" },
  ];

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
        <AccordionItem value="primary-color">
          <AccordionTrigger className="flex items-center gap-2 [&>svg]:!rotate-0">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Couleur primaire
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Couleur</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color.name}
                      variant="outline"
                      size="sm"
                      className={`w-full h-10 p-0 relative rounded-lg ${
                        landingContent.primaryColor === color.name
                          ? `${color.bg} text-white ${color.hover} border-2 border-black dark:border-white`
                          : `hover:${color.bg} hover:opacity-70 opacity-50`
                      }`}
                      onClick={() => handlePrimaryColorChange(color.name)}
                    >
                      <div className={`w-full h-full ${color.bg} rounded-lg`} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

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
                  value={landingContent.heroContent.headerTitle}
                  onChange={(e) =>
                    handleHeroChange("headerTitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Titre principal</Label>
                <Input
                  id="title"
                  value={landingContent.heroContent.title}
                  onChange={(e) => handleHeroChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Textarea
                  id="subtitle"
                  value={landingContent.heroContent.subtitle}
                  onChange={(e) => handleHeroChange("subtitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta">Bouton CTA</Label>
                <Input
                  id="cta"
                  value={landingContent.heroContent.cta}
                  onChange={(e) => handleHeroChange("cta", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">URL de la vidéo</Label>
                <Input
                  id="videoUrl"
                  value={landingContent.heroContent.videoUrl}
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
              Problème à résoudre
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problemTitle">Titre</Label>
                <Input
                  id="problemTitle"
                  value={landingContent.problemContent.title}
                  onChange={(e) => handleProblemChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Problèmes</Label>
                <div className="space-y-4">
                  {landingContent.problemContent.problems.map(
                    (problem, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Problème {index + 1}</h4>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveProblem(index, "up")}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveProblem(index, "down")}
                              disabled={
                                index ===
                                landingContent.problemContent.problems.length -
                                  1
                              }
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProblem(index)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Titre</Label>
                          <Input
                            value={problem.title}
                            onChange={(e) =>
                              handleProblemItemChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <RichTextEditor
                            content={problem.description}
                            onChange={(value) =>
                              handleProblemItemChange(
                                index,
                                "description",
                                value
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
                    onClick={addProblem}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un problème
                  </Button>
                </div>
              </div>
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
                  value={landingContent.transformationContent.title}
                  onChange={(e) =>
                    handleTransformationChange("title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transformationSubtitle">Sous-titre</Label>
                <Input
                  id="transformationSubtitle"
                  value={landingContent.transformationContent.subtitle}
                  onChange={(e) =>
                    handleTransformationChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainPromise">Promesse principale</Label>
                <Textarea
                  id="mainPromise"
                  value={landingContent.transformationContent.mainPromise}
                  onChange={(e) =>
                    handleTransformationChange("mainPromise", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capabilitiesTitle">Titre des capacités</Label>
                <Input
                  id="capabilitiesTitle"
                  value={landingContent.transformationContent.capabilitiesTitle}
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
                  {landingContent.transformationContent.capabilities
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
                              landingContent.transformationContent.capabilities
                                .length -
                                1
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  value={landingContent.authorityContent.title}
                  onChange={(e) =>
                    handleAuthorityChange("title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Sous-titre</Label>
                <Input
                  value={landingContent.authorityContent.subtitle}
                  onChange={(e) =>
                    handleAuthorityChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={landingContent.authorityContent.description}
                  onChange={(e) =>
                    handleAuthorityChange("description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>URL de l'image</Label>
                <Input
                  value={landingContent.authorityContent.imageUrl}
                  onChange={(e) =>
                    handleAuthorityChange("imageUrl", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Réalisations</Label>
                <div className="space-y-4">
                  {landingContent.authorityContent.achievements.map(
                    (achievement, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Réalisation {index + 1}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAchievement(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Valeur</Label>
                          <Input
                            value={achievement.value}
                            onChange={(e) =>
                              handleAchievementChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={achievement.label}
                            onChange={(e) =>
                              handleAchievementChange(
                                index,
                                "label",
                                e.target.value
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
                    onClick={addAchievement}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une réalisation
                  </Button>
                </div>
              </div>
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
                  value={landingContent.testimonialsContent.title}
                  onChange={(e) =>
                    handleTestimonialsChange("title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonialsSubtitle">Sous-titre</Label>
                <Input
                  id="testimonialsSubtitle"
                  value={landingContent.testimonialsContent.subtitle}
                  onChange={(e) =>
                    handleTestimonialsChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Témoignages</Label>
                <div className="space-y-4">
                  {landingContent.testimonialsContent.testimonials.map(
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
                                landingContent.testimonialsContent.testimonials
                                  .length -
                                  1
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
                  value={landingContent.pricingContent.title}
                  onChange={(e) => handlePricingChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricingSubtitle">Sous-titre</Label>
                <Input
                  id="pricingSubtitle"
                  value={landingContent.pricingContent.subtitle}
                  onChange={(e) =>
                    handlePricingChange("subtitle", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input
                  id="price"
                  value={landingContent.pricingContent.price}
                  onChange={(e) => handlePricingChange("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText">Texte du bouton</Label>
                <Input
                  id="ctaText"
                  value={landingContent.pricingContent.ctaText}
                  onChange={(e) =>
                    handlePricingChange("ctaText", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bestOffer">Texte de la meilleure offre</Label>
                <Input
                  id="bestOffer"
                  value={landingContent.pricingContent.bestOffer}
                  onChange={(e) =>
                    handlePricingChange("bestOffer", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat">Texte TVA</Label>
                <Input
                  id="vat"
                  value={landingContent.pricingContent.vat}
                  onChange={(e) => handlePricingChange("vat", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oneTimeAccess">Texte accès unique</Label>
                <Input
                  id="oneTimeAccess"
                  value={landingContent.pricingContent.oneTimeAccess}
                  onChange={(e) =>
                    handlePricingChange("oneTimeAccess", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fonctionnalités</Label>
                <div className="space-y-4">
                  {landingContent.pricingContent.features.map(
                    (feature, index) => (
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
                                index ===
                                landingContent.pricingContent.features.length -
                                  1
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
                    )
                  )}
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
                  value={landingContent.faqContent.title}
                  onChange={(e) => handleFAQChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faqSubtitle">Sous-titre</Label>
                <Input
                  id="faqSubtitle"
                  value={landingContent.faqContent.subtitle}
                  onChange={(e) => handleFAQChange("subtitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Questions</Label>
                <div className="space-y-4">
                  {landingContent.faqContent.questions.map((item, index) => (
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
                            disabled={
                              index ===
                              landingContent.faqContent.questions.length - 1
                            }
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
