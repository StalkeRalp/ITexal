/**
 * Modèle de données central : Utilisateur / Administrateur
 */

import { RoleUtilisateur } from "./commun";

export interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: RoleUtilisateur;
  avatar?: string;
  telephone?: string;
  statut: "actif" | "inactif";
  creeLe: string;
  derniereConnexion?: string;
}
