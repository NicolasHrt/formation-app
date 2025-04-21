interface BenefitsProps {
  title?: string;
}

export function Benefits({ title = "Les avantages" }: BenefitsProps) {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="grid grid-cols-3 gap-8">
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
}
