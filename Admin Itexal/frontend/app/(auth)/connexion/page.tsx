"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function PageConnexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [voirMotDePasse, setVoirMotDePasse] = useState(false);
  const [seSouvenir, setSeSouvenir] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion avec :", { email, motDePasse, seSouvenir });
    // Redirection vers le dashboard admin
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAFBFD]">
      {/* Colonne Gauche : Formulaire de Connexion (Design DashStack Login.png) */}
      <div className="w-full md:w-[480px] lg:w-[520px] bg-white min-h-screen p-8 sm:p-12 flex flex-col justify-between z-10 border-r border-slate-100 shadow-sm shrink-0">
        <div>
          {/* Logo Icône bleu signature */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#5D5FEF] flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 4 8-8" />
                <circle cx="9" cy="11" r="2" fill="white" />
                <circle cx="13" cy="15" r="2" fill="white" />
                <circle cx="21" cy="7" r="2" fill="white" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 text-center mb-8">
            Log in
          </h1>

          {/* Boutons de connexion sociale */}
          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              className="flex-1 py-3 px-4 bg-[#F8F9FD] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="flex-1 py-3 px-4 bg-[#F8F9FD] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all"
            >
              <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* Séparateur "Or" */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-slate-400 font-medium absolute">
              Or
            </span>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200/80 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5D5FEF] focus:bg-white transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={voirMotDePasse ? "text" : "password"}
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-3 bg-[#F8F9FD] border border-slate-200/80 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5D5FEF] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setVoirMotDePasse(!voirMotDePasse)}
                  aria-label="Afficher ou masquer le mot de passe"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  {voirMotDePasse ? <ViewOffIcon size={16} /> : <ViewIcon size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                <input
                  type="checkbox"
                  checked={seSouvenir}
                  onChange={(e) => setSeSouvenir(e.target.checked)}
                  className="rounded border-slate-300 text-[#5D5FEF] focus:ring-0"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/mot-de-passe-oublie"
                className="text-[#5D5FEF] hover:underline font-semibold"
              >
                Reset Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#5D5FEF] hover:bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 font-medium pt-6">
          Don’t have account yet?{" "}
          <Link
            href="/inscription"
            className="text-[#5D5FEF] font-bold hover:underline"
          >
            New Account
          </Link>
        </div>
      </div>

      {/* Colonne Droite : Illustration SVG centrée (login.svg) */}
      <div className="flex-1 bg-[#FAFBFD] hidden md:flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        <div className="max-w-xl w-full flex justify-center">
          <Image
            src="/login.svg"
            alt="Illustration ITexal Connexion"
            width={600}
            height={550}
            priority
            className="w-full h-auto max-h-[80vh] object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
