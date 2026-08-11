"use client";

import React, { useState } from "react";
import { BanniereHeroProduits } from "@/modules/produits/composants/banniere-hero-produits";
import { CarteProduitDashStack } from "@/modules/produits/composants/carte-produit-dashstack";
import { ModalProduitFormulaire } from "@/modules/produits/composants/modal-produit-formulaire";
import { FicheDetailProduit } from "@/modules/produits/composants/fiche-detail-produit";
import { ModalConfirmation } from "@/composants-communs/modal-confirmation";
import { Produit } from "@/modules/produits/types/produit";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useToast } from "@/lib/context/ToastContext";
import { Search01Icon, PackageIcon, Add01Icon } from "hugeicons-react";

export default function PageProduitsAdmin() {
  const { produits, creerProduit, modifierProduit, supprimerProduit } = useProduits();
  const { t } = useLanguage();
  const toast = useToast();

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

  const [modalFormulaireOuvert, setModalFormulaireOuvert] = useState(false);
  const [produitAEditer, setProduitAEditer] = useState<Produit | null>(null);
  const [produitAInspecter, setProduitAInspecter] = useState<Produit | null>(null);
  const [idASupprimer, setIdASupprimer] = useState<string | null>(null);

  const [termeRecherche, setTermeRecherche] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState<string>("Toutes");

  const produitsFiltres = produits.filter((p) => {
    const correspondRecherche =
      p.nom.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      p.reference.toLowerCase().includes(termeRecherche.toLowerCase());
    const correspondCategorie =
      filtreCategorie === "Toutes" || p.categorieId === filtreCategorie;
    return correspondRecherche && correspondCategorie;
  });

  const ouvrirCreation = () => {
    setProduitAEditer(null);
    setModalFormulaireOuvert(true);
  };

  const ouvrirEdition = (p: Produit) => {
    setProduitAEditer(p);
    setModalFormulaireOuvert(true);
  };

  const sauvegarderProduitHandler = (p: Produit) => {
    if (produitAEditer) {
      modifierProduit(p.id, p);
      toast.succes("Produit mis à jour avec succès.");
    } else {
      creerProduit(p);
      toast.succes("Nouveau produit créé et ajouté au catalogue.");
    }
    setModalFormulaireOuvert(false);
  };

  const confirmerSuppression = () => {
    if (idASupprimer) {
      supprimerProduit(idASupprimer);
      toast.info("Le produit a été retiré du catalogue.");
      setIdASupprimer(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Catalogue Produits Cosmétiques
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gérez vos soins du visage, corps, et gammes capillaires ITexal.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] self-start sm:self-auto"
        >
          <Add01Icon size={18} strokeWidth={2.5} />
          <span>Créer un Produit</span>
        </button>
      </div>

      {/* Hero Banner Carousel (5s auto-scroll, freeze on hover) */}
      <BanniereHeroProduits />

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search01Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={termeRecherche}
            onChange={(e) => setTermeRecherche(e.target.value)}
            placeholder="Rechercher un produit cosmétique par nom, SKU..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold py-1">
          <button
            type="button"
            onClick={() => setFiltreCategorie("Toutes")}
            className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              filtreCategorie === "Toutes"
                ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Toutes les catégories
          </button>
          {categoriesMock.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFiltreCategorie(cat.id)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                filtreCategorie === cat.id
                  ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.nom}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid / Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-${produitAInspecter ? "2" : "3"} space-y-6`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produitsFiltres.map((p) => (
              <CarteProduitDashStack
                key={p.id}
                produit={p}
                onVoirDetail={(prod) => setProduitAInspecter(prod)}
                onEditer={(prod) => ouvrirEdition(prod)}
                onSupprimer={(id) => setIdASupprimer(id)}
              />
            ))}
          </div>

          {produitsFiltres.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 text-slate-400 text-xs space-y-2">
              <PackageIcon size={36} className="mx-auto text-slate-300" />
              <p className="font-bold">Aucun produit ne correspond à votre recherche.</p>
            </div>
          )}
        </div>

        {/* Side Panel for Detail */}
        {produitAInspecter && (
          <div className="lg:col-span-1">
            <FicheDetailProduit
              produit={produitAInspecter}
              onFermer={() => setProduitAInspecter(null)}
              onEditer={(prod) => ouvrirEdition(prod)}
              onSupprimer={(id) => setIdASupprimer(id)}
            />
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ModalProduitFormulaire
        ouvert={modalFormulaireOuvert}
        produitAEditer={produitAEditer}
        categories={categoriesMock}
        marques={marquesMock}
        onFermer={() => setModalFormulaireOuvert(false)}
        onEnregistrer={sauvegarderProduitHandler}
      />

      {/* Modal Confirmation Supprimer */}
      <ModalConfirmation
        ouvert={!!idASupprimer}
        titre="Supprimer le produit"
        message="Êtes-vous sûr de vouloir supprimer définitivement ce produit du catalogue ITexal ?"
        texteConfirmer="Supprimer"
        variante="danger"
        onConfirmer={confirmerSuppression}
        onAnnuler={() => setIdASupprimer(null)}
      />
    </div>
  );
}
