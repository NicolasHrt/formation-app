import { HeroContent, TransformationContent, Capability } from "./types";

export const defaultHeroContent: HeroContent = {
  headerTitle: "Créateurs, Formateurs, Coachs :",
  title: "Vous allez adorer développer votre business avec TinyPages",
  subtitle:
    "1 workspace simple et élégant pour piloter toute votre activité — site web, landing pages, email marketing, produits numériques, et bien plus",
  cta: "Démarrer l'essai gratuit",
  videoUrl:
    "https://formation-app.s3.us-east-1.amazonaws.com/videos/cm9r95ytw000a4uajwyv3bwhq/1745250845112-ey6wzbilvp.mp4",
};

export const defaultTransformationContent: TransformationContent = {
  title: "Transformez votre potentiel",
  subtitle: "Une formation qui change la donne",
  mainPromise:
    "Cette formation va vous permettre de maîtriser complètement la création de landing pages qui convertissent",
  capabilitiesTitle: "À la fin, vous serez capable de :",
  capabilities: [
    {
      order: 0,
      text: "Créer des landing pages professionnelles de A à Z",
    },
    {
      order: 1,
      text: "Comprendre les principes de copywriting qui convertissent",
    },
    {
      order: 2,
      text: "Optimiser votre taux de conversion",
    },
    {
      order: 3,
      text: "Analyser et améliorer vos performances",
    },
    {
      order: 4,
      text: "Générer plus de leads qualifiés",
    },
  ],
};
