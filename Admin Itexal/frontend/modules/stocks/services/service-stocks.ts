import { ClientHTTP } from "@/lib/api/client-http";
import { AlerteStock, MouvementStock } from "../types/stock";
import { ReponseAPI } from "@/types/commun";

export class ServiceStocks {
  public static async obtenirAlertes(): Promise<ReponseAPI<AlerteStock[]>> {
    return ClientHTTP.get<AlerteStock[]>("/stocks/alertes");
  }

  public static async ajusterStock(
    produitId: string,
    quantite: number,
    motif: string
  ): Promise<ReponseAPI<MouvementStock>> {
    return ClientHTTP.post<MouvementStock, { produitId: string; quantite: number; motif: string }>(
      "/stocks/ajustement",
      { produitId, quantite, motif }
    );
  }
}
