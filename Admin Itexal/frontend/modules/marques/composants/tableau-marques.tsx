import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { Marque } from "../types/marque";

interface TableauMarquesProps {
  marques?: Marque[];
}

export const TableauMarques: React.FC<TableauMarquesProps> = ({ marques = [] }) => {
  const colonnes: ColonneTableau<Marque>[] = [
    { cle: "nom", enTete: "Nom de la Marque" },
    { cle: "nombreProduits", enTete: "Produits associés" },
  ];

  return <Tableau colonnes={colonnes} donnees={marques} cleExtraction={(m) => m.id} messageVide="Aucune marque enregistrée" />;
};
