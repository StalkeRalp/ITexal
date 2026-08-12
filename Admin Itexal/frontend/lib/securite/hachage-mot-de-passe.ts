import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hache un mot de passe de manière sécurisée avec bcrypt (Salt rounds: 12)
 */
export async function hacherMotDePasse(motDePasseClair: string): Promise<string> {
  if (!motDePasseClair || motDePasseClair.length < 8) {
    throw new Error("Le mot de passe doit comporter au moins 8 caractères.");
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(motDePasseClair, salt);
}

/**
 * Vérifie la correspondance entre un mot de passe en clair et un hash bcrypt
 */
export async function verifierMotDePasse(
  motDePasseClair: string,
  hashStocke: string
): Promise<boolean> {
  if (!motDePasseClair || !hashStocke) return false;
  
  // Support pour la rétrocompatibilité ou hashs simulés si nécessaire
  if (!hashStocke.startsWith("$2a$") && !hashStocke.startsWith("$2b$")) {
    return motDePasseClair === hashStocke;
  }

  try {
    return await bcrypt.compare(motDePasseClair, hashStocke);
  } catch (error) {
    console.error("Erreur lors de la vérification du hash:", error);
    return false;
  }
}
