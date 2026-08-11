import type { Metadata } from "next";
import { Suspense } from "react";
import { ChargeurNavigation } from "@/composants-communs/chargeur-navigation";
import { DetecteurHorsLigne } from "@/composants-communs/detecteur-hors-ligne";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITexal — Administration Back-Office",
  description: "Plateforme d'administration e-commerce ITexal",
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
        {children}
      </body>
    </html>
  );
}
