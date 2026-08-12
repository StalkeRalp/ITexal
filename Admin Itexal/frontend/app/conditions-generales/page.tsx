"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft01Icon, File01Icon, LicenseIcon } from "hugeicons-react";

export default function PageConditionsGenerales() {
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
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Cosmetic Admin — Plateforme d'Administration E-Commerce Cosmétique
              </p>
            </div>
          </div>

          <div className="space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">1</span>
                <span>Objet et Champ d'Application</span>
              </h2>
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme de gestion commerciale <strong>Cosmetic Admin</strong>. Tout accès au back-office est strictement réservé aux utilisateurs dûment autorisés par la direction administrative de Cosmetic.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">2</span>
                <span>Accès, Authentification et Sécurité des Comptes</span>
              </h2>
              <p>
                L'accès à l'administration est protégé par une authentification à facteurs multiples (MFA/OTP). Chaque administrateur ou gestionnaire de stock est responsable du maintien de la confidentialité de ses identifiants et de sa clé d'authentification.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li>Toute tentative de connexion non autorisée est enregistrée et verrouillée automatiquement.</li>
                <li>Les sessions inactives sont expirées automatiquement après une période d'inactivité.</li>
                <li>L'utilisation de mots de passe complexes et d'appareils de confiance est obligatoire.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">3</span>
                <span>Gestion des Données et Audit des Actions</span>
              </h2>
              <p>
                Toutes les opérations effectuées sur le catalogue produit, les prix, les stocks, les commandes clients et les rapports statistiques sont journalisées à des fins de traçabilité et d'audit comptable.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">4</span>
                <span>Propriété Intellectuelle</span>
              </h2>
              <p>
                L'ensemble des contenus, marques, logos, visuels de produits cosmétiques et codes sources hébergés sur la plateforme <strong>Cosmetic Admin</strong> demeurent la propriété exclusive de Cosmetic et de ses laboratoires partenaires.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5B63F6] font-black text-xs inline-flex items-center justify-center">5</span>
                <span>Modification des Conditions</span>
              </h2>
              <p>
                La direction administrative se réserve le droit de modifier à tout moment les présentes conditions afin de se conformer aux évolutions réglementaires et techniques de la plateforme.
              </p>
            </section>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <p>© 2026 Cosmetic Admin — Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href="/politique-confidentialite" className="text-[#5B63F6] hover:underline">
                Politique de Confidentialité
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
