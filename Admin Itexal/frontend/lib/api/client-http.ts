/**
 * Client HTTP centralisé pour les requêtes API de l'espace Administrateur ITexal
 */

import { ReponseAPI } from "@/types/commun";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface OptionsRequete extends RequestInit {
  jeton?: string;
}

export class ClientHTTP {
  private static obtenirEnTetes(jeton?: string): HeadersInit {
    const enTetes: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (jeton) {
      enTetes["Authorization"] = `Bearer ${jeton}`;
    }

    return enTetes;
  }

  public static async get<T>(url: string, options?: OptionsRequete): Promise<ReponseAPI<T>> {
    const reponse = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: this.obtenirEnTetes(options?.jeton),
      ...options,
    });
    return reponse.json();
  }

  public static async post<T, D = unknown>(
    url: string,
    donnees: D,
    options?: OptionsRequete
  ): Promise<ReponseAPI<T>> {
    const reponse = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: this.obtenirEnTetes(options?.jeton),
      body: JSON.stringify(donnees),
      ...options,
    });
    return reponse.json();
  }

  public static async put<T, D = unknown>(
    url: string,
    donnees: D,
    options?: OptionsRequete
  ): Promise<ReponseAPI<T>> {
    const reponse = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: this.obtenirEnTetes(options?.jeton),
      body: JSON.stringify(donnees),
      ...options,
    });
    return reponse.json();
  }

  public static async delete<T>(url: string, options?: OptionsRequete): Promise<ReponseAPI<T>> {
    const reponse = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: this.obtenirEnTetes(options?.jeton),
      ...options,
    });
    return reponse.json();
  }
}
