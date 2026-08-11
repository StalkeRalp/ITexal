import { Marque } from "../types/marque";

export function validerMarque(donnees: Partial<Marque>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.nom || !donnees.nom.trim()) {
    erreurs.nom = "Le nom de la marque est requis.";
  }

  return erreurs;
}
