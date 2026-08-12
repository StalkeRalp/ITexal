"use client";

import React, { useState } from "react";
import { Produit } from "../types/produit";
import { formatPrix } from "@/lib/formatteur";
import {
  Search01Icon,
  Cancel01Icon,
  Globe02Icon,
  PackageIcon,
  SparklesIcon,
  InformationCircleIcon,
  Edit02Icon,
  Delete02Icon,
  Chart01Icon,
} from "hugeicons-react";

interface FicheDetailProduitProps {
  produit: Produit | null;
  onFermer: () => void;
  onEditer: (produit: Produit) => void;
  onSupprimer?: (id: string) => void;
  onVoirStatistiques?: (produit: Produit) => void;
}

export const FicheDetailProduit: React.FC<FicheDetailProduitProps> = ({
  produit,
  onFermer,
  onEditer,
  onSupprimer,
  onVoirStatistiques,
}) => {
  const [indexImage, setIndexImage] = useState(0);

  if (!produit) return null;

  const imageParDefaut =
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80";

  const images =
    produit.images && produit.images.length > 0
      ? produit.images
      : [imageParDefaut];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-indigo-900/10 border-2 border-slate-200/90 ring-1 ring-slate-200/60 space-y-5 flex flex-col justify-between animate-fadeIn sticky top-24 z-20 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-50/80 border-b border-slate-200/80 -mx-6 -mt-6 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#5B63F6] font-black text-sm flex items-center justify-center border border-blue-100">
            <Search01Icon size={18} strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Fiche Produit Détaillée
            </h3>
            <p className="text-[11px] font-mono font-bold text-[#5B63F6]">
              {produit.reference}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onFermer}
          aria-label="Fermer le volet"
          className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-extrabold flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="Fermer le volet"
        >
          <Cancel01Icon size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Main Visual Gallery */}
      <div className="space-y-3">
        <div className="w-full h-60 rounded-2xl bg-[#F8F9FD] border border-slate-200 overflow-hidden relative group shadow-inner">
          <img
            src={images[indexImage] || imageParDefaut}
            alt={produit.nom}
            onError={(e) => {
              (e.target as HTMLImageElement).src = imageParDefaut;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {produit.prixPromotionnel && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white font-black text-[10px] rounded-xl shadow-md">
              PROMO
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setIndexImage(idx)}
                aria-label={`Afficher l'image ${idx + 1}`}
                className={`w-12 h-12 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                  indexImage === idx
                    ? "border-[#5B63F6] scale-105 shadow-sm"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Vignette ${idx + 1}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = imageParDefaut;
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Identity & Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-xl bg-blue-50 text-[#5B63F6] text-xs font-bold border border-blue-100/80">
            {produit.nomCategorie || "Soin Cosmétique"}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/60">
            {produit.nomMarque || "ITexal"}
          </span>
        </div>

        <h4 className="text-lg font-extrabold text-slate-900 leading-snug">
          {produit.nom}
        </h4>

        <div className="flex items-baseline gap-2.5 pt-1">
          <span className="text-2xl font-black text-[#5B63F6]">
            {formatPrix(produit.prixPromotionnel || produit.prix)} FCFA
          </span>
          {produit.prixPromotionnel && (
            <span className="text-xs line-through text-slate-400 font-medium">
              {formatPrix(produit.prix)} FCFA
            </span>
          )}
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-2 gap-2.5 bg-[#F8F9FD] p-3.5 rounded-2xl border border-slate-200/80 text-xs">
        <div>
          <span className="text-slate-400 font-bold block text-[10px] uppercase">
            Type de Peau
          </span>
          <span className="font-bold text-slate-800">
            {produit.typeDePeau || "Toutes peaux"}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-bold block text-[10px] uppercase">
            Contenance
          </span>
          <span className="font-bold text-slate-800">
            {produit.contenance || "Standard"}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-bold block text-[10px] uppercase">
            Origine
          </span>
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Globe02Icon size={14} className="text-[#5B63F6]" /> {produit.origine || "Cameroun"}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-bold block text-[10px] uppercase">
            Stock Réservé
          </span>
          <span
            className={`font-bold flex items-center gap-1 ${
              produit.stock > 10 ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            <PackageIcon size={14} /> {produit.stock} unités
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1 text-xs">
        <h5 className="font-bold uppercase text-[10px] tracking-wider text-slate-400">
          Description & Caractéristiques
        </h5>
        <p className="text-slate-600 leading-relaxed line-clamp-3">
          {produit.description || "Aucune description renseignée pour ce produit."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        {onVoirStatistiques && (
          <button
            type="button"
            onClick={() => onVoirStatistiques(produit)}
            className="w-full py-2.5 bg-indigo-50 hover:bg-[#5B63F6] text-[#5B63F6] hover:text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-indigo-200/60 cursor-pointer"
          >
            <Chart01Icon size={16} strokeWidth={2} />
            <span>Voir Statistiques Ventes & Stock</span>
          </button>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEditer(produit)}
            className="flex-1 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit02Icon size={16} strokeWidth={2} /> Éditer Produit
          </button>

          <button
            type="button"
            onClick={() => onSupprimer && onSupprimer(produit.id)}
            aria-label="Supprimer le produit"
            className="py-2.5 px-4 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors border border-rose-100 flex items-center justify-center cursor-pointer"
            title="Supprimer le produit"
          >
            <Delete02Icon size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};
