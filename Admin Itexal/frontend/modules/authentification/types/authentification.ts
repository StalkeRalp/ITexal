import { RoleUtilisateur } from "@/types/commun";

export interface SessionAdministrateur {
  id: string;
  nom: string;
  email: string;
  role: RoleUtilisateur;
  jeton: string;
}

export interface RequeteConnexion {
  email: string;
  motDePasse: string;
}
