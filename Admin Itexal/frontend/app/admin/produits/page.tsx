"use client";

import React, { useState } from "react";
import { BanniereHeroProduits } from "@/modules/produits/composants/banniere-hero-produits";
import { CarteProduitDashStack } from "@/modules/produits/composants/carte-produit-dashstack";
import { ModalProduitFormulaire } from "@/modules/produits/composants/modal-produit-formulaire";
import { FicheDetailProduit } from "@/modules/produits/composants/fiche-detail-produit";
import { ModalStatistiquesProduit } from "@/modules/produits/composants/modal-statistiques-produit";
import { ModalConfirmation } from "@/composants-communs/modal-confirmation";
import { Produit } from "@/types/produit";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useToast } from "@/lib/context/ToastContext";
import { Search01Icon, PackageIcon, Add01Icon } from "hugeicons-react";

export default function PageProduitsAdmin() {
  const { produits, categories, marques, creerProduit, modifierProduit, supprimerProduit } = useProduits();
  const { commandes } = useCommandes();
  const { t } = useLanguage();
  const toast = useToast();

  const [modalFormulaireOuvert, setModalFormulaireOuvert] = useState(false);
  const [produitAEditer, setProduitAEditer] = useState<Produit | null>(null);
  const [produitAInspecter, setProduitAInspecter] = useState<Produit | null>(null);
  const [produitStatsTarget, setProduitStatsTarget] = useState<Produit | null>(null);
  const [modalStatsOuvert, setModalStatsOuvert] = useState(false);
  const [idASupprimer, setIdASupprimer] = useState<string | null>(null);

  const [termeRecherche, setTermeRecherche] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState<string>("Toutes");

  const categoriesLocales = categories.map((c) => ({ id: c.id, nom: c.nom }));
  const marquesLocales = marques.map((m) => ({ id: m.id, nom: m.nom }));

  const ouvrirCreation = () => {
    setProduitAEditer(null);
    setModalFormulaireOuvert(true);
  };

  const ouvrirEdition = (prod: Produit) => {
    setProduitAEditer(prod);
    setModalFormulaireOuvert(true);
  };

  const sauvegarderProduitHandler = (data: any) => {
    if (produitAEditer) {
      modifierProduit(produitAEditer.id, data);
      toast.succes("Produit mis à jour avec succès !");
    } else {
      creerProduit({
        reference: data.reference || `REF-${Date.now()}`,
        nom: data.nom || "Nouveau Produit",
        categorieId: data.categorieId || categories[0]?.id || "cat-1",
        nomCategorie: data.nomCategorie || categories[0]?.nom || "Soin Visage",
        marqueId: data.marqueId || marques[0]?.id || "marq-1",
        nomMarque: data.nomMarque || marques[0]?.nom || "ITexal",
        description: data.description || "",
        prix: Number(data.prix) || 0,
        prixPromotionnel: data.prixPromotionnel ? Number(data.prixPromotionnel) : undefined,
        images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80"],
        stock: Number(data.stock) || 0,
        disponible: data.disponible !== false,
        caracteristiques: data.caracteristiques,
        composition: data.composition,
        typeDePeau: data.typeDePeau,
        contenance: data.contenance,
        origine: data.origine,
        conseilsUtilisation: data.conseilsUtilisation,
      });
      toast.succes("Nouveau produit ajouté avec succès au catalogue !");
    }
    setModalFormulaireOuvert(false);
  };

  const confirmerSuppression = () => {
    if (idASupprimer) {
      supprimerProduit(idASupprimer);
      toast.succes("Produit supprimé du catalogue.");
      setIdASupprimer(null);
      if (produitAInspecter?.id === idASupprimer) {
        setProduitAInspecter(null);
      }
    }
  };

  // Filtrage
  const produitsFiltres = produits.filter((p) => {
    const matchNom =
      p.nom.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      (p.reference && p.reference.toLowerCase().includes(termeRecherche.toLowerCase()));
    const matchCat =
      filtreCategorie === "Toutes" ||
      p.nomCategorie.toLowerCase() === filtreCategorie.toLowerCase();
    return matchNom && matchCat;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Catalogue Produits
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Gérez vos références cosmétiques, vos prix, images et stocks en temps réel.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-5 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto hover:scale-[1.02]"
        >
          <Add01Icon size={18} strokeWidth={2.5} /> Ajouter un Produit
        </button>
      </div>

      {/* Hero Header Card */}
      <BanniereHeroProduits />

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search01Icon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={termeRecherche}
            onChange={(e) => setTermeRecherche(e.target.value)}
            placeholder="Rechercher par nom, référence..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-slate-800 text-xs font-bold rounded-2xl outline-none transition-all border border-slate-100 focus:border-[#5B63F6]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {Array.from(new Set(["Toutes", ...categories.map((c) => c.nom)])).map((cat, idx) => (
            <button
              key={`${cat}-${idx}`}
              type="button"
              onClick={() => setFiltreCategorie(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filtreCategorie === cat
                  ? "bg-[#5B63F6] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid View & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={`${
            produitAInspecter ? "lg:col-span-2" : "lg:col-span-3"
          } space-y-6`}
        >
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              produitAInspecter
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-3 lg:grid-cols-4"
            } gap-6`}
          >
            {produitsFiltres.map((p) => (
              <CarteProduitDashStack
                key={p.id}
                produit={p as any}
                onVoirDetail={() => setProduitAInspecter(p)}
                onEditer={() => ouvrirEdition(p)}
                onSupprimer={() => setIdASupprimer(p.id)}
              />
            ))}
          </div>

          {produitsFiltres.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center mx-auto">
                <PackageIcon size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-800">Aucun produit trouvé</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Essayer de modifier votre terme de recherche ou de réinitialiser le filtre.
              </p>
            </div>
          )}
        </div>

        {/* Right Sticky Side Detail Panel */}
        {produitAInspecter && (
          <div className="lg:col-span-1 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto pr-1 animate-fadeIn">
            <FicheDetailProduit
              produit={produitAInspecter as any}
              onFermer={() => setProduitAInspecter(null)}
              onEditer={() => {
                const target = produitAInspecter;
                setProduitAInspecter(null);
                ouvrirEdition(target);
              }}
              onVoirStatistiques={(p) => {
                const target = produits.find((prod) => prod.id === p.id) || p;
                setProduitStatsTarget(target);
                setModalStatsOuvert(true);
              }}
              onSupprimer={(id) => {
                setIdASupprimer(id);
              }}
            />
          </div>
        )}
      </div>

      {/* Modal Formulaire Creation / Edition */}
      {modalFormulaireOuvert && (
        <ModalProduitFormulaire
          ouvert={modalFormulaireOuvert}
          onFermer={() => setModalFormulaireOuvert(false)}
          produitAEditer={produitAEditer as any}
          categories={categoriesLocales}
          marques={marquesLocales}
          onEnregistrer={sauvegarderProduitHandler}
        />
      )}

      {/* Modal Statistiques Produit Individuel */}
      <ModalStatistiquesProduit
        ouvert={modalStatsOuvert}
        produit={produitStatsTarget}
        onFermer={() => setModalStatsOuvert(false)}
        commandes={commandes}
      />

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
