"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { CarteStatDashStack } from "@/modules/dashboard/composants/carte-stat-dashstack";
import { GraphiqueVentes } from "@/modules/dashboard/composants/graphique-ventes";
import { TableauTransactionsRecentes } from "@/modules/dashboard/composants/tableau-transactions-recentes";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { useNotifications } from "@/lib/context/NotificationContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { StatistiqueService } from "@/lib/services/statistique-service";
import {
  UserGroupIcon,
  PackageIcon,
  Chart01Icon,
  Clock01Icon,
  ShoppingCart01Icon,
  LeftTriangleIcon,
  Tick01Icon,
  SparklesIcon,
  ArrowRight01Icon,
} from "hugeicons-react";

export default function PageDashboardAdmin() {
  const { produits, modifierStockProduit } = useProduits();
  const { commandes, clients, modifierStatutCommande } = useCommandes();
  const { notifications, nombreNonLues: notifNonLues } = useNotifications();
  const { t, formaterPrix, langue } = useLanguage();

  // Calculs statistiques en temps réel depuis la source unique de vérité
  const kpi = useMemo(
    () => StatistiqueService.calculerKPIsGlobaux(commandes, produits, clients),
    [commandes, produits, clients]
  );

  // Stocks critiques : produits dont le stock est <= 15
  const stocksCritiques = useMemo(
    () =>
      produits
        .filter((p) => p.stock < 15)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5),
    [produits]
  );

  // Commandes urgentes (en attente ou en préparation)
  const commandesUrgentes = useMemo(
    () =>
      commandes
        .filter((c) => c.statut === "en_attente" || c.statut === "en_preparation")
        .slice(0, 5),
    [commandes]
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("dashboard.title")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("dashboard.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/statistiques"
            className="px-4 py-2.5 bg-indigo-50 hover:bg-[#5B63F6] text-[#5B63F6] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Chart01Icon size={18} strokeWidth={2} /> {t("navigation.statistics")}
          </Link>
          <Link
            href="/admin/commandes"
            className="px-4 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <ShoppingCart01Icon size={18} strokeWidth={2} /> {t("navigation.orders")}
          </Link>
        </div>
      </div>

      {/* Grid des 4 Cartes Statistiques Centralisées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatDashStack
          titre={t("dashboard.kpiClients")}
          valeur={kpi.nombreClientsTotal.toLocaleString(langue === "fr" ? "fr-FR" : "en-US")}
          icone={<UserGroupIcon size={24} strokeWidth={2} />}
          couleurFondIcone="#E5E5FF"
          couleurTexteIcone="#5B63F6"
          variation={`+${kpi.croissanceClients}%`}
          estPositive={true}
          textePeriode={t("common.active")}
        />

        <CarteStatDashStack
          titre={t("dashboard.kpiProductsSold")}
          valeur={kpi.nombreProduitsActifs.toLocaleString(langue === "fr" ? "fr-FR" : "en-US")}
          icone={<PackageIcon size={24} strokeWidth={2} />}
          couleurFondIcone="#FFF2D8"
          couleurTexteIcone="#FEC53D"
          variation={`${kpi.nombreStocksFaibles} ${t("products.lowStock")}`}
          estPositive={kpi.nombreStocksFaibles === 0}
          textePeriode={t("navigation.products")}
        />

        <CarteStatDashStack
          titre={t("dashboard.kpiRevenue")}
          valeur={formaterPrix(kpi.chiffreAffairesTotal)}
          icone={<Chart01Icon size={24} strokeWidth={2} />}
          couleurFondIcone="#E4F8F0"
          couleurTexteIcone="#4AD991"
          variation={`+${kpi.croissanceChiffreAffaires}%`}
          estPositive={true}
          textePeriode={t("common.total")}
        />

        <CarteStatDashStack
          titre={t("navigation.notifications")}
          valeur={String(notifNonLues)}
          icone={<Clock01Icon size={24} strokeWidth={2} />}
          couleurFondIcone="#FFEDEC"
          couleurTexteIcone="#FF907A"
          variation={notifNonLues > 0 ? `${notifNonLues} ${t("notifications.typeOrder")}` : t("common.success")}
          estPositive={notifNonLues === 0}
          textePeriode={t("notifications.title")}
        />
      </div>

      {/* Section Double Widget : Alertes Stocks Critique & Commandes Urgentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget 1: Stocks en cours de finition */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 font-black flex items-center justify-center text-sm border border-amber-200 shrink-0">
                <LeftTriangleIcon size={18} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {t("stocks.alertThreshold")}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {t("stocks.subtitle")}
                </p>
              </div>
            </div>

            <Link
              href="/admin/stocks"
              className="text-xs font-extrabold text-[#5B63F6] hover:underline flex items-center gap-1"
            >
              {t("common.viewDetails")} <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {stocksCritiques.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                {t("common.noData")}
              </p>
            ) : (
              stocksCritiques.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prod.images?.[0] || prod.image || "/placeholder.png"}
                      alt={prod.nom}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{prod.nom}</p>
                      <p className="text-[10px] text-slate-400">{prod.nomCategorie}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                        prod.stock === 0
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {prod.stock === 0 ? t("products.outOfStock") : `${prod.stock} ${t("common.quantity")}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => modifierStockProduit(prod.id, prod.stock + 10)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      +10
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Widget 2: Commandes en attente d'action */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-[#5B63F6] font-black flex items-center justify-center text-sm border border-indigo-200 shrink-0">
                <ShoppingCart01Icon size={18} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {t("dashboard.recentOrders")}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {t("orders.subtitle")}
                </p>
              </div>
            </div>

            <Link
              href="/admin/commandes"
              className="text-xs font-extrabold text-[#5B63F6] hover:underline flex items-center gap-1"
            >
              {t("dashboard.viewAllOrders")} <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {commandesUrgentes.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                {t("dashboard.emptyOrders")}
              </p>
            ) : (
              commandesUrgentes.map((cmd) => (
                <div
                  key={cmd.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-800">{cmd.reference}</p>
                    <p className="text-[11px] text-slate-500 truncate">{cmd.clientNom}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-black text-slate-900">
                      {formaterPrix(cmd.montantTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => modifierStatutCommande(cmd.id, "validee")}
                      className="px-2.5 py-1 bg-[#5B63F6] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                    >
                      {t("common.confirm")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Graphique de Ventes et Répartition (Chiffre d'Affaires + Donut) */}
      <div>
        <GraphiqueVentes />
      </div>

      {/* Deals & Offres Spéciales (Produits Réels) positionné en bas en pleine largeur */}
      <div>
        <TableauTransactionsRecentes />
      </div>
    </div>
  );
}
