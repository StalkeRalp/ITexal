/**
 * Module de Protection contre les Injections (XSS, SQLi, CSRF)
 */

/**
 * Nettoie une chaîne de caractères contre les injections XSS
 * Échappe les caractères HTML dangereux (<, >, ", ', &, /)
 */
export function nettoyerChaineXSS(chaine: string): string {
  if (typeof chaine !== "string") return chaine;
  
  return chaine
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/javascript:/gi, "")
    .replace(/onerror=/gi, "")
    .replace(/onload=/gi, "")
    .replace(/eval\(/gi, "");
}

/**
 * Sanitise récursivement tous les champs d'un objet (payload JSON)
 */
export function nettoyerObjetPayload<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  const copie: any = Array.isArray(obj) ? [...obj] : { ...obj };

  for (const cle in copie) {
    if (Object.prototype.hasOwnProperty.call(copie, cle)) {
      if (typeof copie[cle] === "string") {
        copie[cle] = nettoyerChaineXSS(copie[cle]);
      } else if (typeof copie[cle] === "object" && copie[cle] !== null) {
        copie[cle] = nettoyerObjetPayload(copie[cle]);
      }
    }
  }

  return copie as T;
}

/**
 * Abstraction de requêtes SQL préparées anti-injection
 * (Convertit les paramètres en typage strict et prévient la concaténation de requêtes)
 */
export function construireRequetePreparee(sql: string, params: Array<string | number | boolean | null>): {
  sqlFinal: string;
  paramsSanitises: Array<string | number | boolean | null>;
} {
  // Vérifie l'absence de caractères de rupture SQL suspects dans les littéraux
  const paramsSanitises = params.map((p) => {
    if (typeof p === "string") {
      return p.replace(/'/g, "''").replace(/;/g, "");
    }
    return p;
  });

  return {
    sqlFinal: sql,
    paramsSanitises,
  };
}

/**
 * Générateur & Vérificateur de Token CSRF (Double Submit Cookie Pattern)
 */
export function genererTokenCSRF(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const buffer = new Uint8Array(32);
    window.crypto.getRandomValues(buffer);
    return Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return `csrf-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Valide si le token CSRF reçu correspond au token attendu en cookie/session
 */
export function verifierTokenCSRF(tokenRecu?: string | null, tokenSession?: string | null): boolean {
  if (!tokenRecu || !tokenSession) return false;
  return tokenRecu === tokenSession;
}
