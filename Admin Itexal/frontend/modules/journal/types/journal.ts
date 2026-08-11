export type TypeEvenementAudit =
  | "Authentification"
  | "Produits"
  | "Catégories"
  | "Stock"
  | "Commandes"
  | "Utilisateurs"
  | "Paramètres";

export type NiveauSeveriteAudit = "Info" | "Avertissement" | "Critique";

export interface LogAudit {
  id: string;
  typeEvenement: TypeEvenementAudit;
  action: string;
  description: string;
  nomUtilisateur: string;
  roleUtilisateur: string;
  avatarUtilisateur: string;
  niveauSeverite: NiveauSeveriteAudit;
  adresseIP: string;
  naviguerNavigateur?: string;
  horodatage: string;
  donneesSensibles?: Record<string, any>;
}

export type EntreeJournal = LogAudit;
