"use client";

import React, { useState } from "react";
import { Marque } from "@/modules/marques/types/marque";
import { ModalMarqueFormulaire } from "@/modules/marques/composants/modal-marque-formulaire";
import {
  Building02Icon,
  Add01Icon,
  ShoppingBag01Icon,
  Search01Icon,
  Link01Icon,
  PackageIcon,
  Edit02Icon,
  Delete02Icon,
  Location01Icon,
  SparklesIcon,
} from "hugeicons-react";

export default function PageMarquesAdmin() {
  const [marques, setMarques] = useState<Marque[]>([
    {
      id: "mar-1",
      nom: "ITexal Cosméceutiques",
      logo: "ITexal",
      paysOrigine: "Cameroun",
      description: "Gammes dermatologiques et phytothérapeutiques formulées en Afrique.",
      siteWeb: "https://itexal.cm",
      statut: "Active",
      nombreProduits: 45,
      creeLe: "01/08/2026",
    },
    {
      id: "mar-2",
      nom: "Karité Gold Africa",
      logo: "Karité",
      paysOrigine: "Cameroun",
      description: "Soins d'exception à base de beurre de karité bio extrait artisanalement.",
      siteWeb: "https://karitegold.cm",
      statut: "Active",
      nombreProduits: 28,
      creeLe: "02/08/2026",
    },
    {
      id: "mar-3",
      nom: "Argan Bio Luxe",
      logo: "Argan",
      paysOrigine: "Maroc",
      description: "Élixirs rares et huiles pures d'argan certifiées biologiques.",
      siteWeb: "https://arganbioluxe.com",
      statut: "Active",
      nombreProduits: 16,
      creeLe: "04/08/2026",
    },
    {
      id: "mar-4",
      nom: "Baobab Essence",
      logo: "Baobab",
      paysOrigine: "Sénégal",
      description: "Soins capillaires fortifiants à la poudre et huile de graines de baobab.",
      siteWeb: "https://baobabessence.com",
      statut: "Active",
      nombreProduits: 12,
      creeLe: "08/08/2026",
    },
    {
      id: "mar-5",
      nom: "Nectar d'Aloe Vera",
      logo: "Aloe",
      paysOrigine: "Côte d'Ivoire",
      description: "Gels apaisants et lotions hydratantes à l'aloe vera 99% pur.",
      siteWeb: "https://nectar-aloe.ci",
      statut: "Inactive",
      nombreProduits: 6,
      creeLe: "10/08/2026",
    },
  ]);

  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<"Toutes" | "Active" | "Inactive">("Toutes");
  const [modalOuvert, setModalOuvert] = useState(false);
  const [marqueAEditer, setMarqueAEditer] = useState<Marque | null>(null);

  const marquesFiltrees = marques.filter((m) => {
    const matchTexte =
      m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      m.paysOrigine.toLowerCase().includes(recherche.toLowerCase()) ||
      m.description.toLowerCase().includes(recherche.toLowerCase());

    const matchStatut = filtreStatut === "Toutes" ? true : m.statut === filtreStatut;

    return matchTexte && matchStatut;
  });

  const ouvrirCreation = () => {
    setMarqueAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (m: Marque) => {
    setMarqueAEditer(m);
    setModalOuvert(true);
  };

  const basculerStatut = (id: string) => {
    setMarques((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, statut: m.statut === "Active" ? "Inactive" : "Active" }
          : m
      )
    );
  };

  const supprimerMarque = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette marque ?")) {
      setMarques((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const enregistrerMarque = (marque: Marque) => {
    setMarques((prev) => {
      const existe = prev.some((m) => m.id === marque.id);
      if (existe) {
        return prev.map((m) => (m.id === marque.id ? marque : m));
      } else {
        return [marque, ...prev];
      }
    });
  };

  const totalProduits = marques.reduce((sum, m) => sum + m.nombreProduits, 0);
  const marquesLocales = marques.filter((m) => m.paysOrigine === "Cameroun").length;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Gestion des Marques Partenaires
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Répertoire des marques et laboratoires partenaires pour le filtrage et le catalogue.
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

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Marques
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {marques.length}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Building02Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Marques Locales
            </span>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
              {marquesLocales} (Cameroun)
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Location01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Produits Rattachés
            </span>
            <h3 className="text-2xl font-extrabold text-[#4880FF] mt-1">
              {totalProduits}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <ShoppingBag01Icon size={24} strokeWidth={2} />
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
            placeholder="Rechercher par marque ou pays d'origine..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF] text-slate-800"
          />
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-2">
          {(["Toutes", "Active", "Inactive"] as const).map((st) => (
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marquesFiltrees.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Header Logo + Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#4880FF] text-3xl flex items-center justify-center border border-blue-100 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                    {m.logo.startsWith("http") ? (
                      <img
                        src={m.logo}
                        alt={m.nom}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <SparklesIcon size={24} strokeWidth={2} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base group-hover:text-[#4880FF] transition-colors">
                      {m.nom}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                      <Location01Icon size={12} className="text-[#4880FF]" />
                      <span>{m.paysOrigine}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => basculerStatut(m.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    m.statut === "Active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}
                  title="Changer le statut"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      m.statut === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  <span>{m.statut}</span>
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {m.description}
              </p>

              {/* Website Link */}
              {m.siteWeb && (
                <a
                  href={m.siteWeb}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#4880FF] hover:underline inline-flex items-center gap-1.5 bg-blue-50/50 px-3 py-1 rounded-lg"
                >
                  <Link01Icon size={14} />
                  <span className="truncate max-w-[200px]">{m.siteWeb}</span>
                </a>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <PackageIcon size={14} className="text-[#4880FF]" />
                <span>{m.nombreProduits} Produits</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => ouvrirEdition(m)}
                  aria-label="Éditer la marque"
                  className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#4880FF] text-slate-600 hover:text-white flex items-center justify-center text-xs font-bold transition-all border border-slate-200/60"
                  title="Éditer la marque"
                >
                  <Edit02Icon size={16} strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={() => supprimerMarque(m.id)}
                  aria-label="Supprimer la marque"
                  className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center text-xs font-bold transition-all border border-rose-100"
                  title="Supprimer la marque"
                >
                  <Delete02Icon size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {marquesFiltrees.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
          Aucune marque ne correspond à votre recherche.
        </div>
      )}

      {/* Modal Marque */}
      <ModalMarqueFormulaire
        ouvert={modalOuvert}
        marqueAEditer={marqueAEditer}
        onFermer={() => setModalOuvert(false)}
        onEnregistrer={enregistrerMarque}
      />
    </div>
  );
}
