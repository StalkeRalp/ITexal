export type TypeReduction = "pourcentage" | "montant_fixe";
export type StatutPromotion = "Actif" | "Inactif" | "Expiré";

export interface Promotion {
  id: string;
  code: string;
  titre: string;
  type: TypeReduction;
  valeur: number; // Ex: 20 (% ou FCFA)
  achatMinimum?: number;
  utilisationsMax?: number;
  nombreUtilisations: number;
  dateDebut: string;
  dateFin: string;
  statut: StatutPromotion;
  produitsEligibles?: string;
  creeLe: string;

  // Legacy / Compatibility fields
  nom?: string;
  codePromo?: string;
  pourcentageRemise?: number;
  estActive?: boolean;
}
