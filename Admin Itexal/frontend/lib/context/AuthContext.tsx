"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "./ToastContext";

export interface UtilisateurAuth {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  estVerifie: boolean;
  photoProfil?: string;
}

interface AuthContextType {
  estConnecte: boolean;
  utilisateur: UtilisateurAuth | null;
  chargementAuth: boolean;
  erreurAuth: string | null;
  otpMailTemp: string | null;
  seConnecter: (email: string, mdp: string) => Promise<boolean>;
  sInscrire: (nom: string, prenom: string, email: string, mdp: string) => Promise<boolean>;
  verifierOTP: (code: string) => Promise<boolean>;
  renvoyerOTP: () => Promise<boolean>;
  demanderReinitialisation: (email: string) => Promise<boolean>;
  reinitialiserMotDePasse: (code: string, nouveauMdp: string) => Promise<boolean>;
  seDeconnecter: () => void;
  effacerErreur: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CLE_SESSION_STORAGE = "cosmetic_admin_session_v1";
const CLE_OTP_TEMP = "cosmetic_admin_otp_temp_v1";

const UTILISATEUR_DEFAUT: UtilisateurAuth = {
  id: "usr_admin_01",
  nom: "Williamson",
  prenom: "Kame",
  email: "kamewilliamson@gmail.com",
  role: "Administrateur",
  estVerifie: true,
  photoProfil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurAuth | null>(null);
  const [estConnecte, setEstConnecte] = useState(false);
  const [chargementAuth, setChargementAuth] = useState(true);
  const [erreurAuth, setErreurAuth] = useState<string | null>(null);
  const [otpMailTemp, setOtpMailTemp] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  // Hydratation de la session client au démarrage
  useEffect(() => {
    try {
      const sessionSauvegardee = localStorage.getItem(CLE_SESSION_STORAGE);
      const tempMail = localStorage.getItem(CLE_OTP_TEMP);

      if (sessionSauvegardee) {
        const userParsed = JSON.parse(sessionSauvegardee);
        setUtilisateur(userParsed);
        setEstConnecte(true);
      }
      if (tempMail) {
        setOtpMailTemp(tempMail);
      }
    } catch (e) {
      console.error("Erreur lors de la lecture de la session auth", e);
    } finally {
      setChargementAuth(false);
    }
  }, []);

  // Protection réactive des routes
  useEffect(() => {
    if (chargementAuth) return;

    const estRoutePrivee = pathname.startsWith("/admin");
    const estRouteAuth =
      pathname === "/connexion" ||
      pathname === "/inscription" ||
      pathname === "/mot-de-passe-oublie" ||
      pathname === "/recuperation" ||
      pathname === "/verification-email" ||
      pathname.startsWith("/auth/");

    if (estRoutePrivee && !estConnecte) {
      toast.avertissement("Veuillez vous connecter pour accéder à l'administration.");
      router.push(`/connexion?redirect=${encodeURIComponent(pathname)}`);
    } else if (estRouteAuth && estConnecte) {
      router.push("/admin");
    }
  }, [pathname, estConnecte, chargementAuth]);

  const effacerErreur = () => setErreurAuth(null);

  // 1. Log In
  const seConnecter = async (email: string, mdp: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    // Simulation d'un délai réseau réaliste
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validation des identifiants
    const emailLower = email.toLowerCase().trim();

    if (emailLower === "desactive@cosmetic.com") {
      setErreurAuth("Ce compte administrateur a été temporairement désactivé.");
      toast.erreur("Compte désactivé. Contactez le super-administrateur.");
      setChargementAuth(false);
      return false;
    }

    if (emailLower === "unverified@cosmetic.com") {
      localStorage.setItem(CLE_OTP_TEMP, emailLower);
      setOtpMailTemp(emailLower);
      toast.info("Votre adresse email n'est pas encore vérifiée. Saisissez le code OTP.");
      setChargementAuth(false);
      router.push("/auth/otp");
      return false;
    }

    if (mdp.length < 4) {
      setErreurAuth("Identifiants incorrects. Veuillez vérifier votre adresse email et mot de passe.");
      toast.erreur("Adresse email ou mot de passe incorrect.");
      setChargementAuth(false);
      return false;
    }

    // Connexion réussie
    const userSession: UtilisateurAuth = {
      ...UTILISATEUR_DEFAUT,
      email: emailLower,
    };

    setUtilisateur(userSession);
    setEstConnecte(true);
    localStorage.setItem(CLE_SESSION_STORAGE, JSON.stringify(userSession));
    toast.succes(`Bienvenue, ${userSession.prenom} ! Connexion réussie.`);
    setChargementAuth(false);
    return true;
  };

  // 2. Sign Up
  const sInscrire = async (
    nom: string,
    prenom: string,
    email: string,
    mdp: string
  ): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    await new Promise((resolve) => setTimeout(resolve, 900));

    const emailLower = email.toLowerCase().trim();

    if (emailLower === "admin@cosmetic.com" || emailLower === "kamewilliamson@gmail.com") {
      setErreurAuth("Un compte existe déjà avec cette adresse email.");
      toast.erreur("Cette adresse email est déjà enregistrée.");
      setChargementAuth(false);
      return false;
    }

    // Stocke l'email temporaire pour la validation OTP
    localStorage.setItem(CLE_OTP_TEMP, emailLower);
    setOtpMailTemp(emailLower);
    toast.succes("Compte créé avec succès ! Un code de vérification vous a été envoyé.");
    setChargementAuth(false);
    return true;
  };

  // 3. Verification OTP (Code 123456 par exemple)
  const verifierOTP = async (code: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (code === "000000") {
      setErreurAuth("Ce code de vérification a expiré. Veuillez en demander un nouveau.");
      toast.erreur("Code expiré.");
      setChargementAuth(false);
      return false;
    }

    if (code.length < 6 || code === "111111") {
      setErreurAuth("Code de vérification incorrect. Veuillez vérifier les 6 chiffres.");
      toast.erreur("Code OTP incorrect.");
      setChargementAuth(false);
      return false;
    }

    // OTP Validé
    const userSession: UtilisateurAuth = {
      ...UTILISATEUR_DEFAUT,
      email: otpMailTemp || "nouveau.user@cosmetic.com",
      estVerifie: true,
    };

    setUtilisateur(userSession);
    setEstConnecte(true);
    localStorage.setItem(CLE_SESSION_STORAGE, JSON.stringify(userSession));
    localStorage.removeItem(CLE_OTP_TEMP);
    setOtpMailTemp(null);

    toast.succes("Votre compte a été vérifié avec succès !");
    setChargementAuth(false);
    return true;
  };

  // 4. Renvoyer OTP
  const renvoyerOTP = async (): Promise<boolean> => {
    setChargementAuth(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.info("Un nouveau code de vérification a été envoyé à votre adresse email.");
    setChargementAuth(false);
    return true;
  };

  // 5. Demande de réinitialisation mot de passe
  const demanderReinitialisation = async (email: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const emailLower = email.toLowerCase().trim();
    localStorage.setItem(CLE_OTP_TEMP, emailLower);
    setOtpMailTemp(emailLower);
    toast.succes("Un email de réinitialisation vous a été envoyé.");
    setChargementAuth(false);
    return true;
  };

  // 6. Réinitialiser le mot de passe
  const reinitialiserMotDePasse = async (code: string, nouveauMdp: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (code.length < 6) {
      setErreurAuth("Code de vérification invalide.");
      toast.erreur("Code incorrect.");
      setChargementAuth(false);
      return false;
    }

    toast.succes("Votre mot de passe a été réinitialisé avec succès !");
    setChargementAuth(false);
    return true;
  };

  // 7. Logout
  const seDeconnecter = () => {
    localStorage.removeItem(CLE_SESSION_STORAGE);
    setUtilisateur(null);
    setEstConnecte(false);
    toast.info("Vous avez été déconnecté avec succès.");
    router.push("/connexion");
  };

  return (
    <AuthContext.Provider
      value={{
        estConnecte,
        utilisateur,
        chargementAuth,
        erreurAuth,
        otpMailTemp,
        seConnecter,
        sInscrire,
        verifierOTP,
        renvoyerOTP,
        demanderReinitialisation,
        reinitialiserMotDePasse,
        seDeconnecter,
        effacerErreur,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
};
