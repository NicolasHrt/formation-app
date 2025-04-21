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
  return (
    <div className="overflow-y-scroll max-h-screen">
      <Hero
        title={content.hero?.title}
        subtitle={content.hero?.subtitle}
        cta={content.hero?.cta}
      />
      <ProblemSection primaryColor={content.hero?.primaryColor || "#D84B2F"} />
      <TransformationSection
        primaryColor={content.hero?.primaryColor || "#D84B2F"}
      />
      <ProductSection primaryColor={content.hero?.primaryColor || "#D84B2F"} />
      <AuthoritySection
        title={content.authority?.title}
        subtitle={content.authority?.subtitle}
        description={content.authority?.description}
        imageUrl={content.authority?.imageUrl}
        achievements={content.authority?.achievements}
        primaryColor={content.hero?.primaryColor || "#D84B2F"}
      />
      <TestimonialsSection
        title={content.testimonials?.title}
        subtitle={content.testimonials?.subtitle}
        testimonials={content.testimonials?.items}
        primaryColor={content.hero?.primaryColor || "#D84B2F"}
      />
      <PricingSection primaryColor={content.hero?.primaryColor || "#D84B2F"} />
      <CTASection primaryColor={content.hero?.primaryColor || "#D84B2F"} />
      <FAQ title={content.faq?.title} />
    </div>
  );
}
