import makeupRaw from "./makeup_data.json";
import usersRaw from "./user.json";

import { Produit } from "@/types/produit";
import { Categorie } from "@/types/categorie";
import { Marque } from "@/types/marque";
import { Client } from "@/types/client";
import { Commande } from "@/types/commande";
import { NotificationItem } from "@/types/notification";
import { Promotion } from "@/types/promotion";

// Fonction utilitaire pour formater les noms de marque et catégories
const capitalize = (str: string) => {
  if (!str) return "Général";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const CATEGORIE_MAP: Record<string, string> = {
  lip_liner: "Lèvres",
  lipstick: "Lèvres",
  foundation: "Teint",
  eyeliner: "Yeux",
  eyeshadow: "Yeux",
  blush: "Teint",
  bronzer: "Teint",
  mascara: "Yeux",
  eyebrow: "Yeux",
  nail_polish: "Soins & Ongles",
  pencil: "Lèvres & Yeux",
  liquid: "Teint",
  powder: "Teint",
  cream: "Soin du Visage",
  gel: "Soin du Visage",
};

export const genererProduitsInitiaux = (): Produit[] => {
  // Sélection de produits représentatifs de makeup_data.json + nos produits phares ITexal
  const pharesITexal: Produit[] = [
    {
      id: "prod-itexal-1",
      reference: "REF-1001",
      nom: "Sérum Visage Éclat Bio Karité",
      categorieId: "cat-visage",
      nomCategorie: "Soin du Visage",
      marqueId: "mar-itexal",
      nomMarque: "ITexal Cosméceutiques",
      description: "Sérum concentré en acide hyaluronique et vitamine C naturelle pour un teint éclatant et régénéré.",
      prix: 15000,
      prixPromotionnel: 10500,
      enPromotion: true,
      stock: 42,
      disponible: true,
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      ],
      composition: "Aqua, Vitamin C, Hyaluronic Acid, Aloe Vera, Karité Bio",
      typeDePeau: "Toutes peaux",
      contenance: "50ml",
      origine: "Cameroun",
      conseilsUtilisation: "Appliquer 3 gouttes le matin avant la crème.",
      note: 4.8,
      tags: ["Bio", "Éclat", "Karité"],
      creeLe: "01/08/2026",
    },
    {
      id: "prod-itexal-2",
      reference: "REF-1002",
      nom: "Crème Hydratante Onctueuse Karité Gold",
      categorieId: "cat-corps",
      nomCategorie: "Soin du Corps",
      marqueId: "mar-karite-gold",
      nomMarque: "Karité Gold Africa",
      description: "Nourrit intensément les peaux sèches et déshydratées. Enrichie en beurre de karité brut pressé à froid.",
      prix: 18500,
      prixPromotionnel: 13875,
      enPromotion: true,
      stock: 28,
      disponible: true,
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      ],
      typeDePeau: "Peaux sèches",
      contenance: "200ml",
      origine: "Cameroun",
      note: 4.9,
      tags: ["Karité", "Nourrissant"],
      creeLe: "03/08/2026",
    },
    {
      id: "prod-itexal-3",
      reference: "REF-1003",
      nom: "Lotion Tonique Équilibrante Bio",
      categorieId: "cat-visage",
      nomCategorie: "Soin du Visage",
      marqueId: "mar-itexal",
      nomMarque: "ITexal Cosméceutiques",
      description: "Lotion rafraîchissante aux extraits de camomille et de rose sauvage pour purifier la peau.",
      prix: 15000,
      prixPromotionnel: 12000,
      enPromotion: true,
      stock: 19,
      disponible: true,
      images: [
        "https://images.unsplash.com/photo-1608248597261-e4d091444d32?w=600&auto=format&fit=crop&q=80",
      ],
      contenance: "150ml",
      origine: "Cameroun",
      note: 4.6,
      creeLe: "04/08/2026",
    },
    {
      id: "prod-itexal-4",
      reference: "REF-1004",
      nom: "Masque Capillaire Nourrissant Argan Luxe",
      categorieId: "cat-capillaire",
      nomCategorie: "Gamme Capillaire",
      marqueId: "mar-argan-luxe",
      nomMarque: "Argan Bio Luxe",
      description: "Soin réparateur intense pour cheveux très secs, frisés et crépus. Restaure la fibre capillaire.",
      prix: 22500,
      stock: 35,
      disponible: true,
      images: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80",
      ],
      contenance: "300ml",
      origine: "Maroc",
      note: 4.7,
      creeLe: "05/08/2026",
    },
  ];

  // Normalisation des produits makeup_data.json (50 premiers de haute qualité)
  const produitsJSON: Produit[] = (makeupRaw as any[])
    .slice(0, 45)
    .map((item, index) => {
      const nomCat = CATEGORIE_MAP[item.product_type] || CATEGORIE_MAP[item.category] || "Maquillage";
      const catId = `cat-${nomCat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      const brandClean = item.brand ? capitalize(item.brand) : "Cosmetic Admin";
      const brandId = `mar-${brandClean.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      
      // Conversion prix USD/CAD -> FCFA (ex: price * 650, arrondi à 500 près)
      const rawPriceNum = parseFloat(item.price) || 12.5;
      const priceFCFA = Math.max(3500, Math.round((rawPriceNum * 650) / 500) * 500);
      const hasPromo = index % 3 === 0;
      const promoPrice = hasPromo ? Math.round((priceFCFA * 0.8) / 500) * 500 : undefined;
      
      const stockVal = index === 2 ? 4 : (index * 7 + 12) % 65;
      const imgFallback = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80";
      const mainImg = item.image_link && item.image_link.startsWith("http") ? item.image_link : imgFallback;

      return {
        id: `prod-json-${item.id}`,
        reference: `REF-${2000 + index}`,
        nom: item.name,
        categorieId: catId,
        nomCategorie: nomCat,
        marqueId: brandId,
        nomMarque: brandClean,
        description: item.description || `Produit de beauté ${item.name} de la marque ${brandClean}.`,
        prix: priceFCFA,
        prixPromotionnel: promoPrice,
        enPromotion: hasPromo,
        images: [mainImg],
        stock: stockVal,
        disponible: stockVal > 0,
        typeDePeau: "Tous types de peaux",
        contenance: "Standard",
        origine: "International",
        note: item.rating ? parseFloat(item.rating) : 4.5,
        tags: item.tag_list || ["Maquillage"],
        couleurs: (item.product_colors || []).map((c: any) => ({ hex: c.hex_value, nom: c.colour_name })),
        creeLe: "02/08/2026",
      };
    });

  return [...pharesITexal, ...produitsJSON];
};

export const genererCategoriesInitiales = (produits: Produit[]): Categorie[] => {
  const catMap = new Map<string, { id: string; nom: string; count: number }>();
  
  // Défauts
  const defs = [
    { id: "cat-visage", nom: "Soin du Visage" },
    { id: "cat-corps", nom: "Soin du Corps" },
    { id: "cat-capillaire", nom: "Gamme Capillaire" },
    { id: "cat-levres", nom: "Lèvres" },
    { id: "cat-teint", nom: "Teint" },
    { id: "cat-yeux", nom: "Yeux" },
    { id: "cat-soins-ongles", nom: "Soins & Ongles" },
  ];
  
  defs.forEach(d => catMap.set(d.id, { ...d, count: 0 }));

  produits.forEach(p => {
    const existing = catMap.get(p.categorieId);
    if (existing) {
      existing.count += 1;
    } else {
      catMap.set(p.categorieId, { id: p.categorieId, nom: p.nomCategorie, count: 1 });
    }
  });

  return Array.from(catMap.values()).map((item, idx) => ({
    id: item.id,
    nom: item.nom,
    slug: item.nom.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    description: `Tous les produits de la gamme ${item.nom}`,
    nombreProduits: item.count,
    ordreAffichage: idx + 1,
    creeLe: "01/08/2026",
  }));
};

export const genererMarquesInitiales = (produits: Produit[]): Marque[] => {
  const marMap = new Map<string, { id: string; nom: string; count: number }>();

  produits.forEach(p => {
    const existing = marMap.get(p.marqueId);
    if (existing) {
      existing.count += 1;
    } else {
      marMap.set(p.marqueId, { id: p.marqueId, nom: p.nomMarque, count: 1 });
    }
  });

  return Array.from(marMap.values()).map(item => ({
    id: item.id,
    nom: item.nom,
    slug: item.nom.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    description: `Marque partenaire ${item.nom}`,
    nombreProduits: item.count,
    creeLe: "01/08/2026",
  }));
};

export const genererClientsInitiaux = (): Client[] => {
  const rawUsers = (usersRaw as any).results || [];
  return rawUsers.slice(0, 30).map((u: any, idx: number) => {
    const nomComplet = `${u.name.first} ${u.name.last}`;
    const nbCmd = (idx * 3 + 1) % 9;
    const totalDepense = nbCmd * 45000 + (idx * 2500) % 150000;
    
    return {
      id: `cli-${u.login.uuid || idx}`,
      nom: u.name.last,
      prenom: u.name.first,
      nomComplet,
      genre: u.gender,
      email: u.email,
      telephone: u.phone || u.cell,
      avatar: u.picture.medium || u.picture.large,
      adresse: {
        numero: u.location.street.number,
        rue: u.location.street.name,
        ville: u.location.city,
        region: u.location.state,
        codePostal: String(u.location.postcode),
        pays: u.location.country,
      },
      commandesEffectuees: nbCmd,
      totalDepense,
      statut: idx % 10 === 0 ? "inactif" : "actif",
      dateInscription: new Date(u.registered.date).toLocaleDateString("fr-FR"),
      derniereCommandeLe: nbCmd > 0 ? "10/08/2026" : undefined,
    };
  });
};

export const genererCommandesInitiales = (clients: Client[], produits: Produit[]): Commande[] => {
  // Guard: si l'une des deux listes est vide, on ne peut pas générer de commandes
  if (clients.length === 0 || produits.length === 0) return [];

  const statutList: ("validee" | "en_preparation" | "expediee" | "livree" | "en_attente" | "annulee")[] = [
    "livree", "expediee", "en_preparation", "validee", "en_attente", "livree", "expediee"
  ];

  return Array.from({ length: 15 }).map((_, idx) => {
    const client = clients[idx % clients.length];
    const p1 = produits[idx % produits.length];
    const p2 = produits[(idx + 3) % produits.length];

    const qty1 = (idx % 3) + 1;
    const qty2 = (idx % 2) + 1;

    const price1 = p1.prixPromotionnel || p1.prix;
    const price2 = p2.prixPromotionnel || p2.prix;

    const sub1 = price1 * qty1;
    const sub2 = price2 * qty2;

    const totalSousTotal = sub1 + sub2;
    const fraisLivraison = totalSousTotal > 50000 ? 0 : 2500;
    const totalFinal = totalSousTotal + fraisLivraison;

    const statutCmd = statutList[idx % statutList.length];

    return {
      id: `cmd-${idx + 1}`,
      reference: `CMD-${String(idx + 1).padStart(2, "0")}`,
      clientId: client.id,
      clientNom: client.nomComplet,
      clientEmail: client.email,
      clientTelephone: client.telephone,
      articles: [
        {
          id: `lig-${idx}-1`,
          produitId: p1.id,
          referenceProduit: p1.reference,
          nomProduit: p1.nom,
          imageProduit: p1.images[0],
          quantite: qty1,
          prixUnitaire: price1,
          sousTotal: sub1,
        },
        {
          id: `lig-${idx}-2`,
          produitId: p2.id,
          referenceProduit: p2.reference,
          nomProduit: p2.nom,
          imageProduit: p2.images[0],
          quantite: qty2,
          prixUnitaire: price2,
          sousTotal: sub2,
        },
      ],
      totalArticles: qty1 + qty2,
      montantSousTotal: totalSousTotal,
      fraisLivraison,
      remisePromotion: 0,
      montantTotal: totalFinal,
      statut: statutCmd,
      dateCommande: (() => {
        const d = new Date();
        const jour = String(Math.max(1, ((idx * 2) % 28) + 1)).padStart(2, "0");
        const mois = String(d.getMonth() + 1).padStart(2, "0");
        const annee = d.getFullYear();
        const heure = 10 + (idx % 9);
        return `${jour}/${mois}/${annee} à ${heure}:30`;
      })(),
      methodePaiement: idx % 2 === 0 ? "mobile_money" : "carte_bancaire",
      statutPaiement: statutCmd === "annulee" ? "rembourse" : statutCmd === "en_attente" ? "en_attente" : "paye",
      modeLivraison: idx % 3 === 0 ? "express" : "standard",
      statutLivraison: statutCmd === "livree" ? "livree" : statutCmd === "expediee" ? "en_cours" : "en_attente",
      adresseLivraison: client.adresse,
    };
  });
};

export const genererPromotionsInitiales = (): Promotion[] => [
  {
    id: "promo-1",
    code: "SUMMER2026",
    nom: "Solde d'Été Cosmetic Admin",
    description: "Offre exceptionnelle de 30% sur toute la gamme Soin du Visage et Karité.",
    typeRemise: "pourcentage",
    valeurRemise: 30,
    dateDebut: "01/08/2026",
    dateFin: "31/08/2026",
    actif: true,
    limiteUtilisation: 500,
    nombreUtilisations: 142,
    creeLe: "01/08/2026",
  },
  {
    id: "promo-2",
    code: "BIENVENUE",
    nom: "Remise Nouveau Client",
    description: "5 000 FCFA offerts pour toute première commande.",
    typeRemise: "montant_fixe",
    valeurRemise: 5000,
    dateDebut: "01/01/2026",
    dateFin: "31/12/2026",
    actif: true,
    nombreUtilisations: 89,
    creeLe: "01/01/2026",
  },
];

export const genererNotificationsInitiales = (commandes: Commande[], produits: Produit[]): NotificationItem[] => {
  const notifs: NotificationItem[] = [
    {
      id: "notif-1",
      titre: "Nouvelle commande reçue",
      message: `La commande ${commandes[0]?.reference || "CMD-01"} d'un montant de ${(commandes[0]?.montantTotal || 45000).toLocaleString("fr-FR")} FCFA vient d'être passée par ${commandes[0]?.clientNom || "Client"}.`,
      type: "commande",
      horodatage: "Il y a 15 min",
      lu: false,
      entiteId: commandes[0]?.id,
    },
    {
      id: "notif-2",
      titre: "Alerte Stock Faible",
      message: `Le produit "${produits.find(p => p.stock < 5)?.nom || "Sérum Visage"}" n'a plus que ${produits.find(p => p.stock < 5)?.stock || 3} unités en stock.`,
      type: "stock",
      horodatage: "Il y a 1 heure",
      lu: false,
    },
    {
      id: "notif-3",
      titre: "Paiement Mobile Money confirmé",
      message: `Paiement validé pour la commande ${commandes[1]?.reference || "CMD-02"}.`,
      type: "paiement",
      horodatage: "Il y a 3 heures",
      lu: true,
      entiteId: commandes[1]?.id,
    },
  ];
  return notifs;
};
