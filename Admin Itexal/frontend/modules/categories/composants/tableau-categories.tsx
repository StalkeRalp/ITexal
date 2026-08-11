import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { Categorie } from "../types/categorie";

interface TableauCategoriesProps {
  categories?: Categorie[];
}

export const TableauCategories: React.FC<TableauCategoriesProps> = ({ categories = [] }) => {
  const colonnes: ColonneTableau<Categorie>[] = [
    { cle: "nom", enTete: "Nom de la Catégorie" },
    { cle: "slug", enTete: "Slug" },
    { cle: "nombreProduits", enTete: "Produits associés" },
  ];

  return <Tableau colonnes={colonnes} donnees={categories} cleExtraction={(c) => c.id} messageVide="Aucune catégorie enregistrée" />;
};
