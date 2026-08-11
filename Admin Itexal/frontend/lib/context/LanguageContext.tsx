"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Langue = "fr" | "en";

export const TRADUCTIONS = {
  fr: {
    // Navigation & General
    tableauDeBord: "Tableau de Bord",
    produits: "Produits",
    categories: "Catégories",
    marques: "Marques",
    commandes: "Commandes",
    clients: "Clients",
    stocks: "Gestion des Stocks",
    promotions: "Promotions",
    notifications: "Notifications",
    favoris: "Favoris",
    statistiques: "Statistiques",
    contenus: "Contenus & Bannières",
    journalAudit: "Journal d'Audit",
    parametres: "Paramètres & Profil",
    deconnexion: "Déconnexion",
    rechercher: "Rechercher...",
    filtrer: "Filtrer",
    tous: "Tous",
    actif: "Actif",
    inactif: "Inactif",
    statut: "Statut",
    actions: "Actions",
    enregistrer: "Enregistrer",
    annuler: "Annuler",
    supprimer: "Supprimer",
    modifier: "Modifier",
    ajouter: "Ajouter",
    fermer: "Fermer",
    charger: "Chargement...",
    aucunResultat: "Aucun résultat trouvé.",

    // Notifications
    centreNotifications: "Centre de Notifications",
    nonLues: "Non lue(s)",
    toutMarquerLu: "Tout marquer lu",
    purgerTout: "Purger tout",
    alertesCommandes: "Alertes Commandes",
    alertesStock: "Alertes Stock",
    securiteLog: "Sécurité / Log",

    // Profil & Paramètres
    profilAdministrateur: "Profil Administrateur",
    dateNaissance: "Date d'anniversaire",
    role: "Rôle",
    sexe: "Sexe",
    motDePasse: "Mot de passe",
    nouveauMotDePasse: "Nouveau mot de passe",
    confirmerMotDePasse: "Confirmer le mot de passe",

    // Deals & Products
    dealsProduits: "Deals & Offres Spéciales",
    produitPromotion: "Produits en Promotion",
    ajouterAuPanier: "Ajouter au panier",
    voirFiche: "Voir la fiche",
    stockDisponible: "En stock",
    stockRupture: "Rupture de stock",
    reduc: "Réduction",

    // Confirmation
    confirmationTitle: "Confirmation requise",
    confirmationText: "Êtes-vous sûr de vouloir effectuer cette action ?",
    confirmBtn: "Confirmer",

    // Language selector
    langueFrancaise: "Français (FR)",
    langueAnglaise: "English (EN)",
  },
  en: {
    // Navigation & General
    tableauDeBord: "Dashboard",
    produits: "Products",
    categories: "Categories",
    marques: "Brands",
    commandes: "Orders",
    clients: "Customers",
    stocks: "Stock Management",
    promotions: "Promotions",
    notifications: "Notifications",
    favoris: "Favorites",
    statistiques: "Analytics",
    contenus: "Content & Banners",
    journalAudit: "Audit Logs",
    parametres: "Settings & Profile",
    deconnexion: "Logout",
    rechercher: "Search...",
    filtrer: "Filter",
    tous: "All",
    actif: "Active",
    inactif: "Inactive",
    statut: "Status",
    actions: "Actions",
    enregistrer: "Save",
    annuler: "Cancel",
    supprimer: "Delete",
    modifier: "Edit",
    ajouter: "Add",
    fermer: "Close",
    charger: "Loading...",
    aucunResultat: "No results found.",

    // Notifications
    centreNotifications: "Notification Center",
    nonLues: "Unread",
    toutMarquerLu: "Mark all read",
    purgerTout: "Clear all",
    alertesCommandes: "Order Alerts",
    alertesStock: "Stock Alerts",
    securiteLog: "Security / Logs",

    // Profil & Paramètres
    profilAdministrateur: "Admin Profile",
    dateNaissance: "Date of Birth",
    role: "Role",
    sexe: "Gender",
    motDePasse: "Password",
    nouveauMotDePasse: "New password",
    confirmerMotDePasse: "Confirm password",

    // Deals & Products
    dealsProduits: "Deals & Special Offers",
    produitPromotion: "Promotional Products",
    ajouterAuPanier: "Add to cart",
    voirFiche: "View details",
    stockDisponible: "In stock",
    stockRupture: "Out of stock",
    reduc: "Discount",

    // Confirmation
    confirmationTitle: "Confirmation Required",
    confirmationText: "Are you sure you want to proceed with this action?",
    confirmBtn: "Confirm",

    // Language selector
    langueFrancaise: "Français (FR)",
    langueAnglaise: "English (EN)",
  },
};

interface LanguageContextType {
  langue: Langue;
  changerLangue: (langue: Langue) => void;
  t: (cle: keyof typeof TRADUCTIONS["fr"]) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  langue: "fr",
  changerLangue: () => {},
  t: (cle) => TRADUCTIONS.fr[cle] || cle,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langue, setLangue] = useState<Langue>("fr");

  useEffect(() => {
    const enregistree = localStorage.getItem("itexal_langue") as Langue;
    if (enregistree && (enregistree === "fr" || enregistree === "en")) {
      setLangue(enregistree);
    }
  }, []);

  const changerLangue = (nouvelleLangue: Langue) => {
    setLangue(nouvelleLangue);
    localStorage.setItem("itexal_langue", nouvelleLangue);
  };

  const t = (cle: keyof typeof TRADUCTIONS["fr"]) => {
    return TRADUCTIONS[langue]?.[cle] || TRADUCTIONS["fr"][cle] || (cle as string);
  };

  return (
    <LanguageContext.Provider value={{ langue, changerLangue, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
