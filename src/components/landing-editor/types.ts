export interface HeroContent {
  headerTitle: string;
  title: string;
  subtitle: string;
  cta: string;
  videoUrl: string;
}

export interface Capability {
  order: number;
  text: string;
}

export interface TransformationContent {
  title: string;
  subtitle: string;
  mainPromise: string;
  capabilitiesTitle: string;
  capabilities: Capability[];
}

export interface Testimonial {
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  rating: number;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  subtitle: string;
  questions: FAQItem[];
}

export interface PricingContent {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  ctaText: string;
  bestOffer: string;
  vat: string;
  oneTimeAccess: string;
}

export const defaultPricingContent: PricingContent = {
  title: "Accédez à toutes les fonctionnalités",
  subtitle: "Un seul paiement, un accès à vie",
  price: "97€",
  features: [
    "Accès à toutes les fonctionnalités",
    "Mises à jour gratuites à vie",
    "Support prioritaire",
    "Garantie satisfait ou remboursé 30 jours",
  ],
  ctaText: "Obtenir l'accès maintenant",
  bestOffer: "Meilleure offre",
  vat: "TVA incluse",
  oneTimeAccess: "Accès unique",
};

export interface Achievement {
  value: string;
  label: string;
}

export interface AuthorityContent {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  achievements: Achievement[];
}

export interface Problem {
  title: string;
  description: string;
}

export interface ProblemContent {
  title: string;
  problems: Problem[];
}
