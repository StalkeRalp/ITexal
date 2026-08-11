"use client";

import React, { useState, useEffect } from "react";
import { Produit, VarianteProduit } from "../types/produit";
import { formatPrix } from "@/lib/formatteur";
import {
  PackageIcon,
  Cancel01Icon,
  File01Icon,
  SparklesIcon,
  Upload01Icon,
  Tag01Icon,
  AlertCircleIcon,
  Delete02Icon,
  Add01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
} from "hugeicons-react";

interface ModalProduitFormulaireProps {
  ouvert: boolean;
  produitAEditer: Produit | null;
  categories: { id: string; nom: string }[];
  marques: { id: string; nom: string }[];
  onFermer: () => void;
  onEnregistrer: (produit: Produit) => void;
}

export const ModalProduitFormulaire: React.FC<ModalProduitFormulaireProps> = ({
  ouvert,
  produitAEditer,
  categories,
  marques,
  onFermer,
  onEnregistrer,
}) => {
  const [etapeCourante, setEtapeCourante] = useState<1 | 2 | 3 | 4>(1);
  const [erreurEtape, setErreurEtape] = useState("");

  const [nom, setNom] = useState("");
  const [reference, setReference] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [marqueId, setMarqueId] = useState("");
  const [description, setDescription] = useState("");

  const [prix, setPrix] = useState<number | "">("");
  const [prixPromotionnel, setPrixPromotionnel] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">(0);
  const [disponible, setDisponible] = useState(true);

  const [composition, setComposition] = useState("");
  const [typeDePeau, setTypeDePeau] = useState("Toutes peaux");
  const [contenance, setContenance] = useState("250ml");
  const [origine, setOrigine] = useState("Cameroun");
  const [conseilsUtilisation, setConseilsUtilisation] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [nouvelleImageInput, setNouvelleImageInput] = useState("");

  useEffect(() => {
    if (produitAEditer) {
      setNom(produitAEditer.nom);
      setReference(produitAEditer.reference);
      setCategorieId(produitAEditer.categorieId);
      setMarqueId(produitAEditer.marqueId);
      setDescription(produitAEditer.description);

      setPrix(produitAEditer.prix);
      setPrixPromotionnel(produitAEditer.prixPromotionnel || "");
      setStock(produitAEditer.stock);
      setDisponible(produitAEditer.disponible);

      setComposition(produitAEditer.composition || "");
      setTypeDePeau(produitAEditer.typeDePeau || "Toutes peaux");
      setContenance(produitAEditer.contenance || "250ml");
      setOrigine(produitAEditer.origine || "Cameroun");
      setConseilsUtilisation(produitAEditer.conseilsUtilisation || "");
      setImages(produitAEditer.images || []);
    } else {
      setNom("");
      setReference(`REF-${Math.floor(1000 + Math.random() * 9000)}`);
      setCategorieId(categories[0]?.id || "");
      setMarqueId(marques[0]?.id || "");
      setDescription("");

      setPrix("");
      setPrixPromotionnel("");
      setStock(10);
      setDisponible(true);

      setComposition("");
      setTypeDePeau("Toutes peaux");
      setContenance("250ml");
      setOrigine("Cameroun");
      setConseilsUtilisation("");
      setImages([
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
      ]);
    }
    setEtapeCourante(1);
    setErreurEtape("");
  }, [produitAEditer, ouvert, categories, marques]);

  if (!ouvert) return null;

  const validerEtape = (etape: number): boolean => {
    setErreurEtape("");
    if (etape === 1) {
      if (!nom.trim()) {
        setErreurEtape("Le nom du produit est obligatoire.");
        return false;
      }
      if (!categorieId) {
        setErreurEtape("Veuillez sélectionner une catégorie.");
        return false;
      }
    } else if (etape === 2) {
      if (prix === "" || Number(prix) <= 0) {
        setErreurEtape("Veuillez saisir un prix valide supérieur à 0.");
        return false;
      }
      if (stock === "" || Number(stock) < 0) {
        setErreurEtape("Veuillez saisir une quantité de stock valide.");
        return false;
      }
    }
    return true;
  };

  const etapeSuivante = () => {
    if (validerEtape(etapeCourante)) {
      setEtapeCourante((prev) => Math.min(prev + 1, 4) as 1 | 2 | 3 | 4);
    }
  };

  const etapePrecedente = () => {
    setErreurEtape("");
    setEtapeCourante((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3 | 4);
  };

  const soumettreFormulaire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validerEtape(1) || !validerEtape(2)) return;

    const cat = categories.find((c) => c.id === categorieId);
    const mar = marques.find((m) => m.id === marqueId);

    const produitFormate: Produit = {
      id: produitAEditer ? produitAEditer.id : `prod-${Date.now()}`,
      nom: nom.trim(),
      reference: reference || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      categorieId,
      nomCategorie: cat ? cat.nom : "Général",
      marqueId,
      nomMarque: mar ? mar.nom : "ITexal",
      description: description.trim(),
      prix: Number(prix),
      prixPromotionnel: prixPromotionnel ? Number(prixPromotionnel) : undefined,
      stock: Number(stock),
      disponible,
      composition,
      typeDePeau,
      contenance,
      origine,
      conseilsUtilisation,
      images,
      creeLe: produitAEditer ? produitAEditer.creeLe : new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(produitFormate);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <PackageIcon size={22} className="text-[#4880FF]" />
              <span>{produitAEditer ? "Édition du Produit" : "Nouveau Produit Cosmétique"}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Remplissez les étapes de validation pour publier le produit dans le catalogue.
            </p>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la modal"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs transition-colors border border-slate-200 shadow-xs"
          >
            <Cancel01Icon size={18} />
          </button>
        </div>

        {/* Steps Bar */}
        <div className="px-8 py-4 bg-white border-b border-slate-100 grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "Informations" },
            { num: 2, label: "Prix & Stock" },
            { num: 3, label: "Médias & Bio" },
            { num: 4, label: "Confirmation" },
          ].map((step) => (
            <button
              key={step.num}
              type="button"
              onClick={() => {
                if (step.num < etapeCourante || validerEtape(etapeCourante)) {
                  setEtapeCourante(step.num as any);
                }
              }}
              className={`flex items-center gap-2 py-2 px-3 rounded-xl transition-all text-xs font-bold text-left ${
                etapeCourante === step.num
                  ? "bg-blue-50 text-[#4880FF] border border-blue-200"
                  : etapeCourante > step.num
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  etapeCourante === step.num
                    ? "bg-[#4880FF] text-white"
                    : etapeCourante > step.num
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {etapeCourante > step.num ? "✓" : step.num}
              </span>
              <span className="hidden sm:inline line-clamp-1">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={soumettreFormulaire}>
          <div className="p-8 space-y-6">
            {erreurEtape && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs rounded-2xl flex items-center gap-2 animate-shake">
                <AlertCircleIcon size={18} />
                <span>{erreurEtape}</span>
              </div>
            )}

            {/* ÉTAPE 1 : Informations de base */}
            {etapeCourante === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nom du produit *
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="ex: Sérum Visage Éclat Bio"
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Référence SKU
                    </label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="REF-1001"
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Catégorie *
                    </label>
                    <select
                      value={categorieId}
                      onChange={(e) => setCategorieId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF] cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Marque
                    </label>
                    <select
                      value={marqueId}
                      onChange={(e) => setMarqueId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF] cursor-pointer"
                    >
                      {marques.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Description détaillée du produit
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Présentez les vertus et bienfaits du produit..."
                    className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4880FF]"
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : Tarification & stock */}
            {etapeCourante === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Prix normal (FCFA) *
                    </label>
                    <input
                      type="number"
                      value={prix}
                      onChange={(e) => setPrix(e.target.value ? Number(e.target.value) : "")}
                      placeholder="15000"
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none focus:border-[#4880FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Prix promotionnel (FCFA)
                    </label>
                    <input
                      type="number"
                      value={prixPromotionnel}
                      onChange={(e) =>
                        setPrixPromotionnel(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder="12000 (optionnel)"
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-black text-rose-600 focus:outline-none focus:border-[#4880FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Stock disponible *
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value ? Number(e.target.value) : 0)}
                      placeholder="10"
                      className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#4880FF]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">Statut de disponibilité</h4>
                    <p className="text-[11px] text-slate-500">
                      Rendre le produit immédiatement visible aux clients sur la boutique.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={disponible}
                    onChange={(e) => setDisponible(e.target.checked)}
                    className="w-5 h-5 rounded text-[#4880FF] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : Médias & spécifications */}
            {etapeCourante === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    URL de l'image du produit
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={nouvelleImageInput}
                      onChange={(e) => setNouvelleImageInput(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (nouvelleImageInput.trim()) {
                          setImages([...images, nouvelleImageInput.trim()]);
                          setNouvelleImageInput("");
                        }
                      }}
                      className="px-4 py-2.5 bg-[#4880FF] text-white font-bold text-xs rounded-xl"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {images.map((imgUrl, i) => (
                    <div key={i} className="relative h-24 rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={imgUrl} alt="Aperçu" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Type de peau
                    </label>
                    <select
                      value={typeDePeau}
                      onChange={(e) => setTypeDePeau(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="Toutes peaux">Toutes peaux</option>
                      <option value="Peaux sèches">Peaux sèches</option>
                      <option value="Peaux grasses">Peaux grasses</option>
                      <option value="Peaux sensibles">Peaux sensibles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contenance (Volume / Poids)
                    </label>
                    <input
                      type="text"
                      value={contenance}
                      onChange={(e) => setContenance(e.target.value)}
                      placeholder="50ml / 200g"
                      className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 : Confirmation / résumé */}
            {etapeCourante === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                    <CheckmarkCircle02Icon size={18} />
                    <span>Récapitulatif avant enregistrement</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold">Produit :</span>
                      <p className="font-extrabold text-slate-800 text-sm mt-0.5">{nom}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold">SKU :</span>
                      <p className="font-bold text-slate-700 mt-0.5">{reference}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold">Prix de vente :</span>
                      <p className="font-black text-[#4880FF] text-base mt-0.5">
                        {formatPrix(Number(prix))} FCFA
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold">Stock :</span>
                      <p className="font-bold text-slate-800 mt-0.5">{stock} unités</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              type="button"
              onClick={etapePrecedente}
              disabled={etapeCourante === 1}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                etapeCourante === 1
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ArrowLeft01Icon size={14} />
              <span>Précédent</span>
            </button>

            {etapeCourante < 4 ? (
              <button
                type="button"
                onClick={etapeSuivante}
                className="px-6 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Suivant</span>
                <ArrowRight01Icon size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <CheckmarkCircle02Icon size={16} />
                <span>{produitAEditer ? "Mettre à jour" : "Enregistrer le Produit"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
