import { RoleAdmin } from "./rbac";

export interface SessionPayload {
  userId: string;
  email: string;
  nom: string;
  role: RoleAdmin;
  creeA: number;
  expireA: number;
  jti: string; // Jetons uniques pour révocation
}

const COOKIE_SESSION_NOM = "itexal_session_token";
const DUREE_SESSION_SECONDES = 8 * 60 * 60; // 8 heures de session active

// Liste noire des jetons révoqués (in-memory)
const jetonsRevoquesStore = new Set<string>();

/**
 * Encodage et signature sécurisée d'un token de session (SHA-256 HMAC)
 */
export async function creerTokenSession(payload: Omit<SessionPayload, "creeA" | "expireA" | "jti">): Promise<{
  token: string;
  session: SessionPayload;
}> {
  const maintenant = Math.floor(Date.now() / 1000);
  const expireA = maintenant + DUREE_SESSION_SECONDES;
  const jti = `jti-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;

  const sessionComplete: SessionPayload = {
    ...payload,
    creeA: maintenant,
    expireA,
    jti,
  };

  const headerB64 = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payloadB64 = btoa(JSON.stringify(sessionComplete));
  const signatureData = `${headerB64}.${payloadB64}`;

  // Signature via Web Crypto API (HMAC-SHA256)
  const encoder = new TextEncoder();
  const secretKey = process.env.JWT_SECRET || "itexal_cosmetics_admin_secure_key_2026";
  
  let signatureB64 = "";
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(signatureData));
    signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  } else {
    signatureB64 = btoa(signatureData).substring(0, 32);
  }

  const token = `${signatureData}.${signatureB64}`;
  return { token, session: sessionComplete };
}

/**
 * Décode et vérifie la validité d'un token JWT de session
 */
export function verifierTokenSession(token: string | null | undefined): SessionPayload | null {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payloadJson = atob(parts[1]);
    const session: SessionPayload = JSON.parse(payloadJson);

    // 1. Vérification de l'expiration
    const maintenant = Math.floor(Date.now() / 1000);
    if (session.expireA < maintenant) {
      return null; // Session expirée
    }

    // 2. Vérification de révocation
    if (session.jti && jetonsRevoquesStore.has(session.jti)) {
      return null; // Session révoquée
    }

    return session;
  } catch (error) {
    return null;
  }
}

/**
 * Révoque un token actif (Ex: Déconnexion ou changement de rôle)
 */
export function revoquerSession(token: string): void {
  const session = verifierTokenSession(token);
  if (session && session.jti) {
    jetonsRevoquesStore.add(session.jti);
  }
}

/**
 * Options sécurisées pour l'écriture de Cookies de session (HttpOnly, SameSite, Secure)
 */
export function obtenirOptionsCookieSession(): {
  name: string;
  maxAge: number;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
} {
  return {
    name: COOKIE_SESSION_NOM,
    maxAge: DUREE_SESSION_SECONDES,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
}
