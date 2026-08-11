"use client";

import React, { useState } from "react";
import { formatPrix } from "@/lib/formatteur";
import {
  Add01Icon,
  Cancel01Icon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
  Edit02Icon,
  Delete02Icon,
  MoreHorizontalIcon,
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
  const [barSurvolee, setBarSurvolee] = useState<number | null>(1);

  if (!client) return null;

  const depense = client.totalDepense || 455000;
  const nbCommandes = client.totalCommandes || 14;

  const barresData = [
    { mois: "Jan", val: 40, montant: "15 500 FCFA" },
    { mois: "Feb", val: 80, highlight: "2.33k", montant: "85 000 FCFA" },
    { mois: "Mar", val: 55, montant: "32 000 FCFA" },
    { mois: "Apr", val: 70, montant: "48 500 FCFA" },
    { mois: "May", val: 90, montant: "92 000 FCFA" },
    { mois: "Jun", val: 95, montant: "120 000 FCFA" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between animate-fadeIn relative">
      {/* Top action buttons (Close & View All) */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Fiche Client
        </span>
        <div className="flex items-center gap-2">
          {onOuvrirToutesLesInfos && (
            <button
              type="button"
              onClick={() => onOuvrirToutesLesInfos(client)}
              aria-label="Toutes les informations"
              className="w-7 h-7 rounded-full bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold flex items-center justify-center shadow-sm transition-all hover:scale-105"
              title="Voir toutes les informations (+)"
            >
              <Add01Icon size={15} strokeWidth={2.5} />
            </button>
          )}
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold flex items-center justify-center text-xs transition-colors"
            title="Fermer"
          >
            <Cancel01Icon size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Centered Avatar & Primary Info (Matching Design Mockup) */}
      <div className="flex flex-col items-center text-center space-y-2 pt-1">
        <div className="w-20 h-20 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm shrink-0 bg-slate-100 flex items-center justify-center">
          {client.avatar ? (
            <img
              src={client.avatar}
              alt={client.nom}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-extrabold text-[#5B63F6]">
              {client.nom.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-slate-800">{client.nom}</h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {client.metier || "Client VIP Cosmétique"}
          </p>
        </div>
      </div>

      {/* Contact Info Section (Exact layout from design image) */}
      <div className="space-y-3 pt-2">
        <h4 className="text-sm font-bold text-slate-800 tracking-tight">
          Contact Info
        </h4>

        <div className="space-y-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-3">
            <Mail01Icon size={18} className="text-slate-400 shrink-0" />
            <span className="truncate text-slate-500">{client.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <CallIcon size={18} className="text-slate-400 shrink-0" />
            <span className="text-slate-500">{client.telephone}</span>
          </div>

          <div className="flex items-center gap-3">
            <Location01Icon size={18} className="text-slate-400 shrink-0" />
            <span className="text-slate-500 leading-snug">{client.adresse}</span>
          </div>
        </div>
      </div>

      {/* Performance & Charts Section (Exact layout from design image) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight">
            Performance
          </h4>
          <MoreHorizontalIcon size={16} className="text-slate-400 cursor-pointer" />
        </div>

        {/* Peach Bar Chart (Matching Design Screenshot) */}
        <div className="bg-[#FBFBFE] rounded-2xl p-4 border border-slate-100">
          <div className="flex justify-between items-end h-28 pt-4 px-1">
            {barresData.map((bar, idx) => {
              const estSurvole = barSurvolee === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setBarSurvolee(idx)}
                  className="flex flex-col items-center gap-1.5 flex-1 cursor-pointer group"
                >
                  {bar.highlight && !estSurvole && (
                    <span className="text-[9px] font-bold text-white bg-[#FF8A65] px-1.5 py-0.5 rounded-md shadow-xs animate-pulse">
                      {bar.highlight}
                    </span>
                  )}
                  {estSurvole && (
                    <span className="text-[9px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded-md shadow-xs">
                      {bar.montant}
                    </span>
                  )}
                  <div
                    className={`w-3.5 rounded-full transition-all duration-300 ${
                      bar.highlight
                        ? "bg-[#FF7A59]"
                        : estSurvole
                        ? "bg-[#5B63F6]"
                        : "bg-[#FFD1C4] group-hover:bg-[#FF8A65]"
                    }`}
                    style={{ height: `${bar.val}%` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-400">
                    {bar.mois}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Circular Donut Gauges (70% and 60% as seen in photo) */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          {/* Donut 1: 70% Yellow/Amber */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center space-y-1.5 shadow-xs">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#FFC107] transition-all duration-1000"
                  strokeDasharray="70, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold text-slate-800">
                70%
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              Fidélité
            </span>
          </div>

          {/* Donut 2: 60% Blue */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center space-y-1.5 shadow-xs">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#5B63F6] transition-all duration-1000"
                  strokeDasharray="60, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold text-slate-800">
                60%
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              Satisfactions
            </span>
          </div>
        </div>

        {/* Summary Footer box */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <span className="text-[10px] font-bold text-slate-400">
            Total dépense cumulée
          </span>
          <p className="text-base font-black text-[#5B63F6]">
            {formatPrix(depense)} FCFA ({nbCommandes} cmd)
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-2">
        {onEditer && (
          <button
            type="button"
            onClick={() => onEditer(client)}
            className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Edit02Icon size={14} />
            <span>Modifier</span>
          </button>
        )}
        {onSupprimer && (
          <button
            type="button"
            onClick={() => onSupprimer(client.id)}
            className="flex-1 py-2 px-3 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Delete02Icon size={14} />
            <span>Supprimer</span>
          </button>
        )}
      </div>
    </div>
  );
};
