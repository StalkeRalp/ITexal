"use client";

import React, { useState, useEffect } from "react";
import {
  PackageIcon,
  Cancel01Icon,
  Add01Icon,
  Remove01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  FilterHorizontalIcon,
} from "hugeicons-react";

export interface ArticleStockFull {
  id: string;
  nomProduit: string;
  categorie: string;
  prix: number;
  stockInitial: number;
  quantiteActuelle: number;
  seuilAlerte: number;
  seuilAlerteMax?: number;
  iconProduit: string;
  couleurs?: string[];
  derniereMiseAJour: string;
}

interface ModalAjustementStockProps {
  article: ArticleStockFull | null;
  onFermer: () => void;
  onValiderAjustement: (
    id: string,
    nouveauStock: number,
    seuilMin: number,
    seuilMax: number,
    motif: string,
    remarque?: string
  ) => void;
}

export const ModalAjustementStock: React.FC<ModalAjustementStockProps> = ({
  article,
  onFermer,
  onValiderAjustement,
}) => {
  const [nouveauStock, setNouveauStock] = useState<number>(0);
  const [seuilMin, setSeuilMin] = useState<number>(10);
  const [seuilMax, setSeuilMax] = useState<number>(100);
  const [motif, setMotif] = useState("Réapprovisionnement Fournisseur");
  const [remarque, setRemarque] = useState("");

  useEffect(() => {
    if (article) {
      setNouveauStock(article.quantiteActuelle);
      setSeuilMin(article.seuilAlerte || 10);
      setSeuilMax(article.seuilAlerteMax || 100);
      setMotif("Réapprovisionnement Fournisseur");
      setRemarque("");
    }
  }, [article]);

  if (!article) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nouveauStock < 0 || seuilMin < 0 || seuilMax < seuilMin) return;

    onValiderAjustement(article.id, nouveauStock, seuilMin, seuilMax, motif, remarque);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-[#5B63F6] font-black flex items-center justify-center text-lg shadow-xs">
              <FilterHorizontalIcon size={22} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Ajustement de Stock & Seuils
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {article.nomProduit}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors text-xs"
          >
            <Cancel01Icon size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs font-sans">
          {/* Badge comparaison du stock actuel */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider block">Stock Actuel en Base</span>
              <span className="font-black text-sm text-slate-800">{article.quantiteActuelle} unités</span>
            </div>

            <div className="text-right">
              <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider block">Nouveau Stock</span>
              <span className="font-black text-base text-[#5B63F6]">{nouveauStock} unités</span>
            </div>
          </div>

          {/* 1. Modification du Stock Actuel */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800">
              Quantité Actuelle de Stock *
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setNouveauStock((prev) => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-base flex items-center justify-center shrink-0 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                required
                min="0"
                value={nouveauStock}
                onChange={(e) => setNouveauStock(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-base font-black text-slate-900 focus:outline-none focus:border-[#5B63F6] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setNouveauStock((prev) => prev + 1)}
                className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#5B63F6] font-black text-base flex items-center justify-center shrink-0 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* 2 & 3. Seuils d'Alerte Minimum et Maximum */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Seuil d'alerte Minimum *
              </label>
              <input
                type="number"
                required
                min="0"
                value={seuilMin}
                onChange={(e) => setSeuilMin(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs font-black text-amber-800 focus:outline-none focus:border-amber-400"
              />
              <span className="text-[10px] text-slate-400 font-medium block mt-1">Alerte stock bas</span>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Seuil d'alerte Maximum
              </label>
              <input
                type="number"
                min={seuilMin}
                value={seuilMax}
                onChange={(e) => setSeuilMax(Math.max(seuilMin, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none focus:border-[#5B63F6]"
              />
              <span className="text-[10px] text-slate-400 font-medium block mt-1">Plafond de surstock</span>
            </div>
          </div>

          {/* 4. Motif & Remarques */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Motif de l'ajustement *
              </label>
              <select
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
              >
                <option value="Réapprovisionnement Fournisseur">Réapprovisionnement Fournisseur</option>
                <option value="Inventaire Physique Périodique">Inventaire Physique Périodique</option>
                <option value="Casse / Dégradation Produit">Casse / Dégradation Produit</option>
                <option value="Ajustement de Sécurité">Ajustement de Sécurité</option>
                <option value="Correction Erreur de Saisie">Correction Erreur de Saisie</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Remarque / Référence Bon (Optionnel)
              </label>
              <input
                type="text"
                value={remarque}
                onChange={(e) => setRemarque(e.target.value)}
                placeholder="Ex: Bon de Livraison BL-2026-902"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#5B63F6]"
              />
            </div>
          </div>

          {/* Buttons Bar */}
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
              className="px-6 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckmarkCircle02Icon size={16} />
              <span>Valider les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
