import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  title?: string;
  questions?: {
    question: string;
    answer: string;
  }[];
}

export function FAQ({
  title = "Questions fréquentes",
  questions = [
    {
      question: "Question 1",
      answer: "Réponse à la question 1",
    },
    {
      question: "Question 2",
      answer: "Réponse à la question 2",
    },
  ],
}: FAQProps) {
  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {questions.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border rounded-lg"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <h3 className="font-semibold text-left">{item.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <p className="text-gray-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
