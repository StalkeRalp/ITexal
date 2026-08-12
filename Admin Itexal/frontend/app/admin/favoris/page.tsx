"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CarteProduitDashStack } from "@/modules/produits/composants/carte-produit-dashstack";
import { FicheDetailProduit } from "@/modules/produits/composants/fiche-detail-produit";
import { ModalProduitFormulaire } from "@/modules/produits/composants/modal-produit-formulaire";
import { Produit } from "@/modules/produits/types/produit";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useFavoris } from "@/lib/context/FavorisContext";
import { useToast } from "@/lib/context/ToastContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { FavouriteIcon, PackageIcon, ArrowRight01Icon } from "hugeicons-react";

export default function PageFavorisAdmin() {
  const { t } = useLanguage();
  const { produits, categories, marques, modifierProduit } = useProduits();
  const { favorisIds, basculerFavori } = useFavoris();
  const toast = useToast();

  const [produitAInspecter, setProduitAInspecter] = useState<Produit | null>(null);
  const [produitAEditer, setProduitAEditer] = useState<Produit | null>(null);

  // Conversion du type centralisé vers le type module
  const produitsModules: Produit[] = produits.map((p) => ({
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
    conseilsUtilisation: p.conseilsUtilisation,
    creeLe: p.creeLe,
    miseAJourLe: p.misAJourLe,
  }));

  // Produits réellement ajoutés aux favoris
  const produitsFavoris = produitsModules.filter((p) => favorisIds.includes(p.id));

  const sauvegarderProduitHandler = (p: Produit) => {
    modifierProduit(p.id, p as any);
    toast.succes(t("favoris.updatedToast"));
    setProduitAEditer(null);
  };

  const categoriesLocales = categories.map((c) => ({ id: c.id, nom: c.nom }));
  const marquesLocales = marques.map((m) => ({ id: m.id, nom: m.nom }));

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("favoris.title")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("favoris.subtitle")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold shadow-xs">
          <FavouriteIcon size={18} className="fill-rose-500 text-rose-500" />
          <span>{t("favoris.favoriteCount", { count: produitsFavoris.length })}</span>
        </div>
      </div>

      {/* Grid des produits favoris */}
      {produitsFavoris.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-${produitAInspecter ? "2" : "3"} space-y-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {produitsFavoris.map((produit) => (
                <CarteProduitDashStack
                  key={produit.id}
                  produit={produit}
                  onVoirDetail={(prod) => setProduitAInspecter(prod)}
                  onEditer={(prod) => setProduitAEditer(prod)}
                  onSupprimer={(id) => {
                    basculerFavori(id);
                    toast.info(t("favoris.removedToast"));
                  }}
                />
              ))}
            </div>
          </div>

          {produitAInspecter && (
            <div className="lg:col-span-1">
              <FicheDetailProduit
                produit={produitAInspecter}
                onFermer={() => setProduitAInspecter(null)}
                onEditer={(prod) => setProduitAEditer(prod)}
                onSupprimer={(id) => {
                  basculerFavori(id);
                  setProduitAInspecter(null);
                  toast.info(t("favoris.removedToast"));
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto space-y-4 my-12">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500 shadow-sm">
            <FavouriteIcon size={32} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">{t("favoris.emptyTitle")}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t("favoris.emptyDesc")}
            </p>
          </div>
          <Link
            href="/admin/produits"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <PackageIcon size={18} />
            <span>{t("favoris.exploreCatalog")}</span>
            <ArrowRight01Icon size={16} />
          </Link>
        </div>
      )}

      {/* Modal d'édition */}
      {produitAEditer && (
        <ModalProduitFormulaire
          ouvert={!!produitAEditer}
          produitAEditer={produitAEditer}
          categories={categoriesLocales}
          marques={marquesLocales}
          onFermer={() => setProduitAEditer(null)}
          onEnregistrer={sauvegarderProduitHandler}
        />
      )}
    </div>
  );
}
