"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Categorie } from "../types/categorie";
import { useLanguage } from "@/lib/context/LanguageContext";
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
  const { t } = useLanguage();
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
            <Tag01Icon size={20} className="text-[#5B63F6]" />
            <h2 className="font-extrabold text-base">
              {categorieAEditer ? t("categories.editCategory") : t("categories.addCategory")}
            </h2>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label={t("common.close")}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-500 font-extrabold flex items-center justify-center text-xs transition-colors border border-slate-200 cursor-pointer"
          >
            <Cancel01Icon size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("categories.categoryName")}
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="ex: Soins Visage, Huiles Essentielles..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("categories.categoryDesc")}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Courte présentation de la gamme..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
            />
          </div>

          {/* Importation de l'image de la catégorie */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("categories.categoryImage")}
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
                    className="px-3 py-1.5 bg-white text-slate-800 rounded-xl text-xs font-bold shadow-md hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Upload01Icon size={14} />
                    <span>{t("common.edit")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="px-3 py-1.5 bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md hover:bg-rose-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Delete02Icon size={14} />
                    <span>{t("common.delete")}</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-28 border-2 border-dashed border-slate-200 hover:border-[#5B63F6] rounded-2xl flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-[#5B63F6] hover:bg-indigo-50/30 transition-all group cursor-pointer"
              >
                <Image01Icon size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">{t("products.formImageAdd")}</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onFermer}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              {t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
