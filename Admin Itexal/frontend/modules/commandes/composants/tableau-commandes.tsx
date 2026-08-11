"use client";

import React, { useState } from "react";
import { Commande, StatutCommande } from "../types/commande";
import { formatPrix } from "@/lib/formatteur";
import { Search01Icon } from "hugeicons-react";

interface TableauCommandesProps {
  commandes?: Commande[];
  commandesInitiales?: Commande[];
  onVoirCommande?: (commande: Commande) => void;
  onChangerStatut?: (idCommande: string, nouveauStatut: StatutCommande) => void;
}

export const TableauCommandes: React.FC<TableauCommandesProps> = ({
  commandes: propsCommandes,
  commandesInitiales,
  onVoirCommande,
  onChangerStatut,
}) => {
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<string>("Tous");

  const listCommandes = propsCommandes || commandesInitiales || [];

  const commandesFiltrees = listCommandes.filter((c) => {
    const matchNomOuNumero =
      c.numeroCommande.toLowerCase().includes(recherche.toLowerCase()) ||
      c.nomClient.toLowerCase().includes(recherche.toLowerCase()) ||
      c.emailClient.toLowerCase().includes(recherche.toLowerCase());

    if (filtreStatut === "Tous") return matchNomOuNumero;

    const normaliserStatut = (s: string) => {
      if (s === "Completed" || s === "Livrée") return "Livrée";
      if (s === "Processing" || s === "En traitement") return "En traitement";
      if (s === "In Transit" || s === "En transit") return "En transit";
      if (s === "On Hold" || s === "En attente") return "En attente";
      if (s === "Rejected" || s === "Annulée") return "Annulée";
      return s;
    };

    const matchStatut = normaliserStatut(c.statut) === normaliserStatut(filtreStatut);

    return matchNomOuNumero && matchStatut;
  });

  const renduBadgeStatut = (statut: StatutCommande) => {
    switch (statut) {
      case "Completed":
      case "Livrée":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#E6F4EA] text-[#137333] text-xs font-bold inline-block">
            Livrée
          </span>
        );
      case "Processing":
      case "En traitement":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#F4F3FF] text-[#7A5AF8] text-xs font-bold inline-block">
            En traitement
          </span>
        );
      case "Rejected":
      case "Annulée":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#FEE4E2] text-[#F04438] text-xs font-bold inline-block">
            Annulée
          </span>
        );
      case "On Hold":
      case "En attente":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#FEF0C7] text-[#DC6803] text-xs font-bold inline-block">
            En attente
          </span>
        );
      case "In Transit":
      case "En transit":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#F9F5FF] text-[#9E77ED] text-xs font-bold inline-block">
            En transit
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold inline-block">
            {statut}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/90 space-y-6">
      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Champ de recherche */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par # N° ou Nom client..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#4880FF]"
          />
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filtre par Statut en Français */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(
            ["Tous", "En traitement", "En transit", "Livrée", "En attente", "Annulée"] as const
          ).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFiltreStatut(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filtreStatut === st
                  ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                  : "bg-[#F8F9FD] text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des Commandes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
              <th className="py-4 px-4">N° COMMANDES</th>
              <th className="py-4 px-4">CLIENT</th>
              <th className="py-4 px-4">DATE</th>
              <th className="py-4 px-4">ARTICLES</th>
              <th className="py-4 px-4">LIVRAISON</th>
              <th className="py-4 px-4">MONTANT TOTAL</th>
              <th className="py-4 px-4 text-center">STATUT</th>
              <th className="py-4 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {commandesFiltrees.map((cmd) => (
              <tr
                key={cmd.id}
                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                onClick={() => onVoirCommande && onVoirCommande(cmd)}
              >
                {/* N° Commande */}
                <td className="py-4 px-4 font-bold text-slate-800 font-mono">
                  {cmd.numeroCommande}
                </td>

                {/* Nom Client */}
                <td className="py-4 px-4">
                  <p className="font-bold text-slate-800">{cmd.nomClient}</p>
                  <p className="text-[11px] text-slate-400 font-normal">
                    {cmd.emailClient}
                  </p>
                </td>

                {/* Date */}
                <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                  {cmd.creeLe}
                </td>

                {/* Visuals / Articles Count */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-2 overflow-hidden">
                      {cmd.articles.slice(0, 3).map((art, idx) => (
                        <div
                          key={idx}
                          className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white overflow-hidden relative shadow-sm"
                        >
                          <img
                            src={art.image}
                            alt={art.nomProduit}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold ml-1">
                      {cmd.articles.length} art.
                    </span>
                  </div>
                </td>

                {/* Adresse Livraison */}
                <td className="py-4 px-4 text-slate-600 max-w-[150px] truncate">
                  {cmd.villeLivraison}
                </td>

                {/* Montant Total */}
                <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                  {formatPrix(cmd.montantTotal)} FCFA
                </td>

                {/* Statut */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  {renduBadgeStatut(cmd.statut)}
                </td>

                {/* Actions */}
                <td
                  className="py-4 px-4 text-center whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onVoirCommande && onVoirCommande(cmd)}
                      className="px-3 py-1.5 bg-[#F8F9FD] hover:bg-blue-50 text-[#4880FF] font-bold rounded-xl transition-colors border border-slate-200"
                    >
                      Détails
                    </button>

                    {/* Quick Dropdown / Select Status in French */}
                    <select
                      value={cmd.statut}
                      onChange={(e) =>
                        onChangerStatut &&
                        onChangerStatut(
                          cmd.id,
                          e.target.value as StatutCommande
                        )
                      }
                      className="bg-white border border-slate-200 text-slate-700 py-1.5 px-2.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer hover:border-[#4880FF]"
                    >
                      <option value="En traitement">En traitement</option>
                      <option value="En transit">En transit</option>
                      <option value="Livrée">Livrée</option>
                      <option value="En attente">En attente</option>
                      <option value="Annulée">Annulée</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {commandesFiltrees.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-xs font-medium">
          Aucune commande trouvée pour ce statut.
        </div>
      )}
    </div>
  );
};
