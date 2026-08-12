import { commonFR, navigationFR, dashboardFR, productsFR, categoriesFR, marquesFR, ordersFR, stocksFR, clientsFR, promotionsFR, contenusFR, utilisateursFR, journalFR, favorisFR, parametresFR, statisticsFR, notificationsFR, profileFR, authenticationFR, legalFR } from "./locales/fr";
import { commonEN, navigationEN, dashboardEN, productsEN, categoriesEN, marquesEN, ordersEN, stocksEN, clientsEN, promotionsEN, contenusEN, utilisateursEN, journalEN, favorisEN, parametresEN, statisticsEN, notificationsEN, profileEN, authenticationEN, legalEN } from "./locales/en";

export type Langue = "fr" | "en";

export const translations = {
  fr: {
    common: commonFR,
    navigation: navigationFR,
    dashboard: dashboardFR,
    products: productsFR,
    categories: categoriesFR,
    marques: marquesFR,
    orders: ordersFR,
    stocks: stocksFR,
    clients: clientsFR,
    promotions: promotionsFR,
    contenus: contenusFR,
    utilisateurs: utilisateursFR,
    journal: journalFR,
    favoris: favorisFR,
    parametres: parametresFR,
    statistics: statisticsFR,
    notifications: notificationsFR,
    profile: profileFR,
    authentication: authenticationFR,
    legal: legalFR,
  },
  en: {
    common: commonEN,
    navigation: navigationEN,
    dashboard: dashboardEN,
    products: productsEN,
    categories: categoriesEN,
    marques: marquesEN,
    orders: ordersEN,
    stocks: stocksEN,
    clients: clientsEN,
    promotions: promotionsEN,
    contenus: contenusEN,
    utilisateurs: utilisateursEN,
    journal: journalEN,
    favoris: favorisEN,
    parametres: parametresEN,
    statistics: statisticsEN,
    notifications: notificationsEN,
    profile: profileEN,
    authentication: authenticationEN,
    legal: legalEN,
  },
};

/**
 * Resolve nested translation keys with fallback and interpolation.
 * Example: getTranslation("fr", "dashboard.kpiRevenue") => "Chiffre d'affaires"
 */
export function getTranslation(
  lang: Langue,
  path: string,
  params?: Record<string, string | number>
): string {
  const parts = path.split(".");
  let current: any = translations[lang] || translations.fr;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      // Fallback to French if key is missing in English or target lang
      let fallbackCurrent: any = translations.fr;
      for (const fallbackPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === "object" && fallbackPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fallbackPart];
        } else {
          return path; // Return raw key if completely unresolved
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== "string") {
    return path;
  }

  if (params) {
    let interpolated = current;
    Object.entries(params).forEach(([key, val]) => {
      interpolated = interpolated.replace(new RegExp(`{${key}}`, "g"), String(val));
    });
    return interpolated;
  }

  return current;
}

/**
 * Format currency string according to language conventions
 * FR: 1 250 000 FCFA
 * EN: 1,250,000 XAF
 */
export function formatCurrencyLocale(montant: number, lang: Langue): string {
  if (isNaN(montant)) return lang === "fr" ? "0 FCFA" : "0 XAF";
  
  if (lang === "fr") {
    const formatted = new Intl.NumberFormat("fr-FR").format(montant);
    return `${formatted} FCFA`;
  } else {
    const formatted = new Intl.NumberFormat("en-US").format(montant);
    return `${formatted} XAF`;
  }
}

/**
 * Format date according to language conventions
 * FR: 12 août 2026
 * EN: August 12, 2026
 */
export function formatDateLocale(dateStrOrObj: string | Date, lang: Langue): string {
  if (!dateStrOrObj) return "";
  try {
    const date = typeof dateStrOrObj === "string" ? new Date(dateStrOrObj) : dateStrOrObj;
    if (isNaN(date.getTime())) return String(dateStrOrObj);

    if (lang === "fr") {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
    }
  } catch (e) {
    return String(dateStrOrObj);
  }
}
