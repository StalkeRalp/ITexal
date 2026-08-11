"use client";

import React from "react";
import { BarreLaterale } from "@/composants/disposition/barre-laterale";
import { EnTete } from "@/composants/disposition/en-tete";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { NotificationProvider } from "@/lib/context/NotificationContext";
import { FavorisProvider } from "@/lib/context/FavorisContext";
import { ToastProvider } from "@/lib/context/ToastContext";
import { ProduitsProvider } from "@/lib/context/ProduitsContext";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <FavorisProvider>
          <ProduitsProvider>
            <ToastProvider>
            <div className="flex min-h-screen bg-[#F5F6FA] text-slate-800 font-sans">
              {/* Sidebar navigation */}
              <BarreLaterale />

              {/* Zone principale */}
              <div className="flex-1 flex flex-col min-w-0">
                <EnTete />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto animate-page-entrance">
                  {children}
                </main>
              </div>
            </div>
          </ToastProvider>
        </ProduitsProvider>
      </FavorisProvider>
    </NotificationProvider>
    </LanguageProvider>
  );
}
