export type RoleUtilisateur =
  | "Super Admin"
  | "Gestionnaire de Stock"
  | "Responsable Commandes"
  | "Rédacteur Contenu";

export type StatutUtilisateur = "Actif" | "Inactif" | "Suspendu";

export interface UtilisateurInterne {
  id: string;
  nomComplet: string;
  email: string;
  telephone: string;
  role: RoleUtilisateur;
  statut: StatutUtilisateur;
  avatar: string;
  dernierAcces: string;
  creeLe: string;

  // Legacy field compatibility
  estActif?: boolean;
}

export type UtilisateurAdmin = UtilisateurInterne;
