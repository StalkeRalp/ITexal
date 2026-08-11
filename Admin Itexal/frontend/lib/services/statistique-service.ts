import { Commande } from "@/types/commande";
import { Produit } from "@/types/produit";
import { Client } from "@/types/client";
import { GlobalKpiStats, ProduitPlusVendu, CategoriePerformance } from "@/types/statistique";

export const StatistiqueService = {
  calculerKPIsGlobaux: (
    commandes: Commande[],
    produits: Produit[],
    clients: Client[]
  ): GlobalKpiStats => {
    const chiffreAffairesTotal = commandes
      .filter((c) => c.statut !== "annulee")
      .reduce((sum, c) => sum + c.montantTotal, 0);

    const nombreCommandesTotal = commandes.filter((c) => c.statut !== "annulee").length;
    const nombreClientsTotal = clients.length;
    const nombreProduitsActifs = produits.filter((p) => p.disponible).length;

    const nombreStocksFaibles = produits.filter((p) => p.stock > 0 && p.stock <= 5).length;
    const nombreRupturesStock = produits.filter((p) => p.stock === 0).length;

    const panierMoyen =
      nombreCommandesTotal > 0 ? Math.round(chiffreAffairesTotal / nombreCommandesTotal) : 0;

    return {
      chiffreAffairesTotal,
      croissanceChiffreAffaires: 12.5,
      nombreCommandesTotal,
      croissanceCommandes: 8.2,
      nombreClientsTotal,
      croissanceClients: 15.4,
      nombreProduitsActifs,
      nombreStocksFaibles,
      nombreRupturesStock,
      panierMoyen,
    };
  },

  extraireProduitsPlusVendus: (commandes: Commande[], limit = 5): ProduitPlusVendu[] => {
    const ventestMap = new Map<
      string,
      { nom: string; image: string; quantite: number; ca: number }
    >();

    commandes
      .filter((c) => c.statut !== "annulee")
      .forEach((c) => {
        c.articles.forEach((art) => {
          const ex = ventestMap.get(art.produitId);
          if (ex) {
            ex.quantite += art.quantite;
            ex.ca += art.sousTotal;
          } else {
            ventestMap.set(art.produitId, {
              nom: art.nomProduit,
              image: art.imageProduit,
              quantite: art.quantite,
              ca: art.sousTotal,
            });
          }
        });
      });

    return Array.from(ventestMap.entries())
      .map(([id, val]) => ({
        produitId: id,
        nomProduit: val.nom,
        imageProduit: val.image,
        quantiteVendue: val.quantite,
        chiffreAffaires: val.ca,
      }))
      .sort((a, b) => b.quantiteVendue - a.quantiteVendue)
      .slice(0, limit);
  },

  extrairePerformanceCategories: (
    commandes: Commande[],
    produits: Produit[]
  ): CategoriePerformance[] => {
    const caTotal = commandes
      .filter((c) => c.statut !== "annulee")
      .reduce((s, c) => s + c.montantTotal, 0);

    const catMap = new Map<string, { nom: string; ventes: number; ca: number }>();

    commandes
      .filter((c) => c.statut !== "annulee")
      .forEach((c) => {
        c.articles.forEach((art) => {
          const p = produits.find((prod) => prod.id === art.produitId);
          const catNom = p ? p.nomCategorie : "Général";
          const catId = p ? p.categorieId : "cat-general";

          const ex = catMap.get(catId);
          if (ex) {
            ex.ventes += art.quantite;
            ex.ca += art.sousTotal;
          } else {
            catMap.set(catId, { nom: catNom, ventes: art.quantite, ca: art.sousTotal });
          }
        });
      });

    return Array.from(catMap.entries()).map(([id, val]) => ({
      categorieId: id,
      nomCategorie: val.nom,
      totalVentes: val.ventes,
      chiffreAffaires: val.ca,
      partDeMarchePourcentage: caTotal > 0 ? Math.round((val.ca / caTotal) * 100) : 0,
    }));
  },
};
