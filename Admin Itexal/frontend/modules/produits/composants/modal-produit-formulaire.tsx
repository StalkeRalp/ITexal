"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Produit } from "@/types/produit";
import { formaterPrix } from "@/lib/utilitaires/formatage";
import {
  PackageIcon,
  Cancel01Icon,
  Upload01Icon,
  AlertCircleIcon,
  Delete02Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Image01Icon,
  Tag01Icon,
  Add01Icon,
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
  const [monte, setMonte] = useState(false);
  const [etapeCourante, setEtapeCourante] = useState<1 | 2 | 3 | 4>(1);
  const [erreurEtape, setErreurEtape] = useState("");

  useEffect(() => {
    setMonte(true);
  }, []);

  // Étape 1 : Informations Générales
  const [nom, setNom] = useState("");
  const [reference, setReference] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [marqueId, setMarqueId] = useState("");
  const [description, setDescription] = useState("");

  // Étape 2 : Spécifications
  const [composition, setComposition] = useState("");
  const [typeDePeau, setTypeDePeau] = useState("Toutes peaux");
  const [contenance, setContenance] = useState("250ml");
  const [origine, setOrigine] = useState("Cameroun");
  const [conseilsUtilisation, setConseilsUtilisation] = useState("");

  // Étape 3 : Prix, Stock & Multi-images (Max 4)
  const [prix, setPrix] = useState<number | "">("");
  const [prixPromotionnel, setPrixPromotionnel] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">(10);
  const [disponible, setDisponible] = useState(true);
  const [imagesApercus, setImagesApercus] = useState<string[]>([]);
  const [erreurUpload, setErreurUpload] = useState<string>("");

  useEffect(() => {
    if (!ouvert) return;

    if (produitAEditer) {
      setNom(produitAEditer.nom);
      setReference(produitAEditer.reference || `SKU-${Math.floor(1000 + Math.random() * 9000)}`);
      setCategorieId(produitAEditer.categorieId || categories[0]?.id || "");
      setMarqueId(produitAEditer.marqueId || marques[0]?.id || "");
      setDescription(produitAEditer.description || "");

      setComposition(produitAEditer.composition || "");
      setTypeDePeau(produitAEditer.typeDePeau || "Toutes peaux");
      setContenance(produitAEditer.contenance || "250ml");
      setOrigine(produitAEditer.origine || "Cameroun");
      setConseilsUtilisation(produitAEditer.conseilsUtilisation || "");

      setPrix(produitAEditer.prix);
      setPrixPromotionnel(produitAEditer.prixPromotionnel || "");
      setStock(produitAEditer.stock);
      setDisponible(produitAEditer.disponible !== false);

      const imgs = produitAEditer.images && produitAEditer.images.length > 0
        ? produitAEditer.images
        : produitAEditer.image
        ? [produitAEditer.image]
        : [];
      setImagesApercus(imgs.slice(0, 4));
    } else {
      setNom("");
      setReference(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
      setCategorieId(categories[0]?.id || "");
      setMarqueId(marques[0]?.id || "");
      setDescription("");

      setComposition("");
      setTypeDePeau("Toutes peaux");
      setContenance("250ml");
      setOrigine("Cameroun");
      setConseilsUtilisation("");

      setPrix("");
      setPrixPromotionnel("");
      setStock(10);
      setDisponible(true);
      setImagesApercus([]);
    }
    setEtapeCourante(1);
    setErreurEtape("");
    setErreurUpload("");
  }, [produitAEditer, ouvert]);

  if (!ouvert || !monte) return null;

  // Gestion de l'upload multi-images (PNG, JPG, JPEG, WEBP, max 5 Mo, max 4 photos)
  const ajouterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErreurUpload("");
    const fichiers = e.target.files;
    if (!fichiers || fichiers.length === 0) return;

    if (imagesApercus.length >= 4) {
      setErreurUpload("Vous ne pouvez pas ajouter plus de 4 images par produit.");
      return;
    }

    const fichier = fichiers[0];
    const formatsAutorises = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!formatsAutorises.includes(fichier.type)) {
      setErreurUpload("Format non supporté. Veuillez choisir une image JPG, PNG ou WEBP.");
      return;
    }

    if (fichier.size > 5 * 1024 * 1024) {
      setErreurUpload("Taille du fichier trop volumineuse (maximum 5 Mo).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagesApercus((prev) => [...prev, reader.result as string].slice(0, 4));
      }
    };
    reader.readAsDataURL(fichier);
  };

  const remplacerImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setErreurUpload("");
    const fichier = e.target.files?.[0];
    if (!fichier) return;

    const formatsAutorises = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!formatsAutorises.includes(fichier.type)) {
      setErreurUpload("Format non supporté. Veuillez choisir une image JPG, PNG ou WEBP.");
      return;
    }

    if (fichier.size > 5 * 1024 * 1024) {
      setErreurUpload("Taille du fichier trop volumineuse (maximum 5 Mo).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagesApercus((prev) => {
          const cop = [...prev];
          cop[index] = reader.result as string;
          return cop;
        });
      }
    };
    reader.readAsDataURL(fichier);
  };

  const supprimerImage = (index: number) => {
    setImagesApercus((prev) => prev.filter((_, i) => i !== index));
  };

  const validerEtape = (etape: number): boolean => {
    setErreurEtape("");
    if (etape === 1) {
      if (!nom.trim()) {
        setErreurEtape("Le nom du produit est obligatoire.");
        return false;
      }
      const catEffective = categorieId || categories[0]?.id;
      if (!catEffective) {
        setErreurEtape("Veuillez sélectionner une catégorie.");
        return false;
      }
    } else if (etape === 2) {
      // Spécifications optionnelles
    } else if (etape === 3) {
      if (prix === "" || Number(prix) <= 0) {
        setErreurEtape("Veuillez saisir un prix valide supérieur à 0 FCFA.");
        return false;
      }
      if (stock === "" || Number(stock) < 0) {
        setErreurEtape("Veuillez saisir une quantité de stock valide.");
        return false;
      }
      if (imagesApercus.length === 0) {
        setErreurEtape("Veuillez ajouter au moins 1 image pour le produit (maximum 4 images).");
        return false;
      }
      if (imagesApercus.length > 4) {
        setErreurEtape("Vous ne pouvez pas ajouter plus de 4 images.");
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
    if (etapeCourante < 4) {
      etapeSuivante();
      return;
    }

    if (!validerEtape(1) || !validerEtape(3)) return;

    const catIdEffective = categorieId || categories[0]?.id || "cat-1";
    const marIdEffective = marqueId || marques[0]?.id || "marq-1";
    const cat = categories.find((c) => c.id === catIdEffective);
    const mar = marques.find((m) => m.id === marIdEffective);

    const produitFormate: Produit = {
      id: produitAEditer ? produitAEditer.id : `prod-${Date.now()}`,
      nom: nom.trim(),
      reference: reference || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      categorieId: catIdEffective,
      nomCategorie: cat ? cat.nom : "Soin Visage",
      marqueId: marIdEffective,
      nomMarque: mar ? mar.nom : "Cosmetic",
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
      images: imagesApercus,
      creeLe: produitAEditer ? produitAEditer.creeLe : new Date().toISOString(),
    };

    onEnregistrer(produitFormate);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-8">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <PackageIcon size={24} className="text-[#5B63F6]" />
              <span>{produitAEditer ? "Édition du Produit" : "Création d'un Nouveau Produit"}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Remplissez les 4 étapes pour publier le produit dans la boutique Cosmetic Admin.
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

        {/* Barres d'Étapes 1 → 2 → 3 → 4 */}
        <div className="px-8 py-4 bg-white border-b border-slate-100 grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "Informations" },
            { num: 2, label: "Spécifications" },
            { num: 3, label: "Prix & Stock" },
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
              className={`flex items-center gap-2 py-2.5 px-3 rounded-2xl transition-all text-xs font-bold text-left ${
                etapeCourante === step.num
                  ? "bg-indigo-50 text-[#5B63F6] border border-indigo-200"
                  : etapeCourante > step.num
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  etapeCourante === step.num
                    ? "bg-[#5B63F6] text-white"
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

            {/* ÉTAPE 1 : Informations Générales */}
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
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6] focus:bg-white"
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
                      placeholder="SKU-1001"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Catégorie *
                    </label>
                    <select
                      value={categorieId}
                      onChange={(e) => setCategorieId(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6] cursor-pointer"
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
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6] cursor-pointer"
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
                    placeholder="Présentez les vertus, propriétés et bienfaits du soin cosmétique..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : Spécifications Cosmétiques */}
            {etapeCourante === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Type de peau
                    </label>
                    <select
                      value={typeDePeau}
                      onChange={(e) => setTypeDePeau(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
                    >
                      <option value="Toutes peaux">Toutes peaux</option>
                      <option value="Peaux sèches">Peaux sèches</option>
                      <option value="Peaux grasses">Peaux grasses</option>
                      <option value="Peaux sensibles">Peaux sensibles</option>
                      <option value="Peaux mixtes">Peaux mixtes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Contenance (Volume / Poids)
                    </label>
                    <input
                      type="text"
                      value={contenance}
                      onChange={(e) => setContenance(e.target.value)}
                      placeholder="50ml / 250g"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Origine / Pays de fabrication
                    </label>
                    <input
                      type="text"
                      value={origine}
                      onChange={(e) => setOrigine(e.target.value)}
                      placeholder="Cameroun / France"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Composition majeure
                    </label>
                    <input
                      type="text"
                      value={composition}
                      onChange={(e) => setComposition(e.target.value)}
                      placeholder="Beurre de Karité, Huile d'Argan, Vitamine E"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Conseils d'utilisation
                  </label>
                  <textarea
                    rows={3}
                    value={conseilsUtilisation}
                    onChange={(e) => setConseilsUtilisation(e.target.value)}
                    placeholder="Appliquer matin et soir sur une peau préalablement nettoyée..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6]"
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : Prix, Stock & Upload Multi-Images (Design standardisé et taille identique aux Étapes 1 & 2) */}
            {etapeCourante === 3 && (
              <div className="space-y-4 animate-fadeIn">
                {/* Grille des Prix et du Stock (Même hauteur, taille et padding que les étapes 1 et 2) */}
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
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 focus:outline-none focus:border-[#5B63F6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Prix promo (FCFA)
                    </label>
                    <input
                      type="number"
                      value={prixPromotionnel}
                      onChange={(e) =>
                        setPrixPromotionnel(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder="12000 (Optionnel)"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-rose-600 focus:outline-none focus:border-[#5B63F6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Stock initial *
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value ? Number(e.target.value) : 0)}
                      placeholder="10"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5B63F6] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-bold text-slate-700">Visibilité immédiate en boutique :</span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={disponible}
                      onChange={(e) => setDisponible(e.target.checked)}
                      className="w-4 h-4 rounded text-[#5B63F6] focus:ring-0 cursor-pointer"
                    />
                    <span>{disponible ? "Disponible" : "Masqué"}</span>
                  </label>
                </div>

                {/* Galerie Upload Multi-Images (Maximum 4 Photos, Sans URL texte) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Images du produit (Max 4 photos) *
                    </label>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {imagesApercus.length}/4 photo(s) ajoutée(s) • JPG, PNG, WEBP (Max 5 Mo)
                    </span>
                  </div>

                  {erreurUpload && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2">
                      <AlertCircleIcon size={16} />
                      <span>{erreurUpload}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Photos déjà ajoutées */}
                    {imagesApercus.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square shadow-xs flex flex-col"
                      >
                        <img
                          src={imgUrl}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-slate-900/70 text-white text-[9px] font-bold backdrop-blur-xs">
                          {index === 0 ? "Principale" : `Photo ${index + 1}`}
                        </div>

                        {/* Overlays d'action */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <label
                            title="Remplacer cette photo"
                            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-105"
                          >
                            <Upload01Icon size={14} />
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              onChange={(e) => remplacerImage(index, e)}
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            title="Supprimer cette photo"
                            onClick={() => supprimerImage(index)}
                            className="w-8 h-8 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-105"
                          >
                            <Delete02Icon size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Emplacement pour ajouter une nouvelle photo */}
                    {imagesApercus.length < 4 && (
                      <label className="border-2 border-dashed border-slate-300 hover:border-[#5B63F6] rounded-2xl aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50 hover:bg-indigo-50/30 group p-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                          <Add01Icon size={20} />
                        </div>
                        <span className="font-extrabold text-[11px] text-slate-700">Ajouter photo</span>
                        <span className="text-[9px] text-slate-400">({4 - imagesApercus.length} restante)</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          onChange={ajouterImage}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 : Confirmation & Résumé Complet du Produit avant Création */}
            {etapeCourante === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 bg-indigo-50/60 border border-indigo-100 rounded-3xl space-y-6">
                  <div className="flex items-center gap-2 text-[#5B63F6] font-black text-sm border-b border-indigo-100 pb-3">
                    <CheckmarkCircle02Icon size={20} />
                    <span>Résumé complet du produit avant publication</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Galerie d'aperçu des photos enregistrées (Max 4) */}
                    <div className="space-y-2 shrink-0">
                      <div className="w-36 h-36 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
                        {imagesApercus[0] ? (
                          <img
                            src={imagesApercus[0]}
                            alt={nom}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-3 text-slate-400 space-y-1">
                            <Image01Icon size={28} className="mx-auto text-slate-300" />
                            <p className="text-[10px] font-bold">Sans image</p>
                          </div>
                        )}
                      </div>
                      {imagesApercus.length > 1 && (
                        <div className="flex items-center gap-1.5">
                          {imagesApercus.slice(1).map((img, idx) => (
                            <div
                              key={idx}
                              className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden"
                            >
                              <img src={img} alt="Miniature" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 flex-1 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Nom du produit
                          </span>
                          <p className="font-black text-slate-900 text-base mt-0.5">{nom}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Référence SKU
                          </span>
                          <p className="font-bold text-slate-800 mt-0.5">{reference}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Catégorie
                          </span>
                          <p className="font-bold text-slate-800 mt-0.5">
                            {categories.find((c) => c.id === categorieId)?.nom || "Cosmétique"}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Marque
                          </span>
                          <p className="font-bold text-slate-800 mt-0.5">
                            {marques.find((m) => m.id === marqueId)?.nom || "Cosmetic"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-indigo-100 grid grid-cols-3 gap-4">
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Prix Vente
                          </span>
                          <p className="font-black text-[#5B63F6] text-sm mt-0.5">
                            {formaterPrix(Number(prix))}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Prix Promo
                          </span>
                          <p className="font-black text-rose-600 text-sm mt-0.5">
                            {prixPromotionnel ? formaterPrix(Number(prixPromotionnel)) : "Aucun"}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            Stock Initial
                          </span>
                          <p className="font-bold text-slate-900 text-sm mt-0.5">{stock} unités</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {description && (
                    <div className="pt-3 border-t border-indigo-100 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        Description
                      </span>
                      <p className="text-slate-600 mt-1 leading-relaxed font-medium">{description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar avec Boutons de Navigation & Confirmation Finale */}
          <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
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
                className="px-7 py-3 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Suivant</span>
                <ArrowRight01Icon size={16} />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <CheckmarkCircle02Icon size={18} />
                <span>{produitAEditer ? "Mettre à jour le Produit" : "Créer le produit"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
