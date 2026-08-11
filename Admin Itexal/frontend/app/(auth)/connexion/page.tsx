"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { ChampMotDePasse } from "@/composants-communs/champ-mot-de-passe";
import { useAuth } from "@/lib/context/AuthContext";

export default function PageConnexion() {
  const { seConnecter, chargementAuth, erreurAuth, effacerErreur } = useAuth();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [seSouvenir, setSeSouvenir] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await seConnecter(email, motDePasse);
  };

  return (
    <LayoutAuthBase
      titre="Connexion"
      sousTitre="Accédez au back-office administrateur Cosmetic Admin"
      illustrationSrc="/login.svg"
      afficherResociaux={true}
      afficherSeparateur={true}
      lienFooter={
        <span>
          Vous n'avez pas de compte ?{" "}
          <Link
            href="/inscription"
            className="text-[#4880FF] font-extrabold hover:underline"
          >
            S'inscrire
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {erreurAuth && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
            {erreurAuth}
          </div>
        )}

        {/* Email Address */}
        <div>
          <label htmlFor="input-email" className="block text-xs font-extrabold text-slate-700 mb-1">
            Adresse Email
          </label>
          <input
            id="input-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              effacerErreur();
              setEmail(e.target.value);
            }}
            placeholder="admin@cosmetic.com"
            className="w-full px-3.5 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-extrabold text-slate-700">
              Mot de passe
            </label>
            <Link
              href="/mot-de-passe-oublie"
              className="text-xs font-extrabold text-[#4880FF] hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <ChampMotDePasse
            id="input-password"
            valeur={motDePasse}
            onChange={(e) => {
              effacerErreur();
              setMotDePasse(e.target.value);
            }}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Remember me checkbox */}
        <div className="pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={seSouvenir}
              onChange={(e) => setSeSouvenir(e.target.checked)}
              className="rounded border-slate-300 text-[#4880FF] focus:ring-0"
            />
            <span>Se souvenir de moi</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={chargementAuth}
            className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {chargementAuth ? "Connexion en cours..." : "Se connecter"}
          </button>
        </div>
      </form>
    </LayoutAuthBase>
  );
}
