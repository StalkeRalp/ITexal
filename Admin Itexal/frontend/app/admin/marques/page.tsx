"use client";

import React, { useState } from "react";
import { Marque as MarqueVue } from "@/modules/marques/types/marque";
import { ModalMarqueFormulaire } from "@/modules/marques/composants/modal-marque-formulaire";
import { ModalConfirmation } from "@/composants-communs/modal-confirmation";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useToast } from "@/lib/context/ToastContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  Add01Icon,
  Search01Icon,
  Building02Icon,
  GlobeIcon,
  PackageIcon,
  Edit02Icon,
  Delete02Icon,
  MoreHorizontalIcon,
  Cancel01Icon,
  SparklesIcon,
  EyeIcon,
} from "hugeicons-react";

export default function PageMarquesAdmin() {
  const { marques, produits, creerMarque, modifierMarque, supprimerMarque } = useProduits();
  const { t } = useLanguage();
  const toast = useToast();

  const marquesVues: MarqueVue[] = marques.map((m) => {
    const countProds = produits.filter((p) => p.marqueId === m.id).length;
    return {
      id: m.id,
      nom: m.nom,
      logo: m.logo || "ITexal",
      paysOrigine: m.paysOrigine || "Cameroun",
      description: m.description || `Maison de soins et laboratoire cosmétique ${m.nom}.`,
      siteWeb: (m as any).siteWeb || "https://itexal.cm",
      statut: "Active" as "Active" | "Inactive",
      nombreProduits: countProds || m.nombreProduits || 0,
      creeLe: m.creeLe || "12/08/2026",
    };
  });

  const [recherche, setRecherche] = useState("");
  const [modalOuvert, setModalOuvert] = useState(false);
  const [marqueAEditer, setMarqueAEditer] = useState<MarqueVue | null>(null);
  const [idASupprimer, setIdASupprimer] = useState<string | null>(null);

  // Popover d'action rapide & Modal Détail de la marque
  const [popoverId, setPopoverId] = useState<string | null>(null);
  const [marqueDetaillee, setMarqueDetaillee] = useState<MarqueVue | null>(null);

  const marquesFiltrees = marquesVues.filter((m) => {
    return (
      m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      m.paysOrigine.toLowerCase().includes(recherche.toLowerCase()) ||
      m.description.toLowerCase().includes(recherche.toLowerCase())
    );
  });

  const ouvrirCreation = () => {
    setMarqueAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (m: MarqueVue) => {
    setMarqueAEditer(m);
    setModalOuvert(true);
  };

  const verifierSuppression = (id: string) => {
    setIdASupprimer(id);
  };

  const confirmerSuppressionHandler = () => {
    if (idASupprimer) {
      supprimerMarque(idASupprimer);
      toast.succes(t("common.itemDeleted"));
      setIdASupprimer(null);
    }
  };

  const enregistrerMarqueHandler = (marque: MarqueVue) => {
    if (marqueAEditer) {
      modifierMarque(marque.id, marque.nom, marque.description);
      toast.succes(t("common.itemUpdated"));
    } else {
      creerMarque(marque.nom, marque.description, marque.paysOrigine);
      toast.succes(t("common.itemCreated"));
    }
    setModalOuvert(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Title & Add Button Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("marques.title")} ({marquesVues.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("marques.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Add01Icon size={18} strokeWidth={2.5} />
          <span>{t("marques.addBrand")}</span>
        </button>
      </div>

      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("marques.totalBrands")}
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{marquesVues.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Building02Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("common.active")}
            </span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{marquesVues.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <SparklesIcon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("categories.attachedProducts")}
            </span>
            <h3 className="text-2xl font-black text-purple-600 mt-1">{produits.length}</h3>
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
            placeholder={t("marques.searchPlaceholder")}
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Main Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marquesFiltrees.map((m) => {
          const estPopoverOuvert = popoverId === m.id;

          return (
            <div
              key={m.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 hover:border-blue-200 hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#4880FF] font-black text-lg flex items-center justify-center border border-blue-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    {m.logo.startsWith("http") ? (
                      <img src={m.logo} alt={m.nom} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      m.nom.substring(0, 2).toUpperCase()
                    )}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setPopoverId(estPopoverOuvert ? null : m.id)}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-colors inline-flex items-center justify-center cursor-pointer"
                    >
                      <MoreHorizontalIcon size={18} />
                    </button>

                    {/* Popover Menu (Détails, Éditer, Supprimer) */}
                    {estPopoverOuvert && (
                      <div className="absolute right-0 top-10 z-20 w-44 bg-white rounded-2xl p-1.5 shadow-xl border border-slate-100 animate-fadeIn">
                        <button
                          type="button"
                          onClick={() => {
                            setPopoverId(null);
                            setMarqueDetaillee(m);
                          }}
                          className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <EyeIcon size={14} className="text-[#4880FF]" />
                          <span>{t("common.viewDetails")}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setPopoverId(null);
                            ouvrirEdition(m);
                          }}
                          className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Edit02Icon size={14} className="text-amber-500" />
                          <span>{t("common.edit")}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setPopoverId(null);
                            verifierSuppression(m.id);
                          }}
                          className="w-full px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors border-t border-slate-100 mt-1"
                        >
                          <Delete02Icon size={14} />
                          <span>{t("common.delete")}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-slate-900">{m.nom}</h3>
                    <button
                      type="button"
                      onClick={() => setMarqueDetaillee(m)}
                      className="w-6 h-6 rounded-full bg-blue-50 hover:bg-[#4880FF] text-[#4880FF] hover:text-white font-black text-xs flex items-center justify-center transition-all cursor-pointer"
                      title={t("categories.moreInfos")}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="px-3 py-1 bg-blue-50 text-[#4880FF] border border-blue-100 rounded-xl">
                  {m.nombreProduits} {t("common.products")}
                </span>

                <span className="text-slate-400 font-mono text-[11px]">{m.paysOrigine}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Détails Marque */}
      {marqueDetaillee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#4880FF] font-black text-xl flex items-center justify-center border border-blue-100 shadow-xs shrink-0">
                  {marqueDetaillee.logo.startsWith("http") ? (
                    <img src={marqueDetaillee.logo} alt={marqueDetaillee.nom} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    marqueDetaillee.nom.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{marqueDetaillee.nom}</h2>
                  <p className="text-xs text-slate-400 font-medium">{t("marques.originCountry")} : {marqueDetaillee.paysOrigine}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMarqueDetaillee(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-extrabold flex items-center justify-center transition-colors cursor-pointer"
              >
                <Cancel01Icon size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">{t("marques.labPresentation")}</span>
                <p className="font-medium text-slate-800 text-sm">{marqueDetaillee.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">{t("marques.referencedProducts")}</span>
                  <p className="text-2xl font-black text-[#4880FF] mt-1">{marqueDetaillee.nombreProduits}</p>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">{t("marques.officialWebsite")}</span>
                  <p className="text-xs font-bold text-emerald-700 mt-1 truncate">{marqueDetaillee.siteWeb}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setMarqueDetaillee(null)}
                className="px-6 py-2.5 bg-[#4880FF] text-white font-extrabold rounded-xl shadow-md cursor-pointer"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulaire Création/Édition Marque */}
      {modalOuvert && (
        <ModalMarqueFormulaire
          ouvert={modalOuvert}
          onFermer={() => setModalOuvert(false)}
          onEnregistrer={enregistrerMarqueHandler}
          marqueAEditer={marqueAEditer}
        />
      )}

      {/* Modal Confirmation de Suppression */}
      {idASupprimer && (
        <ModalConfirmation
          ouvert={!!idASupprimer}
          titre={t("common.confirmDeleteTitle")}
          message={t("marques.confirmDeleteText")}
          texteConfirmer={t("common.delete")}
          variante="danger"
          onConfirmer={confirmerSuppressionHandler}
          onAnnuler={() => setIdASupprimer(null)}
        />
      )}
    </div>
  );
}
