"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { BanniereSite, PageStatique } from "@/modules/contenus/types/contenu";
import { ModalBanniereFormulaire } from "@/modules/contenus/composants/modal-banniere-formulaire";
import {
  Image01Icon,
  File01Icon,
  Add01Icon,
  Edit02Icon,
  Delete02Icon,
  ViewIcon,
  ViewOffIcon,
} from "hugeicons-react";

export default function PageContenusAdmin() {
  const { t } = useLanguage();
  const [ongletActif, setOngletActif] = useState<"bannieres" | "pages">("bannieres");

  const [bannieres, setBannieres] = useState<BanniereSite[]>([
    {
      id: "ban-1",
      titre: "Sublimez Votre Beauté Naturelle",
      sousTitre: "Soins d'exception formulés au beurre de karité bio du Cameroun.",
      texteBouton: "Découvrir les Produits",
      lienBouton: "/admin/produits",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      emplacement: "Hero Sliders",
      actif: true,
      ordre: 1,
    },
    {
      id: "ban-2",
      titre: "Élixir d'Argan & Huiles Précieuses",
      sousTitre: "Offre exclusive : -15% sur toute la gamme capillaire.",
      texteBouton: "Profiter de l'Offre",
      lienBouton: "/admin/promotions",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
      emplacement: "Hero Sliders",
      actif: true,
      ordre: 2,
    },
    {
      id: "ban-3",
      titre: "Livraison Gratuite dès 25.000 FCFA d'Achat",
      sousTitre: "Partout à Douala et Yaoundé",
      texteBouton: "En savoir plus",
      lienBouton: "/admin/livraison",
      image:
        "https://images.unsplash.com/photo-1608248597261-e4d091444d32?w=800&auto=format&fit=crop&q=80",
      emplacement: "Bandeau Haut",
      actif: true,
      ordre: 3,
    },
  ]);

  const [pagesStatiques, setPagesStatiques] = useState<PageStatique[]>([
    {
      id: "pg-1",
      titre: "À Propos de la Maison ITexal",
      slug: "a-propos",
      categorie: "Institutionnel",
      extrait: "Histoire, valeurs cosmétiques et engagement éco-responsable ITexal.",
      publie: true,
      miseAJourLe: "01/08/2026",
    },
    {
      id: "pg-2",
      titre: "Conditions Générales de Vente (CGV)",
      slug: "cgv",
      categorie: "Légal",
      extrait: "Termes de paiement, garanties, délais de livraison et retours.",
      publie: true,
      miseAJourLe: "15/07/2026",
    },
    {
      id: "pg-3",
      titre: "Guide Beauté : Prendre Soin de Sa Peau en Climat Tropical",
      slug: "guide-peau-tropicale",
      categorie: "Blog & Conseils",
      extrait: "Astuces et rituels quotidiens pour une hydratation optimale.",
      publie: true,
      miseAJourLe: "05/08/2026",
    },
  ]);

  // Modal State
  const [modalBanniereOuvert, setModalBanniereOuvert] = useState(false);
  const [banniereAEditer, setBanniereAEditer] = useState<BanniereSite | null>(null);

  const basculerStatutBanniere = (id: string) => {
    setBannieres((prev) =>
      prev.map((b) => (b.id === id ? { ...b, actif: !b.actif } : b))
    );
  };

  const supprimerBanniere = (id: string) => {
    if (confirm(t("contenus.confirmDeleteBanner"))) {
      setBannieres((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const enregistrerBanniere = (banniere: BanniereSite) => {
    setBannieres((prev) => {
      const existe = prev.some((b) => b.id === banniere.id);
      if (existe) {
        return prev.map((b) => (b.id === banniere.id ? banniere : b));
      } else {
        return [banniere, ...prev];
      }
    });
  };

  const basculerPublicationPage = (id: string) => {
    setPagesStatiques((prev) =>
      prev.map((p) => (p.id === id ? { ...p, publie: !p.publie } : p))
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("contenus.title")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("contenus.subtitle")}
          </p>
        </div>

        {ongletActif === "bannieres" && (
          <button
            type="button"
            onClick={() => {
              setBanniereAEditer(null);
              setModalBanniereOuvert(true);
            }}
            className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Add01Icon size={16} strokeWidth={2.5} />
            <span>{t("contenus.addBanner")}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 font-bold text-xs">
        <button
          type="button"
          onClick={() => setOngletActif("bannieres")}
          className={`pb-3 transition-all flex items-center gap-2 cursor-pointer ${
            ongletActif === "bannieres"
              ? "border-b-2 border-[#4880FF] text-[#4880FF]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Image01Icon size={16} />
          <span>{t("contenus.bannersTitle")} ({bannieres.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setOngletActif("pages")}
          className={`pb-3 transition-all flex items-center gap-2 cursor-pointer ${
            ongletActif === "pages"
              ? "border-b-2 border-[#4880FF] text-[#4880FF]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <File01Icon size={16} />
          <span>{t("contenus.pagesTitle")} ({pagesStatiques.length})</span>
        </button>
      </div>

      {/* Section Bannières */}
      {ongletActif === "bannieres" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bannieres.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all"
            >
              {/* Cover Image */}
              <div className="h-44 relative overflow-hidden bg-slate-100">
                <img
                  src={b.image}
                  alt={b.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${
                    b.actif
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {b.actif ? t("contenus.visible") : t("contenus.hidden")}
                </span>

                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 text-slate-800 font-bold text-[10px] rounded-lg backdrop-blur-xs">
                  {b.emplacement}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm leading-snug">
                    {b.titre}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {b.sousTitre}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4880FF] bg-blue-50 px-2.5 py-1 rounded-lg">
                    CTA: {b.texteBouton}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => basculerStatutBanniere(b.id)}
                      aria-label="Masquer ou Afficher"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title="Masquer/Afficher"
                    >
                      {b.actif ? <ViewIcon size={14} /> : <ViewOffIcon size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBanniereAEditer(b);
                        setModalBanniereOuvert(true);
                      }}
                      aria-label={t("common.edit")}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title={t("common.edit")}
                    >
                      <Edit02Icon size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => supprimerBanniere(b.id)}
                      aria-label={t("common.delete")}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors cursor-pointer"
                      title={t("common.delete")}
                    >
                      <Delete02Icon size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section Pages Statiques */}
      {ongletActif === "pages" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-4">PAGE / ARTICLE</th>
                  <th className="py-4 px-4">SLUG / URL</th>
                  <th className="py-4 px-4">CATÉGORIE</th>
                  <th className="py-4 px-4">DERNIÈRE M.À.J</th>
                  <th className="py-4 px-4 text-center">{t("common.status")}</th>
                  <th className="py-4 px-4 text-center">{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {pagesStatiques.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800 text-sm">{p.titre}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{p.extrait}</p>
                    </td>

                    <td className="py-4 px-4 font-mono text-[#4880FF] font-bold">
                      /{p.slug}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[10px]">
                        {p.categorie}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-400">{p.miseAJourLe}</td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => basculerPublicationPage(p.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          p.publie
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {p.publie ? t("contenus.published") : t("contenus.draft")}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Aperçu /${p.slug}`)}
                          className="px-3 py-1.5 bg-[#F8F9FD] hover:bg-blue-50 text-[#4880FF] font-bold rounded-xl border border-slate-200 flex items-center gap-1 cursor-pointer"
                        >
                          <ViewIcon size={14} />
                          <span>{t("contenus.preview")}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Édition /${p.slug}`)}
                          aria-label={t("common.edit")}
                          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Edit02Icon size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Formulaire Bannière */}
      <ModalBanniereFormulaire
        ouvert={modalBanniereOuvert}
        banniereAEditer={banniereAEditer}
        onFermer={() => setModalBanniereOuvert(false)}
        onEnregistrer={enregistrerBanniere}
      />
    </div>
  );
}
