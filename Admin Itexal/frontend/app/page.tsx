"use client";

import React from "react";
import Link from "next/link";
import { EmblemeCosmeticAdmin } from "@/composants-communs/embleme-cosmetic-admin";
import {
  DashboardSquare01Icon,
  PackageIcon,
  ShoppingCart01Icon,
  Store01Icon,
  Notification01Icon,
  ArrowRight01Icon,
  SparklesIcon,
  CheckmarkCircle02Icon,
  SecurityIcon,
  Analytics01Icon,
  LockKeyIcon,
} from "hugeicons-react";

export default function PageAccueilCosmeticAdmin() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#EBF3FF] via-[#F4F8FF] to-white text-slate-800 overflow-hidden font-sans select-none">
      
      {/* ── Background Organic Blue Blob Shapes ── */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7CA5FF]/50 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-10 -right-20 w-[420px] h-[420px] bg-[#4880FF]/30 rounded-[80%] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] bg-[#3B82F6]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-[#60A5FA]/30 rounded-full blur-2xl pointer-events-none" />

      {/* ── Navigation Header ── */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/connexion" className="flex items-center gap-3 group">
          <img
            src="/Admin Cosmetic.png"
            alt="Cosmetic Admin"
            className="h-16 sm:h-20 md:h-24 w-auto max-w-[320px] sm:max-w-[400px] object-contain drop-shadow-md transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-extrabold text-slate-600">
          <Link href="/connexion" className="hover:text-[#4880FF] transition-colors">
            Tableau de Bord
          </Link>
          <Link href="/connexion" className="hover:text-[#4880FF] transition-colors">
            Catalogue Produits
          </Link>
          <Link href="/connexion" className="hover:text-[#4880FF] transition-colors">
            Commandes
          </Link>
          <Link href="/connexion" className="hover:text-[#4880FF] transition-colors">
            Gestion Stocks
          </Link>
          <Link href="/connexion" className="hover:text-[#4880FF] transition-colors">
            Journal d'Activité
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="px-5 py-2.5 rounded-xl bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <LockKeyIcon size={16} />
            <span>Se Connecter</span>
            <ArrowRight01Icon size={16} />
          </Link>
        </div>
      </header>

      {/* ── Main Hero Section ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-4 pb-20 space-y-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#4880FF] text-xs font-black uppercase tracking-wider shadow-xs">
              <SparklesIcon size={16} /> Solution de Gestion Cosméceutique Sécurisée
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Pilotez votre activité avec{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                Cosmetic Admin
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              Un système complet, dynamique et centralisé pour gérer vos produits de beauté, suivre vos stocks en temps réel, traiter vos commandes et analyser la performance financière de votre marque.
            </p>

            {/* CTAs -> Redirect all to /connexion for security */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/connexion"
                className="px-7 py-4 rounded-2xl bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
              >
                <DashboardSquare01Icon size={20} />
                <span>Connexion au Tableau de Bord</span>
                <ArrowRight01Icon size={18} />
              </Link>

              <Link
                href="/connexion"
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <PackageIcon size={20} className="text-[#4880FF]" />
                <span>Accès Espace Sécurisé</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckmarkCircle02Icon size={16} className="text-emerald-500" />
                <span>Données Réelles & Temps Réel</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckmarkCircle02Icon size={16} className="text-emerald-500" />
                <span>Accès Authentifié & Sécurisé</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Emblem Artwork */}
          <div className="lg:col-span-6 flex justify-center">
            <EmblemeCosmeticAdmin taille="lg" afficherCadreArch={true} />
          </div>
        </div>

        {/* ── Section Modules & Fonctionnalités Clés ── */}
        <div className="space-y-10 pt-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-wide">
              Modules d'Administration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Une suite d'outils interconnectés pour administrer l'ensemble de votre boutique cosméceutique sans effort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Carte 1 */}
            <Link
              href="/connexion"
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] group-hover:bg-[#4880FF] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <PackageIcon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-[#4880FF] transition-colors">
                  Gestion des Produits & Favoris
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Ajout, modification et suppression de produits avec synchronisation réactive des favoris et catégories.
                </p>
              </div>
            </Link>

            {/* Carte 2 */}
            <Link
              href="/connexion"
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <Store01Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-[#4880FF] transition-colors">
                  Contrôle des Stocks & Ruptures
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Ajustement instantané des quantites, alertes sur seuil critique et journal d'inventaire complet.
                </p>
              </div>
            </Link>

            {/* Carte 3 */}
            <Link
              href="/connexion"
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <ShoppingCart01Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-[#4880FF] transition-colors">
                  Suivi des Commandes
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Traitement rapide, détails de livraison, statuts de paiement et impression des factures.
                </p>
              </div>
            </Link>

            {/* Carte 4 */}
            <Link
              href="/connexion"
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <Notification01Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-[#4880FF] transition-colors">
                  Centre de Notifications
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Notifications en temps réel dans l'en-tête et la barre latérale pour ne manquer aucun événement.
                </p>
              </div>
            </Link>

            {/* Carte 5 */}
            <Link
              href="/connexion"
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-[#4880FF] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <Analytics01Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-[#4880FF] transition-colors">
                  Statistiques & Ventes
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Graphiques interactifs et indicateurs clés de performance (KPI) pour maximiser le chiffre d'affaires.
                </p>
              </div>
            </Link>

            {/* Carte 6 */}
            <Link
              href="/connexion"
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <SecurityIcon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-[#4880FF] transition-colors">
                  Journal d'Audit & Sécurité
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Traçabilité intégrale des connexions, IP, et modifications administratives avec filtrage par sévérité.
                </p>
              </div>
            </Link>

          </div>
        </div>

        {/* ── Banner CTA Quick Access ── */}
        <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#4880FF] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 text-center sm:text-left relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">
              Prêt à piloter votre plateforme ?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-lg">
              Accédez immédiatement au back-office de gestion Cosmetic Admin et maîtrisez tous vos indicateurs.
            </p>
          </div>

          <Link
            href="/connexion"
            className="px-8 py-4 rounded-2xl bg-white text-[#1E3A8A] hover:bg-blue-50 font-black text-sm shadow-xl transition-all flex items-center gap-3 shrink-0 relative z-10 transform hover:scale-105"
          >
            <LockKeyIcon size={18} />
            <span>Se Connecter</span>
            <ArrowRight01Icon size={20} />
          </Link>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white/80 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4880FF]" />
            <span>Cosmetic Admin © 2026 — Tous droits réservés</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/connexion" className="hover:text-[#4880FF]">Tableau de Bord</Link>
            <Link href="/connexion" className="hover:text-[#4880FF]">Connexion</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
