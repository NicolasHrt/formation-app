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
  content: any;
}

export function Landing({ content }: LandingProps) {
  const primaryColor = "#3B82F6"; // Bleu vif de Tailwind
  return (
    <div className="overflow-y-scroll max-h-screen">
      <Hero
        title={content.hero?.title}
        subtitle={content.hero?.subtitle}
        cta={content.hero?.cta}
        primaryColor={primaryColor}
      />
      <ProblemSection primaryColor={primaryColor} />
      <TransformationSection primaryColor={primaryColor} />
      <ProductSection primaryColor={primaryColor} />
      <AuthoritySection
        title={content.authority?.title}
        subtitle={content.authority?.subtitle}
        description={content.authority?.description}
        imageUrl={content.authority?.imageUrl}
        achievements={content.authority?.achievements}
        primaryColor={primaryColor}
      />
      <TestimonialsSection
        title={content.testimonials?.title}
        subtitle={content.testimonials?.subtitle}
        testimonials={content.testimonials?.items}
        primaryColor={primaryColor}
      />
      <PricingSection primaryColor={primaryColor} />
      <CTASection primaryColor={primaryColor} />
      <FAQ title={content.faq?.title} />
    </div>
  );
}
