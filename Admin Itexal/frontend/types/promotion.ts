/**
 * Modèle de données central : Promotion / Deals
 */

export interface Promotion {
  id: string;
  code: string;
  nom: string;
  description: string;
  typeRemise: "pourcentage" | "montant_fixe";
  valeurRemise: number;
  produitsEligiblesIds?: string[]; // Si vide = s'applique à tous les produits
  categoriesEligiblesIds?: string[];
  dateDebut: string;
  dateFin: string;
  actif: boolean;
  limiteUtilisation?: number;
  nombreUtilisations: number;
  creeLe: string;
}
