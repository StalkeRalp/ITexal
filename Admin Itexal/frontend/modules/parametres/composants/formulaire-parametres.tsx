import React from "react";
import { Champ } from "@/composants/partages/champ";
import { Bouton } from "@/composants/partages/bouton";

export const FormulaireParametres: React.FC = () => {
  return (
    <form className="space-y-4 max-w-xl">
      <Champ etiquette="Nom de la plateforme" defaultValue="ITexal Cosmétiques" />
      <Champ etiquette="Email de contact officiel" defaultValue="contact@itexal.cm" />
      <Champ etiquette="Devise principale" defaultValue="FCFA" />
      <Champ etiquette="Seuil alerte stock par défaut" type="number" defaultValue="5" />
      <Bouton variante="primaire">Enregistrer la configuration</Bouton>
    </form>
  );
};
