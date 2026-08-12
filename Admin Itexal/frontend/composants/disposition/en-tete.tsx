"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MenuProfil } from "./menu-profil";
import { useNotifications } from "@/lib/context/NotificationContext";
import { useLanguage, type Langue } from "@/lib/context/LanguageContext";
import {
  Search01Icon,
  Notification01Icon,
  Cancel01Icon,
  ArrowDown01Icon,
  Tick01Icon,
  DashboardSquare01Icon,
  PackageIcon,
  ShoppingCart01Icon,
  UserGroupIcon,
  Store01Icon,
  Folder01Icon,
  Tag01Icon,
  Discount01Icon,
  Chart01Icon,
  Settings02Icon,
  ClipboardIcon,
  User02Icon,
  File01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

// ── Only 2 languages: FR and EN ──────────────────────────────────────────────
const LANGUES: { code: Langue; label: string; flag: string; natif: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷", natif: "Français" },
  { code: "en", label: "English",  flag: "🇬🇧", natif: "English" },
];

export const EnTete: React.FC = () => {
  const { nombreNonLues } = useNotifications();
  const { langue, changerLangue, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    { key: "navigation.dashboard", defaultLabel: "Dashboard", href: "/admin", Icon: DashboardSquare01Icon },
    { key: "navigation.products", defaultLabel: "Produits", href: "/admin/produits", Icon: PackageIcon },
    { key: "navigation.orders", defaultLabel: "Commandes", href: "/admin/commandes", Icon: ShoppingCart01Icon },
    { key: "navigation.clients", defaultLabel: "Clients", href: "/admin/clients", Icon: UserGroupIcon },
    { key: "navigation.stocks", defaultLabel: "Stocks", href: "/admin/stocks", Icon: Store01Icon },
    { key: "navigation.categories", defaultLabel: "Catégories", href: "/admin/categories", Icon: Folder01Icon },
    { key: "navigation.marques", defaultLabel: "Marques", href: "/admin/marques", Icon: Tag01Icon },
    { key: "navigation.promotions", defaultLabel: "Promotions", href: "/admin/promotions", Icon: Discount01Icon },
    { key: "navigation.statistics", defaultLabel: "Statistiques", href: "/admin/statistiques", Icon: Chart01Icon },
    { key: "navigation.notifications", defaultLabel: "Notifications", href: "/admin/notifications", Icon: Notification01Icon },
    { key: "navigation.parametres", defaultLabel: "Paramètres", href: "/admin/parametres", Icon: Settings02Icon },
    { key: "navigation.journal", defaultLabel: "Journal", href: "/admin/journal", Icon: ClipboardIcon },
    { key: "navigation.utilisateurs", defaultLabel: "Utilisateurs", href: "/admin/utilisateurs", Icon: User02Icon },
    { key: "navigation.contenus", defaultLabel: "Contenus", href: "/admin/contenus", Icon: File01Icon },
  ];

  useEffect(() => {
    const route = routes.find((r) => r.href === pathname);
    if (route) {
      document.title = `${t(route.key)} | Cosmetic Admin`;
    } else if (pathname === "/admin") {
      document.title = `${t("navigation.dashboard")} | Cosmetic Admin`;
    }
  }, [pathname, langue, t]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = LANGUES.find((l) => l.code === langue) || LANGUES[0];

  const suggestions = query.trim()
    ? routes.filter((r) =>
        t(r.key).toLowerCase().includes(query.toLowerCase()) ||
        r.href.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSuggestion = (href: string) => {
    router.push(href);
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <header
      className="h-[72px] bg-white border-b border-slate-200/60 px-8 flex items-center justify-between sticky top-0 z-20 shrink-0"
      style={{ boxShadow: "0 2px 12px 0 rgba(72,128,255,0.06)" }}
    >
      {/* ── Search bar ──────────────────────────────────────────────── */}
      <div ref={searchRef} className="relative w-96">
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400 pointer-events-none select-none">
            <Search01Icon size={18} strokeWidth={2} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            placeholder={t("navigation.searchPlaceholder")}
            className="w-full pl-10 pr-9 py-2.5 bg-[#F5F6FA] border border-transparent rounded-2xl text-[13px] font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#5B63F6]/40 focus:shadow-xs transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setSearchOpen(false); }}
              aria-label="Effacer la recherche"
              className="absolute right-3 text-slate-400 hover:text-slate-700 transition-colors p-0.5"
            >
              <Cancel01Icon size={16} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Search suggestions dropdown */}
        {searchOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
            {suggestions.map((r) => {
              const Icon = r.Icon;
              return (
                <button
                  key={r.href}
                  type="button"
                  onMouseDown={() => handleSuggestion(r.href)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50/70 transition-colors text-left group"
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-[#5B63F6] flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-slate-800 group-hover:text-[#5B63F6] transition-colors">{t(r.key)}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{r.href}</p>
                  </div>
                  <ArrowRight01Icon size={16} className="text-slate-300 group-hover:text-[#5B63F6] transition-colors" />
                </button>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {searchOpen && query.trim() && suggestions.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 text-center z-50">
            <p className="text-xs text-slate-400 font-medium">
              {t("common.noResults")} <span className="font-bold text-slate-600">"{query}"</span>
            </p>
          </div>
        )}
      </div>

      {/* ── Right zone ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">

        {/* Notification bell */}
        <Link
          href="/admin/notifications"
          className="relative p-2.5 rounded-xl text-slate-500 hover:text-[#5B63F6] hover:bg-indigo-50/80 transition-all duration-200 group"
          aria-label="Notifications ITexal"
          title={t("navigation.notifications")}
        >
          <Notification01Icon size={20} strokeWidth={2} />
          {nombreNonLues > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-rose-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-white leading-none">
              {nombreNonLues}
            </span>
          )}
        </Link>

        {/* Divider */}
        <span className="w-px h-6 bg-slate-200 rounded-full" />

        {/* Language picker */}
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setLangMenuOpen((v) => !v)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[13px] font-bold transition-all duration-200 ${
              langMenuOpen
                ? "bg-indigo-50 border-[#5B63F6]/30 text-[#5B63F6]"
                : "bg-white border-slate-200 text-slate-700 hover:border-[#5B63F6]/30 hover:bg-indigo-50/60"
            }`}
          >
            <span className="text-lg leading-none">{currentLang.flag}</span>
            <span className="hidden sm:block">{currentLang.natif}</span>
            <ArrowDown01Icon
              size={14}
              className={`shrink-0 transition-transform duration-200 ${langMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Language dropdown */}
          {langMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  {t("navigation.chooseLanguage")}
                </p>
              </div>
              {LANGUES.map((l) => {
                const isActive = l.code === langue;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      changerLangue(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-50 text-[#5B63F6]"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-xl leading-none">{l.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-[13px] font-bold leading-none">{l.natif}</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{l.label}</p>
                    </div>
                    {isActive && (
                      <span className="w-5 h-5 rounded-full bg-[#5B63F6] text-white flex items-center justify-center shrink-0">
                        <Tick01Icon size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <span className="w-px h-6 bg-slate-200 rounded-full" />

        {/* Profile */}
        <MenuProfil />
      </div>
    </header>
  );
};
