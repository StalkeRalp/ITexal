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
} from "hugeicons-react";

// Palettes de couleurs vibrantes pour différencier chaque catégorie
const PALETTES_CATEGORIES = [
  {
    bgIcon: "bg-rose-50 border-rose-200 text-rose-600",
    badge: "bg-rose-100/80 text-rose-800 border-rose-200",
    borderTop: "border-t-4 border-t-rose-500",
    hoverBorder: "hover:border-rose-400",
    chip: "bg-rose-50 text-rose-700",
  },
  {
    bgIcon: "bg-indigo-50 border-indigo-200 text-indigo-600",
    badge: "bg-indigo-100/80 text-indigo-800 border-indigo-200",
    borderTop: "border-t-4 border-t-indigo-500",
    hoverBorder: "hover:border-indigo-400",
    chip: "bg-indigo-50 text-indigo-700",
  },
  {
    bgIcon: "bg-emerald-50 border-emerald-200 text-emerald-600",
    badge: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
    borderTop: "border-t-4 border-t-emerald-500",
    hoverBorder: "hover:border-emerald-400",
    chip: "bg-emerald-50 text-emerald-700",
  },
  {
    bgIcon: "bg-amber-50 border-amber-200 text-amber-600",
    badge: "bg-amber-100/80 text-amber-900 border-amber-200",
    borderTop: "border-t-4 border-t-amber-500",
    hoverBorder: "hover:border-amber-400",
    chip: "bg-amber-50 text-amber-800",
  },
  {
    bgIcon: "bg-purple-50 border-purple-200 text-purple-600",
    badge: "bg-purple-100/80 text-purple-800 border-purple-200",
    borderTop: "border-t-4 border-t-purple-500",
    hoverBorder: "hover:border-purple-400",
    chip: "bg-purple-50 text-purple-700",
  },
  {
    bgIcon: "bg-cyan-50 border-cyan-200 text-cyan-600",
    badge: "bg-cyan-100/80 text-cyan-800 border-cyan-200",
    borderTop: "border-t-4 border-t-cyan-500",
    hoverBorder: "hover:border-cyan-400",
    chip: "bg-cyan-50 text-cyan-700",
  },
  {
    bgIcon: "bg-teal-50 border-teal-200 text-teal-600",
    badge: "bg-teal-100/80 text-teal-800 border-teal-200",
    borderTop: "border-t-4 border-t-teal-500",
    hoverBorder: "hover:border-teal-400",
    chip: "bg-teal-50 text-teal-700",
  },
  {
    bgIcon: "bg-orange-50 border-orange-200 text-orange-600",
    badge: "bg-orange-100/80 text-orange-900 border-orange-200",
    borderTop: "border-t-4 border-t-orange-500",
    hoverBorder: "hover:border-orange-400",
    chip: "bg-orange-50 text-orange-800",
  },
];

export default function PageCategoriesAdmin() {
  const { categories, produits, creerCategorie, modifierCategorie, supprimerCategorie } = useProduits();

  // Mapping des catégories centralisées vers le type CategorieVue
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
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Gestion des Catégories ({categoriesVues.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Classification visuelle et personnalisée des gammes de soins cosmétiques.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Add01Icon size={18} strokeWidth={2.5} />
          <span>Nouvelle Catégorie</span>
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
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
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
              Produits Classés
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalProduits}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
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
            placeholder="Rechercher une catégorie par nom ou description..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Grid of Distinct Colored Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesFiltrees.map((cat, idx) => {
          const palette = PALETTES_CATEGORIES[idx % PALETTES_CATEGORIES.length];
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

                <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => ouvrirEdition(cat)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#4880FF] text-slate-600 transition-colors flex items-center justify-center"
                    title="Modifier"
                  >
                    <Edit02Icon size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => verifierSuppression(cat.id)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors flex items-center justify-center"
                    title="Supprimer"
                  >
                    <Delete02Icon size={16} />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900">{cat.nom}</h3>
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
