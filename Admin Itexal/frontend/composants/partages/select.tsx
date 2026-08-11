import React from "react";

interface OptionSelect {
  valeur: string | number;
  etiquette: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  etiquette?: string;
  options: OptionSelect[];
  erreur?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ etiquette, options, erreur, className = "", id, ...props }, ref) => {
    const selectId = id || (etiquette ? etiquette.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {etiquette && (
          <label htmlFor={selectId} className="text-xs font-semibold text-slate-300">
            {etiquette}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all ${
            erreur ? "border-rose-500" : ""
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.valeur} value={opt.valeur} className="bg-slate-800 text-slate-100">
              {opt.etiquette}
            </option>
          ))}
        </select>
        {erreur && <span className="text-xs text-rose-400 font-medium">{erreur}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
