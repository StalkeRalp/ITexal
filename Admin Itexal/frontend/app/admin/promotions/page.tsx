"use client";

import React, { useState } from "react";
import { Promotion } from "@/modules/promotions/types/promotion";
import { ModalPromotionFormulaire } from "@/modules/promotions/composants/modal-promotion-formulaire";
import { formatPrix, formatNombre } from "@/lib/formatteur";
import {
  Tag01Icon,
  Ticket01Icon,
  HourglassIcon,
  Search01Icon,
  Add01Icon,
  Edit02Icon,
  Delete02Icon,
} from "hugeicons-react";

export default function PagePromotionsAdmin() {
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<"Tous" | "Actif" | "Expiré">("Tous");

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "promo-1",
      code: "SUMMER2026",
      titre: "Offre d'Été ITexal - Visage Éclat",
      type: "pourcentage",
      valeur: 20,
      achatMinimum: 15000,
      utilisationsMax: 300,
      nombreUtilisations: 142,
      dateDebut: "2026-06-01",
      dateFin: "2026-08-31",
      statut: "Actif",
      produitsEligibles: "Gamme Soin du Visage",
      creeLe: "01/06/2026",
    },
    {
      id: "promo-2",
      code: "BEAUTY15",
      titre: "Remise Nouveaux Inscrits",
      type: "pourcentage",
      valeur: 15,
      achatMinimum: 10000,
      utilisationsMax: 500,
      nombreUtilisations: 389,
      dateDebut: "2026-01-01",
      dateFin: "2026-12-31",
      statut: "Actif",
      produitsEligibles: "Tout le catalogue",
      creeLe: "01/01/2026",
    },
    {
      id: "promo-3",
      code: "KARITE5000",
      titre: "Réduction Spéciale Soin du Corps",
      type: "montant_fixe",
      valeur: 5000,
      achatMinimum: 25000,
      utilisationsMax: 100,
      nombreUtilisations: 100,
      dateDebut: "2026-05-01",
      dateFin: "2026-07-01",
      statut: "Expiré",
      produitsEligibles: "Beurre de Karité & Cacao",
      creeLe: "01/05/2026",
    },
    {
      id: "promo-4",
      code: "VIPGLOW",
      titre: "Privilège Clients Fidèles ITexal",
      type: "pourcentage",
      valeur: 25,
      achatMinimum: 30000,
      utilisationsMax: 50,
      nombreUtilisations: 18,
      dateDebut: "2026-08-01",
      dateFin: "2026-09-30",
      statut: "Actif",
      produitsEligibles: "Sérums & Huiles Essentielles",
      creeLe: "01/08/2026",
    },
  ]);

  // Modal State
  const [modalOuvert, setModalOuvert] = useState(false);
  const [promotionAEditer, setPromotionAEditer] = useState<Promotion | null>(null);

  // KPIs
  const totalActifs = promotions.filter((p) => p.statut === "Actif").length;
  const totalUtilisations = promotions.reduce((acc, p) => acc + p.nombreUtilisations, 0);
  const totalExpires = promotions.filter((p) => p.statut === "Expiré").length;

  // Filter logic
  const promotionsFiltrees = promotions.filter((p) => {
    const matchRecherche =
      p.code.toLowerCase().includes(recherche.toLowerCase()) ||
      p.titre.toLowerCase().includes(recherche.toLowerCase());
    const matchStatut = filtreStatut === "Tous" ? true : p.statut === filtreStatut;
    return matchRecherche && matchStatut;
  });

  const ouvrirCreation = () => {
    setPromotionAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (promo: Promotion) => {
    setPromotionAEditer(promo);
    setModalOuvert(true);
  };

  const basculerStatut = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nouveauStatut = p.statut === "Actif" ? "Inactif" : "Actif";
          return { ...p, statut: nouveauStatut };
        }
        return p;
      })
    );
  };

  const supprimerPromotion = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce code promotionnel ?")) {
      setPromotions((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const enregistrerPromotion = (promo: Promotion) => {
    setPromotions((prev) => {
      const existe = prev.some((p) => p.id === promo.id);
      if (existe) {
        return prev.map((p) => (p.id === promo.id ? promo : p));
      } else {
        return [promo, ...prev];
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Promotions & Code Promo
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gestion des remises commerciales et coupons de réduction ITexal.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <Add01Icon size={16} strokeWidth={2.5} />
          <span>Créer une Promotion</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promotions Actives</span>
            <h3 className="text-2xl font-black text-[#4880FF] mt-1">{totalActifs}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Tag01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Utilisations</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              {formatNombre(totalUtilisations)}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Ticket01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Offres Expirées</span>
            <h3 className="text-2xl font-black text-slate-400 mt-1">{totalExpires}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold">
            <HourglassIcon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par code promo ou libellé..."
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF] text-slate-800"
          />
          <Search01Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-1 bg-[#F8F9FD] p-1 rounded-xl border border-slate-200/80">
          {(["Tous", "Actif", "Expiré"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFiltreStatut(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filtreStatut === tab
                  ? "bg-white text-[#4880FF] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Promotions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                <th className="py-4 px-4">CODE PROMO</th>
                <th className="py-4 px-4">TITRE DE L'OFFRE</th>
                <th className="py-4 px-4">REMISE</th>
                <th className="py-4 px-4">PANIER MIN.</th>
                <th className="py-4 px-4 text-center">UTILISATIONS</th>
                <th className="py-4 px-4">VALIDITÉ</th>
                <th className="py-4 px-4 text-center">STATUT</th>
                <th className="py-4 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {promotionsFiltrees.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Code */}
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-blue-50 text-[#4880FF] font-mono font-extrabold text-xs rounded-xl border border-blue-100">
                      {promo.code}
                    </span>
                  </td>

                  {/* Titre & Gamme */}
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{promo.titre}</p>
                    <p className="text-[10px] text-slate-400">
                      Éligibilité: {promo.produitsEligibles}
                    </p>
                  </td>

                  {/* Remise */}
                  <td className="py-4 px-4 font-black text-rose-500 text-sm whitespace-nowrap">
                    {promo.type === "pourcentage"
                      ? `-${promo.valeur}%`
                      : `-${formatPrix(promo.valeur)} FCFA`}
                  </td>

                  {/* Panier Min */}
                  <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">
                    {promo.achatMinimum
                      ? `${formatPrix(promo.achatMinimum)} FCFA`
                      : "Aucun min."}
                  </td>

                  {/* Utilisations */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span className="font-bold text-slate-800">
                      {promo.nombreUtilisations}
                    </span>
                    {promo.utilisationsMax && (
                      <span className="text-slate-400 text-[10px]">
                        {" "}
                        / {promo.utilisationsMax}
                      </span>
                    )}
                  </td>

                  {/* Période Validité */}
                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                    du {promo.dateDebut} au {promo.dateFin}
                  </td>

                  {/* Statut Badge */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => basculerStatut(promo.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-transform hover:scale-105 ${
                        promo.statut === "Actif"
                          ? "bg-emerald-100 text-emerald-700"
                          : promo.statut === "Inactif"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {promo.statut}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => ouvrirEdition(promo)}
                        aria-label="Éditer"
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs transition-colors"
                        title="Éditer"
                      >
                        <Edit02Icon size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => supprimerPromotion(promo.id)}
                        aria-label="Supprimer"
                        className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white font-bold flex items-center justify-center text-xs transition-colors"
                        title="Supprimer"
                      >
                        <Delete02Icon size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Formulaire */}
      <ModalPromotionFormulaire
        ouvert={modalOuvert}
        promotionAEditer={promotionAEditer}
        onFermer={() => setModalOuvert(false)}
        onEnregistrer={enregistrerPromotion}
      />
    </div>
  );
}
