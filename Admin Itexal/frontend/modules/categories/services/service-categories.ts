import { ClientHTTP } from "@/lib/api/client-http";
import { Categorie } from "../types/categorie";
import { ReponseAPI } from "@/types/commun";

export class ServiceCategories {
  public static async lister(): Promise<ReponseAPI<Categorie[]>> {
    return ClientHTTP.get<Categorie[]>("/categories");
  }

  public static async creer(donnees: Partial<Categorie>): Promise<ReponseAPI<Categorie>> {
    return ClientHTTP.post<Categorie>("/categories", donnees);
  }
}
