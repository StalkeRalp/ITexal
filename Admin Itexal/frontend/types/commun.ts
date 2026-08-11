/**
 * Types globaux et génériques partagés à travers l'application ITexal Admin
 */

export interface ReponseAPI<T = unknown> {
  succes: boolean;
  message?: string;
  donnees?: T;
  erreurs?: string[];
}

export interface PaginationMetadonnees {
  pageActuelle: number;
  elementsParPage: number;
  totalElements: number;
  totalPages: number;
}

export interface ReponsePaginee<T> extends ReponseAPI<T[]> {
  pagination: PaginationMetadonnees;
}

export type StatutOperation = "ideal" | "chargement" | "succes" | "erreur";

export type RoleUtilisateur =
  | "super_administrateur"
  | "gestionnaire"
  | "gestionnaire_stock"
  | "gestionnaire_contenu";
