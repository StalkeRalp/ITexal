import { Injectable } from '@nestjs/common';

@Injectable()
export class ContenusService {
  private contenus = {
    banniereAccueil: {
      titre: 'Soins Dermo-Cosmétiques Innovants',
      sousTitre: 'Formules certifiées par des experts dermatologues.',
      texteBouton: 'Découvrir nos gammes',
      image: '',
    },
    actualites: [
      { id: 'actu-01', titre: 'Lancement de la nouvelle gamme Karité Gold', date: '01/08/2026' },
    ],
  };

  async obtenir() {
    return { succes: true, donnees: this.contenus };
  }

  async modifier(nouveauxContenus: any) {
    this.contenus = { ...this.contenus, ...nouveauxContenus };
    return { succes: true, message: 'Contenus mis à jour', donnees: this.contenus };
  }
}
