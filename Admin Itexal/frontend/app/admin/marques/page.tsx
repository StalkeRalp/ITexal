"use client";

import React, { useState, useMemo } from "react";
import { Marque as MarqueVue } from "@/modules/marques/types/marque";
import { ModalMarqueFormulaire } from "@/modules/marques/composants/modal-marque-formulaire";
import { ModalConfirmation } from "@/composants-communs/modal-confirmation";
import { useProduits } from "@/lib/context/ProduitsContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { useToast } from "@/lib/context/ToastContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { formaterPrix, obtenirImageSecurisee, gererErreurChargementImage } from "@/lib/utilitaires/formatage";
import {
  Add01Icon, Search01Icon, Building02Icon, GlobeIcon, PackageIcon,
  Edit02Icon, Delete02Icon, MoreHorizontalIcon, Cancel01Icon,
  SparklesIcon, Coins01Icon, ShoppingBag01Icon, Tag01Icon, EyeIcon,
} from "hugeicons-react";

const PALETTE_THEMES = [
  { gradientFond: "bg-gradient-to-br from-white via-indigo-50/20 to-indigo-50/40", bordure: "border-indigo-100/90 hover:border-indigo-300", badgeLogo: "bg-indigo-50 text-[#5B63F6] border-indigo-200", badgeProduit: "bg-indigo-50 text-[#5B63F6] border-indigo-100", ligneAccent: "bg-[#5B63F6]", texteAccent: "text-[#5B63F6]" },
  { gradientFond: "bg-gradient-to-br from-white via-emerald-50/20 to-emerald-50/40", bordure: "border-emerald-100/90 hover:border-emerald-300", badgeLogo: "bg-emerald-50 text-emerald-600 border-emerald-200", badgeProduit: "bg-emerald-50 text-emerald-700 border-emerald-100", ligneAccent: "bg-emerald-500", texteAccent: "text-emerald-600" },
  { gradientFond: "bg-gradient-to-br from-white via-purple-50/20 to-purple-50/40", bordure: "border-purple-100/90 hover:border-purple-300", badgeLogo: "bg-purple-50 text-purple-600 border-purple-200", badgeProduit: "bg-purple-50 text-purple-700 border-purple-100", ligneAccent: "bg-purple-500", texteAccent: "text-purple-600" },
  { gradientFond: "bg-gradient-to-br from-white via-amber-50/20 to-amber-50/40", bordure: "border-amber-100/90 hover:border-amber-300", badgeLogo: "bg-amber-50 text-amber-600 border-amber-200", badgeProduit: "bg-amber-50 text-amber-700 border-amber-100", ligneAccent: "bg-amber-500", texteAccent: "text-amber-600" },
  { gradientFond: "bg-gradient-to-br from-white via-rose-50/20 to-rose-50/40", bordure: "border-rose-100/90 hover:border-rose-300", badgeLogo: "bg-rose-50 text-rose-600 border-rose-200", badgeProduit: "bg-rose-50 text-rose-700 border-rose-100", ligneAccent: "bg-rose-500", texteAccent: "text-rose-600" },
  { gradientFond: "bg-gradient-to-br from-white via-cyan-50/20 to-cyan-50/40", bordure: "border-cyan-100/90 hover:border-cyan-300", badgeLogo: "bg-cyan-50 text-cyan-600 border-cyan-200", badgeProduit: "bg-cyan-50 text-cyan-700 border-cyan-100", ligneAccent: "bg-cyan-500", texteAccent: "text-cyan-600" },
];

// Composant Logo universel : affiche l'image si dispo, sinon les initiales colorées
function LogoMarque({ logo, nom, size = "md", className = "" }: { logo?: string; nom: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const [erreur, setErreur] = useState(false);
  // Cadre rond, bordure ultra-fine, tailles généreuses
  const sizeClasses = { sm: "w-12 h-12 text-sm", md: "w-16 h-16 text-xl", lg: "w-24 h-24 text-3xl" };
  const imgPadding = { sm: "p-1", md: "p-1", lg: "p-1.5" };
  const estImage = !erreur && logo && (logo.startsWith("http") || logo.startsWith("data:"));
  const initiales = nom.substring(0, 2).toUpperCase();

  return (
    <div className={`${sizeClasses[size]} rounded-full border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      {estImage ? (
        <img src={logo} alt={nom} className={`w-full h-full object-cover ${imgPadding[size]}`} onError={() => setErreur(true)} />
      ) : (
        <span className="font-black text-[#5B63F6]">{initiales}</span>
      )}
    </div>
  );
}

export default function PageMarquesAdmin() {
  const { marques, produits, creerMarque, modifierMarque, supprimerMarque } = useProduits();
  const { commandes } = useCommandes();
  const { t } = useLanguage();
  const toast = useToast();

  const marquesVues: MarqueVue[] = useMemo(() => {
    return marques.map((m) => {
      const prodsMarque = produits.filter((p) => p.marqueId === m.id || p.nomMarque === m.nom);
      return {
        id: m.id, nom: m.nom,
        logo: m.logo || "",
        paysOrigine: m.paysOrigine || "Cameroun",
        description: m.description || `Laboratoire cosmétique ${m.nom}.`,
        siteWeb: (m as any).siteWeb || "",
        statut: "Active" as "Active" | "Inactive",
        nombreProduits: prodsMarque.length || m.nombreProduits || 0,
        creeLe: m.creeLe || "12/08/2026",
      };
    });
  }, [marques, produits]);

  const [recherche, setRecherche] = useState("");
  const [modalOuvert, setModalOuvert] = useState(false);
  const [marqueAEditer, setMarqueAEditer] = useState<MarqueVue | null>(null);
  const [idASupprimer, setIdASupprimer] = useState<string | null>(null);
  const [popoverId, setPopoverId] = useState<string | null>(null);
  const [marqueSelectionnee, setMarqueSelectionnee] = useState<MarqueVue | null>(null);

  const marquesFiltrees = marquesVues.filter((m) =>
    m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    m.paysOrigine.toLowerCase().includes(recherche.toLowerCase())
  );

  const detailsMarque = useMemo(() => {
    if (!marqueSelectionnee) return null;
    const prods = produits.filter((p) => p.marqueId === marqueSelectionnee.id || p.nomMarque === marqueSelectionnee.nom);
    const valeurStock = prods.reduce((s, p) => s + p.stock * p.prix, 0);
    const unitesStock = prods.reduce((s, p) => s + p.stock, 0);
    let qtVendus = 0, caVentes = 0;
    commandes.forEach((cmd) => cmd.articles.forEach((art) => {
      if (prods.find((p) => p.id === art.produitId)) { qtVendus += art.quantite; caVentes += art.sousTotal; }
    }));
    return { prods, valeurStock, unitesStock, qtVendus, caVentes };
  }, [marqueSelectionnee, produits, commandes]);

  const ouvrirCreation = () => { setMarqueAEditer(null); setModalOuvert(true); };
  const ouvrirEdition = (m: MarqueVue) => { setMarqueAEditer(m); setModalOuvert(true); };

  const enregistrerMarqueHandler = (marque: MarqueVue) => {
    if (marqueAEditer) {
      modifierMarque(marque.id, marque.nom, marque.description, marque.logo);
      toast.succes(t("common.itemUpdated"));
    } else {
      creerMarque(marque.nom, marque.description, marque.paysOrigine, marque.logo);
      toast.succes(t("common.itemCreated"));
    }
    setModalOuvert(false);
  };

  const confirmerSuppression = () => {
    if (idASupprimer) {
      if (marqueSelectionnee?.id === idASupprimer) setMarqueSelectionnee(null);
      supprimerMarque(idASupprimer);
      toast.succes(t("common.itemDeleted"));
      setIdASupprimer(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t("marques.title")} ({marquesVues.length})</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">{t("marques.subtitle")}</p>
        </div>
        <button type="button" onClick={ouvrirCreation} className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer">
          <Add01Icon size={18} strokeWidth={2.5} /><span>{t("marques.addBrand")}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("marques.totalBrands")}</span><h3 className="text-2xl font-black text-slate-800 mt-1">{marquesVues.length}</h3></div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center"><Building02Icon size={24} /></div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("common.active")}</span><h3 className="text-2xl font-black text-emerald-600 mt-1">{marquesVues.length}</h3></div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><SparklesIcon size={24} /></div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("categories.attachedProducts")}</span><h3 className="text-2xl font-black text-purple-600 mt-1">{produits.length}</h3></div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center"><PackageIcon size={24} /></div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
        <div className="relative">
          <Search01Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input type="text" value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder={t("marques.searchPlaceholder")} className="w-full pl-11 pr-4 py-3 bg-[#F8F9FD] border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] transition-all" />
        </div>
      </div>

      {/* Main Layout: Grid + Right Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Brand Cards Grid (left/center) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${marqueSelectionnee ? "lg:col-span-2" : "lg:col-span-3 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {marquesFiltrees.map((m, index) => {
            const estSelectionne = marqueSelectionnee?.id === m.id;
            const estPopoverOuvert = popoverId === m.id;
            const theme = PALETTE_THEMES[index % PALETTE_THEMES.length];
            return (
              <div
                key={m.id}
                onClick={() => setMarqueSelectionnee(estSelectionne ? null : m)}
                className={`${theme.gradientFond} rounded-3xl p-5 shadow-sm border ${estSelectionne ? "border-[#4880FF] shadow-md shadow-blue-500/10" : theme.bordure} space-y-4 hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between cursor-pointer`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.ligneAccent} opacity-80`} />

                <div className="space-y-3 pt-1">
                  <div className="flex items-start justify-between">
                    {/* Logo réel ou initiales */}
                    <LogoMarque logo={m.logo} nom={m.nom} size="lg" className={`${theme.badgeLogo} group-hover:scale-105 transition-transform`} />

                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button type="button" onClick={() => setPopoverId(estPopoverOuvert ? null : m.id)} className="w-8 h-8 rounded-xl bg-white/90 hover:bg-white text-slate-500 font-bold transition-colors inline-flex items-center justify-center cursor-pointer shadow-xs border border-slate-100">
                        <MoreHorizontalIcon size={18} />
                      </button>
                      {estPopoverOuvert && (
                        <div className="absolute right-0 top-10 z-20 w-44 bg-white rounded-2xl p-1.5 shadow-xl border border-slate-100 animate-fadeIn">
                          <button type="button" onClick={() => { setPopoverId(null); setMarqueSelectionnee(m); }} className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                            <EyeIcon size={14} className={theme.texteAccent} /><span>{t("common.viewDetails")}</span>
                          </button>
                          <button type="button" onClick={() => { setPopoverId(null); ouvrirEdition(m); }} className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                            <Edit02Icon size={14} className="text-amber-500" /><span>{t("common.edit")}</span>
                          </button>
                          <button type="button" onClick={() => { setPopoverId(null); setIdASupprimer(m.id); }} className="w-full px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors border-t border-slate-100 mt-1 cursor-pointer">
                            <Delete02Icon size={14} /><span>{t("common.delete")}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{m.nom}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">{m.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                  <span className={`px-3 py-1 rounded-xl border ${theme.badgeProduit} font-extrabold`}>{m.nombreProduits} {t("common.products")}</span>
                  <span className="text-slate-500 font-bold text-[11px] bg-white px-2.5 py-1 rounded-xl border border-slate-200/60 shadow-2xs">📍 {m.paysOrigine}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side Panel — Fiche Détail Marque (sticky comme la page clients) */}
        {marqueSelectionnee && detailsMarque && (
          <div className="lg:col-span-1 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
              {/* Panel Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fiche Marque</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => ouvrirEdition(marqueSelectionnee)} className="w-7 h-7 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 flex items-center justify-center transition-colors cursor-pointer" title="Modifier">
                    <Edit02Icon size={14} />
                  </button>
                  <button type="button" onClick={() => setMarqueSelectionnee(null)} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer" title="Fermer">
                    <Cancel01Icon size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Logo + Identity */}
              <div className="flex flex-col items-center text-center space-y-3 p-6 pb-4">
                <LogoMarque logo={marqueSelectionnee.logo} nom={marqueSelectionnee.nom} size="lg"
                  className="w-28 h-28 text-4xl shadow-sm" />
                <div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-slate-800">{marqueSelectionnee.nom}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">Active</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Origine : <strong className="text-slate-700">{marqueSelectionnee.paysOrigine}</strong>
                  </p>

                </div>
              </div>

              {/* KPI Stats */}
              <div className="grid grid-cols-2 gap-3 px-5 pb-4">
                <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center">
                  <PackageIcon size={16} className="text-indigo-600 mx-auto mb-1" />
                  <p className="text-lg font-black text-slate-900">{marqueSelectionnee.nombreProduits}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">Produits</span>
                </div>
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
                  <Coins01Icon size={16} className="text-emerald-600 mx-auto mb-1" />
                  <p className="text-sm font-black text-slate-900">{formaterPrix(detailsMarque.valeurStock)}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">{detailsMarque.unitesStock} en stock</span>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-center">
                  <ShoppingBag01Icon size={16} className="text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-black text-slate-900">{detailsMarque.qtVendus}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">Ventes cumulées</span>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 text-center">
                  <Tag01Icon size={16} className="text-amber-600 mx-auto mb-1" />
                  <p className="text-sm font-black text-slate-900">{formaterPrix(detailsMarque.caVentes)}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">CA généré</span>
                </div>
              </div>

              {/* Description */}
              <div className="mx-5 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-medium text-slate-600 leading-relaxed">{marqueSelectionnee.description}</p>
              </div>

              {/* Products Table */}
              <div className="px-5 pb-5 space-y-2">
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag01Icon size={13} className="text-[#4880FF]" />Produits rattachés ({detailsMarque.prods.length})
                </h4>
                {detailsMarque.prods.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">Aucun produit rattaché.</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {detailsMarque.prods.map((prod) => (
                      <div key={prod.id} className="flex items-center gap-3 p-2.5 bg-[#F8F9FD] rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <img src={obtenirImageSecurisee(prod.images?.[0] || prod.image, prod.nomCategorie)} alt={prod.nom} onError={(e) => gererErreurChargementImage(e, prod.nomCategorie)} className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{prod.nom}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{prod.nomCategorie}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-[#4880FF] block">{formaterPrix(prod.prixPromotionnel || prod.prix)}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${prod.stock <= 5 ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}>{prod.stock} u.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="px-5 pb-5">
                <button type="button" onClick={() => setIdASupprimer(marqueSelectionnee.id)} className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                  <Delete02Icon size={14} />{t("common.delete")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalOuvert && (
        <ModalMarqueFormulaire ouvert={modalOuvert} onFermer={() => setModalOuvert(false)} onEnregistrer={enregistrerMarqueHandler} marqueAEditer={marqueAEditer} />
      )}

      {idASupprimer && (
        <ModalConfirmation ouvert={!!idASupprimer} titre={t("common.confirmDeleteTitle")} message={t("marques.confirmDeleteText")} texteConfirmer={t("common.delete")} variante="danger" onConfirmer={confirmerSuppression} onAnnuler={() => setIdASupprimer(null)} />
      )}
    </div>
  );
}
