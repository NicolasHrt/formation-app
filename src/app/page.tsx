import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Créez et vendez vos formations en ligne
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Une plateforme simple et efficace pour partager votre savoir
      </p>
      <div className="space-x-4">
        <Link
          href="/auth/signin"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
        >
          Start now
        </Link>
        <Link
          href="/formations"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300"
        >
          Voir les formations
        </Link>
      </div>
    </div>
  );
}
