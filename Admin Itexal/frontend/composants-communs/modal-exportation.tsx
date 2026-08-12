"use client";

import React, { useState } from "react";
import {
  Download01Icon,
  Cancel01Icon,
  File01Icon,
  DocumentCodeIcon,
  CheckmarkCircle02Icon,
} from "hugeicons-react";

interface ModalExportationProps {
  ouvert: boolean;
  titre: string;
  description: string;
  nombreElements?: number;
  onFermer: () => void;
  onExporter: (format: "pdf" | "csv") => void;
}

export const ModalExportation: React.FC<ModalExportationProps> = ({
  ouvert,
  titre,
  description,
  nombreElements,
  onFermer,
  onExporter,
}) => {
  const [formatSelectionne, setFormatSelectionne] = useState<"pdf" | "csv">("pdf");

  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center font-bold">
              <Download01Icon size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-800">{titre}</h3>
              <p className="text-xs text-slate-500 font-medium">Choisissez le format de sortie</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-colors border border-slate-200"
          >
            <Cancel01Icon size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {description}
            {nombreElements !== undefined && (
              <span className="block mt-1 font-bold text-[#5B63F6]">
                • Total d'enregistrements concernés : {nombreElements} élément(s)
              </span>
            )}
          </p>

          {/* Format selection cards */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Format d'exportation souhaité
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Option PDF */}
              <button
                type="button"
                onClick={() => setFormatSelectionne("pdf")}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                  formatSelectionne === "pdf"
                    ? "border-[#5B63F6] bg-indigo-50/40 text-[#5B63F6] shadow-sm"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                {formatSelectionne === "pdf" && (
                  <span className="absolute top-3 right-3 text-[#5B63F6]">
                    <CheckmarkCircle02Icon size={18} />
                  </span>
                )}
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-3">
                  <File01Icon size={20} />
                </div>
                <div>
                  <span className="font-extrabold text-xs block text-slate-900">Format PDF</span>
                  <span className="text-[10px] text-slate-500 font-medium">Rapport Imprimable</span>
                </div>
              </button>

              {/* Option CSV */}
              <button
                type="button"
                onClick={() => setFormatSelectionne("csv")}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                  formatSelectionne === "csv"
                    ? "border-[#5B63F6] bg-indigo-50/40 text-[#5B63F6] shadow-sm"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                {formatSelectionne === "csv" && (
                  <span className="absolute top-3 right-3 text-[#5B63F6]">
                    <CheckmarkCircle02Icon size={18} />
                  </span>
                )}
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
                  <DocumentCodeIcon size={20} />
                </div>
                <div>
                  <span className="font-extrabold text-xs block text-slate-900">Format CSV</span>
                  <span className="text-[10px] text-slate-500 font-medium">Fichier Excel / Data</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onFermer}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={() => {
              onExporter(formatSelectionne);
              onFermer();
            }}
            className="px-6 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Download01Icon size={16} />
            <span>Générer et Exporter ({formatSelectionne.toUpperCase()})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
