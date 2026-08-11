import { RequeteConnexion } from "../types/authentification";

export function validerRequeteConnexion(donnees: Partial<RequeteConnexion>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.email || !donnees.email.trim()) {
    erreurs.email = "L'adresse email est requise.";
  }
  if (!donnees.motDePasse) {
    erreurs.motDePasse = "Le mot de passe est requis.";
  }

  return erreurs;
}
