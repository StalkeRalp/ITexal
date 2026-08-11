"use client";

import React from "react";
import { ToastProvider } from "@/lib/context/ToastContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { ProfilProvider } from "@/lib/context/ProfilContext";
import { ProduitsProvider } from "@/lib/context/ProduitsContext";
import { CommandesProvider } from "@/lib/context/CommandesContext";
import { NotificationProvider } from "@/lib/context/NotificationContext";
import { FavorisProvider } from "@/lib/context/FavorisContext";

export const FournisseurGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <LanguageProvider>
        <AuthProvider>
          <ProfilProvider>
            <ProduitsProvider>
              <CommandesProvider>
                <NotificationProvider>
                  <FavorisProvider>
                    {children}
                  </FavorisProvider>
                </NotificationProvider>
              </CommandesProvider>
            </ProduitsProvider>
          </ProfilProvider>
        </AuthProvider>
      </LanguageProvider>
    </ToastProvider>
  );
};
