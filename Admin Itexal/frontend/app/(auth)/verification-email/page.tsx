"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { Tick01Icon } from "hugeicons-react";

export default function PageVerificationEmail() {
  const [code, setCode] = useState("");
  const [verifie, setVerifie] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vérification du code email :", code);
    setVerifie(true);
  };

  return (
    <LayoutAuthBase
      titre="Verify Email"
      sousTitre="Entrez le code de vérification à 6 chiffres envoyé à votre adresse email"
      afficherResociaux={false}
      afficherSeparateur={false}
      lienFooter={
        <span>
          Didn't receive code?{" "}
          <button
            type="button"
            onClick={() => alert("Un nouveau code a été envoyé à votre adresse email.")}
            className="text-[#4880FF] font-extrabold hover:underline"
          >
            Resend Code
          </button>
        </span>
      }
    >
      {!verifie ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              Verification Code (6 digits)
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-3 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-mono font-bold tracking-widest text-center"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Verify Email
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-center">
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-medium space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
              <Tick01Icon size={24} strokeWidth={3} />
            </div>
            <p className="font-extrabold text-base text-emerald-900">Email Vérifié !</p>
            <p className="text-slate-600">
              Votre adresse email a été confirmée avec succès. Vous pouvez accéder à votre tableau de bord.
            </p>
          </div>

          <Link
            href="/admin"
            className="block w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all"
          >
            Accéder à l'Admin →
          </Link>
        </div>
      )}
    </LayoutAuthBase>
  );
}
