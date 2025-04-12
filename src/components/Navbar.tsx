"use client";
import { Loader2 } from "lucide-react";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function AuthButtons() {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <Button variant="black" onClick={() => signOut()}>
          Déconnexion
        </Button>
      </div>
    );
  }

  return (
    <Link href="/auth/signin">
      <Button>Connexion</Button>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Formation App
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}
