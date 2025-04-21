import { CheckCircle } from "lucide-react";

interface TransformationSectionProps {
  title?: string;
  subtitle?: string;
  mainPromise?: string;
  capabilities?: string[];
  primaryColor?: string;
}

export function TransformationSection({
  title = "Transformez votre potentiel",
  subtitle = "Une formation qui change la donne",
  mainPromise = "Cette formation va vous permettre de maîtriser complètement la création de landing pages qui convertissent",
  capabilities = [
    "Créer des landing pages professionnelles de A à Z",
    "Comprendre les principes de copywriting qui convertissent",
    "Optimiser votre taux de conversion",
    "Analyser et améliorer vos performances",
    "Générer plus de leads qualifiés",
  ],
  primaryColor = "#D84B2F",
}: TransformationSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
        </div>
        <div className="bg-gradient-to-br from-[#2A2A2A] to-[#333333] rounded-3xl p-10 md:p-16 mb-12 shadow-xl border border-white/5 backdrop-blur-sm">
          <p
            className="text-3xl font-bold text-center leading-relaxed"
            style={{ color: primaryColor }}
          >
            {mainPromise}
          </p>
          <div
            className="w-24 h-1 mx-auto mt-8 rounded-full"
            style={{ backgroundColor: primaryColor, opacity: 0.5 }}
          ></div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-8">
            À la fin, vous serez capable de :
          </h3>
          <div className="grid gap-4">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-[#2A2A2A] p-4 rounded-lg"
              >
                <CheckCircle
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: primaryColor }}
                />
                <p className="text-lg text-gray-200">{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
