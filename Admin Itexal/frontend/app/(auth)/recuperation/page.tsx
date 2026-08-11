"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { ChampMotDePasse } from "@/composants-communs/champ-mot-de-passe";
import { useAuth } from "@/lib/context/AuthContext";
import { Tick01Icon } from "hugeicons-react";

export default function PageRecuperation() {
  const { reinitialiserMotDePasse, chargementAuth, erreurAuth, effacerErreur } = useAuth();

  const [code, setCode] = useState("");
  const [nouveauMdp, setNouveauMdp] = useState("");
  const [confirmerMdp, setConfirmerMdp] = useState("");
  const [succes, setSucces] = useState(false);
  const [erreurMdp, setErreurMdp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreurMdp("");

    if (nouveauMdp !== confirmerMdp) {
      setErreurMdp("Les mots de passe ne correspondent pas.");
      return;
    }

    if (nouveauMdp.length < 6) {
      setErreurMdp("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const res = await reinitialiserMotDePasse(code, nouveauMdp);
    if (res) {
      setSucces(true);
    }
  };

  return (
    <LayoutAuthBase
      titre="Nouveau mot de passe"
      sousTitre="Entrez votre code de vérification et définissez votre nouveau mot de passe"
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
      {!succes ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          {(erreurAuth || erreurMdp) && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
              {erreurAuth || erreurMdp}
            </div>
          )}

          {/* Verification Code */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Code de vérification (6 chiffres)
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => {
                effacerErreur();
                setCode(e.target.value);
              }}
              placeholder="123456"
              className="w-full px-3.5 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-mono font-bold tracking-widest text-center"
            />
          </div>

          {/* New Password */}
          <div>
            <ChampMotDePasse
              etiquette="Nouveau mot de passe"
              valeur={nouveauMdp}
              onChange={(e) => {
                effacerErreur();
                setErreurMdp("");
                setNouveauMdp(e.target.value);
              }}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <ChampMotDePasse
              etiquette="Confirmer le nouveau mot de passe"
              valeur={confirmerMdp}
              onChange={(e) => {
                effacerErreur();
                setErreurMdp("");
                setConfirmerMdp(e.target.value);
              }}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={chargementAuth}
              className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {chargementAuth ? "Mise à jour..." : "Réinitialiser le mot de passe"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3.5 text-center">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-medium space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Tick01Icon size={20} strokeWidth={3} />
            </div>
            <p className="font-extrabold text-sm text-emerald-900">Mot de passe réinitialisé !</p>
            <p className="text-slate-600">
              Votre mot de passe a été réinitialisé avec succès. Vous pouvez vous connecter.
            </p>
          </div>

          <Link
            href="/connexion"
            className="block w-full py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all"
          >
            Se Connecter →
          </Link>
        </div>
      )}
    </LayoutAuthBase>
  );
}
