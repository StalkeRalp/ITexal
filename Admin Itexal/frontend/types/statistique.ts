/**
 * Modèle de données central : Statistique
 * Calculées dynamiquement depuis la source unique de vérité
 */

export interface StatistiqueVenteJour {
  date: string;
  commandesCount: number;
  chiffreAffaires: number;
}

export interface ProduitPlusVendu {
  produitId: string;
  nomProduit: string;
  imageProduit: string;
  quantiteVendue: number;
  chiffreAffaires: number;
}

export interface CategoriePerformance {
  categorieId: string;
  nomCategorie: string;
  totalVentes: number;
  chiffreAffaires: number;
  partDeMarchePourcentage: number;
}

export interface GlobalKpiStats {
  chiffreAffairesTotal: number;
  croissanceChiffreAffaires: number;
  nombreCommandesTotal: number;
  croissanceCommandes: number;
  nombreClientsTotal: number;
  croissanceClients: number;
  nombreProduitsActifs: number;
  nombreStocksFaibles: number;
  nombreRupturesStock: number;
  panierMoyen: number;
}
