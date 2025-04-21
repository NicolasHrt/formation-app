import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

// Image de couverture par défaut en base64 (dégradé gris foncé)

interface HeroContent {
  headerTitle: string;
  title: string;
  subtitle: string;
  cta: string;
  videoUrl: string;
}

interface HeroProps {
  content?: HeroContent;
  primaryColor?: string;
}

export function Hero({
  content = {
    headerTitle: "Créateurs, Formateurs, Coachs :",
    title: "Vous allez adorer développer votre business avec TinyPages",
    subtitle:
      "1 workspace simple et élégant pour piloter toute votre activité — site web, landing pages, email marketing, produits numériques, et bien plus",
    cta: "Démarrer l'essai gratuit",
    videoUrl:
      "https://formation-app.s3.us-east-1.amazonaws.com/videos/cm9r95ytw000a4uajwyv3bwhq/1745250845112-ey6wzbilvp.mp4",
  },
  primaryColor = "#D84B2F",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1C1C1C] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <p className="text-2xl font-light mb-6">{content.headerTitle}</p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {content.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Conteneur vidéo */}
        <div className="relative w-full max-w-4xl mx-auto mt-12 rounded-lg overflow-hidden">
          <div
            className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg"
            style={{
              backgroundImage: !isLoaded
                ? "linear-gradient(135deg, #1a1a1a 25%, #2a2a2a 100%)"
                : "none",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              playsInline
              onLoadedData={() => setIsLoaded(true)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={content.videoUrl} type="video/mp4" />
            </video>

            {/* Bouton play au centre */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition-colors">
                {isPlaying ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className="w-2 h-8 bg-white mx-1" />
                    <div className="w-2 h-8 bg-white mx-1" />
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                )}
              </div>
            </button>

            {/* Bouton plein écran */}
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-4 right-4 p-2 hover:bg-black/20 rounded-lg transition-colors"
            >
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
            {content.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
