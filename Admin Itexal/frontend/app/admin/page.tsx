"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CarteStatDashStack } from "@/modules/dashboard/composants/carte-stat-dashstack";
import { GraphiqueVentes } from "@/modules/dashboard/composants/graphique-ventes";
import { TableauTransactionsRecentes } from "@/modules/dashboard/composants/tableau-transactions-recentes";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useNotifications } from "@/lib/context/NotificationContext";
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
  const { produits } = useProduits();
  const { notifications } = useNotifications();

  // Stocks critiques : produits dont le stock est <= seuil d'alerte ou très faible (< 15)
  const stocksCritiques = useMemo(() =>
    produits
      .filter((p) => p.stock !== undefined && p.stock < 15)
      .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        nom: p.nom,
        stock: p.stock ?? 0,
        seuil: 15,
        categorie: p.nomCategorie ?? "Produit",
        image:
          p.images && p.images.length > 0
            ? p.images[0]
            : "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80",
      })),
    [produits]
  );

  const [stocksTraites, setStocksTraites] = useState<string[]>([]);
  const stocksAffiches = stocksCritiques.filter((s) => !stocksTraites.includes(s.id));

  const [commandesUrgentes, setCommandesUrgentes] = useState([
    {
      id: "CMD-00008",
      client: "Marcelle Ondo",
      montant: 48500,
      articles: 3,
      date: "Aujourd'hui 14:10",
      priorite: "Haute",
      statut: "En attente",
    },
    {
      id: "CMD-00005",
      client: "Jean-Philippe Kuate",
      montant: 89000,
      articles: 5,
      date: "Aujourd'hui 12:45",
      priorite: "Urgent VIP",
      statut: "En traitement",
    },
  ]);

  const reapprovisionnerStock = (id: string) => {
    setStocksTraites((prev) => [...prev, id]);
  };

  const validerCommandeUrgente = (id: string) => {
    setCommandesUrgentes((prev) => prev.filter((cmd) => cmd.id !== id));
  };

  // Stats dynamiques depuis le contexte
  const totalProduits = produits.length;
  const totalVentes = produits.reduce((acc, p) => acc + (p.stock !== undefined ? 0 : 0), 0);
  const notifNonLues = notifications.filter((n) => !n.lue).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Vue d'ensemble en temps réel des ventes, stocks et expéditions ITexal.
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

      {/* Grid des 4 Cartes Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatDashStack
          titre="Total User"
          valeur="40,689"
          icone={<UserGroupIcon size={24} strokeWidth={2} />}
          couleurFondIcone="#E5E5FF"
          couleurTexteIcone="#4880FF"
          variation="8.5%"
          estPositive={true}
          textePeriode="Up from yesterday"
        />

        <CarteStatDashStack
          titre="Produits Catalogue"
          valeur={String(totalProduits)}
          icone={<PackageIcon size={24} strokeWidth={2} />}
          couleurFondIcone="#FFF2D8"
          couleurTexteIcone="#FEC53D"
          variation={`${stocksAffiches.length} stock(s) critique(s)`}
          estPositive={stocksAffiches.length === 0}
          textePeriode="Produits actifs"
        />

        <CarteStatDashStack
          titre="Total Sales"
          valeur="89,000,000 FCFA"
          icone={<Chart01Icon size={24} strokeWidth={2} />}
          couleurFondIcone="#E4F8F0"
          couleurTexteIcone="#4AD991"
          variation="4.3%"
          estPositive={false}
          textePeriode="Down from yesterday"
        />

        <CarteStatDashStack
          titre="Notifications"
          valeur={String(notifNonLues)}
          icone={<Clock01Icon size={24} strokeWidth={2} />}
          couleurFondIcone="#FFEDEC"
          couleurTexteIcone="#FF907A"
          variation={notifNonLues > 0 ? `${notifNonLues} non lue(s)` : "Tout est lu"}
          estPositive={notifNonLues === 0}
          textePeriode="Notifications actives"
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
              Voir tout ({stocksAffiches.length}) <ArrowRight01Icon size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {stocksAffiches.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#F8F9FD] rounded-2xl border border-slate-200/70 flex items-center justify-between gap-3 transition-all hover:bg-slate-100/60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={item.image}
                      alt={item.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-800 truncate">
                      {item.nom}
                    </h4>
                    <span className="text-[10px] text-slate-500 block">
                      Catégorie : {item.categorie}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-700 font-black text-xs rounded-lg block">
                      Reste : {item.stock} u.
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                      Seuil: {item.seuil}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => reapprovisionnerStock(item.id)}
                    className="px-3 py-1.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    title="Lancer un réapprovisionnement"
                  >
                    + Stock
                  </button>
                </div>
              </div>
            ))}

            {stocksAffiches.length === 0 && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium py-4">
                <Tick01Icon size={16} className="text-emerald-500" />
                <span>Aucun stock critique à signaler actuellement.</span>
              </div>
            )}
          </div>
        </div>

        {/* Widget 2: Commandes Urgentes a Traiter */}
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
                      {cmd.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-extrabold text-[9px]">
                      {cmd.priorite}
                    </span>
                  </div>
                  <p className="font-bold text-xs text-slate-800">{cmd.client}</p>
                  <p className="text-[10px] text-slate-400">
                    {cmd.articles} articles • {cmd.date}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-black text-xs text-slate-900">
                    {formatPrix(cmd.montant)} FCFA
                  </span>

                  <button
                    type="button"
                    onClick={() => validerCommandeUrgente(cmd.id)}
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
