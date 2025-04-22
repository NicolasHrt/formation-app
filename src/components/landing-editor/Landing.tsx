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
  FAQContent,
  PricingContent,
  AuthorityContent,
  ProblemContent,
  PrimaryColor,
} from "./types";

interface LandingProps {
  heroContent: HeroContent;
  transformationContent: TransformationContent;
  testimonialsContent: TestimonialsContent;
  faqContent: FAQContent;
  pricingContent: PricingContent;
  authorityContent: AuthorityContent;
  problemContent: ProblemContent;
  primaryColor: PrimaryColor;
}

export function Landing({
  heroContent,
  transformationContent,
  testimonialsContent,
  faqContent,
  pricingContent,
  authorityContent,
  problemContent,
  primaryColor,
}: LandingProps) {
  return (
    <div className="min-h-screen">
      <Hero content={heroContent} primaryColor={primaryColor} />
      <ProblemSection content={problemContent} primaryColor={primaryColor} />
      <TransformationSection
        content={transformationContent}
        primaryColor={primaryColor}
      />
      <ProductSection primaryColor={primaryColor} />
      <AuthoritySection
        content={authorityContent}
        primaryColor={primaryColor}
      />
      <TestimonialsSection
        content={testimonialsContent}
        primaryColor={primaryColor}
      />
      <PricingSection content={pricingContent} primaryColor={primaryColor} />
      <FAQ content={faqContent} primaryColor={primaryColor} />
    </div>
  );
}
