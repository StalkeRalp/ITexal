import { ClientHTTP } from "@/lib/api/client-http";
import { Promotion } from "../types/promotion";
import { ReponseAPI } from "@/types/commun";

export class ServicePromotions {
  public static async lister(): Promise<ReponseAPI<Promotion[]>> {
    return ClientHTTP.get<Promotion[]>("/promotions");
  }
}
