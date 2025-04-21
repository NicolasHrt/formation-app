import { Star } from "lucide-react";
import { Icon } from "@/components/ui/icon";

interface Testimonial {
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  rating: number;
}

interface TestimonialsSectionContent {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

interface TestimonialsSectionProps {
  content?: TestimonialsSectionContent;
  primaryColor?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    author: {
      name: "Marie Laurent",
      role: "Coach en développement personnel",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    content:
      "TinyPages a transformé ma façon de vendre mes formations en ligne. L'interface est tellement intuitive que j'ai pu créer ma première landing page en moins d'une heure. Mes ventes ont augmenté de 40% le mois suivant !",
    rating: 5,
  },
  {
    author: {
      name: "Thomas Dubois",
      role: "Expert en marketing digital",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    content:
      "Après avoir essayé de nombreuses plateformes, j'ai enfin trouvé celle qui me correspond. La simplicité de TinyPages ne sacrifie en rien la puissance des fonctionnalités. C'est exactement ce dont j'avais besoin.",
    rating: 5,
  },
  {
    author: {
      name: "Sophie Martin",
      role: "Formatrice indépendante",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    content:
      "Ce qui me plaît le plus, c'est la rapidité avec laquelle on peut mettre en place une page qui convertit. Plus besoin de passer des heures en configuration, je peux me concentrer sur mon contenu.",
    rating: 5,
  },
  {
    author: {
      name: "Sophie Martin",
      role: "Formatrice indépendante",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    content:
      "Ce qui me plaît le plus, c'est la rapidité avec laquelle on peut mettre en place une page qui convertit. Plus besoin de passer des heures en configuration, je peux me concentrer sur mon contenu.",
    rating: 5,
  },
];

export function TestimonialsSection({
  content = {
    title: "Ce que nos clients disent",
    subtitle: "Découvrez pourquoi les créateurs adorent TinyPages",
    testimonials: defaultTestimonials,
  },
  primaryColor = "#D84B2F",
}: TestimonialsSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#2A2A2A] p-8 rounded-lg hover:bg-[#333333] transition-colors"
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
                <p className="text-lg text-gray-300 italic">
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
                  <p className="font-semibold" style={{ color: primaryColor }}>
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
