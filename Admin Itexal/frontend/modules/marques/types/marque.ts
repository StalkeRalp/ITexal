export interface Marque {
  id: string;
  nom: string;
  logo: string;
  paysOrigine: string;
  description: string;
  siteWeb?: string;
  statut: "Active" | "Inactive";
  nombreProduits: number;
  creeLe: string;
}
