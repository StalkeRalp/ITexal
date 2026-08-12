export interface LogActivite {
  id: string;
  horodatage: string;
  utilisateurId: string;
  nomUtilisateur: string;
  roleUtilisateur: string;
  typeEvenement: "Authentification" | "Produits" | "Stock" | "Commandes" | "Utilisateurs" | "Paramètres" | "Sécurité";
  action: string;
  description: string;
  niveauSeverite: "Info" | "Avertissement" | "Critique";
  adresseIP: string;
  donneesSensibles?: Record<string, any>;
}

// In-Memory Activity Logs Store avec persistance LocalStorage
const AUDIT_LOGS_KEY = "itexal_activity_logs";

/**
 * Enregistre une action critique dans le journal d'audit activity_logs
 */
export function enregistrerLogActivite(log: Omit<LogActivite, "id" | "horodatage">): LogActivite {
  const nouvelId = `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const horodatage = new Date().toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const entreeLog: LogActivite = {
    id: nouvelId,
    horodatage,
    ...log,
  };

  try {
    if (typeof window !== "undefined") {
      const existantsRaw = localStorage.getItem(AUDIT_LOGS_KEY);
      const existants: LogActivite[] = existantsRaw ? JSON.parse(existantsRaw) : [];
      
      // Conservation des 500 derniers logs (Rolling window)
      const misAJour = [entreeLog, ...existants].slice(0, 500);
      localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(misAJour));
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du log d'activité:", error);
  }

  return entreeLog;
}

/**
 * Récupère l'ensemble des logs d'activité enregistrés
 */
export function obtenirLogsActivite(): LogActivite[] {
  if (typeof window === "undefined") return [];

  try {
    const existantsRaw = localStorage.getItem(AUDIT_LOGS_KEY);
    return existantsRaw ? JSON.parse(existantsRaw) : [];
  } catch (error) {
    return [];
  }
}
