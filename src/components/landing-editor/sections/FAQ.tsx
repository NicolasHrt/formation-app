import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQContent {
  title: string;
  subtitle: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

interface FAQProps {
  content?: FAQContent;
  primaryColor?: string;
}

const defaultQuestions = [
  {
    question: "Est-ce que j'ai besoin de compétences techniques ?",
    answer:
      "Non, absolument pas ! TinyPages a été conçu pour être utilisé sans aucune connaissance technique. Notre interface intuitive vous guide à chaque étape, et vous pouvez créer des pages professionnelles en quelques clics.",
  },
  {
    question: "Puis-je utiliser mon propre nom de domaine ?",
    answer:
      "Oui, vous pouvez facilement connecter votre propre nom de domaine à TinyPages. Nous fournissons des instructions détaillées et un support si vous avez besoin d'aide pour la configuration.",
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "Nous proposons un abonnement mensuel transparent, sans frais cachés. Vous pouvez annuler à tout moment. Tous nos plans incluent l'hébergement, les mises à jour et le support client.",
  },
  {
    question: "Y a-t-il une limite au nombre de pages que je peux créer ?",
    answer:
      "Non, vous pouvez créer autant de pages que vous le souhaitez, quel que soit votre plan. Nous croyons en la simplicité de la tarification sans limites arbitraires.",
  },
  {
    question: "Quel support est disponible si j'ai besoin d'aide ?",
    answer:
      "Notre équipe de support est disponible par chat et email pour vous aider. Nous proposons aussi une documentation détaillée et des tutoriels vidéo pour vous guider.",
  },
];

export function FAQ({
  content = {
    title: "Questions fréquentes",
    subtitle: "Tout ce que vous devez savoir pour démarrer",
    questions: defaultQuestions,
  },
}: FAQProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300">{content.subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {content.questions.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="bg-[#2A2A2A] hover:bg-[#333333] transition-colors rounded-lg px-6 py-4 text-left">
                <h3 className="text-lg font-semibold">{item.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 mt-2 bg-[#2A2A2A] rounded-lg">
                <p className="text-gray-300">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
