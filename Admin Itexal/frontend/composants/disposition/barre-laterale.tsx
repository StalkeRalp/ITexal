"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardSquare01Icon,
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
} from "hugeicons-react";

import { useNotifications } from "@/lib/context/NotificationContext";

export type Langue = "fr" | "en" | "ar";

const MENU_PRINCIPAL = [
  { nom: { fr: "Dashboard", en: "Dashboard", ar: "لوحة التحكم" }, chemin: "/admin", Icone: DashboardSquare01Icon },
  { nom: { fr: "Produits", en: "Products", ar: "المنتجات" }, chemin: "/admin/produits", Icone: PackageIcon },
  { nom: { fr: "Favoris", en: "Favorites", ar: "المفضلة" }, chemin: "/admin/favoris", Icone: FavouriteIcon },
  { nom: { fr: "Catégories", en: "Categories", ar: "الفئات" }, chemin: "/admin/categories", Icone: Folder01Icon },
  { nom: { fr: "Marques", en: "Brands", ar: "العلامات" }, chemin: "/admin/marques", Icone: Tag01Icon },
  { nom: { fr: "Commandes", en: "Orders", ar: "الطلبات" }, chemin: "/admin/commandes", Icone: ShoppingCart01Icon },
  { nom: { fr: "Clients", en: "Customers", ar: "العملاء" }, chemin: "/admin/clients", Icone: UserGroupIcon },
  { nom: { fr: "Notifications", en: "Notifications", ar: "الإشعارات" }, chemin: "/admin/notifications", Icone: Notification01Icon, estNotification: true },
  { nom: { fr: "Stocks", en: "Stocks", ar: "المخزون" }, chemin: "/admin/stocks", Icone: Store01Icon },
];

const MENU_PAGES = [
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
  const [langue, setLangueState] = useState<Langue>("fr");

  useEffect(() => {
    setLangueState(getLangue());
    const handler = () => setLangueState(getLangue());
    window.addEventListener("itexal_lang_change", handler);
    return () => window.removeEventListener("itexal_lang_change", handler);
  }, []);

  const nom = (item: { nom: Record<Langue, string> }) => item.nom[langue];

  return (
    <aside
      className="w-68 bg-white border-r border-slate-200/60 flex flex-col shrink-0 h-screen sticky top-0 z-30"
      style={{ boxShadow: "2px 0 12px 0 rgba(72,128,255,0.06)" }}
    >
      {/* Logo */}
      <div className="h-[88px] flex items-center justify-center px-4 border-b border-slate-100 shrink-0">
        <Link href="/admin" className="flex items-center justify-center w-full group">
          <img
            src="/Admin Cosmetic.png"
            alt="ITexal Admin"
            className="h-[72px] w-auto max-w-[230px] object-contain transition-transform duration-300 group-hover:scale-[1.04] drop-shadow-xs"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col px-3 py-4 overflow-hidden">
        <div className="flex flex-col gap-0.5">
          {MENU_PRINCIPAL.map((item) => {
            const actif = pathname === item.chemin;
            const Icon = item.Icone;
            return (
              <Link
                key={item.chemin}
                href={item.chemin}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
                  actif
                    ? "bg-[#4880FF] text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 hover:text-[#4880FF] hover:bg-blue-50/70"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    actif ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#4880FF]"
                  }`}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="flex-1 leading-none">{nom(item)}</span>
                {item.estNotification && nombreNonLues > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black leading-none ${
                      actif ? "bg-white/25 text-white" : "bg-rose-500 text-white"
                    }`}
                  >
                    {nombreNonLues}
                  </span>
                )}
                {actif && <span className="w-1 h-4 rounded-full bg-white/60 ml-auto shrink-0" />}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.12em] mb-2">
            {langue === "ar" ? "صفحات" : langue === "en" ? "Pages" : "Pages"}
          </p>
          <div className="flex flex-col gap-0.5">
            {MENU_PAGES.map((item) => {
              const actif = pathname === item.chemin;
              const Icon = item.Icone;
              return (
                <Link
                  key={item.chemin}
                  href={item.chemin}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
                    actif
                      ? "bg-[#4880FF] text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-600 hover:text-[#4880FF] hover:bg-blue-50/70"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                      actif ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#4880FF]"
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="flex-1 leading-none">{nom(item)}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex-1" />

        <div className="pt-3 border-t border-slate-100 flex flex-col gap-0.5">
          <Link
            href="/admin/parametres"
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
              pathname === "/admin/parametres"
                ? "bg-[#4880FF] text-white shadow-lg shadow-blue-500/25"
                : "text-slate-600 hover:text-[#4880FF] hover:bg-blue-50/70"
            }`}
          >
            <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#4880FF] flex items-center justify-center shrink-0 transition-all duration-200">
              <Settings02Icon size={20} strokeWidth={2} />
            </span>
            <span>{langue === "en" ? "Settings" : langue === "ar" ? "الإعدادات" : "Paramètres"}</span>
          </Link>
          <Link
            href="/connexion"
            className="group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold text-rose-500 hover:bg-rose-50 transition-all duration-200"
          >
            <span className="w-7 h-7 rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-100 flex items-center justify-center shrink-0 transition-all duration-200">
              <Logout01Icon size={20} strokeWidth={2} />
            </span>
            <span>{langue === "en" ? "Sign Out" : langue === "ar" ? "تسجيل الخروج" : "Déconnexion"}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};
