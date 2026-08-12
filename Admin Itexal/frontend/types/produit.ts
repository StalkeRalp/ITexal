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
  categorie?: string;
  marqueId: string;
  nomMarque: string;
  description: string;
  prix: number;
  prixPromotionnel?: number;
  enPromotion?: boolean;
  image?: string;
  images: string[];
  stock: number;
  seuilAlerte?: number;
  seuilAlerteMax?: number;
  disponible: boolean;
  
  // Caractéristiques & Fiche détaillée cosmétique
  caracteristiques?: string[] | string;
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
