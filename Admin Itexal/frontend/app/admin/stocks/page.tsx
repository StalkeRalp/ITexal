"use client";

import React, { useState } from "react";
import {
  ModalAjustementStock,
  ArticleStockFull,
} from "@/modules/stocks/composants/modal-ajustement-stock";
import { ModalArticleStockFormulaire } from "@/modules/stocks/composants/modal-article-stock-formulaire";
import { formatPrix, formatNombre } from "@/lib/formatteur";
import {
  RefreshIcon,
  Add01Icon,
  PackageIcon,
  Analytics01Icon,
  AlertCircleIcon,
  Search01Icon,
  Tick01Icon,
  Settings02Icon,
  Edit02Icon,
  Delete02Icon,
  LicenseIcon,
  SparklesIcon,
} from "hugeicons-react";

interface JournalAjustement {
  id: string;
  nomProduit: string;
  delta: number;
  motif: string;
  date: string;
  remarque?: string;
}

export default function PageStocksAdmin() {
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<"Tous" | "Faible" | "Rupture">("Tous");

  const [articlesStock, setArticlesStock] = useState<ArticleStockFull[]>([
    {
      id: "1",
      nomProduit: "Sérum Visage Éclat Bio",
      categorie: "Soin Visage",
      prix: 12000,
      stockInitial: 100,
      quantiteActuelle: 63,
      seuilAlerte: 15,
      couleurs: ["bg-black", "bg-slate-400", "bg-rose-300"],
      iconProduit: "Soin Visage",
      derniereMiseAJour: "11/08/2026",
    },
    {
      id: "2",
      nomProduit: "Crème Karité Pure ITexal",
      categorie: "Soin du Corps",
      prix: 18500,
      stockInitial: 80,
      quantiteActuelle: 8,
      seuilAlerte: 15,
      couleurs: ["bg-black", "bg-rose-400", "bg-blue-500"],
      iconProduit: "Soin du Corps",
      derniereMiseAJour: "11/08/2026",
    },
    {
      id: "3",
      nomProduit: "Masque Capillaire Argan Bio",
      categorie: "Gamme Capillaire",
      prix: 22500,
      stockInitial: 200,
      quantiteActuelle: 0,
      seuilAlerte: 20,
      couleurs: ["bg-purple-900", "bg-sky-400", "bg-[#4880FF]"],
      iconProduit: "Gamme Capillaire",
      derniereMiseAJour: "10/08/2026",
    },
    {
      id: "4",
      nomProduit: "Lotion Tonique Réparatrice",
      categorie: "Visage",
      prix: 15000,
      stockInitial: 120,
      quantiteActuelle: 67,
      seuilAlerte: 15,
      couleurs: ["bg-blue-900", "bg-black", "bg-rose-700"],
      iconProduit: "Visage",
      derniereMiseAJour: "09/08/2026",
    },
    {
      id: "5",
      nomProduit: "Huile Essentielle Bio ITexal",
      categorie: "Huiles",
      prix: 9800,
      stockInitial: 100,
      quantiteActuelle: 52,
      seuilAlerte: 15,
      couleurs: ["bg-blue-900", "bg-black"],
      iconProduit: "Huiles",
      derniereMiseAJour: "08/08/2026",
    },
    {
      id: "6",
      nomProduit: "Gel Nettoyant Bio Purifiant",
      categorie: "Nettoyants",
      prix: 14000,
      stockInitial: 60,
      quantiteActuelle: 12,
      seuilAlerte: 15,
      couleurs: ["bg-black", "bg-rose-400", "bg-amber-400"],
      iconProduit: "Nettoyants",
      derniereMiseAJour: "07/08/2026",
    },
    {
      id: "7",
      nomProduit: "Beurre de Cacao Pur 500g",
      categorie: "Corps",
      prix: 16000,
      stockInitial: 150,
      quantiteActuelle: 135,
      seuilAlerte: 20,
      couleurs: ["bg-purple-900", "bg-sky-400"],
      iconProduit: "Corps",
      derniereMiseAJour: "06/08/2026",
    },
  ]);

  const [journal, setJournal] = useState<JournalAjustement[]>([
    {
      id: "j-1",
      nomProduit: "Sérum Visage Éclat Bio",
      delta: 20,
      motif: "Réapprovisionnement Fournisseur",
      date: "11/08/2026 10:15",
    },
    {
      id: "j-2",
      nomProduit: "Masque Capillaire Argan Bio",
      delta: -15,
      motif: "Vente Magasin Physique",
      date: "10/08/2026 14:20",
    },
  ]);

  const [articleAAjuster, setArticleAAjuster] = useState<ArticleStockFull | null>(null);
  const [modalFormulaireOuvert, setModalFormulaireOuvert] = useState(false);
  const [articleAEditer, setArticleAEditer] = useState<ArticleStockFull | null>(null);
  const [messageSynchro, setMessageSynchro] = useState("");

  const totalReferences = articlesStock.length;
  const totalStockFaible = articlesStock.filter(
    (a) => a.quantiteActuelle > 0 && a.quantiteActuelle <= a.seuilAlerte
  ).length;
  const totalRuptures = articlesStock.filter((a) => a.quantiteActuelle === 0).length;
  const totalQuantiteGlobale = articlesStock.reduce(
    (acc, a) => acc + a.quantiteActuelle,
    0
  );

  const articlesFiltres = articlesStock.filter((item) => {
    const matchNom =
      item.nomProduit.toLowerCase().includes(recherche.toLowerCase()) ||
      item.categorie.toLowerCase().includes(recherche.toLowerCase());

    if (filtreStatut === "Faible") {
      return (
        matchNom &&
        item.quantiteActuelle > 0 &&
        item.quantiteActuelle <= item.seuilAlerte
      );
    }
    if (filtreStatut === "Rupture") {
      return matchNom && item.quantiteActuelle === 0;
    }
    return matchNom;
  });

  const ajustementRapide = (id: string, delta: number) => {
    setArticlesStock((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nouvelleQt = Math.max(0, item.quantiteActuelle + delta);
          return {
            ...item,
            quantiteActuelle: nouvelleQt,
            derniereMiseAJour: new Date().toLocaleDateString("fr-FR"),
          };
        }
        return item;
      })
    );
  };

  const validerAjustementModal = (
    id: string,
    delta: number,
    motif: string,
    remarque?: string
  ) => {
    const article = articlesStock.find((a) => a.id === id);
    if (!article) return;

    setArticlesStock((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nouvelleQt = Math.max(0, item.quantiteActuelle + delta);
          return {
            ...item,
            quantiteActuelle: nouvelleQt,
            derniereMiseAJour: new Date().toLocaleDateString("fr-FR"),
          };
        }
        return item;
      })
    );

    setJournal((prev) => [
      {
        id: `j-${Date.now()}`,
        nomProduit: article.nomProduit,
        delta,
        motif,
        date: new Date().toLocaleString("fr-FR"),
        remarque,
      },
      ...prev,
    ]);
  };

  const enregistrerArticleStock = (article: ArticleStockFull) => {
    setArticlesStock((prev) => {
      const existe = prev.some((a) => a.id === article.id);
      if (existe) {
        return prev.map((a) => (a.id === article.id ? article : a));
      } else {
        return [article, ...prev];
      }
    });
  };

  const supprimerArticleStock = (id: string) => {
    if (confirm("Voulez-vous supprimer cet article du gestionnaire de stock ?")) {
      setArticlesStock((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const synchroniserCommandes = () => {
    setArticlesStock((prev) =>
      prev.map((item) => {
        if (item.quantiteActuelle > 5) {
          return {
            ...item,
            quantiteActuelle: item.quantiteActuelle - 2,
            derniereMiseAJour: new Date().toLocaleDateString("fr-FR"),
          };
        }
        return item;
      })
    );
    setMessageSynchro("Stock synchronisé et déduit selon les dernières commandes passées.");
    setTimeout(() => setMessageSynchro(""), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Product Stock & Inventory
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gestion du stock initial, des ajustements d'entrées/sorties et des alertes de rupture.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={synchroniserCommandes}
            className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs rounded-xl border border-emerald-200 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <RefreshIcon size={16} strokeWidth={2} />
            <span>Synchro Commandes</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setArticleAEditer(null);
              setModalFormulaireOuvert(true);
            }}
            className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Add01Icon size={16} strokeWidth={2.5} />
            <span>Nouveau Stock</span>
          </button>
        </div>
      </div>

      {messageSynchro && (
        <div className="p-3 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl animate-fadeIn border border-emerald-200 flex items-center gap-2">
          <Tick01Icon size={16} className="text-emerald-700" />
          <span>{messageSynchro}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Références</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalReferences}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <PackageIcon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quantité Globale</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{formatNombre(totalQuantiteGlobale)} u.</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Analytics01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFiltreStatut("Faible")}
          className={`bg-white rounded-3xl p-5 shadow-sm border text-left transition-all ${
            filtreStatut === "Faible"
              ? "border-amber-400 ring-2 ring-amber-400/20"
              : "border-slate-100 hover:border-amber-200"
          } flex items-center justify-between`}
        >
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Stock Faible (&lt; 15)</span>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{totalStockFaible}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
            <AlertCircleIcon size={24} strokeWidth={2} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => setFiltreStatut("Rupture")}
          className={`bg-white rounded-3xl p-5 shadow-sm border text-left transition-all ${
            filtreStatut === "Rupture"
              ? "border-rose-500 ring-2 ring-rose-500/20"
              : "border-slate-100 hover:border-rose-200"
          } flex items-center justify-between`}
        >
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Ruptures de Stock</span>
            <h3 className="text-2xl font-black text-rose-500 mt-1">{totalRuptures}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
            <AlertCircleIcon size={24} strokeWidth={2} />
          </div>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par nom de produit ou catégorie..."
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF] text-slate-800"
          />
          <Search01Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-1 bg-[#F8F9FD] p-1 rounded-xl border border-slate-200/80">
          {(["Tous", "Faible", "Rupture"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFiltreStatut(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filtreStatut === tab
                  ? "bg-white text-[#4880FF] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab === "Tous" && <span>Tous les stocks</span>}
              {tab === "Faible" && (
                <>
                  <AlertCircleIcon size={14} className="text-amber-500" />
                  <span>Stock Faible ({totalStockFaible})</span>
                </>
              )}
              {tab === "Rupture" && (
                <>
                  <AlertCircleIcon size={14} className="text-rose-500" />
                  <span>Ruptures ({totalRuptures})</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                <th className="py-4 px-4">IMAGE</th>
                <th className="py-4 px-4">NOM DU PRODUIT</th>
                <th className="py-4 px-4">CATÉGORIE</th>
                <th className="py-4 px-4">PRIX (FCFA)</th>
                <th className="py-4 px-4 text-center">STOCK INITIAL</th>
                <th className="py-4 px-4 text-center">QUANTITÉ ACTUELLE</th>
                <th className="py-4 px-4 text-center">STATUT ALERTE</th>
                <th className="py-4 px-4 text-center">AJUSTEMENT RAPIDE</th>
                <th className="py-4 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {articlesFiltres.map((item) => {
                const estRupture = item.quantiteActuelle === 0;
                const estFaible =
                  !estRupture && item.quantiteActuelle <= item.seuilAlerte;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#4880FF] shadow-xs">
                        <SparklesIcon size={20} strokeWidth={2} />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800 text-sm">
                        {item.nomProduit}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Mis à jour: {item.derniereMiseAJour}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-medium">
                      {item.categorie}
                    </td>

                    <td className="py-3 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                      {formatPrix(item.prix)} FCFA
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-slate-500">
                      {item.stockInitial} u.
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-base font-black ${
                          estRupture
                            ? "text-rose-600"
                            : estFaible
                            ? "text-amber-600"
                            : "text-[#4880FF]"
                        }`}
                      >
                        {item.quantiteActuelle}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {estRupture ? (
                        <span className="px-3 py-1 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold inline-flex items-center gap-1">
                          <AlertCircleIcon size={12} /> Rupture
                        </span>
                      ) : estFaible ? (
                        <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold inline-flex items-center gap-1">
                          <AlertCircleIcon size={12} /> Stock Faible (&lt; {item.seuilAlerte})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold inline-flex items-center gap-1">
                          <Tick01Icon size={12} /> En Stock
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs">
                        <button
                          type="button"
                          onClick={() => ajustementRapide(item.id, -1)}
                          className="w-8 h-8 hover:bg-rose-500 hover:text-white text-slate-700 font-black transition-colors flex items-center justify-center text-sm"
                          title="Déduire 1 unité"
                        >
                          -
                        </button>
                        <span className="px-2 text-[11px] font-bold text-slate-600">
                          1
                        </span>
                        <button
                          type="button"
                          onClick={() => ajustementRapide(item.id, 1)}
                          className="w-8 h-8 hover:bg-emerald-500 hover:text-white text-slate-700 font-black transition-colors flex items-center justify-center text-sm"
                          title="Ajouter 1 unité"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setArticleAAjuster(item)}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-[#4880FF] text-[#4880FF] hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                          title="Ajustement Avancé"
                        >
                          <Settings02Icon size={14} />
                          <span>Ajuster</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setArticleAEditer(item);
                            setModalFormulaireOuvert(true);
                          }}
                          aria-label="Éditer Fiche Stock"
                          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors"
                          title="Éditer Fiche Stock"
                        >
                          <Edit02Icon size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => supprimerArticleStock(item.id)}
                          aria-label="Supprimer"
                          className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white font-bold flex items-center justify-center transition-colors"
                          title="Supprimer"
                        >
                          <Delete02Icon size={14} />
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

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
          <LicenseIcon size={20} className="text-[#4880FF]" />
          <span>Historique & Journal des Ajustements de Stock</span>
        </h3>

        <div className="space-y-2">
          {journal.map((j) => (
            <div
              key={j.id}
              className="p-3 bg-[#F8F9FD] rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                    j.delta > 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {j.delta > 0 ? `+${j.delta}` : j.delta}
                </span>
                <div>
                  <p className="font-bold text-slate-800">{j.nomProduit}</p>
                  <p className="text-slate-500 text-[11px]">
                    Motif : <span className="font-semibold text-slate-700">{j.motif}</span>
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                {j.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {articleAAjuster && (
        <ModalAjustementStock
          article={articleAAjuster}
          onFermer={() => setArticleAAjuster(null)}
          onValiderAjustement={validerAjustementModal}
        />
      )}

      <ModalArticleStockFormulaire
        ouvert={modalFormulaireOuvert}
        articleAEditer={articleAEditer}
        onFermer={() => setModalFormulaireOuvert(false)}
        onEnregistrer={enregistrerArticleStock}
      />
    </div>
  );
}
