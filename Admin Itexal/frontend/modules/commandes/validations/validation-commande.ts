import { StatutCommande } from "../types/commande";

export function validerChangementStatut(statut: string): boolean {
  const statutsValides: StatutCommande[] = [
    "Completed",
    "Processing",
    "Rejected",
    "On Hold",
    "In Transit",
  ];
  return statutsValides.includes(statut as StatutCommande);
}
