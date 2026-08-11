import { Injectable } from '@nestjs/common';

@Injectable()
export class ProduitsService {
  async lister() {
    return { succes: true, donnees: [], pagination: { pageActuelle: 1, totalPages: 1, elementsParPage: 10, totalElements: 0 } };
  }
  async creer(donnees: any) {
    return { succes: true, message: 'Produit créé (stub)' };
  }
}
