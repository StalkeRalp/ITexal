import { Injectable } from '@nestjs/common';

@Injectable()
export class ParametresService {
  private parametres = {
    nomSite: 'ITexal Admin Portal',
    devise: 'FCFA',
    tva: 19.25,
    emailSupport: 'support@itexal.cm',
    telephoneSupport: '+237 699 00 11 22',
    notificationsEmail: true,
  };

  async obtenir() {
    return { succes: true, donnees: this.parametres };
  }

  async modifier(nouveauxParametres: any) {
    this.parametres = { ...this.parametres, ...nouveauxParametres };
    return { succes: true, message: 'Paramètres enregistrés avec succès', donnees: this.parametres };
  }
}
