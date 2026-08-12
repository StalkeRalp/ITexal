"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { ChampMotDePasse } from "@/composants-communs/champ-mot-de-passe";
import { useAuth } from "@/lib/context/AuthContext";

export default function PageInscription() {
  const { sInscrire, chargementAuth, erreurAuth, effacerErreur } = useAuth();
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [erreurMdp, setErreurMdp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreurMdp("");

    if (motDePasse !== confirmerMotDePasse) {
      setErreurMdp("Les mots de passe ne correspondent pas.");
      return;
    }

    if (motDePasse.length < 6) {
      setErreurMdp("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const res = await sInscrire(nom, prenom, email, motDePasse);
    if (res) {
      router.push("/auth/otp");
    }
  };

  return (
    <LayoutAuthBase
      titre="Créer un compte"
      sousTitre="Inscrivez-vous pour accéder à l'administration Cosmetic Admin"
      illustrationSrc="/signUp.svg"
      afficherResociaux={true}
      afficherSeparateur={true}
      lienFooter={
        <span>
          Vous avez déjà un compte ?{" "}
          <Link
            href="/connexion"
            className="text-[#4880FF] font-extrabold hover:underline"
          >
            Se connecter
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {(erreurAuth || erreurMdp) && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
            {erreurAuth || erreurMdp}
          </div>
        )}

        {/* Prénom & Nom */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              required
              value={prenom}
              onChange={(e) => {
                effacerErreur();
                setPrenom(e.target.value);
              }}
              placeholder="William"
              className="w-full px-4 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => {
                effacerErreur();
                setNom(e.target.value);
              }}
              placeholder="Kame"
              className="w-full px-4 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Email Address */}
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
            className="w-full px-4 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
          />
        </div>

        {/* Password */}
        <div>
          <ChampMotDePasse
            etiquette="Mot de passe"
            valeur={motDePasse}
            onChange={(e) => {
              effacerErreur();
              setErreurMdp("");
              setMotDePasse(e.target.value);
            }}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <ChampMotDePasse
            etiquette="Confirmer le mot de passe"
            valeur={confirmerMotDePasse}
            onChange={(e) => {
              effacerErreur();
              setErreurMdp("");
              setConfirmerMotDePasse(e.target.value);
            }}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Terms checkbox */}
        <div className="pt-0.5">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 font-medium leading-snug">
            <input
              type="checkbox"
              required
              checked={accepteConditions}
              onChange={(e) => setAccepteConditions(e.target.checked)}
              className="rounded border-slate-300 text-[#4880FF] focus:ring-0 mt-0.5"
            />
            <span>
              J'accepte les{" "}
              <Link
                href="/conditions-generales"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="text-[#4880FF] font-extrabold underline hover:text-blue-700"
              >
                conditions d'utilisation
              </Link>{" "}
              et la{" "}
              <Link
                href="/politique-confidentialite"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="text-[#4880FF] font-extrabold underline hover:text-blue-700"
              >
                politique de confidentialité
              </Link>.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={chargementAuth}
            className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {chargementAuth ? "Création du compte..." : "Créer mon compte"}
          </button>
        </div>
      </form>
    </LayoutAuthBase>
  );
}
