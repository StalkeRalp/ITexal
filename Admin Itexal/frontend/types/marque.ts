/**
 * Modèle de données central : Marque
 */

export interface Marque {
  id: string;
  nom: string;
  slug: string;
  description?: string;
  logo?: string;
  paysOrigine?: string;
  nombreProduits?: number;
  creeLe: string;
}
