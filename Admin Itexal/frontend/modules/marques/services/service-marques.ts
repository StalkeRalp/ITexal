import { ClientHTTP } from "@/lib/api/client-http";
import { Marque } from "../types/marque";
import { ReponseAPI } from "@/types/commun";

export class ServiceMarques {
  public static async lister(): Promise<ReponseAPI<Marque[]>> {
    return ClientHTTP.get<Marque[]>("/marques");
  }
}
