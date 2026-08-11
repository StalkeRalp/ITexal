"use client";

import React, { useState, useEffect, useRef } from "react";
import { Categorie } from "../types/categorie";
import { Tag01Icon, Cancel01Icon, Upload01Icon, Image01Icon, Delete02Icon } from "hugeicons-react";

interface ModalCategorieFormulaireProps {
  ouvert: boolean;
  categorieAEditer: Categorie | null;
  onFermer: () => void;
  onEnregistrer: (cat: Categorie) => void;
}

export const ModalCategorieFormulaire: React.FC<
  ModalCategorieFormulaireProps
> = ({ ouvert, categorieAEditer, onFermer, onEnregistrer }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [icone, setIcone] = useState("Soin Visage");
  const [image, setImage] = useState("");
  const [statut, setStatut] = useState<"Actif" | "Inactif">("Actif");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (categorieAEditer) {
      setNom(categorieAEditer.nom);
      setDescription(categorieAEditer.description);
      setIcone(categorieAEditer.icone || "Soin Visage");
      setImage(categorieAEditer.image || "");
      setStatut(categorieAEditer.statut);
    } else {
      setNom("");
      setDescription("");
      setIcone("Soin Visage");
      setImage("");
      setStatut("Actif");
    }
  }, [categorieAEditer, ouvert]);

  if (!ouvert) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom) return;

    const categorieResultat: Categorie = {
      id: categorieAEditer?.id || `cat-${Date.now()}`,
      nom,
      slug: nom.toLowerCase().trim().replace(/[\s\W]+/g, "-"),
      description,
      icone,
      image: image || undefined,
      statut,
      nombreProduits: categorieAEditer?.nombreProduits || 0,
      creeLe: categorieAEditer?.creeLe || new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(categorieResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <Tag01Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {categorieAEditer ? "Modifier la Catégorie" : "Créer une Catégorie"}
              </h2>
              <p className="text-xs text-slate-500">
                Classification des produits cosmétiques ITexal.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Soin du Visage"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4880FF] text-slate-800"
            />
          </div>

          {/* Optional Image Upload */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Image de la catégorie</span>
              <span className="text-[11px] font-normal text-slate-400">(Optionnel)</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {image ? (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-50 flex items-center justify-center">
                <img
                  src={image}
                  alt="Aperçu catégorie"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-slate-800 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 hover:bg-slate-100"
                  >
                    <Upload01Icon size={14} /> Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="px-3 py-1.5 bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 hover:bg-rose-600"
                  >
                    <Delete02Icon size={14} /> Supprimer
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 px-4 bg-[#F8F9FD] border-2 border-dashed border-slate-200 hover:border-[#4880FF] rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-blue-50/20"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#4880FF] flex items-center justify-center shadow-xs">
                  <Image01Icon size={20} strokeWidth={2} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-700 text-xs">
                    Cliquez pour téléverser une image
                  </p>
                  <p className="text-[10px] text-slate-400">
                    PNG, JPG, WEBP • Max 5Mo (Optionnel)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Identifiant / Gamme
              </label>
              <input
                type="text"
                value={icone}
                onChange={(e) => setIcone(e.target.value)}
                placeholder="Ex: Soin Visage"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Statut
              </label>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value as "Actif" | "Inactif")}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800 font-semibold"
              >
                <option value="Actif">Actif (Visible sur la boutique)</option>
                <option value="Inactif">Inactif (Masqué)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description synthétique de la gamme cosmétique..."
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800"
            />
          </div>

          {/* Footer Submit */}
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
