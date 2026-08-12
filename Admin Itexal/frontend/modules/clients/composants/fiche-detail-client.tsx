"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { exporterFicheClientPDF } from "@/lib/utilitaires/exportateur";
import {
  Add01Icon,
  Cancel01Icon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
  Edit02Icon,
  Delete02Icon,
  Download01Icon,
} from "hugeicons-react";

export interface ClientComplet {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateInscrit: string;
  typeGamme: string;
  statut: "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit";
  genre?: "Male" | "Female";
  avatar?: string;
  metier?: string;
  totalDepense?: number;
  totalCommandes?: number;
}

interface FicheDetailClientProps {
  client: ClientComplet | null;
  onFermer: () => void;
  onEditer?: (client: ClientComplet) => void;
  onSupprimer?: (id: string) => void;
  onOuvrirToutesLesInfos?: (client: ClientComplet) => void;
}

export const FicheDetailClient: React.FC<FicheDetailClientProps> = ({
  client,
  onFermer,
  onEditer,
  onSupprimer,
  onOuvrirToutesLesInfos,
}) => {
  const { t, formaterPrix } = useLanguage();
  const [barSurvolee, setBarSurvolee] = useState<number | null>(1);

  if (!client) return null;

  const depense = client.totalDepense || 455000;
  const nbCommandes = client.totalCommandes || 14;

  const exporterPDF = () => {
    exporterFicheClientPDF({
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
      genre: client.genre || "Male",
      typeGamme: client.typeGamme,
      statut: client.statut,
      totalDepense: depense,
      totalCommandes: nbCommandes,
      dateInscrit: client.dateInscrit,
      avatar: client.avatar,
      metier: client.metier,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between animate-fadeIn relative">
      {/* Top action buttons */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {t("clients.customerFile")}
        </span>
        <div className="flex items-center gap-2">
          {onOuvrirToutesLesInfos && (
            <button
              type="button"
              onClick={() => onOuvrirToutesLesInfos(client)}
              aria-label={t("clients.viewAllInfos")}
              className="w-7 h-7 rounded-full bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold flex items-center justify-center shadow-sm transition-all hover:scale-105 cursor-pointer"
              title={t("clients.viewAllInfos")}
            >
              <Add01Icon size={15} strokeWidth={2.5} />
            </button>
          )}
          <button
            type="button"
            onClick={onFermer}
            aria-label={t("common.close")}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold flex items-center justify-center text-xs transition-colors cursor-pointer"
            title={t("common.close")}
          >
            <Cancel01Icon size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Centered Avatar & Primary Info */}
      <div className="flex flex-col items-center text-center space-y-2 pt-1">
        <div className="w-20 h-20 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm shrink-0 bg-slate-100 flex items-center justify-center">
          {client.avatar ? (
            <img
              src={client.avatar}
              alt={client.nom}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-black text-[#5B63F6]">
              {client.nom.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-800 leading-tight">
            {client.nom}
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {client.metier || t("clients.vipClient")}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#5B63F6] text-[11px] font-extrabold">
            {client.typeGamme}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
              client.genre === "Female"
                ? "bg-rose-50 text-rose-500"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {client.genre === "Female" ? t("clients.female") : t("clients.male")}
          </span>
        </div>
      </div>

      {/* Details Contact List */}
      <div className="space-y-3 bg-[#F8F9FD] p-4 rounded-2xl border border-slate-100 text-xs">
        <div className="flex items-center gap-3 text-slate-700">
          <Mail01Icon size={16} className="text-[#5B63F6] shrink-0" />
          <span className="truncate font-medium">{client.email}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-700">
          <CallIcon size={16} className="text-[#5B63F6] shrink-0" />
          <span className="font-medium">{client.telephone}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-700">
          <Location01Icon size={16} className="text-[#5B63F6] shrink-0" />
          <span className="font-medium truncate">{client.adresse}</span>
        </div>
      </div>

      {/* Donut Stats & Dépense */}
      <div className="space-y-3">
        <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t("clients.totalSpent")}
          </span>
          <p className="text-base font-black text-[#5B63F6]">
            {formaterPrix(depense)} ({nbCommandes} cmd)
          </p>
        </div>
      </div>

      {/* Export & Action buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={exporterPDF}
          className="w-full py-2.5 px-3 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download01Icon size={16} />
          <span>{t("orders.downloadPDF")}</span>
        </button>

        <div className="flex items-center gap-2">
          {onEditer && (
            <button
              type="button"
              onClick={() => onEditer(client)}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit02Icon size={14} />
              <span>{t("common.edit")}</span>
            </button>
          )}
          {onSupprimer && (
            <button
              type="button"
              onClick={() => onSupprimer(client.id)}
              className="flex-1 py-2 px-3 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Delete02Icon size={14} />
              <span>{t("common.delete")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
