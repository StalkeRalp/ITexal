import { UtilisateurAdmin } from "../types/utilisateur";

export function validerUtilisateur(donnees: Partial<UtilisateurAdmin>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.email || !donnees.email.trim()) {
    erreurs.email = "L'adresse email est requise.";
  }
  if (!donnees.role) {
    erreurs.role = "Le rôle de l'utilisateur est requis.";
  }

  return erreurs;
}
