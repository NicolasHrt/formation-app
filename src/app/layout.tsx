import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/components/SessionProvider";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formation App",
  description: "Plateforme de création et de vente de formations en ligne",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className=" mx-auto px-4">{children}</main>
            </div>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
