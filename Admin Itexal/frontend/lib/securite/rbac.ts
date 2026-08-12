export type RoleAdmin =
  | "Super Administrateur"
  | "Administrateur"
  | "Gestionnaire de Stock"
  | "Support Client"
  | "Éditeur de Contenu";

export type ActionSensible =
  | "VOIR_JOURNAL"
  | "GERER_UTILISATEURS"
  | "MODIFIER_PARAMETRES"
  | "GERER_PRODUITS"
  | "GERER_STOCKS"
  | "GERER_COMMANDES"
  | "GERER_CLIENTS"
  | "GERER_PROMOTIONS"
  | "GERER_CONTENUS"
  | "EXPORTER_DONNEES";

// Matrice stricte des permissions par rôle
const MATRIX_PERMISSIONS: Record<RoleAdmin, ActionSensible[]> = {
  "Super Administrateur": [
    "VOIR_JOURNAL",
    "GERER_UTILISATEURS",
    "MODIFIER_PARAMETRES",
    "GERER_PRODUITS",
    "GERER_STOCKS",
    "GERER_COMMANDES",
    "GERER_CLIENTS",
    "GERER_PROMOTIONS",
    "GERER_CONTENUS",
    "EXPORTER_DONNEES",
  ],
  "Administrateur": [
    "VOIR_JOURNAL",
    "GERER_UTILISATEURS",
    "GERER_PRODUITS",
    "GERER_STOCKS",
    "GERER_COMMANDES",
    "GERER_CLIENTS",
    "GERER_PROMOTIONS",
    "GERER_CONTENUS",
    "EXPORTER_DONNEES",
  ],
  "Gestionnaire de Stock": [
    "GERER_PRODUITS",
    "GERER_STOCKS",
    "GERER_COMMANDES",
    "EXPORTER_DONNEES",
  ],
  "Support Client": [
    "GERER_COMMANDES",
    "GERER_CLIENTS",
  ],
  "Éditeur de Contenu": [
    "GERER_PRODUITS",
    "GERER_PROMOTIONS",
    "GERER_CONTENUS",
  ],
};

// Matrice des routes protégées par rôle requis
export const ROUTE_PERMISSIONS: Record<string, ActionSensible> = {
  "/admin/utilisateurs": "GERER_UTILISATEURS",
  "/admin/parametres": "MODIFIER_PARAMETRES",
  "/admin/journal": "VOIR_JOURNAL",
  "/admin/produits": "GERER_PRODUITS",
  "/admin/categories": "GERER_PRODUITS",
  "/admin/marques": "GERER_PRODUITS",
  "/admin/stocks": "GERER_STOCKS",
  "/admin/commandes": "GERER_COMMANDES",
  "/admin/clients": "GERER_CLIENTS",
  "/admin/promotions": "GERER_PROMOTIONS",
  "/admin/contenus": "GERER_CONTENUS",
};

/**
 * Vérifie si un rôle possède une autorisation spécifique
 */
export function verifierPermissionRole(
  role: string | null | undefined,
  action: ActionSensible
): boolean {
  if (!role) return false;
  const roleTypo = role as RoleAdmin;
  const permissions = MATRIX_PERMISSIONS[roleTypo] || MATRIX_PERMISSIONS["Administrateur"];
  return permissions.includes(action);
}

/**
 * Vérifie si un utilisateur peut accéder à une route donnée selon son rôle
 */
export function verifierAccesRoute(
  pathName: string,
  role: string | null | undefined
): { autorise: boolean; actionRequise?: ActionSensible } {
  // Recherche du préfixe de route le plus spécifique
  const routeMatch = Object.keys(ROUTE_PERMISSIONS).find(
    (route) => pathName === route || pathName.startsWith(`${route}/`)
  );

  if (!routeMatch) {
    return { autorise: true }; // Route publique ou tableau de bord par défaut
  }

  const actionRequise = ROUTE_PERMISSIONS[routeMatch];
  const autorise = verifierPermissionRole(role, actionRequise);

  return { autorise, actionRequise };
}
