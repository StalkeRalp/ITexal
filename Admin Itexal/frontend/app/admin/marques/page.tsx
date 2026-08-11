"use client";

import React, { useState, useMemo } from "react";
import { Marque as MarqueVue } from "@/modules/marques/types/marque";
import { ModalMarqueFormulaire } from "@/modules/marques/composants/modal-marque-formulaire";
import { useProduits } from "@/lib/context/ProduitsContext";
import {
  Add01Icon,
  Search01Icon,
  Edit02Icon,
  Delete02Icon,
  Building02Icon,
  Globe02Icon,
} from "hugeicons-react";

// Palettes de couleurs sur-mesure pour chaque marque cosmétique
const PALETTES_MARQUES = [
  {
    bgLogo: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    borderTop: "border-t-4 border-t-amber-500",
    hoverBorder: "hover:border-amber-400",
  },
  {
    bgLogo: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    borderTop: "border-t-4 border-t-emerald-500",
    hoverBorder: "hover:border-emerald-400",
  },
  {
    bgLogo: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20",
    badge: "bg-blue-50 text-blue-800 border-blue-200",
    borderTop: "border-t-4 border-t-blue-500",
    hoverBorder: "hover:border-blue-400",
  },
  {
    bgLogo: "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20",
    badge: "bg-purple-50 text-purple-800 border-purple-200",
    borderTop: "border-t-4 border-t-purple-500",
    hoverBorder: "hover:border-purple-400",
  },
  {
    bgLogo: "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/20",
    badge: "bg-rose-50 text-rose-800 border-rose-200",
    borderTop: "border-t-4 border-t-rose-500",
    hoverBorder: "hover:border-rose-400",
  },
  {
    bgLogo: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20",
    badge: "bg-cyan-50 text-cyan-800 border-cyan-200",
    borderTop: "border-t-4 border-t-cyan-500",
    hoverBorder: "hover:border-cyan-400",
  },
];

export default function PageMarquesAdmin() {
  const { marques, produits, creerMarque, modifierMarque, supprimerMarque } = useProduits();

  // Mapping vers le type vue MarqueVue
  const marquesVues: MarqueVue[] = useMemo(() => {
    return marques.map((m) => {
      const countProds = produits.filter((p) => p.marqueId === m.id || p.nomMarque === m.nom).length;
      return {
        id: m.id,
        nom: m.nom,
        logo: m.nom.slice(0, 2).toUpperCase(),
        paysOrigine: m.paysOrigine || "International",
        description: m.description || `Laboratoire et soins cosmétiques ${m.nom}`,
        siteWeb: `https://${m.slug || m.nom.toLowerCase().replace(/\s+/g, '')}.com`,
        statut: "Active" as const,
        nombreProduits: countProds || m.nombreProduits || 0,
        creeLe: m.creeLe,
      };
    });
  }, [marques, produits]);

  const [recherche, setRecherche] = useState("");
  const [modalOuvert, setModalOuvert] = useState(false);
  const [marqueAEditer, setMarqueAEditer] = useState<MarqueVue | null>(null);

  const marquesFiltrees = marquesVues.filter((m) =>
    m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    m.paysOrigine.toLowerCase().includes(recherche.toLowerCase()) ||
    m.description.toLowerCase().includes(recherche.toLowerCase())
  );

  const ouvrirCreation = () => {
    setMarqueAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (m: MarqueVue) => {
    setMarqueAEditer(m);
    setModalOuvert(true);
  };

  const verifierSuppression = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette marque ?")) {
      supprimerMarque(id);
    }
  };

  const enregistrerMarqueHandler = (m: MarqueVue) => {
    if (marqueAEditer) {
      modifierMarque(m.id, m.nom, m.description);
    } else {
      creerMarque(m.nom, m.description, m.paysOrigine);
    }
    setModalOuvert(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Gestion des Marques Partenaires ({marquesVues.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Répertoire et identité visuelle des marques cosmétiques référencées.
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all self-start sm:self-auto flex items-center gap-2"
        >
          <Add01Icon size={18} strokeWidth={2.5} />
          <span>Nouvelle Marque</span>
        </button>
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
            placeholder="Rechercher une marque partenaire par nom, pays d'origine..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Grid of Distinct Colored Brand Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marquesFiltrees.map((m, idx) => {
          const palette = PALETTES_MARQUES[idx % PALETTES_MARQUES.length];
          return (
            <div
              key={m.id}
              className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 transition-all duration-300 relative overflow-hidden group ${palette.borderTop} ${palette.hoverBorder} hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                {/* Custom Styled Brand Avatar / Logo Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl ${palette.bgLogo} font-black flex items-center justify-center text-sm tracking-wider uppercase transition-transform group-hover:scale-105`}
                >
                  {m.logo}
                </div>

                <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => ouvrirEdition(m)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#4880FF] text-slate-600 transition-colors flex items-center justify-center"
                    title="Modifier"
                  >
                    <Edit02Icon size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => verifierSuppression(m.id)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors flex items-center justify-center"
                    title="Supprimer"
                  >
                    <Delete02Icon size={16} />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900">{m.nom}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${palette.badge}`}>
                  {m.nombreProduits} produit(s)
                </span>
                <span className="text-slate-500 text-[11px] font-semibold flex items-center gap-1">
                  <Globe02Icon size={13} className="text-slate-400" />
                  <span>{m.paysOrigine}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {modalOuvert && (
        <ModalMarqueFormulaire
          ouvert={modalOuvert}
          onFermer={() => setModalOuvert(false)}
          marqueAEditer={marqueAEditer}
          onEnregistrer={enregistrerMarqueHandler}
        />
      )}
    </div>
  );
}
