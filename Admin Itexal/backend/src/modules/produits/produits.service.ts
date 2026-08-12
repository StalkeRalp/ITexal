import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProduitsService {
  private produits = [
    {
      id: 'prod-01',
      nom: 'Sérum Visage Hydratant Karité',
      reference: 'ITX-COSM-001',
      prix: 18500,
      stock: 45,
      nomCategorie: 'Visage',
      nomMarque: 'ITexal Cosméceutiques',
      disponible: true,
      creeLe: '01/08/2026',
    },
    {
      id: 'prod-02',
      nom: 'Lait Corporel Nourrissant Bio',
      reference: 'ITX-COSM-002',
      prix: 12000,
      stock: 8,
      nomCategorie: 'Corps',
      nomMarque: 'Karité Gold Africa',
      disponible: true,
      creeLe: '05/08/2026',
    },
  ];

  async lister() {
    return { succes: true, donnees: this.produits };
  }

  async trouverParId(id: string) {
    const produit = this.produits.find((p) => p.id === id);
    if (!produit) throw new NotFoundException(`Produit #${id} introuvable`);
    return { succes: true, donnees: produit };
  }

  async creer(donnees: any) {
    const nouveau = {
      id: `prod-${Date.now()}`,
      ...donnees,
      creeLe: new Date().toLocaleDateString('fr-FR'),
    };
    this.produits.unshift(nouveau);
    return { succes: true, message: 'Produit créé avec succès', donnees: nouveau };
  }

  async modifier(id: string, modifs: any) {
    const index = this.produits.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produit #${id} introuvable`);
    this.produits[index] = { ...this.produits[index], ...modifs };
    return { succes: true, message: 'Produit mis à jour', donnees: this.produits[index] };
  }

  async supprimer(id: string) {
    this.produits = this.produits.filter((p) => p.id !== id);
    return { succes: true, message: 'Produit supprimé avec succès' };
  }
}
