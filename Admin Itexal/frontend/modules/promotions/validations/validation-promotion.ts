import { Promotion } from "../types/promotion";

export function validerPromotion(donnees: Partial<Promotion>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.nom || !donnees.nom.trim()) {
    erreurs.nom = "Le nom de la promotion est requis.";
  }

  return erreurs;
}
