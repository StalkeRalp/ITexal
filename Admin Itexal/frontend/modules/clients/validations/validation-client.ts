import { Client } from "../types/client";

export function validerClient(donnees: Partial<Client>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (!donnees.email || !donnees.email.trim()) {
    erreurs.email = "L'adresse email du client est requise.";
  }

  return erreurs;
}
