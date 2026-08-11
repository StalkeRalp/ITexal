"use client";

import React from "react";
import { ToastProvider } from "@/lib/context/ToastContext";
import { AuthProvider } from "@/lib/context/AuthContext";

export const FournisseurGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
};
