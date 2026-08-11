export interface BanniereSite {
  id: string;
  titre: string;
  sousTitre: string;
  texteBouton: string;
  lienBouton: string;
  image: string;
  emplacement: "Hero Sliders" | "Banniere Promo" | "Bandeau Haut";
  actif: boolean;
  ordre: number;

  // Legacy field compatibility
  estActive?: boolean;
}

export type Banniere = BanniereSite;

export interface PageStatique {
  id: string;
  titre: string;
  slug: string;
  categorie: "Institutionnel" | "Légal" | "Blog & Conseils";
  extrait: string;
  publie: boolean;
  miseAJourLe: string;
}
