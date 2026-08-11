"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const PROFIL_CLE = "itexal_profil_admin";

interface ProfilAdmin {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  role: string;
  ville: string;
  pays: string;
  sexe: string;
  dateNaissance: string;
  photoProfil: string;
}

const PROFIL_DEFAUT: ProfilAdmin = {
  prenom: "Kame",
  nom: "Williamson",
  email: "kamewilliamson@gmail.com",
  telephone: "+237 699 00 11 22",
  role: "Super Administrateur",
  ville: "Douala",
  pays: "Cameroun",
  sexe: "Homme",
  dateNaissance: "25/01/2001",
  photoProfil:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
};

interface ProfilContextType {
  profil: ProfilAdmin;
  mettreAJourProfil: (nouveauProfil: Partial<ProfilAdmin>) => void;
  nomComplet: string;
  initiales: string;
}

const ProfilContext = createContext<ProfilContextType>({
  profil: PROFIL_DEFAUT,
  mettreAJourProfil: () => {},
  nomComplet: "Kame Williamson",
  initiales: "KW",
});

export const ProfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profil, setProfil] = useState<ProfilAdmin>(PROFIL_DEFAUT);

  useEffect(() => {
    const local = localStorage.getItem(PROFIL_CLE);
    if (local) {
      try {
        setProfil({ ...PROFIL_DEFAUT, ...JSON.parse(local) });
      } catch (e) {
        console.error("Erreur chargement profil:", e);
      }
    }
  }, []);

  const mettreAJourProfil = (nouveauProfil: Partial<ProfilAdmin>) => {
    const mis = { ...profil, ...nouveauProfil };
    setProfil(mis);
    localStorage.setItem(PROFIL_CLE, JSON.stringify(mis));
    window.dispatchEvent(new Event("itexal_profil_change"));
  };

  const nomComplet = `${profil.prenom} ${profil.nom}`.trim();

  const initiales = `${profil.prenom?.[0] ?? ""}${profil.nom?.[0] ?? ""}`.toUpperCase();

  return (
    <ProfilContext.Provider value={{ profil, mettreAJourProfil, nomComplet, initiales }}>
      {children}
    </ProfilContext.Provider>
  );
};

export const useProfil = () => useContext(ProfilContext);
