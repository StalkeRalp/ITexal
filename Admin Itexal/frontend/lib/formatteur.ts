import { formatCurrencyLocale, formatDateLocale, type Langue } from "@/lib/i18n";

/**
 * Formate un montant numérique selon la langue choisie
 * FR: 1 250 000 FCFA
 * EN: 1,250,000 XAF
 */
export function formatPrix(montant: number | undefined | null, langue: Langue = "fr"): string {
  if (montant === undefined || montant === null || isNaN(montant)) {
    return langue === "fr" ? "0 FCFA" : "0 XAF";
  }
  return formatCurrencyLocale(montant, langue);
}

export function formatNombre(nombre: number | undefined | null, langue: Langue = "fr"): string {
  if (nombre === undefined || nombre === null || isNaN(nombre)) return "0";
  if (langue === "fr") {
    return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else {
    return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function formatDate(dateStrOrObj: string | Date, langue: Langue = "fr"): string {
  return formatDateLocale(dateStrOrObj, langue);
}
