export interface ResultatValidation {
  valide: boolean;
  erreurs: Record<string, string>;
}

/**
 * Valide les identifiants de connexion (Email & Mot de passe)
 */
export function validerFormulaireConnexion(donnees: {
  email?: string;
  motDePasse?: string;
}): ResultatValidation {
  const erreurs: Record<string, string> = {};

  if (!donnees.email || !donnees.email.trim()) {
    erreurs.email = "L'adresse email est obligatoire.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.email.trim())) {
    erreurs.email = "Format d'adresse email invalide.";
  }

  if (!donnees.motDePasse || !donnees.motDePasse.trim()) {
    erreurs.motDePasse = "Le mot de passe est obligatoire.";
  } else if (donnees.motDePasse.length < 6) {
    erreurs.motDePasse = "Le mot de passe doit comporter au moins 6 caractères.";
  }

  return {
    valide: Object.keys(erreurs).length === 0,
    erreurs,
  };
}

/**
 * Valide les entrées lors de la création / modification d'un produit
 */
export function validerDonneesProduit(donnees: {
  nom?: string;
  prix?: number | string;
  stock?: number | string;
  categorieId?: string;
}): ResultatValidation {
  const erreurs: Record<string, string> = {};

  if (!donnees.nom || !donnees.nom.trim()) {
    erreurs.nom = "Le nom du produit est obligatoire.";
  } else if (donnees.nom.trim().length < 3) {
    erreurs.nom = "Le nom doit comporter au moins 3 caractères.";
  }

  const prixNum = Number(donnees.prix);
  if (isNaN(prixNum) || prixNum <= 0) {
    erreurs.prix = "Le prix doit être un nombre strictement supérieur à 0.";
  }

  const stockNum = Number(donnees.stock);
  if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
    erreurs.stock = "Le stock doit être un nombre entier positif ou nul.";
  }

  if (!donnees.categorieId) {
    erreurs.categorieId = "La catégorie est obligatoire.";
  }

  return {
    valide: Object.keys(erreurs).length === 0,
    erreurs,
  };
}

/**
 * Valide la complexité d'un mot de passe (min 8 car., 1 majuscule, 1 chiffre, 1 car. spécial)
 */
export function validerComplexiteMotDePasse(motDePasse: string): ResultatValidation {
  const erreurs: Record<string, string> = {};

  if (motDePasse.length < 8) {
    erreurs.longueur = "Au moins 8 caractères.";
  }
  if (!/[A-Z]/.test(motDePasse)) {
    erreurs.majuscule = "Au moins une lettre majuscule.";
  }
  if (!/[0-9]/.test(motDePasse)) {
    erreurs.chiffre = "Au moins un chiffre.";
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(motDePasse)) {
    erreurs.symbole = "Au moins un caractère spécial.";
  }

  return {
    valide: Object.keys(erreurs).length === 0,
    erreurs,
  };
}
