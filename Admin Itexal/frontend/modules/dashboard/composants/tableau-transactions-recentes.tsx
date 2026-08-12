"use client";

import React, { useState, useMemo } from "react";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { formaterPrix, obtenirImageSecurisee, gererErreurChargementImage } from "@/lib/utilitaires/formatage";
import { Tag01Icon, PackageIcon, AlertCircleIcon, ArrowDown01Icon } from "hugeicons-react";

export const TableauTransactionsRecentes: React.FC = () => {
  const { produits } = useProduits();
  const { commandes } = useCommandes();
  const [filtreCategorie, setFiltreCategorie] = useState<string>("Toutes");

  // Calcul dynamique des Deals basés sur les VRAIS produits et les VRAIES commandes
  const dealsDynamiques = useMemo(() => {
    return produits.map((produit) => {
      let quantiteVendue = 0;
      let nbCommandes = 0;

      commandes.forEach((commande) => {
        let produitTrouve = false;
        commande.articles.forEach((art) => {
          if (art.produitId === produit.id || art.nomProduit === produit.nom) {
            quantiteVendue += art.quantite;
            produitTrouve = true;
          }
        });
        if (produitTrouve) nbCommandes++;
      });

      const prixPromo = produit.prixPromotionnel || Math.round(produit.prix * 0.85);
      const catNom = produit.nomCategorie || produit.categorie || "Cosmétique";

      let statut: "Actif" | "Stock Faible" | "En Rupture" = "Actif";
      if (produit.stock <= 0) statut = "En Rupture";
      else if (produit.stock < (produit.seuilAlerte || 10)) statut = "Stock Faible";

      return {
        id: produit.id,
        produit,
        categorie: catNom,
        prixOriginal: produit.prix,
        prixPromo,
        stock: produit.stock,
        quantiteVendue,
        nbCommandes,
        periodePromo: (() => {
          const maint = new Date();
          const m = String(maint.getMonth() + 1).padStart(2, "0");
          const y = maint.getFullYear();
          const lastDay = new Date(y, maint.getMonth() + 1, 0).getDate();
          return `Du 01/${m}/${y} au ${lastDay}/${m}/${y}`;
        })(),
        statut,
      };
    });
  }, [produits, commandes]);

  const dealsFiltres = useMemo(() => {
    if (filtreCategorie === "Toutes") return dealsDynamiques;
    return dealsDynamiques.filter((d) => d.categorie === filtreCategorie);
  }, [dealsDynamiques, filtreCategorie]);

  const categoriesDisponibles = useMemo(() => {
    const setCat = new Set<string>();
    produits.forEach((p) => {
      const catNom = p.nomCategorie || p.categorie;
      if (catNom) setCat.add(catNom);
    });
    return Array.from(setCat);
  }, [produits]);

  const renduStatut = (statut: "Actif" | "Stock Faible" | "En Rupture") => {
    switch (statut) {
      case "Actif":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
            <Tag01Icon size={12} />
            <span>En Promo</span>
          </span>
        );
      case "Stock Faible":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold shadow-xs">
            <AlertCircleIcon size={12} />
            <span>Stock Faible</span>
          </span>
        );
      case "En Rupture":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-xs">
            <PackageIcon size={12} />
            <span>Rupture</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
      {/* En-tête de la section Deals Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Tag01Icon size={22} className="text-[#5B63F6]" />
            <span>Deals & Offres Spéciales (Produits Réels)</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Performances et stocks en temps réel des produits du catalogue
          </p>
        </div>

        <div className="relative">
          <select
            value={filtreCategorie}
            onChange={(e) => setFiltreCategorie(e.target.value)}
            aria-label="Filtrer par catégorie de deals"
            className="appearance-none bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 py-2.5 pl-3.5 pr-9 rounded-xl focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="Toutes">Toutes les catégories ({dealsDynamiques.length})</option>
            {categoriesDisponibles.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ArrowDown01Icon
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Tableau des Deals */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider border-y border-slate-100">
              <th className="py-3 px-4 rounded-l-xl">Produit</th>
              <th className="py-3 px-4">Prix Normal</th>
              <th className="py-3 px-4">Prix Deal</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Ventes</th>
              <th className="py-3 px-4">Période</th>
              <th className="py-3 px-4 rounded-r-xl text-center">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {dealsFiltres.slice(0, 8).map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                      <img
                        src={obtenirImageSecurisee(deal.produit.image || deal.produit.images?.[0], deal.categorie)}
                        alt={deal.produit.nom}
                        className="w-full h-full object-cover"
                        onError={(e) => gererErreurChargementImage(e, deal.categorie)}
                      />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {deal.produit.nom}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {deal.produit.nomMarque || "Cosmetic"} • {deal.categorie}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-slate-400 line-through font-semibold">
                  {formaterPrix(deal.prixOriginal)}
                </td>

                <td className="py-3.5 px-4 font-black text-[#5B63F6] text-sm">
                  {formaterPrix(deal.prixPromo)}
                </td>

                <td className="py-3.5 px-4 font-bold text-slate-800">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      deal.stock <= 5
                        ? "bg-rose-100 text-rose-700"
                        : deal.stock <= 15
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {deal.stock} unités
                  </span>
                </td>

                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {deal.quantiteVendue} vendus ({deal.nbCommandes} cmd)
                </td>

                <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap font-medium">
                  {deal.periodePromo}
                </td>

                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  {renduStatut(deal.statut)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
