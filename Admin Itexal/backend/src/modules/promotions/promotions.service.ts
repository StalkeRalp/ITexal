import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PromotionsService {
  private promotions = [
    {
      id: 'promo-01',
      code: 'SUMMER2026',
      reductionPourcentage: 20,
      dateDebut: '01/06/2026',
      dateFin: '31/08/2026',
      statut: 'Active',
      nombreUtilisations: 84,
    },
  ];

  async lister() {
    return { succes: true, donnees: this.promotions };
  }

  async creer(donnees: any) {
    const nouvelle = {
      id: `promo-${Date.now()}`,
      nombreUtilisations: 0,
      statut: 'Active',
      ...donnees,
    };
    this.promotions.push(nouvelle);
    return { succes: true, message: 'Promotion créée', donnees: nouvelle };
  }

  async modifier(id: string, modifs: any) {
    const index = this.promotions.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Promotion #${id} introuvable`);
    this.promotions[index] = { ...this.promotions[index], ...modifs };
    return { succes: true, message: 'Promotion mise à jour', donnees: this.promotions[index] };
  }

  async supprimer(id: string) {
    this.promotions = this.promotions.filter((p) => p.id !== id);
    return { succes: true, message: 'Promotion supprimée' };
  }
}
