"use client";

import React, { useState, useEffect } from "react";
import { ArticleStockFull } from "./modal-ajustement-stock";
import { Edit02Icon, Cancel01Icon } from "hugeicons-react";

interface ModalArticleStockFormulaireProps {
  ouvert: boolean;
  articleAEditer: ArticleStockFull | null;
  onFermer: () => void;
  onEnregistrer: (article: ArticleStockFull) => void;
}

export const ModalArticleStockFormulaire: React.FC<
  ModalArticleStockFormulaireProps
> = ({ ouvert, articleAEditer, onFermer, onEnregistrer }) => {
  const [nomProduit, setNomProduit] = useState("");
  const [categorie, setCategorie] = useState("Soin Visage");
  const [prix, setPrix] = useState<number | "">("");
  const [stockInitial, setStockInitial] = useState<number | "">(100);
  const [quantiteActuelle, setQuantiteActuelle] = useState<number | "">(50);
  const [seuilAlerte, setSeuilAlerte] = useState<number | "">(15);
  const [iconProduit, setIconProduit] = useState("Soin Visage");

  useEffect(() => {
    if (articleAEditer) {
      setNomProduit(articleAEditer.nomProduit);
      setCategorie(articleAEditer.categorie);
      setPrix(articleAEditer.prix);
      setStockInitial(articleAEditer.stockInitial);
      setQuantiteActuelle(articleAEditer.quantiteActuelle);
      setSeuilAlerte(articleAEditer.seuilAlerte);
      setIconProduit(articleAEditer.iconProduit);
    } else {
      setNomProduit("");
      setCategorie("Soin Visage");
      setPrix(15000);
      setStockInitial(100);
      setQuantiteActuelle(50);
      setSeuilAlerte(15);
      setIconProduit("Soin Visage");
    }
  }, [articleAEditer, ouvert]);

  if (!ouvert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomProduit || prix === "") return;

    const articleResultat: ArticleStockFull = {
      id: articleAEditer?.id || `stk-${Date.now()}`,
      nomProduit,
      categorie,
      prix: Number(prix),
      stockInitial: Number(stockInitial) || 100,
      quantiteActuelle: Number(quantiteActuelle) || 0,
      seuilAlerte: Number(seuilAlerte) || 15,
      iconProduit,
      couleurs: articleAEditer?.couleurs || ["bg-black", "bg-[#4880FF]"],
      derniereMiseAJour: new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(articleResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <Edit02Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {articleAEditer
                  ? "Éditer l'Article de Stock"
                  : "Nouveau Produit en Stock"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Définition des quantités initiales et seuils d'alerte.
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
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nom du Produit *
            </label>
            <input
              type="text"
              required
              value={nomProduit}
              onChange={(e) => setNomProduit(e.target.value)}
              placeholder="Ex: Sérum Visage Éclat Bio"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4880FF] text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Catégorie
              </label>
              <input
                type="text"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                placeholder="Soin Visage"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Identifiant Visuel
              </label>
              <input
                type="text"
                value={iconProduit}
                onChange={(e) => setIconProduit(e.target.value)}
                placeholder="Soin Visage"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Prix Unitaire (FCFA) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={prix}
                onChange={(e) =>
                  setPrix(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="15000"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Stock Initial
              </label>
              <input
                type="number"
                min="0"
                value={stockInitial}
                onChange={(e) =>
                  setStockInitial(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="100"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Quantité Actuelle en Stock
              </label>
              <input
                type="number"
                min="0"
                value={quantiteActuelle}
                onChange={(e) =>
                  setQuantiteActuelle(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                placeholder="50"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold text-[#4880FF] focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Seuil d'Alerte Stock Faible
              </label>
              <input
                type="number"
                min="1"
                value={seuilAlerte}
                onChange={(e) =>
                  setSeuilAlerte(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="15"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold text-amber-600 focus:outline-none focus:border-[#4880FF]"
              />
            </div>
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
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
