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
import { FavouriteIcon, PackageIcon, ArrowRight01Icon } from "hugeicons-react";

export default function PageFavorisAdmin() {
  const { produits, modifierProduit } = useProduits();
  const { favorisIds, basculerFavori } = useFavoris();
  const toast = useToast();

  const [produitAInspecter, setProduitAInspecter] = useState<Produit | null>(null);
  const [produitAEditer, setProduitAEditer] = useState<Produit | null>(null);

  const categoriesMock = [
    { id: "cat-1", nom: "Soin du Visage" },
    { id: "cat-2", nom: "Gamme Capillaire" },
    { id: "cat-3", nom: "Soin du Corps" },
    { id: "cat-4", nom: "Huiles Essentielles" },
  ];

  const marquesMock = [
    { id: "mar-1", nom: "ITexal Cosméceutiques" },
    { id: "mar-2", nom: "Karité Gold Africa" },
    { id: "mar-3", nom: "Argan Bio Luxe" },
  ];

  // Produits réellement ajoutés aux favoris
  const produitsFavoris = produits.filter((p) => favorisIds.includes(p.id));

  const sauvegarderProduitHandler = (p: Produit) => {
    modifierProduit(p.id, p);
    toast.succes("Produit mis à jour avec succès.");
    setProduitAEditer(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Produits Favoris & Coups de Cœur
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Retrouvez tous vos soins et produits cosmétiques enregistrés en favoris.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold shadow-xs">
          <FavouriteIcon size={18} className="fill-rose-500 text-rose-500" />
          <span>{produitsFavoris.length} Produit(s) Favori(s)</span>
        </div>
      </div>

      {/* Grid des produits favoris réels */}
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
                    toast.info("Produit retiré de vos favoris.");
                  }}
                />
              ))}
            </div>
          </div>

          {/* Panneau de détail latéral si sélectionné */}
          {produitAInspecter && (
            <div className="lg:col-span-1">
              <FicheDetailProduit
                produit={produitAInspecter}
                onFermer={() => setProduitAInspecter(null)}
                onEditer={(prod) => setProduitAEditer(prod)}
                onSupprimer={(id) => {
                  basculerFavori(id);
                  setProduitAInspecter(null);
                  toast.info("Produit retiré des favoris.");
                }}
              />
            </div>
          )}
        </div>
      ) : (
        /* État vide si aucun favori */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto space-y-4 my-12">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500 shadow-sm">
            <FavouriteIcon size={32} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Aucun produit favori</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Vous n&apos;avez encore ajouté aucun soin cosmétique à votre liste de favoris.
            </p>
          </div>
          <Link
            href="/admin/produits"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <PackageIcon size={18} />
            <span>Explorer le Catalogue</span>
            <ArrowRight01Icon size={16} />
          </Link>
        </div>
      )}

      {/* Modal d'édition si besoin */}
      {produitAEditer && (
        <ModalProduitFormulaire
          ouvert={!!produitAEditer}
          produitAEditer={produitAEditer}
          categories={categoriesMock}
          marques={marquesMock}
          onFermer={() => setProduitAEditer(null)}
          onEnregistrer={sauvegarderProduitHandler}
        />
      )}
    </div>
  );
}
