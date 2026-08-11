"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface NotificationItem {
  id: string;
  titre: string;
  message: string;
  horodatage: string;
  lue: boolean;
  type: "commande" | "stock" | "securite" | "systeme";
  important?: boolean;
}

const NOTIFICATIONS_INITIALES: NotificationItem[] = [
  {
    id: "notif-1",
    titre: "Nouvelle commande CMD-09 reçue",
    message: "Client : Marie Kouassi • Montant : 45.000 FCFA",
    horodatage: "Il y a 5 minutes",
    lue: false,
    type: "commande",
    important: true,
  },
  {
    id: "notif-2",
    titre: "Alerte de Stock Faible",
    message: "Le Sérum Bio Éclat Karité est passé sous le seuil d'alerte (3 unités restantes).",
    horodatage: "Il y a 25 minutes",
    lue: false,
    type: "stock",
    important: true,
  },
  {
    id: "notif-3",
    titre: "Paiement confirmé pour la commande CMD-05",
    message: "Le règlement de 32.500 FCFA a été validé via Mobile Money.",
    horodatage: "Il y a 2 heures",
    lue: true,
    type: "commande",
  },
  {
    id: "notif-4",
    titre: "Commande CMD-05 expédiée",
    message: "La commande du client Jean Dupont a été remise au livreur express.",
    horodatage: "Hier à 16:40",
    lue: true,
    type: "commande",
  },
  {
    id: "notif-5",
    titre: "Connexion administrateur suspecte",
    message: "Tentative de connexion réussie depuis un nouvel appareil (Abidjan, CI).",
    horodatage: "Hier à 11:15",
    lue: false,
    type: "securite",
  },
];

interface NotificationContextType {
  notifications: NotificationItem[];
  nombreNonLues: number;
  marquerCommeLue: (id: string) => void;
  basculerLecture: (id: string) => void;
  toutMarquerCommeLu: () => void;
  supprimerNotification: (id: string) => void;
  purgerToutesNotifications: () => void;
  ajouterNotification: (notif: Omit<NotificationItem, "id" | "horodatage" | "lue">) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  nombreNonLues: 0,
  marquerCommeLue: () => {},
  basculerLecture: () => {},
  toutMarquerCommeLu: () => {},
  supprimerNotification: () => {},
  purgerToutesNotifications: () => {},
  ajouterNotification: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_INITIALES);

  useEffect(() => {
    const local = localStorage.getItem("itexal_notifications");
    if (local) {
      try {
        setNotifications(JSON.parse(local));
      } catch (e) {
        console.error("Erreur de lecture des notifications", e);
      }
    }
  }, []);

  const sauvegarder = (nouvellesNotifs: NotificationItem[]) => {
    setNotifications(nouvellesNotifs);
    localStorage.setItem("itexal_notifications", JSON.stringify(nouvellesNotifs));
  };

  const nombreNonLues = notifications.filter((n) => !n.lue).length;

  const marquerCommeLue = (id: string) => {
    sauvegarder(
      notifications.map((n) => (n.id === id ? { ...n, lue: true } : n))
    );
  };

  const basculerLecture = (id: string) => {
    sauvegarder(
      notifications.map((n) => (n.id === id ? { ...n, lue: !n.lue } : n))
    );
  };

  const toutMarquerCommeLu = () => {
    sauvegarder(notifications.map((n) => ({ ...n, lue: true })));
  };

  const supprimerNotification = (id: string) => {
    sauvegarder(notifications.filter((n) => n.id !== id));
  };

  const purgerToutesNotifications = () => {
    sauvegarder([]);
  };

  const ajouterNotification = (notif: Omit<NotificationItem, "id" | "horodatage" | "lue">) => {
    const nouvelle: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      horodatage: "À l'instant",
      lue: false,
    };
    sauvegarder([nouvelle, ...notifications]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        nombreNonLues,
        marquerCommeLue,
        basculerLecture,
        toutMarquerCommeLu,
        supprimerNotification,
        purgerToutesNotifications,
        ajouterNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
