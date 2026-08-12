"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";

interface ModalFiltreTypeProps {
  ouvert: boolean;
  onFermer: () => void;
  typesSelectionnes: string[];
  onAppliquer: (types: string[]) => void;
}

export const ModalFiltreType: React.FC<ModalFiltreTypeProps> = ({
  ouvert,
  onFermer,
  typesSelectionnes,
  onAppliquer,
}) => {
  const { t } = useLanguage();
  const [selection, setSelection] = useState<string[]>(typesSelectionnes);

  if (!ouvert) return null;

  const typesDisponibles = [
    "Soin Visage",
    "Gamme Capillaire",
    "Soin du Corps",
    "Huiles Essentielles",
    "Fashion & Beauty",
  ];

  const basculerType = (t: string) => {
    setSelection((prev) =>
      prev.includes(t) ? prev.filter((s) => s !== t) : [...prev, t]
    );
  };

  const appliquer = () => {
    onAppliquer(selection);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
          {t("clients.orderType")}
        </h3>

        {/* Options grid / pills */}
        <div className="flex flex-wrap gap-3 py-2">
          {typesDisponibles.map((typ) => {
            const estActif = selection.includes(typ);
            return (
              <button
                key={typ}
                type="button"
                onClick={() => basculerType(typ)}
                className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  estActif
                    ? "bg-[#4880FF] text-white border-[#4880FF] shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#4880FF]"
                }`}
              >
                {typ}
              </button>
            );
          })}
        </div>

        {/* Apply Button */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={appliquer}
            className="px-10 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
          >
            {t("common.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
