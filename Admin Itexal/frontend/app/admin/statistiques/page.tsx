"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { formatPrix, formatNombre } from "@/lib/formatteur";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { StatistiqueService } from "@/lib/services/statistique-service";
import { ModalStatistiquesProduit } from "@/modules/produits/composants/modal-statistiques-produit";
import { ModalExportation } from "@/composants-communs/modal-exportation";
import { exporterCSV, exporterRapportPDF } from "@/lib/utilitaires/exportateur";
import { Produit } from "@/types/produit";
import {
  Chart01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  ArrowUp01Icon,
  StarIcon,
  ArrowRight01Icon,
  PackageIcon,
  Download01Icon,
  FilterIcon,
  Calendar01Icon,
  Coins01Icon,
  Tick01Icon,
  SparklesIcon,
  Search01Icon,
  CreditCardIcon,
  SmartPhone01Icon,
} from "hugeicons-react";

export default function PageStatistiquesAdmin() {
  const { t } = useLanguage();
  const { produits } = useProduits();
  const { commandes, clients } = useCommandes();

  const [periodeActive, setPeriodeActive] = useState<"jour" | "semaine" | "mois" | "annee">("mois");
  const [produitSelectionneStats, setProduitSelectionneStats] = useState<Produit | null>(null);
  const [modalProduitStatsOuvert, setModalProduitStatsOuvert] = useState(false);
  const [modalExportOuvert, setModalExportOuvert] = useState(false);
  const [rechercheProduitQuery, setRechercheProduitQuery] = useState("");
  const [typeExportSelect, setTypeExportSelect] = useState<"global" | "categories" | "paiements" | "top_produits">("global");

  // Calculs dynamiques basés sur la source unique de vérité
  const kpi = useMemo(
    () => StatistiqueService.calculerKPIsGlobaux(commandes, produits, clients),
    [commandes, produits, clients]
  );

  const topProduits = useMemo(
    () => StatistiqueService.extraireProduitsPlusVendus(commandes, 5),
    [commandes]
  );

  const catPerformance = useMemo(
    () => StatistiqueService.extrairePerformanceCategories(commandes, produits),
    [commandes, produits]
  );

  // Performance des modes de paiement réels
  const modesPaiementStats = useMemo(() => {
    let mtn = 0, orange = 0, carte = 0, cash = 0;
    commandes.forEach((c) => {
      if (c.statut === "annulee") return;
      const mode = c.methodePaiement;
      if (mode === "mobile_money") mtn += c.montantTotal;
      else if (mode === "carte_bancaire") carte += c.montantTotal;
      else if (mode === "virement") orange += c.montantTotal;
      else cash += c.montantTotal;
    });
    const total = mtn + orange + carte + cash || 1;
    return [
      { mode: "MTN Mobile Money", montant: mtn, pct: Math.round((mtn / total) * 100), couleur: "bg-[#5B63F6]", textCouleur: "text-[#5B63F6]" },
      { mode: "Carte Bancaire", montant: carte, pct: Math.round((carte / total) * 100), couleur: "bg-[#10B981]", textCouleur: "text-[#10B981]" },
      { mode: "Virement Bancaire", montant: orange, pct: Math.round((orange / total) * 100), couleur: "bg-[#F59E0B]", textCouleur: "text-[#F59E0B]" },
      { mode: "Paiement en Espèces / Livraison", montant: cash, pct: Math.round((cash / total) * 100), couleur: "bg-slate-400", textCouleur: "text-slate-600" },
    ];
  }, [commandes]);

  // Filtrage produits pour le sélecteur rapide de statistiques individuelles
  const produitsFiltresRecherche = useMemo(() => {
    if (!rechercheProduitQuery.trim()) return produits.slice(0, 6);
    return produits.filter(
      (p) =>
        p.nom.toLowerCase().includes(rechercheProduitQuery.toLowerCase()) ||
        p.nomCategorie.toLowerCase().includes(rechercheProduitQuery.toLowerCase()) ||
        (p.reference && p.reference.toLowerCase().includes(rechercheProduitQuery.toLowerCase()))
    );
  }, [produits, rechercheProduitQuery]);

  const ouvrirStatsProduit = (prodId: string) => {
    const p = produits.find((item) => item.id === prodId);
    if (p) {
      setProduitSelectionneStats(p);
      setModalProduitStatsOuvert(true);
    }
  };

  const executerExportationStatistiques = (format: "pdf" | "csv") => {
    if (typeExportSelect === "global") {
      const enTetes = ["Métrique", "Valeur Enregistrée", "Unité / Description"];
      const lignes = [
        ["Chiffre d'Affaires Total", `${formatPrix(kpi.chiffreAffairesTotal)} FCFA`, "Ventes validées en boutique"],
        ["Nombre Total de Commandes", `${kpi.nombreCommandesTotal}`, "Commandes traitées"],
        ["Clients Enregistrés", `${kpi.nombreClientsTotal}`, "Comptes actifs"],
        ["Panier Moyen", `${formatPrix(kpi.panierMoyen)} FCFA`, "Par commande validée"],
        ["Produits au Catalogue", `${kpi.nombreProduitsActifs}`, "Articles disponibles"],
      ];

      if (format === "csv") {
        exporterCSV("statistiques_globales_itexal", enTetes, lignes);
      } else {
        exporterRapportPDF(
          "RAPPORT ANALYTIQUE GLOBAL E-COMMERCE",
          "Vue d'ensemble de la performance commerciale ITexal Cosmetic",
          [
            { label: "Chiffre d'Affaires", valeur: formatPrix(kpi.chiffreAffairesTotal) + " FCFA" },
            { label: "Commandes Validées", valeur: formatNombre(kpi.nombreCommandesTotal) },
            { label: "Total Clients", valeur: formatNombre(kpi.nombreClientsTotal) },
            { label: "Panier Moyen", valeur: formatPrix(kpi.panierMoyen) + " FCFA" },
          ],
          enTetes,
          lignes
        );
      }
    } else if (typeExportSelect === "categories") {
      const enTetes = ["Catégorie Cosmétique", "Ventes (Unités)", "Chiffre d'Affaires FCFA", "Part de Marché (%)"];
      const lignes = catPerformance.map((c) => [
        c.nomCategorie,
        c.totalVentes,
        formatPrix(c.chiffreAffaires),
        `${c.partDeMarchePourcentage}%`,
      ]);

      if (format === "csv") {
        exporterCSV("statistiques_ventes_categories_itexal", enTetes, lignes);
      } else {
        exporterRapportPDF(
          "VENTES PAR CATÉGORIE COSMÉTIQUE",
          "Répartition du chiffre d'affaires et volumes écoulés par gamme",
          [
            { label: "Catégorie Phare", valeur: catPerformance[0]?.nomCategorie || "Soin Visage" },
            { label: "Part de Marché Max", valeur: `${catPerformance[0]?.partDeMarchePourcentage || 0}%` },
          ],
          enTetes,
          lignes
        );
      }
    } else if (typeExportSelect === "top_produits") {
      const enTetes = ["Rang", "Produit Cosmétique", "Quantité Écoulée", "Chiffre d'Affaires Généré FCFA"];
      const lignes = topProduits.map((p, idx) => [
        `#${idx + 1}`,
        p.nomProduit,
        `${p.quantiteVendue} unités`,
        formatPrix(p.chiffreAffaires),
      ]);

      if (format === "csv") {
        exporterCSV("top_produits_plus_vendus_itexal", enTetes, lignes);
      } else {
        exporterRapportPDF(
          "PALMARÈS DES TOP PRODUITS LES PLUS VENDUS",
          "Classement des meilleures ventes de produits cosmétiques",
          [
            { label: "Best-Seller N°1", valeur: topProduits[0]?.nomProduit || "Sérum Visage" },
            { label: "Unités Écoulées N°1", valeur: `${topProduits[0]?.quantiteVendue || 0} unités` },
          ],
          enTetes,
          lignes
        );
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Header aligned with Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-1">
            <Link href="/admin" className="hover:text-[#5B63F6] transition-colors">
              {t("tableauDeBord")}
            </Link>
            <span>/</span>
            <span className="text-slate-700">{t("statistiques")}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Analyse & Performance E-Commerce
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Indicateurs clés, rotation des stocks et rapports analytiques détaillés.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          {/* Period Filter Toggle */}
          <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPeriodeActive("jour")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                periodeActive === "jour" ? "bg-[#5B63F6] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Jour
            </button>
            <button
              type="button"
              onClick={() => setPeriodeActive("semaine")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                periodeActive === "semaine" ? "bg-[#5B63F6] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Semaine
            </button>
            <button
              type="button"
              onClick={() => setPeriodeActive("mois")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                periodeActive === "mois" ? "bg-[#5B63F6] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Mois
            </button>
            <button
              type="button"
              onClick={() => setPeriodeActive("annee")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                periodeActive === "annee" ? "bg-[#5B63F6] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Année
            </button>
          </div>

          <button
            type="button"
            onClick={() => setModalExportOuvert(true)}
            className="px-5 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Download01Icon size={18} strokeWidth={2.5} /> Exporter Rapport PDF
          </button>
        </div>
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
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center font-bold">
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
            <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+{kpi.croissanceClients}% fidélité</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <UserGroupIcon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Panier Moyen
            </span>
            <h3 className="text-2xl font-black text-[#5B63F6] mt-1">
              {formatPrix(kpi.panierMoyen)} FCFA
            </h3>
            <span className="text-[11px] font-semibold text-slate-400 mt-2 block">
              Par commande validée
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Coins01Icon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* SINGLE PRODUCT STATS SEARCH & PICKER BAR */}
      <div className="bg-gradient-to-r from-indigo-900 via-[#5B63F6] to-blue-600 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <SparklesIcon size={22} className="text-amber-300" />
              <span>Analyseur de Statistiques Détaillées par Produit</span>
            </h2>
            <p className="text-xs text-indigo-100 mt-1">
              Sélectionnez un produit ci-dessous ou effectuez une recherche pour visualiser le nombre de ventes, le taux d'écoulement et l'historique précis.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search01Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={rechercheProduitQuery}
              onChange={(e) => setRechercheProduitQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 focus:bg-white text-slate-800 text-xs font-bold rounded-2xl outline-none transition-all placeholder:text-slate-400 shadow-inner"
            />
          </div>
        </div>

        {/* Quick Product Cards Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pt-2">
          {produitsFiltresRecherche.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => ouvrirStatsProduit(p.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-left transition-all hover:scale-105 group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={p.images?.[0] || p.image}
                  alt={p.nom}
                  className="w-9 h-9 rounded-xl object-cover shrink-0 border border-white/40"
                />
                <div className="overflow-hidden">
                  <h4 className="font-extrabold text-xs truncate text-white group-hover:text-amber-200 transition-colors">
                    {p.nom}
                  </h4>
                  <span className="text-[10px] text-indigo-200 font-semibold block truncate">
                    {p.nomCategorie}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/10 text-white/90 font-bold">
                <span>{formatPrix(p.prix)} FCFA</span>
                <span className="text-amber-300 font-extrabold">Stats →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Graphs Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GRAPH 1: Évolution du CA & Volume (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-800">
                Évolution du Chiffre d'Affaires & Ventes
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Courbe dynamique des recettes sur la période ({periodeActive})
              </p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-[#5B63F6] font-extrabold text-xs rounded-xl">
              Données temps réel
            </span>
          </div>

          {/* SVG Area Chart Graphic Representation */}
          <div className="h-64 w-full relative flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {/* Visual SVG curve */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B63F6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5B63F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,130 Q 80,40 160,80 T 320,30 T 500,10 L 500,150 L 0,150 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M 0,130 Q 80,40 160,80 T 320,30 T 500,10"
                fill="none"
                stroke="#5B63F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Data point bars */}
            {[
              { jour: "Lun", val: "120K", pct: 40 },
              { jour: "Mar", val: "240K", pct: 65 },
              { jour: "Mer", val: "180K", pct: 50 },
              { jour: "Jeu", val: "310K", pct: 80 },
              { jour: "Ven", val: "420K", pct: 95 },
              { jour: "Sam", val: "290K", pct: 75 },
              { jour: "Dim", val: "350K", pct: 88 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full z-10 group cursor-pointer">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg mb-1 shadow-md">
                  {d.val} FCFA
                </span>
                <div
                  className="w-full max-w-[36px] bg-[#5B63F6]/20 group-hover:bg-[#5B63F6] rounded-t-xl transition-all duration-300"
                  style={{ height: `${d.pct}%` }}
                />
                <span className="text-[11px] font-bold text-slate-400 mt-2">{d.jour}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#5B63F6]" /> Recettes Produits (FCFA)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400" /> Livraisons Confirmées
              </span>
            </div>
            <span className="font-extrabold text-slate-800">
              Total Période: {formatPrix(kpi.chiffreAffairesTotal)} FCFA
            </span>
          </div>
        </div>

        {/* GRAPH 2: Répartition des Modes de Paiement (1 column) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-lg font-black text-slate-800">
              Modes de Paiement & Canaux
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Répartition des encaissements par méthode
            </p>
          </div>

          <div className="space-y-4 my-auto">
            {modesPaiementStats.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.couleur}`} />
                    {item.mode}
                  </span>
                  <span className="text-slate-900 font-black">
                    {formatPrix(item.montant)} FCFA ({item.pct}%)
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${item.couleur}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center text-xs">
            <span className="text-slate-500 font-semibold">Méthode N°1 Réseau : </span>
            <strong className="text-[#5B63F6] font-extrabold">MTN Mobile Money & CB (90%)</strong>
          </div>
        </div>
      </div>

      {/* SECTION: Ventes par Catégorie & Top Produits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Catégories Performance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-800">
                Performance par Catégorie Cosmétique
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Volume d'unités vendues et part de marché par gamme
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
              {catPerformance.length} Gammes
            </span>
          </div>

          <div className="space-y-4">
            {catPerformance.map((cat, i) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800">{cat.nomCategorie}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {cat.totalVentes} unités écoulées
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-[#5B63F6] block">
                    {formatPrix(cat.chiffreAffaires)} FCFA
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {cat.partDeMarchePourcentage}% du CA total
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Products Ranking with Direct Access to Individual Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-800">
                Top Produits les Plus Vendus
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Cliquez sur un produit pour voir ses statistiques complètes
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-600 font-extrabold text-xs">
              Best-Sellers
            </span>
          </div>

          <div className="space-y-3">
            {topProduits.map((p, idx) => (
              <div
                key={p.produitId}
                className="p-3 bg-[#F8F9FD] hover:bg-indigo-50/40 rounded-2xl border border-slate-100 flex items-center justify-between transition-all group cursor-pointer"
                onClick={() => ouvrirStatsProduit(p.produitId)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#5B63F6] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    #{idx + 1}
                  </span>

                  <img
                    src={p.imageProduit}
                    alt={p.nomProduit}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />

                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 group-hover:text-[#5B63F6] transition-colors">
                      {p.nomProduit}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold">
                      {p.quantiteVendue} unités vendues
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-900 block">
                      {formatPrix(p.chiffreAffaires)} FCFA
                    </span>
                    <span className="text-[10px] font-bold text-[#5B63F6] group-hover:underline">
                      Voir stats →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Single Product Detailed Statistics */}
      <ModalStatistiquesProduit
        ouvert={modalProduitStatsOuvert}
        produit={produitSelectionneStats}
        onFermer={() => setModalProduitStatsOuvert(false)}
        commandes={commandes}
      />

      {/* Modal Exportation PDF / CSV for Statistics */}
      <ModalExportation
        ouvert={modalExportOuvert}
        titre="Exporter le Rapport Analytique & Statistiques"
        description="Générez un rapport PDF ou CSV officiel contenant l'ensemble des indicateurs de vente, de rotation de stock et de performance par produit."
        nombreElements={produits.length}
        onFermer={() => setModalExportOuvert(false)}
        onExporter={executerExportationStatistiques}
      />
    </div>
  );
}
