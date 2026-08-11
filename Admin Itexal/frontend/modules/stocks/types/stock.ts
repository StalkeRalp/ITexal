export interface MouvementStock {
  id: string;
  produitId: string;
  nomProduit: string;
  quantiteInitiale: number;
  quantiteAjustee: number;
  quantiteFinale: number;
  motif: string;
  creeLe: string;
}

export interface AlerteStock {
  produitId: string;
  nomProduit: string;
  reference: string;
  stockActuel: number;
  seuilAlerte: number;
}
