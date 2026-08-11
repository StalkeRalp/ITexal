/**
 * Modèle de données central : Commande et Ligne de Commande
 * Lié aux vrais Clients (user.json) et Produits (makeup_data.json)
 */

import { StatutPaiement, MethodePaiement } from "./paiement";
import { StatutLivraison, ModeLivraison } from "./livraison";
import { Adresse } from "./client";

export type StatutCommande = "en_attente" | "validee" | "en_preparation" | "expediee" | "livree" | "annulee";

export interface LigneCommande {
  id: string;
  produitId: string;
  referenceProduit: string;
  nomProduit: string;
  imageProduit: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal: number;
}

export interface Commande {
  id: string;
  reference: string; // Ex: CMD-01, CMD-02...
  clientId: string;
  clientNom: string;
  clientEmail: string;
  clientTelephone: string;
  articles: LigneCommande[];
  totalArticles: number;
  montantSousTotal: number;
  fraisLivraison: number;
  remisePromotion: number;
  montantTotal: number;
  statut: StatutCommande;
  dateCommande: string;
  
  // Détails Paiement & Livraison synchronisés
  methodePaiement: MethodePaiement;
  statutPaiement: StatutPaiement;
  modeLivraison: ModeLivraison;
  statutLivraison: StatutLivraison;
  adresseLivraison: Adresse;
  notes?: string;
}
