"use client";

import React from "react";
import { Categorie } from "../types/categorie";
import { Produit } from "@/types/produit";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  Tag01Icon,
  Add01Icon,
  Cancel01Icon,
  Edit02Icon,
  Delete02Icon,
  PackageIcon,
  SparklesIcon,
  Store01Icon,
  Coins01Icon,
} from "hugeicons-react";

interface FicheDetailCategorieProps {
  categorie: Categorie | null;
  produitsRattaches: Produit[];
  onFermer: () => void;
  onEditer: (cat: Categorie) => void;
  onSupprimer: (id: string) => void;
  onOuvrirToutesLesInfos: (cat: Categorie) => void;
}

export const FicheDetailCategorie: React.FC<FicheDetailCategorieProps> = ({
  categorie,
  produitsRattaches,
  onFermer,
  onEditer,
  onSupprimer,
  onOuvrirToutesLesInfos,
}) => {
  const { t, formaterPrix } = useLanguage();
  if (!categorie) return null;

  const totalStock = produitsRattaches.reduce((acc, p) => acc + (p.stock || 0), 0);
  const valeurTotal = produitsRattaches.reduce((acc, p) => acc + (p.prix * (p.stock || 0)), 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between animate-fadeIn relative">
      {/* En-tête de la fiche de détail */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Tag01Icon size={14} className="text-[#5B63F6]" />
          <span>{t("categories.categorySheet")}</span>
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOuvrirToutesLesInfos(categorie)}
            aria-label={t("categories.moreInfos")}
            className="w-7 h-7 rounded-full bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold flex items-center justify-center shadow-sm transition-all hover:scale-105 cursor-pointer"
            title={t("categories.moreInfos")}
          >
            <Add01Icon size={15} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={onFermer}
            aria-label={t("common.close")}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold flex items-center justify-center text-xs transition-colors cursor-pointer"
            title={t("common.close")}
          >
            <Cancel01Icon size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Image de Couverture / Bannière de la catégorie */}
      <div className="space-y-4">
        {categorie.image ? (
          <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-xs group bg-slate-100">
            <img
              src={categorie.image}
              alt={categorie.nom}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
              <div>
                <h3 className="text-lg font-black text-white drop-shadow-sm">{categorie.nom}</h3>
                <span className="inline-block mt-0.5 text-[10px] bg-white/90 backdrop-blur-sm text-slate-800 font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  {categorie.statut === "Actif" ? t("common.active") : t("common.inactive")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-gradient-to-tr from-indigo-500 to-[#5B63F6] rounded-2xl text-white shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-white shrink-0">
              <SparklesIcon size={28} />
            </div>
            <div>
              <h3 className="text-lg font-black">{categorie.nom}</h3>
              <p className="text-xs text-indigo-100 font-medium">Slug : {categorie.slug || "categorie"}</p>
              <span className="inline-block mt-1 text-[10px] bg-white/20 text-white font-extrabold px-2.5 py-0.5 rounded-full">
                {categorie.statut === "Actif" ? t("common.active") : t("common.inactive")}
              </span>
            </div>
          </div>
        )}

        {/* Description synthétique */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
          <span className="font-bold text-slate-400 uppercase text-[10px]">{t("common.description")}</span>
          <p className="font-medium text-slate-700 leading-relaxed">
            {categorie.description || t("common.noData")}
          </p>
        </div>

        {/* Cartes KPI clés de la catégorie */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-2xl">
            <PackageIcon size={18} className="mx-auto text-[#5B63F6] mb-1" />
            <span className="text-[10px] font-bold text-slate-400 block uppercase">{t("categories.attachedProducts")}</span>
            <span className="font-black text-slate-900 text-sm">{produitsRattaches.length}</span>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
            <Store01Icon size={18} className="mx-auto text-emerald-600 mb-1" />
            <span className="text-[10px] font-bold text-slate-400 block uppercase">{t("stocks.currentStock")}</span>
            <span className="font-black text-emerald-700 text-sm">{totalStock}</span>
          </div>

          <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-2xl">
            <Coins01Icon size={18} className="mx-auto text-amber-600 mb-1" />
            <span className="text-[10px] font-bold text-slate-400 block uppercase">{t("orders.totalAmount")}</span>
            <span className="font-black text-amber-800 text-xs line-clamp-1">{formaterPrix(valeurTotal)}</span>
          </div>
        </div>

        {/* Liste détaillée des produits rattachés */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-slate-800">
              {t("categories.attachedProducts")} ({produitsRattaches.length})
            </h4>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1 border border-slate-100 rounded-2xl p-2 bg-slate-50/40">
            {produitsRattaches.map((prod) => (
              <div
                key={prod.id}
                className="p-2.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={
                        prod.images && prod.images[0]
                          ? prod.images[0]
                          : prod.image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80"
                      }
                      alt={prod.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-xs truncate">{prod.nom}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Stock: {prod.stock} unités</p>
                  </div>
                </div>

                <span className="font-black text-[#5B63F6] text-xs shrink-0">
                  {formaterPrix(prod.prix)}
                </span>
              </div>
            ))}

            {produitsRattaches.length === 0 && (
              <div className="text-center py-6 text-slate-400 space-y-1">
                <PackageIcon size={24} className="mx-auto text-slate-300" />
                <p className="text-xs font-semibold">{t("categories.noProducts")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer (Éditer / Supprimer) */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onEditer(categorie)}
          className="flex-1 py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-[#5B63F6] font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Edit02Icon size={15} />
          <span>{t("common.edit")}</span>
        </button>

        <button
          type="button"
          onClick={() => onSupprimer(categorie.id)}
          className="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Delete02Icon size={15} />
          <span>{t("common.delete")}</span>
        </button>
      </div>
    </div>
  );
};
