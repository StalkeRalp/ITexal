import { ClientHTTP } from "@/lib/api/client-http";
import { OffreVedette, CategoriePopulaire } from "../types/home";
import { ReponseAPI } from "@/types/commun";

export class ServiceHome {
  public static async obtenirOffresVedettes(): Promise<ReponseAPI<OffreVedette[]>> {
    return ClientHTTP.get<OffreVedette[]>("/home/offres");
  }

  public static async obtenirCategoriesPopulaires(): Promise<ReponseAPI<CategoriePopulaire[]>> {
    return ClientHTTP.get<CategoriePopulaire[]>("/home/categories");
  }
}
