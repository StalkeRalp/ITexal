"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tick01Icon } from "hugeicons-react";

export default function PageRecuperation() {
  const [email, setEmail] = useState("");
  const [soumis, setSoumis] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demande de réinitialisation pour :", email);
    setSoumis(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6FA] flex items-center justify-center p-4">
      {/* Carte Blanche Récupération */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 text-center space-y-6">
        {/* Logo Icône bleu signature */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#4880FF] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <svg
              width="32"
              height="32"
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

        <h1 className="text-2xl font-bold text-slate-800">Recover</h1>

        {!soumis ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200/80 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Reset Your Password
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-xs font-medium space-y-2">
            <p className="font-bold text-sm flex items-center justify-center gap-1.5">
              <Tick01Icon size={18} />
              <span>Lien envoyé !</span>
            </p>
            <p>Un email de réinitialisation a été envoyé à {email}.</p>
          </div>
        )}

        <div className="pt-2 text-xs text-slate-500">
          Remember password?{" "}
          <Link href="/connexion" className="text-[#4880FF] font-bold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
