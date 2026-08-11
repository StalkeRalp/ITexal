"use client";

import React from "react";
import { LogAudit } from "../types/journal";
import {
  AlertCircleIcon,
  InformationCircleIcon,
  Cancel01Icon,
  File01Icon,
  Copy01Icon,
  Globe02Icon,
} from "hugeicons-react";

interface ModalDetailLogProps {
  log: LogAudit | null;
  onFermer: () => void;
}

export const ModalDetailLog: React.FC<ModalDetailLogProps> = ({
  log,
  onFermer,
}) => {
  if (!log) return null;

  const renduBadgeSeverite = (niveau: string) => {
    switch (niveau) {
      case "Critique":
        return (
          <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-700 text-xs font-black flex items-center gap-1.5">
            <AlertCircleIcon size={14} /> Critique / Sécurité
          </span>
        );
      case "Avertissement":
        return (
          <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1.5">
            <AlertCircleIcon size={14} /> Avertissement
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5">
            <InformationCircleIcon size={14} /> Information
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4880FF] text-white font-extrabold flex items-center justify-center text-lg shadow-md">
              <File01Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Détail de l'Événement d'Audit #{log.id}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Traçabilité et empreinte de sécurité ITexal Admin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors text-xs"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          <div className="flex items-center justify-between bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                HORODATAGE SYSTÈME
              </span>
              <p className="text-sm font-extrabold text-slate-800 font-mono mt-0.5">
                {log.horodatage}
              </p>
            </div>

            {renduBadgeSeverite(log.niveauSeverite)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                UTILISATEUR & RÔLE
              </span>
              <div className="flex items-center gap-2 pt-1">
                <img
                  src={log.avatarUtilisateur}
                  alt={log.nomUtilisateur}
                  className="w-7 h-7 rounded-full bg-slate-200"
                />
                <div>
                  <p className="font-bold text-slate-800">{log.nomUtilisateur}</p>
                  <p className="text-[10px] text-[#4880FF] font-semibold">
                    {log.roleUtilisateur}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                EMPREINTE RÉSEAU
              </span>
              <p className="font-bold text-slate-800 font-mono mt-1 flex items-center gap-1">
                <Globe02Icon size={14} className="text-[#4880FF]" /> IP : {log.adresseIP}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {log.naviguerNavigateur || "Chrome 127.0.0 (Linux x86_64)"}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
              ACTION EFFECTUÉE & DESCRIPTION
            </span>
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/80 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#4880FF] text-white font-mono font-bold text-[10px] rounded">
                  {log.action}
                </span>
                <span className="font-bold text-slate-700">
                  Module : {log.typeEvenement}
                </span>
              </div>
              <p className="text-slate-800 text-xs font-semibold pt-1">
                {log.description}
              </p>
            </div>
          </div>

          {log.donneesSensibles && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                PAYLOAD / DONNÉES CONCERNÉES (JSON)
              </span>
              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto">
                {JSON.stringify(log.donneesSensibles, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              alert(`Copie de l'événement #${log.id} dans le presse-papier.`)
            }
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs flex items-center gap-1.5"
          >
            <Copy01Icon size={14} />
            <span>Copier Log ID</span>
          </button>

          <button
            type="button"
            onClick={onFermer}
            className="px-6 py-2 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 text-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
