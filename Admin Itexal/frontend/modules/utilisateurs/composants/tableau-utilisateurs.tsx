import React from "react";
import { Tableau, ColonneTableau } from "@/composants/partages/tableau";
import { UtilisateurAdmin } from "../types/utilisateur";
import { Badge } from "@/composants/partages/badge";

interface TableauUtilisateursProps {
  utilisateurs?: UtilisateurAdmin[];
}

export const TableauUtilisateurs: React.FC<TableauUtilisateursProps> = ({ utilisateurs = [] }) => {
  const colonnes: ColonneTableau<UtilisateurAdmin>[] = [
    { cle: "nom", enTete: "Nom complet" },
    { cle: "email", enTete: "Email" },
    { cle: "role", enTete: "Rôle RBAC", rendu: (u) => <Badge variante="info">{u.role}</Badge> },
    {
      cle: "estActif",
      enTete: "Statut",
      rendu: (u) => (
        <Badge variante={u.estActif ? "succes" : "erreur"}>
          {u.estActif ? "Actif" : "Inactif"}
        </Badge>
      ),
    },
  ];

  return <Tableau colonnes={colonnes} donnees={utilisateurs} cleExtraction={(u) => u.id} messageVide="Aucun utilisateur enregistré" />;
};
