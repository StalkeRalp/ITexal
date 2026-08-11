import { Injectable } from '@nestjs/common';

@Injectable()
export class ParametresService {
  async obtenirParametres() {
    return {
      succes: true,
      donnees: {
        nomBoutique: 'ITexal Cosmétiques',
        emailContact: 'contact@itexal.cm',
        telephoneContact: '+237 000 000 000',
        devise: 'FCFA',
        seuilStockAlerteParDefaut: 5,
      },
    };
  }
}
