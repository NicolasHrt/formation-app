import { Hero } from "./sections/Hero";
import { FAQ } from "./sections/FAQ";
import { ProblemSection } from "./sections/ProblemSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { AuthoritySection } from "./sections/AuthoritySection";
import { TransformationSection } from "./sections/TransformationSection";
import { ProductSection } from "./sections/ProductSection";
import { PricingSection } from "./sections/PricingSection";
import { CTASection } from "./sections/CTASection";

interface LandingProps {
  heroContent?: {
    headerTitle: string;
    title: string;
    subtitle: string;
    cta: string;
    videoUrl: string;
  };
  transformationContent?: {
    title: string;
    subtitle: string;
    mainPromise: string;
    capabilitiesTitle: string;
    capabilities: string[];
  };
}

export function Landing({ heroContent, transformationContent }: LandingProps) {
  const primaryColor = "#D84B2F"; // Orange vif
  return (
    <div className="overflow-y-scroll max-h-screen">
      <Hero primaryColor={primaryColor} content={heroContent} />
      <ProblemSection primaryColor={primaryColor} />
      <TransformationSection
        primaryColor={primaryColor}
        content={transformationContent}
      />
      <ProductSection primaryColor={primaryColor} />
      <AuthoritySection primaryColor={primaryColor} />
      <TestimonialsSection primaryColor={primaryColor} />
      <PricingSection primaryColor={primaryColor} />
      <CTASection primaryColor={primaryColor} />
      <FAQ />
    </div>
  );
}
