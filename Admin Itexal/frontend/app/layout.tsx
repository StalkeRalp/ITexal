import type { Metadata } from "next";
import { Suspense } from "react";
import { ChargeurNavigation } from "@/composants-communs/chargeur-navigation";
import { DetecteurHorsLigne } from "@/composants-communs/detecteur-hors-ligne";
import { FournisseurGlobal } from "@/composants-communs/fournisseur-global";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cosmetic Admin — Back-Office",
    template: "%s | Cosmetic Admin",
  },
  description: "Plateforme d'administration e-commerce Cosmetic Admin — Tableau de Bord • Gestion • Performance",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full bg-slate-900 text-slate-100 antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-900 text-slate-100">
        <DetecteurHorsLigne />
        <Suspense fallback={null}>
          <ChargeurNavigation />
        </Suspense>
        <FournisseurGlobal>{children}</FournisseurGlobal>
      </body>
    </html>
  );
}
