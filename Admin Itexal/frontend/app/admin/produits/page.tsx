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
  const { produits, categories, marques, modifierProduit, supprimerProduit } = useProduits();
  const { t } = useLanguage();
  const toast = useToast();

  const [modalFormulaireOuvert, setModalFormulaireOuvert] = useState(false);
  const [produitAEditer, setProduitAEditer] = useState<Produit | null>(null);
  const [produitAInspecter, setProduitAInspecter] = useState<Produit | null>(null);
  const [idASupprimer, setIdASupprimer] = useState<string | null>(null);

  const [termeRecherche, setTermeRecherche] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState<string>("Toutes");

  // Conversion du Produit centralisé vers le type Produit du module (compatible)
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

  const produitsFiltres = produitsModules.filter((p) => {
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
    modifierProduit(p.id, p as any);
    toast.succes("Produit mis à jour avec succès.");
    setModalFormulaireOuvert(false);
  };

  const confirmerSuppression = () => {
    if (idASupprimer) {
      supprimerProduit(idASupprimer);
      toast.info("Le produit a été retiré du catalogue.");
      setIdASupprimer(null);
    }
  };

  // Catégories locales pour les modals
  const categoriesLocales = categories.map((c) => ({ id: c.id, nom: c.nom }));
  const marquesLocales = marques.map((m) => ({ id: m.id, nom: m.nom }));

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Catalogue Produits Cosmétiques ({produits.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gérez vos produits cosmétiques normalisés issus de BDjson/makeup_data.json.
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

      {/* Hero Banner Carousel */}
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
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold py-1 max-w-xl">
          <button
            type="button"
            onClick={() => setFiltreCategorie("Toutes")}
            className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              filtreCategorie === "Toutes"
                ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Toutes ({produits.length})
          </button>
          {categoriesLocales.slice(0, 6).map((cat) => (
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

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produitsFiltres.map((p) => (
          <CarteProduitDashStack
            key={p.id}
            produit={p}
            onVoirDetail={() => setProduitAInspecter(p)}
            onEditer={() => ouvrirEdition(p)}
            onSupprimer={() => setIdASupprimer(p.id)}
          />
        ))}
      </div>

      {produitsFiltres.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center mx-auto">
            <PackageIcon size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Aucun produit trouvé</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Essayer de modifier votre terme de recherche ou de réinitialiser le filtre.
          </p>
        </div>
      )}

      {/* Modal Formulaire Creation / Edition */}
      {modalFormulaireOuvert && (
        <ModalProduitFormulaire
          ouvert={modalFormulaireOuvert}
          onFermer={() => setModalFormulaireOuvert(false)}
          produitAEditer={produitAEditer}
          categories={categoriesLocales}
          marques={marquesLocales}
          onEnregistrer={sauvegarderProduitHandler}
        />
      )}

      {/* Drawer Fiche Detail Produit */}
      {produitAInspecter && (
        <FicheDetailProduit
          produit={produitAInspecter}
          onFermer={() => setProduitAInspecter(null)}
          onEditer={() => {
            const target = produitAInspecter;
            setProduitAInspecter(null);
            ouvrirEdition(target);
          }}
        />
      )}

      {/* Modal Confirmation de Suppression */}
      {idASupprimer && (
        <ModalConfirmation
          ouvert={!!idASupprimer}
          titre="Retirer du Catalogue"
          message="Êtes-vous sûr de vouloir supprimer définitivement ce produit ? Cette action est irréversible."
          texteConfirmer="Oui, supprimer"
          variante="danger"
          onConfirmer={confirmerSuppression}
          onAnnuler={() => setIdASupprimer(null)}
        />
      )}
    </div>
  );
}
