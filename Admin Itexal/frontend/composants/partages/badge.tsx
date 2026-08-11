import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variante?: "succes" | "avertissement" | "erreur" | "info" | "neutre";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variante = "neutre",
  className = "",
}) => {
  const stylesVariantes = {
    succes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    avertissement: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    erreur: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    info: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    neutre: "bg-slate-700/40 text-slate-300 border-slate-600/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stylesVariantes[variante]} ${className}`}
    >
      {children}
    </span>
  );
};
