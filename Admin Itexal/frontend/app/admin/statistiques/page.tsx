"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { formatPrix } from "@/lib/formatteur";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { StatistiqueService } from "@/lib/services/statistique-service";
import {
  Chart01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  ArrowUp01Icon,
  StarIcon,
  ArrowRight01Icon,
  PackageIcon,
} from "hugeicons-react";

export default function PageStatistiquesAdmin() {
  const { t } = useLanguage();
  const { produits } = useProduits();
  const { commandes, clients } = useCommandes();
  const [mois, setMois] = useState("Aujourd'hui");

  // Calculs dynamiques basés sur la source unique de vérité
  const kpi = useMemo(
    () => StatistiqueService.calculerKPIsGlobaux(commandes, produits, clients),
    [commandes, produits, clients]
  );

  const topProduits = useMemo(
    () => StatistiqueService.extraireProduitsPlusVendus(commandes, 4),
    [commandes]
  );

  const catPerformance = useMemo(
    () => StatistiqueService.extrairePerformanceCategories(commandes, produits),
    [commandes, produits]
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-1">
            <Link href="/admin" className="hover:text-[#4880FF] transition-colors">
              {t("tableauDeBord")}
            </Link>
            <span>/</span>
            <span className="text-slate-700">{t("statistiques")}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Analyse & Performance E-Commerce
          </h1>
        </div>

        <Link
          href="/admin"
          className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <span>← Dashboard Principal</span>
        </Link>
      </div>

      {/* KPI Cards Bar (Dynamic Source of Truth) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Chiffre d'Affaires
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {formatPrix(kpi.chiffreAffairesTotal)} FCFA
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+{kpi.croissanceChiffreAffaires}% ce mois</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Chart01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Commandes
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpi.nombreCommandesTotal}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+{kpi.croissanceCommandes}% validées</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShoppingBag01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Clients Actifs
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpi.nombreClientsTotal}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+{kpi.croissanceClients}% fidélisés</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <UserGroupIcon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Panier Moyen
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {formatPrix(kpi.panierMoyen)} FCFA
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-2">
              <span>Basé sur {commandes.length} commandes</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <PackageIcon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Grid 2 colonnes: Top Produits & Performance Catégories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Produits Plus Vendus */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Produits les Plus Vendus
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Classement calculé depuis les lignes de commande réelles.
              </p>
            </div>
            <Link
              href="/admin/produits"
              className="text-xs font-bold text-[#4880FF] hover:underline flex items-center gap-1"
            >
              Catalogue <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {topProduits.map((item, idx) => (
              <div
                key={item.produitId}
                className="p-3.5 bg-[#F8F9FD] rounded-2xl border border-slate-200/70 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#4880FF] font-black text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={item.imageProduit}
                      alt={item.nomProduit}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-800 truncate">
                      {item.nomProduit}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {item.quantiteVendue} unité(s) vendue(s)
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-xs text-slate-900 block">
                    {formatPrix(item.chiffreAffaires)} FCFA
                  </span>
                </div>
              </div>
            ))}

            {topProduits.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">
                Aucune vente enregistrée pour le moment.
              </p>
            )}
          </div>
        </div>

        {/* Repartition des Ventes par Catégorie */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Performance par Catégorie
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Part de marché et chiffre d'affaires par gamme de soin.
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="text-xs font-bold text-[#4880FF] hover:underline flex items-center gap-1"
            >
              Catégories <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {catPerformance.map((cat) => (
              <div key={cat.categorieId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{cat.nomCategorie}</span>
                  <span className="font-mono font-black text-slate-900">
                    {formatPrix(cat.chiffreAffaires)} FCFA ({cat.partDeMarchePourcentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#4880FF] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(5, cat.partDeMarchePourcentage))}%` }}
                  />
                </div>
              </div>
            ))}

            {catPerformance.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">
                Aucune donnée de catégorie enregistrée.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
