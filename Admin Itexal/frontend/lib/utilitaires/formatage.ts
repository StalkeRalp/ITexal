/**
 * Utilitaires de formatage (prix, monnaie, dates) pour l'espace Administrateur Cosmetic Admin
 */

export function formaterPrix(montant: number, devise: string = "FCFA"): string {
  if (isNaN(montant) || montant === null || montant === undefined) return `0 ${devise}`;
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(montant) + ` ${devise}`
  );
}

export function formaterDate(date: string | Date | undefined | null, inclureHeure: boolean = true): string {
  if (!date) return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "12 août 2026";

  if (inclureHeure) {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formaterDateCourte(date: string | Date | undefined | null): string {
  if (!date) return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "12/08/2026";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}
