"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardSquare01Icon,
  Chart01Icon,
  PackageIcon,
  FavouriteIcon,
  Folder01Icon,
  Tag01Icon,
  ShoppingCart01Icon,
  UserGroupIcon,
  Notification01Icon,
  Store01Icon,
  Discount01Icon,
  File01Icon,
  User02Icon,
  ClipboardIcon,
  Settings02Icon,
  Logout01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

import { useNotifications } from "@/lib/context/NotificationContext";
import { useProfil } from "@/lib/context/ProfilContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useCommandes } from "@/lib/context/CommandesContext";
import { ModalConfirmationDeconnexion } from "@/composants-communs/modal-confirmation-deconnexion";

export type Langue = "fr" | "en" | "ar";

const MENU_PRINCIPAL = [
  { nom: { fr: "Dashboard", en: "Dashboard", ar: "لوحة التحكم" }, chemin: "/admin", Icone: DashboardSquare01Icon },
  { nom: { fr: "Statistiques", en: "Stats", ar: "الإحصائيات" }, chemin: "/admin/statistiques", Icone: Chart01Icon },
  { nom: { fr: "Produits", en: "Products", ar: "المنتجات" }, chemin: "/admin/produits", Icone: PackageIcon },
  { nom: { fr: "Commandes", en: "Orders", ar: "الطلبات" }, chemin: "/admin/commandes", Icone: ShoppingCart01Icon, aBadge: true },
  { nom: { fr: "Clients", en: "Customers", ar: "العملاء" }, chemin: "/admin/clients", Icone: UserGroupIcon },
  { nom: { fr: "Notifications", en: "Notifications", ar: "الإشعارات" }, chemin: "/admin/notifications", Icone: Notification01Icon, estNotification: true },
  { nom: { fr: "Stocks", en: "Stocks", ar: "المخزون" }, chemin: "/admin/stocks", Icone: Store01Icon },
];

const MENU_PAGES = [
  { nom: { fr: "Favoris", en: "Favorites", ar: "المفضلة" }, chemin: "/admin/favoris", Icone: FavouriteIcon },
  { nom: { fr: "Catégories", en: "Categories", ar: "الفئات" }, chemin: "/admin/categories", Icone: Folder01Icon },
  { nom: { fr: "Marques", en: "Brands", ar: "العلامات" }, chemin: "/admin/marques", Icone: Tag01Icon },
  { nom: { fr: "Promotions", en: "Promotions", ar: "العروض" }, chemin: "/admin/promotions", Icone: Discount01Icon },
  { nom: { fr: "Contenus", en: "Contents", ar: "المحتوى" }, chemin: "/admin/contenus", Icone: File01Icon },
  { nom: { fr: "Utilisateurs", en: "Users", ar: "المستخدمون" }, chemin: "/admin/utilisateurs", Icone: User02Icon },
  { nom: { fr: "Journal d'activité", en: "Activity Log", ar: "سجل النشاط" }, chemin: "/admin/journal", Icone: ClipboardIcon },
];

export function getLangue(): Langue {
  if (typeof window === "undefined") return "fr";
  return (localStorage.getItem("itexal_lang") as Langue) ?? "fr";
}

export function setLangue(l: Langue) {
  if (typeof window === "undefined") return;
  localStorage.setItem("itexal_lang", l);
  window.dispatchEvent(new Event("itexal_lang_change"));
}

export const BarreLaterale: React.FC = () => {
  const pathname = usePathname();
  const { nombreNonLues } = useNotifications();
  const { profil, nomComplet, initiales } = useProfil();
  const { seDeconnecter } = useAuth();
  const { commandes } = useCommandes();
  const [langue, setLangueState] = useState<Langue>("fr");
  const [modalDeconnexionOuvert, setModalDeconnexionOuvert] = useState(false);

  // Décompte réel des commandes en cours / traitement
  const commandesEnTraitementCount = useMemo(() => {
    return commandes.filter(
      (c) => c.statut === "en_attente" || c.statut === "validee" || c.statut === "en_preparation"
    ).length;
  }, [commandes]);

  // Rétraction Sidebar State avec persistance localStorage
  const [estRetractee, setEstRetractee] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setLangueState(getLangue());
    const handler = () => setLangueState(getLangue());
    window.addEventListener("itexal_lang_change", handler);

    if (typeof window !== "undefined") {
      const savedCollapsed = localStorage.getItem("itexal_sidebar_retractee") === "true";
      setEstRetractee(savedCollapsed);

      const savedTheme = (localStorage.getItem("itexal_theme") as "light" | "dark") || "light";
      setThemeMode(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    return () => window.removeEventListener("itexal_lang_change", handler);
  }, []);

  const toggleRetraction = () => {
    const nouveauState = !estRetractee;
    setEstRetractee(nouveauState);
    if (typeof window !== "undefined") {
      localStorage.setItem("itexal_sidebar_retractee", String(nouveauState));
    }
  };

  const toggleThemeMode = (mode: "light" | "dark") => {
    setThemeMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("itexal_theme", mode);
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const nom = (item: { nom: Record<Langue, string> }) => item.nom[langue];

  return (
    <aside
      className={`bg-white border-r border-slate-200/80 flex flex-col shrink-0 h-screen sticky top-0 z-40 transition-all duration-300 ease-in-out relative ${
        estRetractee ? "w-20" : "w-68"
      }`}
      style={{ boxShadow: "4px 0 20px 0 rgba(0,0,0,0.03)" }}
    >
      {/* Bouton de Rétraction / Agrandissement Flottant sur le bord droit (Inspiré des images) */}
      <button
        type="button"
        onClick={toggleRetraction}
        aria-label={estRetractee ? "Agrandir le menu" : "Rétracter le menu"}
        title={estRetractee ? "Agrandir le menu" : "Rétracter le menu"}
        className="absolute -right-3.5 top-7 z-50 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-[#5B63F6] hover:scale-110 cursor-pointer transition-all"
      >
        {estRetractee ? (
          <ArrowRight01Icon size={14} strokeWidth={2.5} />
        ) : (
          <ArrowLeft01Icon size={14} strokeWidth={2.5} />
        )}
      </button>

      {/* Mac OS Window Traffic Light Control Dots */}
      <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-xs" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-xs" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-xs" />
      </div>

      {/* Header Brand Card */}
      <div className="px-3 py-2 border-b border-slate-100 shrink-0">
        {!estRetractee ? (
          <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3 flex items-center gap-3 relative shadow-2xs group">
            <Link href="/admin" className="shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/Admin Cosmetic.png"
                alt="Cosmetic Admin"
                className="w-18 h-18 max-h-18 object-contain drop-shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/Admin Cosmetic.png";
                }}
              />
            </Link>

            <div className="flex-1 min-w-0">
              <h2 className="font-black text-base text-slate-900 tracking-tight truncate leading-snug">
                Cosmetic Admin
              </h2>
            </div>
          </div>
        ) : (
          <Link
            href="/admin"
            className="flex items-center justify-center mx-auto my-1 block hover:scale-110 transition-transform"
            title="Cosmetic Admin"
          >
            <img
              src="/Admin Cosmetic.png"
              alt="Cosmetic Admin"
              className="w-14 h-14 object-contain drop-shadow-md"
            />
          </Link>
        )}
      </div>

      {/* Menu Navigation Principal & Pages */}
      <nav className="flex-1 flex flex-col px-3 py-3 overflow-y-auto overflow-x-hidden space-y-4 custom-scrollbar">
        {/* Menu Principal */}
        <div className="space-y-1">
          {!estRetractee && (
            <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.14em] mb-2">
              Navigation
            </p>
          )}

          {MENU_PRINCIPAL.map((item) => {
            const actif = pathname === item.chemin;
            const Icon = item.Icone;
            const notificationCount = item.estNotification ? nombreNonLues : 0;

            if (estRetractee) {
              return (
                <Link
                  key={item.chemin}
                  href={item.chemin}
                  title={nom(item)}
                  className={`group relative flex items-center justify-center w-11 h-11 mx-auto rounded-2xl transition-all duration-200 my-1 ${
                    actif
                      ? "bg-[#5B63F6] text-white shadow-md shadow-indigo-500/25"
                      : "text-slate-600 hover:text-[#5B63F6] hover:bg-indigo-50/70"
                  }`}
                >
                  {/* Active vertical pill indicator on left edge */}
                  {actif && (
                    <span className="absolute -left-3 top-2 bottom-2 w-1.5 rounded-r-full bg-[#5B63F6]" />
                  )}

                  <Icon size={20} strokeWidth={2} />

                  {/* Badge Notif Point ou Badge Commandes */}
                  {notificationCount > 0 ? (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  ) : item.chemin === "/admin/commandes" && commandesEnTraitementCount > 0 ? (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#5B63F6] ring-2 ring-white" />
                  ) : null}
                </Link>
              );
            }

            return (
              <Link
                key={item.chemin}
                href={item.chemin}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
                  actif
                    ? "bg-indigo-50/80 text-[#5B63F6] font-extrabold"
                    : "text-slate-600 hover:text-[#5B63F6] hover:bg-slate-50"
                }`}
              >
                {/* Active vertical pill bar attached to left edge */}
                {actif && (
                  <span className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-[#5B63F6]" />
                )}

                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    actif
                      ? "bg-white text-[#5B63F6] shadow-2xs"
                      : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-[#5B63F6]"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span className="flex-1 leading-none truncate">{nom(item)}</span>

                {/* Right Indicator: Chevron Arrow or Notification Badge */}
                {notificationCount > 0 ? (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black leading-none ${
                      actif ? "bg-[#5B63F6] text-white" : "bg-rose-500 text-white"
                    }`}
                  >
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                ) : item.chemin === "/admin/commandes" && commandesEnTraitementCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-indigo-100 text-[#5B63F6]">
                    {commandesEnTraitementCount}
                  </span>
                ) : (
                  <ArrowRight01Icon
                    size={14}
                    className={`transition-transform duration-200 ${
                      actif ? "text-[#5B63F6] translate-x-0.5" : "text-slate-300 group-hover:text-[#5B63F6]"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Menu Secondaire (Pages & Administration) */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          {!estRetractee && (
            <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.14em] mb-2">
              {langue === "ar" ? "صفحات" : langue === "en" ? "Pages" : "Pages & Outils"}
            </p>
          )}

          {MENU_PAGES.map((item) => {
            const actif = pathname === item.chemin;
            const Icon = item.Icone;

            if (estRetractee) {
              return (
                <Link
                  key={item.chemin}
                  href={item.chemin}
                  title={nom(item)}
                  className={`group relative flex items-center justify-center w-11 h-11 mx-auto rounded-2xl transition-all duration-200 my-1 ${
                    actif
                      ? "bg-[#5B63F6] text-white shadow-md shadow-indigo-500/25"
                      : "text-slate-600 hover:text-[#5B63F6] hover:bg-indigo-50/70"
                  }`}
                >
                  {actif && (
                    <span className="absolute -left-3 top-2 bottom-2 w-1.5 rounded-r-full bg-[#5B63F6]" />
                  )}
                  <Icon size={20} strokeWidth={2} />
                </Link>
              );
            }

            return (
              <Link
                key={item.chemin}
                href={item.chemin}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
                  actif
                    ? "bg-indigo-50/80 text-[#5B63F6] font-extrabold"
                    : "text-slate-600 hover:text-[#5B63F6] hover:bg-slate-50"
                }`}
              >
                {actif && (
                  <span className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-[#5B63F6]" />
                )}

                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    actif
                      ? "bg-white text-[#5B63F6] shadow-2xs"
                      : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-[#5B63F6]"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span className="flex-1 leading-none truncate">{nom(item)}</span>

                <ArrowRight01Icon
                  size={14}
                  className={`transition-transform duration-200 ${
                    actif ? "text-[#5B63F6] translate-x-0.5" : "text-slate-300 group-hover:text-[#5B63F6]"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Footer Section (Inspiré des images: Settings, Theme Switcher & Admin Card) */}
      <div className="p-3 border-t border-slate-100 shrink-0 space-y-2.5 bg-slate-50/40">
        {/* Settings Item */}
        {!estRetractee ? (
          <Link
            href="/admin/parametres"
            className="flex items-center gap-3 px-3 py-2 rounded-2xl text-[13px] font-semibold text-slate-600 hover:text-[#5B63F6] hover:bg-slate-100/80 transition-all"
          >
            <Settings02Icon size={18} className="text-slate-400 group-hover:text-[#5B63F6]" strokeWidth={2} />
            <span>Paramètres System</span>
          </Link>
        ) : (
          <Link
            href="/admin/parametres"
            title="Paramètres"
            className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-[#5B63F6] mx-auto transition-all shadow-2xs"
          >
            <Settings02Icon size={18} strokeWidth={2} />
          </Link>
        )}

        {/* Theme Switch Capsule [ Light | Dark ] (Matching Image 2) */}
        {!estRetractee ? (
          <div className="bg-slate-100 border border-slate-200/80 rounded-2xl p-1 flex items-center gap-1 shadow-inner text-xs font-bold">
            <button
              type="button"
              onClick={() => toggleThemeMode("light")}
              className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                themeMode === "light"
                  ? "bg-white text-[#5B63F6] shadow-xs font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"/>
              </svg>
              <span>Light</span>
            </button>

            <button
              type="button"
              onClick={() => toggleThemeMode("dark")}
              className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                themeMode === "dark"
                  ? "bg-slate-900 text-blue-400 border border-blue-500/30 shadow-xs font-extrabold"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
                <path d="M12.3 2c.43 0 .77.35.73.78-.31 3.42 1.02 6.8 3.55 9.15 2.53 2.35 6 3.4 9.4 2.87.43-.07.8.27.78.71-.35 6.06-5.4 10.49-11.46 10.49C8.73 26 3.5 20.77 3.5 14.2 3.5 8.14 7.93 3.1 14 2.75c.1-.01.2-.02.3-.02z"/>
              </svg>
              <span>Dark</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => toggleThemeMode(themeMode === "light" ? "dark" : "light")}
            title={`Basculer en mode ${themeMode === "light" ? "sombre" : "clair"}`}
            className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-[#5B63F6] mx-auto transition-all cursor-pointer shadow-2xs"
          >
            {themeMode === "light" ? (
              <svg className="w-4 h-4 fill-current text-[#5B63F6]" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                <path d="M12.3 2c.43 0 .77.35.73.78-.31 3.42 1.02 6.8 3.55 9.15 2.53 2.35 6 3.4 9.4 2.87.43-.07.8.27.78.71-.35 6.06-5.4 10.49-11.46 10.49C8.73 26 3.5 20.77 3.5 14.2 3.5 8.14 7.93 3.1 14 2.75c.1-.01.2-.02.3-.02z"/>
              </svg>
            )}
          </button>
        )}

        {/* Profil Admin Capsule Card (Matching Image 1 & 2) */}
        {!estRetractee ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-2 flex items-center gap-2.5 shadow-xs group hover:border-indigo-200 transition-all">
            <Link href="/admin/parametres" className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-100 shadow-xs shrink-0 bg-gradient-to-tr from-indigo-500 to-[#5B63F6] flex items-center justify-center text-white font-black text-xs">
              {profil.photoProfil ? (
                <img
                  src={profil.photoProfil}
                  alt={nomComplet}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                initiales
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-extrabold text-slate-800 truncate leading-tight group-hover:text-[#5B63F6] transition-colors">
                {nomComplet || "Josh Harris"}
              </p>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                {profil.email || "josh@protonui.com"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalDeconnexionOuvert(true)}
              title="Déconnexion"
              className="w-7 h-7 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <Logout01Icon size={16} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 pt-1">
            <Link
              href="/admin/parametres"
              title={`${nomComplet} (${profil.role})`}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200 shadow-sm block hover:scale-105 transition-transform bg-gradient-to-tr from-indigo-500 to-[#5B63F6] flex items-center justify-center text-white font-black text-xs"
            >
              {profil.photoProfil ? (
                <img
                  src={profil.photoProfil}
                  alt={nomComplet}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                initiales
              )}
            </Link>

            <button
              type="button"
              onClick={() => setModalDeconnexionOuvert(true)}
              title="Déconnexion"
              className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Logout01Icon size={16} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmation de déconnexion */}
      <ModalConfirmationDeconnexion
        estOuvert={modalDeconnexionOuvert}
        surFermer={() => setModalDeconnexionOuvert(false)}
        surConfirmer={seDeconnecter}
      />
    </aside>
  );
};
