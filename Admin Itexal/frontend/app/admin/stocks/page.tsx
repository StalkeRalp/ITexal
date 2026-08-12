"use client";

import React, { useState, useMemo } from "react";
import {
  ModalAjustementStock,
  ArticleStockFull,
} from "@/modules/stocks/composants/modal-ajustement-stock";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  RefreshIcon,
  PackageIcon,
  Analytics01Icon,
  AlertCircleIcon,
  Search01Icon,
  Tick01Icon,
  Delete02Icon,
  FilterHorizontalIcon,
} from "hugeicons-react";

interface JournalAjustement {
  id: string;
  nomProduit: string;
  nouveauStock: number;
  seuilMin: number;
  seuilMax: number;
  motif: string;
  date: string;
  remarque?: string;
}

export default function PageStocksAdmin() {
  const { produits, modifierStockEtSeuils, supprimerProduit } = useProduits();
  const { t, formaterPrix, formaterDate, langue } = useLanguage();
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<"Tous" | "Faible" | "Rupture">("Tous");

  // Conversion dynamique des produits en ArticleStockFull
  const articlesStock: ArticleStockFull[] = useMemo(() => {
    return produits.map((p) => ({
      id: p.id,
      nomProduit: p.nom,
      categorie: p.nomCategorie || "Général",
      prix: p.prix,
      stockInitial: (p.stock || 0) + 20,
      quantiteActuelle: p.stock || 0,
      seuilAlerte: p.seuilAlerte || 15,
      seuilAlerteMax: p.seuilAlerteMax || 100,
      couleurs: ["bg-slate-800", "bg-[#5B63F6]"],
      iconProduit: p.nomCategorie || "Général",
      derniereMiseAJour: p.misAJourLe || p.creeLe || new Date().toLocaleDateString(langue === "fr" ? "fr-FR" : "en-US"),
    }));
  }, [produits, langue]);

  const [journal, setJournal] = useState<JournalAjustement[]>([]);
  const [articleAAjuster, setArticleAAjuster] = useState<ArticleStockFull | null>(null);
  const [messageSynchro, setMessageSynchro] = useState("");

  const totalReferences = articlesStock.length;
  const totalStockFaible = articlesStock.filter(
    (a) => a.quantiteActuelle > 0 && a.quantiteActuelle <= a.seuilAlerte
  ).length;
  const totalRuptures = articlesStock.filter((a) => a.quantiteActuelle === 0).length;

  const totalValeurStock = articlesStock.reduce(
    (sum, a) => sum + a.quantiteActuelle * a.prix,
    0
  );

  const labelTous = t("common.all");
  const articlesFiltres = articlesStock.filter((art) => {
    const matchRecherche =
      art.nomProduit.toLowerCase().includes(recherche.toLowerCase()) ||
      art.categorie.toLowerCase().includes(recherche.toLowerCase());

    const matchStatut =
      filtreStatut === "Tous"
        ? true
        : filtreStatut === "Faible"
        ? art.quantiteActuelle > 0 && art.quantiteActuelle <= art.seuilAlerte
        : art.quantiteActuelle === 0;

    return matchRecherche && matchStatut;
  });

  const rechargerStock = () => {
    setMessageSynchro(t("common.success"));
    setTimeout(() => setMessageSynchro(""), 3500);
  };

  const appliquerAjustementStock = (
    idArticle: string,
    nouveauStock: number,
    seuilMin: number,
    seuilMax: number,
    motif: string,
    remarque?: string
  ) => {
    const cible = articlesStock.find((a) => a.id === idArticle);
    if (!cible) return;

    // Mise à jour de la base globale des produits
    modifierStockEtSeuils(idArticle, nouveauStock, seuilMin, seuilMax);

    const nouvelleEntree: JournalAjustement = {
      id: `j-${Date.now()}`,
      nomProduit: cible.nomProduit,
      nouveauStock,
      seuilMin,
      seuilMax,
      motif,
      date: new Date().toLocaleDateString(langue === "fr" ? "fr-FR" : "en-US"),
      remarque,
    };

    setJournal((prev) => [nouvelleEntree, ...prev]);
    setMessageSynchro(`${t("stocks.adjustStockTitle")}: ${cible.nomProduit}`);
    setTimeout(() => setMessageSynchro(""), 3500);
    setArticleAAjuster(null);
  };

  const supprimerArticleHandler = (id: string) => {
    if (confirm(t("common.confirmDeleteMessage"))) {
      supprimerProduit(id);
      setMessageSynchro(t("products.deletedSuccess"));
      setTimeout(() => setMessageSynchro(""), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Quick Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("stocks.title")} ({totalReferences})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("stocks.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={rechargerStock}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshIcon size={16} /> {t("common.refresh")}
          </button>
        </div>
      </div>

      {messageSynchro && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-2xl animate-fadeIn flex items-center gap-2">
          <Tick01Icon size={16} /> <span>{messageSynchro}</span>
        </div>
      )}

      {/* Grid des KPI de Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("dashboard.kpiRevenue")}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {formaterPrix(totalValeurStock)}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              {totalReferences} {t("navigation.products")}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center font-bold">
            <Analytics01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("common.quantity")}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {articlesStock.reduce((s, a) => s + a.quantiteActuelle, 0)} u.
            </h3>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              {t("navigation.stocks")}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <PackageIcon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("products.lowStock")}
            </span>
            <h3 className="text-2xl font-black text-amber-600 mt-1">
              {totalStockFaible}
            </h3>
            <span className="text-[11px] text-amber-700/80 font-bold block mt-1">
              {t("stocks.alertThreshold")}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertCircleIcon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("products.outOfStock")}
            </span>
            <h3 className="text-2xl font-black text-rose-600 mt-1">{totalRuptures}</h3>
            <span className="text-[11px] text-rose-700/80 font-bold block mt-1">
              0 {t("common.quantity")}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertCircleIcon size={24} />
          </div>
        </div>
      </div>

      {/* Main Stock Table Container */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search01Icon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder={t("products.filterSearchPlaceholder")}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#5B63F6]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setFiltreStatut("Tous")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                filtreStatut === "Tous"
                  ? "bg-[#5B63F6] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t("common.all")} ({totalReferences})
            </button>
            <button
              type="button"
              onClick={() => setFiltreStatut("Faible")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                filtreStatut === "Faible"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t("products.lowStock")} ({totalStockFaible})
            </button>
            <button
              type="button"
              onClick={() => setFiltreStatut("Rupture")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                filtreStatut === "Rupture"
                  ? "bg-rose-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t("products.outOfStock")} ({totalRuptures})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-4">{t("navigation.products")}</th>
                <th className="py-4 px-4">{t("navigation.categories")}</th>
                <th className="py-4 px-4 text-right">{t("common.price")}</th>
                <th className="py-4 px-4 text-center">{t("common.quantity")}</th>
                <th className="py-4 px-4 text-center">{t("stocks.alertThreshold")} MIN</th>
                <th className="py-4 px-4 text-center">{t("stocks.alertThreshold")} MAX</th>
                <th className="py-4 px-4 text-center">{t("common.status")}</th>
                <th className="py-4 px-4 text-center">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {articlesFiltres.map((art) => {
                const estRupture = art.quantiteActuelle === 0;
                const estFaible =
                  art.quantiteActuelle > 0 && art.quantiteActuelle <= art.seuilAlerte;

                return (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">{art.nomProduit}</td>
                    <td className="py-4 px-4 text-slate-500">{art.categorie}</td>
                    <td className="py-4 px-4 text-right font-mono font-bold">
                      {formaterPrix(art.prix)}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-black text-sm">
                      {art.quantiteActuelle} u.
                    </td>
                    <td className="py-4 px-4 text-center text-amber-600 font-mono font-extrabold">
                      {art.seuilAlerte} u.
                    </td>
                    <td className="py-4 px-4 text-center text-slate-400 font-mono font-bold">
                      {art.seuilAlerteMax || 100} u.
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {estRupture ? (
                        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                          {t("products.outOfStock")}
                        </span>
                      ) : estFaible ? (
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold">
                          {t("products.lowStock")}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                          {t("products.inStock")}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setArticleAAjuster(art)}
                          className="px-3.5 py-1.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <FilterHorizontalIcon size={14} />
                          <span>{t("common.edit")}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => supprimerArticleHandler(art.id)}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                          title={t("common.delete")}
                        >
                          <Delete02Icon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal d'ajustement du Stock & Seuils */}
      {articleAAjuster && (
        <ModalAjustementStock
          article={articleAAjuster}
          onFermer={() => setArticleAAjuster(null)}
          onValiderAjustement={appliquerAjustementStock}
        />
      )}
    </div>
  );
}
