import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async obtenirStatistiques() {
    return {
      succes: true,
      donnees: {
        nombreProduits: 0,
        nombreClients: 0,
        nombreCommandes: 0,
        chiffreAffaires: 0,
        commandesRecentes: [],
        stocksFaibles: [],
      },
    };
  }
}
