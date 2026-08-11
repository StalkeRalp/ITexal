import { ClientHTTP } from "@/lib/api/client-http";
import { Produit } from "../types/produit";
import { ReponseAPI, ReponsePaginee } from "@/types/commun";

export class ServiceProduits {
  public static async lister(page = 1, limite = 10): Promise<ReponsePaginee<Produit>> {
    return ClientHTTP.get<Produit[]>(`/produits?page=${page}&limite=${limite}`) as Promise<ReponsePaginee<Produit>>;
  }

  public static async obtenirParId(id: string): Promise<ReponseAPI<Produit>> {
    return ClientHTTP.get<Produit>(`/produits/${id}`);
  }

  public static async creer(produit: Omit<Produit, "id" | "creeLe">): Promise<ReponseAPI<Produit>> {
    return ClientHTTP.post<Produit, Omit<Produit, "id" | "creeLe">>("/produits", produit);
  }

  public static async modifier(id: string, produit: Partial<Produit>): Promise<ReponseAPI<Produit>> {
    return ClientHTTP.put<Produit, Partial<Produit>>(`/produits/${id}`, produit);
  }

  public static async supprimer(id: string): Promise<ReponseAPI<void>> {
    return ClientHTTP.delete<void>(`/produits/${id}`);
  }
}
