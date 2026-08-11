import React from "react";
import { Champ } from "@/composants/partages/champ";
import { Bouton } from "@/composants/partages/bouton";

export const FormulaireProduit: React.FC = () => {
  return (
    <form className="space-y-4">
      <Champ etiquette="Nom du produit cosmétique" placeholder="Ex: Crème Hydratante Eclat" />
      <Champ etiquette="Référence SKU" placeholder="Ex: ITX-CRM-001" />
      <Champ etiquette="Prix (FCFA)" type="number" placeholder="15000" />
      <Champ etiquette="Contenance" placeholder="Ex: 50 ml" />
      <Champ etiquette="Composition / Ingrédients" placeholder="Ex: Aqua, Glycérine, Beurre de Karité..." />
      <Bouton variante="primaire">Enregistrer le produit</Bouton>
    </form>
  );
};
