import { ClientHTTP } from "@/lib/api/client-http";
import { Client } from "../types/client";
import { ReponsePaginee } from "@/types/commun";

export class ServiceClients {
  public static async lister(page = 1, limite = 10): Promise<ReponsePaginee<Client>> {
    return ClientHTTP.get<Client[]>(`/clients?page=${page}&limite=${limite}`) as Promise<ReponsePaginee<Client>>;
  }
}
