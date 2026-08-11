export type StatutCommande =
  | "Livrée"
  | "En traitement"
  | "En transit"
  | "En attente"
  | "Annulée"
  | "Completed"
  | "Processing"
  | "Rejected"
  | "On Hold"
  | "In Transit";

export type ModePaiement =
  | "Orange Money"
  | "MTN Mobile Money"
  | "Carte Bancaire"
  | "Carte Banciare"
  | "Paiement à la livraison";

export interface ArticleCommande {
  id: string;
  produitId: string;
  nomProduit: string;
  image: string;
  quantite: number;
  prixUnitaire: number;
}

export interface Commande {
  id: string;
  numeroCommande: string;
  clientId: string;
  nomClient: string;
  emailClient: string;
  telephoneClient: string;
  statut: StatutCommande;
  statutPaiement: "Payé" | "En attente" | "Remboursé" | "Échoué";
  modePaiement: ModePaiement;
  montantTotal: number;
  fraisLivraison: number;
  adresseLivraison: string;
  villeLivraison: string;
  articles: ArticleCommande[];
  creeLe: string;
  miseAJourLe: string;
}
