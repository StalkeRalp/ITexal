export interface StatistiquesDashboard {
  nombreProduits: number;
  nombreClients: number;
  nombreCommandes: number;
  chiffreAffaires: number;
  commandesRecentes: Array<{
    id: string;
    client: string;
    montant: number;
    statut: string;
  }>;
  stocksFaibles: Array<{
    id: string;
    nom: string;
    stockRestant: number;
  }>;
}
