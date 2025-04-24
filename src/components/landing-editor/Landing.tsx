import { Hero } from "./sections/Hero";
import { FAQ } from "./sections/FAQ";
import { ProblemSection } from "./sections/ProblemSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { AuthoritySection } from "./sections/AuthoritySection";
import { PromiseSection } from "./sections/PromiseSection";
import { ProductSection } from "./sections/ProductSection";
import { PricingSection } from "./sections/PricingSection";
import {
  HeroContent,
  PromiseContent,
  TestimonialsContent,
  FAQContent,
  PricingContent,
  AuthorityContent,
  ProblemContent,
  ProductContent,
  PrimaryColor,
} from "./types";

interface LandingProps {
  heroContent: HeroContent;
  promiseContent: PromiseContent;
  testimonialsContent: TestimonialsContent;
  faqContent: FAQContent;
  pricingContent: PricingContent;
  authorityContent: AuthorityContent;
  problemContent: ProblemContent;
  productContent: ProductContent;
  primaryColor: PrimaryColor;
}

export function Landing({
  heroContent,
  promiseContent,
  testimonialsContent,
  faqContent,
  pricingContent,
  authorityContent,
  problemContent,
  productContent,
  primaryColor,
}: LandingProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero content={heroContent} primaryColor={primaryColor} />
      <ProblemSection content={problemContent} primaryColor={primaryColor} />
      <PromiseSection content={promiseContent} primaryColor={primaryColor} />
      <ProductSection content={productContent} primaryColor={primaryColor} />
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
