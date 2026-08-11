/**
 * Gestionnaire centralisé des erreurs API pour l'espace Administrateur ITexal
 */

export interface ErreurApplication {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export function traiterErreurAPI(erreur: unknown): ErreurApplication {
  if (typeof erreur === "string") {
    return { code: "ERREUR_TEXTE", message: erreur };
  }

  if (erreur && typeof erreur === "object" && "message" in erreur) {
    const err = erreur as { message: string; code?: string; details?: Record<string, string[]> };
    return {
      code: err.code || "ERREUR_INCONNUE",
      message: err.message,
      details: err.details,
    };
  }

  return {
    code: "ERREUR_SYSTEME",
    message: "Une erreur inattendue est survenue.",
  };
}
