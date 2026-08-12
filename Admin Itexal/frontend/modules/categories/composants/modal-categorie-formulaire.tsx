"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [monte, setMonte] = useState(false);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [icone, setIcone] = useState("Soin Visage");
  const [image, setImage] = useState("");
  const [statut, setStatut] = useState<"Actif" | "Inactif">("Actif");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMonte(true);
  }, []);

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

  if (!ouvert || !monte) return null;

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-8">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800">
            <Tag01Icon size={20} className="text-[#4880FF]" />
            <h2 className="font-extrabold text-base">
              {categorieAEditer ? "Modifier la Catégorie" : "Ajouter une Catégorie"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onFermer}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-500 font-extrabold flex items-center justify-center text-xs transition-colors border border-slate-200"
          >
            <Cancel01Icon size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="ex: Soins Visage, Huiles Essentielles..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Courte présentation de la gamme..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Importation de l'image de la catégorie */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Image représentative de la catégorie
            </label>

            {image ? (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100">
                <img
                  src={image}
                  alt="Aperçu catégorie"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-slate-800 rounded-xl text-xs font-bold shadow-md hover:bg-slate-100 flex items-center gap-1"
                  >
                    <Upload01Icon size={14} />
                    <span>Changer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-rose-700 flex items-center gap-1"
                  >
                    <Delete02Icon size={14} />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-[#4880FF] rounded-2xl flex flex-col items-center justify-center gap-1.5 bg-slate-50/50 hover:bg-indigo-50/20 cursor-pointer transition-all text-slate-500"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#4880FF] flex items-center justify-center">
                  <Image01Icon size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  Cliquer pour importer une image
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  PNG, JPG, WEBP (Max 5 Mo)
                </span>
              </div>
            )}

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
    </div>,
    document.body
  );
};
