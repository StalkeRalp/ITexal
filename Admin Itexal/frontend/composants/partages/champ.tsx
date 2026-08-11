import React from "react";

interface ChampProps extends React.InputHTMLAttributes<HTMLInputElement> {
  etiquette?: string;
  erreur?: string;
  texteAide?: string;
}

export const Champ = React.forwardRef<HTMLInputElement, ChampProps>(
  ({ etiquette, erreur, texteAide, className = "", id, ...props }, ref) => {
    const fieldId = id || (etiquette ? etiquette.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {etiquette && (
          <label htmlFor={fieldId} className="text-xs font-semibold text-slate-300">
            {etiquette}
          </label>
        )}
        <input
          id={fieldId}
          ref={ref}
          className={`w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all ${
            erreur ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500" : ""
          } ${className}`}
          {...props}
        />
        {erreur && <span className="text-xs text-rose-400 font-medium">{erreur}</span>}
        {!erreur && texteAide && <span className="text-xs text-slate-400">{texteAide}</span>}
      </div>
    );
  }
);

Champ.displayName = "Champ";
