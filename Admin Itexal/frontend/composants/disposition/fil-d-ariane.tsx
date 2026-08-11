"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const FilDAriane: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-xs text-slate-400 gap-2">
      <Link href="/admin" className="hover:text-slate-200 transition-colors">
        Admin
      </Link>
      {segments.slice(1).map((segment, index) => {
        const url = `/admin/${segments.slice(1, index + 2).join("/")}`;
        const estDernier = index === segments.length - 2;

        return (
          <React.Fragment key={url}>
            <span className="text-slate-600">/</span>
            {estDernier ? (
              <span className="font-semibold text-indigo-400 capitalize">{segment}</span>
            ) : (
              <Link href={url} className="hover:text-slate-200 capitalize">
                {segment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
