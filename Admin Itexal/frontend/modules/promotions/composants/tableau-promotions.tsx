import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { Promotion } from "../types/promotion";
import { Badge } from "@/composants/partages/badge";

interface TableauPromotionsProps {
  promotions?: Promotion[];
}

export const TableauPromotions: React.FC<TableauPromotionsProps> = ({ promotions = [] }) => {
  const colonnes: ColonneTableau<Promotion>[] = [
    { cle: "nom", enTete: "Promotion" },
    { cle: "codePromo", enTete: "Code Promo", rendu: (p) => p.codePromo || "N/A" },
    { cle: "pourcentageRemise", enTete: "Remise", rendu: (p) => `-${p.pourcentageRemise}%` },
    {
      cle: "estActive",
      enTete: "Statut",
      rendu: (p) => (
        <Badge variante={p.estActive ? "succes" : "neutre"}>
          {p.estActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  return <Tableau colonnes={colonnes} donnees={promotions} cleExtraction={(p) => p.id} messageVide="Aucune promotion configurée" />;
};
