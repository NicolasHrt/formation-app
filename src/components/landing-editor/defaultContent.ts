import {
  HeroContent,
  TransformationContent,
  Capability,
  TestimonialsContent,
  FAQContent,
} from "./types";

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

export const defaultTestimonialsContent: TestimonialsContent = {
  title: "Ce que nos clients disent",
  subtitle: "Découvrez pourquoi les créateurs adorent TinyPages",
  testimonials: [
    {
      author: {
        name: "Marie Laurent",
        role: "Coach en développement personnel",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      content:
        "TinyPages a transformé ma façon de vendre mes formations en ligne. L'interface est tellement intuitive que j'ai pu créer ma première landing page en moins d'une heure. Mes ventes ont augmenté de 40% le mois suivant !",
      rating: 5,
    },
    {
      author: {
        name: "Thomas Dubois",
        role: "Expert en marketing digital",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      content:
        "Après avoir essayé de nombreuses plateformes, j'ai enfin trouvé celle qui me correspond. La simplicité de TinyPages ne sacrifie en rien la puissance des fonctionnalités. C'est exactement ce dont j'avais besoin.",
      rating: 5,
    },
    {
      author: {
        name: "Sophie Martin",
        role: "Formatrice indépendante",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      content:
        "Ce qui me plaît le plus, c'est la rapidité avec laquelle on peut mettre en place une page qui convertit. Plus besoin de passer des heures en configuration, je peux me concentrer sur mon contenu.",
      rating: 5,
    },
  ],
};

export const defaultFAQContent: FAQContent = {
  title: "Questions fréquentes",
  subtitle: "Tout ce que vous devez savoir sur notre formation",
  questions: [
    {
      question: "Comment fonctionne l'accès à la formation ?",
      answer:
        "Une fois votre inscription validée, vous recevrez un email avec vos identifiants pour accéder à la plateforme. Vous pourrez commencer immédiatement votre formation à votre rythme.",
    },
    {
      question: "Pendant combien de temps ai-je accès à la formation ?",
      answer:
        "Vous avez un accès à vie à la formation. Vous pouvez y revenir autant de fois que vous le souhaitez et suivre les mises à jour gratuitement.",
    },
    {
      question: "Y a-t-il un support disponible ?",
      answer:
        "Oui, notre équipe est disponible pour répondre à vos questions via notre système de support dédié. Nous nous engageons à vous répondre dans les 24 heures.",
    },
  ],
};
