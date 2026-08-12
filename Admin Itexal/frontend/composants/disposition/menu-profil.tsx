"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useProfil } from "@/lib/context/ProfilContext";
import { useAuth } from "@/lib/context/AuthContext";
import { ArrowDown01Icon, User02Icon, Logout01Icon, Settings02Icon } from "hugeicons-react";
import { ModalConfirmationDeconnexion } from "@/composants-communs/modal-confirmation-deconnexion";

export const MenuProfil: React.FC = () => {
  const { profil, nomComplet, initiales } = useProfil();
  const { seDeconnecter } = useAuth();
  const [estOuvert, setEstOuvert] = useState(false);
  const [modalDeconnexionOuvert, setModalDeconnexionOuvert] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setEstOuvert(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setEstOuvert(!estOuvert)}
        className="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-xl hover:bg-slate-50 transition-all focus:outline-none group"
        aria-label="Menu profil utilisateur"
      >
        {/* Avatar avec photo de profil ou initiales */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm shrink-0 bg-gradient-to-tr from-rose-400 to-[#4880FF]">
          {profil.photoProfil ? (
            <img
              src={profil.photoProfil}
              alt={nomComplet}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-black text-sm">
              {initiales}
            </div>
          )}
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-sm font-bold text-slate-800 leading-tight">{nomComplet}</p>
          <p className="text-xs text-slate-400 font-medium">{profil.role}</p>
        </div>
        <ArrowDown01Icon
          size={14}
          className={`text-slate-400 ml-1 transition-transform duration-200 ${estOuvert ? "rotate-180" : ""}`}
        />
      </button>

      {estOuvert && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
          {/* En-tête du menu avec photo */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm shrink-0 bg-gradient-to-tr from-rose-400 to-[#4880FF]">
              {profil.photoProfil ? (
                <img
                  src={profil.photoProfil}
                  alt={nomComplet}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black text-sm">
                  {initiales}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{nomComplet}</p>
              <p className="text-[11px] text-slate-400 font-mono truncate">{profil.email}</p>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-blue-50 text-[#4880FF] text-[9px] font-black rounded-full border border-blue-100">
                {profil.role}
              </span>
            </div>
          </div>

          <Link
            href="/admin/parametres"
            onClick={() => setEstOuvert(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-600 hover:text-[#4880FF] hover:bg-blue-50/70 font-semibold transition-colors"
          >
            <User02Icon size={16} strokeWidth={2} />
            <span>Mon Profil</span>
          </Link>

          <Link
            href="/admin/parametres"
            onClick={() => setEstOuvert(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-600 hover:text-[#4880FF] hover:bg-blue-50/70 font-semibold transition-colors"
          >
            <Settings02Icon size={16} strokeWidth={2} />
            <span>Paramètres</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setEstOuvert(false);
              setModalDeconnexionOuvert(true);
            }}
            className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 font-semibold border-t border-slate-100 transition-colors mt-1 cursor-pointer"
          >
            <Logout01Icon size={16} strokeWidth={2} />
            <span>Se déconnecter</span>
          </button>
        </div>
      )}

      {/* Modal de confirmation de déconnexion */}
      <ModalConfirmationDeconnexion
        estOuvert={modalDeconnexionOuvert}
        surFermer={() => setModalDeconnexionOuvert(false)}
        surConfirmer={seDeconnecter}
      />
    </div>
  );
};
