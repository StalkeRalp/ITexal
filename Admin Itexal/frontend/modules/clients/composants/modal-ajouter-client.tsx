"use client";

import React, { useState } from "react";
import { Cancel01Icon, Camera01Icon } from "hugeicons-react";

interface ModalAjouterClientProps {
  ouvert: boolean;
  onFermer: () => void;
  onAjouter: (nouveauClient: {
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    genre: "Male" | "Female";
    typeGamme: string;
  }) => void;
}

export const ModalAjouterClient: React.FC<ModalAjouterClientProps> = ({
  ouvert,
  onFermer,
  onAjouter,
}) => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [genre, setGenre] = useState<"Male" | "Female">("Male");
  const [adresse, setAdresse] = useState("");
  const [typeGamme, setTypeGamme] = useState("Soin Visage");

  if (!ouvert) return null;

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom || !nom || !email) {
      alert("Veuillez remplir au moins le Prénom, le Nom et l'Email.");
      return;
    }

    onAjouter({
      nom: `${prenom} ${nom}`,
      email,
      telephone: telephone || "+237 600 00 00 00",
      adresse: adresse || "Douala Akwa",
      genre,
      typeGamme,
    });

    // Reset & close
    setPrenom("");
    setNom("");
    setEmail("");
    setTelephone("");
    setAdresse("");
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onFermer}
          aria-label="Fermer la fenêtre"
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 font-extrabold flex items-center justify-center text-xs transition-colors"
        >
          <Cancel01Icon size={16} strokeWidth={2} />
        </button>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-800 tracking-tight">
          Add Customer
        </h3>

        <form onSubmit={soumettre} className="space-y-4">
          {/* Avatar Upload Circle */}
          <div className="flex justify-center py-2">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-[#4880FF] cursor-pointer transition-colors">
              <Camera01Icon size={28} />
            </div>
          </div>

          {/* First Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="Ex: John"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Ex: Deo"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+237 699 00 11 22"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          {/* Gender Select */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Gender
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value as "Male" | "Female")}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#4880FF] cursor-pointer"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Gamme / Type */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Gamme de prédilection
            </label>
            <select
              value={typeGamme}
              onChange={(e) => setTypeGamme(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#4880FF] cursor-pointer"
            >
              <option value="Soin Visage">Soin Visage</option>
              <option value="Gamme Capillaire">Gamme Capillaire</option>
              <option value="Soin du Corps">Soin du Corps</option>
              <option value="Huiles Essentielles">Huiles Essentielles</option>
              <option value="Fashion & Beauty">Fashion & Beauty</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
