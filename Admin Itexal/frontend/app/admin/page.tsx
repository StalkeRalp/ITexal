"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { CarteStatDashStack } from "@/modules/dashboard/composants/carte-stat-dashstack";
import { GraphiqueVentes } from "@/modules/dashboard/composants/graphique-ventes";
import { TableauTransactionsRecentes } from "@/modules/dashboard/composants/tableau-transactions-recentes";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { useNotifications } from "@/lib/context/NotificationContext";
import { StatistiqueService } from "@/lib/services/statistique-service";
import { formatPrix } from "@/lib/formatteur";
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
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Vue d'ensemble en temps réel des ventes, stocks et expéditions Cosmetic Admin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/statistiques"
            className="px-4 py-2.5 bg-blue-50 hover:bg-[#4880FF] text-[#4880FF] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Chart01Icon size={18} strokeWidth={2} /> Statistiques Avancées
          </Link>
          <Link
            href="/admin/commandes"
            className="px-4 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <ShoppingCart01Icon size={18} strokeWidth={2} /> Gérer les Commandes
          </Link>
        </div>
      </div>

      {/* Grid des 4 Cartes Statistiques Centralisées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatDashStack
          titre="Clients Enregistrés"
          valeur={kpi.nombreClientsTotal.toLocaleString("fr-FR")}
          icone={<UserGroupIcon size={24} strokeWidth={2} />}
          couleurFondIcone="#E5E5FF"
          couleurTexteIcone="#4880FF"
          variation={`+${kpi.croissanceClients}%`}
          estPositive={true}
          textePeriode="Base clients active"
        />

        <CarteStatDashStack
          titre="Produits Catalogue"
          valeur={kpi.nombreProduitsActifs.toLocaleString("fr-FR")}
          icone={<PackageIcon size={24} strokeWidth={2} />}
          couleurFondIcone="#FFF2D8"
          couleurTexteIcone="#FEC53D"
          variation={`${kpi.nombreStocksFaibles} stock(s) faible(s)`}
          estPositive={kpi.nombreStocksFaibles === 0}
          textePeriode="Produits réels en stock"
        />

        <CarteStatDashStack
          titre="Chiffre d'Affaires"
          valeur={`${formatPrix(kpi.chiffreAffairesTotal)} FCFA`}
          icone={<Chart01Icon size={24} strokeWidth={2} />}
          couleurFondIcone="#E4F8F0"
          couleurTexteIcone="#4AD991"
          variation={`+${kpi.croissanceChiffreAffaires}%`}
          estPositive={true}
          textePeriode="Revenus cumulés"
        />

        <CarteStatDashStack
          titre="Notifications"
          valeur={String(notifNonLues)}
          icone={<Clock01Icon size={24} strokeWidth={2} />}
          couleurFondIcone="#FFEDEC"
          couleurTexteIcone="#FF907A"
          variation={notifNonLues > 0 ? `${notifNonLues} non lue(s)` : "À jour"}
          estPositive={notifNonLues === 0}
          textePeriode="Alertes système"
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
                  Stocks Critique & Ruptures Imminentes
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Articles ayant atteint le seuil d'alerte min.
                </p>
              </div>
            </div>

            <Link
              href="/admin/stocks"
              className="text-xs font-bold text-[#4880FF] hover:underline flex items-center gap-1"
            >
              Voir tout ({stocksCritiques.length}) <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {stocksCritiques.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#F8F9FD] rounded-2xl border border-slate-200/70 flex items-center justify-between gap-3 transition-all hover:bg-slate-100/60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={item.images[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80"}
                      alt={item.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-800 truncate">
                      {item.nom}
                    </h4>
                    <span className="text-[10px] text-slate-500 block">
                      Catégorie : {item.nomCategorie}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-700 font-black text-xs rounded-lg block">
                      Reste : {item.stock} u.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => modifierStockProduit(item.id, item.stock + 20)}
                    className="px-3 py-1.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    title="Lancer un réapprovisionnement de 20 unités"
                  >
                    + Stock
                  </button>
                </div>
              </div>
            ))}

            {stocksCritiques.length === 0 && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium py-4">
                <Tick01Icon size={16} className="text-emerald-500" />
                <span>Aucun stock critique à signaler actuellement.</span>
              </div>
            )}
          </div>
        </div>

        {/* Widget 2: Commandes Urgentes à Traiter */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 font-black flex items-center justify-center text-sm border border-rose-200 shrink-0">
                <SparklesIcon size={18} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Commandes Urgentes à Traiter
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Priorité haute nécessitant une expédition rapide.
                </p>
              </div>
            </div>

            <Link
              href="/admin/commandes"
              className="text-xs font-bold text-[#4880FF] hover:underline flex items-center gap-1"
            >
              Consulter ({commandesUrgentes.length}) <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {commandesUrgentes.map((cmd) => (
              <div
                key={cmd.id}
                className="p-3.5 bg-[#F8F9FD] rounded-2xl border border-slate-200/70 flex items-center justify-between gap-3 transition-all hover:bg-slate-100/60"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#4880FF]">
                      {cmd.reference}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-extrabold text-[9px] uppercase">
                      {cmd.statut.replace("_", " ")}
                    </span>
                  </div>
                  <p className="font-bold text-xs text-slate-800">{cmd.clientNom}</p>
                  <p className="text-[10px] text-slate-400">
                    {cmd.totalArticles} articles • {cmd.dateCommande}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-black text-xs text-slate-900">
                    {formatPrix(cmd.montantTotal)} FCFA
                  </span>

                  <button
                    type="button"
                    onClick={() => modifierStatutCommande(cmd.id, "validee")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    Valider
                  </button>
                </div>
              </div>
            ))}

            {commandesUrgentes.length === 0 && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium py-4">
                <Tick01Icon size={16} className="text-emerald-500" />
                <span>Toutes les commandes urgentes ont été traitées !</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Sales Details Graphique */}
      <GraphiqueVentes />

      {/* Section Deals Details Tableau */}
      <TableauTransactionsRecentes />
    </div>
  );
}
