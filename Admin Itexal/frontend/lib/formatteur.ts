/**
 * Formate un montant numérique de manière déterministe (sans décalage SSR/Client)
 * Exemple: 12000 => "12 000"
 */
export function formatPrix(montant: number | undefined | null): string {
  if (montant === undefined || montant === null || isNaN(montant)) return "0";
  return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatNombre(nombre: number | undefined | null): string {
  if (nombre === undefined || nombre === null || isNaN(nombre)) return "0";
  return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
