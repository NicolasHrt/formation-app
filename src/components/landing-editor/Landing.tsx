import { Hero } from "./sections/Hero";
import { Benefits } from "./sections/Benefits";
import { FAQ } from "./sections/FAQ";
import { Pricing } from "./sections/Pricing";
import { ProblemSection } from "./sections/ProblemSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

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
      <TestimonialsSection
        title={content.testimonials?.title}
        subtitle={content.testimonials?.subtitle}
        testimonials={content.testimonials?.items}
        primaryColor={content.hero?.primaryColor || "#D84B2F"}
      />
      <FAQ title={content.faq?.title} />
    </div>
  );
}
