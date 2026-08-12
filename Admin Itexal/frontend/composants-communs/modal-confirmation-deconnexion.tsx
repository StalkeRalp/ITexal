"use client";

import React from "react";
import { Logout01Icon, AlertCircleIcon, Cancel01Icon } from "hugeicons-react";

interface ModalConfirmationDeconnexionProps {
  estOuvert: boolean;
  surFermer: () => void;
  surConfirmer: () => void;
}

export const ModalConfirmationDeconnexion: React.FC<ModalConfirmationDeconnexionProps> = ({
  estOuvert,
  surFermer,
  surConfirmer,
}) => {
  if (!estOuvert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-scaleUp text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture en haut à droite */}
        <button
          type="button"
          onClick={surFermer}
          aria-label="Fermer la boîte de dialogue"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Cancel01Icon size={18} />
        </button>

        {/* Icone d'avertissement / déconnexion stylisée */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
          <Logout01Icon size={32} strokeWidth={2.2} />
        </div>

        {/* Titre & Message */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Confirmer la déconnexion
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            Êtes-vous sûr de vouloir vous déconnecter de votre session <span className="font-bold text-slate-800">Cosmetic Admin</span> ?
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={surFermer}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={() => {
              surFermer();
              surConfirmer();
            }}
            className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Logout01Icon size={16} strokeWidth={2.5} />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
