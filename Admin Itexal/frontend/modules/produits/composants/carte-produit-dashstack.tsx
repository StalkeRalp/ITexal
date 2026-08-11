"use client";

import React, { useState } from "react";
import { Produit } from "../types/produit";
import { formatPrix } from "@/lib/formatteur";
import {
  FavouriteIcon,
  StarIcon,
  Edit02Icon,
  Delete02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

interface CarteProduitDashStackProps {
  produit: Produit;
  onToggleFavori?: (id: string) => void;
  onEditer?: (produit: Produit) => void;
  onVoirDetail?: (produit: Produit) => void;
  onSupprimer?: (id: string) => void;
}

import { useFavoris } from "@/lib/context/FavorisContext";

export const CarteProduitDashStack: React.FC<CarteProduitDashStackProps> = ({
  produit,
  onToggleFavori,
  onEditer,
  onVoirDetail,
  onSupprimer,
}) => {
  const [indexImage, setIndexImage] = useState(0);
  const { estFavori: verifierFavori, basculerFavori } = useFavoris();
  const favori = verifierFavori(produit.id);

  const imageParDefaut =
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80";

  const images =
    produit.images && produit.images.length > 0
      ? produit.images
      : [imageParDefaut];

  const imageSuivante = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndexImage((prev) => (prev + 1) % images.length);
  };

  const imagePrecedente = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndexImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavoriHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    basculerFavori(produit.id);
    if (onToggleFavori) {
      onToggleFavori(produit.id);
    }
  };

  return (
    <div
      onClick={() => onVoirDetail && onVoirDetail(produit)}
      className="w-full max-w-[361px] h-[497px] bg-white rounded-3xl p-6 shadow-sm border border-slate-100/90 flex flex-col justify-between transition-all hover:shadow-lg group cursor-pointer"
    >
      {/* Zone Image avec carrousel */}
      <div className="bg-[#F8F9FD] rounded-2xl h-[260px] flex items-center justify-center relative overflow-hidden shrink-0 border border-slate-100/60">
        <img
          src={images[indexImage] || imageParDefaut}
          alt={produit.nom}
          onError={(e) => {
            (e.target as HTMLImageElement).src = imageParDefaut;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {produit.prixPromotionnel && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-500 text-white font-extrabold text-[10px] rounded-lg shadow-sm">
            PROMO
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={imagePrecedente}
              aria-label="Image précédente"
              className="absolute left-2 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white transition-colors z-10"
              title="Image précédente"
            >
              <ArrowLeft01Icon size={14} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={imageSuivante}
              aria-label="Image suivante"
              className="absolute right-2 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white transition-colors z-10"
              title="Image suivante"
            >
              <ArrowRight01Icon size={14} strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>

      {/* Détails Produit */}
      <div className="flex-1 pt-4 flex flex-col justify-between">
        <div>
          {/* Titre & Bouton Favori */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-1">
                {produit.nom}
              </h3>
              <p className="text-xs font-extrabold text-[#4880FF] mt-1">
                {formatPrix(produit.prixPromotionnel || produit.prix)} FCFA
                {produit.prixPromotionnel && (
                  <span className="text-[10px] line-through text-slate-400 font-medium ml-2">
                    {formatPrix(produit.prix)} FCFA
                  </span>
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleFavoriHandler}
              aria-label="Ajouter aux favoris"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                favori
                  ? "bg-rose-50 text-rose-500 scale-105"
                  : "bg-[#F5F6FA] text-slate-400 hover:text-rose-500 hover:bg-rose-50"
              }`}
            >
              <FavouriteIcon size={18} strokeWidth={favori ? 2.5 : 2} />
            </button>
          </div>

          {/* Évaluation étoiles */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-400 gap-0.5">
              <StarIcon size={14} className="fill-amber-400 text-amber-400" />
              <StarIcon size={14} className="fill-amber-400 text-amber-400" />
              <StarIcon size={14} className="fill-amber-400 text-amber-400" />
              <StarIcon size={14} className="fill-amber-400 text-amber-400" />
              <StarIcon size={14} className="text-slate-300" />
            </div>
            <span className="text-slate-400 text-[11px] font-medium">(131)</span>
            <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Stock: {produit.stock}
            </span>
          </div>
        </div>

        {/* Actions Bottom */}
        <div className="flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditer && onEditer(produit);
            }}
            aria-label="Éditer le produit"
            className="flex-1 py-2.5 px-4 bg-[#F0F2FF] hover:bg-[#4880FF] text-[#4880FF] hover:text-white font-bold text-xs rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2"
          >
            <Edit02Icon size={16} strokeWidth={2} />
            <span>Modifier</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSupprimer && onSupprimer(produit.id);
            }}
            className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white font-bold text-xs transition-all flex items-center justify-center shrink-0"
            title="Supprimer le produit"
            aria-label="Supprimer le produit"
          >
            <Delete02Icon size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};
