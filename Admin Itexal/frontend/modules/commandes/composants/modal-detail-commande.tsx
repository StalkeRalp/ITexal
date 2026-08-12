"use client";

import React from "react";
import { Commande, StatutCommande } from "../types/commande";
import { formatPrix } from "@/lib/formatteur";
import { exporterBonDeCommandePDF } from "@/lib/utilitaires/exportateur";
import {
  ShoppingCart01Icon,
  Cancel01Icon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
  PrinterIcon,
} from "hugeicons-react";

interface ModalDetailCommandeProps {
  commande: Commande | null;
  onFermer: () => void;
  onChangerStatut: (idCommande: string, nouveauStatut: StatutCommande) => void;
}

export const ModalDetailCommande: React.FC<ModalDetailCommandeProps> = ({
  commande,
  onFermer,
  onChangerStatut,
}) => {
  if (!commande) return null;

  const renduBadgeStatut = (statut: StatutCommande) => {
    switch (statut) {
      case "Completed":
      case "Livrée":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#E6F4EA] text-[#137333] text-xs font-bold">
            Livrée
          </span>
        );
      case "Processing":
      case "En traitement":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#F4F3FF] text-[#7A5AF8] text-xs font-bold">
            En traitement
          </span>
        );
      case "Rejected":
      case "Annulée":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#FEE4E2] text-[#F04438] text-xs font-bold">
            Annulée
          </span>
        );
      case "On Hold":
      case "En attente":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#FEF0C7] text-[#DC6803] text-xs font-bold">
            En attente
          </span>
        );
      case "In Transit":
      case "En transit":
        return (
          <span className="px-3 py-1 rounded-lg bg-[#F9F5FF] text-[#9E77ED] text-xs font-bold">
            En transit
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
            {statut}
          </span>
        );
    }
  };

  const statutsOptions: { label: string; val: StatutCommande }[] = [
    { label: "En traitement", val: "En traitement" },
    { label: "En transit", val: "En transit" },
    { label: "Livrée", val: "Livrée" },
    { label: "En attente", val: "En attente" },
    { label: "Annulée", val: "Annulée" },
  ];

  const exporterBonDeCommande = () => {
    exporterBonDeCommandePDF(commande);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <ShoppingCart01Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Commande {commande.numeroCommande}
              </h2>
              <p className="text-xs text-slate-500">
                Passée le {commande.creeLe}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {renduBadgeStatut(commande.statut)}
            <button
              type="button"
              onClick={onFermer}
              aria-label="Fermer la fenêtre"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors"
            >
              <Cancel01Icon size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60 space-y-2">
              <h3 className="font-bold uppercase text-[11px] tracking-wider text-slate-500">
                Informations Client
              </h3>
              <p className="font-bold text-sm text-slate-800">
                {commande.nomClient}
              </p>
              <p className="text-slate-600 flex items-center gap-1.5">
                <Mail01Icon size={14} className="text-[#4880FF]" />
                <span>{commande.emailClient}</span>
              </p>
              <p className="text-slate-600 flex items-center gap-1.5">
                <CallIcon size={14} className="text-[#4880FF]" />
                <span>{commande.telephoneClient}</span>
              </p>
            </div>

            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60 space-y-2">
              <h3 className="font-bold uppercase text-[11px] tracking-wider text-slate-500">
                Livraison & Paiement
              </h3>
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Location01Icon size={14} className="text-[#4880FF] shrink-0" />
                <span>{commande.adresseLivraison}, {commande.villeLivraison}</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-medium text-slate-600">Mode :</span>
                <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {commande.modePaiement}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    commande.statutPaiement === "Payé"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {commande.statutPaiement}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold uppercase text-[11px] tracking-wider text-slate-500">
              Articles Commandés ({commande.articles.length})
            </h3>
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">PRODUIT</th>
                    <th className="py-3 px-4 text-center">PRIX UNITAIRE</th>
                    <th className="py-3 px-4 text-center">QUANTITÉ</th>
                    <th className="py-3 px-4 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {commande.articles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={article.image}
                            alt={article.nomProduit}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-slate-800">
                          {article.nomProduit}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-medium">
                        {formatPrix(article.prixUnitaire)} FCFA
                      </td>
                      <td className="py-3 px-4 text-center font-bold">
                        x{article.quantite}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                        {formatPrix(article.prixUnitaire * article.quantite)} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <div className="w-full max-w-xs space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total</span>
                <span className="font-semibold">
                  {formatPrix(
                    commande.montantTotal - (commande.fraisLivraison || 1500)
                  )}{" "}
                  FCFA
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Frais de livraison</span>
                <span className="font-semibold">
                  {formatPrix(commande.fraisLivraison || 1500)} FCFA
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-slate-900 text-sm">
                <span>Total TTC</span>
                <span className="text-[#4880FF]">
                  {formatPrix(commande.montantTotal)} FCFA
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
            <label className="block font-bold text-blue-900">
              Changer le statut de la commande :
            </label>
            <div className="flex flex-wrap gap-2">
              {statutsOptions.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => onChangerStatut(commande.id, opt.val)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                    commande.statut === opt.val ||
                    (commande.statut === "Completed" && opt.val === "Livrée") ||
                    (commande.statut === "Processing" && opt.val === "En traitement") ||
                    (commande.statut === "In Transit" && opt.val === "En transit") ||
                    (commande.statut === "On Hold" && opt.val === "En attente") ||
                    (commande.statut === "Rejected" && opt.val === "Annulée")
                      ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={exporterBonDeCommande}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[#5B63F6] font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-xs"
          >
            <PrinterIcon size={16} strokeWidth={2} />
            <span>Exporter Bon de Commande (PDF)</span>
          </button>

          <button
            type="button"
            onClick={onFermer}
            className="px-6 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
