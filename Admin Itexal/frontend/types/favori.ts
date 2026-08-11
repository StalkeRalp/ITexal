/**
 * Modèle de données central : Favori
 */

export interface Favori {
  id: string;
  produitId: string;
  utilisateurId?: string;
  ajouteLe: string;
}
