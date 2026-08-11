"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { useAuth } from "@/lib/context/AuthContext";
import { Tick01Icon } from "hugeicons-react";

export default function PageMotDePasseOublie() {
  const { demanderReinitialisation, chargementAuth, erreurAuth, effacerErreur } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [soumis, setSoumis] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await demanderReinitialisation(email);
    if (res) {
      setSoumis(true);
    }
  };

  return (
    <LayoutAuthBase
      titre="Mot de passe oublié"
      sousTitre="Entrez votre adresse email pour recevoir votre code de réinitialisation"
      illustrationSrc="/signUp.svg"
      afficherResociaux={false}
      afficherSeparateur={false}
      lienFooter={
        <span>
          Vous vous souvenez de votre mot de passe ?{" "}
          <Link
            href="/connexion"
            className="text-[#4880FF] font-extrabold hover:underline"
          >
            Connexion
          </Link>
        </span>
      }
    >
      {!soumis ? (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {erreurAuth && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
              {erreurAuth}
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Adresse Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                effacerErreur();
                setEmail(e.target.value);
              }}
              placeholder="example@gmail.com"
              className="w-full px-3.5 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={chargementAuth}
              className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {chargementAuth ? "Envoi du code..." : "Envoyer les instructions"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3.5">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-medium space-y-2 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Tick01Icon size={20} strokeWidth={3} />
            </div>
            <p className="font-extrabold text-sm text-emerald-900">Email envoyé avec succès !</p>
            <p className="text-slate-600 leading-relaxed">
              Un code de réinitialisation a été envoyé à <strong className="text-slate-900">{email}</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/auth/otp")}
            className="w-full py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            Saisir le code OTP →
          </button>
        </div>
      )}
    </LayoutAuthBase>
  );
}
