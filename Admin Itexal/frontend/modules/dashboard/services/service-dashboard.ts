import { ClientHTTP } from "@/lib/api/client-http";
import { StatistiquesDashboard } from "../types/dashboard";
import { ReponseAPI } from "@/types/commun";

export class ServiceDashboard {
  public static async obtenirStatistiques(): Promise<ReponseAPI<StatistiquesDashboard>> {
    return ClientHTTP.get<StatistiquesDashboard>("/dashboard/statistiques");
  }
}
