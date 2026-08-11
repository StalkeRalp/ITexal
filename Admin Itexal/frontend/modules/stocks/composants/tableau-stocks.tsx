import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { AlerteStock } from "../types/stock";
import { Badge } from "@/composants/partages/badge";

interface TableauStocksProps {
  alertes?: AlerteStock[];
}

export const TableauStocks: React.FC<TableauStocksProps> = ({ alertes = [] }) => {
  const colonnes: ColonneTableau<AlerteStock>[] = [
    { cle: "reference", enTete: "Référence SKU" },
    { cle: "nomProduit", enTete: "Nom du produit" },
    { cle: "stockActuel", enTete: "Stock Actuel" },
    { cle: "seuilAlerte", enTete: "Seuil d'alerte" },
    {
      cle: "stockActuel",
      enTete: "Niveau",
      rendu: (s) => (
        <Badge variante={s.stockActuel <= 0 ? "erreur" : "avertissement"}>
          {s.stockActuel <= 0 ? "Rupture" : "Stock faible"}
        </Badge>
      ),
    },
  ];

  return <Tableau colonnes={colonnes} donnees={alertes} cleExtraction={(s) => s.produitId} messageVide="Aucune alerte de stock" />;
};
