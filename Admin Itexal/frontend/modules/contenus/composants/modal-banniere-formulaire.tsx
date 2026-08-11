"use client";

import React, { useState, useEffect } from "react";
import { BanniereSite } from "../types/contenu";
import { Image01Icon, Cancel01Icon } from "hugeicons-react";

interface ModalBanniereFormulaireProps {
  ouvert: boolean;
  banniereAEditer: BanniereSite | null;
  onFermer: () => void;
  onEnregistrer: (banniere: BanniereSite) => void;
}

export const ModalBanniereFormulaire: React.FC<
  ModalBanniereFormulaireProps
> = ({ ouvert, banniereAEditer, onFermer, onEnregistrer }) => {
  const [titre, setTitre] = useState("");
  const [sousTitre, setSousTitre] = useState("");
  const [texteBouton, setTexteBouton] = useState("Découvrir la collection");
  const [lienBouton, setLienBouton] = useState("/produits");
  const [image, setImage] = useState("");
  const [emplacement, setEmplacement] = useState<
    "Hero Sliders" | "Banniere Promo" | "Bandeau Haut"
  >("Hero Sliders");
  const [actif, setActif] = useState(true);

  useEffect(() => {
    if (banniereAEditer) {
      setTitre(banniereAEditer.titre);
      setSousTitre(banniereAEditer.sousTitre);
      setTexteBouton(banniereAEditer.texteBouton);
      setLienBouton(banniereAEditer.lienBouton);
      setImage(banniereAEditer.image);
      setEmplacement(banniereAEditer.emplacement);
      setActif(banniereAEditer.actif);
    } else {
      setTitre("Révélez l'Éclat Naturel de Votre Peau");
      setSousTitre("Profitez de -20% sur la gamme cosmétique bio ITexal.");
      setTexteBouton("Acheter Maintenant");
      setLienBouton("/produits?promo=true");
      setImage(
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&auto=format&fit=crop&q=80"
      );
      setEmplacement("Hero Sliders");
      setActif(true);
    }
  }, [banniereAEditer, ouvert]);

  if (!ouvert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre || !image) return;

    const banniereResultat: BanniereSite = {
      id: banniereAEditer?.id || `ban-${Date.now()}`,
      titre,
      sousTitre,
      texteBouton,
      lienBouton,
      image,
      emplacement,
      actif,
      ordre: banniereAEditer?.ordre || 1,
    };

    onEnregistrer(banniereResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <Image01Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {banniereAEditer
                  ? "Modifier la Bannière"
                  : "Ajouter une Bannière"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Contenu visuel et boutons d'action du site e-commerce.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors text-xs"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Titre principal de la bannière *
            </label>
            <input
              type="text"
              required
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Révélez l'Éclat Naturel de Votre Peau"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Sous-titre / Description
            </label>
            <input
              type="text"
              value={sousTitre}
              onChange={(e) => setSousTitre(e.target.value)}
              placeholder="Ex: Soins certifiés 100% naturels et biologiques"
              className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Texte du Bouton CTA
              </label>
              <input
                type="text"
                value={texteBouton}
                onChange={(e) => setTexteBouton(e.target.value)}
                placeholder="Ex: Découvrir"
                className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Lien de Redirection
              </label>
              <input
                type="text"
                value={lienBouton}
                onChange={(e) => setLienBouton(e.target.value)}
                placeholder="/admin/produits"
                className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              URL de l'image de fond *
            </label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Emplacement
              </label>
              <select
                value={emplacement}
                onChange={(e) =>
                  setEmplacement(e.target.value as any)
                }
                className="w-full px-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4880FF]"
              >
                <option value="Hero Sliders">Carrousel Accueil (Hero)</option>
                <option value="Banniere Promo">Bannière Promo Milieu</option>
                <option value="Bandeau Haut">Bandeau Supérieur Notice</option>
              </select>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={actif}
                  onChange={(e) => setActif(e.target.checked)}
                  className="rounded border-slate-300 text-[#4880FF]"
                />
                <span>Afficher la bannière sur le site</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onFermer}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
