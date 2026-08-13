import { Suspense } from "react";
import { Collection } from "@/composants/Collection";

export const metadata = {
  title: "Soins Capillaires d'Exception | ITexal Beauty Marketplace",
  description: "Découvrez notre sélection de soins capillaires haute couture : huiles sèches, masques à l'argan et sérums fortifiants.",
};

export default function CapillairePage() {
  return (
    <Suspense>
      <Collection fixedCategory="Capillaire" />
    </Suspense>
  );
}
