import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQContent } from "../types";
import { defaultFAQContent } from "../defaultContent";

interface FAQProps {
  content: FAQContent;
  primaryColor?: string;
}

export function FAQ({
  content = defaultFAQContent,
  primaryColor = "orange",
}: FAQProps) {
  return (
    <div className="  py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h3>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {content.questions.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="transition-colors rounded-lg px-6 py-4 text-left">
                <h3 className="text-lg font-semibold">{item.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4rounded-lg">
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
