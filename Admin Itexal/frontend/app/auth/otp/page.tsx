"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { useAuth } from "@/lib/context/AuthContext";
import { Tick01Icon, ArrowLeft01Icon } from "hugeicons-react";

export default function PageOTP() {
  const { verifierOTP, renvoyerOTP, chargementAuth, erreurAuth, otpMailTemp, effacerErreur } = useAuth();
  
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [compteur, setCompteur] = useState(45);
  const [peutRenvoyer, setPeutRenvoyer] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Compte à rebours 45 secondes
  useEffect(() => {
    if (compteur <= 0) {
      setPeutRenvoyer(true);
      return;
    }

    const timer = setInterval(() => {
      setCompteur((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [compteur]);

  // Focus premier champ au chargement
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    effacerErreur();
    setSuccesMsg("");
    
    // Garder seulement les chiffres
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      return;
    }

    // Gestion du collage (Paste) si plusieurs chiffres
    if (cleanValue.length > 1) {
      const pastedArray = cleanValue.slice(0, 6).split("");
      const newDigits = [...digits];
      pastedArray.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setDigits(newDigits);

      const nextFocus = Math.min(pastedArray.length, 5);
      inputRefs.current[nextFocus]?.focus();

      if (pastedArray.length === 6) {
        soumettreCode(newDigits.join(""));
      }
      return;
    }

    // Saisie d'un seul chiffre
    const newDigits = [...digits];
    newDigits[index] = cleanValue[0];
    setDigits(newDigits);

    // Avancement automatique
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Validation automatique quand 6 chiffres saisis
    const codeComplet = newDigits.join("");
    if (codeComplet.length === 6) {
      soumettreCode(codeComplet);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const soumettreCode = async (code: string) => {
    const success = await verifierOTP(code);
    if (success) {
      setSuccesMsg("Code validé ! Redirection...");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length === 6) {
      soumettreCode(code);
    }
  };

  const handleRenvoyer = async () => {
    if (!peutRenvoyer || chargementAuth) return;
    setDigits(["", "", "", "", "", ""]);
    setCompteur(45);
    setPeutRenvoyer(false);
    effacerErreur();
    setSuccesMsg("Un nouveau code a été envoyé.");
    await renvoyerOTP();
    inputRefs.current[0]?.focus();
  };

  return (
    <LayoutAuthBase
      titre="Vérification OTP"
      sousTitre={`Un code de vérification à 6 chiffres a été envoyé à ${
        otpMailTemp || "votre adresse email"
      }`}
      illustrationSrc="/signUp.svg"
      lienFooter={
        <Link
          href="/connexion"
          className="inline-flex items-center gap-1.5 text-[#4880FF] font-extrabold hover:underline"
        >
          <ArrowLeft01Icon size={16} />
          <span>Retour à la connexion</span>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {erreurAuth && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
            {erreurAuth}
          </div>
        )}

        {succesMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2">
            <Tick01Icon size={18} />
            <span>{succesMsg}</span>
          </div>
        )}

        {/* Chapelet de 6 Inputs OTP */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-4">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 sm:w-12 h-14 bg-[#F4F6FA] border-2 border-slate-200 focus:border-[#4880FF] focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-center text-xl font-black text-slate-900 focus:outline-none transition-all"
            />
          ))}
        </div>

        {/* Bouton de Soumission */}
        <button
          type="submit"
          disabled={chargementAuth || digits.join("").length < 6}
          className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
        >
          {chargementAuth ? "Vérification en cours..." : "Vérifier le code"}
        </button>

        {/* Zone Renvoyer le Code & Compte à Rebours */}
        <div className="text-center text-xs font-bold text-slate-500 pt-2">
          {!peutRenvoyer ? (
            <p className="text-slate-400">
              Renvoyer le code dans{" "}
              <span className="text-[#4880FF] font-black">{compteur} s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleRenvoyer}
              disabled={chargementAuth}
              className="text-[#4880FF] hover:underline font-extrabold cursor-pointer"
            >
              Renvoyer le code maintenant
            </button>
          )}
        </div>
      </form>
    </LayoutAuthBase>
  );
}
