/**
 * Modèle de données central : Stock (Directement lié aux Produits)
 */

export interface MouvementStock {
  id: string;
  produitId: string;
  referenceProduit: string;
  nomProduit: string;
  typeMouvement: "entree" | "sortie" | "ajustement" | "vente";
  quantite: number;
  stockAncien: number;
  stockNouveau: number;
  motif: string;
  date: string;
  auteur: string;
}

export interface StockInfo {
  produitId: string;
  reference: string;
  nom: string;
  categorie: string;
  marque: string;
  quantite: number;
  seuilAlerte: number;
  statutStock: "en_stock" | "stock_faible" | "rupture";
  prixUnitaire: number;
  valeurStock: number;
}
