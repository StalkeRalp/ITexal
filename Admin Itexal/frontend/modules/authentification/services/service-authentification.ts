import { ClientHTTP } from "@/lib/api/client-http";
import { RequeteConnexion, SessionAdministrateur } from "../types/authentification";
import { ReponseAPI } from "@/types/commun";

export class ServiceAuthentification {
  public static async connecter(donnees: RequeteConnexion): Promise<ReponseAPI<SessionAdministrateur>> {
    return ClientHTTP.post<SessionAdministrateur, RequeteConnexion>("/auth/connexion", donnees);
  }

  public static async deconnecter(): Promise<ReponseAPI<void>> {
    return ClientHTTP.post<void>("/auth/deconnexion", {});
  }
}
