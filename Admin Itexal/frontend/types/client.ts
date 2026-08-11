/**
 * Modèle de données central : Client (Alimenté par BDjson/user.json)
 */

export interface Adresse {
  numero: number;
  rue: string;
  ville: string;
  region: string;
  codePostal: string;
  pays: string;
}

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  genre: string;
  email: string;
  telephone: string;
  avatar: string;
  adresse: Adresse;
  commandesEffectuees: number;
  totalDepense: number;
  statut: "actif" | "inactif" | "suspendu";
  dateInscription: string;
  derniereCommandeLe?: string;
}
