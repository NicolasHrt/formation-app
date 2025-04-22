import {
  HeroContent,
  TransformationContent,
  TestimonialsContent,
  FAQContent,
  PricingContent,
  AuthorityContent,
  ProblemContent,
  LandingContent,
} from "./types";

export const defaultHeroContent: HeroContent = {
  headerTitle: "Créateurs, Formateurs, Coachs :",
  title:
    "Vous allez <strong>adorer</strong> développer votre business avec TinyPages",
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

export const defaultPricingContent: PricingContent = {
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
};

export const defaultAuthorityContent: AuthorityContent = {
  title: "Votre expert en landing pages",
  subtitle:
    "Plus de 10 ans d'expérience dans la création de pages qui convertissent",
  description:
    "Expert en marketing digital et en conversion, j'ai aidé des centaines d'entrepreneurs à transformer leur trafic en clients.",
  imageUrl:
    "https://cdn.prod.website-files.com/63fb3def0123f31ed888d309/650d80cd9cd2ed0a40ffe341_IMG_0581.jpeg",
  achievements: [
    {
      value: "1000+",
      label: "Landing pages créées",
    },
    {
      value: "85%",
      label: "Taux de conversion moyen",
    },
    {
      value: "50+",
      label: "Clients satisfaits",
    },
  ],
};

export const defaultProblemContent: ProblemContent = {
  title: "Les problèmes que vous rencontrez",
  problems: [
    {
      title: "🔧 Gestion complexe des outils",
      description: `<p>Vous utilisez plusieurs outils différents pour gérer votre activité, ce qui rend la gestion quotidienne complexe et chronophage.</p>

<p><strong>Note :</strong> La multiplication des outils crée de la confusion et des pertes de temps</p>

<ul>
  <li>Difficulté à synchroniser les données entre les outils</li>
  <li>Temps perdu à naviguer entre différentes interfaces</li>
  <li>Coûts d'abonnement qui s'accumulent</li>
</ul>`,
    },
    {
      title: "📉 Faible taux de conversion",
      description: `<p>Vos landing pages ne convertissent pas suffisamment, malgré vos efforts pour les optimiser.</p>

<p><strong>Note :</strong> Un taux de conversion faible impacte directement votre rentabilité</p>

<ul>
  <li>Perte de leads qualifiés</li>
  <li>Coût d'acquisition élevé</li>
  <li>Difficulté à justifier les investissements marketing</li>
</ul>`,
    },
    {
      title: "⏱️ Temps de mise en place trop long",
      description: `<p>La création et la mise en ligne de vos pages prennent trop de temps, vous empêchant de vous concentrer sur votre cœur de métier.</p>

<p><strong>Note :</strong> Le temps est une ressource précieuse pour les entrepreneurs</p>

<ul>
  <li>Délais de mise en ligne trop longs</li>
  <li>Dépendance vis-à-vis des développeurs</li>
  <li>Difficulté à tester rapidement de nouvelles idées</li>
</ul>`,
    },
  ],
};

export const defaultLandingContent: LandingContent = {
  primaryColor: "orange",
  heroContent: defaultHeroContent,
  transformationContent: defaultTransformationContent,
  testimonialsContent: defaultTestimonialsContent,
  faqContent: defaultFAQContent,
  pricingContent: defaultPricingContent,
  authorityContent: defaultAuthorityContent,
  problemContent: defaultProblemContent,
};
