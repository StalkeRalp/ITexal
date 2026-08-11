"use client";

import React, { useState, useEffect } from "react";
import { Promotion, TypeReduction, StatutPromotion } from "../types/promotion";
import { Tag01Icon, Cancel01Icon } from "hugeicons-react";

interface ModalPromotionFormulaireProps {
  ouvert: boolean;
  promotionAEditer: Promotion | null;
  onFermer: () => void;
  onEnregistrer: (promotion: Promotion) => void;
}

export const ModalPromotionFormulaire: React.FC<
  ModalPromotionFormulaireProps
> = ({ ouvert, promotionAEditer, onFermer, onEnregistrer }) => {
  const [code, setCode] = useState("");
  const [titre, setTitre] = useState("");
  const [type, setType] = useState<TypeReduction>("pourcentage");
  const [valeur, setValeur] = useState<number | "">(15);
  const [achatMinimum, setAchatMinimum] = useState<number | "">(10000);
  const [utilisationsMax, setUtilisationsMax] = useState<number | "">(100);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [statut, setStatut] = useState<StatutPromotion>("Actif");
  const [produitsEligibles, setProduitsEligibles] = useState("Tous les produits cosmétiques");

  useEffect(() => {
    if (promotionAEditer) {
      setCode(promotionAEditer.code);
      setTitre(promotionAEditer.titre);
      setType(promotionAEditer.type);
      setValeur(promotionAEditer.valeur);
      setAchatMinimum(promotionAEditer.achatMinimum || "");
      setUtilisationsMax(promotionAEditer.utilisationsMax || "");
      setDateDebut(promotionAEditer.dateDebut);
      setDateFin(promotionAEditer.dateFin);
      setStatut(promotionAEditer.statut);
      setProduitsEligibles(
        promotionAEditer.produitsEligibles || "Tous les produits cosmétiques"
      );
    } else {
      setCode(`ITEXAL${Math.floor(10 + Math.random() * 90)}`);
      setTitre("Réduction Spéciale Éclat");
      setType("pourcentage");
      setValeur(15);
      setAchatMinimum(15000);
      setUtilisationsMax(200);
      setDateDebut(new Date().toISOString().split("T")[0]);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      setDateFin(futureDate.toISOString().split("T")[0]);
      setStatut("Actif");
      setProduitsEligibles("Gamme Soin du Visage");
    }
  }, [promotionAEditer, ouvert]);

  if (!ouvert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !titre || valeur === "") return;

    const promoResultat: Promotion = {
      id: promotionAEditer?.id || `promo-${Date.now()}`,
      code: code.toUpperCase().trim(),
      titre,
      type,
      valeur: Number(valeur),
      achatMinimum: achatMinimum !== "" ? Number(achatMinimum) : undefined,
      utilisationsMax: utilisationsMax !== "" ? Number(utilisationsMax) : undefined,
      nombreUtilisations: promotionAEditer?.nombreUtilisations || 0,
      dateDebut: dateDebut || new Date().toLocaleDateString("fr-FR"),
      dateFin: dateFin || new Date().toLocaleDateString("fr-FR"),
      statut,
      produitsEligibles,
      creeLe: promotionAEditer?.creeLe || new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(promoResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <Tag01Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {promotionAEditer
                  ? "Modifier le Code Promo"
                  : "Créer un Code Promotionnel"}
              </h2>
              <p className="text-xs text-slate-500">
                Remises, périodes de validité et conditions d'utilisation.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Code Promo (Majuscules) *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="EX: BEAUTY20"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm font-black uppercase text-[#4880FF] focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Statut *
              </label>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value as StatutPromotion)}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4880FF]"
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
                <option value="Expiré">Expiré</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Libellé / Titre de la promotion *
            </label>
            <input
              type="text"
              required
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: -15% sur la Gamme Soin Visage"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Type de réduction *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TypeReduction)}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              >
                <option value="pourcentage">Pourcentage (%)</option>
                <option value="montant_fixe">Montant fixe (FCFA)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Valeur de la remise *
              </label>
              <input
                type="number"
                required
                min="1"
                value={valeur}
                onChange={(e) =>
                  setValeur(e.target.value ? Number(e.target.value) : "")
                }
                placeholder={type === "pourcentage" ? "20" : "3000"}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold text-[#4880FF] focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Panier Minimum (FCFA)
              </label>
              <input
                type="number"
                min="0"
                value={achatMinimum}
                onChange={(e) =>
                  setAchatMinimum(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                placeholder="10000"
                className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Limite d'utilisations Max
              </label>
              <input
                type="number"
                min="1"
                value={utilisationsMax}
                onChange={(e) =>
                  setUtilisationsMax(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                placeholder="200"
                className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Date d'expiration
              </label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Catégories / Produits éligibles
            </label>
            <input
              type="text"
              value={produitsEligibles}
              onChange={(e) => setProduitsEligibles(e.target.value)}
              placeholder="Ex: Gamme Soin Visage, Beurre de Karité..."
              className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onFermer}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              {promotionAEditer ? "Mettre à jour" : "Créer la Promotion"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
