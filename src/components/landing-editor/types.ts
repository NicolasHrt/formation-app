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
