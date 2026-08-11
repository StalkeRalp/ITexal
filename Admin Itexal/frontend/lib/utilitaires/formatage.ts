/**
 * Utilitaires de formatage (prix, monnaie, dates) pour l'espace Administrateur ITexal
 */

export function formaterPrix(montant: number, devise: string = "FCFA"): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(montant) + ` ${devise}`;
}

export function formaterDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
