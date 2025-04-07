"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export default function Navbar() {
  const { data: session } = useSession();

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
            <Toggle />
            {session ? (
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={() => signOut()}>Déconnexion</Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Connexion</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
