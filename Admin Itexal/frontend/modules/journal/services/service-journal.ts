import { ClientHTTP } from "@/lib/api/client-http";
import { EntreeJournal } from "../types/journal";
import { ReponsePaginee } from "@/types/commun";

export class ServiceJournal {
  public static async lister(page = 1, limite = 20): Promise<ReponsePaginee<EntreeJournal>> {
    return ClientHTTP.get<EntreeJournal[]>(`/journal?page=${page}&limite=${limite}`) as Promise<ReponsePaginee<EntreeJournal>>;
  }
}
