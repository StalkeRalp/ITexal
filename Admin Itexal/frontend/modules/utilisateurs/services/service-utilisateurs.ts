import { ClientHTTP } from "@/lib/api/client-http";
import { UtilisateurAdmin } from "../types/utilisateur";
import { ReponseAPI } from "@/types/commun";

export class ServiceUtilisateurs {
  public static async lister(): Promise<ReponseAPI<UtilisateursAdmin[]>> {
    return ClientHTTP.get<UtilisateurAdmin[]>("/utilisateurs");
  }

  public static async creer(donnees: Partial<UtilisateurAdmin>): Promise<ReponseAPI<UtilisateurAdmin>> {
    return ClientHTTP.post<UtilisateurAdmin>("/utilisateurs", donnees);
  }
}
type UtilisateursAdmin = UtilisateurAdmin;
