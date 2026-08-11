"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const FAVORIS_INITIALS = ["prod-1", "prod-3"];

interface FavorisContextType {
  favorisIds: string[];
  estFavori: (id: string) => boolean;
  basculerFavori: (id: string) => void;
  ajouterFavori: (id: string) => void;
  retirerFavori: (id: string) => void;
}

const FavorisContext = createContext<FavorisContextType>({
  favorisIds: FAVORIS_INITIALS,
  estFavori: () => false,
  basculerFavori: () => {},
  ajouterFavori: () => {},
  retirerFavori: () => {},
});

export const FavorisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorisIds, setFavorisIds] = useState<string[]>(FAVORIS_INITIALS);

  const rechargerFavoris = () => {
    const local = localStorage.getItem("itexal_favoris");
    if (local) {
      try {
        setFavorisIds(JSON.parse(local));
      } catch (e) {
        console.error("Erreur de chargement des favoris", e);
      }
    }
  };

  useEffect(() => {
    rechargerFavoris();

    const handler = () => rechargerFavoris();
    window.addEventListener("itexal_favoris_change", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("itexal_favoris_change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const sauvegarder = (nouveauxFavoris: string[]) => {
    setFavorisIds(nouveauxFavoris);
    localStorage.setItem("itexal_favoris", JSON.stringify(nouveauxFavoris));
    window.dispatchEvent(new Event("itexal_favoris_change"));
  };

  const estFavori = (id: string) => favorisIds.includes(id);

  const basculerFavori = (id: string) => {
    if (favorisIds.includes(id)) {
      sauvegarder(favorisIds.filter((favId) => favId !== id));
    } else {
      sauvegarder([...favorisIds, id]);
    }
  };

  const ajouterFavori = (id: string) => {
    if (!favorisIds.includes(id)) {
      sauvegarder([...favorisIds, id]);
    }
  };

  const retirerFavori = (id: string) => {
    sauvegarder(favorisIds.filter((favId) => favId !== id));
  };

  return (
    <FavorisContext.Provider
      value={{ favorisIds, estFavori, basculerFavori, ajouterFavori, retirerFavori }}
    >
      {children}
    </FavorisContext.Provider>
  );
};

export const useFavoris = () => useContext(FavorisContext);
