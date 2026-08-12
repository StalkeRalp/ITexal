"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutAuthBase } from "@/composants-communs/layout-auth-base";
import { useAuth } from "@/lib/context/AuthContext";
import { Tick01Icon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

export default function PageOTP() {
  const { verifierOTP, renvoyerOTP, chargementAuth, erreurAuth, otpMailTemp, effacerErreur } = useAuth();
  const router = useRouter();
  
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [compteur, setCompteur] = useState(45);
  const [peutRenvoyer, setPeutRenvoyer] = useState(false);
  const [estVerifie, setEstVerifie] = useState(false);
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
    if (!estVerifie) {
      inputRefs.current[0]?.focus();
    }
  }, [estVerifie]);

  const handleChange = (index: number, value: string) => {
    effacerErreur();
    setSuccesMsg("");
    
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      return;
    }

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

    const newDigits = [...digits];
    newDigits[index] = cleanValue[0];
    setDigits(newDigits);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

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
      setEstVerifie(true);
      setSuccesMsg("Votre identité a été vérifiée avec succès.");
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

  const redirigerVersDashboard = () => {
    router.push("/admin");
  };

  return (
    <LayoutAuthBase
      titre={estVerifie ? "" : "Vérification OTP"}
      sousTitre={
        estVerifie
          ? ""
          : `Un code de vérification à 6 chiffres a été envoyé à ${
              otpMailTemp || "votre adresse email"
            }`
      }
      illustrationSrc="/signUp.svg"
      lienFooter={
        !estVerifie ? (
          <Link
            href="/connexion"
            className="inline-flex items-center gap-1.5 text-[#4880FF] font-extrabold hover:underline"
          >
            <ArrowLeft01Icon size={16} />
            <span>Retour à la connexion</span>
          </Link>
        ) : null
      }
    >
      {estVerifie ? (
        /* ── Écran de Confirmation Identique à la Maquette Utilisateur ── */
        <div className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn space-y-6">
          {/* Circular Confetti Container & Thumbs Up Illustration */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Sparkles and Confetti SVGs */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Confetti lines and shapes */}
              <path d="M40 70 Q 30 65 35 55" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M160 65 Q 170 60 165 75" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M110 35 L 110 45 M 105 40 L 115 40" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <path d="M150 110 Q 160 100 155 90" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 120 Q 40 115 45 130" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
              {/* Sparkle 4-point stars */}
              <path d="M75 55 L77 60 L82 62 L77 64 L75 69 L73 64 L68 62 L73 60 Z" fill="#6366F1" />
              <path d="M125 100 L127 105 L132 107 L127 109 L125 114 L123 109 L118 107 L123 105 Z" fill="#6366F1" />
              <path d="M155 80 L156.5 83.5 L160 85 L156.5 86.5 L155 90 L153.5 86.5 L150 85 L153.5 83.5 Z" fill="#6366F1" />
              <path d="M45 90 L46.5 93.5 L50 95 L46.5 96.5 L45 100 L43.5 96.5 L40 95 L43.5 93.5 Z" fill="#6366F1" />
            </svg>

            {/* Light Purple Inner Circle */}
            <div className="w-44 h-44 rounded-full bg-[#F5F3FF] flex items-center justify-center shadow-xs">
              {/* Thumbs Up Icon Container */}
              <div className="text-[#5D5FEF]">
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1zm20-10c0-.55-.45-1-1-1h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 3 7.58 9.59C7.22 9.95 7 10.45 7 11v7c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Success Title */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Your account successfully created.
          </h2>

          {/* Go to Home Button */}
          <div className="w-full max-w-xs pt-2">
            <button
              type="button"
              onClick={redirigerVersDashboard}
              className="w-full py-3.5 bg-[#5D5FEF] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      ) : (
        /* ── Formulaire de Saisie du Code OTP ── */
        <form onSubmit={handleSubmit} className="space-y-6">
          {erreurAuth && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
              {erreurAuth}
            </div>
          )}

          {succesMsg && !estVerifie && (
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
                className="w-11 sm:w-12 h-14 bg-[#F4F6FA] border-2 border-slate-200 focus:border-[#5B63F6] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-center text-xl font-black text-slate-900 focus:outline-none transition-all"
              />
            ))}
          </div>

          {/* Bouton de Soumission */}
          <button
            type="submit"
            disabled={chargementAuth || digits.join("").length < 6}
            className="w-full py-3.5 bg-[#5B63F6] hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl shadow-md shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {chargementAuth ? "Vérification en cours..." : "Vérifier le code"}
          </button>

          {/* Zone Renvoyer le Code & Compte à Rebours */}
          <div className="text-center text-xs font-bold text-slate-500 pt-2">
            {!peutRenvoyer ? (
              <p className="text-slate-400">
                Renvoyer le code dans{" "}
                <span className="text-[#5B63F6] font-black">{compteur} s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleRenvoyer}
                disabled={chargementAuth}
                className="text-[#5B63F6] hover:underline font-extrabold cursor-pointer"
              >
                Renvoyer le code maintenant
              </button>
            )}
          </div>
        </form>
      )}
    </LayoutAuthBase>
  );
}
