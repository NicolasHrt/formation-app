import { CheckCircle, Clock, Zap, Shield, Users, Gift } from "lucide-react";
import { Icon } from "@/components/ui/icon";

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  price?: string;
  features?: string[];
  ctaText?: string;
  primaryColor?: string;
  bonus?: string[];
}

export function PricingSection({
  title = "Accès à vie à la formation",
  subtitle = "Une seule fois, pour toujours",
  price = "297€",
  features = [
    "Accès illimité à tous les modules",
    "Mises à jour gratuites à vie",
    "Support prioritaire",
    "Accès à la communauté privée",
    "Garantie satisfait ou remboursé 30 jours",
  ],
  bonus = [
    "Templates exclusifs de landing pages",
    "Guide avancé de copywriting",
    "Accès à des webinaires privés",
  ],
  ctaText = "Commencer maintenant",
  primaryColor = "#D84B2F",
}: PricingSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Carte principale */}
          <div className="bg-[#2A2A2A] rounded-2xl p-8 md:p-12 relative">
            {/* Badge "Meilleure offre" */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
              Meilleure offre
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-baseline">
                <span
                  className="text-6xl font-bold"
                  style={{ color: primaryColor }}
                >
                  {price}
                </span>
                <span className="text-2xl text-gray-400 ml-2">TTC</span>
              </div>
              <p className="text-gray-400 mt-4">Paiement unique, accès à vie</p>
            </div>

            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle
                    className="w-6 h-6 mt-1 flex-shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <p className="text-lg text-gray-200">{feature}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: primaryColor,
                  color: "white",
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>

          {/* Section bonus */}
          <div className="space-y-8">
            {/* Garantie */}
            <div className="bg-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8" style={{ color: primaryColor }} />
                <h3 className="text-xl font-bold">Garantie 30 jours</h3>
              </div>
              <p className="text-gray-300">
                Si la formation ne vous convient pas, nous vous remboursons
                intégralement sans questions.
              </p>
            </div>

            {/* Bonus */}
            <div className="bg-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Gift className="w-8 h-8" style={{ color: primaryColor }} />
                <h3 className="text-xl font-bold">Bonus exclusifs</h3>
              </div>
              <div className="space-y-4">
                {bonus.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Zap
                      className="w-5 h-5 mt-1 flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Temps limité */}
            <div className="bg-gradient-to-r from-[#2A2A2A] to-[#1C1C1C] rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Clock className="w-8 h-8" style={{ color: primaryColor }} />
                <h3 className="text-xl font-bold">Offre limitée</h3>
              </div>
              <p className="text-gray-300">
                Cette offre est disponible pour un temps limité. Ne manquez pas
                cette opportunité d'investir dans votre avenir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
