"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertCircleIcon, Cancel01Icon, Tick01Icon } from "hugeicons-react";

interface ModalConfirmationProps {
  ouvert: boolean;
  titre?: string;
  message: string;
  texteConfirmer?: string;
  texteAnnuler?: string;
  variante?: "danger" | "warning" | "info";
  onConfirmer: () => void;
  onAnnuler: () => void;
}

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  ouvert,
  titre = "Confirmation requise",
  message,
  texteConfirmer = "Confirmer",
  texteAnnuler = "Annuler",
  variante = "danger",
  onConfirmer,
  onAnnuler,
}) => {
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setMonte(true);
  }, []);

  if (!ouvert || !monte) return null;

  const couleursHeader = {
    danger: "bg-rose-50 text-rose-500 border-rose-100",
    warning: "bg-amber-50 text-amber-500 border-amber-100",
    info: "bg-blue-50 text-[#4880FF] border-blue-100",
  };

  const couleursBouton = {
    danger: "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-white",
    info: "bg-[#4880FF] hover:bg-blue-600 shadow-blue-500/20 text-white",
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-6 text-center space-y-4">
          <div
            className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border ${couleursHeader[variante]}`}
          >
            <AlertCircleIcon size={28} strokeWidth={2} />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-800">{titre}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onAnnuler}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {texteAnnuler}
          </button>
          <button
            type="button"
            onClick={onConfirmer}
            className={`px-6 py-2.5 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${couleursBouton[variante]}`}
          >
            <Tick01Icon size={16} strokeWidth={2.5} />
            <span>{texteConfirmer}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
