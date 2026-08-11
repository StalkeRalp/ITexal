"use client";

import React, { useState } from "react";
import { Produit } from "../types/produit";
import { formatPrix } from "@/lib/formatteur";
import {
  Search01Icon,
  Edit02Icon,
  Cancel01Icon,
  Globe02Icon,
  PackageIcon,
  SparklesIcon,
  InformationCircleIcon,
  AlertCircleIcon,
  Leaf01Icon,
  PrinterIcon,
} from "hugeicons-react";

interface ModalDetailProduitProps {
  ouvert?: boolean;
  produit: Produit | null;
  onFermer: () => void;
  onEditer?: (produit: Produit) => void;
  onToggleFavori?: (id: string) => void;
}

export const ModalDetailProduit: React.FC<ModalDetailProduitProps> = ({
  ouvert = true,
  produit,
  onFermer,
  onEditer,
  onToggleFavori,
}) => {
  const [indexImage, setIndexImage] = useState(0);

  if (!ouvert || !produit) return null;

  const images =
    produit.images && produit.images.length > 0
      ? produit.images
      : [
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <Search01Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Fiche Détaillée du Produit
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Référence : {produit.reference}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onFermer();
                onEditer?.(produit);
              }}
              className="px-4 py-2 bg-blue-50 hover:bg-[#4880FF] text-[#4880FF] hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <Edit02Icon size={16} strokeWidth={2} />
              <span>Éditer</span>
            </button>
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
          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visuals Gallery */}
            <div className="space-y-3">
              <div className="w-full h-72 rounded-2xl bg-[#F8F9FD] border border-slate-200/80 overflow-hidden relative group">
                <img
                  src={images[indexImage]}
                  alt={produit.nom}
                  className="w-full h-full object-cover"
                />
                {produit.prixPromotionnel && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white font-extrabold text-xs rounded-lg shadow-sm">
                    PROMO
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIndexImage(idx)}
                      aria-label={`Afficher l'image ${idx + 1}`}
                      className={`w-14 h-14 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                        indexImage === idx
                          ? "border-[#4880FF] scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Vignette ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* General Identity & Pricing */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#4880FF] text-xs font-bold">
                    {produit.nomCategorie || "Soin Cosmétique"}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                    {produit.nomMarque || "ITexal"}
                  </span>
                </div>

                <h1 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {produit.nom}
                </h1>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-black text-[#4880FF]">
                    {formatPrix(produit.prixPromotionnel || produit.prix)} FCFA
                  </span>
                  {produit.prixPromotionnel && (
                    <span className="text-sm line-through text-slate-400 font-medium">
                      {formatPrix(produit.prix)} FCFA
                    </span>
                  )}
                </div>
              </div>

              {/* Key Features Badges */}
              <div className="grid grid-cols-2 gap-2 bg-[#F8F9FD] p-3 rounded-2xl border border-slate-200/60">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">
                    Type de Peau
                  </span>
                  <span className="font-bold text-slate-800">
                    {produit.typeDePeau || "Toutes peaux"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">
                    Contenance
                  </span>
                  <span className="font-bold text-slate-800">
                    {produit.contenance || "Standard"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">
                    Origine
                  </span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Globe02Icon size={14} className="text-[#4880FF]" /> {produit.origine || "Cameroun"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">
                    Stock Disponible
                  </span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      produit.stock > 10
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    <PackageIcon size={14} /> {produit.stock} unités
                  </span>
                </div>
              </div>

              {/* Description synthétique */}
              <div>
                <h4 className="font-bold uppercase text-[10px] tracking-wider text-slate-400 mb-1">
                  Description
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {produit.description || "Aucune description renseignée."}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Specifications Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
            {/* Composition & Conseils */}
            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60 space-y-3">
              <div>
                <h4 className="font-bold uppercase text-[11px] tracking-wider text-[#4880FF] mb-1 flex items-center gap-1">
                  <SparklesIcon size={14} /> Composition INCI
                </h4>
                <p className="text-slate-700 font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
                  {produit.composition ||
                    "Aqua, Argania Spinosa Kernel Oil, Glycerin, Tocopherol, Shea Butter."}
                </p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-[11px] tracking-wider text-[#4880FF] mb-1 flex items-center gap-1">
                  <InformationCircleIcon size={14} /> Conseils d'utilisation
                </h4>
                <p className="text-slate-600">
                  {produit.conseilsUtilisation ||
                    "Appliquer quotidiennement sur peau propre et séchée pour une meilleure absorption."}
                </p>
              </div>
            </div>

            {/* Mode d'emploi & Précautions */}
            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-200/60 space-y-3">
              <div>
                <h4 className="font-bold uppercase text-[11px] tracking-wider text-amber-600 mb-1 flex items-center gap-1">
                  <AlertCircleIcon size={14} /> Précautions d'emploi
                </h4>
                <p className="text-slate-600">
                  {produit.precautions ||
                    "Usage externe uniquement. Éviter le contact direct avec les yeux. Conserver à l'abri de la lumière."}
                </p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-[11px] tracking-wider text-slate-600 mb-1 flex items-center gap-1">
                  <Leaf01Icon size={14} /> Mode d'application
                </h4>
                <p className="text-slate-600">
                  {produit.modeUtilisation ||
                    "Masser délicatement par mouvements circulaires jusqu'à pénétration complète."}
                </p>
              </div>
            </div>
          </div>

          {/* Variantes du Produit */}
          {produit.variantes && produit.variantes.length > 0 && (
            <div className="space-y-3 border-t border-slate-100 pt-5">
              <h4 className="font-bold uppercase text-[11px] tracking-wider text-slate-500">
                Variantes & Déclinaisons ({produit.variantes.length})
              </h4>
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">DECLINAISON</th>
                      <th className="py-3 px-4">SKU SPECIFIQUE</th>
                      <th className="py-3 px-4">PRIX</th>
                      <th className="py-3 px-4 text-right">STOCK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {produit.variantes.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {v.nomVariante}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono">
                          {v.sku}
                        </td>
                        <td className="py-3 px-4 font-black text-[#4880FF]">
                          {formatPrix(v.prix)} FCFA
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-700">
                          {v.stock} unités
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
          >
            <PrinterIcon size={16} strokeWidth={2} />
            <span>Imprimer Fiche</span>
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
