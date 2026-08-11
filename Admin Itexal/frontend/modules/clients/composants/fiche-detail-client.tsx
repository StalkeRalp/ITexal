"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrix } from "@/lib/formatteur";
import {
  Add01Icon,
  Cancel01Icon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
  Edit02Icon,
  Delete02Icon,
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
    { mois: "Jan", val: 35, montant: "15 500 FCFA" },
    { mois: "Feb", val: 85, highlight: "2.33k", montant: "85 000 FCFA" },
    { mois: "Mar", val: 50, montant: "32 000 FCFA" },
    { mois: "Apr", val: 65, montant: "48 500 FCFA" },
    { mois: "May", val: 90, montant: "92 000 FCFA" },
    { mois: "Jun", val: 95, montant: "120 000 FCFA" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between animate-fadeIn">
      {/* Header Close button & Plus button */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider">
          Fiche Client Détaillée
        </h3>

        <div className="flex items-center gap-2">
          {/* Plus Button to open modal with ALL customer details */}
          <button
            type="button"
            onClick={() => onOuvrirToutesLesInfos && onOuvrirToutesLesInfos(client)}
            aria-label="Voir toutes les informations"
            className="w-8 h-8 rounded-full bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold flex items-center justify-center shadow-md shadow-blue-500/20 transition-all hover:scale-110"
            title="Voir toutes les informations détaillées (+)"
          >
            <Add01Icon size={16} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer le volet"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold flex items-center justify-center text-xs transition-colors"
            title="Fermer le volet"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Avatar & Main Info */}
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center overflow-hidden text-2xl font-black text-[#4880FF] shadow-sm">
          {client.avatar ? (
            <img
              src={client.avatar}
              alt={client.nom}
              className="w-full h-full object-cover"
            />
          ) : (
            client.nom.slice(0, 2).toUpperCase()
          )}
        </div>

        <div>
          <h4 className="text-xl font-extrabold text-slate-900">{client.nom}</h4>
          <p className="text-xs text-slate-400 font-semibold">
            {client.metier || "Client Privilégié VIP"}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 pt-2">
        <h5 className="text-xs font-black text-slate-800 uppercase tracking-tight">
          Contact Info
        </h5>

        <div className="space-y-2 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#4880FF] shrink-0">
              <Mail01Icon size={14} />
            </span>
            <span className="truncate">{client.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#4880FF] shrink-0">
              <CallIcon size={14} />
            </span>
            <span>{client.telephone}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#4880FF] shrink-0">
              <Location01Icon size={14} />
            </span>
            <span className="truncate">{client.adresse}</span>
          </div>
        </div>
      </div>

      {/* Performance & Statistics */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-black text-slate-800 uppercase tracking-tight">
            Performance & Historique
          </h5>
          <span className="text-[10px] font-bold text-[#4880FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
            {nbCommandes} Commandes
          </span>
        </div>

        {/* Mini Bar Chart Interactive */}
        <div className="bg-slate-50/80 rounded-2xl p-4 space-y-2 border border-slate-100">
          <div className="flex justify-between items-end h-28 pt-4 px-2">
            {barresData.map((bar, idx) => {
              const estSurvole = barSurvolee === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setBarSurvolee(idx)}
                  className="flex flex-col items-center gap-1.5 flex-1 cursor-pointer group"
                >
                  {estSurvole && (
                    <span className="text-[9px] font-extrabold text-white bg-slate-900 px-1.5 py-0.5 rounded-md shadow-md animate-fadeIn whitespace-nowrap">
                      {bar.montant}
                    </span>
                  )}
                  {!estSurvole && bar.highlight && (
                    <span className="text-[9px] font-extrabold text-white bg-amber-500 px-1.5 py-0.5 rounded-md shadow-xs animate-bounce">
                      {bar.highlight}
                    </span>
                  )}
                  <div
                    className={`w-3.5 rounded-full transition-all duration-300 ${
                      estSurvole
                        ? "bg-[#4880FF] scale-110 shadow-sm"
                        : bar.highlight
                        ? "bg-amber-500"
                        : "bg-rose-200 group-hover:bg-rose-300"
                    }`}
                    style={{ height: `${bar.val}%` }}
                  />
                  <span
                    className={`text-[10px] font-bold transition-colors ${
                      estSurvole ? "text-[#4880FF] font-black" : "text-slate-400"
                    }`}
                  >
                    {bar.mois}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Animated Gauge Donut Circles */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          {/* Donut 1: 70% */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center space-y-1 shadow-xs group hover:border-amber-200 transition-colors">
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
                  className="text-amber-400 transition-all duration-1000 ease-out"
                  strokeDasharray="70, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">
                70%
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Fidélité</span>
          </div>

          {/* Donut 2: 60% */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center space-y-1 shadow-xs group hover:border-blue-200 transition-colors">
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
                  className="text-[#4880FF] transition-all duration-1000 ease-out"
                  strokeDasharray="60, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">
                60%
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Satisfaction</span>
          </div>
        </div>

        {/* Total Spent summary */}
        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-center">
          <span className="text-[11px] font-bold text-slate-500">
            Montant Total des Achats
          </span>
          <h4 className="text-xl font-black text-[#4880FF] mt-0.5">
            {formatPrix(depense)} FCFA
          </h4>
        </div>
      </div>

      {/* Button Plus Big CTA */}
      <button
        type="button"
        onClick={() => onOuvrirToutesLesInfos && onOuvrirToutesLesInfos(client)}
        className="w-full py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
      >
        <Add01Icon size={18} strokeWidth={2.5} />
        <span>Voir toutes les infos du client</span>
      </button>

      {/* Bottom Action buttons */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => onSupprimer && onSupprimer(client.id)}
          className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Delete02Icon size={14} />
          <span>Supprimer ce client</span>
        </button>
      </div>
    </div>
  );
};
