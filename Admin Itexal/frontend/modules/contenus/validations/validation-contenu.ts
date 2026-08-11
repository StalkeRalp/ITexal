import { Banniere } from "../types/contenu";

export function validerBanniere(donnees: Partial<Banniere>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.titre || !donnees.titre.trim()) {
    erreurs.titre = "Le titre de la bannière est requis.";
  }

  return erreurs;
}
