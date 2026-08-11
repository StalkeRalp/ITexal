import { Produit } from "../types/produit";

export function validerProduit(donnees: Partial<Produit>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.nom || !donnees.nom.trim()) {
    erreurs.nom = "Le nom du produit est requis.";
  }
  if (!donnees.reference || !donnees.reference.trim()) {
    erreurs.reference = "La référence SKU est requise.";
  }
  if (donnees.prix === undefined || donnees.prix <= 0) {
    erreurs.prix = "Le prix doit être supérieur à zéro.";
  }

  return erreurs;
}
