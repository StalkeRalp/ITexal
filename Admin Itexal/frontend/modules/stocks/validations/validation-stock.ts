export function validerAjustementStock(quantite: number, motif: string): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (quantite === 0) {
    erreurs.quantite = "La quantité d'ajustement doit être différente de zéro.";
  }
  if (!motif || !motif.trim()) {
    erreurs.motif = "Un motif d'ajustement est obligatoire.";
  }

  return erreurs;
}
