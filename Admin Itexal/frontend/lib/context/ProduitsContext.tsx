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
import { enregistrerLogActivite } from "@/lib/securite/journalisation-securite";
import { nettoyerChaineXSS, nettoyerObjetPayload } from "@/lib/securite/protection-injections";
import { validerDonneesProduit } from "@/lib/securite/validation-serveur";

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
  creerMarque: (nom: string, description?: string, paysOrigine?: string, logo?: string) => void;
  modifierMarque: (id: string, nom: string, description?: string, logo?: string) => void;
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

  // Actions Produits avec validation & sanitisation XSS
  const creerProduit = (nouveauData: Omit<Produit, "id" | "creeLe">) => {
    const donneesNettoyees = nettoyerObjetPayload(nouveauData);

    const validation = validerDonneesProduit(donneesNettoyees);
    if (!validation.valide) {
      console.warn("Validation produit échouée:", validation.erreurs);
    }

    const nouveau: Produit = {
      ...donneesNettoyees,
      id: `prod-${Date.now()}`,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderProds([nouveau, ...produits]);

    enregistrerLogActivite({
      utilisateurId: "usr_admin_01",
      nomUtilisateur: "Kame Williamson",
      roleUtilisateur: "Super Administrateur",
      typeEvenement: "Produits",
      action: "CREATION_PRODUIT",
      description: `Nouveau produit créé : ${nouveau.nom} (${nouveau.prix} FCFA)`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });
  };

  const modifierProduit = (id: string, modifs: Partial<Produit>) => {
    const modifsNettoyees = nettoyerObjetPayload(modifs);
    sauvegarderProds(
      produits.map((p) => (p.id === id ? { ...p, ...modifsNettoyees, misAJourLe: new Date().toLocaleDateString("fr-FR") } : p))
    );

    enregistrerLogActivite({
      utilisateurId: "usr_admin_01",
      nomUtilisateur: "Kame Williamson",
      roleUtilisateur: "Super Administrateur",
      typeEvenement: "Produits",
      action: "MODIFICATION_PRODUIT",
      description: `Produit ID ${id} mis à jour.`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });
  };

  const supprimerProduit = (id: string) => {
    const produitCible = produits.find((p) => p.id === id);
    sauvegarderProds(produits.filter((p) => p.id !== id));

    enregistrerLogActivite({
      utilisateurId: "usr_admin_01",
      nomUtilisateur: "Kame Williamson",
      roleUtilisateur: "Super Administrateur",
      typeEvenement: "Produits",
      action: "SUPPRESSION_PRODUIT",
      description: `Produit supprimé : ${produitCible?.nom || id}`,
      niveauSeverite: "Critique",
      adresseIP: "197.234.221.14",
    });
  };

  const modifierStockProduit = (id: string, nouveauStock: number) => {
    const stockClean = Math.max(0, Math.floor(nouveauStock));
    sauvegarderProds(
      produits.map((p) =>
        p.id === id ? { ...p, stock: stockClean, disponible: stockClean > 0 } : p
      )
    );

    enregistrerLogActivite({
      utilisateurId: "usr_admin_01",
      nomUtilisateur: "Kame Williamson",
      roleUtilisateur: "Gestionnaire de Stock",
      typeEvenement: "Stock",
      action: "MISE_A_JOUR_STOCK",
      description: `Mise à jour rapide du stock pour le produit ID ${id} -> ${stockClean} unités.`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });
  };

  const modifierStockEtSeuils = (id: string, nouveauStock: number, seuilMin: number, seuilMax?: number) => {
    const stockClean = Math.max(0, Math.floor(nouveauStock));
    const seuilMinClean = Math.max(0, Math.floor(seuilMin));
    const seuilMaxClean = seuilMax !== undefined ? Math.max(seuilMinClean, Math.floor(seuilMax)) : undefined;

    sauvegarderProds(
      produits.map((p) =>
        p.id === id
          ? {
              ...p,
              stock: stockClean,
              seuilAlerte: seuilMinClean,
              seuilAlerteMax: seuilMaxClean,
              disponible: stockClean > 0,
            }
          : p
      )
    );

    enregistrerLogActivite({
      utilisateurId: "usr_admin_01",
      nomUtilisateur: "Kame Williamson",
      roleUtilisateur: "Gestionnaire de Stock",
      typeEvenement: "Stock",
      action: "AJUSTEMENT_SEUILS_STOCK",
      description: `Stock et seuils réajustés pour le produit ID ${id} (Nouveau stock: ${stockClean}, Min: ${seuilMinClean})`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });
  };

  // Actions Catégories
  const creerCategorie = (nom: string, description?: string, image?: string) => {
    const nomClean = nettoyerChaineXSS(nom.trim());
    const descClean = description ? nettoyerChaineXSS(description.trim()) : undefined;

    const id = `cat-${Date.now()}`;
    const nouvelle: Categorie = {
      id,
      nom: nomClean,
      slug: nomClean.toLowerCase().replace(/[\s\W]+/g, "-"),
      description: descClean,
      image,
      nombreProduits: 0,
      ordreAffichage: categories.length + 1,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderCats([...categories, nouvelle]);

    enregistrerLogActivite({
      utilisateurId: "usr_admin_01",
      nomUtilisateur: "Kame Williamson",
      roleUtilisateur: "Super Administrateur",
      typeEvenement: "Produits",
      action: "CREATION_CATEGORIE",
      description: `Nouvelle catégorie créée : ${nomClean}`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });
  };

  const modifierCategorie = (id: string, nom: string, description?: string, image?: string) => {
    const nomClean = nettoyerChaineXSS(nom.trim());
    const descClean = description ? nettoyerChaineXSS(description.trim()) : undefined;

    sauvegarderCats(
      categories.map((c) => (c.id === id ? { ...c, nom: nomClean, description: descClean, image: image !== undefined ? image : c.image } : c))
    );
  };

  const supprimerCategorie = (id: string) => {
    sauvegarderCats(categories.filter((c) => c.id !== id));
  };

  // Actions Marques
  const creerMarque = (nom: string, description?: string, paysOrigine?: string, logo?: string) => {
    const nomClean = nettoyerChaineXSS(nom.trim());
    const descClean = description ? nettoyerChaineXSS(description.trim()) : undefined;

    const nouvelle: Marque = {
      id: `marq-${Date.now()}`,
      nom: nomClean,
      slug: nomClean.toLowerCase().replace(/[\s\W]+/g, "-"),
      description: descClean,
      logo: logo || undefined,
      paysOrigine: paysOrigine || "Cameroun",
      nombreProduits: 0,
      statut: "Active",
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderMars([...marques, nouvelle]);
  };

  const modifierMarque = (id: string, nom: string, description?: string, logo?: string) => {
    const nomClean = nettoyerChaineXSS(nom.trim());
    sauvegarderMars(
      marques.map((m) => (
        m.id === id
          ? { ...m, nom: nomClean, description: description ? nettoyerChaineXSS(description) : m.description, logo: logo !== undefined ? logo : m.logo }
          : m
      ))
    );
  };

  const supprimerMarque = (id: string) => {
    sauvegarderMars(marques.filter((m) => m.id !== id));
  };

  // Actions Promotions
  const creerPromotion = (promo: Omit<Promotion, "id" | "creeLe" | "nombreUtilisations">) => {
    const promoClean = nettoyerObjetPayload(promo);
    const nouvelle: Promotion = {
      ...promoClean,
      id: `promo-${Date.now()}`,
      nombreUtilisations: 0,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderProms([...promotions, nouvelle]);
  };

  const modifierPromotion = (id: string, modifs: Partial<Promotion>) => {
    const modifsClean = nettoyerObjetPayload(modifs);
    sauvegarderProms(
      promotions.map((p) => (p.id === id ? { ...p, ...modifsClean } : p))
    );
  };

  const supprimerPromotion = (id: string) => {
    sauvegarderProms(promotions.filter((p) => p.id !== id));
  };

  const rechargerDonnees = () => {
    initialiserDonnees();
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
        rechargerDonnees,
      }}
    >
      {children}
    </ProduitsContext.Provider>
  );
};

export const useProduits = () => {
  const context = useContext(ProduitsContext);
  if (!context) {
    throw new Error("useProduits doit être utilisé au sein d'un ProduitsProvider");
  }
  return context;
};
