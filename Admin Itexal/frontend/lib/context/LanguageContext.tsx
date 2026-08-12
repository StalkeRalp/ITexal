"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Langue, getTranslation, formatCurrencyLocale, formatDateLocale } from "@/lib/i18n";

export type { Langue };

interface LanguageContextType {
  langue: Langue;
  changerLangue: (langue: Langue) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formaterPrix: (montant: number) => string;
  formaterDate: (date: string | Date) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  langue: "fr",
  changerLangue: () => {},
  t: (key) => key,
  formaterPrix: (m) => `${m} FCFA`,
  formaterDate: (d) => String(d),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langue, setLangue] = useState<Langue>("fr");

  useEffect(() => {
    // Premier acces: Francais par defaut, ou preference localStorage si presente
    const enregistree = localStorage.getItem("itexal_langue") as Langue;
    if (enregistree === "fr" || enregistree === "en") {
      setLangue(enregistree);
    } else {
      setLangue("fr");
      localStorage.setItem("itexal_langue", "fr");
    }

    const handleStorage = (e: CustomEvent<{ langue: Langue }>) => {
      if (e.detail && (e.detail.langue === "fr" || e.detail.langue === "en")) {
        setLangue(e.detail.langue);
      }
    };

    window.addEventListener("itexal_langue_change" as any, handleStorage);
    return () => {
      window.removeEventListener("itexal_langue_change" as any, handleStorage);
    };
  }, []);

  const changerLangue = (nouvelleLangue: Langue) => {
    if (nouvelleLangue !== "fr" && nouvelleLangue !== "en") return;
    setLangue(nouvelleLangue);
    localStorage.setItem("itexal_langue", nouvelleLangue);
    localStorage.setItem("itexal_lang", nouvelleLangue); // fallback sync
    
    // Broadcast event for dynamic updates without page reload
    window.dispatchEvent(
      new CustomEvent("itexal_langue_change", { detail: { langue: nouvelleLangue } })
    );
    window.dispatchEvent(new Event("itexal_lang_change"));
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    return getTranslation(langue, key, params);
  };

  const formaterPrix = (montant: number): string => {
    return formatCurrencyLocale(montant, langue);
  };

  const formaterDate = (date: string | Date): string => {
    return formatDateLocale(date, langue);
  };

  return (
    <LanguageContext.Provider value={{ langue, changerLangue, t, formaterPrix, formaterDate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
