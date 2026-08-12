"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Produit } from "@/types/produit";
import { Categorie } from "@/types/categorie";
import { Marque } from "@/types/marque";
import { Promotion } from "@/types/promotion";
import {
  genererProduitsInitiaux,
  genererCategoriesInitiales,
  genererMarquesInitiales,
  genererPromotionsInitiales,
} from "@/lib/data/initial-seed";

interface ProduitsContextType {
  produits: Produit[];
  categories: Categorie[];
  marques: Marque[];
  promotions: Promotion[];
  estCharge: boolean;
  
  // Actions Produits
  creerProduit: (nouveau: Omit<Produit, "id" | "creeLe">) => void;
  modifierProduit: (id: string, modifs: Partial<Produit>) => void;
  supprimerProduit: (id: string) => void;
  modifierStockProduit: (id: string, nouveauStock: number) => void;
  modifierStockEtSeuils: (id: string, nouveauStock: number, seuilMin: number, seuilMax?: number) => void;
  
  // Actions Catégories
  creerCategorie: (nom: string, description?: string, image?: string) => void;
  modifierCategorie: (id: string, nom: string, description?: string, image?: string) => void;
  supprimerCategorie: (id: string) => void;

  // Actions Marques
  creerMarque: (nom: string, description?: string, paysOrigine?: string) => void;
  modifierMarque: (id: string, nom: string, description?: string) => void;
  supprimerMarque: (id: string) => void;

  // Actions Promotions
  creerPromotion: (promo: Omit<Promotion, "id" | "creeLe" | "nombreUtilisations">) => void;
  modifierPromotion: (id: string, modifs: Partial<Promotion>) => void;
  supprimerPromotion: (id: string) => void;
  
  rechargerDonnees: () => void;
}

const ProduitsContext = createContext<ProduitsContextType>({
  produits: [],
  categories: [],
  marques: [],
  promotions: [],
  estCharge: false,
  creerProduit: () => {},
  modifierProduit: () => {},
  supprimerProduit: () => {},
  modifierStockProduit: () => {},
  modifierStockEtSeuils: () => {},
  creerCategorie: () => {},
  modifierCategorie: () => {},
  supprimerCategorie: () => {},
  creerMarque: () => {},
  modifierMarque: () => {},
  supprimerMarque: () => {},
  creerPromotion: () => {},
  modifierPromotion: () => {},
  supprimerPromotion: () => {},
  rechargerDonnees: () => {},
});

export const ProduitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [marques, setMarques] = useState<Marque[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [charge, setCharge] = useState(false);

  const initialiserDonnees = () => {
    const initProds = genererProduitsInitiaux();
    const initCats = genererCategoriesInitiales(initProds);
    const initMars = genererMarquesInitiales(initProds);
    const initProms = genererPromotionsInitiales();

    const localProds = localStorage.getItem("itexal_produits");
    const localCats = localStorage.getItem("itexal_categories");
    const localMars = localStorage.getItem("itexal_marques");
    const localProms = localStorage.getItem("itexal_promotions");

    const prodsFinal = localProds ? JSON.parse(localProds) : initProds;
    const catsFinal = localCats ? JSON.parse(localCats) : initCats;
    const marsFinal = localMars ? JSON.parse(localMars) : initMars;
    const promsFinal = localProms ? JSON.parse(localProms) : initProms;

    setProduits(prodsFinal);
    setCategories(catsFinal);
    setMarques(marsFinal);
    setPromotions(promsFinal);
    
    if (!localProds) localStorage.setItem("itexal_produits", JSON.stringify(initProds));
    if (!localCats) localStorage.setItem("itexal_categories", JSON.stringify(initCats));
    if (!localMars) localStorage.setItem("itexal_marques", JSON.stringify(initMars));
    if (!localProms) localStorage.setItem("itexal_promotions", JSON.stringify(initProms));
    
    setCharge(true);
  };

  useEffect(() => {
    initialiserDonnees();
  }, []);

  const sauvegarderProds = (nouveaux: Produit[]) => {
    setProduits(nouveaux);
    localStorage.setItem("itexal_produits", JSON.stringify(nouveaux));
  };

  const sauvegarderCats = (nouvelles: Categorie[]) => {
    setCategories(nouvelles);
    localStorage.setItem("itexal_categories", JSON.stringify(nouvelles));
  };

  const sauvegarderMars = (nouvelles: Marque[]) => {
    setMarques(nouvelles);
    localStorage.setItem("itexal_marques", JSON.stringify(nouvelles));
  };

  const sauvegarderProms = (nouvelles: Promotion[]) => {
    setPromotions(nouvelles);
    localStorage.setItem("itexal_promotions", JSON.stringify(nouvelles));
  };

  // Actions Produits
  const creerProduit = (nouveauData: Omit<Produit, "id" | "creeLe">) => {
    const nouveau: Produit = {
      ...nouveauData,
      id: `prod-${Date.now()}`,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderProds([nouveau, ...produits]);
  };

  const modifierProduit = (id: string, modifs: Partial<Produit>) => {
    sauvegarderProds(
      produits.map((p) => (p.id === id ? { ...p, ...modifs, misAJourLe: new Date().toLocaleDateString("fr-FR") } : p))
    );
  };

  const supprimerProduit = (id: string) => {
    sauvegarderProds(produits.filter((p) => p.id !== id));
  };

  const modifierStockProduit = (id: string, nouveauStock: number) => {
    sauvegarderProds(
      produits.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, nouveauStock), disponible: nouveauStock > 0 } : p
      )
    );
  };

  const modifierStockEtSeuils = (id: string, nouveauStock: number, seuilMin: number, seuilMax?: number) => {
    sauvegarderProds(
      produits.map((p) =>
        p.id === id
          ? {
              ...p,
              stock: Math.max(0, nouveauStock),
              seuilAlerte: seuilMin,
              seuilAlerteMax: seuilMax,
              disponible: nouveauStock > 0,
            }
          : p
      )
    );
  };

  // Actions Catégories
  const creerCategorie = (nom: string, description?: string, image?: string) => {
    const id = `cat-${Date.now()}`;
    const nouvelle: Categorie = {
      id,
      nom,
      slug: nom.toLowerCase().trim().replace(/[\s\W]+/g, "-"),
      description,
      image,
      nombreProduits: 0,
      ordreAffichage: categories.length + 1,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderCats([...categories, nouvelle]);
  };

  const modifierCategorie = (id: string, nom: string, description?: string, image?: string) => {
    sauvegarderCats(
      categories.map((c) => (c.id === id ? { ...c, nom, description, image: image !== undefined ? image : c.image } : c))
    );
  };

  const supprimerCategorie = (id: string) => {
    sauvegarderCats(categories.filter((c) => c.id !== id));
  };

  // Actions Marques
  const creerMarque = (nom: string, description?: string, paysOrigine?: string) => {
    const id = `mar-${nom.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    const nouvelle: Marque = {
      id,
      nom,
      slug: id,
      description,
      paysOrigine,
      nombreProduits: 0,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderMars([...marques, nouvelle]);
  };

  const modifierMarque = (id: string, nom: string, description?: string) => {
    sauvegarderMars(
      marques.map((m) => (m.id === id ? { ...m, nom, description } : m))
    );
  };

  const supprimerMarque = (id: string) => {
    sauvegarderMars(marques.filter((m) => m.id !== id));
  };

  // Actions Promotions
  const creerPromotion = (promo: Omit<Promotion, "id" | "creeLe" | "nombreUtilisations">) => {
    const nouvelle: Promotion = {
      ...promo,
      id: `promo-${Date.now()}`,
      nombreUtilisations: 0,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderProms([nouvelle, ...promotions]);
  };

  const modifierPromotion = (id: string, modifs: Partial<Promotion>) => {
    sauvegarderProms(
      promotions.map((pr) => (pr.id === id ? { ...pr, ...modifs } : pr))
    );
  };

  const supprimerPromotion = (id: string) => {
    sauvegarderProms(promotions.filter((p) => p.id !== id));
  };

  return (
    <ProduitsContext.Provider
      value={{
        produits,
        categories,
        marques,
        promotions,
        estCharge: charge,
        creerProduit,
        modifierProduit,
        supprimerProduit,
        modifierStockProduit,
        modifierStockEtSeuils,
        creerCategorie,
        modifierCategorie,
        supprimerCategorie,
        creerMarque,
        modifierMarque,
        supprimerMarque,
        creerPromotion,
        modifierPromotion,
        supprimerPromotion,
        rechargerDonnees: initialiserDonnees,
      }}
    >
      {children}
    </ProduitsContext.Provider>
  );
};

export const useProduits = () => useContext(ProduitsContext);
