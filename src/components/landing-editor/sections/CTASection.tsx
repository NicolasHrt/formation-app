import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  primaryColor?: string;
}

export function CTASection({
  title = "Prêt à transformer votre business ?",
  subtitle = "Rejoignez la formation maintenant et commencez à créer des landing pages qui convertissent",
  ctaText = "Je commence maintenant",
  primaryColor = "#D84B2F",
}: CTASectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            className="group px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
            style={{
              backgroundColor: primaryColor,
              color: "white",
            }}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center mr-2">
                <span className="text-sm">✓</span>
              </div>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center mr-2">
                <span className="text-sm">✓</span>
              </div>
              <span>Accès immédiat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
