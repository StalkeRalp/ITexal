"use client";

import React, { useState } from "react";
import { ViewIcon, ViewOffIcon, LockKeyIcon } from "hugeicons-react";

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
  afficherIconeVerrou = true,
  className = "",
  value,
  onChange,
  placeholder = "••••••••",
  required,
  ...props
}) => {
  const [masque, setMasque] = useState(true);
  const labelTexte = etiquette || label;
  const valeurInput = valeur !== undefined ? valeur : value;

  return (
    <div className="w-full space-y-1">
      {labelTexte && (
        <label className="block text-xs font-bold text-slate-700">
          {labelTexte} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {afficherIconeVerrou && (
          <LockKeyIcon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        )}

        <input
          {...props}
          type={masque ? "password" : "text"}
          value={valeurInput}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${
            afficherIconeVerrou ? "pl-10" : "pl-4"
          } pr-11 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#4880FF] transition-all font-mono ${className}`}
        />

        <button
          type="button"
          onClick={() => setMasque(!masque)}
          aria-label={masque ? "Afficher le mot de passe" : "Masquer le mot de passe"}
          title={masque ? "Afficher le mot de passe" : "Masquer le mot de passe"}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#4880FF] transition-colors rounded-lg"
        >
          {masque ? (
            <ViewOffIcon size={18} strokeWidth={2} />
          ) : (
            <ViewIcon size={18} strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
};
