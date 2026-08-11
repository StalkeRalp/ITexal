import React from "react";
import { Cancel01Icon } from "hugeicons-react";

interface ModalProps {
  ouvert: boolean;
  surFermeture: () => void;
  titre: string;
  children: React.ReactNode;
  piedDePage?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  ouvert,
  surFermeture,
  titre,
  children,
  piedDePage,
}) => {
  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* En-tête modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-slate-100">{titre}</h3>
          <button
            type="button"
            onClick={surFermeture}
            aria-label="Fermer la fenêtre"
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-slate-800"
          >
            <Cancel01Icon size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Corps modal */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        {/* Pied de page modal */}
        {piedDePage && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/50">
            {piedDePage}
          </div>
        )}
      </div>
    </div>
  );
};
