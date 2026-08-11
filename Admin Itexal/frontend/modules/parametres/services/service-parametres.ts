import { ClientHTTP } from "@/lib/api/client-http";
import { ParametresGeneraux } from "../types/parametre";
import { ReponseAPI } from "@/types/commun";

export class ServiceParametres {
  public static async obtenirParametres(): Promise<ReponseAPI<ParametresGeneraux>> {
    return ClientHTTP.get<ParametresGeneraux>("/parametres");
  }

  public static async sauvegarderParametres(
    donnees: Partial<ParametresGeneraux>
  ): Promise<ReponseAPI<ParametresGeneraux>> {
    return ClientHTTP.put<ParametresGeneraux, Partial<ParametresGeneraux>>("/parametres", donnees);
  }
}
