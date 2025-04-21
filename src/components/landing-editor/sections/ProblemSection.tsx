import * as LucideIcons from "lucide-react";
import { Icon } from "@/components/ui/icon";
import "@/styles/rich-text.css";

type IconName = keyof typeof LucideIcons;

interface Problem {
  title: string;
  description: string;
  icon: IconName;
}

interface ProblemSectionContent {
  title: string;
  problems: Problem[];
}

interface ProblemSectionProps {
  content?: ProblemSectionContent;
  primaryColor?: string;
}

export function ProblemSection({
  content = {
    title: "Les problèmes que vous rencontrez",
    problems: [
      {
        title: "Gestion complexe des outils",
        description: `<p>Vous utilisez plusieurs outils différents pour gérer votre activité, ce qui rend la gestion quotidienne complexe et chronophage.</p>

<p><strong>Note :</strong> La multiplication des outils crée de la confusion et des pertes de temps</p>

<ul>
  <li>Difficulté à synchroniser les données entre les outils</li>
  <li>Temps perdu à naviguer entre différentes interfaces</li>
  <li>Coûts d'abonnement qui s'accumulent</li>
</ul>`,
        icon: "AlertTriangle",
      },
    ],
  },
  primaryColor = "#D84B2F",
}: ProblemSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-24">
          {content.title.split("<br/>").map((part, i) => (
            <span key={i}>
              {part}
              {i < content.title.split("<br/>").length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div className="space-y-32">
          {content.problems.map((problem, index) => (
            <div key={index} className="flex gap-16 items-start">
              <div className="w-24 h-24 flex-shrink-0">
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name={problem.icon} size={36} className="text-white" />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">{problem.title}</h2>
                  <div
                    className="rich-text-content max-w-none"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
