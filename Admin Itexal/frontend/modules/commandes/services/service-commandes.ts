import { ClientHTTP } from "@/lib/api/client-http";
import { Commande, StatutCommande } from "../types/commande";
import { ReponseAPI, ReponsePaginee } from "@/types/commun";

export class ServiceCommandes {
  public static async lister(page = 1, limite = 10): Promise<ReponsePaginee<Commande>> {
    return ClientHTTP.get<Commande[]>(`/commandes?page=${page}&limite=${limite}`) as Promise<ReponsePaginee<Commande>>;
  }

  public static async changerStatut(id: string, statut: StatutCommande): Promise<ReponseAPI<Commande>> {
    return ClientHTTP.put<Commande, { statut: StatutCommande }>(`/commandes/${id}/statut`, { statut });
  }
}
