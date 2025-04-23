interface Achievement {
  value: string;
  label: string;
}

interface AuthoritySectionContent {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  achievements: Achievement[];
}

interface AuthoritySectionProps {
  content?: AuthoritySectionContent;
  primaryColor?: string;
}

const defaultAchievements: Achievement[] = [
  {
    value: "10,000+",
    label: "Étudiants formés",
  },
  {
    value: "8+ ans",
    label: "d'expérience",
  },
  {
    value: "4.9/5",
    label: "de satisfaction",
  },
];

export function AuthoritySection({
  content = {
    title: "Pourquoi me faire confiance ?",
    subtitle: "Nicolas Harter, Expert en Formation Digitale",
    description:
      "Depuis 8 ans, j'accompagne les créateurs de contenu à développer leur business en ligne. Mon expertise unique combine une profonde compréhension des besoins des formateurs avec une maîtrise des outils digitaux. J'ai personnellement aidé plus de 10,000 étudiants à travers mes formations, et c'est cette expérience qui m'a poussé à créer TinyPages : l'outil que j'aurais rêvé avoir quand j'ai commencé.",
    imageUrl:
      "https://cdn.prod.website-files.com/63fb3def0123f31ed888d309/650d80cd9cd2ed0a40ffe341_IMG_0581-p-1600.jpeg",
    achievements: defaultAchievements,
  },
  primaryColor = "#D84B2F",
}: AuthoritySectionProps) {
  return (
    <div className="  py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1C1C1C] via-transparent to-transparent z-10" />
            <img
              src={content.imageUrl}
              alt="Portrait"
              className="w-full h-[600px] object-cover "
            />
          </div>

          <div className="space-y-8">
            <div>
              {content.title && (
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {content.title}
                </h2>
              )}
              {content.subtitle && (
                <p
                  style={{ color: `var(--color-${primaryColor}-500)` }}
                  className="text-2xl font-medium"
                >
                  {content.subtitle}
                </p>
              )}
            </div>

            {content.description && (
              <p className="text-muted-foreground leading-relaxed">
                {content.description}
              </p>
            )}

            <div className="flex justify-center gap-8 pt-8">
              {content.achievements.map((achievement, index) => (
                <div key={index} className="text-center flex-1">
                  <p
                    style={{ color: `var(--color-${primaryColor}-500)` }}
                    className="text-2xl font-bold mb-1"
                  >
                    {achievement.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
