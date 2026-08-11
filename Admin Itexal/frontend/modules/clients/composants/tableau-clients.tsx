import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { Client } from "../types/client";

interface TableauClientsProps {
  clients?: Client[];
}

export const TableauClients: React.FC<TableauClientsProps> = ({ clients = [] }) => {
  const colonnes: ColonneTableau<Client>[] = [
    { cle: "nom", enTete: "Nom complet", rendu: (c) => `${c.prenom} ${c.nom}` },
    { cle: "email", enTete: "Email" },
    { cle: "nombreCommandes", enTete: "Commandes" },
    { cle: "totalDepense", enTete: "Total Dépensé", rendu: (c) => `${c.totalDepense} FCFA` },
  ];

  return <Tableau colonnes={colonnes} donnees={clients} cleExtraction={(c) => c.id} messageVide="Aucun client enregistré" />;
};
