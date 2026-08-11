"use client";

import React, { useState, useMemo } from "react";
import { Promotion as PromotionVue } from "@/modules/promotions/types/promotion";
import { ModalPromotionFormulaire } from "@/modules/promotions/composants/modal-promotion-formulaire";
import { useProduits } from "@/lib/context/ProduitsContext";
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
  const { promotions, creerPromotion, modifierPromotion, supprimerPromotion } = useProduits();
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<"Tous" | "Actif" | "Expiré">("Tous");

  // Mapping des promotions centralisées vers PromotionVue
  const promotionsVues: PromotionVue[] = useMemo(() => {
    return promotions.map((p) => ({
      id: p.id,
      code: p.code,
      titre: p.nom,
      type: p.typeRemise,
      valeur: p.valeurRemise,
      achatMinimum: 10000,
      utilisationsMax: p.limiteUtilisation || 500,
      nombreUtilisations: p.nombreUtilisations,
      dateDebut: p.dateDebut,
      dateFin: p.dateFin,
      statut: p.actif ? "Actif" : "Expiré",
      produitsEligibles: "Tout le catalogue",
      creeLe: p.creeLe,
    }));
  }, [promotions]);

  const [modalOuvert, setModalOuvert] = useState(false);
  const [promotionAEditer, setPromotionAEditer] = useState<PromotionVue | null>(null);

  // KPIs
  const totalActifs = promotionsVues.filter((p) => p.statut === "Actif").length;
  const totalUtilisations = promotionsVues.reduce((acc, p) => acc + p.nombreUtilisations, 0);
  const totalExpires = promotionsVues.filter((p) => p.statut === "Expiré").length;

  const promotionsFiltrees = promotionsVues.filter((p) => {
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

  const ouvrirEdition = (promo: PromotionVue) => {
    setPromotionAEditer(promo);
    setModalOuvert(true);
  };

  const verifierSuppression = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce code promotionnel ?")) {
      supprimerPromotion(id);
    }
  };

  const enregistrerPromotionHandler = (promo: PromotionVue) => {
    if (promotionAEditer) {
      modifierPromotion(promo.id, {
        code: promo.code,
        nom: promo.titre,
        typeRemise: promo.type,
        valeurRemise: promo.valeur,
        actif: promo.statut === "Actif",
      });
    } else {
      creerPromotion({
        code: promo.code,
        nom: promo.titre,
        description: promo.titre,
        typeRemise: promo.type,
        valeurRemise: promo.valeur,
        dateDebut: promo.dateDebut,
        dateFin: promo.dateFin,
        actif: true,
      });
    }
    setModalOuvert(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Promotions & Code Promo ({promotionsVues.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gestion des remises commerciales et coupons de réduction Cosmetic Admin.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Add01Icon size={18} strokeWidth={2.5} />
          <span>Créer un Code Promo</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Codes Actifs</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalActifs}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Tag01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Utilisations</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalUtilisations}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Ticket01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expirées</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalExpires}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <HourglassIcon size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search01Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par code (ex: SUMMER2026)..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold py-1">
          {["Tous", "Actif", "Expiré"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltreStatut(f as typeof filtreStatut)}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                filtreStatut === f
                  ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Promotions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotionsFiltrees.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <span className="px-3 py-1.5 bg-blue-50 text-[#4880FF] font-mono font-black text-xs rounded-xl tracking-wider">
                {p.code}
              </span>
              <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => ouvrirEdition(p)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#4880FF] text-slate-600 transition-colors flex items-center justify-center"
                >
                  <Edit02Icon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => verifierSuppression(p.id)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors flex items-center justify-center"
                >
                  <Delete02Icon size={16} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-800">{p.titre}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-black text-slate-900">
                  {p.type === "pourcentage" ? `-${p.valeur}%` : `-${p.valeur} FCFA`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">
                {p.nombreUtilisations} / {p.utilisationsMax} utilisations
              </span>
              <span className={`px-2.5 py-1 rounded-lg text-[11px] ${
                p.statut === "Actif" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              }`}>
                {p.statut}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOuvert && (
        <ModalPromotionFormulaire
          ouvert={modalOuvert}
          onFermer={() => setModalOuvert(false)}
          promotionAEditer={promotionAEditer}
          onEnregistrer={enregistrerPromotionHandler}
        />
      )}
    </div>
  );
}
