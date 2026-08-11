"use client";

import React, { useState } from "react";
import {
  PackageIcon,
  Cancel01Icon,
  Add01Icon,
  Remove01Icon,
} from "hugeicons-react";

export interface ArticleStockFull {
  id: string;
  nomProduit: string;
  categorie: string;
  prix: number;
  stockInitial: number;
  quantiteActuelle: number;
  seuilAlerte: number;
  iconProduit: string;
  couleurs?: string[];
  derniereMiseAJour: string;
}

interface ModalAjustementStockProps {
  article: ArticleStockFull | null;
  onFermer: () => void;
  onValiderAjustement: (
    id: string,
    delta: number,
    motif: string,
    remarque?: string
  ) => void;
}

export const ModalAjustementStock: React.FC<ModalAjustementStockProps> = ({
  article,
  onFermer,
  onValiderAjustement,
}) => {
  const [typeOperation, setTypeOperation] = useState<"ajouter" | "retirer">(
    "ajouter"
  );
  const [quantite, setQuantite] = useState<number | "">(10);
  const [motif, setMotif] = useState("Réapprovisionnement Fournisseur");
  const [remarque, setRemarque] = useState("");

  if (!article) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantite || Number(quantite) <= 0) return;

    const delta = typeOperation === "ajouter" ? Number(quantite) : -Number(quantite);
    onValiderAjustement(article.id, delta, motif, remarque);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <PackageIcon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Ajustement de Stock
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
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Stock actuel pill */}
          <div className="bg-[#F8F9FD] p-3 rounded-2xl border border-slate-200/70 flex items-center justify-between">
            <span className="font-bold text-slate-600">Stock Actuel :</span>
            <span className="font-extrabold text-sm text-[#4880FF]">
              {article.quantiteActuelle} unités
            </span>
          </div>

          {/* Type d'opération */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Type d'opération
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setTypeOperation("ajouter");
                  setMotif("Réapprovisionnement Fournisseur");
                }}
                className={`py-2.5 px-3 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${
                  typeOperation === "ajouter"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Add01Icon size={14} strokeWidth={2.5} />
                <span>Entrée / Ajout</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTypeOperation("retirer");
                  setMotif("Casse / Péremption Produit");
                }}
                className={`py-2.5 px-3 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${
                  typeOperation === "retirer"
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Remove01Icon size={14} strokeWidth={2.5} />
                <span>Sortie / Déduction</span>
              </button>
            </div>
          </div>

          {/* Quantité d'ajustement */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Quantité à {typeOperation === "ajouter" ? "ajouter" : "déduire"} *
            </label>
            <input
              type="number"
              required
              min="1"
              value={quantite}
              onChange={(e) =>
                setQuantite(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="10"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm font-black focus:outline-none focus:border-[#4880FF] text-slate-800"
            />
          </div>

          {/* Motif */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Motif d'ajustement
            </label>
            <select
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4880FF] text-slate-800"
            >
              {typeOperation === "ajouter" ? (
                <>
                  <option value="Réapprovisionnement Fournisseur">
                    Réapprovisionnement Fournisseur
                  </option>
                  <option value="Retour Client Homologué">
                    Retour Client Homologué
                  </option>
                  <option value="Ajustement Inventaire Positif">
                    Ajustement Inventaire Positif
                  </option>
                </>
              ) : (
                <>
                  <option value="Casse / Péremption Produit">
                    Casse / Péremption Produit
                  </option>
                  <option value="Vente Magasin Physique">
                    Vente Magasin Physique
                  </option>
                  <option value="Échantillon / Testeur Promo">
                    Échantillon / Testeur Promo
                  </option>
                  <option value="Ajustement Inventaire Négatif">
                    Ajustement Inventaire Négatif
                  </option>
                </>
              )}
            </select>
          </div>

          {/* Remarque optionnelle */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Remarque / Note (Optionnel)
            </label>
            <input
              type="text"
              value={remarque}
              onChange={(e) => setRemarque(e.target.value)}
              placeholder="Ex: Bon de livraison #BL-9921"
              className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Preview du nouveau stock */}
          <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-xs text-slate-700">
            <span>Nouveau Stock après validation :</span>
            <span className="text-[#4880FF] font-black">
              {typeOperation === "ajouter"
                ? article.quantiteActuelle + (Number(quantite) || 0)
                : Math.max(0, article.quantiteActuelle - (Number(quantite) || 0))}{" "}
              unités
            </span>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onFermer}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              Valider l'ajustement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
