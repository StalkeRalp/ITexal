"use client";

import React, { useState } from "react";
import { LogAudit, NiveauSeveriteAudit } from "../types/journal";
import {
  Search01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  ViewIcon,
} from "hugeicons-react";

interface TableauJournalProps {
  journal: LogAudit[];
  onVoirLog: (log: LogAudit) => void;
}

export const TableauJournal: React.FC<TableauJournalProps> = ({
  journal,
  onVoirLog,
}) => {
  const [recherche, setRecherche] = useState("");
  const [filtreModule, setFiltreModule] = useState<string>("Tous");
  const [filtreSeverite, setFiltreSeverite] = useState<string>("Tous");

  const logsFiltres = journal.filter((log) => {
    const matchTexte =
      log.action.toLowerCase().includes(recherche.toLowerCase()) ||
      log.description.toLowerCase().includes(recherche.toLowerCase()) ||
      log.nomUtilisateur.toLowerCase().includes(recherche.toLowerCase()) ||
      log.adresseIP.includes(recherche);

    const matchModule =
      filtreModule === "Tous" ? true : log.typeEvenement === filtreModule;

    const matchSeverite =
      filtreSeverite === "Tous" ? true : log.niveauSeverite === filtreSeverite;

    return matchTexte && matchModule && matchSeverite;
  });

  const renduBadgeSeverite = (niveau: NiveauSeveriteAudit) => {
    switch (niveau) {
      case "Critique":
        return (
          <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-black inline-flex items-center gap-1">
            <AlertCircleIcon size={12} /> Critique
          </span>
        );
      case "Avertissement":
        return (
          <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-[10px] font-bold inline-flex items-center gap-1">
            <AlertCircleIcon size={12} /> Avertissement
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold inline-flex items-center gap-1">
            <InformationCircleIcon size={12} /> Info
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par action, admin ou IP..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#4880FF]"
          />
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Module Filter */}
          <select
            value={filtreModule}
            onChange={(e) => setFiltreModule(e.target.value)}
            className="bg-[#F8F9FD] border border-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4880FF]"
          >
            <option value="Tous">Tous les Modules</option>
            <option value="Authentification">Authentification</option>
            <option value="Produits">Produits</option>
            <option value="Catégories">Catégories</option>
            <option value="Stock">Stock</option>
            <option value="Commandes">Commandes</option>
            <option value="Utilisateurs">Utilisateurs</option>
            <option value="Paramètres">Paramètres</option>
          </select>

          {/* Severity Filter */}
          <select
            value={filtreSeverite}
            onChange={(e) => setFiltreSeverite(e.target.value)}
            className="bg-[#F8F9FD] border border-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4880FF]"
          >
            <option value="Tous">Toutes les Sévérités</option>
            <option value="Info">Informations</option>
            <option value="Avertissement">Avertissements</option>
            <option value="Critique">Critiques / Sécurité</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
              <th className="py-4 px-4">HORODATAGE</th>
              <th className="py-4 px-4">UTILISATEUR</th>
              <th className="py-4 px-4">MODULE</th>
              <th className="py-4 px-4">ACTION & DESCRIPTION</th>
              <th className="py-4 px-4">ADRESSE IP</th>
              <th className="py-4 px-4 text-center">GRAVITÉ</th>
              <th className="py-4 px-4 text-center">DETAILS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {logsFiltres.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                onClick={() => onVoirLog(log)}
              >
                {/* Date */}
                <td className="py-4 px-4 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                  {log.horodatage}
                </td>

                {/* Utilisateur */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={log.avatarUtilisateur}
                      alt={log.nomUtilisateur}
                      className="w-6 h-6 rounded-full bg-slate-200 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-xs">
                        {log.nomUtilisateur}
                      </p>
                      <p className="text-[9px] text-[#4880FF] font-semibold">
                        {log.roleUtilisateur}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Module */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[10px]">
                    {log.typeEvenement}
                  </span>
                </td>

                {/* Description */}
                <td className="py-4 px-4 max-w-sm">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="px-2 py-0.5 bg-[#4880FF]/10 text-[#4880FF] font-mono font-extrabold text-[10px] rounded">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs truncate">
                    {log.description}
                  </p>
                </td>

                {/* IP */}
                <td className="py-4 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                  {log.adresseIP}
                </td>

                {/* Gravité */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  {renduBadgeSeverite(log.niveauSeverite)}
                </td>

                {/* Actions */}
                <td
                  className="py-4 px-4 text-center whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onVoirLog(log)}
                    className="px-3 py-1.5 bg-[#F8F9FD] hover:bg-blue-50 text-[#4880FF] font-bold rounded-xl border border-slate-200 text-xs transition-colors flex items-center gap-1"
                  >
                    <ViewIcon size={14} />
                    <span>Inspecter</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
