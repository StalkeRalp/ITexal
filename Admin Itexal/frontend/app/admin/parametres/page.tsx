"use client";

import React, { useState, useEffect } from "react";
import {
  UserIcon,
  Settings02Icon,
  Notification01Icon,
  Edit02Icon,
  Store01Icon,
  TruckIcon,
  CreditCardIcon,
  LockIcon,
  SparklesIcon,
  CheckmarkCircle02Icon,
  Camera01Icon,
} from "hugeicons-react";
import { ChampMotDePasse } from "@/composants-communs/champ-mot-de-passe";
import { useToast } from "@/lib/context/ToastContext";
import { useProfil } from "@/lib/context/ProfilContext";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function PageParametresAdmin() {
  const { t } = useLanguage();
  const toast = useToast();
  const { profil, mettreAJourProfil } = useProfil();
  const [ongletActif, setOngletActif] = useState<"profil" | "general" | "securite" | "notifications">("profil");

  // State Profil Administrateur — initialisé depuis le contexte global
  const [firstName, setFirstName] = useState(profil.prenom);
  const [lastName, setLastName] = useState(profil.nom);
  const [emailAddress, setEmailAddress] = useState(profil.email);
  const [dateOfBirth, setDateOfBirth] = useState(profil.dateNaissance);
  const [ville, setVille] = useState(profil.ville);
  const [role, setRole] = useState(profil.role);
  const [sexe, setSexe] = useState(profil.sexe);
  const [pays, setPays] = useState(profil.pays);
  const [photoProfil, setPhotoProfil] = useState(profil.photoProfil);

  // Synchronisation avec les données du contexte
  useEffect(() => {
    setFirstName(profil.prenom);
    setLastName(profil.nom);
    setEmailAddress(profil.email);
    setDateOfBirth(profil.dateNaissance);
    setVille(profil.ville);
    setRole(profil.role);
    setSexe(profil.sexe);
    setPays(profil.pays);
    setPhotoProfil(profil.photoProfil);
  }, [profil]);

  // State Configuration Générale
  const [nomBoutique, setNomBoutique] = useState("ITexal Cosméceutiques & Bio");
  const [slogan, setSlogan] = useState("Révélez l'Éclat Naturel de Votre Peau");
  const [emailSupport, setEmailSupport] = useState("contact@itexal.com");
  const [telephoneClient, setTelephoneClient] = useState("+237 699 00 11 22");
  const [devise, setDevise] = useState("FCFA");
  const [fraisLivraisonDouala, setFraisLivraisonDouala] = useState<number>(1500);
  const [fraisLivraisonYaounde, setFraisLivraisonYaounde] = useState<number>(2500);
  const [modeMaintenance, setModeMaintenance] = useState(false);

  // Modes de Paiement
  const [paiementOrangeMoney, setPaiementOrangeMoney] = useState(true);
  const [paiementMtnMomo, setPaiementMtnMomo] = useState(true);
  const [paiementCarte, setPaiementCarte] = useState(true);
  const [paiementLivraison, setPaiementLivraison] = useState(true);

  // State Sécurité
  const [ancienMdp, setAncienMdp] = useState("");
  const [nouveauMdp, setNouveauMdp] = useState("");
  const [confirmerMdp, setConfirmerMdp] = useState("");

  const [messageSucces, setMessageSucces] = useState("");

  const sauvegarderProfil = (e: React.FormEvent) => {
    e.preventDefault();
    mettreAJourProfil({
      prenom: firstName,
      nom: lastName,
      email: emailAddress,
      dateNaissance: dateOfBirth,
      ville,
      role,
      sexe,
      pays,
      photoProfil,
    });
    toast.succes(t("parametres.profileUpdatedSuccess"));
    setMessageSucces(t("parametres.profileUpdatedSuccess"));
    setTimeout(() => setMessageSucces(""), 4000);
  };

  const sauvegarderParametresGeneraux = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSucces(t("common.itemUpdated"));
    setTimeout(() => setMessageSucces(""), 4000);
  };

  const sauvegarderSecurite = (e: React.FormEvent) => {
    e.preventDefault();
    if (nouveauMdp && nouveauMdp !== confirmerMdp) {
      toast.erreur(t("parametres.passwordMismatch"));
      return;
    }
    toast.succes(t("parametres.securityUpdatedSuccess"));
    setMessageSucces(t("parametres.securityUpdatedSuccess"));
    setAncienMdp("");
    setNouveauMdp("");
    setConfirmerMdp("");
    setTimeout(() => setMessageSucces(""), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("parametres.title")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("parametres.subtitle")}
          </p>
        </div>
      </div>

      {messageSucces && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-2xl animate-fadeIn flex items-center gap-2">
          <CheckmarkCircle02Icon size={18} />
          <span>{messageSucces}</span>
        </div>
      )}

      {/* Modern Tabs Navigation Bar */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setOngletActif("profil")}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            ongletActif === "profil"
              ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20 font-extrabold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <UserIcon size={16} />
          <span>{t("parametres.tabProfil")}</span>
        </button>

        <button
          type="button"
          onClick={() => setOngletActif("general")}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            ongletActif === "general"
              ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20 font-extrabold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Settings02Icon size={16} />
          <span>{t("parametres.tabGeneral")}</span>
        </button>

        <button
          type="button"
          onClick={() => setOngletActif("securite")}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            ongletActif === "securite"
              ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20 font-extrabold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <LockIcon size={16} />
          <span>{t("parametres.tabSecurite")}</span>
        </button>

        <button
          type="button"
          onClick={() => setOngletActif("notifications")}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            ongletActif === "notifications"
              ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20 font-extrabold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Notification01Icon size={16} />
          <span>{t("parametres.tabNotifications")}</span>
        </button>
      </div>

      {/* TAB 1: PROFILE */}
      {ongletActif === "profil" && (
        <form
          onSubmit={sauvegarderProfil}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100/90 space-y-10"
        >
          {/* Centered Top Title */}
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-800 tracking-wider uppercase">
              {t("parametres.profileTitle")}
            </h2>
          </div>

          {/* Profile Photo Section */}
          <div className="flex items-center gap-6 pt-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-100 shadow-md bg-slate-100">
                <img
                  src={photoProfil}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="upload-photo"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#4880FF] hover:bg-blue-600 text-white flex items-center justify-center text-xs shadow-md cursor-pointer transition-transform hover:scale-110"
                title={t("parametres.changePhoto")}
                aria-label={t("parametres.changePhoto")}
              >
                <Edit02Icon size={14} />
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setPhotoProfil(url);
                    }
                  }}
                />
              </label>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-lg">{t("parametres.profilePhoto")}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {t("parametres.profilePhotoSub")}
              </p>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.firstName")}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.lastName")}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.email")}
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.birthdate")}
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.city")}
              </label>
              <input
                type="text"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.role")}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Administrateur">Super Administrateur</option>
                <option value="Gestionnaire de Stock">Gestionnaire de Stock</option>
                <option value="Support Client">Support Client</option>
                <option value="Éditeur de Contenu">Éditeur de Contenu</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.gender")}
              </label>
              <select
                value={sexe}
                onChange={(e) => setSexe(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Homme">{t("clients.male")}</option>
                <option value="Femme">{t("clients.female")}</option>
                <option value="Non spécifié">N/A</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold text-xs mb-2">
                {t("parametres.country")}
              </label>
              <input
                type="text"
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FD] border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-10 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/20 tracking-widest uppercase transition-all cursor-pointer"
            >
              {t("parametres.saveProfile")}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: CONFIGURATION GENERALE DU SITE */}
      {ongletActif === "general" && (
        <form onSubmit={sauvegarderParametresGeneraux} className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Store01Icon size={18} className="text-[#4880FF]" />
                  <span>{t("parametres.generalIdentity")}</span>
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t("parametres.generalIdentitySub")}
                </p>
              </div>

              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t("parametres.siteOnline")}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.shopName")}
                </label>
                <input
                  type="text"
                  required
                  value={nomBoutique}
                  onChange={(e) => setNomBoutique(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#4880FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.officialSlogan")}
                </label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.supportEmail")}
                </label>
                <input
                  type="email"
                  required
                  value={emailSupport}
                  onChange={(e) => setEmailSupport(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.hotlinePhone")}
                </label>
                <input
                  type="text"
                  required
                  value={telephoneClient}
                  onChange={(e) => setTelephoneClient(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <TruckIcon size={18} className="text-[#4880FF]" />
              <span>{t("parametres.pricingHeading")}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.mainCurrency")}
                </label>
                <input
                  type="text"
                  disabled
                  value={devise}
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-black text-[#4880FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.shippingDouala")}
                </label>
                <input
                  type="number"
                  value={fraisLivraisonDouala}
                  onChange={(e) => setFraisLivraisonDouala(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-[#4880FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t("parametres.shippingYaounde")}
                </label>
                <input
                  type="number"
                  value={fraisLivraisonYaounde}
                  onChange={(e) => setFraisLivraisonYaounde(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-[#4880FF]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <CreditCardIcon size={18} className="text-[#4880FF]" />
              <span>{t("parametres.paymentGateways")}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
              <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCardIcon size={20} className="text-amber-500" />
                  <span>Orange Money Cameroun</span>
                </div>
                <input
                  type="checkbox"
                  checked={paiementOrangeMoney}
                  onChange={(e) => setPaiementOrangeMoney(e.target.checked)}
                  className="w-5 h-5 rounded text-[#4880FF] cursor-pointer"
                />
              </label>

              <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCardIcon size={20} className="text-yellow-500" />
                  <span>MTN Mobile Money</span>
                </div>
                <input
                  type="checkbox"
                  checked={paiementMtnMomo}
                  onChange={(e) => setPaiementMtnMomo(e.target.checked)}
                  className="w-5 h-5 rounded text-[#4880FF] cursor-pointer"
                />
              </label>

              <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCardIcon size={20} className="text-[#4880FF]" />
                  <span>Carte Visa / Mastercard</span>
                </div>
                <input
                  type="checkbox"
                  checked={paiementCarte}
                  onChange={(e) => setPaiementCarte(e.target.checked)}
                  className="w-5 h-5 rounded text-[#4880FF] cursor-pointer"
                />
              </label>

              <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCardIcon size={20} className="text-emerald-500" />
                  <span>Paiement Cash à la Livraison</span>
                </div>
                <input
                  type="checkbox"
                  checked={paiementLivraison}
                  onChange={(e) => setPaiementLivraison(e.target.checked)}
                  className="w-5 h-5 rounded text-[#4880FF] cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              {t("parametres.saveConfig")}
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SECURITE & MOT DE PASSE */}
      {ongletActif === "securite" && (
        <form onSubmit={sauvegarderSecurite} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
          <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <LockIcon size={18} className="text-[#4880FF]" />
            <span>{t("parametres.changePasswordHeading")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div>
              <ChampMotDePasse
                label={t("parametres.oldPassword")}
                valeur={ancienMdp}
                onChange={(e) => setAncienMdp(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div>
              <ChampMotDePasse
                label={t("parametres.newPassword")}
                valeur={nouveauMdp}
                onChange={(e) => setNouveauMdp(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div>
              <ChampMotDePasse
                label={t("parametres.confirmPassword")}
                valeur={confirmerMdp}
                onChange={(e) => setConfirmerMdp(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              {t("parametres.updateSecurity")}
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {ongletActif === "notifications" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
          <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Notification01Icon size={18} className="text-[#4880FF]" />
            <span>{t("parametres.systemNotificationsHeading")}</span>
          </h2>

          <div className="space-y-4 text-xs text-slate-700 font-bold">
            <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-extrabold text-slate-800">{t("parametres.newOrderAlerts")}</p>
                <p className="text-slate-400 font-normal text-[11px]">{t("parametres.newOrderAlertsSub")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#4880FF]" />
            </label>

            <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-extrabold text-slate-800">{t("parametres.lowStockAlerts")}</p>
                <p className="text-slate-400 font-normal text-[11px]">{t("parametres.lowStockAlertsSub")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#4880FF]" />
            </label>

            <label className="p-4 bg-[#F8F9FD] rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-extrabold text-slate-800">{t("parametres.securityLogAlerts")}</p>
                <p className="text-slate-400 font-normal text-[11px]">{t("parametres.securityLogAlertsSub")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#4880FF]" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
