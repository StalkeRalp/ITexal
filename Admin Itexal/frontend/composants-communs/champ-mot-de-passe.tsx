"use client";

import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";

interface ChampMotDePasseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  etiquette?: string;
  label?: string;
  valeur?: string;
  afficherIconeVerrou?: boolean;
}

export const ChampMotDePasse: React.FC<ChampMotDePasseProps> = ({
  etiquette,
  label,
  valeur,
  afficherIconeVerrou = false,
  className = "",
  value,
  onChange,
  placeholder = "••••••••",
  required,
  id,
  ...props
}) => {
  const [masque, setMasque] = useState(true);
  const labelTexte = etiquette || label;
  const valeurInput = valeur !== undefined ? valeur : value;

  return (
    <div className="w-full">
      {labelTexte && (
        <label htmlFor={id} className="block text-xs font-extrabold text-slate-700 mb-1">
          {labelTexte} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <input
          {...props}
          id={id}
          type={masque ? "password" : "text"}
          value={valeurInput}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3.5 pr-11 py-2.5 bg-[#F4F6FA] border border-slate-200/90 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium ${className}`}
        />

        <button
          type="button"
          onClick={() => setMasque(!masque)}
          aria-label={masque ? "Afficher le mot de passe" : "Masquer le mot de passe"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#4880FF] transition-colors p-1 rounded-md"
        >
          {masque ? <ViewIcon size={18} /> : <ViewOffIcon size={18} />}
        </button>
      </div>
    </div>
  );
};

export const PasswordInput = ChampMotDePasse;
