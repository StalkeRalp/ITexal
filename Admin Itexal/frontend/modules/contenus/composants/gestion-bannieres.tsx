import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { Banniere } from "../types/contenu";
import { Badge } from "@/composants/partages/badge";

interface GestionBannieresProps {
  bannieres?: Banniere[];
}

export const GestionBannieres: React.FC<GestionBannieresProps> = ({ bannieres = [] }) => {
  const colonnes: ColonneTableau<Banniere>[] = [
    { cle: "titre", enTete: "Titre" },
    { cle: "ordre", enTete: "Ordre d'affichage" },
    {
      cle: "estActive",
      enTete: "Statut",
      rendu: (b) => (
        <Badge variante={b.estActive ? "succes" : "neutre"}>
          {b.estActive ? "Publiée" : "Brouillon"}
        </Badge>
      ),
    },
  ];

  return <Tableau colonnes={colonnes} donnees={bannieres} cleExtraction={(b) => b.id} messageVide="Aucune bannière configurée" />;
};
