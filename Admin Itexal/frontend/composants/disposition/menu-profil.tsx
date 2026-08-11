"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown01Icon, User02Icon, Logout01Icon } from "hugeicons-react";

export const MenuProfil: React.FC = () => {
  const [estOuvert, setEstOuvert] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setEstOuvert(!estOuvert)}
        className="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-xl hover:bg-slate-50 transition-all focus:outline-none"
        aria-label="Menu profil utilisateur"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-[#4880FF] flex items-center justify-center text-white font-bold shadow-xs">
          MR
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-bold text-slate-800 leading-tight">Moni Roy</p>
          <p className="text-xs text-slate-400 font-medium">Administrateur</p>
        </div>
        <ArrowDown01Icon size={14} className={`text-slate-400 ml-1 transition-transform ${estOuvert ? "rotate-180" : ""}`} />
      </button>

      {estOuvert && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-800">Moni Roy</p>
            <p className="text-[11px] text-slate-400 font-mono">admin@itexal.cm</p>
          </div>
          <Link
            href="/admin/parametres"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-600 hover:text-[#4880FF] hover:bg-blue-50/70 font-semibold transition-colors"
          >
            <User02Icon size={16} strokeWidth={2} />
            <span>Mon Profil & Paramètres</span>
          </Link>
          <Link
            href="/connexion"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 font-semibold border-t border-slate-100 transition-colors"
          >
            <Logout01Icon size={16} strokeWidth={2} />
            <span>Se déconnecter</span>
          </Link>
        </div>
      )}
    </div>
  );
};
