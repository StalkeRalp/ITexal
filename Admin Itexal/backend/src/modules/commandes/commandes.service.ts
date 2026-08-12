import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommandesService {
  private commandes = [
    {
      id: 'cmd-01',
      reference: 'CMD-2026-0801',
      clientNom: 'Nadine Fotso',
      clientEmail: 'nadine.fotso@gmail.com',
      montantTotal: 45000,
      statut: 'livree',
      methodePaiement: 'orange_money',
      dateCommande: '10/08/2026',
    },
    {
      id: 'cmd-02',
      reference: 'CMD-2026-0802',
      clientNom: 'Marc Mbarga',
      clientEmail: 'marc.mbarga@yahoo.fr',
      montantTotal: 24000,
      statut: 'en_cours',
      methodePaiement: 'mtn_momo',
      dateCommande: '11/08/2026',
    },
  ];

  async lister() {
    return { succes: true, donnees: this.commandes };
  }

  async trouverParId(id: string) {
    const cmd = this.commandes.find((c) => c.id === id);
    if (!cmd) throw new NotFoundException(`Commande #${id} introuvable`);
    return { succes: true, donnees: cmd };
  }

  async modifierStatut(id: string, statut: string) {
    const index = this.commandes.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Commande #${id} introuvable`);
    this.commandes[index].statut = statut;
    return { succes: true, message: 'Statut mis à jour', donnees: this.commandes[index] };
  }
}
