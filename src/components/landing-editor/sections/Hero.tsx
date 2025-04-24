import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { HeroContent } from "../types";
import { defaultHeroContent } from "../defaultContent";

interface HeroProps {
  content: HeroContent;
  primaryColor?: string;
}

export function Hero({
  content = defaultHeroContent,
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
    <div className="relative min-h-screen text-foreground py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light mb-6">{content.headerTitle}</h2>

          <h1
            className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
            dangerouslySetInnerHTML={{
              __html: content.title
                .replace(
                  /<strong>(.*?)<\/strong>/g,
                  `<strong style="color: var(--color-${primaryColor}-500)">$1</strong>`
                )
                .replace(/<\/?p>/g, ""),
            }}
          ></h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
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
            className={` px-8 py-6 text-lg rounded-lg bg-${primaryColor}-500 hover:bg-${primaryColor}-600`}
          >
            {content.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
