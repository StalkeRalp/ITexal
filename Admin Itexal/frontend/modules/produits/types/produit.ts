import { Produit as BaseProduit } from "@/types/produit";

export interface VarianteProduit {
  id: string;
  nomVariante: string; // Ex: 50ml, 100ml, Teinte Claire, Pack Duo
  sku: string;
  prix: number;
  stock: number;
}

export type Produit = BaseProduit & {
  nomCategorie?: string;
  nomMarque?: string;
  caracteristiques?: string | string[];
  variantes?: VarianteProduit[];
  miseAJourLe?: string;
};
