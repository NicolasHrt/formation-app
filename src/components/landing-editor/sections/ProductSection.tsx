import * as LucideIcons from "lucide-react";
import { Icon } from "@/components/ui/icon";

type IconName = keyof typeof LucideIcons;

interface Module {
  title: string;
  description: string;
}

interface Format {
  icon: IconName;
  title: string;
  description: string;
}

interface ProductSectionProps {
  title?: string;
  subtitle?: string;
  modules?: Module[];
  formats?: Format[];
  primaryColor?: string;
}

export function ProductSection({
  title = "Ce que vous allez apprendre",
  subtitle = "Un programme complet et structuré",
  modules = [
    {
      title: "Module 1 : Les fondamentaux",
      description:
        "Maîtrisez les bases essentielles pour créer des landing pages efficaces",
    },
    {
      title: "Module 2 : Copywriting avancé",
      description:
        "Apprenez à écrire des textes qui convertissent et engagent vos visiteurs",
    },
    {
      title: "Module 3 : Design et UX",
      description:
        "Créez des designs attractifs et une expérience utilisateur optimale",
    },
    {
      title: "Module 4 : Optimisation et Analytics",
      description:
        "Mesurez et améliorez vos performances avec des données concrètes",
    },
  ],
  formats = [
    {
      icon: "Video",
      title: "Vidéos HD",
      description: "Plus de 10 heures de contenu en haute qualité",
    },
    {
      icon: "FileText",
      title: "Ressources PDF",
      description: "Guides pratiques et fiches récapitulatives",
    },
    {
      icon: "Users",
      title: "Communauté",
      description: "Accès à un groupe privé d'entraide",
    },
    {
      icon: "Package",
      title: "Bonus",
      description: "Templates et outils exclusifs",
    },
  ],
  primaryColor = "#D84B2F",
}: ProductSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
        </div>

        <div className="grid gap-8 mb-16">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-[#2A2A2A] rounded-xl p-6 hover:bg-[#333333] transition-colors"
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: primaryColor }}
              >
                {module.title}
              </h3>
              <p className="text-gray-300">{module.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#2A2A2A] rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Ce qui est inclus
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formats.map((format, index) => (
              <div key={index} className="flex gap-4">
                <div style={{ color: primaryColor }}>
                  <Icon name={format.icon} className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{format.title}</h4>
                  <p className="text-gray-300">{format.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
