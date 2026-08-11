/**
 * Modèle de données central : Catégorie
 */

export interface Categorie {
  id: string;
  nom: string;
  slug: string;
  description?: string;
  icone?: string;
  image?: string;
  nombreProduits?: number;
  ordreAffichage?: number;
  creeLe: string;
}
