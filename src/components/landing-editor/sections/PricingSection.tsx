import { CheckCircle, Clock, Zap, Shield, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionContent {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  ctaText: string;
  bestOffer: string;
  vat: string;
  oneTimeAccess: string;
}

interface PricingSectionProps {
  content?: PricingSectionContent;
  primaryColor?: string;
}

export function PricingSection({
  content = {
    title: "Accès à vie à la formation",
    subtitle: "Une seule fois, pour toujours",
    price: "297€",
    features: [
      "Accès illimité à tous les modules",
      "Mises à jour gratuites à vie",
      "Support prioritaire",
      "Accès à la communauté privée",
      "Garantie satisfait ou remboursé 30 jours",
    ],
    ctaText: "Commencer maintenant",
    bestOffer: "Meilleure offre",
    vat: "TTC",
    oneTimeAccess: "Paiement unique, accès à vie",
  },
  primaryColor = "#D84B2F",
}: PricingSectionProps) {
  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12 relative border border-black/10  dark:border-white/5">
            {/* {content.bestOffer && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600  px-6 py-2 rounded-full font-semibold shadow-lg">
                {content.bestOffer}
              </div>
            )} */}

            <div className="text-center mb-12">
              <div className="inline-flex items-baseline">
                <span
                  style={{ color: `var(--color-${primaryColor}-500)` }}
                  className="text-6xl font-bold"
                >
                  {content.price}
                </span>
                <span className="text-2xl text-muted-foreground ml-2">
                  {content.vat}
                </span>
              </div>
              <p className="text-muted-foreground mt-4">
                {content.oneTimeAccess}
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle
                    style={{ color: `var(--color-${primaryColor}-500)` }}
                    className="w-6 h-6 mt-1 flex-shrink-0"
                  />
                  <p className="text-lg text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className={` px-8 py-6 text-lg rounded-lg bg-${primaryColor}-500 hover:bg-${primaryColor}-600`}
              >
                {content.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
