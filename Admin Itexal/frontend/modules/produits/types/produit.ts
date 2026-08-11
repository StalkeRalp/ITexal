export interface VarianteProduit {
  id: string;
  nomVariante: string; // Ex: 50ml, 100ml, Teinte Claire, Pack Duo
  sku: string;
  prix: number;
  stock: number;
}

export interface Produit {
  id: string;
  nom: string;
  reference: string;
  categorieId: string;
  nomCategorie?: string;
  marqueId: string;
  nomMarque?: string;
  description: string;
  prix: number;
  prixPromotionnel?: number;
  stock: number;
  disponible: boolean;
  images: string[];
  caracteristiques?: string;
  modeUtilisation?: string;
  precautions?: string;
  // Champs spécifiques cosmétique (ITexal)
  composition?: string;
  typeDePeau?: string; // Ex: Peaux sèches, Peaux mixtes à grasses, Toutes peaux
  contenance?: string; // Ex: 50ml, 200ml, 500g
  origine?: string; // Ex: Cameroun, France, Maroc
  conseilsUtilisation?: string;
  variantes?: VarianteProduit[];
  creeLe: string;
  miseAJourLe?: string;
}
