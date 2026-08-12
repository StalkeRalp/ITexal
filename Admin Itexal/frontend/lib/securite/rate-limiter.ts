interface EntreeTentative {
  compte: number;
  premierEchec: number;
  bloqueJusquA: number | null;
}

// In-Memory Rate Limiter Store (Sliding window)
const tentativesStore = new Map<string, EntreeTentative>();

const SEUIL_MAX_TENTATIVES = 5; // 5 échecs autorisés
const FENETRE_TEMPS_MS = 15 * 60 * 1000; // 15 minutes
const DELAI_BLOCAGE_BASE_MS = 60 * 1000; // 1 minute de blocage initial

/**
 * Vérifie si la requête / tentative est autorisée pour cet identifiant ou cette adresse IP
 */
export function verifierLimitationTentatives(identifiant: string): {
  autorise: boolean;
  tentativesRestantes: number;
  secondesRestantesBlocage: number;
} {
  const maintenant = Date.now();
  const entree = tentativesStore.get(identifiant);

  if (!entree) {
    return {
      autorise: true,
      tentativesRestantes: SEUIL_MAX_TENTATIVES,
      secondesRestantesBlocage: 0,
    };
  }

  // Vérification de déblocage temporaire expirations
  if (entree.bloqueJusquA && maintenant < entree.bloqueJusquA) {
    const secondesRestantes = Math.ceil((entree.bloqueJusquA - maintenant) / 1000);
    return {
      autorise: false,
      tentativesRestantes: 0,
      secondesRestantesBlocage: secondesRestantes,
    };
  }

  // Réinitialisation après expiration de la fenêtre de 15 minutes
  if (maintenant - entree.premierEchec > FENETRE_TEMPS_MS) {
    tentativesStore.delete(identifiant);
    return {
      autorise: true,
      tentativesRestantes: SEUIL_MAX_TENTATIVES,
      secondesRestantesBlocage: 0,
    };
  }

  return {
    autorise: true,
    tentativesRestantes: Math.max(0, SEUIL_MAX_TENTATIVES - entree.compte),
    secondesRestantesBlocage: 0,
  };
}

/**
 * Enregistre un échec de tentative de connexion et applique un délai ou un blocage si nécessaire
 */
export function enregistrerEchecTentative(identifiant: string): {
  compteActuel: number;
  estBloque: boolean;
  secondesBlocage: number;
} {
  const maintenant = Date.now();
  let entree = tentativesStore.get(identifiant);

  if (!entree || maintenant - entree.premierEchec > FENETRE_TEMPS_MS) {
    entree = {
      compte: 1,
      premierEchec: maintenant,
      bloqueJusquA: null,
    };
  } else {
    entree.compte += 1;
  }

  // Déclencher le blocage si le seuil est dépassé
  if (entree.compte >= SEUIL_MAX_TENTATIVES) {
    // Calcul de la pénalité progressive : 1 min, 5 min, 15 min...
    const facteurMultiplicateur = Math.pow(2, entree.compte - SEUIL_MAX_TENTATIVES);
    const dureeBlocage = Math.min(DELAI_BLOCAGE_BASE_MS * facteurMultiplicateur, FENETRE_TEMPS_MS);
    entree.bloqueJusquA = maintenant + dureeBlocage;
  }

  tentativesStore.set(identifiant, entree);

  const secondesBlocage = entree.bloqueJusquA
    ? Math.ceil((entree.bloqueJusquA - maintenant) / 1000)
    : 0;

  return {
    compteActuel: entree.compte,
    estBloque: !!entree.bloqueJusquA && maintenant < entree.bloqueJusquA,
    secondesBlocage,
  };
}

/**
 * Réinitialise le compteur de tentatives lors d'une connexion réussie
 */
export function reinitialiserTentatives(identifiant: string): void {
  tentativesStore.delete(identifiant);
}
