"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Commande, StatutCommande } from "@/types/commande";
import { Client } from "@/types/client";
import { genererClientsInitiaux, genererCommandesInitiales } from "@/lib/data/initial-seed";
import { useProduits } from "./ProduitsContext";

interface CommandesContextType {
  commandes: Commande[];
  clients: Client[];
  
  // Actions Commandes
  creerCommande: (nouvelleCmd: Omit<Commande, "id" | "reference" | "dateCommande">) => Commande;
  modifierStatutCommande: (id: string, statut: StatutCommande) => void;
  supprimerCommande: (id: string) => void;
  
  // Actions Clients
  creerClient: (nouveau: Omit<Client, "id" | "commandesEffectuees" | "totalDepense" | "dateInscription">) => void;
  modifierClient: (id: string, modifs: Partial<Client>) => void;
  supprimerClient: (id: string) => void;

  rechargerCommandes: () => void;
}

const CommandesContext = createContext<CommandesContextType>({
  commandes: [],
  clients: [],
  creerCommande: () => ({} as Commande),
  modifierStatutCommande: () => {},
  supprimerCommande: () => {},
  creerClient: () => {},
  modifierClient: () => {},
  supprimerClient: () => {},
  rechargerCommandes: () => {},
});

export const CommandesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { produits, estCharge, modifierStockProduit } = useProduits();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Garde pour éviter de re-générer les données une fois qu'elles sont en localStorage
  const initialiseRef = React.useRef(false);

  useEffect(() => {
    // Attendre que les produits soient chargés avant de générer les commandes
    if (!estCharge || produits.length === 0) return;
    // Ne re-générer qu'une seule fois
    if (initialiseRef.current) return;
    initialiseRef.current = true;

    const initClients = genererClientsInitiaux();
    const initCmds = genererCommandesInitiales(initClients, produits);

    const localClients = localStorage.getItem("itexal_clients");
    const localCmds = localStorage.getItem("itexal_commandes");

    const clientsFinal = localClients ? JSON.parse(localClients) : initClients;
    // Si les commandes sauvegardées sont vides (cas du premier lancement), on utilise les générées
    const cmdsSaved = localCmds ? JSON.parse(localCmds) : null;
    const cmdsFinal = (cmdsSaved && cmdsSaved.length > 0) ? cmdsSaved : initCmds;

    setClients(clientsFinal);
    setCommandes(cmdsFinal);

    if (!localClients) localStorage.setItem("itexal_clients", JSON.stringify(initClients));
    if (!cmdsSaved || cmdsSaved.length === 0) {
      localStorage.setItem("itexal_commandes", JSON.stringify(initCmds));
    }
  }, [estCharge, produits.length]);

  const sauvegarderCmds = (nouvelles: Commande[]) => {
    setCommandes(nouvelles);
    localStorage.setItem("itexal_commandes", JSON.stringify(nouvelles));
  };

  const sauvegarderClients = (nouveaux: Client[]) => {
    setClients(nouveaux);
    localStorage.setItem("itexal_clients", JSON.stringify(nouveaux));
  };

  const creerCommande = (cmdData: Omit<Commande, "id" | "reference" | "dateCommande">): Commande => {
    const nextRefNum = commandes.length + 1;
    const refStr = `CMD-${String(nextRefNum).padStart(2, "0")}`;
    const dateStr = new Date().toLocaleDateString("fr-FR") + " à " + new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    const nouvelle: Commande = {
      ...cmdData,
      id: `cmd-${Date.now()}`,
      reference: refStr,
      dateCommande: dateStr,
    };

    // Synchroniser la déduction de stock pour chaque produit de la commande
    cmdData.articles.forEach((art) => {
      const prodCourant = produits.find((p) => p.id === art.produitId);
      if (prodCourant) {
        modifierStockProduit(prodCourant.id, prodCourant.stock - art.quantite);
      }
    });

    // Mettre à jour le client concerné (nombre de commandes & total dépensé)
    const clientExt = clients.find((c) => c.id === cmdData.clientId);
    if (clientExt) {
      modifierClient(clientExt.id, {
        commandesEffectuees: clientExt.commandesEffectuees + 1,
        totalDepense: clientExt.totalDepense + cmdData.montantTotal,
        derniereCommandeLe: dateStr,
      });
    }

    sauvegarderCmds([nouvelle, ...commandes]);
    return nouvelle;
  };

  const modifierStatutCommande = (id: string, statut: StatutCommande) => {
    sauvegarderCmds(
      commandes.map((c) => {
        if (c.id === id) {
          const updated: Commande = {
            ...c,
            statut,
            statutPaiement: statut === "annulee" ? "rembourse" : statut === "en_attente" ? "en_attente" : "paye",
            statutLivraison: statut === "livree" ? "livree" : statut === "expediee" ? "en_cours" : "en_attente",
          };
          return updated;
        }
        return c;
      })
    );
  };

  const supprimerCommande = (id: string) => {
    sauvegarderCmds(commandes.filter((c) => c.id !== id));
  };

  // Actions Clients
  const creerClient = (clientData: Omit<Client, "id" | "commandesEffectuees" | "totalDepense" | "dateInscription">) => {
    const nouveau: Client = {
      ...clientData,
      id: `cli-${Date.now()}`,
      commandesEffectuees: 0,
      totalDepense: 0,
      dateInscription: new Date().toLocaleDateString("fr-FR"),
    };
    sauvegarderClients([nouveau, ...clients]);
  };

  const modifierClient = (id: string, modifs: Partial<Client>) => {
    sauvegarderClients(
      clients.map((c) => (c.id === id ? { ...c, ...modifs } : c))
    );
  };

  const supprimerClient = (id: string) => {
    sauvegarderClients(clients.filter((c) => c.id !== id));
  };

  return (
    <CommandesContext.Provider
      value={{
        commandes,
        clients,
        creerCommande,
        modifierStatutCommande,
        supprimerCommande,
        creerClient,
        modifierClient,
        supprimerClient,
        rechargerCommandes: () => {},
      }}
    >
      {children}
    </CommandesContext.Provider>
  );
};

export const useCommandes = () => useContext(CommandesContext);
