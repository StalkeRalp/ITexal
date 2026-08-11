import { Categorie } from "../types/categorie";

export function validerCategorie(donnees: Partial<Categorie>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.nom || !donnees.nom.trim()) {
    erreurs.nom = "Le nom de la catégorie est requis.";
  }

  return erreurs;
}
