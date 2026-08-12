"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft01Icon, File01Icon, LicenseIcon } from "hugeicons-react";

export default function PagePolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
          >
            <ArrowLeft01Icon size={16} />
            <span>Retour à la connexion</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-2xl border border-slate-200">
            <LicenseIcon size={14} className="text-[#5B63F6]" />
            <span>Dernière mise à jour : 12 Août 2026</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 space-y-8">
          <div className="border-b border-slate-100 pb-6 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#5B63F6] font-black flex items-center justify-center shrink-0 shadow-xs">
              <File01Icon size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Politique de Confidentialité
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Protection des données et sécurité de la plateforme Cosmetic Admin
              </p>
            </div>
          </div>

          <div className="space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">1</span>
                <span>Collecte et Traitement des Données</span>
              </h2>
              <p>
                <strong>Cosmetic Admin</strong> s'engage à protéger la confidentialité des données personnelles des administrateurs, des collaborateurs et de la clientèle e-commerce. Les informations recueillies (noms, emails, téléphones, adresses et historiques de commandes) sont strictement nécessaires à l'exécution des opérations commerciales.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">2</span>
                <span>Chiffrement et Sécurité du Stockage</span>
              </h2>
              <p>
                Toutes les données sensibles (mots de passe, jetons de session, clés TOTP MFA, détails de paiement) sont chiffrées selon les standards industriels AES-256 et TLS 1.3.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li>Aucun mot de passe n'est stocké en clair.</li>
                <li>Les jetons d'authentification ne sont jamais conservés dans le cache PWA public.</li>
                <li>Accès restreint par rôle administratif (RBAC).</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">3</span>
                <span>Gestion de la PWA et Stratégie de Cache</span>
              </h2>
              <p>
                L'application PWA Cosmetic Admin utilise un Service Worker configuré pour ne conserver en cache local que les éléments d'interface statiques. Les données comptables et confidentielles sont systématiquement lues en direct du serveur sécurisé.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">4</span>
                <span>Droits des Personnes et Exportation</span>
              </h2>
              <p>
                Conformément aux réglementations sur la protection des données, les utilisateurs disposent d'un droit d'accès, de rectification et d'effacement de leurs informations personnelles. Les données d'audit peuvent être exportées sur demande habilitée.
              </p>
            </section>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <p>© 2026 Cosmetic Admin — Sécurité & Confidentialité.</p>
            <div className="flex items-center gap-4">
              <Link href="/conditions-generales" className="text-[#5B63F6] hover:underline">
                Conditions Générales
              </Link>
              <Link href="/admin" className="text-[#5B63F6] hover:underline">
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
