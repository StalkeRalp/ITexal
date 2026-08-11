"use client";

import React, { useState } from "react";
import { Commande, StatutCommande } from "../types/commande";
import { formatPrix } from "@/lib/formatteur";
import { Search01Icon, MoreHorizontalIcon, EyeIcon, Delete02Icon } from "hugeicons-react";

interface TableauCommandesProps {
  commandes?: Commande[];
  commandesInitiales?: Commande[];
  onVoirCommande?: (commande: Commande) => void;
  onChangerStatut?: (idCommande: string, nouveauStatut: StatutCommande) => void;
  onSupprimerCommande?: (idCommande: string) => void;
}

export const TableauCommandes: React.FC<TableauCommandesProps> = ({
  commandes: propsCommandes,
  commandesInitiales,
  onVoirCommande,
  onChangerStatut,
  onSupprimerCommande,
}) => {
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<string>("Tous");
  const [popoverOuvertId, setPopoverOuvertId] = useState<string | null>(null);

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
          <span className="px-3.5 py-1.5 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-bold inline-block border border-emerald-200">
            Livrée
          </span>
        );
      case "Processing":
      case "En traitement":
        return (
          <span className="px-3.5 py-1.5 rounded-full bg-[#F4F3FF] text-[#7A5AF8] text-xs font-bold inline-block border border-indigo-200">
            En traitement
          </span>
        );
      case "Rejected":
      case "Annulée":
        return (
          <span className="px-3.5 py-1.5 rounded-full bg-[#FEE4E2] text-[#F04438] text-xs font-bold inline-block border border-rose-200">
            Annulée
          </span>
        );
      case "On Hold":
      case "En attente":
        return (
          <span className="px-3.5 py-1.5 rounded-full bg-[#FEF0C7] text-[#DC6803] text-xs font-bold inline-block border border-amber-200">
            En attente
          </span>
        );
      case "In Transit":
      case "En transit":
        return (
          <span className="px-3.5 py-1.5 rounded-full bg-[#F9F5FF] text-[#9E77ED] text-xs font-bold inline-block border border-purple-200">
            En transit
          </span>
        );
      default:
        return (
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold inline-block">
            {statut}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Champ de recherche */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par # N° ou Client..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#5B63F6] focus:bg-white transition-all"
          />
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filtre par Statut */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(
            ["Tous", "En traitement", "En transit", "Livrée", "En attente", "Annulée"] as const
          ).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFiltreStatut(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filtreStatut === st
                  ? "bg-[#5B63F6] text-white shadow-md shadow-indigo-500/20"
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
            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold">
              <th className="py-4 px-4 font-bold">
                Order ID <span className="inline-block text-[10px] ml-0.5">▾</span>
              </th>
              <th className="py-4 px-4 font-bold">
                Customer <span className="inline-block text-[10px] ml-0.5">▾</span>
              </th>
              <th className="py-4 px-4 font-bold">
                Date <span className="inline-block text-[10px] ml-0.5">▾</span>
              </th>
              <th className="py-4 px-4 font-bold">
                Items <span className="inline-block text-[10px] ml-0.5">▾</span>
              </th>
              <th className="py-4 px-4 font-bold">
                Total Amount <span className="inline-block text-[10px] ml-0.5">▾</span>
              </th>
              <th className="py-4 px-4 text-center font-bold">Status</th>
              <th className="py-4 px-4 text-center font-bold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100/60 text-xs text-slate-700 font-medium">
            {commandesFiltrees.map((cmd) => {
              const estPopoverOuvert = popoverOuvertId === cmd.id;

              return (
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
                    <div className="flex items-center gap-2">
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
                      <span className="text-[11px] text-slate-500 font-bold">
                        {cmd.articles.length} art.
                      </span>
                    </div>
                  </td>

                  {/* Montant Total */}
                  <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                    {formatPrix(cmd.montantTotal)} FCFA
                  </td>

                  {/* Statut */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    {renduBadgeStatut(cmd.statut)}
                  </td>

                  {/* Actions avec Popover ... (Edit/Details/Delete) */}
                  <td
                    className="py-4 px-4 text-center whitespace-nowrap relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setPopoverOuvertId(estPopoverOuvert ? null : cmd.id)}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-colors inline-flex items-center justify-center"
                    >
                      <MoreHorizontalIcon size={18} />
                    </button>

                    {/* Popover Dropdown */}
                    {estPopoverOuvert && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-6 top-12 z-20 w-36 bg-white rounded-2xl p-1.5 shadow-xl border border-slate-100 animate-fadeIn text-left"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setPopoverOuvertId(null);
                            onVoirCommande && onVoirCommande(cmd);
                          }}
                          className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <EyeIcon size={14} className="text-[#5B63F6]" />
                          <span>Voir détails</span>
                        </button>

                        <div className="p-1 border-t border-slate-100">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Changer Statut
                          </span>
                          {(["En traitement", "En transit", "Livrée", "Annulée"] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => {
                                setPopoverOuvertId(null);
                                onChangerStatut && onChangerStatut(cmd.id, st as StatutCommande);
                              }}
                              className="w-full text-left px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-[#5B63F6] rounded-lg transition-colors"
                            >
                              • {st}
                            </button>
                          ))}
                        </div>

                        {onSupprimerCommande && (
                          <button
                            type="button"
                            onClick={() => {
                              setPopoverOuvertId(null);
                              onSupprimerCommande(cmd.id);
                            }}
                            className="w-full px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors border-t border-slate-100 mt-1"
                          >
                            <Delete02Icon size={14} />
                            <span>Supprimer</span>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {commandesFiltrees.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-xs font-medium">
          Aucune commande trouvée.
        </div>
      )}
    </div>
  );
};
