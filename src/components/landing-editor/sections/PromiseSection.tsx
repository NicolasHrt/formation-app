import { CheckCircle } from "lucide-react";
import { PromiseContent } from "../types";

interface PromiseSectionProps {
  content: PromiseContent;
  primaryColor?: string;
}

export function PromiseSection({
  content,
  primaryColor = "orange",
}: PromiseSectionProps) {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>
        <div className="rounded-3xl p-10 md:p-16 mb-12 border border-black/10  dark:border-white/5 ">
          <h3 className="text-3xl font-bold text-center leading-relaxed ">
            {content.mainPromise}
          </h3>
          <div
            className={`w-24 h-1 mx-auto mt-8 rounded-full bg-${primaryColor}-500 opacity-50`}
          ></div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-8">
            {content.capabilitiesTitle}
          </h3>
          <div className="grid gap-4">
            {content.capabilities
              .sort((a, b) => a.order - b.order)
              .map((capability) => (
                <div
                  key={capability.order}
                  className="flex items-start gap-4 p-4 "
                >
                  <CheckCircle
                    style={{ color: `var(--color-${primaryColor}-500)` }}
                    className="w-6 h-6 mt-1 flex-shrink-0"
                  />
                  <p className="text-lg text-muted-foreground">
                    {capability.text}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
