"use client";

import React, { useState, useEffect, useRef } from "react";
import { Marque } from "../types/marque";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Building02Icon, Cancel01Icon, Upload01Icon, Delete02Icon, Tick01Icon } from "hugeicons-react";

interface ModalMarqueFormulaireProps {
  ouvert: boolean;
  marqueAEditer: Marque | null;
  onFermer: () => void;
  onEnregistrer: (marque: Marque) => void;
}

export const ModalMarqueFormulaire: React.FC<ModalMarqueFormulaireProps> = ({
  ouvert, marqueAEditer, onFermer, onEnregistrer,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nom, setNom] = useState("");
  const [logo, setLogo] = useState("");          // base64 ou URL
  const [apercuLogo, setApercuLogo] = useState<string | null>(null);
  const [paysOrigine, setPaysOrigine] = useState("Cameroun");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState<"Active" | "Inactive">("Active");
  const [glisserDeposer, setGlisserDeposer] = useState(false);
  const [erreurFichier, setErreurFichier] = useState("");

  useEffect(() => {
    if (marqueAEditer) {
      setNom(marqueAEditer.nom);
      const logoExistant = marqueAEditer.logo || "";
      setLogo(logoExistant);
      // Afficher aperçu seulement si c'est une vraie image (URL ou base64)
      setApercuLogo(logoExistant.startsWith("http") || logoExistant.startsWith("data:") ? logoExistant : null);
      setPaysOrigine(marqueAEditer.paysOrigine || "Cameroun");
      setDescription(marqueAEditer.description || "");
      setStatut(marqueAEditer.statut || "Active");
    } else {
      setNom("");
      setLogo("");
      setApercuLogo(null);
      setPaysOrigine("Cameroun");
      setDescription("");
      setStatut("Active");
    }
    setErreurFichier("");
  }, [marqueAEditer, ouvert]);

  if (!ouvert) return null;

  const traiterFichier = (file: File) => {
    setErreurFichier("");
    const typesAcceptes = ["image/png", "image/jpeg", "image/webp"];
    if (!typesAcceptes.includes(file.type)) {
      setErreurFichier("Format non supporté. Utilisez PNG, JPG ou WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErreurFichier("Fichier trop volumineux (max 5 Mo).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setLogo(dataUrl);
      setApercuLogo(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) traiterFichier(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setGlisserDeposer(false);
    if (e.dataTransfer.files?.[0]) traiterFichier(e.dataTransfer.files[0]);
  };

  const supprimerLogo = () => {
    setLogo("");
    setApercuLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    const marqueResultat: Marque = {
      id: marqueAEditer?.id || `mar-${Date.now()}`,
      nom: nom.trim(),
      logo: logo || undefined,
      paysOrigine,
      description,
      statut,
      nombreProduits: marqueAEditer?.nombreProduits || 0,
      creeLe: marqueAEditer?.creeLe || new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(marqueResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] flex items-center justify-center">
              <Building02Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {marqueAEditer ? t("marques.editBrand") : t("marques.addBrand")}
              </h2>
              <p className="text-xs text-slate-500">{t("marques.subtitle")}</p>
            </div>
          </div>
          <button type="button" onClick={onFermer} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer">
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">

          {/* Nom */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {t("marques.brandName")} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text" required value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: ITexal Cosméceutiques"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4880FF] text-slate-800 font-semibold"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Logo officiel <span className="text-slate-400 font-normal">(PNG, JPG, WEBP · max 5 Mo)</span>
            </label>
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="hidden" />

            {apercuLogo ? (
              /* Aperçu du logo uploadé */
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-xs">
                  <img src={apercuLogo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold mb-1">
                    <Tick01Icon size={11} /> Logo chargé
                  </span>
                  <p className="text-xs font-bold text-slate-700 truncate">{nom || "Aperçu du logo"}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-extrabold text-[11px] rounded-xl cursor-pointer transition-colors">
                    Changer
                  </button>
                  <button type="button" onClick={supprimerLogo}
                    className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                    <Delete02Icon size={15} />
                  </button>
                </div>
              </div>
            ) : (
              /* Zone drag & drop */
              <div
                onDragOver={(e) => { e.preventDefault(); setGlisserDeposer(true); }}
                onDragLeave={() => setGlisserDeposer(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  glisserDeposer ? "border-[#4880FF] bg-blue-50/60 scale-[1.01]" : "border-slate-200 bg-[#F8F9FD] hover:border-[#4880FF] hover:bg-blue-50/30"
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 text-[#4880FF] flex items-center justify-center mb-2">
                  <Upload01Icon size={20} strokeWidth={2} />
                </div>
                <p className="text-xs font-extrabold text-slate-800">Cliquer ou glisser-déposer l'image du logo</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG ou WEBP · Format carré recommandé</p>
              </div>
            )}

            {erreurFichier && (
              <p className="text-rose-600 font-bold text-[11px] mt-1.5 flex items-center gap-1">⚠ {erreurFichier}</p>
            )}
          </div>

          {/* Pays & Statut */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">{t("marques.originCountry")}</label>
              <input type="text" value={paysOrigine} onChange={(e) => setPaysOrigine(e.target.value)}
                placeholder="Cameroun"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800 font-medium" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">{t("common.status")}</label>
              <select value={statut} onChange={(e) => setStatut(e.target.value as "Active" | "Inactive")}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800 font-semibold">
                <option value="Active">{t("common.active")}</option>
                <option value="Inactive">{t("common.inactive")}</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">{t("marques.labPresentation")}</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Présentation de la marque..."
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800" />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button type="button" onClick={onFermer}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer">
              {t("common.cancel")}
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer">
              {t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
