"use client";

import React from "react";
import { Champ } from "@/composants/partages/champ";
import { Bouton } from "@/composants/partages/bouton";

export const FormulaireConnexion: React.FC = () => {
  return (
    <form className="space-y-4">
      <Champ etiquette="Adresse email" type="email" placeholder="admin@itexal.cm" />
      <Champ etiquette="Mot de passe" type="password" placeholder="••••••••" />
      <Bouton variante="primaire" className="w-full">
        Se connecter à l&apos;Administration
      </Bouton>
    </form>
  );
};
