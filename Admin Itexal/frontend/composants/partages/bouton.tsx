import React from "react";

interface BoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primaire" | "secondaire" | "danger" | "neutre";
  taille?: "sm" | "md" | "lg";
  enChargement?: boolean;
}

export const Bouton: React.FC<BoutonProps> = ({
  children,
  variante = "primaire",
  taille = "md",
  enChargement = false,
  className = "",
  disabled,
  ...props
}) => {
  const stylesBase =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const stylesVariantes = {
    primaire: "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500",
    secondaire: "bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500",
    danger: "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500",
    neutre: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 focus:ring-slate-500",
  };

  const stylesTailles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`${stylesBase} ${stylesVariantes[variante]} ${stylesTailles[taille]} ${className}`}
      disabled={disabled || enChargement}
      {...props}
    >
      {enChargement ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Chargement...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
