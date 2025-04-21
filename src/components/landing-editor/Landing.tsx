import { Hero } from "./sections/Hero";
import { FAQ } from "./sections/FAQ";
import { ProblemSection } from "./sections/ProblemSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { AuthoritySection } from "./sections/AuthoritySection";
import { TransformationSection } from "./sections/TransformationSection";
import { ProductSection } from "./sections/ProductSection";
import { PricingSection } from "./sections/PricingSection";
import {
  HeroContent,
  TransformationContent,
  TestimonialsContent,
} from "./types";

interface LandingProps {
  heroContent: HeroContent;
  transformationContent: TransformationContent;
  testimonialsContent: TestimonialsContent;
}

export function Landing({
  heroContent,
  transformationContent,
  testimonialsContent,
}: LandingProps) {
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
      <TestimonialsSection
        primaryColor={primaryColor}
        content={testimonialsContent}
      />
      <PricingSection primaryColor={primaryColor} />
      <FAQ />
    </div>
  );
}
