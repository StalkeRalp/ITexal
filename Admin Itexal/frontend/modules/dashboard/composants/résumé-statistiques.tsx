import React from "react";
import { CarteStatistique } from "@/composants/disposition/carte-statistique";

export const ResumeStatistiques: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CarteStatistique titre="Total Produits" valeur="0" variation="+0%" />
      <CarteStatistique titre="Clients Inscrits" valeur="0" variation="+0%" />
      <CarteStatistique titre="Commandes" valeur="0" variation="+0%" />
      <CarteStatistique titre="Chiffre d'Affaires" valeur="0 FCFA" variation="+0%" />
    </div>
  );
};
