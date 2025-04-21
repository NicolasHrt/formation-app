import Image from "next/image";

interface Module {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface ProductSectionContent {
  title: string;
  subtitle: string;
  modules: Module[];
}

interface ProductSectionProps {
  content?: ProductSectionContent;
  primaryColor?: string;
}

export function ProductSection({
  content = {
    title: "Ce que vous allez apprendre",
    subtitle: "Un programme complet et structuré",
    modules: [
      {
        title: "Module 1 : Les fondamentaux",
        description:
          "Maîtrisez les bases essentielles pour créer des landing pages efficaces",
        imageUrl:
          "https://placehold.co/800x450/2A2A2A/FFFFFF/png?text=Module+1",
        imageAlt: "Module 1 - Les fondamentaux",
      },
      {
        title: "Module 2 : Copywriting avancé",
        description:
          "Apprenez à écrire des textes qui convertissent et engagent vos visiteurs",
        imageUrl:
          "https://placehold.co/800x450/2A2A2A/FFFFFF/png?text=Module+2",
        imageAlt: "Module 2 - Copywriting avancé",
      },
      {
        title: "Module 3 : Design et UX",
        description:
          "Créez des designs attractifs et une expérience utilisateur optimale",
        imageUrl:
          "https://placehold.co/800x450/2A2A2A/FFFFFF/png?text=Module+3",
        imageAlt: "Module 3 - Design et UX",
      },
      {
        title: "Module 4 : Optimisation et Analytics",
        description:
          "Mesurez et améliorez vos performances avec des données concrètes",
        imageUrl:
          "https://placehold.co/800x450/2A2A2A/FFFFFF/png?text=Module+4",
        imageAlt: "Module 4 - Optimisation et Analytics",
      },
    ],
  },
  primaryColor = "#D84B2F",
}: ProductSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300">{content.subtitle}</p>
        </div>

        <div className="space-y-32">
          {content.modules.map((module, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="bg-[#2A2A2A] rounded-xl p-8 hover:bg-[#333333] transition-colors">
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: primaryColor }}
                  >
                    {module.title}
                  </h3>
                  <p className="text-gray-300 text-lg">{module.description}</p>
                </div>
              </div>
              {module.imageUrl && (
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={module.imageUrl}
                      alt={module.imageAlt || module.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
