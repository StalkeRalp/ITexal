"use client";

import React, { createContext, useContext, useState } from "react";
import { Tick01Icon, AlertCircleIcon, Cancel01Icon } from "hugeicons-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  titre?: string;
  message: string;
}

interface ToastContextType {
  ajouterToast: (toast: Omit<ToastMessage, "id">) => void;
  succes: (message: string, titre?: string) => void;
  erreur: (message: string, titre?: string) => void;
  info: (message: string, titre?: string) => void;
  avertissement: (message: string, titre?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  ajouterToast: () => {},
  succes: () => {},
  erreur: () => {},
  info: () => {},
  avertissement: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const ajouterToast = (toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const nouveau = { ...toast, id };
    setToasts((prev) => [...prev, nouveau]);

    setTimeout(() => {
      supprimerToast(id);
    }, 4000);
  };

  const supprimerToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const succes = (message: string, titre = "Succès") => {
    ajouterToast({ type: "success", titre, message });
  };

  const erreur = (message: string, titre = "Erreur") => {
    ajouterToast({ type: "error", titre, message });
  };

  const info = (message: string, titre = "Information") => {
    ajouterToast({ type: "info", titre, message });
  };

  const avertissement = (message: string, titre = "Attention") => {
    ajouterToast({ type: "warning", titre, message });
  };

  return (
    <ToastContext.Provider value={{ ajouterToast, succes, erreur, info, avertissement }}>
      {children}

      {/* Render Toast Floating Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto bg-white rounded-2xl p-4 shadow-xl border flex items-start gap-3 transition-all animate-slideUp ${
              t.type === "success"
                ? "border-emerald-200 text-emerald-800"
                : t.type === "error"
                ? "border-rose-200 text-rose-800"
                : t.type === "warning"
                ? "border-amber-200 text-amber-800"
                : "border-blue-200 text-[#4880FF]"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shrink-0 mt-0.5 ${
                t.type === "success"
                  ? "bg-emerald-500"
                  : t.type === "error"
                  ? "bg-rose-500"
                  : t.type === "warning"
                  ? "bg-amber-500"
                  : "bg-[#4880FF]"
              }`}
            >
              {t.type === "success" ? (
                <Tick01Icon size={18} strokeWidth={2.5} />
              ) : (
                <AlertCircleIcon size={18} strokeWidth={2} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {t.titre && <h4 className="font-extrabold text-xs text-slate-800">{t.titre}</h4>}
              <p className="text-xs text-slate-600 font-medium leading-tight mt-0.5">
                {t.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => supprimerToast(t.id)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <Cancel01Icon size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
