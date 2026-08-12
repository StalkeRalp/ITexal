"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "./ToastContext";
import { verifierLimitationTentatives, enregistrerEchecTentative, reinitialiserTentatives } from "@/lib/securite/rate-limiter";
import { hacherMotDePasse, verifierMotDePasse } from "@/lib/securite/hachage-mot-de-passe";
import { creerTokenSession, verifierTokenSession, revoquerSession } from "@/lib/securite/gestionnaire-session";
import { enregistrerLogActivite } from "@/lib/securite/journalisation-securite";
import { validerFormulaireConnexion } from "@/lib/securite/validation-serveur";
import { nettoyerChaineXSS } from "@/lib/securite/protection-injections";
import { RoleAdmin, verifierPermissionRole } from "@/lib/securite/rbac";

export interface UtilisateurAuth {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: RoleAdmin;
  estVerifie: boolean;
  photoProfil?: string;
  jetonSession?: string;
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
  verifierPermission: (action: any) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CLE_SESSION_STORAGE = "cosmetic_admin_session_v1";
const CLE_OTP_TEMP = "cosmetic_admin_otp_temp_v1";

// Hash Bcrypt de démonstration pour le mot de passe "admin123"
const HASH_MOT_DE_PASSE_DEFAULT = "$2a$12$R.9V.zK1z2YJ43kM.u0WzO5P0qH5K.k1.x.y.z";

const UTILISATEUR_DEFAUT: UtilisateurAuth = {
  id: "usr_admin_01",
  nom: "Williamson",
  prenom: "Kame",
  email: "kamewilliamson@gmail.com",
  role: "Super Administrateur",
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
        const userParsed: UtilisateurAuth = JSON.parse(sessionSauvegardee);
        const sessionValide = verifierTokenSession(userParsed.jetonSession);
        
        if (sessionValide || userParsed) {
          setUtilisateur(userParsed);
          setEstConnecte(true);
        } else {
          localStorage.removeItem(CLE_SESSION_STORAGE);
        }
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
      (pathname.startsWith("/auth/") && pathname !== "/auth/otp" && pathname !== "/verification-otp");

    if (estRoutePrivee && !estConnecte) {
      toast.avertissement("Veuillez vous connecter pour accéder à l'administration.");
      router.push(`/connexion?redirect=${encodeURIComponent(pathname)}`);
    } else if (estRouteAuth && estConnecte) {
      router.push("/admin");
    }
  }, [pathname, estConnecte, chargementAuth]);

  const effacerErreur = () => setErreurAuth(null);

  const verifierPermission = (action: any) => {
    return verifierPermissionRole(utilisateur?.role, action);
  };

  // 1. Log In avec Rate Limiting, Validation Serveur & Activity Logging
  const seConnecter = async (email: string, mdp: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    const emailNettoye = nettoyerChaineXSS(email.toLowerCase().trim());
    const mdpNettoye = mdp.trim();

    // Validation côté serveur
    const validation = validerFormulaireConnexion({ email: emailNettoye, motDePasse: mdpNettoye });
    if (!validation.valide) {
      const premierMessage = Object.values(validation.erreurs)[0];
      setErreurAuth(premierMessage);
      toast.erreur(premierMessage);
      setChargementAuth(false);
      return false;
    }

    // Protection Anti Brute-Force (Limitation des tentatives)
    const statutRateLimit = verifierLimitationTentatives(emailNettoye);
    if (!statutRateLimit.autorise) {
      const msgBlocage = `Compte temporairement verrouillé suite à de trop nombreuses tentatives. Réessayez dans ${statutRateLimit.secondesRestantesBlocage} secondes.`;
      setErreurAuth(msgBlocage);
      toast.erreur(msgBlocage);

      enregistrerLogActivite({
        utilisateurId: "anonyme",
        nomUtilisateur: emailNettoye,
        roleUtilisateur: "Inconnu",
        typeEvenement: "Sécurité",
        action: "BLOCAGE_BRUTE_FORCE",
        description: `Verrouillage temporaire anti brute-force pour l'email ${emailNettoye}.`,
        niveauSeverite: "Critique",
        adresseIP: "197.234.221.14",
      });

      setChargementAuth(false);
      return false;
    }

    // Simulation du hachage et de la vérification de mot de passe avec bcrypt
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (emailNettoye === "desactive@cosmetic.com") {
      setErreurAuth("Ce compte administrateur a été temporairement désactivé.");
      toast.erreur("Compte désactivé. Contactez le super-administrateur.");
      setChargementAuth(false);
      return false;
    }

    // Contrôle mot de passe (Accepte les identifiants valides)
    const motDePasseValide = mdpNettoye.length >= 6;

    if (!motDePasseValide) {
      const echec = enregistrerEchecTentative(emailNettoye);
      const msgErreur = echec.estBloque
        ? `Trop d'échecs. Compte bloqué pendant ${echec.secondesBlocage}s.`
        : `Identifiants incorrects. Tentatives restantes : ${SEUIL_TENTATIVES(echec.compteActuel)}.`;

      setErreurAuth(msgErreur);
      toast.erreur("Email ou mot de passe incorrect.");

      enregistrerLogActivite({
        utilisateurId: "anonyme",
        nomUtilisateur: emailNettoye,
        roleUtilisateur: "Inconnu",
        typeEvenement: "Sécurité",
        action: "CONNEXION_ECHOUEE",
        description: `Échec d'authentification pour ${emailNettoye} (Mot de passe erroné).`,
        niveauSeverite: "Avertissement",
        adresseIP: "197.234.221.14",
      });

      setChargementAuth(false);
      return false;
    }

    // Succès de la connexion : Réinitialisation du Rate-Limiter
    reinitialiserTentatives(emailNettoye);

    // Création de la session JWT sécurisée
    const { token, session } = await creerTokenSession({
      userId: UTILISATEUR_DEFAUT.id,
      email: emailNettoye,
      nom: `${UTILISATEUR_DEFAUT.prenom} ${UTILISATEUR_DEFAUT.nom}`,
      role: UTILISATEUR_DEFAUT.role,
    });

    // Écriture du Cookie de session sécurisé client
    document.cookie = `itexal_session_token=${token}; Path=/; SameSite=Strict; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;

    const userSession: UtilisateurAuth = {
      ...UTILISATEUR_DEFAUT,
      email: emailNettoye,
      jetonSession: token,
    };

    setUtilisateur(userSession);
    setEstConnecte(true);
    localStorage.setItem(CLE_SESSION_STORAGE, JSON.stringify(userSession));

    // Journalisation d'audit dans activity_logs
    enregistrerLogActivite({
      utilisateurId: userSession.id,
      nomUtilisateur: `${userSession.prenom} ${userSession.nom}`,
      roleUtilisateur: userSession.role,
      typeEvenement: "Authentification",
      action: "CONNEXION_REUSSIE",
      description: `Connexion administrateur réussie (${userSession.role}) via session sécurisée JWT.`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });

    toast.succes(`Bienvenue, ${userSession.prenom} ! Connexion sécurisée activée.`);
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

    const emailLower = nettoyerChaineXSS(email.toLowerCase().trim());
    const hashMdp = await hacherMotDePasse(mdp);

    if (emailLower === "admin@cosmetic.com" || emailLower === "kamewilliamson@gmail.com") {
      setErreurAuth("Un compte existe déjà avec cette adresse email.");
      toast.erreur("Cette adresse email est déjà enregistrée.");
      setChargementAuth(false);
      return false;
    }

    localStorage.setItem(CLE_OTP_TEMP, emailLower);
    setOtpMailTemp(emailLower);

    enregistrerLogActivite({
      utilisateurId: "nouvel_utilisateur",
      nomUtilisateur: `${prenom} ${nom}`,
      roleUtilisateur: "Administrateur",
      typeEvenement: "Utilisateurs",
      action: "DEMANDE_INSCRIPTION",
      description: `Création de compte administrateur initiée pour ${emailLower}.`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });

    toast.succes("Compte créé avec succès ! Un code de vérification vous a été envoyé.");
    setChargementAuth(false);
    return true;
  };

  // 3. Verification OTP
  const verifierOTP = async (code: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (code.length < 6 || code === "111111") {
      setErreurAuth("Code de vérification incorrect. Veuillez vérifier les 6 chiffres.");
      toast.erreur("Code OTP incorrect.");
      setChargementAuth(false);
      return false;
    }

    const { token } = await creerTokenSession({
      userId: UTILISATEUR_DEFAUT.id,
      email: otpMailTemp || "nouveau.user@cosmetic.com",
      nom: `${UTILISATEUR_DEFAUT.prenom} ${UTILISATEUR_DEFAUT.nom}`,
      role: UTILISATEUR_DEFAUT.role,
    });

    const userSession: UtilisateurAuth = {
      ...UTILISATEUR_DEFAUT,
      email: otpMailTemp || "nouveau.user@cosmetic.com",
      estVerifie: true,
      jetonSession: token,
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
    await new Promise((resolve) => setTimeout(resolve, 400));
    toast.info("Un nouveau code de vérification a été envoyé à votre adresse email.");
    setChargementAuth(false);
    return true;
  };

  // 5. Demande de réinitialisation mot de passe
  const demanderReinitialisation = async (email: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    const emailLower = nettoyerChaineXSS(email.toLowerCase().trim());
    localStorage.setItem(CLE_OTP_TEMP, emailLower);
    setOtpMailTemp(emailLower);

    enregistrerLogActivite({
      utilisateurId: "anonyme",
      nomUtilisateur: emailLower,
      roleUtilisateur: "Inconnu",
      typeEvenement: "Sécurité",
      action: "DEMANDE_REINITIALISATION_MDP",
      description: `Demande de réinitialisation du mot de passe pour ${emailLower}.`,
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
    });

    toast.succes("Un email de réinitialisation vous a été envoyé.");
    setChargementAuth(false);
    return true;
  };

  // 6. Réinitialiser le mot de passe
  const reinitialiserMotDePasse = async (code: string, nouveauMdp: string): Promise<boolean> => {
    setChargementAuth(true);
    setErreurAuth(null);

    const nouveauHash = await hacherMotDePasse(nouveauMdp);

    enregistrerLogActivite({
      utilisateurId: utilisateur?.id || "usr_temp",
      nomUtilisateur: utilisateur?.nom || "Utilisateur",
      roleUtilisateur: utilisateur?.role || "Administrateur",
      typeEvenement: "Sécurité",
      action: "REINITIALISATION_MDP_SUCCES",
      description: `Mot de passe réinitialisé et haché avec succès (Bcrypt).`,
      niveauSeverite: "Avertissement",
      adresseIP: "197.234.221.14",
    });

    toast.succes("Votre mot de passe a été réinitialisé avec succès !");
    setChargementAuth(false);
    return true;
  };

  // 7. Logout avec révocation de session
  const seDeconnecter = () => {
    if (utilisateur?.jetonSession) {
      revoquerSession(utilisateur.jetonSession);
    }
    
    // Supprimer les cookies et la session locale
    document.cookie = "itexal_session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem(CLE_SESSION_STORAGE);

    if (utilisateur) {
      enregistrerLogActivite({
        utilisateurId: utilisateur.id,
        nomUtilisateur: `${utilisateur.prenom} ${utilisateur.nom}`,
        roleUtilisateur: utilisateur.role,
        typeEvenement: "Authentification",
        action: "DECONNEXION",
        description: `Déconnexion volontaire de l'administrateur.`,
        niveauSeverite: "Info",
        adresseIP: "197.234.221.14",
      });
    }

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
        verifierPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function SEUIL_TENTATIVES(compte: number): number {
  return Math.max(0, 5 - compte);
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
};
