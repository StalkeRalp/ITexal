"use client";

import React, { useState } from "react";

interface ModalFiltreStatutProps {
  ouvert: boolean;
  onFermer: () => void;
  statutsSelectionnes: string[];
  onAppliquer: (statuts: string[]) => void;
}

export const ModalFiltreStatut: React.FC<ModalFiltreStatutProps> = ({
  ouvert,
  onFermer,
  statutsSelectionnes,
  onAppliquer,
}) => {
  const [selection, setSelection] = useState<string[]>(statutsSelectionnes);

  if (!ouvert) return null;

  const statutsDisponibles = [
    "Completed",
    "Processing",
    "Rejected",
    "On Hold",
    "In Transit",
  ];

  const basculerStatut = (st: string) => {
    setSelection((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const appliquer = () => {
    onAppliquer(selection);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Select Order Status
        </h3>

        {/* Options grid / pills */}
        <div className="flex flex-wrap gap-3 py-2">
          {statutsDisponibles.map((st) => {
            const estActif = selection.includes(st);
            return (
              <button
                key={st}
                type="button"
                onClick={() => basculerStatut(st)}
                className={`px-6 py-2.5 rounded-full border text-xs font-bold transition-all ${
                  estActif
                    ? "bg-[#4880FF] text-white border-[#4880FF] shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#4880FF]"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Note */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium">
            *You can choose multiple Order Status
          </p>
        </div>

        {/* Apply Now Button */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={appliquer}
            className="px-10 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
