import { ClientHTTP } from "@/lib/api/client-http";
import { Banniere } from "../types/contenu";
import { ReponseAPI } from "@/types/commun";

export class ServiceContenus {
  public static async listerBannieres(): Promise<ReponseAPI<Banniere[]>> {
    return ClientHTTP.get<Banniere[]>("/contenus/bannieres");
  }
}
