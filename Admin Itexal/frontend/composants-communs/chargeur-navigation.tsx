"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const ChargeurNavigation: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Écran de chargement au lancement initial du site
  const [chargementInitial, setChargementInitial] = useState(true);
  const [fonduChargement, setFonduChargement] = useState(false);

  // Barre de progression légère lors de la navigation
  const [navigationEnCours, setNavigationEnCours] = useState(false);

  useEffect(() => {
    // Timer au lancement initial du site
    const timerFondu = setTimeout(() => {
      setFonduChargement(true);
    }, 1200);

    const timerMasquer = setTimeout(() => {
      setChargementInitial(false);
    }, 1500);

    return () => {
      clearTimeout(timerFondu);
      clearTimeout(timerMasquer);
    };
  }, []);

  // Détection du changement de page (navigation)
  useEffect(() => {
    setNavigationEnCours(true);
    const timer = setTimeout(() => {
      setNavigationEnCours(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {/* 1. Écran de chargement au lancement du site */}
      {chargementInitial && (
        <div
          className={`fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-300 ${
            fonduChargement ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="loader"></div>
          </div>

          <div className="mt-12 text-center space-y-2 animate-pulse">
            <h1 className="text-xl font-black text-white tracking-widest uppercase">
              ITEXAL <span className="text-[#4880FF]">COSMÉCEUTIQUES</span>
            </h1>
            <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Initialisation du Back-Office Administrateur...
            </p>
          </div>
        </div>
      )}

      {/* 2. Barre de chargement fluide en haut lors des changements de page */}
      {navigationEnCours && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-slate-800 overflow-hidden pointer-events-none">
          <div className="h-full bg-gradient-to-r from-[#4880FF] via-blue-400 to-[#00B69B] animate-top-bar shadow-md shadow-blue-500/50" />
        </div>
      )}
    </>
  );
};
