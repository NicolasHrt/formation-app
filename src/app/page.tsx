import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, DollarSign, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 text-primary">
              Créez et vendez vos formations en ligne
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Une plateforme simple et efficace pour partager votre savoir et
              générer des revenus passifs
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link
                  href="/auth/signin"
                  className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition duration-300"
                >
                  Commencer gratuitement
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="/formations"
                  className="inline-block border border-input bg-background text-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent hover:text-accent-foreground transition duration-300"
                >
                  Découvrir les formations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir notre plateforme ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition duration-300">
              <CardHeader>
                <Rocket className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Lancement rapide</CardTitle>
                <CardDescription>
                  Créez et publiez votre formation en quelques minutes
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-md transition duration-300">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Monétisation facile</CardTitle>
                <CardDescription>
                  Générez des revenus passifs avec vos connaissances
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-md transition duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Communauté active</CardTitle>
                <CardDescription>
                  Rejoignez une communauté d'experts passionnés
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à partager votre expertise ?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Rejoignez-nous dès aujourd'hui et commencez à créer votre première
            formation
          </p>
          <Button size="lg" asChild>
            <Link
              href="/auth/signin"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition duration-300"
            >
              Créer mon compte gratuitement
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
