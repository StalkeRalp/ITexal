"use client";

import React, { useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

interface ModalFiltreCalendrierProps {
  ouvert: boolean;
  onFermer: () => void;
  dateSelectionnee: string;
  onAppliquer: (date: string) => void;
}

export const ModalFiltreCalendrier: React.FC<ModalFiltreCalendrierProps> = ({
  ouvert,
  onFermer,
  dateSelectionnee,
  onAppliquer,
}) => {
  const [moisNom] = useState("February 2026");
  const [jourSelectionne, setJourSelectionne] = useState<number>(14);

  if (!ouvert) return null;

  const joursLegende = ["S", "M", "T", "W", "T", "F", "S"];

  // Days matrix for February 2026 (starting Sunday Feb 1)
  const joursPrécédents = [27, 28, 29, 30];
  const joursDuMois = Array.from({ length: 31 }, (_, i) => i + 1);

  const appliquer = () => {
    onAppliquer(`${jourSelectionne} Feb 2026`);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-6">
        {/* Header month & prev/next arrows */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-extrabold text-slate-800">
            {moisNom}
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Mois précédent"
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors"
            >
              <ArrowLeft01Icon size={14} />
            </button>
            <button
              type="button"
              aria-label="Mois suivant"
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors"
            >
              <ArrowRight01Icon size={14} />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center text-xs font-extrabold text-slate-400">
          {joursLegende.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold">
          {/* Previous month grey days */}
          {joursPrécédents.map((day) => (
            <span key={`prev-${day}`} className="py-2 text-slate-300">
              {day}
            </span>
          ))}

          {/* Current month days */}
          {joursDuMois.map((day) => {
            const estSelectionne = day === jourSelectionne;
            return (
              <button
                key={`curr-${day}`}
                type="button"
                onClick={() => setJourSelectionne(day)}
                className={`py-2 rounded-xl transition-all font-bold ${
                  estSelectionne
                    ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20 scale-105"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Note */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium">
            *You can choose multiple date
          </p>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={appliquer}
            className="w-full py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
