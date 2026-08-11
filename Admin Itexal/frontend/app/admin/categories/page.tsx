"use client";

import React, { useState, useMemo } from "react";
import { Categorie as CategorieVue } from "@/modules/categories/types/categorie";
import { ModalCategorieFormulaire } from "@/modules/categories/composants/modal-categorie-formulaire";
import { useProduits } from "@/lib/context/ProduitsContext";
import {
  Add01Icon,
  Tag01Icon,
  Tick01Icon,
  PackageIcon,
  Search01Icon,
  Edit02Icon,
  Delete02Icon,
  SparklesIcon,
  MoreHorizontalIcon,
  EyeIcon,
  Cancel01Icon,
} from "hugeicons-react";

// Palettes de couleurs vibrantes pour différencier chaque catégorie
const PALETTES_CATEGORIES = [
  {
    bgIcon: "bg-rose-50 border-rose-200 text-rose-600",
    badge: "bg-rose-100/80 text-rose-800 border-rose-200",
    borderTop: "border-t-4 border-t-rose-500",
    hoverBorder: "hover:border-rose-400",
  },
  {
    bgIcon: "bg-indigo-50 border-indigo-200 text-indigo-600",
    badge: "bg-indigo-100/80 text-indigo-800 border-indigo-200",
    borderTop: "border-t-4 border-t-indigo-500",
    hoverBorder: "hover:border-indigo-400",
  },
  {
    bgIcon: "bg-emerald-50 border-emerald-200 text-emerald-600",
    badge: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
    borderTop: "border-t-4 border-t-emerald-500",
    hoverBorder: "hover:border-emerald-400",
  },
  {
    bgIcon: "bg-amber-50 border-amber-200 text-amber-600",
    badge: "bg-amber-100/80 text-amber-900 border-amber-200",
    borderTop: "border-t-4 border-t-amber-500",
    hoverBorder: "hover:border-amber-400",
  },
  {
    bgIcon: "bg-purple-50 border-purple-200 text-purple-600",
    badge: "bg-purple-100/80 text-purple-800 border-purple-200",
    borderTop: "border-t-4 border-t-purple-500",
    hoverBorder: "hover:border-purple-400",
  },
  {
    bgIcon: "bg-cyan-50 border-cyan-200 text-cyan-600",
    badge: "bg-cyan-100/80 text-cyan-800 border-cyan-200",
    borderTop: "border-t-4 border-t-cyan-500",
    hoverBorder: "hover:border-cyan-400",
  },
];

export default function PageCategoriesAdmin() {
  const { categories, produits, creerCategorie, modifierCategorie, supprimerCategorie } = useProduits();

  // Mapping des catégories centralisées
  const categoriesVues: CategorieVue[] = useMemo(() => {
    return categories.map((c) => {
      const countProds = produits.filter((p) => p.categorieId === c.id).length;
      return {
        id: c.id,
        nom: c.nom,
        slug: c.slug,
        description: c.description || `Gamme de soins et cosmétiques ${c.nom}`,
        icone: c.nom.split(" ")[0],
        statut: "Actif",
        nombreProduits: countProds || c.nombreProduits || 0,
        creeLe: c.creeLe,
      };
    });
  }, [categories, produits]);

  const [recherche, setRecherche] = useState("");
  const [modalOuvert, setModalOuvert] = useState(false);
  const [categorieAEditer, setCategorieAEditer] = useState<CategorieVue | null>(null);

  // Popover d'action & Modal "Toutes les infos (+)" pour catégorie
  const [popoverId, setPopoverId] = useState<string | null>(null);
  const [categorieDetaillee, setCategorieDetaillee] = useState<CategorieVue | null>(null);

  const categoriesFiltrees = categoriesVues.filter((c) => {
    return (
      c.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      c.description.toLowerCase().includes(recherche.toLowerCase())
    );
  });

  const ouvrirCreation = () => {
    setCategorieAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (c: CategorieVue) => {
    setCategorieAEditer(c);
    setModalOuvert(true);
  };

  const verifierSuppression = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      supprimerCategorie(id);
    }
  };

  const enregistrerCategorieHandler = (cat: CategorieVue) => {
    if (categorieAEditer) {
      modifierCategorie(cat.id, cat.nom, cat.description);
    } else {
      creerCategorie(cat.nom, cat.description);
    }
    setModalOuvert(false);
  };

  const totalProduits = produits.length;

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Hero Header matching Design Mockup */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Categories List ({categoriesVues.length})
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Classification et thématisation des gammes cosmétiques.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Add01Icon size={18} strokeWidth={2.5} />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Catégories
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{categoriesVues.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center font-bold">
            <Tag01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Catégories Actives
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{categoriesVues.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Tick01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Produits Rattachés
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalProduits}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <PackageIcon size={24} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="relative flex-1">
          <Search01Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher une catégorie..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#5B63F6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Grid of Distinct Colored Categories Cards with Popover Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesFiltrees.map((cat, idx) => {
          const palette = PALETTES_CATEGORIES[idx % PALETTES_CATEGORIES.length];
          const estPopoverOuvert = popoverId === cat.id;

          return (
            <div
              key={cat.id}
              className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 transition-all duration-300 relative overflow-hidden group ${palette.borderTop} ${palette.hoverBorder} hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl ${palette.bgIcon} font-black flex items-center justify-center text-sm border shadow-xs transition-transform group-hover:scale-105`}
                >
                  <SparklesIcon size={22} />
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPopoverId(estPopoverOuvert ? null : cat.id)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-colors inline-flex items-center justify-center"
                  >
                    <MoreHorizontalIcon size={18} />
                  </button>

                  {/* Interactive Popover Menu (Details / Edit / Delete) */}
                  {estPopoverOuvert && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-10 z-20 w-36 bg-white rounded-2xl p-1.5 shadow-xl border border-slate-100 animate-fadeIn text-left"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setPopoverId(null);
                          setCategorieDetaillee(cat);
                        }}
                        className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <EyeIcon size={14} className="text-[#5B63F6]" />
                        <span>Voir tout (+)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPopoverId(null);
                          ouvrirEdition(cat);
                        }}
                        className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <Edit02Icon size={14} className="text-amber-500" />
                        <span>Modifier</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPopoverId(null);
                          verifierSuppression(cat.id);
                        }}
                        className="w-full px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors border-t border-slate-100 mt-1"
                      >
                        <Delete02Icon size={14} />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">{cat.nom}</h3>
                  <button
                    type="button"
                    onClick={() => setCategorieDetaillee(cat)}
                    className="w-6 h-6 rounded-full bg-indigo-50 hover:bg-[#5B63F6] text-[#5B63F6] hover:text-white font-black text-xs flex items-center justify-center transition-all"
                    title="Voir toutes les informations (+)"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${palette.badge}`}>
                  {cat.nombreProduits} produit(s)
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Créé le {cat.creeLe}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Toutes les infos de la Catégorie (+) */}
      {categorieDetaillee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B63F6] font-black flex items-center justify-center">
                  <SparklesIcon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{categorieDetaillee.nom}</h2>
                  <p className="text-xs text-slate-400 font-medium">Slug : {categorieDetaillee.slug}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCategorieDetaillee(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-extrabold flex items-center justify-center transition-colors"
              >
                <Cancel01Icon size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Description complète</span>
                <p className="font-medium text-slate-800 text-sm">{categorieDetaillee.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Produits Rattachés</span>
                  <p className="text-2xl font-black text-[#5B63F6] mt-1">{categorieDetaillee.nombreProduits}</p>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Date de création</span>
                  <p className="text-sm font-black text-emerald-700 mt-1">{categorieDetaillee.creeLe}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-extrabold text-slate-800">
                  Liste des produits rattachés à cette catégorie :
                </h4>
                <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-100 rounded-2xl p-2">
                  {produits.filter(p => p.categorieId === categorieDetaillee.id).map(prod => (
                    <div key={prod.id} className="p-2.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-slate-800">{prod.nom}</span>
                      <span className="font-extrabold text-[#5B63F6]">{prod.prix} FCFA</span>
                    </div>
                  ))}
                  {produits.filter(p => p.categorieId === categorieDetaillee.id).length === 0 && (
                    <p className="text-slate-400 text-center py-4">Aucun produit dans cette catégorie.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setCategorieDetaillee(null)}
                className="px-6 py-2.5 bg-[#5B63F6] text-white font-extrabold rounded-xl shadow-md"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOuvert && (
        <ModalCategorieFormulaire
          ouvert={modalOuvert}
          onFermer={() => setModalOuvert(false)}
          onEnregistrer={enregistrerCategorieHandler}
          categorieAEditer={categorieAEditer}
        />
      )}
    </div>
  );
}
