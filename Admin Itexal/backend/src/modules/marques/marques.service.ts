import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MarquesService {
  private marques = [
    {
      id: 'marq-01',
      nom: 'ITexal Cosméceutiques',
      logo: '',
      paysOrigine: 'Cameroun',
      description: 'Gamme complète de soins dermo-cosmétiques formulée en laboratoire.',
      statut: 'Active',
      nombreProduits: 14,
      creeLe: '01/01/2026',
    },
    {
      id: 'marq-02',
      nom: 'Karité Gold Africa',
      logo: '',
      paysOrigine: 'Côte d\'Ivoire',
      description: 'Marque spécialisée dans les soins naturels à base de beurre de karité bio.',
      statut: 'Active',
      nombreProduits: 8,
      creeLe: '10/02/2026',
    },
  ];

  async lister() {
    return { succes: true, donnees: this.marques };
  }

  async trouverParId(id: string) {
    const marque = this.marques.find((m) => m.id === id);
    if (!marque) throw new NotFoundException(`Marque #${id} introuvable`);
    return { succes: true, donnees: marque };
  }

  async creer(donnees: any) {
    const nouvelle = {
      id: `marq-${Date.now()}`,
      nom: donnees.nom,
      description: donnees.description || '',
      logo: donnees.logo || '',
      paysOrigine: donnees.paysOrigine || 'Cameroun',
      statut: donnees.statut || 'Active',
      nombreProduits: 0,
      creeLe: new Date().toLocaleDateString('fr-FR'),
    };
    this.marques.unshift(nouvelle);
    return { succes: true, message: 'Marque créée avec succès', donnees: nouvelle };
  }

  async modifier(id: string, modifs: any) {
    const index = this.marques.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException(`Marque #${id} introuvable`);
    this.marques[index] = { ...this.marques[index], ...modifs };
    return { succes: true, message: 'Marque mise à jour', donnees: this.marques[index] };
  }

  async supprimer(id: string) {
    this.marques = this.marques.filter((m) => m.id !== id);
    return { succes: true, message: 'Marque supprimée avec succès' };
  }
}
