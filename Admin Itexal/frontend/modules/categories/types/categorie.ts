export interface Categorie {
  id: string;
  nom: string;
  slug?: string;
  description: string;
  icone: string; // Nom ou identifiant de gamme
  image?: string; // URL ou image base64 optionnelle de la catégorie
  statut: "Actif" | "Inactif";
  nombreProduits: number;
  creeLe: string;
}
