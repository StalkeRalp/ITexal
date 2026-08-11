import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { Produit } from "../types/produit";
import { Badge } from "@/composants/partages/badge";

interface TableauProduitsProps {
  produits?: Produit[];
}

export const TableauProduits: React.FC<TableauProduitsProps> = ({ produits = [] }) => {
  const colonnes: ColonneTableau<Produit>[] = [
    { cle: "nom", enTete: "Produit" },
    { cle: "reference", enTete: "Référence" },
    { cle: "prix", enTete: "Prix", rendu: (p) => `${p.prix} FCFA` },
    { cle: "stock", enTete: "Stock" },
    {
      cle: "disponible",
      enTete: "Statut",
      rendu: (p) => (
        <Badge variante={p.disponible ? "succes" : "erreur"}>
          {p.disponible ? "En stock" : "Rupture"}
        </Badge>
      ),
    },
  ];

  return <Tableau colonnes={colonnes} donnees={produits} cleExtraction={(p) => p.id} messageVide="Aucun produit trouvé" />;
};
