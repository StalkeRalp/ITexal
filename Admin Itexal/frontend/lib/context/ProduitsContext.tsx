"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Produit } from "@/modules/produits/types/produit";

export const PRODUITS_INITIALS: Produit[] = [
  {
    id: "prod-1",
    nom: "Sérum Visage Éclat Bio Karité",
    reference: "REF-1001",
    categorieId: "cat-1",
    nomCategorie: "Soin du Visage",
    marqueId: "mar-1",
    nomMarque: "ITexal Cosméceutiques",
    description:
      "Sérum concentré en acide hyaluronique et vitamine C naturelle pour un teint éclatant.",
    prix: 15000,
    prixPromotionnel: 10500,
    stock: 42,
    disponible: true,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    ],
    composition: "Aqua, Vitamin C, Hyaluronic Acid, Aloe Vera",
    typeDePeau: "Toutes peaux",
    contenance: "50ml",
    origine: "Cameroun",
    conseilsUtilisation: "Appliquer 3 gouttes le matin avant la crème.",
    creeLe: "01/08/2026",
  },
  {
    id: "prod-2",
    nom: "Crème Hydratante Onctueuse Karité Gold",
    reference: "REF-1002",
    categorieId: "cat-3",
    nomCategorie: "Soin du Corps",
    marqueId: "mar-2",
    nomMarque: "Karité Gold Africa",
    description:
      "Nourrit intensément les peaux sèches et déshydratées. Enrichie en beurre de karité brut.",
    prix: 18500,
    prixPromotionnel: 13875,
    stock: 28,
    disponible: true,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    ],
    typeDePeau: "Peaux sèches",
    contenance: "200ml",
    origine: "Cameroun",
    creeLe: "03/08/2026",
  },
  {
    id: "prod-3",
    nom: "Lotion Tonique Équilibrante Bio",
    reference: "REF-1003",
    categorieId: "cat-1",
    nomCategorie: "Soin du Visage",
    marqueId: "mar-1",
    nomMarque: "ITexal Cosméceutiques",
    description: "Lotion rafraîchissante aux extraits de camomille et de rose sauvage.",
    prix: 15000,
    prixPromotionnel: 12000,
    stock: 19,
    disponible: true,
    images: [
      "https://images.unsplash.com/photo-1608248597261-e4d091444d32?w=600&auto=format&fit=crop&q=80",
    ],
    contenance: "150ml",
    origine: "Cameroun",
    creeLe: "04/08/2026",
  },
  {
    id: "prod-4",
    nom: "Masque Capillaire Nourrissant Argan Luxe",
    reference: "REF-1004",
    categorieId: "cat-2",
    nomCategorie: "Gamme Capillaire",
    marqueId: "mar-3",
    nomMarque: "Argan Bio Luxe",
    description: "Soin réparateur intense pour cheveux très secs, frisés et crépus.",
    prix: 22500,
    stock: 35,
    disponible: true,
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80",
    ],
    contenance: "300ml",
    origine: "Maroc",
    creeLe: "05/08/2026",
  },
];

interface ProduitsContextType {
  produits: Produit[];
  creerProduit: (nouveau: Omit<Produit, "id" | "creeLe">) => void;
  modifierProduit: (id: string, modifs: Partial<Produit>) => void;
  supprimerProduit: (id: string) => void;
}

const ProduitsContext = createContext<ProduitsContextType>({
  produits: PRODUITS_INITIALS,
  creerProduit: () => {},
  modifierProduit: () => {},
  supprimerProduit: () => {},
});

export const ProduitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [produits, setProduits] = useState<Produit[]>(PRODUITS_INITIALS);

  useEffect(() => {
    const local = localStorage.getItem("itexal_produits");
    if (local) {
      try {
        setProduits(JSON.parse(local));
      } catch (e) {
        console.error("Erreur chargement produits local", e);
      }
    }
  }, []);

  const sauvegarder = (nouveaux: Produit[]) => {
    setProduits(nouveaux);
    localStorage.setItem("itexal_produits", JSON.stringify(nouveaux));
  };

  const creerProduit = (nouveauData: Omit<Produit, "id" | "creeLe">) => {
    const nouveau: Produit = {
      ...nouveauData,
      id: `prod-${Date.now()}`,
      creeLe: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarder([nouveau, ...produits]);
  };

  const modifierProduit = (id: string, modifs: Partial<Produit>) => {
    sauvegarder(
      produits.map((p) => (p.id === id ? { ...p, ...modifs } : p))
    );
  };

  const supprimerProduit = (id: string) => {
    sauvegarder(produits.filter((p) => p.id !== id));
  };

  return (
    <ProduitsContext.Provider value={{ produits, creerProduit, modifierProduit, supprimerProduit }}>
      {children}
    </ProduitsContext.Provider>
  );
};

export const useProduits = () => useContext(ProduitsContext);
