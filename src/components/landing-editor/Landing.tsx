interface LandingProps {
  template: string;
  content: any;
}

export function Landing({ template, content }: LandingProps) {
  const renderHero = () => (
    <div className="text-center py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        {content.hero?.title || "Titre de la formation"}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        {content.hero?.subtitle || "Description de la formation"}
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
        {content.hero?.cta || "Commencer maintenant"}
      </button>
    </div>
  );

  const renderBenefits = () => (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        {content.benefits?.title || "Les avantages"}
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {/* Placeholder pour les avantages */}
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Avantage 1</h3>
          <p className="text-gray-600">Description de l'avantage</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Avantage 2</h3>
          <p className="text-gray-600">Description de l'avantage</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Avantage 3</h3>
          <p className="text-gray-600">Description de l'avantage</p>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        {content.faq?.title || "Questions fréquentes"}
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Placeholder pour les FAQ */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Question 1</h3>
          <p className="text-gray-600">Réponse à la question</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Question 2</h3>
          <p className="text-gray-600">Réponse à la question</p>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        {content.pricing?.title || "Nos tarifs"}
      </h2>
      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Placeholder pour les plans tarifaires */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Plan Basique</h3>
          <p className="text-3xl font-bold mb-4">€29</p>
          <ul className="space-y-2 mb-6">
            <li>Fonctionnalité 1</li>
            <li>Fonctionnalité 2</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Choisir ce plan
          </button>
        </div>
        <div className="border rounded-lg p-6 text-center border-blue-500">
          <h3 className="text-xl font-semibold mb-4">Plan Pro</h3>
          <p className="text-3xl font-bold mb-4">€59</p>
          <ul className="space-y-2 mb-6">
            <li>Fonctionnalité 1</li>
            <li>Fonctionnalité 2</li>
            <li>Fonctionnalité 3</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Choisir ce plan
          </button>
        </div>
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Plan Entreprise</h3>
          <p className="text-3xl font-bold mb-4">€99</p>
          <ul className="space-y-2 mb-6">
            <li>Fonctionnalité 1</li>
            <li>Fonctionnalité 2</li>
            <li>Fonctionnalité 3</li>
            <li>Fonctionnalité 4</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Choisir ce plan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-scroll max-h-screen">
      {renderHero()}
      {renderBenefits()}
      {renderFAQ()}
      {renderPricing()}
    </div>
  );
}
