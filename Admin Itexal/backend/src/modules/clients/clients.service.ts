import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientsService {
  private clients = [
    {
      id: 'cli-01',
      nomComplet: 'Nadine Fotso',
      email: 'nadine.fotso@gmail.com',
      telephone: '+237 699 12 34 56',
      ville: 'Douala',
      dateInscription: '01/06/2026',
      totalCommandes: 5,
      totalDepense: 185000,
      statut: 'actif',
    },
    {
      id: 'cli-02',
      nomComplet: 'Marc Mbarga',
      email: 'marc.mbarga@yahoo.fr',
      telephone: '+237 677 88 99 00',
      ville: 'Yaoundé',
      dateInscription: '15/07/2026',
      totalCommandes: 2,
      totalDepense: 48000,
      statut: 'actif',
    },
  ];

  async lister() {
    return { succes: true, donnees: this.clients };
  }

  async trouverParId(id: string) {
    const client = this.clients.find((c) => c.id === id);
    if (!client) throw new NotFoundException(`Client #${id} introuvable`);
    return { succes: true, donnees: client };
  }

  async creer(donnees: any) {
    const nouveau = {
      id: `cli-${Date.now()}`,
      ...donnees,
      dateInscription: new Date().toLocaleDateString('fr-FR'),
      totalCommandes: 0,
      totalDepense: 0,
      statut: 'actif',
    };
    this.clients.unshift(nouveau);
    return { succes: true, message: 'Client ajouté avec succès', donnees: nouveau };
  }

  async modifier(id: string, modifs: any) {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Client #${id} introuvable`);
    this.clients[index] = { ...this.clients[index], ...modifs };
    return { succes: true, message: 'Client mis à jour', donnees: this.clients[index] };
  }

  async supprimer(id: string) {
    this.clients = this.clients.filter((c) => c.id !== id);
    return { succes: true, message: 'Client supprimé' };
  }
}
