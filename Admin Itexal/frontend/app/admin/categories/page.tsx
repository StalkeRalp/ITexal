"use client";

import React, { useState } from "react";
import { Categorie } from "@/modules/categories/types/categorie";
import { ModalCategorieFormulaire } from "@/modules/categories/composants/modal-categorie-formulaire";
import {
  Add01Icon,
  Tag01Icon,
  Tick01Icon,
  PackageIcon,
  Search01Icon,
  Edit02Icon,
  Delete02Icon,
  SparklesIcon,
} from "hugeicons-react";

export default function PageCategoriesAdmin() {
  const [categories, setCategories] = useState<Categorie[]>([
    {
      id: "cat-1",
      nom: "Soin du Visage",
      slug: "soin-du-visage",
      description: "Sérums, crèmes hydratantes, masques et nettoyants bio pour le visage.",
      icone: "Soin Visage",
      statut: "Actif",
      nombreProduits: 24,
      creeLe: "01/08/2026",
    },
    {
      id: "cat-2",
      nom: "Gamme Capillaire",
      slug: "gamme-capillaire",
      description: "Shampooings, baumes, huiles pousse et masques pour cheveux crépus & frisés.",
      icone: "Capillaire",
      statut: "Actif",
      nombreProduits: 18,
      creeLe: "02/08/2026",
    },
    {
      id: "cat-3",
      nom: "Soin du Corps",
      slug: "soin-du-corps",
      description: "Laits corporels, beurres de karité purs, gommages et savons exfoliants.",
      icone: "Corps",
      statut: "Actif",
      nombreProduits: 32,
      creeLe: "03/08/2026",
    },
    {
      id: "cat-4",
      nom: "Huiles Essentielles",
      slug: "huiles-essentielles",
      description: "Huiles végétales pures extraites à froid, aromathérapie et élixirs.",
      icone: "Huiles",
      statut: "Actif",
      nombreProduits: 12,
      creeLe: "05/08/2026",
    },
    {
      id: "cat-5",
      nom: "Parfums & Senteurs",
      slug: "parfums-senteurs",
      description: "Fragrances naturelles, eaux de parfum et brumes parfumées corporelles.",
      icone: "Parfums",
      statut: "Actif",
      nombreProduits: 15,
      creeLe: "10/08/2026",
    },
    {
      id: "cat-6",
      nom: "Coffrets Cadeaux",
      slug: "coffrets-cadeaux",
      description: "Ensembles cadeaux de soins complets sous emballage éco-responsable.",
      icone: "Coffrets",
      statut: "Inactif",
      nombreProduits: 8,
      creeLe: "11/08/2026",
    },
  ]);

  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<"Tous" | "Actif" | "Inactif">("Tous");
  const [modalOuvert, setModalOuvert] = useState(false);
  const [categorieAEditer, setCategorieAEditer] = useState<Categorie | null>(null);

  const categoriesFiltrees = categories.filter((c) => {
    const matchTexte =
      c.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      (c.icone && c.icone.toLowerCase().includes(recherche.toLowerCase())) ||
      c.description.toLowerCase().includes(recherche.toLowerCase());

    const matchStatut = filtreStatut === "Tous" ? true : c.statut === filtreStatut;

    return matchTexte && matchStatut;
  });

  const ouvrirCreation = () => {
    setCategorieAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (c: Categorie) => {
    setCategorieAEditer(c);
    setModalOuvert(true);
  };

  const basculerStatut = (id: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, statut: c.statut === "Actif" ? "Inactif" : "Actif" }
          : c
      )
    );
  };

  const supprimerCategorie = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const enregistrerCategorie = (cat: Categorie) => {
    setCategories((prev) => {
      const existe = prev.some((c) => c.id === cat.id);
      if (existe) {
        return prev.map((c) => (c.id === cat.id ? cat : c));
      } else {
        return [cat, ...prev];
      }
    });
  };

  const totalProduits = categories.reduce((sum, c) => sum + c.nombreProduits, 0);
  const totalActives = categories.filter((c) => c.statut === "Actif").length;

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Gestion des Catégories
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Classification et organisation des gammes cosmétiques et soins ITexal.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all self-start sm:self-auto flex items-center gap-2"
        >
          <Add01Icon size={18} strokeWidth={2.5} /> Nouvelle Catégorie
        </button>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Catégories
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {categories.length}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Tag01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Catégories Actives
            </span>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
              {totalActives}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Tick01Icon size={24} strokeWidth={2.5} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Produits Catalogués
            </span>
            <h3 className="text-2xl font-extrabold text-[#4880FF] mt-1">
              {totalProduits}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <PackageIcon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher une catégorie..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF] text-slate-800"
          />
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-2">
          {(["Tous", "Actif", "Inactif"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFiltreStatut(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filtreStatut === st
                  ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                  : "bg-[#F8F9FD] text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesFiltrees.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Header Icon/Image + Status Pill */}
              <div className="flex items-center justify-between">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.nom}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center border border-blue-100 shadow-xs group-hover:scale-105 transition-transform">
                    <SparklesIcon size={24} strokeWidth={2} />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => basculerStatut(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    cat.statut === "Actif"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}
                  title="Cliquer pour changer le statut"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      cat.statut === "Actif" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  <span>{cat.statut}</span>
                </button>
              </div>

              {/* Title & Gamme */}
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-[#4880FF] transition-colors">
                  {cat.nom}
                </h3>
                <span className="text-[11px] text-[#4880FF] font-bold bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mt-1">
                  {cat.icone || "Gamme Cosmétique"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <PackageIcon size={14} className="text-[#4880FF]" />
                <span>{cat.nombreProduits} Produits</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => ouvrirEdition(cat)}
                  aria-label="Éditer la catégorie"
                  className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#4880FF] text-slate-600 hover:text-white flex items-center justify-center text-xs font-bold transition-all border border-slate-200/60"
                  title="Éditer la catégorie"
                >
                  <Edit02Icon size={16} strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={() => supprimerCategorie(cat.id)}
                  aria-label="Supprimer la catégorie"
                  className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center text-xs font-bold transition-all border border-rose-100"
                  title="Supprimer la catégorie"
                >
                  <Delete02Icon size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categoriesFiltrees.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs font-medium">
          Aucune catégorie ne correspond à votre recherche.
        </div>
      )}

      {/* Modal Formulaire Catégorie */}
      <ModalCategorieFormulaire
        ouvert={modalOuvert}
        categorieAEditer={categorieAEditer}
        onFermer={() => setModalOuvert(false)}
        onEnregistrer={enregistrerCategorie}
      />
    </div>
  );
}
