/**
 * Modèle de données central : Paiement
 */

export type StatutPaiement = "en_attente" | "paye" | "echoue" | "rembourse";
export type MethodePaiement = "carte_bancaire" | "mobile_money" | "virement" | "especes";

export interface Paiement {
  id: string;
  commandeId: string;
  referenceCommande: string;
  montant: number;
  methode: MethodePaiement;
  statut: StatutPaiement;
  referencePaiement: string;
  datePaiement: string;
  donneesTransactions?: Record<string, unknown>;
}
