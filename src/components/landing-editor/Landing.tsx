import { Hero } from "./sections/Hero";
import { Benefits } from "./sections/Benefits";
import { FAQ } from "./sections/FAQ";
import { Pricing } from "./sections/Pricing";

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
      <Benefits title={content.benefits?.title} />
      <FAQ title={content.faq?.title} />
      <Pricing title={content.pricing?.title} />
    </div>
  );
}
