/**
 * Modèle de données central : Produit
 * Conforme au cahier des charges Cosmetic Admin
 */

export interface CouleurProduit {
  hex: string;
  nom: string;
}

export interface Produit {
  id: string;
  reference: string;
  nom: string;
  categorieId: string;
  nomCategorie: string;
  marqueId: string;
  nomMarque: string;
  description: string;
  prix: number;
  prixPromotionnel?: number;
  enPromotion?: boolean;
  images: string[];
  stock: number;
  disponible: boolean;
  
  // Caractéristiques & Fiche détaillée cosmétique
  caracteristiques?: string[];
  modeUtilisation?: string;
  precautions?: string;
  composition?: string;
  typeDePeau?: string;
  contenance?: string;
  origine?: string;
  conseilsUtilisation?: string;
  note?: number;
  noteMax?: number;
  tags?: string[];
  couleurs?: CouleurProduit[];
  
  // Metadonnées
  creeLe: string;
  misAJourLe?: string;
}
