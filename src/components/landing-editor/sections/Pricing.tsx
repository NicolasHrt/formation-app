interface PricingProps {
  title?: string;
}

export function Pricing({ title = "Nos tarifs" }: PricingProps) {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
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
}
