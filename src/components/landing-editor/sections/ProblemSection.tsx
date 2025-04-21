import * as LucideIcons from "lucide-react";
import { Icon } from "@/components/ui/icon";

interface ProblemSectionProps {
  primaryColor?: string;
}

type IconName = keyof typeof LucideIcons;

interface Feature {
  icon: IconName;
  title: string;
  description: string;
  note: string;
  details: string[];
}

export function ProblemSection({
  primaryColor = "#D84B2F",
}: ProblemSectionProps) {
  const features: Feature[] = [
    {
      icon: "FileText",
      title: "Vous en avez marre des outils de landing page complexes ?",
      description:
        "Les constructeurs de page actuels sont devenus des usines à gaz impossibles à maîtriser.",
      note: "(et on ne parle même pas du temps perdu à comprendre leur fonctionnement)",
      details: [
        "Vous passez plus de temps à comprendre l'interface qu'à créer votre contenu ?",
        "Vous avez l'impression que ces outils sont faits pour des développeurs, pas pour vous ?",
        "Vous êtes frustré de payer pour des fonctionnalités que vous n'utilisez jamais ?",
      ],
    },
    {
      icon: "Mail",
      title: "L'email marketing vous donne des migraines ?",
      description:
        "Les plateformes email sont devenues tellement complexes qu'elles en sont paralysantes.",
      note: "(pendant ce temps, vos prospects attendent vos messages)",
      details: [
        "Vous avez déjà abandonné une campagne email parce que c'était trop compliqué ?",
        "Vous redoutez chaque fois de devoir configurer une nouvelle séquence d'emails ?",
        "Vous avez peur d'envoyer des emails qui finissent en spam à cause d'une mauvaise configuration ?",
      ],
    },
    {
      icon: "BarChart",
      title: "Les analytics vous donnent le vertige ?",
      description:
        "Trop de données tue la donnée. Les tableaux de bord actuels sont incompréhensibles.",
      note: "(impossible de savoir ce qui fonctionne vraiment)",
      details: [
        "Vous vous noyez dans des métriques qui ne vous disent rien ?",
        "Vous avez du mal à comprendre ce qui marche et ce qui ne marche pas ?",
        "Vous prenez des décisions à l'aveugle parce que vos données sont trop complexes ?",
      ],
    },
    {
      icon: "Settings",
      title: "La technique vous fait perdre un temps fou ?",
      description:
        "Entre l'hébergement, les domaines, et les intégrations, c'est un cauchemar sans fin.",
      note: "(ce n'est pas votre métier, et pourtant vous devez être expert en tout)",
      details: [
        "Vous avez déjà passé des heures à essayer de configurer un simple domaine ?",
        "Vous avez peur de casser quelque chose à chaque fois que vous touchez aux paramètres ?",
        "Vous en avez assez de devoir être développeur, designer et technicien en même temps ?",
      ],
    },
  ];

  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-24">
          Ces problèmes vous
          <br />
          semblent familiers ?
        </h1>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-16 items-start">
              <div className="w-24 h-24 flex-shrink-0">
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name={feature.icon} size={36} className="text-white" />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-xl text-white/90">{feature.description}</p>
                  <p className="text-lg text-white/70 mt-2">{feature.note}</p>
                </div>

                <div className="space-y-6">
                  {feature.details.map((detail, idx) => (
                    <p key={idx} className="text-lg text-white/80">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
