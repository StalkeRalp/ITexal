"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrix } from "@/lib/formatteur";
import { useFavoris } from "@/lib/context/FavorisContext";
import { useProduits } from "@/lib/context/ProduitsContext";
import { Produit } from "@/modules/produits/types/produit";
import { ModalDetailProduit } from "@/modules/produits/composants/modal-detail-produit";
import {
  FavouriteIcon,
  ShoppingBag01Icon,
  Tag01Icon,
  ArrowRight01Icon,
  StarIcon,
  Tick01Icon,
  AlertCircleIcon,
} from "hugeicons-react";

export const SectionDealsHome: React.FC = () => {
  const [chargement, setChargement] = useState(true);
  const [produitSelectionne, setProduitSelectionne] = useState<Produit | null>(null);
  const { estFavori, basculerFavori } = useFavoris();
  const { produits: produitsSource } = useProduits();

  // Produits en promotion depuis le contexte centralisé
  const produits: Produit[] = produitsSource
    .filter((p) => p.prixPromotionnel && p.prixPromotionnel < p.prix)
    .map((p) => ({
      id: p.id,
      nom: p.nom,
      reference: p.reference,
      categorieId: p.categorieId,
      nomCategorie: p.nomCategorie,
      marqueId: p.marqueId,
      nomMarque: p.nomMarque,
      description: p.description || "",
      prix: p.prix,
      prixPromotionnel: p.prixPromotionnel,
      stock: p.stock,
      disponible: p.disponible,
      images: p.images,
      caracteristiques: Array.isArray(p.caracteristiques)
        ? (p.caracteristiques as string[]).join(", ")
        : (p.caracteristiques as string | undefined),
      composition: p.composition,
      typeDePeau: p.typeDePeau,
      contenance: p.contenance,
      origine: p.origine,
      creeLe: p.creeLe,
    }));

  useEffect(() => {
    const timer = setTimeout(() => setChargement(false), 300);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section id="deals" className="py-20 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full text-xs font-bold mb-3">
              <Tag01Icon size={14} />
              <span>Deals & Offres Spéciales Exclusives</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Promotions en Cours
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Retrouvez nos produits de soin et beauté bénéficiant de réductions directes administrées depuis le back-office.
            </p>
          </div>

          <Link
            href="/admin/promotions"
            className="px-5 py-2.5 bg-blue-600/20 hover:bg-[#4880FF] text-[#4880FF] hover:text-white border border-blue-500/30 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <span>Gérer les promotions</span>
            <ArrowRight01Icon size={16} />
          </Link>
        </div>

        {/* État de chargement */}
        {chargement && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 animate-pulse space-y-4">
                <div className="h-48 bg-slate-800 rounded-2xl w-full" />
                <div className="h-5 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Liste des produits en promotion */}
        {!chargement && produits.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produits.map((produit) => {
              const reduction = Math.round(
                (((produit.prix - (produit.prixPromotionnel || 0)) / produit.prix) * 100)
              );
              const favori = estFavori(produit.id);
              const imagePrincipale =
                produit.images && produit.images.length > 0
                  ? produit.images[0]
                  : "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80";

              return (
                <div
                  key={produit.id}
                  onClick={() => setProduitSelectionne(produit)}
                  className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group cursor-pointer shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="space-y-4">
                    {/* Visual & Badges */}
                    <div className="relative h-56 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800/80">
                      <img
                        src={imagePrincipale}
                        alt={produit.nom}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white font-black text-xs rounded-xl shadow-md">
                        -{reduction}%
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          basculerFavori(produit.id);
                        }}
                        aria-label="Toggle favori"
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          favori
                            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                            : "bg-slate-900/80 text-slate-300 hover:text-rose-400 backdrop-blur-sm"
                        }`}
                      >
                        <FavouriteIcon size={18} strokeWidth={favori ? 2.5 : 2} />
                      </button>
                    </div>

                    {/* Meta & Title */}
                    <div>
                      <span className="text-[10px] font-extrabold text-[#4880FF] uppercase tracking-wider">
                        {produit.nomCategorie || "Soin Cosmétique"}
                      </span>
                      <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-[#4880FF] transition-colors line-clamp-1">
                        {produit.nom}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {produit.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 line-through block font-medium">
                        {formatPrix(produit.prix)} FCFA
                      </span>
                      <span className="text-lg font-black text-emerald-400">
                        {formatPrix(produit.prixPromotionnel || 0)} FCFA
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProduitSelectionne(produit);
                      }}
                      className="px-4 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                    >
                      <ShoppingBag01Icon size={16} />
                      <span>Fiche Produit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* État vide */}
        {!chargement && produits.length === 0 && (
          <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto space-y-3">
            <AlertCircleIcon size={36} className="text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Aucune promotion active</h3>
            <p className="text-xs text-slate-400">
              Actuellement aucun produit ne bénéficie d&apos;un prix promotionnel dans le catalogue.
            </p>
          </div>
        )}
      </div>

      {/* Modal Detail Produit */}
      {produitSelectionne && (
        <ModalDetailProduit
          ouvert={!!produitSelectionne}
          produit={produitSelectionne}
          onFermer={() => setProduitSelectionne(null)}
          onToggleFavori={(id) => basculerFavori(id)}
        />
      )}
    </section>
  );
};
