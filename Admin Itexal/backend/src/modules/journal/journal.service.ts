import { Injectable } from '@nestjs/common';

@Injectable()
export class JournalService {
  private logs = [
    {
      id: 'log-01',
      horodatage: new Date().toISOString(),
      utilisateurId: 'usr_admin_01',
      nomUtilisateur: 'Kame Williamson',
      roleUtilisateur: 'Super Administrateur',
      typeEvenement: 'Authentification',
      action: 'CONNEXION_REUSSIE',
      description: 'Connexion de l\'administrateur depuis le tableau de bord.',
      niveauSeverite: 'Info',
      adresseIP: '197.234.221.14',
    },
  ];

  async lister() {
    return { succes: true, donnees: this.logs };
  }

  async enregistrer(log: any) {
    const entree = {
      id: `log-${Date.now()}`,
      horodatage: new Date().toISOString(),
      niveauSeverite: 'Info',
      ...log,
    };
    this.logs.unshift(entree);
    return { succes: true, message: 'Événement consigné dans le journal', donnees: entree };
  }
}
