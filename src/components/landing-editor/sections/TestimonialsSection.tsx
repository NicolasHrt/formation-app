import { Star } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { defaultTestimonialsContent } from "../defaultContent";
import { TestimonialsContent } from "../types";

interface TestimonialsSectionProps {
  content: TestimonialsContent;
  primaryColor?: string;
}

export function TestimonialsSection({
  content = defaultTestimonialsContent,
  primaryColor = "#D84B2F",
}: TestimonialsSectionProps) {
  return (
    <div className="  py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border border-black/10  dark:border-white/5 p-8 rounded-xl"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <blockquote className="mb-8">
                <p className="text-lg text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4">
                {testimonial.author.avatar && (
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p
                    style={{ color: `var(--color-${primaryColor}-500)` }}
                    className="font-semibold"
                  >
                    {testimonial.author.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
