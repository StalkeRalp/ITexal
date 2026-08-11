/**
 * Modèle de données central : Livraison
 */

import { Adresse } from "./client";

export type StatutLivraison = "en_attente" | "en_cours" | "livree" | "annulee" | "retournee";
export type ModeLivraison = "express" | "standard" | "retrait_magasin";

export interface Livraison {
  id: string;
  commandeId: string;
  referenceCommande: string;
  clientNom: string;
  adresseLivraison: Adresse;
  mode: ModeLivraison;
  frais: number;
  statut: StatutLivraison;
  transporteur?: string;
  numeroSuivi?: string;
  dateExpedition?: string;
  dateLivraisonEstimee?: string;
}
