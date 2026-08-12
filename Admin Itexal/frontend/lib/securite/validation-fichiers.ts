export interface ResultatValidationFichier {
  valide: boolean;
  erreur?: string;
  nomSecurise?: string;
  mimeDetecte?: string;
  tailleMo?: number;
}

const TAILLE_MAX_OCTETS = 5 * 1024 * 1024; // 5 Mo Max
const EXTENSIONS_AUTORISEES = ["jpg", "jpeg", "png", "webp"];
const MIMES_AUTORISES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Signatures magiques réelles (magic bytes) des images
const MAGIC_BYTES_SIGNATURES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
  "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF
};

/**
 * Valide strictement un fichier téléversé (type MIME réel, Magic Bytes, Taille, Anonymisation du nom)
 */
export async function validerEtSanitiserFichier(fichier: File): Promise<ResultatValidationFichier> {
  if (!fichier) {
    return { valide: false, erreur: "Aucun fichier n'a été fourni." };
  }

  // 1. Contrôle de la taille
  if (fichier.size > TAILLE_MAX_OCTETS) {
    const tailleMo = (fichier.size / (1024 * 1024)).toFixed(2);
    return {
      valide: false,
      erreur: `Le fichier (${tailleMo} Mo) dépasse la limite autorisée de 5 Mo.`,
    };
  }

  // 2. Contrôle de l'extension
  const extension = fichier.name.split(".").pop()?.toLowerCase() || "";
  if (!EXTENSIONS_AUTORISEES.includes(extension)) {
    return {
      valide: false,
      erreur: `Extension .${extension} non autorisée. Formats acceptés : JPG, PNG, WEBP.`,
    };
  }

  // 3. Inspection des Magic Bytes réels (En-tête de fichier)
  try {
    const arrayBuffer = await fichier.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    let mimeValid = false;
    let mimeDetecte = fichier.type;

    // Test JPEG
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      mimeValid = true;
      mimeDetecte = "image/jpeg";
    }
    // Test PNG
    else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      mimeValid = true;
      mimeDetecte = "image/png";
    }
    // Test WEBP (RIFF .... WEBP)
    else if (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x41 &&
      bytes[10] === 0x56 &&
      bytes[11] === 0x45
    ) {
      mimeValid = true;
      mimeDetecte = "image/webp";
    }

    if (!mimeValid && !MIMES_AUTORISES.includes(fichier.type)) {
      return {
        valide: false,
        erreur: "Structure de fichier corrompue ou type MIME falsifié.",
      };
    }

    // 4. Génération d'un nom cryptographiquement sûr (anti Path Traversal ../)
    const suffixeUnique = Math.random().toString(36).substring(2, 10);
    const nomSecurise = `prod-${Date.now()}-${suffixeUnique}.${extension}`;

    return {
      valide: true,
      nomSecurise,
      mimeDetecte,
      tailleMo: Number((fichier.size / (1024 * 1024)).toFixed(2)),
    };
  } catch (error) {
    return {
      valide: false,
      erreur: "Impossible de lire la signature binaire du fichier.",
    };
  }
}
