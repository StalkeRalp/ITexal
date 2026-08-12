/**
 * Utilitaires de formatage (prix, monnaie, dates) pour l'espace Administrateur Cosmetic Admin
 */

export function formaterPrix(montant: number, devise: string = "FCFA"): string {
  if (isNaN(montant) || montant === null || montant === undefined) return `0 ${devise}`;
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(montant) + ` ${devise}`
  );
}

export function formaterDate(date: string | Date | undefined | null, inclureHeure: boolean = true): string {
  if (!date) return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "12 août 2026";

  if (inclureHeure) {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formaterDateCourte(date: string | Date | undefined | null): string {
  if (!date) return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "12/08/2026";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

// Fallback d'images cosmétiques haute résolution garanties par catégorie
const FALLBACKS_COSMETIQUE: Record<string, string> = {
  "Lèvres": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80",
  "Teint": "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop&q=80",
  "Yeux": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80",
  "Soin du Visage": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
  "Soin du Corps": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
  "Gamme Capillaire": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80",
  "Soins & Ongles": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80",
};

const DEFAULT_IMAGE_FALLBACK = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80";

export function obtenirImageSecurisee(url: string | undefined | null, categorie?: string): string {
  if (!url || typeof url !== "string" || url.trim() === "" || url === "/placeholder.png") {
    if (categorie && FALLBACKS_COSMETIQUE[categorie]) {
      return FALLBACKS_COSMETIQUE[categorie];
    }
    return DEFAULT_IMAGE_FALLBACK;
  }
  return url;
}

export function gererErreurChargementImage(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  categorie?: string
) {
  const target = e.currentTarget;
  if (categorie && FALLBACKS_COSMETIQUE[categorie]) {
    target.src = FALLBACKS_COSMETIQUE[categorie];
  } else {
    target.src = DEFAULT_IMAGE_FALLBACK;
  }
}

