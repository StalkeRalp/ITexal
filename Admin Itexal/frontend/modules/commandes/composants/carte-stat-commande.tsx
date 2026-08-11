"use client";

import React from "react";
import { ChartIncreaseIcon, ChartDecreaseIcon } from "hugeicons-react";

interface CarteStatProps {
  titre: string;
  valeur: string;
  tendance: string;
  estHaut: boolean;
  icone: React.ReactNode;
  couleurBgIcone: string;
}

export const CarteStatCommande: React.FC<CarteStatProps> = ({
  titre,
  valeur,
  tendance,
  estHaut,
  icone,
  couleurBgIcone,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-500">{titre}</span>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          {valeur}
        </h2>
        <div className="flex items-center gap-1.5 pt-1 text-xs">
          <span
            className={`font-bold flex items-center gap-1 ${
              estHaut ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {estHaut ? (
              <ChartIncreaseIcon size={14} strokeWidth={2.5} />
            ) : (
              <ChartDecreaseIcon size={14} strokeWidth={2.5} />
            )}
            <span>{tendance}</span>
          </span>
          <span className="text-slate-400">vs mois dernier</span>
        </div>
      </div>

      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 ${couleurBgIcone}`}
      >
        {icone}
      </div>
    </div>
  );
};
