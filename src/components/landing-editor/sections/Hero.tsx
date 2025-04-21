import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  badge?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  videoUrl?: string;
  primaryColor?: string;
}

export function Hero({
  title = "Créateurs, Formateurs, Coachs :",
  subtitle = "1 workspace simple et élégant pour piloter toute votre activité — site web, landing pages, email marketing, produits numériques, et bien plus",
  cta = "Démarrer l'essai gratuit",
  badge = "Nouveau",
  stats = [
    { value: "1000+", label: "Étudiants" },
    { value: "4.9/5", label: "Avis" },
    { value: "7 jours", label: "Garantie" },
  ],
  videoUrl = "https://formation-app.s3.us-east-1.amazonaws.com/videos/cm9r95ytw000a4uajwyv3bwhq/1745250845112-ey6wzbilvp.mp4",
  primaryColor = "#D84B2F",
}: HeroProps) {
  return (
    <div className="relative min-h-screen bg-[#1C1C1C] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <p className="text-2xl font-light mb-6">{title}</p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Vous allez{" "}
            <span
              style={{ textDecorationColor: primaryColor }}
              className="underline decoration-4"
            >
              adorer
            </span>{" "}
            développer
            <br />
            votre business avec TinyPages
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Conteneur vidéo */}
        <div className="relative w-full max-w-4xl mx-auto mt-12 rounded-lg overflow-hidden">
          <div className="relative aspect-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
              poster="/video-poster.jpg"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Bouton play au centre */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>

            {/* Bouton plein écran */}
            <button className="absolute bottom-4 right-4 p-2 hover:bg-black/20 rounded-lg transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="text-white px-8 py-6 text-lg rounded-lg"
            style={{ backgroundColor: primaryColor }}
          >
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
