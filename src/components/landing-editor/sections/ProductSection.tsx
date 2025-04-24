import Image from "next/image";
import { ProductContent } from "../types";
import { defaultProductContent } from "../defaultContent";

interface ProductSectionProps {
  content?: ProductContent;
  primaryColor?: string;
}

export function ProductSection({
  content = defaultProductContent,
  primaryColor = "orange",
}: ProductSectionProps) {
  return (
    <div className="py-20">
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
                <div className="rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
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
